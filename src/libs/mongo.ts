import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('env var: MONGODB_URI is not set')
}

// Database Name
const dbName = 'nierdump';

class Db {
  db = null;

  async connect() {
    try {
      const _db = await MongoClient.connect(process.env.MONGODB_URI);
      return _db
    } catch (e) {
      return e;
    }
  }

  async get() {
    try {
      if (this.db !== null) {
        return this.db;
      } else {
        console.log('Connecting to mongo...')
        this.db = await this.connect();
        console.log('Connected to mongo.')
        return this.db;
      }
    } catch (e) {
      console.error(e)
      return e;
    }
  }
}

const mongo = new Db();

export async function getCostumes() {
  const client = await mongo.connect();
  const db = client.db(dbName);
  const collection = db.collection('COSTUME_DATA');

  const results = await collection.find({}).toArray()
  return results;
}

export async function getWeapons() {
  const client = await mongo.connect();
  const db = client.db(dbName);
  const collection = db.collection('WEAPON_DATA');

  const results = await collection.find({}).toArray()
  return results;
}

export async function getWeapon(id: number) {
  const client = await mongo.connect();
  const db = client.db(dbName);
  const collection = db.collection('WEAPON_DATA');

  const results = await collection.find({ "EvolutionStages.WeaponId": id }).toArray()
  return results;
}

export async function getSingleCostume(CostumeId) {
  const client = await mongo.connect();
  const db = client.db(dbName);
  const collection = db.collection('COSTUME_DATA');

  const results = await collection.find({
    CostumeId
  }).toArray()
  return results;
}