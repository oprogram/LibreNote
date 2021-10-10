const { SlashCommandBuilder } = require('@discordjs/builders');
const { isDJ } = require('../utility/permissions');
const { constructEmbed } = require('../utility/embedConstructor');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clear the queue'),

	guilds: null,

	async run(interaction) {
		const member = interaction.member;

		if (!member) return interaction.reply({ content: 'You can only execute this command within a guild.', ephemeral: true });

		await interaction.deferReply();

		if (!member.voice.channelId) return interaction.editReply(constructEmbed({ color: 'RED', description: 'You must be in a voice channel to run this command.' }));

		const connection = interaction.client.connections.get(interaction.guildId);

		if (!connection) {
			return interaction.editReply(constructEmbed({ color: 'RED', description: 'No music is currently playing.' }));
		}

		const isMemberDJ = await isDJ(member);
		if (!isMemberDJ) return interaction.editReply(constructEmbed({ color: 'RED', description: 'Only DJs can clear the queue.' }));

		if (connection.queue.length == 0) return interaction.editReply(constructEmbed({ color: 'RED', description: 'The queue is already empty.' }));

		connection.queue = [];
		await interaction.editReply(':put_litter_in_its_place: **Cleared!**');
	},
};