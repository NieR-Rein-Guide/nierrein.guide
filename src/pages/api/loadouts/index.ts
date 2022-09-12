import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";
import slug from "slugg";
import { uid } from 'uid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /**
   * POST NEW LOADOUT
   */
  if (req.method === 'POST') {
    try {
      const {
        title,
        description,
        type,
        slots,
        attribute,
      } = req.body.loadout

      if (!title || !type || !attribute || !slots.some(slot => slot.costume)) {
        return res.status(400).json({
          error: 'Missing either "title", "type" or "slots" key.',
        })
      }

      const result = await prisma.nrg.loadouts.create({
        data: {
          title,
          slug: `${slug(title)}-${uid()}`,
          description,
          type,
          attribute,
          created_at: new Date(),
        }
      })

      await prisma.nrg.loadout_slots.createMany({
        data: slots.map((slot, index) => {
          const options = {
            loadoutId: result.loadout_id,
            slot_position: index,
            costume_id: slot?.costume?.costume_id ?? null,
            companion_id: slot?.companion?.companion_id ?? null,
            debris_id: slot?.debris?.debris_id ?? null,
          }

          slot.weapons
            .filter(Boolean)
            .forEach((weapon, index) => {
              options[`weapon_${index + 1}_id`] = weapon.weapon_id
            })

          slot.memoirs
            .filter(Boolean)
            .forEach((memoir, index) => {
              options[`memoir_${index + 1}_id`] = memoir.memoir_id
            })

          return options
        })
      })

      return res.status(200).json({
        loadout: result,
        slots: slots,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}