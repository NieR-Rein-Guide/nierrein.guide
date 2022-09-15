import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";
import slug from "slugg";
import { uid } from 'uid';
import { getTierlist } from "@models/tiers";

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
          edit_key: uid(24),
          updated_at: new Date(),
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
            item_id: item.costume_id || item.weapon_id,
            position: index,
            tier_id: tierResult.id,
            tooltip: item.tooltip ?? undefined,
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
  }
  /**
   * Edit tierlist
   * - Delete all tiers and tiers items
   * - Repopulate them
   */
  else if (req.method === 'PUT') {
    const { title, description, type, attribute, tiers, edit_key }: {
      title: string;
      description: string;
      type: string;
      attribute: string;
      tiers;
      edit_key: string;
    } = req.body

      if (!title || !description || !tiers || tiers.length === 0 || tiers.every((tier) => tier.items.length === 0) || !edit_key) {
        return res.status(400).json({
          error: 'Missing data.',
        })
      }

      const tierlist = await prisma.nrg.tierlists.findFirst({
        where: {
          edit_key
        },
      })

      await prisma.nrg.tiers.deleteMany({
        where: {
          tierlist_id: tierlist.tierlist_id
        }
      })

      const result = await prisma.nrg.tierlists.update({
        where: {
          tierlist_id: tierlist.tierlist_id,
        },
        data: {
          title,
          description,
          type,
          attribute,
          updated_at: new Date(),
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
            item_id: item.costume_id || item.weapon_id,
            position: index,
            tier_id: tierResult.id,
            tooltip: item.tooltip ?? undefined,
          }))
        })
      }

      return res.status(200).json({
        tierlist: result
      })
  }
  /**
   * Get a formatted tierlist to load in the builder
   */
  else if (req.method === 'GET') {
    const params = {}
    if (req.query.edit_key) {
      params['edit_key'] = req.query.edit_key
    }

    const { tierlist, items } = await getTierlist(params)

    const tiers = tierlist.tiers.map((tier) => {
      return {
        tier: tier.tier,
        items: tier.tiers_items.map((tierItem) => {
          const item = items.find((itm) => {
            if (tierlist.type === 'costumes') {
              return itm.costume_id === tierItem.item_id
            }
            if (tierlist.type === 'weapons') {
              return itm.weapon_id === tierItem.item_id
            }
          })

          return {
            ...tierItem,
            ...item,
            id: `${tierItem.id}`,
          }
        })
      }
    })

    res.status(200).json({
      tierlist,
      tiers
    })
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}