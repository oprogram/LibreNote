const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios').default;

const ghAPI = 'https://api.github.com';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meta')
		.setDescription('Github statistics'),

	guilds: null,

	async run(interaction) {
		await interaction.deferReply();

		let commitCount;
		await axios.get('https://api.github.com/repos/oprogram/librenote/compare/824419fa02abb81c9d52214e10dd6596ab50323e...main')
			.then(response => {
				commitCount = response.data.total_commits;
			}).catch(console.warn);

		let contribList;
		await axios.get('https://api.github.com/repos/oprogram/librenote/contributors?q=contributions&order=desc')
			.then(response => {
				contribList = response.data;
			}).catch(console.warn);

		const embed = new MessageEmbed().setAuthor('Meta');
		const topContrib = ['Top 5 Contributors\n'];
		for (let item of contribList) {
			if (contribList.indexOf(item) == 5) break;

			topContrib.push(`${item.login} (${item.contributions})`);
		}
		embed.setDescription(`\`\`\`${topContrib.join('\n')}\`\`\``)
			.addField('Total Commits', commitCount.toString(), true)
			.addField('Repository', '[oprogram/LibreNote](https://github.com/oprogram/LibreNote)', true);

		interaction.editReply({
			embeds: [ embed, ],
		});
	},
};