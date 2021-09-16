module.exports.isDJ = async (GuildMember) => {
	/* Checks if a guild member is a DJ */

	if (GuildMember.permissions.has('MANAGE_CHANNELS')) return true;

	const roles = GuildMember.roles.cache;

	if (roles.map(x => x.name).includes('DJ')) return true;

	const DJRoleId = await GuildMember.client.db.getAsync(`librenote:settings:${GuildMember.guild.id}:djroleid`);

	return DJRoleId && roles.has(DJRoleId);
};

module.exports.canPerformAction = async (GuildMember) => {
	/* Checks if a guild member can perform a bot action, if DJ mode is on and they are a DJ or if DJ mode is off */

	if (GuildMember.permissions.has('MANAGE_CHANNELS')) return true;

	const djModeEnabled = ((await GuildMember.client.db.getAsync(`librenote:settings:${GuildMember.guild.id}:djonlymode`)) == 'true');

	if (!djModeEnabled) return true;

	return module.exports.isDJ(GuildMember);
};

