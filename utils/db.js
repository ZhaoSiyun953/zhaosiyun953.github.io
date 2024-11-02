const {MongoClient} = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "zsyPortrait";
const collectionName = "messages";

const client = new MongoClient(url);

const handleDB = async(cb) => {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    const result = await cb(client, db, collection)
    await client.close()
    return result || ""
}

const insertMsg = async (msg) => {
    await handleDB(async (client, db, collection) => {
        return collection.insertOne(msg)
    })
}

const getMessages = async () => {
    return handleDB(async (client, db, collection) => {
        return await collection.find().toArray()
    })
}

module.exports = {
    insertMsg,
    getMessages
}