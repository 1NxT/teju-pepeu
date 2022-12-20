const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Responde com o informações do server!'),
	async execute(interaction) {
		const exampleEmbed = new EmbedBuilder()
			.setColor(0x36393e)
			// .setTitle(`${interaction.member.guild.name}`)
			.setAuthor({ name: 'INFORMAÇÕES DO SERVER', iconURL: `https://cdn.discordapp.com/icons/${interaction.member.guild.id}/${interaction.member.guild.icon}.gif` })
			// .setThumbnail(`https://cdn.discordapp.com/icons/${interaction.member.guild.id}/${interaction.member.guild.icon}.gif`)
			.addFields(
				{ name: 'SERVER NOME', value: `${interaction.member.guild.name}` },
			)
			.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
			.setTimestamp()
			.setFooter({ text: `${interaction.user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png` });

		return interaction.reply({
			embeds: [exampleEmbed],
		});
	},
};