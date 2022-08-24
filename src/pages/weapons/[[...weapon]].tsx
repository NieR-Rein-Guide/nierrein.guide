/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Weapons from "../../components/pages/weapons";
import Weapon from "../../components/pages/weapon";
import prisma from "@libs/prisma";
import {
  weapon,
  weapon_ability,
  weapon_ability_link,
  weapon_skill,
  weapon_skill_link,
  weapon_stat,
  weapon_story,
  weapon_story_link,
} from "@prisma/client";
import { getAllWeapons } from "@models/weapon";

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
    weapon_story_link: (weapon_story_link & {
      weapon_story: weapon_story;
    })[];
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
  // No route parameters, show index page
  if (Object.entries(context.params).length === 0) {
    const { weapons, abilitiesLookup } = await getAllWeapons();

    return {
      props: JSON.parse(
        JSON.stringify({
          isIndex: true,
          selectedWeapon: null,
          weapons,
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
      slug: weaponSlug,
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
  const weapons = await prisma.weapon.findMany({
    select: {
      slug: true,
    },
    orderBy: {
      release_time: "desc",
    },
    where: {
      evolution_order: 2,
      is_ex_weapon: false,
    },
    distinct: "evolution_group_id",
  });

  const exWeapons = await prisma.weapon.findMany({
    select: {
      slug: true,
    },
    orderBy: {
      release_time: "desc",
    },
    where: {
      evolution_order: 11,
      is_ex_weapon: true,
    },
    distinct: "evolution_group_id",
  });

  const allWeapons = [...weapons, ...exWeapons];
  allWeapons.sort(
    // @ts-expect-error date sorting.
    (a, b) => new Date(b.release_time) - new Date(a.release_time)
  );

  const weaponsPaths = allWeapons.map((weapon) => ({
    params: {
      weapon: [weapon.slug],
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
