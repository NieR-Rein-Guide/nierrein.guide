import { s3 } from "@libs/s3";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from 'formidable'
import { v4 as uuid } from '@lukeed/uuid'
import { readFileSync } from "fs";
import axios from 'axios'

const BUCKET_NAME = 'users-submissions'
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL_DATA_SUBMISSIONS

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = await new Promise((resolve, reject) => {
        const form = new formidable()

        form.parse(req, (err, fields, files) => {
          if (err) reject({ err })
          resolve({ err, fields, files })
        })
      })


      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { fields, files } = data

      if (!files.file) {
        return res.status(400).json({ message: 'No file' })
      }

      const buffer = readFileSync(files.file.path)

      console.log(buffer)

      s3.upload({
        Bucket: BUCKET_NAME,
        Key: `${uuid()}${files.file.name}`,
        Body: buffer
      }, async function(error, data) {
        if (error) {
          console.error(error)
          return res.status(500).json({ message: 'An error happened when uploading to S3 bucket.' })
        }

        console.log(`File uploaded successfully. ${data.Location}`);

        console.log(fields.author, fields.link, data.Location)

        await sendToWebhook({
          author: fields.author,
          link: fields.link,
          url: data.Location,
        })

        return res.status(200).json({ message: 'Successfully sent' })
      });
    } catch (error) {
      console.error(error)
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}


async function sendToWebhook ({ author, link, url }) {
  try {
    const fields = []

    if (author) {
      fields.push({
        name: 'Author',
        value: author,
      })
    }

    if (link) {
      fields.push({
        name: 'Additional link',
        value: link,
      })
    }

    fields.push({
      name: 'Direct File Link',
      value: url
    })

    const embed = {
        "content": null,
        "embeds": [
          {
            "title": "New data submission !",
            "description": "",
            "color": 5814783,
            "fields": fields,
            "image": {
              "url": url
            }
          }
        ]
    }

    await axios.post(DISCORD_WEBHOOK_URL, embed)
  } catch (error) {
    console.error(error)
  }
}