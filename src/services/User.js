const client = require('../config/MongoDb.js');

class User {
	constructor() {
		this.client = client;
		this.database = this.client.db(process.env.MONGODB_DATABASE);
		this.users = this.database.collection('users');
	}

	async findOrCreate(userDados) {
		try {
			const filter = {
				'user_id': userDados.user_id,
			};

			const options = {
				'returnOriginal': false,
				'upsert': true,
			};

			const doc = {
				'$set': {
					'user_id': userDados.user_id,
					'user_avatar': userDados.user_avatar,
				},
			};
			this.users.findOneAndUpdate(filter, doc, options);

		}
		finally {
			this.client.rel;
		}
	}
}

module.exports = User;