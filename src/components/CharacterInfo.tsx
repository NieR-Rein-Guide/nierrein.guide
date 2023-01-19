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
import {
  CDN_URL,
  CURSED_GOD_MONUMENT_SLABS,
  FEATURED_TIERLISTS,
  STONE_TOWER_MONUMENT_SLABS,
} from "@config/constants";
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
  debris,
  emblem,
  weapon,
  weapon_ability,
  weapon_ability_link,
  weapon_skill,
  weapon_skill_link,
  weapon_stat,
} from "@prisma/client";
import { Chip, Switch } from "@mui/material";
import CostumeThumbnail from "./CostumeThumbnail";
import getEmblemPath from "@utils/getEmblemPath";
import slug from "slugg";
import { useInventoryStore } from "@store/inventory";
import Checkbox from "./form/Checkbox";
import Stat from "./Stat";
import StoneSlabsSelect from "./StoneSlabsSelect";
import CursedGodSlabsSelect from "./CursedGodSlabsSelect";
import AwakeningLevelSelect from "./AwakeningLevelSelect";
import { useSettingsStore } from "@store/settings";
import { tiers_items, tiers, tierlists } from "@prisma/client-nrg";
import WeaponThumbnail from "./WeaponThumbnail";
import getBaseRarity from "@utils/getBaseRarity";
import clamp from "@utils/clamp";
import DebrisThumbnail from "./DebrisThumbnail";
import TierLogo from "./tierlist/TierLogo";
import Link from "next/link";
import { Event } from "../models/types/index";
import { EventItem } from "pages/events";
import StatDisplay from "./StatDisplay";
import WeaponArtwork from "./WeaponArtwork";
import Element from "./Element";

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
    debris: debris | null;
    weapon: weapon & {
      weapon_stat: weapon_stat[];
      weapon_ability_link: (weapon_ability_link & {
        weapon_ability: weapon_ability;
      })[];
      weapon_skill_link: (weapon_skill_link & {
        weapon_skill: weapon_skill;
      })[];
    };
    tierlistsItems: (tiers_items & {
      tiers: tiers & {
        tierslists: tierlists;
      };
    })[];
    sources: Event[];
  };
  abilities;
  skill;
  stats: costume_stat[];
  rankBonus: character_rank_bonus[];
  character: character;
  ascendLevel: number;
  skillLevel: number;
}): JSX.Element {
  const [isShowingModel, setIsShowingModel] = useState(false);
  const [isShowingWeaponModel, setIsShowingWeaponModel] = useState(false);
  const [dateRelative, setDateRelative] = useState(
    formatDistanceToNow(new Date(costume.release_time), {
      addSuffix: true,
    })
  );
  const ownedCostumes = useInventoryStore((state) => state.costumes);
  const toggleFromInventory = useInventoryStore((state) => state.toggleCostume);
  const cursedGodSlabsPercent = useSettingsStore(
    (state) => state.cursedGodSlabsPercent
  );
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );
  const setShowUnreleasedContent = useSettingsStore(
    (state) => state.setShowUnreleasedContent
  );
  const stoneTowerSlabsPercent = useSettingsStore(
    (state) => state.stoneTowerSlabsPercent
  );

  useEffect(() => {
    setDateRelative(
      formatDistanceToNow(new Date(costume.release_time), {
        addSuffix: true,
      })
    );
  }, [costume]);

  const abilityLevel = clamp(ascendLevel - 1, 1, 3);
  const costumeAbilities = abilities.slice(0, 2);
  const awakeningAbility = abilities?.[2]?.[0];

  const isSpoiler =
    !showUnreleasedContent && new Date() < new Date(costume.release_time);

  const officialTiers = costume.tierlistsItems.filter((tierlistItem) => {
    const tierlistId = tierlistItem.tiers.tierslists.tierlist_id;
    const isPve = FEATURED_TIERLISTS.pve.includes(tierlistId);
    const isPvp = FEATURED_TIERLISTS.pvp.includes(tierlistId);

    return isPve || isPvp;
  });

  return (
    <div>
      {isSpoiler && (
        <div className="p-8 bg-grey-dark border border-red-300 border-opacity-50 flex flex-col sm:flex-row mb-8">
          <label htmlFor="spoilers" className="text-beige cursor-pointer pr-4">
            Show spoilers/unreleased items
          </label>
          <Switch
            id="spoilers"
            size="small"
            onChange={(e) => setShowUnreleasedContent(e.target.checked)}
            checked={showUnreleasedContent}
          />
        </div>
      )}

      <div
        className={classNames({
          "filter blur-xl opacity-50": isSpoiler,
        })}
      >
        <div className="flex flex-col md:flex-row justify-between gap-y-6">
          <div>
            <div className="flex items-center gap-x-2 text-xl mt-4">
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

          <div className="grid grid-cols-2 xs:flex gap-x-4 gap-y-2">
            <StatDisplay type="hp" value={stats[2]?.hp} />
            <StatDisplay type="atk" value={stats[2]?.atk} />
            <StatDisplay type="vit" value={stats[2]?.vit} />
            <StatDisplay type="agi" value={stats[2]?.agi} />
          </div>
        </div>

        {/* Costume Artwork & Skills/Abilities */}
        <div className="relative flex flex-col-reverse md:grid md:grid-cols-2 py-4 gap-x-4">
          {/* Costume info */}
          <div className="flex flex-col">
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
                    gaugeRiseSpeed={
                      skill[skillLevel].costume_skill.gauge_rise_speed
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
                  costumeAbilities.map((ability, index) => {
                    return (
                      <Ability
                        href={`/ability/costume/${slug(
                          ability?.[3]?.costume_ability.name
                        )}-${ability?.[3]?.costume_ability.ability_id}`}
                        className={classNames(
                          "flex-1 transition-opacity",
                          ascendLevel === 0 && index > 0 ? "opacity-50" : ""
                        )}
                        key={`${costume.costume_id}ability${index}`}
                        name={ability?.[abilityLevel]?.costume_ability.name}
                        description={
                          ability?.[abilityLevel]?.costume_ability.description
                        }
                        imagePathBase={
                          ability?.[abilityLevel]?.costume_ability
                            .image_path_base
                        }
                        level={abilityLevel + 1}
                      />
                    );
                  })}
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
                    className={classNames("flex-1 transition-opacity")}
                    name={awakeningAbility.costume_ability.name}
                    description={awakeningAbility.costume_ability.description}
                    imagePathBase={
                      awakeningAbility.costume_ability.image_path_base
                    }
                    awakeningLevel={3}
                    level={null}
                  />
                  <div className="flex gap-4 bg-grey-dark p-4 relative bordered">
                    <span className="absolute top-2 right-4 text-xs mt-2">
                      <img src="/icons/costumes/awaken_rank_icon_rainbow.png" />
                      <span className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 font-semibold">
                        5
                      </span>
                    </span>
                    <div className="flex items-center">
                      <div className="relative mr-4">
                        <DebrisThumbnail
                          sizeClasses="h-16 w-16"
                          {...costume.debris}
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <strong className="font-display text-2xl text-beige">
                          {costume.debris?.name ?? "WIP"}
                        </strong>
                        <p className="text-beige-text">
                          <span>
                            {costume.debris?.description_long ?? "WIP"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Second column */}
          <div className="relative overflow-hidden max-w-xl mx-auto w-full h-[600px] lg:h-full">
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
                <div
                  className={classNames("absolute inset-3 transition-opacity", {
                    "opacity-0 pointer-events-none": !isShowingModel,
                  })}
                >
                  {isShowingModel && (
                    <ModelWithNoSSR
                      path={`${CDN_URL}3d/actor/${costume.asset_id}/mesh/dc_${costume.asset_id}/dc_${costume.asset_id}.fbx`}
                    />
                  )}
                </div>
                <div
                  className={classNames("transition-opacity", {
                    "opacity-0 pointer-events-none": isShowingModel,
                  })}
                >
                  <Image
                    key={`${CDN_URL}${costume.image_path_base}full.png`}
                    layout="fill"
                    objectFit="contain"
                    src={`${CDN_URL}${costume.image_path_base}full.png`}
                    alt={`${costume.title} (${costume.title}) illustration`}
                  />
                </div>
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
            {costume?.weapon && (
              <div className="absolute left-6 bottom-6 transform transition-transform ease-out-cubic hover:scale-105 z-50">
                <WeaponThumbnail
                  href={`/weapons/${costume?.weapon.slug}`}
                  rarity={getBaseRarity(costume?.weapon)}
                  type={costume.weapon.weapon_type}
                  element={costume.weapon.attribute}
                  isDark={costume.weapon.is_ex_weapon}
                  alt={costume?.weapon.name}
                  image_path={costume?.weapon.image_path}
                />
              </div>
            )}

            <div className="absolute top-6 left-6 z-10">
              <Checkbox
                label={
                  ownedCostumes.includes(costume.costume_id)
                    ? "Owned"
                    : "Owned?"
                }
                isChecked={ownedCostumes.includes(costume.costume_id)}
                setState={() => toggleFromInventory(costume.costume_id)}
              />
            </div>

            <div className="hidden md:block absolute bottom-0 left-1/2 transform -translate-x-1/2 z-50">
              <button
                className="btn"
                onClick={() => setIsShowingModel(!isShowingModel)}
              >
                {(isShowingModel && "View Artwork") || "View 3D Model"}
              </button>
            </div>
            <div className="absolute top-6 right-8">
              <Ascend level={ascendLevel} />
            </div>
          </div>
        </div>

        {/* Tier lists */}
        {officialTiers?.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-4 mb-8">
            {officialTiers.map((item) => {
              const isPvp = FEATURED_TIERLISTS.pvp.includes(
                item.tiers.tierslists.tierlist_id
              );

              return (
                <li
                  key={item.id}
                  className="relative flex flex-col bg-grey-dark bordered px-2 py-4 transform transition-transform hover:scale-95 ease-out-cubic"
                >
                  <h4 className="text-2xl text-beige text-center mb-2">
                    {isPvp ? "PvP" : ""} {item.tiers.tierslists.title}
                  </h4>
                  <div className="flex flex-1 items-center justify-center text-center">
                    <TierLogo tier={item.tiers.tier} />
                  </div>
                  <Link
                    href={`/tierlist/${item.tiers.tierslists.slug}?highlight=${costume.costume_id}`}
                    passHref
                  >
                    <a title="View tierlist" className="absolute inset-0">
                      <span className="sr-only">View tierlist</span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        <div className="relative mt-12">
          <h2 className="text-3xl absolute -top-8 md:-top-6 left-1/2 transform -translate-x-1/2">
            Costume's weapon
          </h2>
          <HR className="my-8" />
        </div>

        {/* Costume's weapon */}
        {costume.weapon && (
          <div className="grid md:grid-cols-2 gap-x-4">
            <div className="flex-1">
              <div className="relative overflow-hidden max-w-xl mx-auto order-1 xl:order-2 h-[600px] xl:h-full w-full">
                <div className="bordered-lg bg-grey-dark h-full w-full">
                  <div
                    className={classNames(
                      "absolute z-10 inset-3 transition-opacity",
                      {
                        "opacity-0 pointer-events-none": !isShowingWeaponModel,
                      }
                    )}
                  >
                    {isShowingWeaponModel && (
                      <ModelWithNoSSR
                        path={`${CDN_URL}3d/actor/${costume.weapon.asset_id}/mesh/dc_${costume.weapon.asset_id}/dc_${costume.weapon.asset_id}.fbx`}
                      />
                    )}
                  </div>

                  <div
                    className={classNames(
                      "relative z-10 h-full w-full transition-opacity",
                      {
                        "opacity-0 pointer-events-none": isShowingWeaponModel,
                      }
                    )}
                  >
                    <img
                      className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
                      src={`${CDN_URL}${costume.weapon.image_path}full.png`}
                      alt={`${costume.weapon.name} thumbnail`}
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

                <div className="hidden md:block absolute top-4 left-24 w-42 h-24 p-1 z-50">
                  <button
                    className="btn"
                    onClick={() =>
                      setIsShowingWeaponModel(!isShowingWeaponModel)
                    }
                  >
                    {(isShowingWeaponModel && "View Artwork") ||
                      "View 3D Model"}
                  </button>
                </div>

                <span className="flex absolute bottom-6 right-6">
                  {Array.from({
                    length: RARITY[costume.weapon.rarity],
                  }).map((_, index) => (
                    <div className="w-8 h-8" key={index}>
                      <Star rarity={RARITY[costume.weapon.rarity]} />
                    </div>
                  ))}
                </span>

                <div className="absolute left-6 bottom-6 text-xl z-50">
                  {costume.weapon.name}
                </div>

                <div className="absolute flex flex-col gap-y-4 top-4 left-4 p-1">
                  <div className="w-16 h-16">
                    <Element type={costume.weapon.attribute} />
                  </div>
                  <div className="w-16 h-16">
                    <Image
                      src={weaponsIcons[costume.weapon.weapon_type]}
                      alt={costume.weapon.weapon_type}
                    />
                  </div>

                  {costume.weapon.is_ex_weapon && (
                    <SVG src="/icons/weapons/dark.svg" className="h-16 w-16" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row items-center justify-between gap-x-2 text-xl my-4 md:my-0 md:mb-4">
                <div className="flex items-center gap-x-2">
                  <div className="w-8">
                    <Element type={costume.weapon.attribute} />
                  </div>
                  <span className="uppercase px-2 text-black bg-beige">
                    {costume.weapon.name}
                  </span>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-y-2 gap-x-4">
                <StatDisplay
                  type="hp"
                  value={costume.weapon.weapon_stat[0].hp}
                />
                <StatDisplay
                  type="atk"
                  value={costume.weapon.weapon_stat[0].atk}
                />
                <StatDisplay
                  type="vit"
                  value={costume.weapon.weapon_stat[0].vit}
                />
              </div>

              <Lines
                className="mb-2 mt-8"
                containerClass="justify-center"
                svgClass="w-96 xl:w-42"
              >
                <h2 className="text-2xl">Skills</h2>
              </Lines>

              {costume.weapon.weapon_skill_link.map((skill) => (
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

              {costume.weapon.weapon_ability_link.map((ability) => (
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
        )}

        {/* Detailed Stats */}
        {stats && (
          <div className="relative mb-8">
            <div className="mt-12">
              <h2 className="text-3xl absolute -top-8 md:-top-6 left-1/2 transform -translate-x-1/2">
                Statistics
              </h2>
              <HR className="my-8" />
            </div>

            <div className="flex flex-row gap-4 justify-center mb-8">
              <AwakeningLevelSelect />
              <StoneSlabsSelect />
              <CursedGodSlabsSelect />
            </div>

            <div className="flex flex-col-reverse md:flex-row mt-3 gap-6 mx-4">
              <StatsOfLevel
                stats={stats[0]}
                label={`Level ${stats[0].level}`}
              />
              <StatsOfLevel
                stats={stats[1]}
                label={`Level ${stats[1].level}`}
                description="No ascension"
              />
              <StatsOfLevel
                stats={stats[2]}
                label={`Level ${stats[2].level}`}
                description="Max ascension"
              />
            </div>

            {STONE_TOWER_MONUMENT_SLABS[stoneTowerSlabsPercent].abilities
              .length > 0 && (
              <div
                key={`stone-slabs-${costume.title}-${stoneTowerSlabsPercent}`}
                className="px-4 mt-8"
              >
                <h4 className="text-2xl">Stone Tower Monument Abilities</h4>
                <div className="flex gap-x-4 overflow-x-auto">
                  {STONE_TOWER_MONUMENT_SLABS[
                    stoneTowerSlabsPercent
                  ].abilities.map((ability) => (
                    <div
                      key={ability.name}
                      className="flex gap-4 bg-grey-dark p-4 relative bordered"
                    >
                      <span className="absolute top-2 right-4 text-xs mt-2 bg-brown px-2 py-1">
                        Lv. {ability.level}
                      </span>
                      <div className="flex items-center">
                        <div className="relative mr-4">
                          <SVG
                            src="/decorations/frame-ability.svg"
                            className="h-16 w-16"
                          />
                          <div className="h-16 w-16 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                            <img alt="" src={ability.icon_url} />
                          </div>
                        </div>
                        <div className="flex flex-col items-start">
                          <strong className="font-display text-2xl text-beige">
                            {ability.name}
                          </strong>
                          <p className="text-beige-text">
                            <span>{ability.description}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {CURSED_GOD_MONUMENT_SLABS[cursedGodSlabsPercent].abilities.length >
              0 && (
              <div
                key={`cursed-slabs-${costume.title}-${cursedGodSlabsPercent}`}
                className="px-4 mt-8"
              >
                <h4 className="text-2xl">Cursed God Monument Abilities</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {CURSED_GOD_MONUMENT_SLABS[
                    cursedGodSlabsPercent
                  ].abilities.map((ability) => (
                    <div
                      key={ability.name}
                      className="flex gap-4 bg-grey-dark p-4 relative bordered"
                    >
                      <span className="absolute top-2 right-4 text-xs mt-2 bg-brown px-2 py-1">
                        Lv. {ability.level}
                      </span>
                      <div className="flex items-center">
                        <div className="relative mr-4">
                          <SVG
                            src="/decorations/frame-ability.svg"
                            className="h-16 w-16"
                          />
                          <div className="h-16 w-16 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                            <img alt="" src={ability.icon_url} />
                          </div>
                        </div>
                        <div className="flex flex-col items-start">
                          <strong className="font-display text-2xl text-beige">
                            {ability.name}
                          </strong>
                          <p className="text-beige-text">
                            <span>{ability.description}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="bg-grey-dark bordered relative p-4 text-sm mt-8 max-w-xl mx-auto text-center">
              Temp abilities and rank bonuses are not included in the stats.
            </p>

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
          </div>
        )}

        {/* Source */}
        <div className="relative">
          <div className="mt-12">
            <h2 className="text-3xl absolute -top-8 md:-top-6 left-1/2 transform -translate-x-1/2">
              Costume source{costume.sources.length > 1 ? "s" : ""}
            </h2>
            <HR className="my-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {costume.sources.map((event) => (
              <EventItem key={event.id} {...event} />
            ))}

            {costume.sources.length === 0 && <p>Work in Progress...</p>}
          </div>
        </div>

        {/* Story/Lore */}
        <div className="relative">
          <div className="mt-12">
            <h2 className="text-3xl absolute -top-8 md:-top-6 left-1/2 transform -translate-x-1/2">
              Costume story
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
          </div>
        </div>
      </div>
    </div>
  );
}

function SingleStat({ name, value, type, icon }): JSX.Element {
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
      <div className={classNames("font-light", colors[name])}>
        <Stat type={type} value={value} />
      </div>
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
        <SingleStat
          icon={statsIcons.hp}
          name="HP"
          value={stats.hp ?? "???"}
          type="hp"
        />
        <SingleStat
          icon={statsIcons.atk}
          name="Attack"
          value={stats.atk ?? "???"}
          type="atk"
        />
        <SingleStat
          icon={statsIcons.def}
          name="Defense"
          value={stats.vit ?? "???"}
          type="vit"
        />
        {stats.agi > 0 && (
          <SingleStat
            icon={statsIcons.agility}
            name="Agility"
            value={stats.agi ?? "???"}
            type="agi"
          />
        )}
        {stats.crit_rate > 0 && (
          <SingleStat
            icon={statsIcons.cr}
            name="Critical Rate"
            value={`${stats.crit_rate ?? "???"}`}
            type="crit_rate"
          />
        )}
        {stats.crit_atk > 0 && (
          <SingleStat
            icon={statsIcons.cd}
            name="Critical Damage"
            value={`${stats.crit_atk ?? "???"}`}
            type="crit_atk"
          />
        )}
        {stats.eva_rate > 0 && (
          <SingleStat
            icon={statsIcons.eva_rate}
            name="Evasion Rate"
            value={`${stats.eva_rate ?? "???"}`}
            type="eva_rate"
          />
        )}
      </div>
    </div>
  );
}

export default CostumeDetails;
