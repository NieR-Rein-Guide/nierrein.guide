/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import React from "react";
import { CDN_URL } from "@config/constants";
import WeaponInfo from "@components/WeaponInfo";
import Link from "next/link";
import SVG from "react-inlinesvg";
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
        description={lastStageWeapon.weapon_story_link[0].weapon_story.story}
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
