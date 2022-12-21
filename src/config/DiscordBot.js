require('dotenv/config');
const { Client, GatewayIntentBits } = require('discord.js');

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates] });
module.exports.discordClient = discordClient;