const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const globalCommands = [];
const guildCommands = {};
const commandFiles = fs.readdirSync(path.join(__dirname, '/commands')).filter(file => file.endsWith('.js'));

function arraysEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	a.sort();
	b.sort();

	for (let i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}

const optionsEqual = (a, b) => {
	if (a === b) return true;
	if (!a && !b) return true;
	if (!Array.isArray(a)) return false;
	if (!Array.isArray(b)) return false;

	a.sort();
	b.sort();

	for (const optionA in a) {
		let foundExisting = false;

		for (const optionB in b) {
			if (optionA.name == optionB.name) {
				if (
					!(optionA.type == optionB.type
					&& optionA.description == optionB.description
					&& optionA.required == optionB.required
					&& ((!optionA.choices && !optionB.choices) || arraysEqual(optionA, optionB)))
				) {
					return false;
				}

				foundExisting = true;

				break;
			}
		}

		if (!foundExisting) return false;
	}

	return true;
};

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
		const existingGlobalCommands = await rest.get(
			Routes.applicationCommands(process.env.CLIENT_ID),
		);

		if (!existingGlobalCommands) {
			console.error('Failed to fetch global application commands.');
			process.exit(1);
		}

		let shouldReRegister = false;
		for (const newCommand of globalCommands) {
			let foundCommand = false;
			for (const existingCommand of existingGlobalCommands) {
				if ((newCommand.name == existingCommand.name)) {
					foundCommand = true;
					const descriptionEquals = newCommand.description === existingCommand.description;
					const optionsExist = !(newCommand.options.length === 0 && !existingCommand.options);
					const optionsSame = optionsEqual(newCommand.options, existingCommand.options);

					if (!descriptionEquals) {
						shouldReRegister = true;
						console.log(`${newCommand.name} description is not equal to existing description.`);
					}

					if (optionsExist && !optionsSame) {
						shouldReRegister = true;
						console.log(`${newCommand.name} options are not equal to existing options.`);
					}


					break;
				}
			}

			if (!foundCommand) {
				console.log(`Could not find existing command for ${newCommand.name}.`);
				shouldReRegister = true;
			}
		}

		if (shouldReRegister) {
			console.log('Re-registering global commands.');

			await rest.put(
				Routes.applicationCommands(process.env.CLIENT_ID),
				{ body: globalCommands },
			);

			console.log('Successfully registered global commands.');
		}
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