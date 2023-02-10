const client = require('../config/MongoDb.js');

class User {
	constructor() {
		this.client = client;
		this.database = this.client.db(process.env.MONGODB_DATABASE);
		this.users = this.database.collection('users');
	}
}

module.exports = User;