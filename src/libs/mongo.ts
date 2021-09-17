import mongo from './db'

if (!process.env.MONGODB_URI) {
  throw new Error('env var: MONGODB_URI is not set')
}

// Database Name
const dbName = 'nierdump';

export async function getCostumes() {
  const client = await mongo.get();

  const db = client.db(dbName);
  const collection = db.collection('COSTUME_DATA');

  const results = await collection.find({}).toArray()
  return results;
}

export async function getWeapons() {
  const client = await mongo.get();

  const db = client.db(dbName);
  const collection = db.collection('WEAPON_DATA');

  const results = await collection.find({}).toArray()
  return results;
}

export async function getWeapon(id: number) {
  const client = await mongo.get();
  const db = client.db(dbName);
  const collection = db.collection('WEAPON_DATA');

  const results = await collection.find({ "EvolutionStages.WeaponId": id }).toArray()
  return results;
}

export async function getSingleCostume(CostumeId) {
  const client = await mongo.get();
  const db = client.db(dbName);
  const collection = db.collection('COSTUME_DATA');

  const results = await collection.find({
    CostumeId
  }).toArray()
  return results;
}