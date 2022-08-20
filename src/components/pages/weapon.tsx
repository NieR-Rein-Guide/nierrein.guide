/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import React from "react";
import {
  weapon_ability_link,
  weapon_ability,
  weapon_skill_link,
  weapon_skill,
  weapon_stat,
  weapon,
} from "@prisma/client";
import { CDN_URL } from "@config/constants";
import WeaponInfo from "@components/WeaponInfo";

interface CharactersPageProps {
  weapon: (weapon & {
    weapon_ability_link: (weapon_ability_link & {
      weapon_ability: weapon_ability;
    })[];
    weapon_skill_link: (weapon_skill_link & {
      weapon_skill: weapon_skill;
    })[];
    weapon_stat: weapon_stat[];
  })[];
}

export default function WeaponPage({
  weapon,
}: CharactersPageProps): JSX.Element {
  const lastStageWeapon = weapon[weapon.length - 1];

  return (
    <Layout>
      <Meta
        title={`${lastStageWeapon.name}`}
        description={`${
          lastStageWeapon.name
        } is a ${lastStageWeapon.attribute.toLowerCase()} weapon.`}
        cover={`${CDN_URL}${lastStageWeapon.image_path}full.png`}
      />

      <WeaponInfo weapon={weapon[0]} />
      <pre>{JSON.stringify(lastStageWeapon, null, 2)}</pre>
    </Layout>
  );
}
