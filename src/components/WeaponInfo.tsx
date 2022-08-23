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
import { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import { CDN_URL } from "@config/constants";
import statsIcons from "@utils/statsIcons";
import HR from "./decorations/HR";
import classNames from "classnames";
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

interface WeaponInfoProps {
  weapons: (weapon & {
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

export default function WeaponInfo({ weapons }: WeaponInfoProps): JSX.Element {
  const [evolutionStage, setEvolutionStage] = useState(weapons.length - 1);
  const [selectedWeapon, setSelectedWeapon] = useState(weapons[evolutionStage]);
  const skills = groupByKey(selectedWeapon.weapon_skill_link, "slot_number");
  const abilities = groupByKey(
    selectedWeapon.weapon_ability_link,
    "slot_number"
  );

  // 0 is Lv. 1 and 14 is Lv. 15
  const [skillAbilitiesLevel, setSkillAbilitiesLevel] = useState(14);

  const isMaxAscended = selectedWeapon.is_ex_weapon
    ? evolutionStage === 10
    : evolutionStage === 1;

  useEffect(() => {
    setSelectedWeapon(weapons[evolutionStage]);
  }, [evolutionStage, weapons]);

  return (
    <div className="weapon-info">
      {(selectedWeapon.is_ex_weapon && (
        <div className="flex flex-wrap justify-around gap-4 bg-grey-dark px-4 py-6 mb-6 bordered relative">
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
        <div className="flex flex-wrap justify-around gap-4 bg-grey-dark px-4 py-6 mb-6 bordered relative">
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
                  <img
                    className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
                    src={`${CDN_URL}${selectedWeapon.image_path}full.png`}
                    alt={`${selectedWeapon.name} thumbnail`}
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
                {Array.from({
                  length: RARITY[selectedWeapon.rarity],
                }).map((_, index) => (
                  <div className="w-8 h-8" key={index}>
                    <Star rarity={RARITY[selectedWeapon.rarity]} />
                  </div>
                ))}
              </span>

              <div className="absolute left-6 bottom-6 text-xl z-50">
                {selectedWeapon.name}
              </div>

              <div className="absolute flex flex-col gap-y-4 top-4 left-4 p-1">
                <div className="w-16 h-16">
                  <Element type={selectedWeapon.attribute} />
                </div>
                <div className="w-16 h-16">
                  <Image
                    src={weaponsIcons[selectedWeapon.weapon_type]}
                    alt={selectedWeapon.weapon_type}
                  />
                </div>

                {selectedWeapon.is_ex_weapon && (
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
            <Skill
              key={skills[1][skillAbilitiesLevel].weapon_skill.skill_id}
              name={skills[1][skillAbilitiesLevel].weapon_skill.name}
              description={
                skills[1][skillAbilitiesLevel].weapon_skill.description
              }
              SkillCooltimeValue={
                skills[1][skillAbilitiesLevel].weapon_skill.cooldown_time
              }
              imagePathBase={
                skills[1][skillAbilitiesLevel].weapon_skill.image_path
              }
              level={skillAbilitiesLevel + 1}
              isWeapon={true}
              isMaxAscended={isMaxAscended}
            />
            <Skill
              key={skills[2][skillAbilitiesLevel].weapon_skill.skill_id}
              name={skills[2][skillAbilitiesLevel].weapon_skill.name}
              description={
                skills[2][skillAbilitiesLevel].weapon_skill.description
              }
              SkillCooltimeValue={
                skills[2][skillAbilitiesLevel].weapon_skill.cooldown_time
              }
              imagePathBase={
                skills[2][skillAbilitiesLevel].weapon_skill.image_path
              }
              level={skillAbilitiesLevel + 1}
              isWeapon={true}
              isMaxAscended={isMaxAscended}
            />

            <Lines
              className="mb-2 mt-8"
              containerClass="justify-center"
              svgClass="w-96 xl:w-42"
            >
              <h2 className="text-2xl">Abilities</h2>
            </Lines>

            <Ability
              name={abilities[1][skillAbilitiesLevel].weapon_ability.name}
              description={
                abilities[1][skillAbilitiesLevel].weapon_ability.description
              }
              imagePathBase={
                abilities[1][skillAbilitiesLevel].weapon_ability.image_path_base
              }
              level={skillAbilitiesLevel + 1}
              maxLevel={15}
            />

            {abilities?.[2] ? (
              <Ability
                name={abilities[2][skillAbilitiesLevel].weapon_ability.name}
                description={
                  abilities[2][skillAbilitiesLevel].weapon_ability.description
                }
                imagePathBase={
                  abilities[2][skillAbilitiesLevel].weapon_ability
                    .image_path_base
                }
                level={skillAbilitiesLevel + 1}
                maxLevel={15}
              />
            ) : null}

            {abilities?.[3] ? (
              <Ability
                name={abilities[3][skillAbilitiesLevel].weapon_ability.name}
                description={
                  abilities[3][skillAbilitiesLevel].weapon_ability.description
                }
                imagePathBase={
                  abilities[3][skillAbilitiesLevel].weapon_ability
                    .image_path_base
                }
                level={skillAbilitiesLevel + 1}
                maxLevel={15}
              />
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-y-4 mt-6">
          <div className="relative mb-8">
            <h2 className="text-3xl absolute top-1 left-1/2 transform -translate-x-1/2">
              Statistics
            </h2>
            <HR className="my-8" />

            <div className="flex flex-col md:flex-row mt-3 gap-6 mx-4">
              <StatsOfLevel
                stats={selectedWeapon.weapon_stat[0]}
                label={`Level ${selectedWeapon.weapon_stat[0].level}`}
              />
              <StatsOfLevel
                stats={selectedWeapon.weapon_stat[1]}
                label={`Level ${selectedWeapon.weapon_stat[1].level} (No ascension)`}
              />
              <StatsOfLevel
                stats={selectedWeapon.weapon_stat[2]}
                label={`Level ${selectedWeapon.weapon_stat[2].level} (Max ascension)`}
              />
            </div>

            <p className="bg-grey-dark bordered relative p-4 text-sm mt-8 max-w-xl mx-auto text-center">
              Timed or conditional passives are not included in the stats.
            </p>
          </div>
        </div>

        {selectedWeapon.weapon_story_link.length > 0 && (
          <div className="flex flex-col gap-y-4 mt-6 relative">
            <h2 className="text-3xl absolute top-1 left-1/2 transform -translate-x-1/2">
              Stories
            </h2>
            <HR className="my-8" />

            {selectedWeapon.weapon_story_link.map((story) => (
              <p
                className="bg-grey-dark p-4 border border-beige-inactive border-opacity-50"
                key={story.weapon_story_id}
                dangerouslySetInnerHTML={{
                  __html: `${story.weapon_story.story.replaceAll(
                    "\\n",
                    "<br>"
                  )}`,
                }}
              ></p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function groupByKey(list, key) {
  return list.reduce(
    (hash, obj) => ({
      ...hash,
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    }),
    {}
  );
}

function SingleStat({ name, value, icon }): JSX.Element {
  const colors = {
    Attack: "text-red-300",
    Defense: "text-blue-300",
    Agility: "text-green-300",
    "Critical Rate": "",
    "Critical Damage": "",
  };

  return (
    <div className="flex items-center justify-between pl-4 pr-8">
      <div className="flex items-center gap text-beige-light">
        <Image
          layout="intrinsic"
          src={icon}
          alt={name}
          width={48}
          height={48}
        />
        {name}
      </div>
      <div className={classNames("font-light", colors[name])}>{value}</div>
    </div>
  );
}

function StatsOfLevel({
  label,
  stats,
  description,
}: {
  label: string;
  stats: weapon_stat;
  description?: string;
}): JSX.Element {
  return (
    <div className="flex-1 border border-beige-inactive bg-grey-lighter">
      <div className="flex flex-col justify-center bg-grey-foreground py-4 text-center mb-2 h-24">
        <h3 className="text-2xl text-beige-inactive">{label}</h3>
        {description && (
          <span className="text-sm text-beige">{description}</span>
        )}
      </div>

      <div className="flex flex-col">
        <SingleStat icon={statsIcons.hp} name="HP" value={stats.hp ?? "???"} />
        <SingleStat
          icon={statsIcons.atk}
          name="Attack"
          value={stats.atk ?? "???"}
        />
        <SingleStat
          icon={statsIcons.def}
          name="Defense"
          value={stats.vit ?? "???"}
        />
      </div>
    </div>
  );
}
