/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  PrismaClient,
  weapon,
  weapon_ability_link,
  weapon_ability,
  weapon_skill_link,
  weapon_skill,
  weapon_stat,
} from "@prisma/client";
import slug from "slugg";
import Weapons from "../../components/pages/weapons";
import Weapon from "../../components/pages/weapon";

interface WeaponsPageProps {
  isIndex: boolean;
  selectedWeapon: (weapon & {
    weapon_ability_link: (weapon_ability_link & {
      weapon_ability: weapon_ability;
    })[];
    weapon_skill_link: (weapon_skill_link & {
      weapon_skill: weapon_skill;
    })[];
    weapon_stat: weapon_stat[];
  })[];
  weapons: (weapon & {
    weapon_ability_link: (weapon_ability_link & {
      weapon_ability: weapon_ability;
    })[];
    weapon_skill_link: (weapon_skill_link & {
      weapon_skill: weapon_skill;
    })[];
    weapon_stat: weapon_stat[];
  })[];
  abilitiesLookup: { [key: string]: string };
}

export default function WeaponsPage({
  isIndex,
  weapons,
  selectedWeapon,
  abilitiesLookup,
}: WeaponsPageProps): JSX.Element {
  if (!isIndex) {
    return <Weapon weapon={selectedWeapon} />;
  }

  return <Weapons weapons={weapons} abilitiesLookup={abilitiesLookup} />;
}

export async function getStaticProps(context) {
  const prisma = new PrismaClient();

  // No route parameters, show index page
  if (Object.entries(context.params).length === 0) {
    const weapons = await prisma.weapon.findMany({
      orderBy: {
        release_time: "desc",
      },
      where: {
        evolution_order: {
          gt: 1,
        },
        is_ex_weapon: false,
      },
      distinct: "evolution_group_id",
      include: {
        weapon_stat: {
          orderBy: {
            level: "desc",
          },
          take: 1,
        },
        weapon_ability_link: {
          where: {
            ability_level: 15,
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

    const exWeapons = await prisma.weapon.findMany({
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
            level: "desc",
          },
          take: 1,
        },
        weapon_ability_link: {
          where: {
            ability_level: 15,
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

    const abilitiesLookupData = await prisma.weapon_ability.findMany({
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
      props: JSON.parse(
        JSON.stringify({
          isIndex: true,
          selectedWeapon: null,
          weapons: allWeapons,
          abilitiesLookup,
        })
      ),
    };
  }

  // Show costume page
  const [weaponSlug] = context.params.weapon;

  const tempWeapon = await prisma.weapon.findFirst({
    select: {
      evolution_group_id: true,
    },
    where: {
      slug: slug(weaponSlug),
    },
  });

  const selectedWeapon = await prisma.weapon.findMany({
    orderBy: {
      weapon_id: "asc",
    },
    where: {
      evolution_group_id: tempWeapon.evolution_group_id,
    },
    include: {
      weapon_stat: {
        orderBy: {
          level: "asc",
        },
      },
      weapon_ability_link: {
        orderBy: {
          ability_level: "asc",
        },
        include: {
          weapon_ability: true,
        },
      },
      weapon_skill_link: {
        orderBy: {
          skill_level: "asc",
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

  prisma.$disconnect();

  return {
    props: JSON.parse(
      JSON.stringify({
        selectedWeapon,
        isIndex: false,
      })
    ),
  };
}

export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const weapons = await prisma.weapon.findMany({
    distinct: "evolution_group_id",
    where: {
      evolution_order: 1,
    },
  });

  prisma.$disconnect();

  const weaponsPaths = weapons.map((weapon) => ({
    params: {
      weapon: [slug(weapon.slug)],
    },
  }));

  return {
    paths: [
      ...weaponsPaths,
      {
        params: {
          weapon: [],
        },
      },
    ],
    fallback: false,
  };
}

function groupByKey(list, key) {
  return list.reduce(
    (hash, obj) => ({
      ...hash,
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    }),
    {}
  );
}
