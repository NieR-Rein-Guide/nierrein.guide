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

      const linked = await prisma.nrg.costumes_link.findMany({
        where: {
          events: {
            array_contains: [Number(id)],
          },
        },
      });

      const costumes = await prisma.dump.costume.findMany({
        where: {
          costume_id: {
            in: linked.map((link) => link.costume_id),
          },
        },
        include: {
          character: true,
        },
      });

      return res.status(200).json(costumes)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    }
  }
}