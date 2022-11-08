import discordClient from './src/config/DiscordBot.js';

// Start discord bot
discordClient.login(process.env.TOKEN);