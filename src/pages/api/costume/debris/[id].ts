import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export interface CostumeLink {
  costume_id?: number;
  weapon_id?: number;
  debris_id?: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      if (!id) {
        return res.status(400).json({
          error: 'Missing id.',
        })
      }

      const link = await prisma.nrg.costumes_link.findUnique({
        where: {
          costume_id: Number(id),
        }
      })

      const debris = await prisma.dump.debris.findUnique({
        where: {
          debris_id: link.debris_id,
        }
      })

      return res.status(200).json(debris)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    }
  }
}