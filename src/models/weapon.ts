import prisma from "@libs/prisma";
import alterWeaponToAddCostume from "@utils/alterWeaponToAddCostume";

export async function getAllWeapons() {
  const weapons = await prisma.dump.weapon.findMany({
    orderBy: {
      release_time: "desc",
    },
    where: {
      evolution_order: 2,
      is_ex_weapon: false,
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
    },
  });

  const exWeapons = await prisma.dump.weapon.findMany({
    orderBy: {
      release_time: "desc",
    },
    where: {
      evolution_order: {
        gt: 10,
      },
      is_ex_weapon: true,
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
    },
  });

  const allWeapons = [...weapons, ...exWeapons];
  allWeapons.sort(
    // @ts-expect-error date sorting.
    (a, b) => new Date(b.release_time) - new Date(a.release_time)
  );

  for (const weapon of allWeapons) {
    await alterWeaponToAddCostume(weapon);
  }

  const abilitiesLookupData = await prisma.dump.weapon_ability.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      name: true,
    },
    distinct: ["name"],
  });

  const abilitiesLookup = abilitiesLookupData.reduce((acc, current) => {
    acc[current.name] = current.name;
    return acc;
  }, {});

  return {
    weapons: allWeapons,
    abilitiesLookup,
  };
}
