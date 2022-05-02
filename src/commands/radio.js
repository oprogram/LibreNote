const { SlashCommandBuilder } = require('@discordjs/builders');
const { constructEmbed } = require('../utility/embedConstructor');
const { joinVoiceChannel } = require('@discordjs/voice');
const { canPerformAction } = require('../utility/permissions');
const MusicConnection = require('../utility/musicConnection');
const Discord = require('discord.js');
const stations = require('../utility/stations');

module.exports = {
	// data of the command
	data: new SlashCommandBuilder()
		.setName('radio')
		.setDescription('radio test thing'),
	// array of guild ids, null for global command
	guilds: null,
	// method to run the command
	async run(interaction) {
		const member = interaction.member;

		if (!member) return interaction.reply({ content: 'You can only execute this command within a guild.', ephemeral: true });

		await interaction.deferReply();

		if (!member.voice.channelId) return interaction.editReply(constructEmbed({ color: 'RED', description: 'You must be in a voice channel to run this command.' }));
		if (!member.voice.channel.joinable) return interaction.editReply(constructEmbed({ color: 'RED', description: 'I cannot join your voice channel.' }));

		const canUseCommand = await canPerformAction(member);
		if (!canUseCommand) return interaction.editReply(constructEmbed({ color: 'RED', description: 'DJ only mode is enabled. You must be a DJ to run this command.' }));

		let connection = interaction.client.connections.get(interaction.guildId);

		if (!connection) {
			connection = new MusicConnection(
				joinVoiceChannel({
					channelId: member.voice.channelId,
					guildId: interaction.guild.id,
					adapterCreator: interaction.guild.voiceAdapterCreator,
				}),
			);
			connection.voiceConnection.on('error', console.warn);
			interaction.client.connections.set(interaction.guildId, connection);
		}

		if (!connection) {
			return interaction.editReply('An error occured while attempting to play music.');
		}

		if (connection.mode == 'radio') {
			return await interaction.editReply({
				content: '**Would you like to change the radio station or exit radio mode?**',
				components: [
					new Discord.MessageActionRow()
						.addComponents(
							new Discord.MessageButton()
								.setCustomId('changeradiostation')
								.setStyle('PRIMARY')
								.setLabel('Change Station')
								.setDisabled(false),
							new Discord.MessageButton()
								.setCustomId('exitradiomode')
								.setStyle('DANGER')
								.setLabel('Exit Radio Mode')
								.setDisabled(false),
							new Discord.MessageButton()
								.setCustomId('cancel')
								.setStyle('DANGER')
								.setLabel('Cancel')
								.setDisabled(false),
						),
				],
			});
		}
		else {
			connection.changeMode('radio');
			await interaction.editReply('**Please wait...**');

			const items = stations.length;
			const divided = (items / 15);
			const pageNumber = ((divided % 1 == 0) ? divided : Math.ceil(divided));

			await interaction.editReply({
				content: '⬇️ **Select a radio station:**',
				components: [
					new Discord.MessageActionRow()
						.addComponents(
							new Discord.MessageSelectMenu({
								customId: 'station_1',
								// station_pagenumber
								options: stations.map(x => x[0]).sort().map(x => {
									return {
										label: x,
										value: (x.toLowerCase().split(' ').join('_')),
										emoji: '📻',
									};
								}),
								// max of 25 options
								minValues: 1,
								maxValues: 1,
								disabled: false,
								placeholder: `Select a radio station (page 1 of ${pageNumber})`,
							}),
						),
					new Discord.MessageActionRow()
						.addComponents(
							new Discord.MessageButton()
								.setCustomId('back')
								.setStyle('PRIMARY')
								.setEmoji('◀️')
								.setDisabled(true),
							new Discord.MessageButton()
								.setCustomId('forward')
								.setStyle('PRIMARY')
								.setEmoji('▶️')
								.setDisabled(pageNumber <= 1),
							new Discord.MessageButton()
								.setCustomId('cancel')
								.setStyle('DANGER')
								.setLabel('Cancel')
								.setDisabled(false),
						),
				],
			});
		}
	},
};