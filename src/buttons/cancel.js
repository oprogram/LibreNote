module.exports = {
	name: 'cancel',
	run: async (interaction) => {
		if (!interaction.message.interaction) return;

		interaction.deferUpdate();

		if (Date.now() > interaction.message.createdAt.getTime() + 120000) {
			interaction.reply({ ephemeral: true, content: '⛔ **This interaction has timed out**' });
			interaction.message.edit({ content: ':x: **Timed out**', components: [], embeds: [] });
			return;
		}

		if (interaction.user.id != interaction.message.interaction.user.id) return interaction.reply({ ephemeral: true, content: '⛔ Only the person who initiated this command can cancel it.' });

		await interaction.message.edit({ content: ':x: **Command cancelled**', components: [] });
	},
};