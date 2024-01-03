import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const costumes = await prisma.dump.costume.findMany({
        orderBy: {
          character_id: "asc",
        },
        include: {
          character: true,
          costume_ability_link: {
            where: {
              OR: [
                {
                  ability_level: 4,
                  AND: {
                    ability_slot: {
                      lte: 2,
                    },
                  },
                },
                {
                  ability_level: 1,
                  AND: {
                    ability_slot: {
                      equals: 3,
                    },
                  },
                },
              ],
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
            orderBy: {
              awakening_step: "asc",
            },
          },
          emblem: true,
          costume_karma_slot: true,
          debris: true,
        },
      });

      return res.status(200).json(costumes);
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
