import { NextApiRequest, NextApiResponse } from "next";
import { getAllCostumes } from "@models/character";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query

      if (!id) {
        return res
          .status(400)
          .json({ message: 'Missing query string parameter "id"' })
      }

      const allCostumes = await getAllCostumes({
        allStats: false
      })

      const costume = allCostumes.find(costume => costume.ids.costume === Number(id))

      return res.status(200).json(costume)
    } catch (error) {
      console.error(error)
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}