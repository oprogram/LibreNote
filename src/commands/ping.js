const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	// data of the command
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Returns with pong!'),
	// array of guild ids, null for global command
	guilds: ['880093118538584095'],
	// method to run the command
	async run(interaction) {
		await interaction.reply('Pong!');
	},
};