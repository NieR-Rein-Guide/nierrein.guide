import { s3 } from "@libs/s3";
import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";

const BUCKET_NAME = 'reinguide-dumps'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { title, data  } = req.body

      if (!title || !data) {
        return res.status(400).json({ message: 'Missing "file" or "data" key' })
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

        return res.status(200).json({ message: 'The dump file has succesfully been uploaded.' })
      });
    } catch (error) {
      console.error(error)
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
