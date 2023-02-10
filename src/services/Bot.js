const client = require('../config/MongoDb');

class Bot {
	constructor() {
		this.client = client;
		this.database = this.client.db(process.env.MONGODB_DATABASE);
		this.users = this.database.collection('bot_configs');
	}
}

module.exports = Bot;