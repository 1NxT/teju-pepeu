const { Collection } = require('discord.js');
const { discordClient } = require('./DiscordBot.js');
const { join } = require('path');
const { readdirSync } = require('fs');

// Registrando comandos
discordClient.commands = new Collection();

const commandsPath = join(__dirname, '../commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = join(commandsPath, file);
	const command = require(filePath);

	// Adicionar um novo item na Collection(L 29) com a chave sendo o nome do comando e dados sendo o módulo
	if ('data' in command && 'execute' in command) {
		console.log('Registrando comando:', command.data.name, '✅');
		discordClient.commands.set(command.data.name, command);
	}
	else {
		console.log(`⚠ O comando no caminho ${filePath} está faltando "data" ou "execute" propiedade.`);
	}
}