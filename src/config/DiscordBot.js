require('dotenv/config');
const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const { join } = require('path');
const { readdirSync } = require('fs');

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const eventsPath = join(__dirname, '../events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Registrando comandos
discordClient.commands = new Collection();

const commandsPath = join(__dirname, '../commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const commands = [];

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

	commands.push(command.data.toJSON());
}

// Deploy commands globalmente
(async () => {
	try {
		console.log(`Iniciando deploy de ${commands.length}(/) comandos.`);

		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands },
		);

		console.log(`Finalizado o deploy de ${data.length}(/) comandos.`);
	}
	catch (error) {
		console.error(error);
		throw Error('Ocorreu um problema no deploy dos comandos!');
	}
})();

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