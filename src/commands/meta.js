const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios').default;

const ghAPI = 'https://api.github.com';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meta')
		.setDescription('Github statistics'),

	guilds: ['880093118538584095'],

	async run(interaction) {
		await interaction.deferReply();

		let commitCount;
		await axios.get(ghAPI + '/repos/LibreNoteBot/librenote/commits')
			.then(response => {
				commitCount = response.data.length;
			}).catch(error => {
				console.warn(error);
			});

		let contribList;
		await axios.get(ghAPI + '/repos/LibreNoteBot/librenote/contributors?q=contributions&order=desc')
			.then(response => {
				contribList = response.data;
			}).catch(error => {
				console.warn(error);
			});

		const embed = new MessageEmbed().setAuthor('Meta');
		const topContrib = [ '`Top 5 Contributors`' ];
		for (let i = 0; i < contribList.length; ++i) {
			if (i == 5) break;

			topContrib.push(`${contribList[i].login} (${contribList[i].contributions})`);
		}
		embed.setDescription(topContrib.join('\n'))
			.addField('Total Commits', commitCount.toString(), true);

		interaction.editReply({
			embeds: [
				embed,
			],
		});
	},
};