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
      const { title, description, type, attribute, tiers } = req.body

      if (!title || !description || !tiers || tiers.length === 0 || tiers.every((tier) => tier.items.length === 0)) {
        return res.status(400).json({
          error: 'Missing data.',
        })
      }

      const result = await prisma.nrg.tierlists.create({
        data: {
          title,
          slug: `${slug(title)}-${uid()}`,
          description,
          type,
          attribute,
          created_at: new Date(),
        }
      })

      for (const [index, tier] of tiers.entries()) {
        const tierResult = await prisma.nrg.tiers.create({
          data: {
            tier: tier.tier,
            position: index,
            tierlist_id: result.tierlist_id,
          }
        })

        await prisma.nrg.tiers_items.createMany({
          data: tier.items.map((item, index) => ({
            item_id: item.costume_id,
            position: index,
            tier_id: tierResult.id,
          }))
        })
      }

      return res.status(200).json({
        tierlist: result
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