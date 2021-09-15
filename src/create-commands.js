const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const globalCommands = [];
const guildCommands = {};
const commandFiles = fs.readdirSync(path.join(__dirname, '/commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(path.join(__dirname, '/commands', file));
	if (!command.guilds) globalCommands.push(command.data.toJSON());

	if (Array.isArray(command.guilds)) {
		command.guilds.forEach(guild => {
			let existingArray = guildCommands[guild];

			if (!existingArray) {
				guildCommands[guild] = [];
				existingArray = guildCommands[guild];
			}

			existingArray.push(command.data.toJSON());
		});
	}
}

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

(async () => {
	try {
		// TODO: Global commands/specific guild implementation
		await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: globalCommands },
		);

		console.log('Successfully registered global commands.');
	}
	catch (error) {
		console.error(error);
	}

	for (const guild in guildCommands) {
		const commands = guildCommands[guild];

		try {
			await rest.put(
				Routes.applicationGuildCommands(process.env.CLIENT_ID, guild),
				{ body: commands },
			);

			console.log('Successfully registered commands for guild:', guild);
		}
		catch (error) {
			console.error(error);
		}
	}
})();