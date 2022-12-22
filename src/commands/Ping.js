const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responde com o ping do bot!'),
	async execute(interaction) {
		await interaction.deferReply();
		const embed = new EmbedBuilder()
			.setColor(0x36393e)
			.setAuthor({ name: `${interaction.member.guild.name}`, iconURL: `https://cdn.discordapp.com/icons/${interaction.member.guild.id}/${interaction.member.guild.icon}.gif` })
		// .setThumbnail(`https://cdn.discordapp.com/icons/${interaction.member.guild.id}/${interaction.member.guild.icon}.gif`)
			.addFields(
				{ name: 'Ping', value: `${Date.now() - interaction.createdTimestamp}ms` },
			)
			.setTimestamp()
			.setFooter({ text: `${interaction.user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png` });

		return interaction.followUp({ embeds: [embed] });
	},
};