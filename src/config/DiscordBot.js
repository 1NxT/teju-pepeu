require('dotenv/config');
var Client, 
	GatewayIntentBits, 
	Intents = require('discord.js');
import { join, dirname } from 'path';
import { readdirSync } from 'fs';

// __dirname undefined resolve
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const eventsPath = join(__dirname, '../events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

eventFiles.forEach(async (file) => {
	const filePath = join(eventsPath, file);
	const event = await import(pathToFileURL(filePath));

	if (event.once) {
		discordClient.once(event.name, (...args) => event.execute(...args));
	}
	else {
		console.log(event);
		discordClient.on(event.name, (...args) => event.execute(...args));
	}
});

export default discordClient;