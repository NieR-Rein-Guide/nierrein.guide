import prisma from "@libs/prisma";
import tierlistSubjugation from "../data/tierlist_subjugation.json";
import { FEATURED_TIERLISTS, SEA_FEATURED_TIERLISTS } from "@config/constants";
import { tiers, tiers_items } from "@prisma/client-nrg";

export async function getTierlist(where) {
  const tierlist = await prisma.nrg.tierlists.findFirst({
    where,
    select: {
      tierlist_id: true,
      title: true,
      description: true,
      type: true,
      updated_at: true,
      created_at: true,
      slug: true,
      attribute: true,
      votes: true,
      tiers: {
        include: {
          tiers_items: true,
        },
      },
    },
  });

  let items = [];
  const ids = [];
  for (const tier of tierlist.tiers) {
    ids.push(...tier.tiers_items.map((tier) => tier.item_id));
  }

  if (tierlist.type === "costumes") {
    items = await prisma.dump.costume.findMany({
      include: {
        character: true,
        costume_stat: {
          take: 1,
          orderBy: {
            level: "desc",
          },
        },
      },
      where: {
        costume_id: {
          in: ids,
        },
      },
    });
  }

  if (tierlist.type === "weapons") {
    items = await prisma.dump.weapon.findMany({
      where: {
        weapon_id: {
          in: ids,
        },
      },
      include: {
        weapon_stat: {
          orderBy: {
            level: "desc",
          },
          take: 1,
        },
      },
    });
  }

  return { tierlist, items };
}

async function getTiers() {
  const pveTierlists = await Promise.all(
    FEATURED_TIERLISTS.pve.map((tierlist_id) =>
      getTierlist({
        tierlist_id,
      })
    )
  );
  const pvpTierlists = await Promise.all(
    FEATURED_TIERLISTS.pvp.map((tierlist_id) =>
      getTierlist({
        tierlist_id,
      })
    )
  );
  const seaPveTierlists = await Promise.all(
    SEA_FEATURED_TIERLISTS.pve.map((tierlist_id) =>
      getTierlist({
        tierlist_id,
      })
    )
  );
  const seaPvpTierlists = await Promise.all(
    SEA_FEATURED_TIERLISTS.pvp.map((tierlist_id) =>
      getTierlist({
        tierlist_id,
      })
    )
  );

  /**
   * Legacy tierlist
   * to be deleted
   */
  const subjugationTier = {
    tierlist: {
      version: "legacy",
      title: "Subjugation & Abyss",
      type: "costumes",
      updated_at: tierlistSubjugation.updatedAt,
    },
    version: "legacy",
    title: "Subjugation & Abyss",
    type: "costumes",
    updated_at: tierlistSubjugation.updatedAt,
    tiers: tierlistSubjugation.tiers,
  };

  return {
    tier: subjugationTier,
    pve: pveTierlists,
    pvp: pvpTierlists,
    seaPveTierlists,
    seaPvpTierlists,
  };
}

export type Tierlist = {
  tierlist: {
    tierlist_id: number;
    title: string;
    description: string;
    type: string;
    updated_at: Date;
    created_at: Date;
    slug: string;
    attribute: string;
    votes: number;
    tiers: (tiers & {
      tiers_items: tiers_items[];
    })[];
  };
  items: any[];
};

export { getTiers };
