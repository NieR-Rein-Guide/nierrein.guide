import prisma from "@libs/prisma";

export async function getAllCostumes({
  orderBy = {
    release_time: "desc",
  },
}: {
  orderBy?;
}) {
  const costumes = await prisma.dump.costume.findMany({
    orderBy,
    include: {
      character: true,
      costume_ability_link: {
        where: {
          OR: [
            {
              ability_level: 4,
              AND: {
                ability_slot: {
                  lte: 2
                }
              }
            },
            {
              ability_level: 1,
              AND: {
                ability_slot: {
                  equals: 3,
                }
              }
            }
          ]
        },
        orderBy: {
          ability_slot: "asc",
        },
        include: {
          costume_ability: true,
        },
      },
      costume_skill_link: {
        where: {
          skill_level: 15,
        },
        include: {
          costume_skill: true,
        },
      },
      costume_stat: {
        take: 1,
        orderBy: {
          level: "desc",
        },
      },
    },
  });

  const abilitiesLookupData = await prisma.dump.costume_ability.findMany({
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

  const charactersLookupData = await prisma.dump.character.findMany({
    select: {
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  const charactersLookup = charactersLookupData.reduce((acc, current) => {
    acc[current.name] = current.name;
    return acc;
  }, {});

  return {
    costumes,
    abilitiesLookup,
    charactersLookup,
  };
}