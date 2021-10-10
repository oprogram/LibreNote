const { SlashCommandBuilder } = require('@discordjs/builders');
const { AudioPlayerStatus } = require('@discordjs/voice');
const { canPerformAction, isOnlyListener } = require('../utility/permissions');
const { constructEmbed } = require('../utility/embedConstructor');

module.exports = {
	// data of the command
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Unpauses the player'),
	// array of guild ids, null for global command
	guilds: null,
	// method to run the command
	async run(interaction) {
		const member = interaction.member;

		if (!member) return interaction.reply({ content: 'You can only execute this command within a guild.', ephemeral: true });

		await interaction.deferReply();

		if (!member.voice.channelId) return interaction.editReply(constructEmbed({ color: 'RED', description: 'You must be in a voice channel to run that command.' }));

		const canUseCommand = await canPerformAction(member) || await isOnlyListener(member);
		if (!canUseCommand) return interaction.editReply(constructEmbed({ color: 'RED', description: 'DJ only mode is enabled. You must be a DJ to run this command.' }));

		const connection = interaction.client.connections.get(interaction.guildId);

		if (!connection || connection.audioPlayer.state.status === AudioPlayerStatus.Idle) {
			return interaction.editReply(constructEmbed({ color: 'RED', description: 'No music is currently playing.' }));
		}

		if (connection.audioPlayer.state.status !== AudioPlayerStatus.Paused) {
			return interaction.editReply(constructEmbed({ color: 'RED', description: 'The player is not paused..' }));
		}

		connection.audioPlayer.unpause();
		await interaction.editReply(':play_pause: **Resumed**');
	},
};