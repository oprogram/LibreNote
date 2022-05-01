const { SlashCommandBuilder } = require('@discordjs/builders');
const { AudioPlayerStatus } = require('@discordjs/voice');
const { isDJ } = require('../utility/permissions');
const { constructEmbed } = require('../utility/embedConstructor');

module.exports = {
	// data of the command
	data: new SlashCommandBuilder()
		.setName('forceskip')
		.setDescription('Force skips the current playing song'),
	// array of guild ids, null for global command
	guilds: null,
	// method to run the command
	async run(interaction) {
		const member = interaction.member;

		if (!member) return interaction.reply({ content: 'You can only execute this command within a guild.', ephemeral: true });

		await interaction.deferReply();

		if (!member.voice.channelId) return interaction.editReply(constructEmbed({ color: 'RED', description: 'You must be in a voice channel to run this command.' }));

		const connection = interaction.client.connections.get(interaction.guildId);

		if (connection.mode == 'radio') {
			return interaction.editReply(constructEmbed({ color: 'RED', description: 'You cannot force skip while the player is in radio mode.' }));
		}

		if (!connection) {
			return interaction.editReply(constructEmbed({ color: 'RED', description: 'No music is currently playing.' }));
		}

		const isMemberDJ = await isDJ(member);
		if (!isMemberDJ) return interaction.editReply(constructEmbed({ color: 'RED', description: 'Only DJs can force skip tracks.' }));

		const response =
			connection.audioPlayer.state.status === AudioPlayerStatus.Idle
				? 'No music is currently playing.'
				: ':fast_forward: **Skipped!**';
		connection.audioPlayer.stop();
		await interaction.editReply(response);
	},
};