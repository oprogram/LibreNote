module.exports = {
	name: 'exitradiomode',
	run: async (interaction) => {
		if (!interaction.message) return;

		interaction.deferUpdate();

		if (Date.now() > interaction.message.createdAt.getTime() + 120000) {
			interaction.reply({ ephemeral: true, content: '⛔ **This interaction has timed out**' });
			interaction.message.edit({ content: ':x: **Timed out**', components: [], embeds: [] });
			return;
		}

		if (interaction.user.id != interaction.message.interaction.user.id) return interaction.reply({ ephemeral: true, content: '⛔ Only the person who initiated this command can interact with the dropdown.' });

		const connection = interaction.client.connections.get(interaction.guildId);

		if (!connection) {
			return interaction.message.edit({ content: ':x: **No music connection found**', components: [] });
		}

		if (connection.mode != 'radio') {
			return interaction.message.edit({ content: ':x: **Not in radio mode**', components: [] });
		}

		await interaction.message.edit({ content: '**Please wait...**', components: [] });

		connection.changeMode('queue');
		return interaction.message.edit(':asterisk: **Switched to queue mode**');
	},
};