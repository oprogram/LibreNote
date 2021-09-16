const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	// data of the command
	data: new SlashCommandBuilder()
		.setName('config')
		.setDescription('Configure the bot.')
		.addSubcommand(subcommand => subcommand.setName('djrole').setDescription('Set the DJ role').addRoleOption(roleoption => roleoption.setName('role').setDescription('The DJ role').setRequired(true)))
		.addSubcommand(subcommand => subcommand.setName('djonlymode').setDescription('Toggles DJ only mode on/off')),
	// array of guild ids, null for global command
	guilds: null,
	// method to run the command
	async run(interaction) {
		if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply('You must have the `MANAGE_CHANNELS` permission to edit the configuration.');

		await interaction.deferReply();

		const subCommand = interaction.options.getSubcommand();

		if (subCommand === 'djrole') {
			const role = interaction.options.getRole('role');

			await interaction.client.db.setAsync(`librenote:settings:${interaction.guild.id}:djroleid`, role.id);
			return interaction.editReply(`Successfully set the DJ role to <@&${role.id}>.`);
		}
		else if (subCommand === 'djonlymode') {
			// toggle djonlymode
			const djModeEnabled = !!(await interaction.client.db.getAsync(`librenote:settings:${interaction.guild.id}:djonlymode`));

			await interaction.client.db.setAsync(`librenote:settings:${interaction.guild.id}:djonlymode`, !djModeEnabled);
			return interaction.editReply(`Successfully **${djModeEnabled ? 'disabled' : 'enabled'}** DJ only mode.`);
		}
	},
};