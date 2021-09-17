import { MongoClient } from 'mongodb'

class Db {
  db: null | MongoClient = null;

  constructor() {
    process.on('SIGTERM', this.clear)
  }

  async clear() {
    if (this.db instanceof MongoClient) {
      console.log('Clearing mongo connection.')
      await this.db.close()
      console.log('Cleared mongo connection.')
    }
  }

  async connect(): Promise<MongoClient> {
    try {
      const _db = await MongoClient.connect(process.env.MONGODB_URI);
      return _db
    } catch (e) {
      return e;
    }
  }

  async get(): Promise<MongoClient> {
    try {
      if (this.db !== null) {
        console.log('Reusing mongo connection.')
        return this.db;
      }

      console.log('Connecting to mongo...')
      this.db = await this.connect();
      console.log('Connected to mongo.')
      return this.db;
    } catch (e) {
      console.error(e)
      return e;
    }
  }
}

const mongo = new Db();

export default mongo