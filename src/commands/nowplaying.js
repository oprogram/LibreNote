const { SlashCommandBuilder } = require('@discordjs/builders');
const { AudioPlayerStatus } = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');

module.exports = {
	// data of the command
	data: new SlashCommandBuilder()
		.setName('nowplaying')
		.setDescription('Lists the current track playing'),
	// array of guild ids, null for global command
	guilds: ['880093118538584095', '805531475487096943'],
	// method to run the command
	async run(interaction) {
		const member = interaction.member;

		if (!member) return interaction.reply({ content: 'You can only execute this command within a guild.', ephemeral: true });

		await interaction.deferReply();

		if (!member.voice.channelId) return interaction.editReply('You must be in a voice channel to run this command.');

		const connection = interaction.client.connections.get(interaction.guildId);

		if (!connection || connection.audioPlayer.state.status === AudioPlayerStatus.Idle || !connection.currentTrack) {
			return interaction.editReply('No music is currently playing.');
		}

		interaction.editReply({
			embeds: [
				new MessageEmbed()
					.setDescription(`[${connection.currentTrack.title}](${connection.currentTrack.url})\n\n\`Requested by:\` ${connection.currentTrack.requestedBy}`)
					.setAuthor('Now Playing', interaction.client.user.avatarURL())
					.setThumbnail(connection.currentTrack.details.thumbnails[3].url)
					.addField('Channel', connection.currentTrack.details.author.name, true)
					.addField('Duration', new Date(Number(connection.currentTrack.details.lengthSeconds) * 1000).toISOString().substr(11, 8), true),
			],
		}).catch(console.warn);
	},
};