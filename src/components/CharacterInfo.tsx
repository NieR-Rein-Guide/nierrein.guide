import Image from "next/image";
import HR from "./decorations/HR";
import Star from "./decorations/Star";
import SVG from "react-inlinesvg";
import RARITY from "@utils/rarity";
import weaponsIcons from "@utils/weaponsIcons";
import statsIcons from "@utils/statsIcons";
import Lines from "./decorations/Lines";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Skill from "@components/Skill";
import Ability from "@components/Ability";
import Ascend from "@components/decorations/Ascend";
import dynamic from "next/dynamic";
import { CDN_URL } from "@config/constants";
import { format, formatDistanceToNow } from "date-fns";
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
import { Chip } from "@mui/material";
import CostumeThumbnail from "./CostumeThumbnail";
import getEmblemPath from "@utils/getEmblemPath";
import slug from "slugg";
import { useInventoryStore } from "@store/inventory";
import Checkbox from "./form/Checkbox";
const ModelWithNoSSR = dynamic(() => import("@components/Model"), {
  ssr: false,
});

function CostumeDetails({
  costume,
  abilities,
  skill,
  stats,
  rankBonus,
  character,
  ascendLevel,
  skillLevel,
}: {
  costume: costume & {
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
  abilities;
  skill;
  stats: costume_stat[];
  rankBonus: character_rank_bonus[];
  character: character;
  ascendLevel: number;
  skillLevel: number;
}): JSX.Element {
  const [statType] = useState("base"); // can be 'base' or 'displayed'
  const [isShowingModel, setIsShowingModel] = useState(false);
  const [dateRelative, setDateRelative] = useState(
    formatDistanceToNow(new Date(costume.release_time), {
      addSuffix: true,
    })
  );
  const ownedCostumes = useInventoryStore((state) => state.costumes);
  const toggleFromInventory = useInventoryStore((state) => state.toggleCostume);

  useEffect(() => {
    setDateRelative(
      formatDistanceToNow(new Date(costume.release_time), {
        addSuffix: true,
      })
    );
  }, [costume]);

  const abilityLevel = ascendLevel - 1;
  const costumeAbilities = abilities.slice(0, 2);
  const awakeningAbility = abilities?.[2]?.[0];

  return (
    <div>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        {/* Costume info */}
        <div className="flex flex-col mt-4 mx-4 xl:mt-0 order-2 xl:order-1">
          <div className="flex flex-col items-center xl:items-start mb-12 xl:mb-0">
            <div className="flex flex-col md:flex-row items-center gap-x-2 text-xl">
              <div className="flex items-center gap-x-2">
                <div className="w-8">
                  <Image
                    layout="responsive"
                    src={weaponsIcons[costume.weapon_type]}
                    alt={costume.weapon_type}
                  />
                </div>
                <span className="uppercase px-2 text-black bg-beige">
                  {character.name}
                </span>
              </div>
              <span className="uppercase text-beige">{costume.title}</span>
            </div>
            <p className="text-white text-opacity-60 mt-1 text-sm">
              Added {format(new Date(costume.release_time), "MM/dd/yyyy")} (
              {dateRelative})
            </p>
          </div>

          {/* Costume skills & abilities */}
          <div className="flex flex-col gap-y-8 md:mt-4">
            <div>
              <Lines
                className="mb-2"
                containerClass="justify-center"
                svgClass="w-96 xl:w-42"
              >
                <h2 className="text-2xl">Skill</h2>
              </Lines>
              {skill && (
                <Skill
                  className="flex-1"
                  name={skill[skillLevel].costume_skill.name}
                  description={skill[skillLevel].costume_skill.description}
                  SkillCooltimeValue={
                    skill[skillLevel].costume_skill.cooldown_time
                  }
                  level={skillLevel + 1}
                  isMaxAscended={ascendLevel === 4}
                  imagePathBase={skill[skillLevel].costume_skill.image_path}
                />
              )}
            </div>

            <div>
              <Lines
                className="mb-2"
                containerClass="justify-center"
                svgClass="w-96 xl:w-42"
              >
                <h2 className="text-2xl">Abilities</h2>
              </Lines>
              {costumeAbilities &&
                costumeAbilities.map((ability, index) => (
                  <Ability
                    href={`/ability/costume/${slug(
                      ability?.[3]?.costume_ability.name
                    )}-${ability?.[3]?.costume_ability.ability_id}`}
                    className={classNames(
                      "flex-1 transition-opacity",
                      ascendLevel === 1 && index > 0 ? "opacity-50" : ""
                    )}
                    key={`${costume.costume_id}ability${index}`}
                    name={ability?.[abilityLevel]?.costume_ability.name}
                    description={
                      ability?.[abilityLevel]?.costume_ability.description
                    }
                    imagePathBase={
                      ability?.[abilityLevel]?.costume_ability.image_path_base
                    }
                    level={abilityLevel + 1}
                  />
                ))}
            </div>

            {awakeningAbility && (
              <div key={costume.costume_id}>
                <Lines
                  className="mb-2"
                  containerClass="justify-center"
                  svgClass="w-96 xl:w-42"
                >
                  <h2 className="text-2xl text-center">Awakening</h2>
                </Lines>
                <Ability
                  href={`/ability/costume/${slug(
                    awakeningAbility.costume_ability.name
                  )}-${awakeningAbility.costume_ability.ability_id}`}
                  className={classNames("flex-1 transition-opacity")}
                  name={awakeningAbility.costume_ability.name}
                  description={awakeningAbility.costume_ability.description}
                  imagePathBase={
                    awakeningAbility.costume_ability.image_path_base
                  }
                  level={4}
                />
              </div>
            )}
          </div>
        </div>

        {/* Second column */}
        <div className="order-1 xl:order-2">
          {/* Costume artwork */}
          <div className="flex items-center justify-end">
            <Checkbox
              label={
                ownedCostumes.includes(costume.costume_id) ? "Owned" : "Owned?"
              }
              isChecked={ownedCostumes.includes(costume.costume_id)}
              setState={() => toggleFromInventory(costume.costume_id)}
            />
          </div>
          <div className="relative overflow-hidden max-w-xl mx-auto w-full h-[600px] xl:h-full">
            <div className="bordered-lg bg-grey-dark h-full w-full">
              {costume.emblem && (
                <img
                  loading="lazy"
                  className="opacity-30 absolute inset-0 h-full object-cover"
                  src={`${getEmblemPath(
                    costume.emblem.emblem_id.toString(),
                    "background"
                  )}`}
                  alt=""
                />
              )}
              <div className="relative z-10 h-full w-full">
                {isShowingModel && <ModelWithNoSSR path={null} />}
                {!isShowingModel && (
                  <Image
                    key={`${CDN_URL}${costume.image_path_base}full.png`}
                    layout="fill"
                    objectFit="contain"
                    src={`${CDN_URL}${costume.image_path_base}full.png`}
                    alt={`${costume.title} (${costume.title}) illustration`}
                  />
                )}
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
              {Array.from({ length: RARITY[costume.rarity] }).map(
                (_, index) => (
                  <div className="w-8 h-8" key={index}>
                    <Star rarity={RARITY[costume.rarity]} />
                  </div>
                )
              )}
            </span>
            {/* {costume?.weapon && (
              <Link
                href={`/weapons/${urlSlug(
                  costume.costume?.weapon?.name?.en ?? "unnamed"
                )}/${costume.costume.weapon.ids.base}`}
                passHref
              >
                <a className="absolute left-6 bottom-6 transform transition-transform ease-out-cubic hover:scale-105 z-50">
                  <WeaponThumbnail
                    type={costume.costume.weapon.type}
                    element={costume.costume.weapon.attribute}
                    id={costume.costume.weapon.ids.asset}
                    rarity={costume.costume.weapon.rarity}
                    isDark={costume.costume.weapon.isDark}
                  />
                </a>
              </Link>
            )} */}
            {/* <div className="hidden md:block absolute top-4 left-4 w-42 h-24 p-1 z-50">
              <button
                className="btn opacity-50"
                onClick={() => setIsShowingModel(!isShowingModel)}
              >
                {(isShowingModel && "View Artwork") || "View 3D Model"}
              </button>
            </div> */}
            <div className="absolute top-6 right-8">
              <Ascend level={ascendLevel} />
            </div>
          </div>
        </div>
      </div>

      {stats && (
        <div className="relative mb-8">
          <div className="mt-12">
            <h2 className="text-3xl absolute -top-8 md:-top-6 left-1/2 transform -translate-x-1/2">
              Statistics
            </h2>
            <HR className="my-8" />
          </div>

          <div className="flex flex-col-reverse md:flex-row mt-3 gap-6 mx-4">
            <StatsOfLevel
              stats={stats[0]}
              label={`Level ${stats[0].level}`}
              description={
                statType === "displayed"
                  ? `${abilities[0][3].name} is at level 1`
                  : ""
              }
            />
            <StatsOfLevel
              stats={stats[1]}
              label={`Level ${stats[1].level} (No ascension)`}
              description={
                statType === "displayed"
                  ? `${abilities[0][3].name} is at level 1`
                  : ""
              }
            />
            <StatsOfLevel
              stats={stats[2]}
              label={`Level ${stats[2].level} (Max ascension)`}
              description={
                statType === "displayed"
                  ? `${abilities[0][3].name} & ${abilities[1][3].name} are at level 4`
                  : ""
              }
            />
          </div>

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

          <p className="bg-grey-dark bordered relative p-4 text-sm mt-8 max-w-xl mx-auto text-center">
            Timed or conditional passives are not included in the stats.
          </p>
        </div>
      )}

      <div className="relative">
        <div className="mt-12">
          <h2 className="text-3xl absolute -top-8 md:-top-6 left-1/2 transform -translate-x-1/2">
            Character story
          </h2>
          <HR className="my-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-y-8">
          <div className="md:col-start-2 md:col-span-3 flex flex-col md:flex-row gap-x-4 bg-grey-dark bordered relative p-4">
            <div className="ml-auto mr-auto mb-4 md:mb-0 md:ml-0 md:mr-0">
              <CostumeThumbnail
                src={`${CDN_URL}${costume.image_path_base}battle.png`}
                alt={`${costume.title} thumbnail`}
                rarity={RARITY[costume.rarity]}
              />
            </div>
            <p
              className="text-beige-text whitespace-pre-wrap text-base mt-2 mb-4"
              dangerouslySetInnerHTML={{
                __html: `${costume.description.replaceAll("\\n", "<br>")}`,
              }}
            ></p>
          </div>

          <div className="md:col-start-1 md:col-span-3 flex flex-col md:flex-row gap-x-4 bg-grey-dark bordered relative p-4 opacity-50">
            Story 1 (WIP)
          </div>
          <div className="md:col-start-3 md:col-span-3 flex flex-col md:flex-row gap-x-4 bg-grey-dark bordered relative p-4 opacity-50">
            Story 2 (WIP)
          </div>
          <div className="md:col-start-1 md:col-span-3 flex flex-col md:flex-row gap-x-4 bg-grey-dark bordered relative p-4 opacity-50">
            Story 3 (WIP)
          </div>
          <div className="md:col-start-3 md:col-span-3 flex flex-col md:flex-row gap-x-4 bg-grey-dark bordered relative p-4 opacity-50">
            Story 4 (WIP)
          </div>
        </div>
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
  rowsClasses,
}: {
  label: string;
  stats: costume_stat;
  description?: string;
  rowsClasses?: string | string[];
}): JSX.Element {
  return (
    <div className="flex-1 border border-beige-inactive bg-grey-lighter pb-2">
      <div className="flex flex-col justify-center bg-grey-foreground py-4 text-center mb-2 h-24">
        <h3 className="text-2xl text-beige-inactive">{label}</h3>
        {description && (
          <span className="text-sm text-beige">{description}</span>
        )}
      </div>

      <div className={classNames(rowsClasses ?? "flex flex-col")}>
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
        <SingleStat
          icon={statsIcons.agility}
          name="Agility"
          value={stats.agi ?? "???"}
        />
        <SingleStat
          icon={statsIcons.cr}
          name="Critical Rate"
          value={`${stats.crit_rate / 10 ?? "???"}%`}
        />
        <SingleStat
          icon={statsIcons.cd}
          name="Critical Damage"
          value={`${stats.crit_atk / 10 ?? "???"}%`}
        />
        <SingleStat
          icon={statsIcons.eva_rate}
          name="Evasion Rate"
          value={`${stats.eva_rate / 10 ?? "???"}%`}
        />
      </div>
    </div>
  );
}

export default CostumeDetails;
