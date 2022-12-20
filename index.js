require('dotenv/config');
const discordClient = require('./src/config/DiscordBot.js');

try {
	// Start discord bot

	discordClient;
}
catch (error) {
	console.log(error);
}