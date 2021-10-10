const Discord = require('discord.js');

/**
 * @module embedConstructor
 * @description Module to handle embed construction, simplyfing the process
 */


/**
 * @method constructEmbed
 * @description Checks if a guild member is a DJ
 * @param {object} options options for the embed (i.e. {color: 'red', description: ''})
 * @returns {object} discord.js message options
 */
module.exports.constructEmbed = (options) => {
	const embed = new Discord.MessageEmbed();

	if (options.title) embed.setTitle(options.title);
	if (options.description) embed.setDescription(options.description);
	if (options.author) embed.setAuthor(options.author);
	if (options.color) embed.setColor(options.color);
	if (options.thumbnail) embed.setThumbnail(options.thumbnail);
	if (options.image) embed.setImage(options.image);
	if (options.url) embed.setURL(options.url);
	if (options.timestamp) embed.setTimestamp(options.timestamp);
	if (options.fields) {
		for (const field of options.fields) {
			if (Array.isArray(field)) {
				embed.addField(field[0] ?? 'NO VALUE', field[1] ?? 'NO VALUE', !!field[2]);
			}
		}
	}
	if (options.footer) embed.setFooter(options.footer);

	return {
		embeds: [embed],
	};
};