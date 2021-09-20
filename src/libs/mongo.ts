import mongo from './db'
import pMemoize from 'p-memoize';

if (!process.env.MONGODB_URI) {
  throw new Error('env var: MONGODB_URI is not set')
}

// Database Name
const dbName = 'nierdump';

async function getCostumes() {
  const client = await mongo.get();

  const db = client.db(dbName);
  const collection = db.collection('COSTUME_DATA');

  const results = await collection.find({}).toArray()
  return results;
}

async function getWeapons() {
  const client = await mongo.get();

  const db = client.db(dbName);
  const collection = db.collection('WEAPON_DATA');

  const results = await collection.find({}).toArray()
  return results;
}

async function getWeapon(id: number) {
  const client = await mongo.get();
  const db = client.db(dbName);
  const collection = db.collection('WEAPON_DATA');

  const results = await collection.find({ "EvolutionStages.WeaponId": id }).toArray()
  return results;
}

async function getSingleCostume(CostumeId) {
  const client = await mongo.get();
  const db = client.db(dbName);
  const collection = db.collection('COSTUME_DATA');

  const results = await collection.find({
    CostumeId
  }).toArray()
  return results;
}

async function getMemoirs() {
  const client = await mongo.get();
  const db = client.db(dbName);
  const collectionIndividual = db.collection('MEMOIR_DATA_INDIVIDUAL');
  const collectionSeries = db.collection('MEMOIR_DATA_SERIES');

  const [series, individuals] = await Promise.all([
    collectionSeries.find({}).toArray(),
    collectionIndividual.find({}).toArray()
  ])

  return {
    series,
    individuals,
  };
}

const memGetCostumes = pMemoize(getCostumes, {
  maxAge: 1000 * 60 * 60 * 24
});
const memGetWeapons = pMemoize(getWeapons, {
  maxAge: 1000 * 60 * 60 * 24
});
const memGetWeapon = pMemoize(getWeapon, {
  maxAge: 1000 * 60 * 60 * 24
});
const memGetSingleCostume = pMemoize(getSingleCostume, {
  maxAge: 1000 * 60 * 60 * 24
});
const memGetMemoirs = pMemoize(getMemoirs, {
  maxAge: 1000 * 60 * 60 * 24
});

export {
  memGetCostumes as getCostumes,
  memGetWeapons as getWeapons,
  memGetWeapon as getWeapon,
  memGetSingleCostume as getSingleCostume,
  memGetMemoirs as getMemoirs,
}