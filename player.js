const discordClient = require("./index.js")
console.log(discordClient)
// Discord player
const { Player } = require("discord-player");
const player = new Player(discordClient);

// add the trackStart event so when a song will be played this message will be sent


module.exports.player = player;