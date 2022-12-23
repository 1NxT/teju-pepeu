require('dotenv/config');
const express = require('express');
const app = express();
app.get('/', (req, res) => {
	return res.send('Online!');
});

app.listen(5000, () => {
	console.log('Online!');
});
const { discordClient } = require('./src/config/DiscordBot.js');
require('./src/config/Player.js');
require('./src/config/Event.js');
require('./src/config/Commands.js');

discordClient.login(process.env.TOKEN);