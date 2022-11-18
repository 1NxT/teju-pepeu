require('dotenv/config');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `${process.env.MONGODB_URL}`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = client;
