const { discordClient } = require('./DiscordBot.js');
const { Player } = require('discord-player');
const player = new Player(discordClient);
player.on('trackStart', (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`));
module.exports.player = player;