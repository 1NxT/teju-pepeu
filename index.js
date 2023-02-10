require('dotenv/config');
const { discordClient } = require('./src/config/DiscordBot.js');
require('./src/config/Player.js');
require('./src/config/Event.js');
require('./src/config/Commands.js');

discordClient.login(process.env.TOKEN);