const fs = require('fs');
const path = require('path');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
const Redis = require('./utility/redis');
const { constructEmbed } = require('./utility/embedConstructor');

client.commands = new Collection();
client.context = new Collection();
client.buttons = new Collection();
client.menus = new Collection();

const commandFiles = fs.readdirSync(path.join(__dirname, '/commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(path.join(__dirname, '/commands', file));
	client.commands.set(command.data.name, command);
}

const contextMenuFiles = fs.readdirSync(path.join(__dirname, '/contextmenus')).filter(file => file.endsWith('.js'));

for (const file of contextMenuFiles) {
	const command = require(path.join(__dirname, '/contextmenus', file));
	client.context.set(command.data.name, command);
	console.log(`Registered context menu command ${command.data.name}`);
}

const menuFiles = fs.readdirSync(path.join(__dirname, '/menus')).filter(file => file.endsWith('.js'));

for (const file of menuFiles) {
	const menu = require(path.join(__dirname, '/menus', file));
	console.log(`Registered menu ${menu.name}`);
	client.menus.set(menu.name, menu);
}

const buttonFiles = fs.readdirSync(path.join(__dirname, '/buttons')).filter(file => file.endsWith('.js'));

for (const file of buttonFiles) {
	const button = require(path.join(__dirname, '/buttons', file));
	console.log(`Registered button ${button.name}`);
	client.buttons.set(button.name, button);
}

client.connections = new Map();
client.db = new Redis();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({ activities: [{ name: 'music' }], status: 'online' });
});

client.on('interactionCreate', async interaction => {
	const logError = async (error) => {
		const errorLog = await client.channels.fetch('970681678253150239');
		if (errorLog) {
			const embed = new MessageEmbed()
				.setTitle('Error Detected!')
				.addField('Type', 'Command Error')
				.addField('Error', `\`\`\`js\n${error}\n\`\`\``)
				.setColor('0x00AAFF');
			errorLog.send({ embeds: [embed] });
		}
	};

	const runInteraction = async (module, ...args) => {
		try {
			await module.run(...args);
		}
		catch (error) {
			console.error(error);
			logError(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.editReply(constructEmbed({ color: 'RED', description: 'There was an error while executing this command.' }));
			}
			else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	};

	if (interaction.isCommand()) {
		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		await runInteraction(command, interaction);
	}
	else if (interaction.isSelectMenu()) {
		const customId = interaction.customId;
		const args = customId.split('_');
		const handler = client.menus.get(args[0].toLowerCase());

		if (!handler) return;

		await runInteraction(handler, interaction, ...args);
	}
	else if (interaction.isButton()) {
		const customId = interaction.customId;
		const args = customId.split('_');
		const handler = client.buttons.get(args[0].toLowerCase());

		if (!handler) return;

		await runInteraction(handler, interaction, ...args);
	}
	else if (interaction.isContextMenu()) {
		const command = client.context.get(interaction.commandName);

		if (!command) return;

		await runInteraction(command, interaction);
	}
});

client.on('voiceStateUpdate', async (oldState, newState) => {
	// leave channel if no one else is in there and destroy the queue
	const connection = client.connections.get(oldState.guild.id);
	if (!!connection && (oldState.channelId != newState.channelId) && (oldState.member.id != client.id)) {
		if (connection.voiceConnection.joinConfig.channelId == oldState.channelId) {
			if (oldState.channel.members.size == 1) {
				connection.voiceConnection.destroy();
				client.connections.delete(oldState.guild.id);
			}
		}
	}
});

client.login(process.env.BOT_TOKEN);