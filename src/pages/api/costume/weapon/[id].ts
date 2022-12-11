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

      const weapon = await prisma.dump.weapon.findUnique({
        where: {
          weapon_id: link.weapon_id,
        },
        include: {
          weapon_stat: {
            orderBy: {
              level: 'desc',
            },
            take: 1,
          },
          weapon_ability_link: {
            where: {
              ability_level: 15,
            },
            orderBy: {
              slot_number: 'asc',
            },
            include: {
              weapon_ability: true,
            }
          },
          weapon_skill_link: {
            where: {
              skill_level: 15,
            },
            orderBy: {
              slot_number: 'asc',
            },
            include: {
              weapon_skill: true,
            }
          }
        }
      })

      return res.status(200).json(weapon)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    }
  }
}