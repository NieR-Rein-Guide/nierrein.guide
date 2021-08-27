import { s3 } from "@libs/s3";
import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";
import axios from 'axios'


const BUCKET_NAME = 'reinguide-dumps'
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL_NEW_DUMPS

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, data  } = req.body

      if (!title || !data) {
        return res.status(400).json({ message: 'Missing "title" or "data" key' })
      }

      const filename = slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g })

      s3.upload({
        Bucket: BUCKET_NAME,
        Key: `${filename}.json`,
        Body: JSON.stringify(data)
      }, async function(error, data) {
        if (error) {
          console.error(error)
          return res.status(500).json({ message: 'An error happened when uploading to S3 bucket.' })
        }

        console.log(`Dump file ${filename}.json was uploaded successfully. ${data.Location}`);

        await sendToWebhook({
          title: title,
          url: data.Location
        })

        return res.status(200).json({ message: 'The dump file has succesfully been uploaded.' })
      });
    } catch (error) {
      console.error(error)
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}


async function sendToWebhook ({ title, url }) {
  try {
    const embed = {
      "content": null,
      "embeds": [
        {
          "title": "New dump",
          "description": "The site will be updated in a few minutes with the new data.",
          "color": 5814783,
          "thumbnail": {
            "url": "https://s3.eu-central-1.wasabisys.com/reinguide-dumps/dump-icon.png"
          },
          "fields": [
            {
              "name": "Sheet",
              "value": title
            },
            {
              "name": "URL",
              "value": url
            },
          ]
        }
      ]
    }

    await axios.post(DISCORD_WEBHOOK_URL, embed)
  } catch (error) {
    console.error(error)
  }
}