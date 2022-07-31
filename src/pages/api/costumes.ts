import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const prisma = new PrismaClient();
      const costumes = await prisma.costume.findMany({
        orderBy: {
          character_id: "asc",
        },
        include: {
          character: true,
          costume_ability_link: {
            where: {
              ability_level: 4,
            },
            orderBy: {
              ability_slot: "asc",
            },
            include: {
              costume_ability: true,
            },
          },
          costume_skill_link: {
            where: {
              skill_level: 15,
            },
            include: {
              costume_skill: true,
            },
          },
          costume_stat: {
            take: 1,
            orderBy: {
              level: "desc",
            },
          },
        },
      });

      return res.status(200).json(costumes)
    } catch (error) {
      console.error(error)
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}