const {MongoClient} = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const test = async () => {
    const dbName = "zsyPortrait";
    const collectionName = "messages";

    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    client.close();
    return "connect success.";
}

test().then((result) => {
    console.log(result)
}).catch(e => {
    console.log(e)
})