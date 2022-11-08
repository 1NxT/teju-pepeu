import { Events } from 'discord.js';

export const name = Events.MessageCreate;
export function execute(message) {
	if (message.author.bot) return false;

	if (message.content.includes('@here') || message.content.includes('@everyone') || message.type == 'REPLY') return false;

	// if (message.mentions.has(client.user.id)) {
	message.channel.send('Hello there!');
	// }
}