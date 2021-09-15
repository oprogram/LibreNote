const {
	AudioPlayerStatus,
	createAudioPlayer,
	entersState,
	VoiceConnectionDisconnectReason,
	VoiceConnectionStatus,
} = require('@discordjs/voice');

const { promisify } = require('util');
const wait = promisify(setTimeout);

module.exports = class MusicConnection {
	constructor(voiceConnection) {
		this.voiceConnection = voiceConnection;
		this.audioPlayer = createAudioPlayer();
		this.queueLock = false;
		this.readyLock = false;
		this.currentTrack = undefined;
		this.queue = [];

		this.voiceConnection.on('stateChange', async (_, newState) => {
			if (newState.status === VoiceConnectionStatus.Disconnected) {
				if (newState.reason === VoiceConnectionDisconnectReason.WebSocketClose && newState.closeCode === 4014) {
					try {
						await entersState(this.voiceConnection, VoiceConnectionStatus.Connecting, 5_000);
					}
					catch {
						this.voiceConnection.destroy();
					}
				}
				else if (this.voiceConnection.rejoinAttempts < 5) {
					await wait((this.voiceConnection.rejoinAttempts + 1) * 5_000);
					this.voiceConnection.rejoin();
				}
				else {
					this.voiceConnection.destroy();
				}
			}
			else if (newState.status === VoiceConnectionStatus.Destroyed) {
				this.stop();
			}
			else if (
				!this.readyLock &&
				(newState.status === VoiceConnectionStatus.Connecting || newState.status === VoiceConnectionStatus.Signalling)
			) {
				this.readyLock = true;
				try {
					await entersState(this.voiceConnection, VoiceConnectionStatus.Ready, 20_000);
				}
				catch {
					if (this.voiceConnection.state.status !== VoiceConnectionStatus.Destroyed) this.voiceConnection.destroy();
				}
				finally {
					this.readyLock = false;
				}
			}
		});

		this.audioPlayer.on('stateChange', (oldState, newState) => {
			if (newState.status === AudioPlayerStatus.Idle && oldState.status !== AudioPlayerStatus.Idle) {
				oldState.resource.metadata.onFinish();
				void this.processQueue();
			}
			else if (newState.status === AudioPlayerStatus.Playing && oldState.status !== AudioPlayerStatus.Paused) {
				newState.resource.metadata.onStart();
			}
		});

		this.audioPlayer.on('error', (error) => (error.resource).metadata.onError(error));

		voiceConnection.subscribe(this.audioPlayer);
	}

	addToQueue(track) {
		this.queue.push(track);
		this.processQueue();
	}

	stop() {
		this.queueLock = true;
		this.queue = [];
		this.audioPlayer.stop(true);
	}

	async processQueue() {
		if (this.queueLock || this.audioPlayer.state.status !== AudioPlayerStatus.Idle || this.queue.length === 0) {
			return;
		}

		this.queueLock = true;
		this.currentTrack = undefined;

		const nextTrack = this.queue.shift();
		if (nextTrack) {
			try {
				const resource = await nextTrack.createAudioResource();
				this.audioPlayer.play(resource);
				this.currentTrack = nextTrack;
				this.queueLock = false;
			}
			catch (error) {
				nextTrack.onError(error);
				this.queueLock = false;
				this.currentTrack = undefined;
				return this.processQueue();
			}
		}
	}
};