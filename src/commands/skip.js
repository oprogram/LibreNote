const { SlashCommandBuilder } = require('@discordjs/builders');
const { AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip the current playing song'),

	guilds: null,

	async run(interaction) {
		const member = interaction.member;

		if (!member) return interaction.reply({ content: 'You can only execute this command within a guild.', ephemeral: true });

		await interaction.deferReply();

		if (!member.voice.channelId) return interaction.editReply('You must be in a voice channel to run this command.');

		const connection = interaction.client.connections.get(interaction.guildId);

		if (!connection) return interaction.editReply('No music is currently playing.');

		if (member.voice.channel.members.size > 2) {
			const skipReq = Math.ceil(member.voice.channel.members.size / 2);

			if (connection.currentTrack.voteSkip.includes(member.id)) {
				await interaction.editReply('You have already voted to skip!');
				return;
			}

			if (connection.currentTrack.voteSkip.length < skipReq) {
				connection.currentTrack.voteSkip.push(member.id);
				await interaction.editReply(`:arrow_up: Voted to skip **(${connection.currentTrack.voteSkip.length}/${skipReq})**`);
				if (connection.currentTrack.voteSkip.length != skipReq) return;
			}
		}

		const response =
			connection.audioPlayer.state.status === AudioPlayerStatus.Idle
				? 'No music is currently playing.'
				: ':fast_forward: **Skipped!**';
		connection.audioPlayer.stop();
		await interaction.editReply(response);
	},
};