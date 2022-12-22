const { discordClient } = require('./DiscordBot.js');
const { Player } = require('discord-player');
const player = new Player(discordClient);
player.on('trackStart', (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`));

player.on('error', (queue, error) => {
	console.log(error);
});
module.exports.player = player;