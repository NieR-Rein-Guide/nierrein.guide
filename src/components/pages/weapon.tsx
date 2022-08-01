/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import CostumeDetails from "@components/CharacterInfo";
import { useEffect, useState } from "react";
import React from "react";
import CharacterCostumes from "@components/characters/CharacterCostumes";
import CharacterRows from "@components/characters/CharacterRows";
import CostumeSelect from "@components/characters/CostumeSelect";
import {
  weapon_ability_link,
  weapon_ability,
  weapon_skill_link,
  weapon_skill,
  weapon_stat,
  weapon,
} from "@prisma/client";
import slug from "slugg";
import { useRouter } from "next/router";
import { CDN_URL } from "@config/constants";

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

export default function CostumePage({
  weapon,
}: CharactersPageProps): JSX.Element {
  /* const router = useRouter();

  const [currentCostume, setCurrentCostume] = useState<costume | null>(
    selectedCostume || costumes[0]
  );

  // Select the first costume if the character changes
  useEffect(() => {
    if (selectedCostume) return;
    setCurrentCostume(costumes[0]);
  }, [costumes, currentCharacter]);

  // Update current route
  useEffect(() => {
    if (currentCharacter && currentCostume) {
      router.push(
        `/characters/${slug(currentCharacter.name)}/${slug(
          currentCostume.title
        )}`,
        undefined,
        {
          shallow: true,
        }
      );
    }
  }, [currentCostume]); */

  return (
    <Layout>
      <Meta title="" description="" cover="" />
      Weapon
    </Layout>
  );
}
