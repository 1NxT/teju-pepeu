const { Events, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { player } = require('../config/Player.js');
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`Nenhum comando encontrado ${interaction.commandName}.`);
				return;
			}

			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.error(`Error excecutando ${interaction.commandName}`);
				console.error(error);
			}
		}
		else if (interaction.isButton()) {
			if (interaction.customId.includes('queue')) {

				// Buscar a fila
				const queue = player.getQueue(interaction.message.guildId);

				if (!queue || !queue.playing) {
					const embed = new EmbedBuilder()
						.setAuthor({ name: `🎼 Queue: ${interaction.member.guild.name}`, iconURL: `https://cdn.discordapp.com/icons/${interaction.member.guild.id}/${interaction.member.guild.icon}.gif` })
						.setColor(0x36393e)
						.setDescription('Nenhuma música tocando.');
					return interaction.update({ embeds: [embed], components: [] });
				}

				// Buscar embeds
				const embeds = interaction.message.embeds;
				// console.log(embeds[0].data.footer.text);
				// Paginar
				const pages = [];
				let page = 1;
				const max_pages = Math.ceil(queue.tracks.length / 10);


				[page] = embeds[0].data.footer.text.split('/');
				page = Number(page);
				switch (interaction.customId) {
				case 'queueback':
					page = page - 1;
					break;
				case 'queuefront':
					page = page + 1;
					break;
				default:
					break;
				}
				const cursorStart = 10 * (page - 1);
				const cursorEnd = cursorStart + 10;
				const tracks = queue.tracks.slice(cursorStart, cursorEnd);
				tracks.filter((e) => {
					let titulo = '';
					if (e.title.length > 57) {
						titulo = '🎤 - ' + e.title.substring(0, 61).trim() + '...';
					}
					else {
						titulo = '🎤 - ' + e.title;
					}

					pages.push(titulo);
					return e.title;
				});
				const progress = queue.createProgressBar({
					'indicator': '💿',
					'line': '▬',
					'timecodes': true,
				});

				// Criar novo embed
				const embed = new EmbedBuilder()
					.setColor(0x36393e)
					.setAuthor({ name: `🎼 Queue: ${interaction.member.guild.name}`, iconURL: `https://cdn.discordapp.com/icons/${interaction.member.guild.id}/${interaction.member.guild.icon}.gif` })
				// .setAuthor({ name: `${interaction.member.guild.name}`, iconURL: `https://cdn.discordapp.com/icons/${interaction.member.guild.id}/${interaction.member.guild.icon}.gif` })
				// .setThumbnail(`https://cdn.discordapp.com/icons/${interaction.member.guild.id}/${interaction.member.guild.icon}.gif`)
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

				return interaction.update({
					embeds: [embed],
					components: [buttons],
				});
			}

			return;
		}


	},
};