/**
 * @module permissions
 * @description Module to handle command/action permissions
 */

/**
 * @description Checks if a guild member is a DJ
 * @param {object} GuildMember GuildMember from discord.js
 */
module.exports.isDJ = async (GuildMember) => {
	if (GuildMember.permissions.has('MANAGE_GUILD')) return true;

	const roles = GuildMember.roles.cache;

	if (roles.map(x => x.name).includes('DJ')) return true;

	const DJRoleId = await GuildMember.client.db.getAsync(`librenote:settings:${GuildMember.guild.id}:djroleid`);

	return DJRoleId && roles.has(DJRoleId);
};

/**
 * @description Checks if a guild member can perform a bot action, if DJ mode is on and they are a DJ or if DJ mode is off
 * @param {object} GuildMember GuildMember from discord.js
 */
module.exports.canPerformAction = async (GuildMember) => {
	if (GuildMember.permissions.has('MANAGE_CHANNELS')) return true;

	const djModeEnabled = ((await GuildMember.client.db.getAsync(`librenote:settings:${GuildMember.guild.id}:djonlymode`)) == 'true');

	if (!djModeEnabled) return true;

	return module.exports.isDJ(GuildMember);
};

/**
 * @description Checks if a guild member is the only member in a voice channel, excluding the bot
 * @param {object} GuildMember GuildMember from discord.js
 */
module.exports.isOnlyListener = async (GuildMember) => {
	return GuildMember.voice.channel.members.size <= 2;
};