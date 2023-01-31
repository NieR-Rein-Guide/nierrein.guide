import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export interface CostumeLink {
  costume_id?: number;
  weapon_id?: number;
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

      const link = await prisma.nrg.costumes_link.findFirst({
        where: {
          weapon_id: Number(id),
        }
      })

      const costume = await prisma.dump.costume.findUnique({
        where: {
          costume_id: link.costume_id,
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
                      lte: 2
                    }
                  }
                },
                {
                  ability_level: 1,
                  AND: {
                    ability_slot: {
                      equals: 3,
                    }
                  }
                }
              ]
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
      })

      return res.status(200).json(costume)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    }
  }
}