const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) {return;}

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
	},
};