require('dotenv/config');
const express = require('express');
const { discordClient } = require('./src/config/DiscordBot.js');
require('./src/config/Player.js');
require('./src/config/Event.js');
require('./src/config/Commands.js');
const app = express();
app.get('/', (req, res) => {
	return res.send('Online!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	discordClient.login(process.env.TOKEN);
	console.log('Online!');
});

