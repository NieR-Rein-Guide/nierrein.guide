/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import React from "react";
import {
  weapon,
  weapon_ability,
  weapon_ability_link,
  weapon_skill,
  weapon_skill_link,
  weapon_stat,
} from "@prisma/client";
import { CDN_URL } from "@config/constants";
import RARITY from "@utils/rarity";
import classNames from "classnames";
import statsIcons from "@utils/statsIcons";
import Image from "next/image";
import Link from "next/link";
import slug from "slugg";
import SVG from "react-inlinesvg";

interface CharactersPageProps {
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

export default function CharactersPage({
  weapons,
}: CharactersPageProps): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Weapons"
        description="All the weapons of NieR Re[in]carnation"
        cover="https://nierrein.guide/cover-weapons.jpg"
      />

      <div className="grid lg:grid-cols-2">
        <img src={`${CDN_URL}${weapons[0].image_path}full.png`} />
        <pre>{JSON.stringify(weapons, null, 2)}</pre>
      </div>
    </Layout>
  );
}
