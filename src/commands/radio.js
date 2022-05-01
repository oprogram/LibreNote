const { SlashCommandBuilder } = require('@discordjs/builders');
const { constructEmbed } = require('../utility/embedConstructor');
const { joinVoiceChannel, createAudioResource } = require('@discordjs/voice');
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
	guilds: ['953064066576949348'],
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
			// ask if they want to change radio station OR switch to queue mode via buttons

			connection.changeMode('queue');
			return interaction.editReply(':asterisk: **Switched to queue mode.**');
		}
		else {
			connection.changeMode('radio');
			await interaction.editReply('Please wait...');

			const message = await interaction.editReply({
				content: '-',
				embeds: constructEmbed({ color: 'BLUE', title: 'Select radio station', description: stations[0].map(x => x[0] + ' ' + x[1]).join('\n'), footer: `Viewing page 1 of ${stations.length}` }).embeds,
				components: [
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
								.setDisabled(stations.length <= 1),
						),
				],
			});

			const reactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

			const getPage = (reaction) => {
				return 1;
			};

			const filter = (reaction, user) => {
				if (user.id != member.id) return false;

				const index = reactions.indexOf(reaction.emoji.name);

				if (index < 0) return false;

				const page = getPage(reaction);

				if ((index + 1) > stations[page - 1].length) return false;

				return true;
			};

			const collector = message.createReactionCollector({ filter, time: 60000, max: 1 });

			collector.on('end', collected => {
				if (collected.size == 0) {
					interaction.followUp(':x: **Timed out.**');
				}
				else {
					const reaction = collected.first();
					const page = getPage(reaction);
					const index = reactions.indexOf(reaction.emoji.name);

					const data = stations[page - 1][index];

					if (data) {
						const resource = createAudioResource(data[2]);
						connection.audioPlayer.play(resource);

						message.reactions.removeAll();
						return interaction.editReply({
							content: `📻 **Now playing: ${data[1]}**`,
							embeds: [],
							components: [],
						});
					}
					else {
						return interaction.editReply(constructEmbed({ color: 'RED', description: 'Failed to getch resource.' }));
					}
				}
			});

			for (let i = 0; ((i < reactions.length) && (i < stations[0].length)); i++) {
				if (reactions[i]) {
					await message.react(reactions[i]);
				}
			}
		}
	},
};