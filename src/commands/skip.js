const { SlashCommandBuilder } = require('@discordjs/builders');
const { AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
	// data of the command
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skips the current playing song'),
	// array of guild ids, null for global command
	guilds: ['880093118538584095'],
	// method to run the command
	async run(interaction) {
		const member = interaction.member;

		if (!member) return interaction.reply({ content: 'You can only execute this command within a guild.', ephemeral: true });

		await interaction.deferReply();

		if (!member.voice.channelId) return interaction.editReply('You must be in a voice channel to run this command.');

		const connection = interaction.client.connections.get(interaction.guildId);

		if (!connection) {
			return interaction.editReply('No music is currently playing.');
		}

		const response =
			connection.audioPlayer.state.status === AudioPlayerStatus.Idle
				? 'No music is currently playing.'
				: ':fast_forward: **Skipped!**';
		connection.audioPlayer.stop();
		await interaction.editReply(response);
	},
};