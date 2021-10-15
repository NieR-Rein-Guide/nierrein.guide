import AWS from 'aws-sdk'
import axios from 'axios'
const region = process.env.REGION

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region
})

const s3 = new AWS.S3({
  endpoint: `s3.${region}.${process.env.S3_DOMAIN}`
})

async function listModelsTypes() {
  const { CommonPrefixes } = await listFolders()

  const types = CommonPrefixes.map(prefix => prefix.Prefix)

  return types
}

function listFolders(prefix = null, delimiter = '/'): Promise<AWS.S3.ListObjectsV2Output> {
  return new Promise((resolve, reject) => {
    s3.listObjectsV2({
      Bucket: 'models',
      Delimiter: delimiter,
      Prefix: prefix
    }, (error, data) => {
      if (error) {
        return reject(error)
      }

      resolve(data)
    })
  })
}

type SheetsTypes = 'characters' | 'ranks' | 'character-abilities' | 'pvp-tier' | 'tierlist-info' | 'weapons' | 'pve-tier_subj'

class Sheets {
  endpoint = process.env.API_DUMPS_ENDPOINT

  cache = new Map()

  constructor() {
    setInterval(() => {
      this.cache.clear()
    }, 1000 * 60 * 60)
  }

  /**
   * Get request to the dumps endpoint, fetch a .json file
   */
  async get(type: SheetsTypes) {
    if (this.cache.has(type)) {
      return this.cache.get(type)
    }

    const { data } = await axios.get(`${this.endpoint}${type}.json`)
    this.cache.set(type, data)

    return data
  }
}

const sheets = new Sheets()


export {
  s3,
  listModelsTypes,
  listFolders,
  sheets
}
