const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const search = require('youtube-search');
const MusicConnection = require('../utility/musicConnection');
const Track = require('../utility/track');
const { canPerformAction } = require('../utility/permissions');
const { default: axios } = require('axios');

const YouTubeURL = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi;
const YouTubePlaylistURL = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/g;

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

		const maxlength = parseInt(await interaction.client.db.getAsync(`librenote:settings:${interaction.guild.id}:maxlength`));

		const songRaw = interaction.options.get('song').value;
		let URL;
		const isURL = YouTubeURL.test(songRaw);
		const isPlaylist = YouTubePlaylistURL.test(songRaw);

		if (isURL) { URL = songRaw; }
		else if (isPlaylist) {
			let playlistId;
			const match = new RegExp('[&?]list=([a-z0-9_-]+)', 'i').exec(songRaw);
			if (match && match[1].length > 0) {
				playlistId = match[1];
			}
			else {
				return interaction.editReply('Invalid playlist URL');
			}

			await interaction.editReply('Fetching playlist items');

			let playlistItems;
			await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.YT_API_KEY}`)
				.then(async response => {
					const itemLimit = parseInt(await interaction.client.db.getAsync(`librenote:settings:${interaction.guild.id}:playlistmax`));
					if (response.data.items.length > (isNaN(itemLimit) ? 50 : itemLimit)) {
						return interaction.editReply(`I can not use playlists with more than ${isNaN(itemLimit) ? 50 : itemLimit} ${itemLimit == 1 ? 'song' : 'songs'}`);
					}
					playlistItems = response.data.items;
				}).catch(error => {
					console.warn(error);
				});

			const success = [];
			const fail = [];

			for (const item of playlistItems) {
				const url = 'https://www.youtube.com/watch?v=' + item.snippet.resourceId.videoId;
				try {
					const track = await Track.from(url, {
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

					if (Number(track.details.lengthSeconds) > 60 * (isNaN(maxlength) ? 15 : maxlength)) {
						return interaction.followUp(`[**${track.title}**](${url}) is longer than the permitted ${isNaN(maxlength) ? 15 : maxlength} ${maxlength == 1 ? 'minute' : 'minutes'}`);
					}
					else {
						connection.addToQueue(track);
					}
					success.push(url);
				}
				catch (error) {
					console.warn(error);
					fail.push(url);
				}
			}

			return interaction.editReply(`Successfully added ${success.length} tracks to the queue, ${fail.length} tracks failed`);
		}

		if (!URL) {
			// Search youtube for song
			const searchResults = await search(
				songRaw,
				{
					maxResults: 1,
					type: 'video',
					key: process.env.YT_API_KEY,
				},
			);

			if (searchResults.results[0]) {
				URL = searchResults.results[0].link;
			}
			else {
				return interaction.editReply('No songs found with that query.');
			}
		}

		try {
			await entersState(connection.voiceConnection, VoiceConnectionStatus.Ready, 20e3);
		}
		catch (error) {
			console.warn(error);
			await interaction.followUp('Failed to join voice channel within 20 seconds, please try again later!');
			return;
		}

		try {
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

			if (Number(track.details.lengthSeconds) > 60 * (isNaN(maxlength) ? 15 : maxlength)) {
				return interaction.editReply(`I cannot play songs longer than ${isNaN(maxlength) ? 15 : maxlength} ${maxlength == 1 ? 'minute' : 'minutes'}`);
			}
			else {
				connection.addToQueue(track);
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