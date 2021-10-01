import { NextApiRequest, NextApiResponse } from "next";
import { getAllWeapons } from '@models/weapon'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const allWeapons = await getAllWeapons()

      return res.status(200).json(allWeapons)
    } catch (error) {
      console.error(error)
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}