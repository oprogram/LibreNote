const { SlashCommandBuilder } = require('@discordjs/builders');
const { canPerformAction } = require('../utility/permissions');

module.exports = {
	// data of the command
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Toggles shuffling on/off, when on the next track is selected randomly from the queue.'),
	// array of guild ids, null for global command
	guilds: null,
	// method to run the command
	async run(interaction) {
		const member = interaction.member;

		if (!member) return interaction.reply({ content: 'You can only execute this command within a guild.', ephemeral: true });

		await interaction.deferReply();

		const canUseCommand = await canPerformAction(member);
		if (!canUseCommand) return interaction.editReply('DJ only mode is enabled. You must be a DJ to run this command.');

		if (!member.voice.channelId) return interaction.editReply('You must be in a voice channel to run this command.');

		const connection = interaction.client.connections.get(interaction.guildId);

		if (!connection) {
			return interaction.editReply('No music is currently playing.');
		}

		connection.shuffle = !connection.shuffle;

		await interaction.editReply(connection.shuffle ? '🔀 **Enabled shuffle.**' : '▶️ **Disabled shuffle.**');
	},
};