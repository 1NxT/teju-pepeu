const { SlashCommandBuilder } = require('discord.js');
const { player } = require('../config/Player.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Tocar música!')
		.addStringOption(option =>
			option
				.setName('query')
				.setDescription('URL ou nome')
				.setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.voice.channelId) return await interaction.reply({ content: 'Você não está em um canal de voz!', ephemeral: true });
		if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return await interaction.reply({ content: 'Eu já estou em um canal de voz!', ephemeral: true });
		const query = interaction.options.getString('query');
		const queue = player.createQueue(interaction.guild, {
			metadata: {
				channel: interaction.channel,
			},
		});

		// Verificar conexão da voz
		try {
			if (!queue.connection) await queue.connect(interaction.member.voice.channel);
		}
		catch {
			queue.destroy();
			return await interaction.reply({ content: 'Não foi possível conectar no seu canal de voz!', ephemeral: true });
		}

		await interaction.deferReply();
		const track = await player.search(query, {
			requestedBy: interaction.user,
		}).then(x => x.tracks[0]);
		if (!track) return await interaction.followUp({ content: `❌ | Música **${query}** não encontrada!` });

		queue.play(track);

		return await interaction.followUp({ content: `⏱️ | Carregando música **${track.title}**!` });
	},
};