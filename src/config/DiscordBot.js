import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { Bot } from '../services/Bot.js';

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

discordClient.once(Events.ClientReady, async (c) => {
	const botService = new Bot;
	const botDados = {
		'id': c.user.id,
		'username': c.user.username,
		'discriminator': c.user.discriminator,
		'avatar': c.user.avatar,
	};
	await botService.findOrCreate(botDados);

	console.log(`${c.user.tag}`);
});


export default discordClient;