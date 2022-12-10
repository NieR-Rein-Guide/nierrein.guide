import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  try {
    const items = await prisma.nrg.tiers_items.findMany({
      where: {
        item_id: Number(id),
      },
      include: {
        tiers: {
          include: {
            tierslists: true,
          }
        }
      }
    })

    res
      .status(200)
      .json(items);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: 'Failed to fetch tierlist item.'
      })
  }
}