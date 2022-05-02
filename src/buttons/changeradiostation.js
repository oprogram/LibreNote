const Discord = require('discord.js');
const stations = require('../utility/stations.json');

module.exports = {
	name: 'changeradiostation',
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

		const items = stations.length;
		const divided = (items / 15);
		const pageNumber = ((divided % 1 == 0) ? divided : Math.ceil(divided));

		await interaction.message.edit({
			content: '⬇️ **Select a radio station:**',
			components: [
				new Discord.MessageActionRow()
					.addComponents(
						new Discord.MessageSelectMenu({
							customId: 'station_1',
							options: stations.map(x => x[0]).sort().map(x => {
								return {
									label: x,
									value: (x.toLowerCase().split(' ').join('_')),
									emoji: '📻',
								};
							}),
							minValues: 1,
							maxValues: 1,
							disabled: false,
							placeholder: `Select a radio station (page 1 of ${pageNumber})`,
						}),
					),
				new Discord.MessageActionRow()
					.addComponents(
						new Discord.MessageButton()
							.setCustomId('back')
							.setStyle('PRIMARY')
							.setEmoji('◀️')
							.setDisabled(true),
						new Discord.MessageButton()
							.setCustomId('forward')
							.setStyle('PRIMARY')
							.setEmoji('▶️')
							.setDisabled(pageNumber <= 1),
						new Discord.MessageButton()
							.setCustomId('cancel')
							.setStyle('DANGER')
							.setLabel('Cancel')
							.setDisabled(false),
					),
			],
		});
	},
};