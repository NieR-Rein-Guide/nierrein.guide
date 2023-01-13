import { NextApiRequest, NextApiResponse } from "next";
import { getCostume } from "@models/costume";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      if (!id) {
        return res.status(400).json({
          error: 'Missing id.',
        })
      }

      const { costume } = await getCostume(Number(id))

      return res.status(200).json(costume)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    }
  }
}