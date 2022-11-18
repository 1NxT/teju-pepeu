require('dotenv/config');
const discordClient = require('./src/config/DiscordBot.js');

// Start discord bot
discordClient.login(process.env.TOKEN);