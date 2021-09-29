import { NextApiRequest, NextApiResponse } from "next";
import { getSingleWeapon } from '@models/weapon'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query

      if (!id) {
        return res
          .status(400)
          .json({ message: 'Missing query string parameter "id"' })
      }

      const weapon = await getSingleWeapon({
        BaseWeaponId: Number(id)
      })

      return res.status(200).json(weapon)
    } catch (error) {
      console.error(error)
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}