
import weaponsIcons from "@utils/weaponsIcons";
import RARITY from "@utils/rarity";
import Star from "@components/decorations/Star";
import Lines from "@components/decorations/Lines";
import Element from "@components/Element";
import Skill from "@components/Skill";
import Ability from "@components/Ability";
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
import slug from "slugg";
import Checkbox from "./form/Checkbox";
import { useInventoryStore } from "@store/inventory";
import dynamic from "next/dynamic";
import StatDisplay from "./StatDisplay";
import { Event } from "../models/types";
import { EventItem } from "pages/events";
import CostumeThumbnail from "./CostumeThumbnail";
import { useSettingsStore } from "@store/settings";
const ModelWithNoSSR = dynamic(() => import("@components/Model"), {
  ssr: false,
});

type IWeapon = weapon & {
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
};

interface WeaponInfoProps {
  weapon: IWeapon;
  weapons: IWeapon[];
  evolutionStage: number;
  skillLevel: number;
  abilityLevel: number;
  events: Event[];
}

export default function WeaponInfo({
  weapons,
  evolutionStage,
  skillLevel = 15,
  abilityLevel = 15,
  events,
}: WeaponInfoProps): JSX.Element {
  const [isShowingModel, setIsShowingModel] = useState(false);
  const [selectedWeapon, setSelectedWeapon] = useState(weapons[evolutionStage]);

  useEffect(() => {
    setSelectedWeapon(weapons[evolutionStage]);
  }, [evolutionStage, weapons]);

  return (
    <div className="weapon-info">
      <div className="relative mb-16">
        <SingleWeapon
          weapon={selectedWeapon}
          isShowingModel={isShowingModel}
          setIsShowingModel={setIsShowingModel}
          abilityLevel={abilityLevel}
          skillLevel={skillLevel}
        />

        <div className="flex flex-col gap-y-4 mt-6">
          <div className="relative mb-8">
            <h2 className="text-3xl absolute top-1 left-1/2 transform -translate-x-1/2">
              Statistics
            </h2>
            <HR className="my-8" />

            <div className="flex flex-col-reverse md:flex-row mt-3 gap-6 mx-4">
              <StatsOfLevel
                stats={selectedWeapon.weapon_stat[0]}
                label={`Level ${selectedWeapon.weapon_stat[0].level}`}
              />
              <StatsOfLevel
                stats={selectedWeapon.weapon_stat[1]}
                label={`Level ${selectedWeapon.weapon_stat[1].level} (Max Limit Break)`}
              />
              {selectedWeapon.weapon_stat[2] && (
                <StatsOfLevel
                  stats={selectedWeapon.weapon_stat[2]}
                  label={`Level ${selectedWeapon.weapon_stat[2].level} (MLB + Refined)`}
                />
              )}
            </div>

            <p className="bg-grey-dark bordered relative p-4 text-sm mt-8 max-w-xl mx-auto text-center">
              Timed or conditional passives are not included in the stats.
            </p>
          </div>
        </div>

        {/* Source */}
        <div className="relative">
          <div className="mt-12">
            <h2 className="text-3xl absolute -top-8 md:-top-6 left-1/2 transform -translate-x-1/2">
              Weapon source{events.length > 1 ? "s" : ""}
            </h2>
            <HR className="my-8" />
          </div>

          <div className="bg-grey-dark bordered relative p-4 text-sm max-w-xl mx-auto text-center mb-8">
            {events.length === 0 &&
              !selectedWeapon.is_ex_weapon &&
              !selectedWeapon.is_rd_weapon &&
              !selectedWeapon.is_subjugation_weapon && (
                <span>Sorry, no potential event source found.</span>
              )}
            {selectedWeapon.is_ex_weapon && (
              <span>
                This weapon can be obtained while clearing the story. (hard
                mode)
              </span>
            )}
            {selectedWeapon.is_rd_weapon && (
              <span>
                This weapon can be obtained in the "Recollections of Dusk" game
                mode. See{" "}
                <a href="https://nierrein.guide/guide/recollections-of-dusk">
                  Recollections of Dusk guide
                </a>
              </span>
            )}
            {selectedWeapon.is_subjugation_weapon && (
              <span>
                This weapon can be obtained while playing the "Subjugation" game
                mode.
              </span>
            )}
            {events.length > 0 && (
              <div>
                <p>
                  We found {events.length} events corresponding to the release
                  date of the weapon.
                </p>
                <p>
                  <u>These may be incorrect</u>, please check each of them
                </p>
                <p className="mt-2 text-xs">⚠️ experimental</p>
              </div>
            )}
          </div>
          {events.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event) => (
                <EventItem key={event.id} {...event} />
              ))}
            </div>
          )}
        </div>

        {selectedWeapon.weapon_story_link.length > 0 && (
          <div className="flex flex-col gap-y-4 mt-6 relative">
            <h2 className="text-3xl absolute top-1 left-1/2 transform -translate-x-1/2">
              Stories
            </h2>
            <HR className="my-8" />

            <div
              key={selectedWeapon.weapon_id}
              className="flex flex-col gap-4 bg-grey-dark bordered relative p-4"
            >
              {selectedWeapon.weapon_story_link.map((story) => (
                <div
                  key={story.weapon_story_id}
                  className="text-beige-text whitespace-pre-wrap text-base mt-2 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: story.weapon_story.story.replaceAll("\\n", "<br>"),
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function SingleWeapon({
  weapon,
  isShowingModel,
  setIsShowingModel,
  abilityLevel = 15,
  skillLevel = 15,
}: {
  weapon: IWeapon;
  isShowingModel: boolean;
  setIsShowingModel;
  abilityLevel: number;
  skillLevel: number;
}) {
  const ownedWeapons = useInventoryStore((state) => state.weapons);
  const toggleFromInventory = useInventoryStore((state) => state.toggleWeapon);
  const isExalted = useSettingsStore((state) => state.isExalted);

  let stats = weapon.weapon_stat.filter((row) => !row.is_refined).pop();

  if (isExalted) {
    const hasRefined = weapon.weapon_stat.find((row) => row.is_refined);

    if (hasRefined) {
      stats = hasRefined;
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-x-4">
      <div className="flex-1">
        <div className="relative overflow-hidden max-w-xl mx-auto order-1 xl:order-2 h-[600px] md:h-full w-full">
          <div className="bordered-lg bg-grey-dark h-full w-full">
            <div
              className={classNames(
                "absolute z-10 inset-3 transition-opacity",
                {
                  "opacity-0 pointer-events-none": !isShowingModel,
                }
              )}
            >
              {isShowingModel && (
                <ModelWithNoSSR
                  path={`${CDN_URL}3d/actor/${weapon.asset_id}/mesh/dc_${weapon.asset_id}/dc_${weapon.asset_id}.fbx`}
                />
              )}
            </div>

            <div
              className={classNames(
                "relative z-10 h-full w-full transition-opacity",
                {
                  "opacity-0 pointer-events-none": isShowingModel,
                }
              )}
            >
              <img
                className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
                src={`${CDN_URL}${weapon.image_path}full.png`}
                alt={`${weapon.name} thumbnail`}
              />
            </div>
            <div className="absolute inset-0 z-0 pointer-events-none">
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

          <div className="hidden md:block absolute bottom-0 left-1/2 transform -translate-x-1/2 w-42 p-1 z-50">
            <button
              className="btn"
              onClick={() => setIsShowingModel(!isShowingModel)}
            >
              {(isShowingModel && "View Artwork") || "View 3D Model"}
            </button>
          </div>

          <span className="flex absolute bottom-6 right-6">
            {Array.from({
              length: RARITY[weapon.rarity],
            }).map((_, index) => (
              <div className="w-8 h-8" key={index}>
                <Star rarity={RARITY[weapon.rarity]} />
              </div>
            ))}
          </span>

          <div className="absolute flex flex-col gap-y-4 top-4 left-4 p-1">
            <div className="w-16 h-16">
              <Element type={weapon.attribute} />
            </div>
            <div className="w-16 h-16">
              <img
                src={weaponsIcons[weapon.weapon_type]}
                alt={weapon.weapon_type}
              />
            </div>

            {weapon.is_ex_weapon && (
              <SVG src="/icons/weapons/dark.svg" className="h-16 w-16" />
            )}
          </div>

          <div className="absolute flex flex-col gap-y-4 top-4 right-4 p-1 z-20">
            <Checkbox
              label={
                ownedWeapons.includes(weapon.weapon_id) ? "Owned" : "Owned?"
              }
              isChecked={ownedWeapons.includes(weapon.weapon_id)}
              setState={() => toggleFromInventory(weapon.weapon_id)}
            />
          </div>

          {weapon.costume && (
            <div className="absolute left-6 bottom-6 z-50">
              <CostumeThumbnail
                href={`/characters/${weapon.costume.character.slug}/${weapon.costume.slug}`}
                src={`${CDN_URL}${weapon.costume.image_path_base}battle.png`}
                alt={`${weapon.costume.title} thumbnail`}
                rarity={RARITY[weapon.costume.rarity]}
                isDark={weapon.costume.is_ex_costume}
                weaponType={weapon.costume.weapon_type}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between gap-x-2 text-xl my-4 md:my-0 md:mb-4">
          <div className="flex items-center gap-x-2">
            <div className="w-8">
              <Element type={weapon.attribute} />
            </div>
            {weapon.is_ex_weapon && <span className="text-rarity-4">EX</span>}
            <span className="uppercase px-2 text-black bg-beige">
              {weapon.name}
            </span>
          </div>
        </div>

        <div className="flex justify-center md:justify-start gap-y-2 gap-x-4">
          <StatDisplay type="hp" value={stats.hp} />
          <StatDisplay type="atk" value={stats.atk} />
          <StatDisplay type="vit" value={stats.vit} />
        </div>

        <Lines
          className="mb-2 mt-8"
          containerClass="justify-center"
          svgClass="w-96 xl:w-42"
        >
          <h2 className="text-2xl">Skills</h2>
        </Lines>

        {weapon.weapon_skill_link
          .sort((a, b) => a.slot_number - b.slot_number)
          .filter((skill) => skill.skill_level === skillLevel)
          .map((skill) => (
            <Skill
              key={skill.weapon_skill.skill_id}
              name={skill.weapon_skill.name}
              description={skill.weapon_skill.description}
              SkillCooltimeValue={skill.weapon_skill.cooldown_time}
              imagePathBase={skill.weapon_skill.image_path}
              level={skill.skill_level}
              isWeapon={true}
              isMaxAscended={true}
            />
          ))}

        <Lines
          className="mb-2 mt-8"
          containerClass="justify-center"
          svgClass="w-96 xl:w-42"
        >
          <h2 className="text-2xl">Abilities</h2>
        </Lines>

        {weapon.weapon_ability_link
          .sort((a, b) => a.slot_number - b.slot_number)
          .filter((ability) => ability.ability_level === abilityLevel)
          .slice(0, 3)
          .map((ability) => (
            <Ability
              key={ability.ability_id}
              href={`/ability/weapon/${slug(ability.weapon_ability.name)}-${
                ability.weapon_ability.ability_id
              }`}
              name={ability.weapon_ability.name}
              description={ability.weapon_ability.description}
              imagePathBase={ability.weapon_ability.image_path_base}
              level={ability.ability_level}
              maxLevel={15}
            />
          ))}

        {weapon.weapon_ability_link
          .filter((a) => a.slot_number === 4)
          .sort((a, b) => a.slot_number - b.slot_number).length > 0 && (
          <Lines
            className="mb-2 mt-8"
            containerClass="justify-center"
            svgClass="w-96 xl:w-42"
          >
            <h2 className="text-2xl">Refining Ability</h2>
          </Lines>
        )}
        {weapon.weapon_ability_link
          .filter((a) => a.slot_number === 4)
          .sort((a, b) => a.slot_number - b.slot_number)
          .map((ability) => (
            <Ability
              key={ability.ability_id}
              href={`/ability/weapon/${slug(ability.weapon_ability.name)}-${
                ability.weapon_ability.ability_id
              }`}
              name={ability.weapon_ability.name}
              description={ability.weapon_ability.description}
              imagePathBase={ability.weapon_ability.image_path_base}
              level={ability.ability_level}
              maxLevel={15}
            />
          ))}
      </div>
    </div>
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
        <img
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
