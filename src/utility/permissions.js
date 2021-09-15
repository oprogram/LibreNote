module.exports.isDJ = async (GuildMember) => {
	if (GuildMember.permissions.has('MANAGE_CHANNELS')) return true;

	const roles = GuildMember.roles.cache;

	if (roles.map(x => x.name).includes('DJ')) return true;

	const DJRoleId = await GuildMember.client.db.getAsync(`librenote:settings:${GuildMember.guild.id}:djroleid`);

	return DJRoleId && roles.has(DJRoleId);
};