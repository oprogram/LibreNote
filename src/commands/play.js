const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const MusicConnection = require('../music/connection');
const Track = require('../music/track');

module.exports = {
	// data of the command
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song!')
		.addStringOption(option => option.setName('url').setDescription('The url of the song you would like to play').setRequired(true)),
	// array of guild ids, null for global command
	guilds: ['880093118538584095'],
	// method to run the command
	async run(interaction) {
		const member = interaction.member;

		if (!member) return interaction.reply({ content: 'You can only execute this command within a guild.', ephemeral: true });

		await interaction.deferReply();

		if (!member.voice.channelId) return interaction.editReply('You must be in a voice channel to run this command.');
		if (!member.voice.channel.joinable) return interaction.editReply('I cannot join your voice channel.');

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

		try {
			await entersState(connection.voiceConnection, VoiceConnectionStatus.Ready, 20e3);
		}
		catch (error) {
			console.warn(error);
			await interaction.followUp('Failed to join voice channel within 20 seconds, please try again later!');
			return;
		}

		try {
			const track = await Track.from(interaction.options.get('url').value, {
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
					// interaction.followUp('Now finished!').catch(console.warn);
				},
				onError(error) {
					console.warn(error);
					interaction.followUp(`Error: ${error.message}`).catch(console.warn);
				},
			});
			if (Number(track.details.lengthSeconds) > (60 * 15)) {
				return interaction.editReply('I cannot play songs longer than 15 minutes.');
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