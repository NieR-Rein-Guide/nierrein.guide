import prisma from "@libs/prisma";

export default async function alterCostumeToAddWeapon(costume) {
  const link = await prisma.nrg.costumes_link.findUnique({
    where: {
      costume_id: costume.costume_id,
    },
  });

  if (!link) {
    costume.weapon = null;
    return;
  }

  const weapon = await prisma.dump.weapon.findUnique({
    where: {
      weapon_id: link.weapon_id,
    },
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
    },
  });

  costume.weapon = weapon;
}
