const { Events } = require('discord.js');

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
			console.log(interaction.createdTimestamp);
			if (interaction.customId === 'pingreload') {
				const embeds = interaction.message.embeds;
				embeds[0].data.fields.value = `Bot latency: ${Date.now() - interaction.createdTimestamp}ms`;
				return interaction.update({
					embeds: embeds,
				});
			}
			console.log(interaction);

			return;
		}


	},
};