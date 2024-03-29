import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const weapons = await prisma.dump.weapon.findMany({
        orderBy: {
          weapon_id: "asc",
        },
        where: {
          OR: [
            {
              evolution_order: 2,
              is_ex_weapon: false,
            },
            {
              evolution_order: 11,
              is_ex_weapon: true,
            },
          ],
        },
        distinct: "evolution_group_id",
        include: {
          weapon_stat: {
            orderBy: {
              level: "asc",
            },
          },
          weapon_ability_link: {
            where: {
              OR: [
                {
                  slot_number: 4,
                },
                {
                  ability_level: 15,
                },
              ],
            },
            orderBy: {
              slot_number: "asc",
            },
            include: {
              weapon_ability: true,
            },
          },
          weapon_skill_link: {
            where: {
              skill_level: 15,
            },
            orderBy: {
              slot_number: "asc",
            },
            include: {
              weapon_skill: true,
            },
          },
          weapon_story_link: {
            include: {
              weapon_story: true,
            },
          },
        },
      });

      return res.status(200).json(weapons);
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
