import prisma from "@libs/prisma";
import { costume_ability } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const a: costume_ability = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const abilities = await prisma.dump.costume_ability.findMany({
        where: {
          ability_level: 4,
        },
        orderBy: {
          name: "asc",
        },
        distinct: ["name"],
      });

      return res.status(200).json(abilities)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    }
  }
}