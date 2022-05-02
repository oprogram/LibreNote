const stations = require('../utility/stations.json');
const { createAudioResource } = require('@discordjs/voice');

module.exports = {
	name: 'station',
	run: async (interaction) => {
		const targetValue = interaction.values[0];

		interaction.deferUpdate();

		if (Date.now() > interaction.message.createdAt.getTime() + 120000) {
			interaction.reply({ ephemeral: true, content: '⛔ **This interaction has timed out**' });
			interaction.message.edit({ content: ':x: **Timed out**', components: [], embeds: [] });
			return;
		}

		if (interaction.user.id != interaction.message.interaction.user.id) return interaction.reply({ ephemeral: true, content: '⛔ Only the person who initiated this command can interact with the dropdown.' });

		if (!targetValue) return interaction.message.edit({ content: ':x: **No radio station specified.**', components: [] });

		await interaction.message.edit({ content: '📶 **Connecting to radio station...**', components: [] });

		let foundValue = false;

		for (let i = 0; i < stations.length; i++) {
			const [StationName, StationUrl] = stations[i];

			const formatted = StationName.toLowerCase().split(' ').join('_');

			if (formatted == targetValue) {
				foundValue = true;

				const connection = interaction.client.connections.get(interaction.guildId);

				if (!connection) {
					return interaction.message.edit({ content: ':x: **No music connection found.**', components: [] });
				}

				if (connection.mode != 'radio') {
					return interaction.message.edit({ content: ':x: **Not in radio mode.**', components: [] });
				}

				const resource = createAudioResource(StationUrl);
				connection.audioPlayer.play(resource);

				return interaction.message.edit({
					content: `📻 **Now playing: ${StationName}**`,
					components: [],
				});
			}
		}

		if (!foundValue) {
			return interaction.message.edit({ content: ':x **Could not fetch data for that radio station.**', components: [] });
		}
	},
};