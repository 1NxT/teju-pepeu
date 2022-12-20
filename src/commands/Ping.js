const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responde com o ping do bot!'),
	async execute(interaction) {
		return interaction.reply(`Bot latency: ${Date.now() - interaction.createdTimestamp}ms`);
	},
};