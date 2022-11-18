require('dotenv/config');
const { Client, GatewayIntentBits } = require('discord.js');
const { join } = require('path');
const { readdirSync } = require('fs');

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const eventsPath = join(__dirname, '../events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

eventFiles.forEach(async (file) => {
	const filePath = join(eventsPath, file);
	const event = await require(filePath);

	if (event.once) {
		discordClient.once(event.name, (...args) => event.execute(...args));
	}
	else {
		discordClient.on(event.name, (...args) => event.execute(...args));
	}
});

module.exports = discordClient;