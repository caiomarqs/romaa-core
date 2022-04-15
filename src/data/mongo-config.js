import { MongoClient } from 'mongodb'
import { env } from '../dot-env';
import { OrdersCollection } from './orders-collection';
import { UserCollection } from './user-collection';

const uri = env.mongoUri

const client = new MongoClient(uri);

const runMongo = async () => {
    try {
        await client.connect();
        const db = client.db("romaa-core")
        await db.command({ ping: 1 });

        OrdersCollection.init(db.collection("orders"))
        UserCollection.init(db.collection("users"))

        console.log("Connected successfully to database")

    }
    catch {
        throw new Error("Mongo is down")
    }
}



export { runMongo }
