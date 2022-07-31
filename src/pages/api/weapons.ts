import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const prisma = new PrismaClient();
      const weapons = await prisma.weapon.findMany({
        orderBy: {
          weapon_id: 'asc',
        },
        where: {
          evolution_order: {
            gt: 1,
          }
        },
        distinct: 'evolution_group_id',
        include: {
          weapon_stat: {
            orderBy: {
              level: 'desc',
            },
            take: 1,
          },
          weapon_ability_link: {
            take: 1,
            orderBy: {
              ability_level: 'desc',
            },
            include: {
              weapon_ability: true,
            }
          },
          weapon_skill_link: {
            take: 1,
            orderBy: {
              skill_level: 'desc',
            },
            include: {
              weapon_skill: true,
            }
          }
        }
      });

      return res.status(200).json(weapons)
    } catch (error) {
      console.error(error)
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}