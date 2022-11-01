import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = `${process.env.MONGODB_URL}`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export default client;
