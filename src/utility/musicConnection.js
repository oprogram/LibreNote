const {
	AudioPlayerStatus,
	createAudioPlayer,
	entersState,
	VoiceConnectionDisconnectReason,
	VoiceConnectionStatus,
} = require('@discordjs/voice');

const { promisify } = require('util');
const wait = promisify(setTimeout);

/**
 * @module musicConnection
 * @typicalname MusicConnection
 * @example
 * new MusicConnection(
		joinVoiceChannel(...),
	);
 */
module.exports = class MusicConnection {
	/**
	 * @constructor MusicConnection
	 * @description Creates and returns a MusicConnection class
	 * @param {object} voiceConnection discord.js voice connection
	 * @property {object} voiceConnection - The @discordjs/voice VoiceConnection
	 * @property {object} audioPlayer - The @discordjs/voice audio player
	 * @property {boolean} queueLock - Queue Lock
	 * @property {boolean} readyLock - Ready Lock
	 * @property {Object} currentTrack - Currently playing track
	 * @property {Array} queue - Array of tracks queued
	 * @property {string} loop - Loop mode
	 * @property {boolean} shuffle - Shuffle mode
	 */
	constructor(voiceConnection) {
		this.voiceConnection = voiceConnection;
		this.audioPlayer = createAudioPlayer();
		this.queueLock = false;
		this.readyLock = false;
		this.currentTrack = undefined;
		this.queue = [];
		this.loop = 'off';
		this.shuffle = false;

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

		this.audioPlayer.on('stateChange', async (oldState, newState) => {
			if (newState.status === AudioPlayerStatus.Idle && oldState.status !== AudioPlayerStatus.Idle) {
				if ((this.loop === 'track') && this.currentTrack) {
					const resource = await this.currentTrack.createAudioResource();
					this.audioPlayer.play(resource);
				}
				else {
					oldState.resource.metadata.onFinish();
					if (this.loop === 'queue' && this.currentTrack) {
						this.addToQueue(this.currentTrack);
					}
					this.currentTrack = undefined;
					void this.processQueue();
				}
			}
			else if (newState.status === AudioPlayerStatus.Playing && oldState.status !== AudioPlayerStatus.Paused) {
				newState.resource.metadata.onStart();
			}
		});

		this.audioPlayer.on('error', (error) => (error.resource).metadata.onError(error));

		voiceConnection.subscribe(this.audioPlayer);
	}

	/**
	 * @method addToQueue
	 * @description Adds a Track class to the queue
	 * @param {object} track Track Class
	 */
	async addToQueue(track) {
		this.queue.push(track);
		await this.processQueue();
	}

	/**
	 * @method stop
	 * @description Stops the player and clears the queue.
	 */
	stop() {
		this.queueLock = true;
		this.queue = [];
		this.audioPlayer.stop(true);
	}

	/**
	 * @method processQueue
	 * @description Processes the queue, plays the next track if there is one.
	 */
	async processQueue() {
		if (this.queueLock || this.audioPlayer.state.status !== AudioPlayerStatus.Idle || (this.queue.length === 0 && !(this.loop === 'track' && this.currentTrack))) {
			return;
		}

		this.queueLock = true;
		this.currentTrack = undefined;

		let nextTrack;

		if (this.shuffle) {
			if (this.queue.length > 0) {
				const index = Math.floor(Math.random() * this.queue.length);
				console.log(index);
				nextTrack = this.queue[index];
				this.queue.splice(index, 1);
			}
		}
		else {
			nextTrack = this.queue.shift();
		}
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