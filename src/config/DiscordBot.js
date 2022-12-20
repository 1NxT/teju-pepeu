require('dotenv/config');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { join } = require('path');
const { readdirSync } = require('fs');

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const eventsPath = join(__dirname, '../events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

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

// Registrando eventos
eventFiles.forEach(async (file) => {
	try {
		const filePath = join(eventsPath, file);
		const event = await require(filePath);
		console.log('Registrando evento:', event.name, '✅');
		if (event.once) {
			discordClient.once(event.name, (...args) => event.execute(...args));
		}
		else {
			discordClient.on(event.name, (...args) => event.execute(...args));
		}
	}
	catch (error) {
		console.log(error);
	}
});

// Iniciar o bot
discordClient.login(process.env.TOKEN);
// Exportar o discord client
module.exports = discordClient;