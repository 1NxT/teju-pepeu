const { discordClient } = require('./DiscordBot.js');
const { Player } = require('discord-player');
const player = new Player(discordClient);

player.on('error', (queue, error) => {
	console.log(`[${queue.guild.name}] Erro na fila: ${error.message}`);
});
player.on('connectionError', (queue, error) => {
	console.log(`[${queue.guild.name}] Erro na conexão: ${error.message}`);
});

player.on('trackStart', (queue, track) => {
	queue.metadata.channel.send(`🎶 | Tocando: **${track.title}** em **${queue.connection.channel.name}**!`);
});

player.on('trackAdd', (queue, track) => {
	queue.metadata.channel.send(`🎶 | Música **${track.title}** colocada na fila!`);
});

player.on('botDisconnect', (queue) => {
	queue.metadata.channel.send('❌ | Fui desconectado do canal, limpando fila!');
});

player.on('channelEmpty', (queue) => {
	queue.metadata.channel.send('❌ | Sozinho no canal... saindo.');
});

player.on('queueEnd', (queue) => {
	queue.metadata.channel.send('✅ | Fim da fila!');
});

module.exports.player = player;