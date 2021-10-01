import { NextApiRequest, NextApiResponse } from "next";
import { getAllCostumes } from "@models/character";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const allCostumes = await getAllCostumes({
        allStats: false
      })

      return res.status(200).json(allCostumes)
    } catch (error) {
      console.error(error)
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}