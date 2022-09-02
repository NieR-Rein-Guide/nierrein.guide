import AWS from 'aws-sdk'
import axios from 'axios'
import { env } from '../env'

AWS.config.update({
  accessKeyId: env.S3_ACCESS_KEY,
  secretAccessKey: env.S3_SECRET_KEY,
})

const s3 = new AWS.S3({
  endpoint: env.S3_ENDPOINT
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

export {
  s3,
  listModelsTypes,
  listFolders,
}
