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
import * as Tabs from "@radix-ui/react-tabs";
import { Switch } from "@mui/material";
import TierlistTab from "@components/tierlist/TierListTab";
import Lines from "@components/decorations/Lines";
import DebrisThumbnail from "@components/DebrisThumbnail";
import { Chip } from "@mui/material";
import { CharacterStory } from "pages/database/stories/characters";
import { ExCharacterStory } from "pages/database/stories/ex-characters";
import { RodCharacterStory } from "pages/database/stories/rod-characters";
import { CharacterHiddenStory } from "pages/database/stories/hidden-stories";
import HR from "@components/decorations/HR";

type Costume = costume & {
  costume_ability_link: (costume_ability_link & {
    costume_ability: costume_ability;
  })[];
  costume_skill_link: (costume_skill_link & {
    costume_skill: costume_skill;
  })[];
  costume_stat: costume_stat[];
  character: character & {
    debris: debris;
  };
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
}

export default function CostumePage({
  currentCharacter,
  selectedCostume,
  costumes,
  abilities,
  skills,
  stats,
  rankBonus,
  characters,
}: CharactersPageProps): JSX.Element {
  const router = useRouter();

  const [currentCostume, setCurrentCostume] = useState<
    Costume | costume | null
  >(selectedCostume || costumes[0]);
  const [skillLevel, setSkillLevel] = useState(14);
  const [ascendLevel, setAscendLevel] = useState(4);

  const isExalted = useSettingsStore((state) => state.isExalted);
  const setIsExalted = useSettingsStore((state) => state.setIsExalted);

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
        <a href="/characters" className="btn">
          <SVG src="/decorations/arrow-left.svg" className="h-6" />
          <span>Return to Characters</span>
        </a>

        <div className="flex flex-col-reverse sm:flex-row items-center gap-x-4 w-full md:w-auto">
          <div className="flex items-center sm:items-start sm:flex-col h-9">
            <label htmlFor="exalt" className="text-beige cursor-pointer">
              Exalted Stats
            </label>
            <Switch
              id="exalt"
              size="small"
              onChange={(e) => setIsExalted(e.target.checked)}
              checked={isExalted}
            />
          </div>
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
          <CostumeSelect
            costumes={costumes.sort(
              (a, b) => -b.character.name.localeCompare(a.character.name)
            )}
          />
        </div>
      </nav>

      <Tabs.Root className="mt-8" defaultValue="costume">
        <Tabs.List className="grid grid-cols-2">
          <TierlistTab className="w-full" index="costume">
            <span className="text-base text-shadow text-white">Costume</span>
          </TierlistTab>
          <TierlistTab className="w-full" index="character">
            <span className="text-base text-shadow text-white">Character</span>
          </TierlistTab>
        </Tabs.List>

        <div className="mt-12 md:mt-0 md:col-span-10">
          <Tabs.Content value="costume">
            <div className="hidden md:block">
              <CharacterCostumes
                currentCharacter={currentCharacter}
                costumes={costumes.filter(
                  (costume) =>
                    currentCostume.character_id ===
                    currentCharacter.character_id
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
          </Tabs.Content>

          <Tabs.Content className="flex flex-col gap-8" value="character">
            {rankBonus && (
              <div className="mt-1 flex flex-col">
                <h3 className="text-2xl text-beige text-center my-4">
                  Rank bonuses
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {rankBonus.map((rank, index) => (
                    <Chip
                      key={`${rank.character_id}-${index}`}
                      label={`${rank.description}`}
                      variant="outlined"
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              <Lines
                className="mb-2"
                containerClass="justify-center"
                svgClass="w-96 xl:w-42"
              >
                <h2 className="text-2xl text-center">
                  Character Exalt Debris (Lv.100)
                </h2>
              </Lines>
              <div className="flex gap-4 bg-grey-dark p-4 relative bordered">
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <DebrisThumbnail
                      sizeClasses="h-16 w-16"
                      {...currentCostume.character.debris}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <strong className="font-display text-2xl text-beige">
                      {currentCostume.character.debris?.name ?? "WIP"}
                    </strong>
                    <p className="text-beige-text">
                      <span>
                        {currentCostume.character.debris?.description_long ??
                          "WIP"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Lines
              className="mb-2"
              containerClass="justify-center"
              svgClass="w-96 xl:w-42"
            >
              <h2 className="text-2xl text-center">Stories</h2>
            </Lines>

            <Tabs.Root defaultValue="character">
              <Tabs.List className="grid grid-cols-2 md:grid-cols-4">
                <TierlistTab className="w-full" index="character">
                  <span className="text-base text-shadow text-white">
                    Character Story
                  </span>
                </TierlistTab>
                <TierlistTab className="w-full" index="ex-story">
                  <span className="text-base text-shadow text-white">
                    EX Story
                  </span>
                </TierlistTab>
                <TierlistTab className="w-full" index="rod-story">
                  <span className="text-base text-shadow text-white">
                    RoD Story
                  </span>
                </TierlistTab>
                <TierlistTab className="w-full" index="hidden-story">
                  <span className="text-base text-shadow text-white">
                    Hidden Story
                  </span>
                </TierlistTab>
              </Tabs.List>

              <div className="mt-12 md:mt-0 md:col-span-10">
                <Tabs.Content className="flex flex-col gap-8" value="character">
                  <CharacterStory character={currentCharacter} />
                </Tabs.Content>
                <Tabs.Content className="flex flex-col gap-8" value="ex-story">
                  <ExCharacterStory character={currentCharacter} />
                </Tabs.Content>
                <Tabs.Content className="flex flex-col gap-8" value="rod-story">
                  <RodCharacterStory character={currentCharacter} />
                </Tabs.Content>
                <Tabs.Content
                  className="flex flex-col gap-8"
                  value="hidden-story"
                >
                  <CharacterHiddenStory character={currentCharacter} />
                </Tabs.Content>
              </div>
            </Tabs.Root>
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </Layout>
  );
}
