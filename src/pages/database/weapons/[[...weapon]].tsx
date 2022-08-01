/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  costume,
  PrismaClient,
  weapon,
  weapon_ability_link,
  weapon_ability,
  weapon_skill_link,
  weapon_skill,
  weapon_stat,
} from "@prisma/client";
import slug from "slugg";
import Weapons from "../../../components/pages/weapons";
import Weapon from "../../../components/pages/weapon";

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
}

export default function WeaponsPage({
  isIndex,
  weapons,
  selectedWeapon,
}: WeaponsPageProps): JSX.Element {
  if (!isIndex) {
    return <Weapon weapon={selectedWeapon} />;
  }

  return <Weapons weapons={weapons} />;
}

export async function getStaticProps(context) {
  const prisma = new PrismaClient();

  // No route parameters, show index page
  if (Object.entries(context.params).length === 0) {
    const weapons = await prisma.weapon.findMany({
      orderBy: {
        weapon_id: "asc",
      },
      where: {
        evolution_order: {
          gt: 1,
        },
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
          take: 1,
          orderBy: {
            ability_level: "desc",
          },
          include: {
            weapon_ability: true,
          },
        },
        weapon_skill_link: {
          take: 1,
          orderBy: {
            skill_level: "desc",
          },
          include: {
            weapon_skill: true,
          },
        },
      },
    });

    return {
      props: JSON.parse(
        JSON.stringify({
          isIndex: true,
          selectedWeapon: null,
          weapons,
        })
      ),
    };
  }

  // Show costume page
  const [weaponSlug] = context.params.weapon;

  const selectedWeapon = await prisma.weapon.findMany({
    orderBy: {
      weapon_id: "asc",
    },
    where: {
      slug: slug(weaponSlug),
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
