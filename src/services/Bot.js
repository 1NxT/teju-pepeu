const client = require('../config/MongoDb');

class Bot {
	constructor() {
		this.client = client;
		this.database = this.client.db(process.env.MONGODB_DATABASE);
		this.users = this.database.collection('bot_configs');
	}

	async findOrCreate(botDados) {
		try {
			const filter = {
				'id': botDados.id,
			};

			const options = {
				'returnOriginal': false,
				'upsert': true,
			};
			const doc = {
				'$set': {
					'id': botDados.id,
					'username': botDados.username,
					'discriminator': botDados.discriminator,
					'avatar': botDados.avatar,
				},
			};
			this.users.findOneAndUpdate(filter, doc, options);
		}
		finally {
			this.client.close();
		}
	}
}

module.exports = Bot;