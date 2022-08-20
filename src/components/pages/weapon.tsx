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
  weapon_story,
  weapon_story_link,
} from "@prisma/client";
import { CDN_URL } from "@config/constants";
import WeaponInfo from "@components/WeaponInfo";
import Link from "next/link";
import SVG from "react-inlinesvg";

interface CharactersPageProps {
  weapon: (weapon & {
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

      <nav className="mb-4">
        <Link href="/weapons" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Return to Weapons</span>
          </a>
        </Link>
      </nav>
      <WeaponInfo weapons={weapon} />
    </Layout>
  );
}
