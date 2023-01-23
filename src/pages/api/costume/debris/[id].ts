import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      if (!id) {
        return res.status(400).json({
          error: 'Missing id.',
        })
      }

      const costume = await prisma.dump.costume.findUnique({
        where: {
          costume_id: Number(id)
        },
        include: {
          debris: true,
        }
      })

      return res.status(200).json(costume.debris)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    }
  }
}