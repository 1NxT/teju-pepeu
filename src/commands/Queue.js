const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { player } = require('../config/Player.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Mostar a fila!'),
	async execute(interaction) {
		const queue = player.getQueue(interaction.guild);
		// Verificar se está tocando música (queue.playing)
		if (!queue || !queue.playing) {
			const embed = new EmbedBuilder()
				.setAuthor({ name: `🎼 Queue: ${interaction.member.guild.name}`, iconURL: `https://cdn.discordapp.com/icons/${interaction.member.guild.id}/${interaction.member.guild.icon}.gif` })
				.setColor(0x36393e)
				.setDescription('Nenhuma música tocando.');
			return interaction.reply({ embeds: [embed] });
		}

		await interaction.deferReply();
		const progress = queue.createProgressBar({
			'indicator': '💿',
			'line': '▬',
			'timecodes': true,
		});


		// Pagination
		const pages = [];
		const page = 1;
		const max_pages = Math.ceil(queue.tracks.length / 10);
		const cursorStart = 10 * (page - 1);
		const cursorEnd = cursorStart + 10;

		const tracks = queue.tracks.slice(cursorStart, cursorEnd);
		tracks.filter((e) => {
			let titulo = '';
			if (e.title.length > 57) {
				titulo = '🎤 - ' + e.title.substring(0, 59).trim() + '...';
			}
			else {
				titulo = '🎤 - ' + e.title;
			}

			pages.push(titulo);
			return e.title;
		});

		const embed = new EmbedBuilder()
			.setColor(0x36393e)
			.setAuthor({ name: `🎼 Queue: ${interaction.member.guild.name}`, iconURL: `https://cdn.discordapp.com/icons/${interaction.member.guild.id}/${interaction.member.guild.icon}.gif` })
			// .setAuthor({ name: `${interaction.member.guild.name}`, iconURL: `https://cdn.discordapp.com/icons/${interaction.member.guild.id}/${interaction.member.guild.icon}.gif` })
			.setThumbnail(`${queue.current.thumbnail}`)
			.addFields(
				{ name: '🎧 Música tocando', value: `\`${queue.current}\``, inline: true },
				{ name:  `${progress}`, value: '\u200B' },
			)
			.addFields(
				{ name: 'Fila', value: `${pages.length > 0 ? pages.join('\n') : 'Sem nenhuma música na fila.'}` },
			)
			.setTimestamp()
			.setFooter({ text: `${page}/${max_pages}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png` });

		// Buttons
		const buttons = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('queueback')
					.setEmoji('⬅️')
					.setStyle(ButtonStyle.Primary)
					.setDisabled(page <= 1),
			).addComponents(
				new ButtonBuilder()
					.setCustomId('queuefront')
					.setEmoji('➡️')
					.setStyle(ButtonStyle.Primary)
					.setDisabled(page >= max_pages),
			);
		return interaction.followUp({
			embeds: [embed],
			components: [buttons],
		});
	},
};