const { join } = require('path');
const { readdirSync } = require('fs');
const { discordClient } = require('./DiscordBot.js');
const eventsPath = join(__dirname, '../events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

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
