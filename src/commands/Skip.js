const { SlashCommandBuilder } = require('discord.js');
const { player } = require('../config/Player.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Pular música!'),
	async execute(interaction) {
		if (!interaction.member.voice.channelId) return await interaction.reply({ content: 'Você não está em um canal de voz!', ephemeral: true });
		if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return await interaction.reply({ content: 'Você precisa estar no mesmo canal de voz!', ephemeral: true });

		await interaction.deferReply();
		const queue = player.getQueue(interaction.guildId);
		if (queue.tracks.length == 0) return await interaction.followUp({ content: 'Nenhuma música na fila!' });

		console.log(queue);
		queue.skip();
		return await interaction.followUp({ content: 'Música pulada!' });
	},
};