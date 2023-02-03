/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import CostumeDetails from "@components/CharacterInfo";
import { useEffect, useState } from "react";
import CharacterCostumes from "@components/characters/CharacterCostumes";
import CostumeSelect from "@components/characters/CostumeSelect";
import slug from "slugg";
import { useRouter } from "next/router";
import { CDN_URL } from "@config/constants";
import Link from "next/link";
import SVG from "react-inlinesvg";
import {
  character,
  character_rank_bonus,
  costume,
  costume_ability,
  costume_ability_link,
  costume_skill,
  costume_skill_link,
  costume_stat,
  emblem,
} from "@prisma/client";
import { useSettingsStore } from "store/settings";
import Slider from "rc-slider";
import CharacterRows from "@components/characters/CharacterRows";

type Costume = costume & {
  costume_ability_link: (costume_ability_link & {
    costume_ability: costume_ability;
  })[];
  costume_skill_link: (costume_skill_link & {
    costume_skill: costume_skill;
  })[];
  costume_stat: costume_stat[];
  character: character;
  emblem: emblem;
};

interface CharactersPageProps {
  currentCharacter: character;
  selectedCostume: costume;
  characters: character[];
  costumes: Costume[];
  abilities;
  skills;
  stats;
  rankBonus: character_rank_bonus[];
  selectCostumes: {
    title: string;
    character: character;
    slug: string;
    image_path_base: string;
    release_time: Date;
  }[];
}

export default function CostumePage({
  currentCharacter,
  selectedCostume,
  costumes,
  abilities,
  skills,
  stats,
  rankBonus,
  selectCostumes,
  characters,
}: CharactersPageProps): JSX.Element {
  const router = useRouter();

  const [currentCostume, setCurrentCostume] = useState<
    Costume | costume | null
  >(selectedCostume || costumes[0]);
  const region = useSettingsStore((state) => state.region);
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );
  const [skillLevel, setSkillLevel] = useState(14);
  const [ascendLevel, setAscendLevel] = useState(4);

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
        cover={`${CDN_URL}${currentCostume.image_path_base}full.png`}
        description={currentCostume.description}
      />

      <nav className="flex flex-col items-start md:items-center gap-y-4 md:flex-row justify-between">
        <Link href="/characters" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Return to Characters</span>
          </a>
        </Link>

        <div className="flex items-center gap-x-4 w-full md:w-auto">
          <div className="hidden md:block mr-4 w-32">
            <p className="text-beige">Skill Lv. {skillLevel + 1}</p>
            <Slider
              value={skillLevel}
              className="mt-2 xl:mt-0 max-w-lg"
              min={0}
              max={14}
              onChange={(value) => setSkillLevel(value)}
            />
          </div>
          <div className="hidden md:block mr-4 w-32">
            <p className="text-beige">Ascend Lv. {ascendLevel}</p>
            <Slider
              value={ascendLevel}
              className="mt-2 xl:mt-0 max-w-lg"
              min={0}
              max={4}
              onChange={(value) => setAscendLevel(value)}
            />
          </div>
          <CostumeSelect costumes={selectCostumes} />
        </div>
      </nav>

      {region !== "SEA" && (
        <div>
          <CharacterRows
            characters={characters}
            currentCharacter={currentCharacter}
          />
        </div>
      )}

      <div className="hidden md:block">
        <CharacterCostumes
          currentCharacter={currentCharacter}
          costumes={costumes.filter(
            (costume) => costume.character_id === currentCharacter.character_id
          )}
          setCostume={setCurrentCostume}
          currentCostume={currentCostume}
        />
      </div>

      {costumes.length > 0 && (
        <CostumeDetails
          key="details"
          character={currentCharacter}
          costume={currentCostume}
          abilities={
            abilities?.[currentCostume.costume_id]?.sort(
              (a, b) => a[0].ability_slot - b[0].ability_slot
            ) || []
          }
          skill={skills[currentCostume.costume_id]}
          stats={stats[currentCostume.costume_id]}
          rankBonus={rankBonus}
          ascendLevel={ascendLevel}
          skillLevel={skillLevel}
        />
      )}
    </Layout>
  );
}
