import Image from "next/image";
import weaponsIcons from "@utils/weaponsIcons";
import RARITY from "@utils/rarity";
import Star from "@components/decorations/Star";
import Lines from "@components/decorations/Lines";
import Element from "@components/Element";
import Radio from "@components/form/Radio";
import Skill from "@components/Skill";
import Ability from "@components/Ability";
import Slider from "rc-slider";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import {
  weapon_ability_link,
  weapon_ability,
  weapon_skill_link,
  weapon_skill,
  weapon_stat,
  weapon,
} from "@prisma/client";
import { CDN_URL } from "@config/constants";

interface WeaponInfoProps {
  weapon: weapon & {
    weapon_ability_link: (weapon_ability_link & {
      weapon_ability: weapon_ability;
    })[];
    weapon_skill_link: (weapon_skill_link & {
      weapon_skill: weapon_skill;
    })[];
    weapon_stat: weapon_stat[];
  };
}

export default function WeaponInfo({ weapon }: WeaponInfoProps) {
  const [evolutionStage, setEvolutionStage] = useState(0);

  // 0 is Lv. 1 and 14 is Lv. 15
  const [skillAbilitiesLevel, setSkillAbilitiesLevel] = useState(14);

  const isMaxAscended = weapon.is_ex_weapon
    ? evolutionStage === 10
    : evolutionStage === 1;

  useEffect(() => {
    // setEvolutionStage(weapon.evolutions.length - 1);
    setSkillAbilitiesLevel(14);
  }, [weapon]);

  return (
    <div className="weapon-info">
      {(weapon.is_ex_weapon && (
        <div className="flex flex-wrap justify-around gap-4 bg-grey-dark p-4 mb-6">
          <Radio
            name="Stage 1"
            value={0}
            isChecked={evolutionStage === 0}
            setState={setEvolutionStage}
          />

          <Radio
            name="Stage 5"
            value={4}
            isChecked={evolutionStage === 4}
            setState={setEvolutionStage}
          />

          <Radio
            name="Stage 8"
            value={7}
            isChecked={evolutionStage === 7}
            setState={setEvolutionStage}
          />

          <Radio
            name="Final Stage"
            value={10}
            isChecked={evolutionStage === 10}
            setState={setEvolutionStage}
          />
        </div>
      )) || (
        <div className="flex flex-wrap justify-around gap-4 bg-grey-dark p-4 mb-6">
          <Radio
            name="First Stage"
            value={0}
            isChecked={evolutionStage === 0}
            setState={setEvolutionStage}
          />

          <Radio
            name="Final Stage"
            value={1}
            isChecked={evolutionStage === 1}
            setState={setEvolutionStage}
          />
        </div>
      )}

      <div className="relative mb-16">
        <div className="flex flex-col xl:flex-row justify-between">
          <div className="flex-1">
            <div
              className="relative overflow-hidden max-w-xl mx-auto order-1 xl:order-2 w-full"
              style={{ height: "700px" }}
            >
              <div className="bordered-lg bg-grey-dark h-full w-full">
                <div className="relative z-10 h-full w-full">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={`${CDN_URL}${weapon.image_path}full.png`}
                    alt={`${weapon.name} thumbnail`}
                  />
                </div>

                <div className="absolute inset-0 z-0">
                  <div className="absolute -left-24 top-24 transform -scale-1">
                    <SVG
                      src="/decorations/square-right.svg"
                      className="h-48 filter brightness-30 floating"
                    />
                  </div>

                  <SVG
                    src="/decorations/square-right.svg"
                    className="h-48 absolute -right-20 -top-16 filter brightness-30 floating"
                  />
                  <SVG
                    src="/decorations/c_rect_inside.svg"
                    className="absolute -left-64 floating"
                  />
                  <SVG
                    src="/decorations/c_rect_outside.svg"
                    className="absolute -left-64 floating"
                  />
                </div>
              </div>
              <span className="flex absolute bottom-6 right-6">
                {/* {Array.from({
                  length: RARITY[weapon.evolutions[evolutionStage]?.RarityType],
                }).map((_, index) => (
                  <div className="w-8 h-8" key={index}>
                    <Star
                      rarity={
                        RARITY[weapon.evolutions[evolutionStage]?.RarityType]
                      }
                    />
                  </div>
                ))} */}
              </span>

              <div className="absolute left-6 bottom-6 text-xl z-50">
                {weapon.name}
              </div>

              <div className="absolute flex flex-col gap-y-4 top-4 left-4 p-1">
                <div className="w-16 h-16">
                  <Element type={weapon.attribute} />
                </div>
                <div className="w-16 h-16">
                  <Image
                    src={weaponsIcons[weapon.weapon_type]}
                    alt={weapon.weapon_type}
                  />
                </div>

                {weapon.is_ex_weapon && (
                  <SVG src="/icons/weapons/dark.svg" className="h-16 w-16" />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-y-2 p-2">
            <div className="px-6">
              <span className="text-beige">
                Skill & Abilities <b>Lv. {skillAbilitiesLevel + 1}</b>
              </span>
              <Slider
                value={skillAbilitiesLevel}
                className="mt-2"
                min={0}
                max={14}
                onChange={(value) => setSkillAbilitiesLevel(value)}
              />
            </div>
            {/* Weapon abilities */}
            <Lines
              className="mb-2"
              containerClass="justify-center"
              svgClass="w-96 xl:w-42"
            >
              <h2 className="text-2xl">Skills</h2>
            </Lines>
            {/* {weapon.skills[evolutionStage]?.[0] && (
              <Skill
                name={
                  weapon.skills[evolutionStage]?.[0][skillAbilitiesLevel].name
                }
                description={
                  weapon.skills[evolutionStage]?.[0][skillAbilitiesLevel]
                    .description.long
                }
                SkillCooltimeValue={
                  weapon.skills[evolutionStage]?.[0][skillAbilitiesLevel]
                    .SkillCooltimeValue
                }
                AssetCategoryId={
                  weapon.skills[evolutionStage]?.[0][skillAbilitiesLevel]
                    .SkillAssetCategoryId
                }
                AssetVariationId={
                  weapon.skills[evolutionStage]?.[0][skillAbilitiesLevel]
                    .SkillAssetVariationId
                }
                level={skillAbilitiesLevel + 1}
                isWeapon={true}
                isMaxAscended={isMaxAscended}
              />
            )}

            {weapon.skills[evolutionStage]?.[1] && (
              <Skill
                name={
                  weapon.skills[evolutionStage][1][skillAbilitiesLevel].name
                }
                description={
                  weapon.skills[evolutionStage][1][skillAbilitiesLevel]
                    .description.long
                }
                SkillCooltimeValue={
                  weapon.skills[evolutionStage][1][skillAbilitiesLevel]
                    .SkillCooltimeValue
                }
                AssetCategoryId={
                  weapon.skills[evolutionStage][1][skillAbilitiesLevel]
                    .SkillAssetCategoryId
                }
                AssetVariationId={
                  weapon.skills[evolutionStage][1][skillAbilitiesLevel]
                    .SkillAssetVariationId
                }
                level={skillAbilitiesLevel + 1}
                isWeapon={true}
                isMaxAscended={isMaxAscended}
              />
            )} */}

            <Lines
              className="mb-2 mt-8"
              containerClass="justify-center"
              svgClass="w-96 xl:w-42"
            >
              <h2 className="text-2xl">Abilities</h2>
            </Lines>

            {/* {weapon.abilities[evolutionStage]?.[0] && (
              <Ability
                name={
                  weapon.abilities[evolutionStage][0][skillAbilitiesLevel].name
                }
                description={
                  weapon.abilities[evolutionStage][0][skillAbilitiesLevel]
                    .description.long
                }
                AssetCategoryId={
                  weapon.abilities[evolutionStage][0][skillAbilitiesLevel]
                    .AssetCategoryId
                }
                AssetVariationId={
                  weapon.abilities[evolutionStage][0][skillAbilitiesLevel]
                    .AssetVariationId
                }
                level={skillAbilitiesLevel + 1}
                maxLevel={15}
              />
            )}

            {weapon.abilities[evolutionStage]?.[1] && (
              <Ability
                name={
                  weapon.abilities[evolutionStage][1][skillAbilitiesLevel].name
                }
                description={
                  weapon.abilities[evolutionStage][1][skillAbilitiesLevel]
                    .description.long
                }
                AssetCategoryId={
                  weapon.abilities[evolutionStage][1][skillAbilitiesLevel]
                    .AssetCategoryId
                }
                AssetVariationId={
                  weapon.abilities[evolutionStage][1][skillAbilitiesLevel]
                    .AssetVariationId
                }
                level={skillAbilitiesLevel + 1}
                maxLevel={15}
              />
            )} */}
          </div>
        </div>

        <div className="flex flex-col gap-y-4 mt-6">
          <h4 className="text-3xl bg-grey-lighter">Stats</h4>

          <p>Coming soon...</p>
        </div>

        {/* {weapon?.stories.length > 0 && (
          <div className="flex flex-col gap-y-4 mt-6">
            <h4 className="text-3xl bg-grey-lighter">Stories</h4>

            {weapon.stories.map((story, index) => (
              <p
                className="bg-grey-dark p-4 border border-beige-inactive border-opacity-50"
                key={`${weapon.ids.base}-${index}`}
                dangerouslySetInnerHTML={{
                  __html: `${story.replaceAll("\\n", "<br>")}`,
                }}
              ></p>
            ))}
          </div>
        )} */}

        {/* {weapon?.metadata?.weapon?.sources?.length > 0 && (
          <div className="mt-8">
            <h3 className="font-display text-2xl mb-4">Weapon Sources</h3>

            <div className="flex flex-wrap gap-4">
              {weapon.metadata.weapon.sources.map((source, index) => (
                <div
                  key={`${weapon.ids.asset}source${index}`}
                  className="flex justify-center gap-x-4 items-center border border-beige-inactive border-opacity-50 bg-grey-dark p-4"
                >
                  <h3 className="text-2xl text-beige-inactive">
                    {source.questType && <p>{source.questType}</p>}
                    {source.groupName && <p>{source.groupName}</p>}
                    {source.questName && <p>{source.questName}</p>}
                    {source.difficulty && <p>{source.difficulty}</p>}
                    {source.storeName && <p>{source.storeName}</p>}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
