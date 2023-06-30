import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";
import slug from "slugg";
import { uid } from "uid";
import { getTierlist } from "@models/tiers";
import { EmbedBuilder } from "@discordjs/builders";
import { Colors, WebhookClient } from "discord.js";
import { env } from "../../../env";
import { FEATURED_TIERLISTS } from "@config/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**
   * POST NEW LOADOUT
   */
  if (req.method === "POST") {
    try {
      const { title, description, type, attribute, tiers } = req.body;

      if (
        !title ||
        !description ||
        !tiers ||
        tiers.length === 0 ||
        tiers.every((tier) => tier.items.length === 0)
      ) {
        return res.status(400).json({
          error: "Missing data.",
        });
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
        },
      });

      for (const [index, tier] of tiers.entries()) {
        const tierResult = await prisma.nrg.tiers.create({
          data: {
            tier: tier.tier,
            description: tier.description,
            position: index,
            tierlist_id: result.tierlist_id,
          },
        });

        await prisma.nrg.tiers_items.createMany({
          data: tier.items.map((item, index) => ({
            item_id: item.costume_id || item.weapon_id,
            position: index,
            tier_id: tierResult.id,
            tooltip: item.tooltip ?? undefined,
            tooltip_is_important: item.tooltip_is_important ?? false,
            awakening_step: item.awakening_step ?? 0,
            attribute: item.preferred_attribute ?? "",
          })),
        });
      }

      return res.status(200).json({
        tierlist: result,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  } else if (req.method === "PUT") {
    /**
     * Edit tierlist
     * - Delete all tiers and tiers items
     * - Repopulate them
     */
    const {
      title,
      description,
      type,
      attribute,
      tiers,
      edit_key,
    }: {
      title: string;
      description: string;
      type: string;
      attribute: string;
      tiers;
      edit_key: string;
    } = req.body;

    if (
      !title ||
      !description ||
      !tiers ||
      tiers.length === 0 ||
      tiers.every((tier) => tier.items.length === 0) ||
      !edit_key
    ) {
      return res.status(400).json({
        error: "Missing data.",
      });
    }

    const tierlist = await prisma.nrg.tierlists.findFirst({
      where: {
        edit_key,
      },
    });

    await prisma.nrg.tiers.deleteMany({
      where: {
        tierlist_id: tierlist.tierlist_id,
      },
    });

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
      },
    });

    for (const [index, tier] of tiers.entries()) {
      const tierResult = await prisma.nrg.tiers.create({
        data: {
          tier: tier.tier,
          description: tier.description,
          position: index,
          tierlist_id: result.tierlist_id,
        },
      });

      await prisma.nrg.tiers_items.createMany({
        data: tier.items.map((item, index) => ({
          item_id: item.costume_id || item.weapon_id,
          position: index,
          tier_id: tierResult.id,
          tooltip: item.tooltip ?? undefined,
          tooltip_is_important: item.tooltip_is_important ?? false,
          awakening_step: item.awakening_step ?? 0,
          attribute: item.preferred_attribute ?? "",
        })),
      });
    }

    if (
      (FEATURED_TIERLISTS.pve.includes(tierlist.tierlist_id) ||
        FEATURED_TIERLISTS.pvp.includes(tierlist.tierlist_id)) &&
      env.DISCORD_TIERLISTS_UPDATE_CHANNEL_WEBHOOK
    ) {
      const discordWebhook = new WebhookClient({
        url: env.DISCORD_TIERLISTS_UPDATE_CHANNEL_WEBHOOK,
      });

      const embed = new EmbedBuilder()
        .setTitle(`"${tierlist.title}" tierlist has been updated.`)
        .setURL(`https://nierrein.guide/tierlist/${tierlist.slug}`)
        .setThumbnail("https://nierrein.guide/ui/search/search_rank_sss.png")
        .setColor(Colors.Green);

      await discordWebhook.send({
        embeds: [embed],
      });
    }

    return res.status(200).json({
      tierlist: result,
    });
  } else if (req.method === "GET") {
    /**
     * Get a formatted tierlist to load in the builder
     */
    const params = {};
    if (req.query.edit_key) {
      params["edit_key"] = req.query.edit_key;
    }

    const { tierlist, items } = await getTierlist(params);

    const tiers = tierlist.tiers.map((tier) => {
      return {
        tier: tier.tier,
        description: tier.description,
        items: tier.tiers_items.map((tierItem) => {
          const item = items.find((itm) => {
            if (tierlist.type === "costumes") {
              return itm.costume_id === tierItem.item_id;
            }
            if (tierlist.type === "weapons") {
              return itm.weapon_id === tierItem.item_id;
            }
          });

          return {
            ...tierItem,
            preferred_attribute: item?.attribute ?? null,
            ...item,
            id: `${tierItem.id}`,
          };
        }),
      };
    });

    res.status(200).json({
      tierlist,
      tiers,
    });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
