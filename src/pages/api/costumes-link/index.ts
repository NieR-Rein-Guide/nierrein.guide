import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export interface CostumeLink {
  costume_id?: number;
  weapon_id?: number;
  debris_id?: number;
  events?: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const costumes: CostumeLink[] = req.body.costumes;

      if (!costumes && costumes?.length === 0) {
        return res.status(400).json({
          error: 'Missing data.',
        })
      }

      for (const costume of costumes) {
        await prisma.nrg.costumes_link.upsert({
          where: {
            costume_id: costume.costume_id,
          },
          create: {
            costume_id: costume.costume_id,
            weapon_id: costume.weapon_id,
            debris_id: costume.debris_id,
            events: costume.events.map((id) => Number(id))
          },
          update: {
            weapon_id: costume.weapon_id,
            debris_id: costume.debris_id,
            events: costume.events.map((id) => Number(id))
          }
        })
      }

      return res.status(200).json({
        message: 'Success',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    }
  }
}