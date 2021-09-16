const { getInfo } = require('ytdl-core');
const { createAudioResource, demuxProbe } = require('@discordjs/voice');
const ytdlExec = require('youtube-dl-exec');
const ytdl = ytdlExec.raw;

// eslint-disable-next-line
const noop = () => { };

module.exports = class Track {
	constructor({ url, title, details, onStart, onFinish, onError }) {
		this.url = url;
		this.title = title;
		this.details = details;
		this.onStart = onStart;
		this.onFinish = onFinish;
		this.onError = onError;

		this.voteSkip = [];
	}

	createAudioResource() {
		return new Promise((resolve, reject) => {
			const process = ytdl(
				this.url,
				{
					o: '-',
					q: '',
					f: 'bestaudio[ext=webm+acodec=opus+asr=48000]/bestaudio',
					r: '100K',
				},
				{ stdio: ['ignore', 'pipe', 'ignore'] },
			);
			if (!process.stdout) {
				reject(new Error('No stdout'));
				return;
			}
			const stream = process.stdout;
			const onError = (error) => {
				if (!process.killed) process.kill();
				stream.resume();
				reject(error);
			};
			process
				.once('spawn', () => {
					demuxProbe(stream)
						.then((probe) => resolve(createAudioResource(probe.stream, { metadata: this, inputType: probe.type })))
						.catch(onError);
				})
				.catch(onError);
		});
	}

	static async from(url, methods) {
		const info = await getInfo(url);

		const wrappedMethods = {
			onStart() {
				wrappedMethods.onStart = noop;
				methods.onStart();
			},
			onFinish() {
				wrappedMethods.onFinish = noop;
				methods.onFinish();
			},
			onError(error) {
				wrappedMethods.onError = noop;
				methods.onError(error);
			},
		};

		return new Track({
			title: info.videoDetails.title,
			details: info.videoDetails,
			url,
			...wrappedMethods,
		});
	}
};