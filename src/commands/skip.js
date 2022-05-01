const { SlashCommandBuilder } = require('@discordjs/builders');
const { AudioPlayerStatus } = require('@discordjs/voice');
const { constructEmbed } = require('../utility/embedConstructor');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip the current playing song'),

	guilds: null,

	async run(interaction) {
		const member = interaction.member;

		if (!member) return interaction.reply({ content: 'You can only execute this command within a guild.', ephemeral: true });

		await interaction.deferReply();

		if (!member.voice.channelId) return interaction.editReply(constructEmbed({ color: 'RED', description: 'You must be in a voice channel to run this command.' }));

		const connection = interaction.client.connections.get(interaction.guildId);

		if (connection.mode == 'radio') {
			return interaction.editReply(constructEmbed({ color: 'RED', description: 'You cannot skip while the player is in radio mode.' }));
		}

		if (!connection) return interaction.editReply(constructEmbed({ color: 'RED', description: 'No music is currently playing.' }));

		if (member.voice.channel.members.size > 2) {
			const skipReq = Math.ceil(member.voice.channel.members.size / 2);

			if (connection.currentTrack.voteSkip.includes(member.id)) {
				await interaction.editReply(constructEmbed({ color: 'RED', description: 'You have already voted to skip.' }));
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
		connection.currentTrack.voteSkip = [];
		connection.audioPlayer.stop();
		await interaction.editReply(response);
	},
};