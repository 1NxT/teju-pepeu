export class UserModel {
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