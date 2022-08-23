/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import CostumeDetails from "@components/CharacterInfo";
import { useEffect, useState } from "react";
import React from "react";
import CharacterCostumes from "@components/characters/CharacterCostumes";
import CharacterRows from "@components/characters/CharacterRows";
import CostumeSelect from "@components/characters/CostumeSelect";
import slug from "slugg";
import { useRouter } from "next/router";
import { CDN_URL } from "@config/constants";
import Link from "next/link";
import SVG from "react-inlinesvg";
import { character, character_rank_bonus, costume } from "@prisma/client";
import { useSettingsStore } from "store/settings";

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
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
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

      <nav className="mb-4">
        <Link href="/characters" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Return to Characters</span>
          </a>
        </Link>
      </nav>

      <CharacterRows
        characters={characters}
        currentCharacter={currentCharacter}
      />

      <div className="hidden md:inline">
        <CharacterCostumes
          currentCharacter={currentCharacter}
          costumes={costumes.filter((costume) => {
            if (showUnreleasedContent) return true;
            return new Date() > new Date(costume.release_time);
          })}
          setCostume={setCurrentCostume}
          currentCostume={currentCostume}
        />
      </div>

      <div className="inline md:hidden">
        <CostumeSelect characters={characters} />
      </div>

      {costumes.length > 0 && (
        <>
          {(!showUnreleasedContent &&
            new Date() < new Date(currentCostume.release_time) && (
              <div className="bg-grey-lighter text-beige hover:bg-opacity-90 transition-colors w-full border-b border-beige-inactive border-opacity-50 p-8 text-center">
                Costume hidden.
              </div>
            )) || (
            <CostumeDetails
              character={currentCharacter}
              costume={currentCostume}
              abilities={abilities[currentCostume.costume_id]}
              skill={skills[currentCostume.costume_id]}
              stats={stats[currentCostume.costume_id]}
              rankBonus={rankBonus}
            />
          )}
        </>
      )}
    </Layout>
  );
}
