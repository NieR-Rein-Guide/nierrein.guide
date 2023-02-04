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
import alterWeaponToAddCostume from "@utils/alterWeaponToAddCostume";
import { useFilteredWeapons } from "@hooks/useFilteredWeapons";
import { env } from "../../env";
import axios from "axios";
import { add, sub } from "date-fns";
import { objectToURLSearchParams } from "@studiometa/js-toolkit/utils";
import { Event } from "../../models/types";

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
  events: Event[];
}

export default function WeaponsPage({
  isIndex,
  weapons = [],
  events,
  selectedWeapon,
  abilitiesLookup,
}: WeaponsPageProps): JSX.Element {
  const { filteredWeapons } = useFilteredWeapons({ weapons });

  if (!isIndex) {
    return <Weapon weapon={selectedWeapon} events={events} />;
  }

  return (
    <Weapons weapons={filteredWeapons} abilitiesLookup={abilitiesLookup} />
  );
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

  // Show weapon page
  const [weaponSlug] = context.params.weapon;

  const tempWeapon = await prisma.dump.weapon.findFirst({
    select: {
      evolution_group_id: true,
    },
    where: {
      slug: weaponSlug,
    },
  });

  const selectedWeapon = await prisma.dump.weapon.findMany({
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

  await alterWeaponToAddCostume(selectedWeapon[selectedWeapon.length - 1]);

  const releaseTimeGte = sub(
    selectedWeapon[selectedWeapon.length - 1].release_time,
    { hours: 8 }
  );
  const releaseTimeLte = add(releaseTimeGte, { days: 1 });

  const filters = {
    populate: "*",
    filters: {
      start_date: {
        $gte: releaseTimeGte.toISOString(),
        $lte: releaseTimeLte.toISOString(),
      },
    },
  };
  const qs = objectToURLSearchParams(filters);

  const { data } = await axios.get(
    `${env.NEXT_PUBLIC_STRAPI_REST_API_ENDPOINT}/events?${qs}`
  );

  return {
    props: JSON.parse(
      JSON.stringify({
        selectedWeapon,
        isIndex: false,
        events: data.data,
      })
    ),
  };
}

export async function getStaticPaths() {
  const weapons = await prisma.dump.weapon.findMany({
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

  const exWeapons = await prisma.dump.weapon.findMany({
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
