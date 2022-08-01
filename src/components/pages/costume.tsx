/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import CostumeDetails from "@components/CharacterInfo";
import { useEffect, useState } from "react";
import React from "react";
import CharacterCostumes from "@components/characters/CharacterCostumes";
import CharacterRows from "@components/characters/CharacterRows";
import CostumeSelect from "@components/characters/CostumeSelect";
import { character, costume, character_rank_bonus } from "@prisma/client";
import slug from "slugg";
import { useRouter } from "next/router";
import { CDN_URL } from "@config/constants";

interface CharactersPageProps {
  currentCharacter: character;
  selectedCostume: costume;
  characters: character[];
  costumes: costume[];
  abilities;
  skills;
  stats;
  rankBonus: character_rank_bonus[];
}

export default function CostumePage({
  currentCharacter,
  selectedCostume,
  characters,
  costumes,
  abilities,
  skills,
  stats,
  rankBonus,
}: CharactersPageProps): JSX.Element {
  const router = useRouter();

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
  }, [currentCostume]);

  return (
    <Layout>
      <Meta
        title={`${currentCharacter.name} - ${
          selectedCostume?.title ?? costumes[0].title
        }`}
        description="All the costumes of NieR Re[in]carnation"
        cover={`${CDN_URL}${
          selectedCostume?.image_path_base ?? costumes[0].image_path_base
        }full.png}`}
      />

      <CharacterRows
        characters={characters}
        currentCharacter={currentCharacter}
      />

      <div className="hidden md:inline">
        <CharacterCostumes
          currentCharacter={currentCharacter}
          costumes={costumes}
          setCostume={setCurrentCostume}
          currentCostume={currentCostume}
        />
      </div>

      <div className="inline md:hidden">
        <CostumeSelect characters={characters} />
      </div>

      {costumes.length > 0 && (
        <CostumeDetails
          character={currentCharacter}
          costume={currentCostume}
          abilities={abilities[currentCostume.costume_id]}
          skill={skills[currentCostume.costume_id]}
          stats={stats[currentCostume.costume_id]}
          rankBonus={rankBonus}
        />
      )}
    </Layout>
  );
}