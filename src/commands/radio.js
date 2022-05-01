const { SlashCommandBuilder } = require('@discordjs/builders');
const { constructEmbed } = require('../utility/embedConstructor');
const { joinVoiceChannel, createAudioResource } = require('@discordjs/voice');
const { canPerformAction } = require('../utility/permissions');
const MusicConnection = require('../utility/musicConnection');

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
			await interaction.followUp(':asterisk: **Switched to radio mode.**');

			const resource = createAudioResource('http://listen-gbnews.sharp-stream.com/gbnews.mp3');
			connection.audioPlayer.play(resource);

			return interaction.editReply(constructEmbed({ color: 'BLUE', description: 'display select radio station thing' }));
		}
	},
};