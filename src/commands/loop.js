const { SlashCommandBuilder } = require('@discordjs/builders');
const { canPerformAction } = require('../utility/permissions');
const { constructEmbed } = require('../utility/embedConstructor');

const modes = ['off', 'queue', 'track'];
const text = [':arrow_forward: **Loop mode set to off.**', ':repeat: **Loop mode set to __queue__.**', ':repeat_one: **Loop mode set to __track__.**'];

module.exports = {
	// data of the command
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Cycles through looping the queue, the current track and not looping.'),
	// array of guild ids, null for global command
	guilds: null,
	// method to run the command
	async run(interaction) {
		const member = interaction.member;

		if (!member) return interaction.reply({ content: 'You can only execute this command within a guild.', ephemeral: true });

		await interaction.deferReply();

		const canUseCommand = await canPerformAction(member);
		if (!canUseCommand) return interaction.editReply(constructEmbed({ color: 'RED', description: 'DJ only mode is enabled. You must be a DJ to run this command.' }));

		if (!member.voice.channelId) return interaction.editReply(constructEmbed({ color: 'RED', description: 'You must be in a voice channel to run this command.' }));

		const connection = interaction.client.connections.get(interaction.guildId);

		if (!connection) {
			return interaction.editReply(constructEmbed({ color: 'RED', description: 'No music is currently playing.' }));
		}

		const currentModeIndex = modes.indexOf(connection.loop);
		if (currentModeIndex < 0) return interaction.editReply(constructEmbed({ color: 'RED', description: 'An error occured while trying to change the loop mode.' }));

		let nextMode = currentModeIndex + 1;
		if (nextMode > (modes.length - 1)) nextMode = 0;

		connection.loop = modes[nextMode];

		await interaction.editReply(text[nextMode]);
	},
};