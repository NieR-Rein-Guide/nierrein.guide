import prisma from '@libs/prisma';
import tierlistSubjugation from '../data/tierlist_subjugation.json'


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
        }
      }
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
    });
  }

  return { tierlist, items };
}

function getTiers() {
  const subjugationTier = {
    label: "Subjugation & Abyss",
    type: 'characters',
    lastUpdated: tierlistSubjugation.updatedAt,
    coverImg: "https://nierrein.guide/tierlists/cover-pve.jpg",
    tiers: tierlistSubjugation.tiers,
  }

  return {
    subjugationTier,
  }
}


export {
  getTiers,
}