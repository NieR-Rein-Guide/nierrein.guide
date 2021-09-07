import { MongoClient } from 'mongodb'

// Connection URL
const client = new MongoClient(process.env.MONGODB_URI);

// Database Name
const dbName = 'nierdump';

export async function getCostumes() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('COSTUME_DATA');

  const results = await collection.find({}).toArray()
  return results;
}

export async function getSingleCostume(CostumeId) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('COSTUME_DATA');

  const results = await collection.find({
    CostumeId
  }).toArray()
  return results;
}