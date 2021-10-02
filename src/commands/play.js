const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const MusicConnection = require('../utility/musicConnection');
const Track = require('../utility/track');
const { canPerformAction } = require('../utility/permissions');

const youtube = require('../utility/youtube');
const spotify = require('../utility/spotify');

module.exports = {
	// data of the command
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song!')
		.addStringOption(option => option.setName('song').setDescription('The you would like to play').setRequired(true)),
	// array of guild ids, null for global command
	guilds: null,
	// method to run the command
	async run(interaction) {
		const member = interaction.member;

		if (!member) return interaction.reply({ content: 'You can only execute this command within a guild.', ephemeral: true });

		await interaction.deferReply();

		if (!member.voice.channelId) return interaction.editReply('You must be in a voice channel to run this command.');
		if (!member.voice.channel.joinable) return interaction.editReply('I cannot join your voice channel.');

		const canUseCommand = await canPerformAction(member);
		if (!canUseCommand) return interaction.editReply('DJ only mode is enabled. You must be a DJ to run this command.');

		let connection = interaction.client.connections.get(interaction.guildId);

		if (!connection) {
			connection = new MusicConnection(
				joinVoiceChannel({
					channelId: member.voice.channelId,
					guildId: interaction.guild.id,
					adapterCreator: interaction.guild.voiceAdapterCreator,
				}),
			);
			connection.voiceConnection.on('error', console.warn);
			interaction.client.connections.set(interaction.guildId, connection);
		}

		if (!connection) {
			return interaction.editReply('An error occured while attempting to play music.');
		}

		const maxlength = (await interaction.client.db.getNumberAsync(`librenote:settings:${interaction.guild.id}:maxlength`) ?? 15);
		const playlistmax = (await interaction.client.db.getNumberAsync(`librenote:settings:${interaction.guild.id}:playlistmax`) ?? 50);

		/* Method to create track, used by standard handling and playlist handling */
		const createTrack = async (URL) => {
			const track = await Track.from(URL, {
				onStart() {
					interaction.followUp({
						embeds: [
							new MessageEmbed()
								.setDescription(`[${track.title}](${track.url})\n\n\`Requested by:\` ${interaction.user.tag}`)
								.setAuthor('Now Playing', interaction.client.user.avatarURL())
								.setThumbnail(track.details.thumbnails[3].url)
								.addField('Channel', track.details.author.name, true)
								.addField('Duration', new Date(Number(track.details.lengthSeconds) * 1000).toISOString().substr(11, 8), true),
						],
					}).catch(console.warn);
				},
				onFinish() {
					//	a
				},
				onError(error) {
					console.warn(error);
					interaction.followUp(`Error: ${error.message}`).catch(console.warn);
				},
			});
			track.requestedBy = interaction.user.tag;

			return track;
		};

		/* Convert raw song (query, url, etc) to YouTube video URL for track class */

		const songRaw = interaction.options.getString('song');
		let YouTubeVideoURL;

		if (youtube.isVideoURL(songRaw)) {
			// Handle YTURL, normal handling.
			YouTubeVideoURL = songRaw;
		}
		else if (youtube.isPlaylistURL(songRaw)) {
			// Handle youtube playlist.
			const playlistId = youtube.getPlaylistId(songRaw);

			if (!playlistId) {
				return interaction.editReply({
					embeds: [
						new MessageEmbed()
							.setColor('RED')
							.setDescription('Could not obtain playlist id from URL.'),
					],
				});
			}

			const playlistItems = await youtube.getPlaylistItems(playlistId);

			const totalLength = (playlistItems.length >= playlistmax) ? playlistmax : playlistItems.length;

			await interaction.editReply({
				embeds: [
					new MessageEmbed()
						.setDescription(`:arrows_counterclockwise: Loading playlist items (0/${totalLength})...`),
				],
			});

			if (playlistItems.length >= playlistmax) {
				await interaction.followUp({
					embeds: [
						new MessageEmbed()
							.setColor('RED')
							.setDescription(`This playlist (${playlistItems.length} tracks) will be cut to comply with the \`playlistmax\` configuration of ${playlistmax} tracks`),
					],
				});
				playlistItems.length = totalLength;
			}

			const success = [];
			const fail = [];

			for (const item of playlistItems) {
				const url = 'https://www.youtube.com/watch?v=' + item.snippet.resourceId.videoId;
				try {
					const track = await createTrack(url);

					if (Number(track.details.lengthSeconds) > 60 * maxlength) {
						interaction.followUp(`[**${track.title}**](<${url}>) is longer than the permitted ${maxlength} ${maxlength == 1 ? 'minute' : 'minutes'}`);
						fail.push(url);
					}
					else {
						connection.queue.push(track);

						if (success.length === 0) connection.processQueue();

						success.push(url);
					}
				}
				catch (error) {
					console.warn(error);
					fail.push(url);
				}

				await interaction.editReply({
					embeds: [
						new MessageEmbed()
							.setDescription(`:arrows_counterclockwise: Fetching playlist items (${success.length + fail.length}/${totalLength})...`),
					],
				});
			}


			await connection.processQueue();
			return await interaction.editReply({
				embeds: [
					new MessageEmbed()
						.setDescription(`:white_check_mark: Successfully added ${success.length} tracks to the queue, could not add ${fail.length} tracks.`),
				],
			});
		}
		else if (spotify.isTrackURL(songRaw)) {
			// Handle spotify track/convert to YTURL, normal handling.
			try {
				const equivalentMusic = await spotify.getYoutubeFromSpotify(interaction.client, songRaw);

				if (equivalentMusic) {
					YouTubeVideoURL = equivalentMusic;
				}
			}
			catch (error) {
				return interaction.editReply({
					embeds: [
						new MessageEmbed()
							.setColor('RED')
							.setDescription(error),
					],
				});
			}
		}
		else if (spotify.isPlaylistURL(songRaw)) {
			// Handle spotify playlist

			await spotify.getYoutubeFromPlaylist(interaction.client, songRaw)
				.then(async response => {

					const totalLength = (response.length >= playlistmax) ? playlistmax : response.length;

					await interaction.editReply({
						embeds: [
							new MessageEmbed()
								.setDescription(`:arrows_counterclockwise: Loading playlist items (0/${totalLength})...`),
						],
					});

					if (response.length >= playlistmax) {
						await interaction.followUp({
							embeds: [
								new MessageEmbed()
									.setColor('RED')
									.setDescription(`This playlist (${response.length} tracks) will be cut to comply with the \`playlistmax\` configuration of ${playlistmax} tracks`),
							],
						});
						response.length = totalLength;
					}

					const success = [];
					const fail = [];

					for (const url of response) {
						try {
							const track = await createTrack(url);

							if (Number(track.details.lengthSeconds) > 60 * maxlength) {
								interaction.followUp(`[**${track.title}**](<${url}>) is longer than the permitted ${maxlength} ${maxlength == 1 ? 'minute' : 'minutes'}`);
								fail.push(url);
							}
							else {
								connection.queue.push(track);

								if (success.length === 0) connection.processQueue();

								success.push(url);
							}
						}
						catch (error) {
							console.warn(error);
							fail.push(url);
						}

						await interaction.editReply({
							embeds: [
								new MessageEmbed()
									.setDescription(`:arrows_counterclockwise: Fetching playlist items (${success.length + fail.length}/${totalLength})...`),
							],
						});
					}

					await connection.processQueue();
					return await interaction.editReply({
						embeds: [
							new MessageEmbed()
								.setDescription(`:white_check_mark: Successfully added ${success.length} tracks to the queue, could not add ${fail.length} tracks.`),
						],
					});
				})
				.catch(console.warn);

			return;
		}
		else {
			// YouTube fuzzy search
			const songURL = await youtube.searchByQuery(songRaw);

			if (songURL) {
				YouTubeVideoURL = songURL;
			}
			else {
				return interaction.editReply({
					embeds: [
						new MessageEmbed()
							.setColor('RED')
							.setDescription('No track found with that query.'),
					],
				});
			}
		}

		if (!YouTubeVideoURL) {
			return interaction.editReply({
				embeds: [
					new MessageEmbed()
						.setColor('RED')
						.setDescription('A logical error occured while attempting to resolve that track.'),
				],
			});
		}

		/* Join voice channel */
		try {
			await entersState(connection.voiceConnection, VoiceConnectionStatus.Ready, 20e3);
		}
		catch (error) {
			console.warn(error);
			await interaction.followUp('Failed to join voice channel within 20 seconds, please try again later!');
			return;
		}

		/* Create & play track */

		try {
			const track = await createTrack(YouTubeVideoURL);

			if (Number(track.details.lengthSeconds) > 60 * maxlength) {
				return interaction.editReply(`I cannot play songs longer than ${maxlength} ${maxlength == 1 ? 'minute' : 'minutes'}`);
			}
			else {
				await connection.addToQueue(track);
			}
			await interaction.editReply({
				embeds: [
					new MessageEmbed()
						.setDescription(`[${track.title}](${track.url})`)
						.setAuthor('Added to queue', interaction.user.avatarURL())
						.setThumbnail(track.details.thumbnails[3].url)
						.addField('Channel', track.details.author.name, true)
						.addField('Duration', new Date(Number(track.details.lengthSeconds) * 1000).toISOString().substr(11, 8), true),
				],
			});
		}
		catch (error) {
			console.warn(error);
			await interaction.editReply('Failed to play track.');
		}
	},
};