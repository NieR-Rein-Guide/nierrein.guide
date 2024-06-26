
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
  REPLACE_COSTUME_IDS,
  STONE_TOWER_MONUMENT_SLABS,
} from "@config/constants";
import { format, formatDistanceToNow } from "date-fns";
import {
  character,
  character_rank_bonus,
  costume,
  costume_ability,
  costume_ability_link,
  costume_karma_slot,
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
import { costumes_link } from "@prisma/client-nrg";
import { Chip, Switch, Tooltip } from "@mui/material";
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
import getCostumeLevelsByRarity from "@utils/getCostumeLevelsByRarity";
import { chaptersIcons } from "@utils/chaptersIcons";
import { LimitedCostume } from "./LimitedCostume";
import { SingleWeapon } from "./WeaponInfo";
import Element from "./Element";

const ModelWithNoSSR = dynamic(() => import("@components/Model"), {
  ssr: false,
});

export const KARMA_ICONS_PATHS = {
  RARE: "lottery_effect_thumbnail_bg_silver",
  S_RARE: "lottery_effect_thumbnail_bg_gold",
  SS_RARE: "lottery_effect_thumbnail_bg_rainbow",
};

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
    character: character & {
      debris: debris;
    };
    emblem: emblem;
    debris: debris;
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
    link: costumes_link;
    costume_karma_slot: costume_karma_slot[];
  };
  abilities;
  skill;
  stats: costume_stat[];
  rankBonus: character_rank_bonus[];
  character: character;
  ascendLevel: number;
  skillLevel: number;
}): JSX.Element {
  const hasReplace = REPLACE_COSTUME_IDS.includes(costume.costume_id);

  const [isSpoiler, setIsSpoiler] = useState(
    new Date() < new Date(costume.release_time)
  );
  const [isReplaced, setIsReplaced] = useState(false);
  const [isShowingModel, setIsShowingModel] = useState(false);
  const [dateRelative, setDateRelative] = useState(
    formatDistanceToNow(new Date(costume.release_time), {
      addSuffix: true,
    })
  );
  const region = useSettingsStore((state) => state.region);
  const awakeningLevel = useSettingsStore((state) => state.awakeningLevel);

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
  const isExalted = useSettingsStore((state) => state.isExalted);

  useEffect(() => {
    setDateRelative(
      formatDistanceToNow(new Date(costume.release_time), {
        addSuffix: true,
      })
    );
  }, [costume]);

  useEffect(() => {
    setIsSpoiler(
      !showUnreleasedContent && new Date() < new Date(costume.release_time)
    );
  }, [showUnreleasedContent, region, costume]);

  useEffect(() => {
    if (isReplaced && !hasReplace) {
      setIsReplaced(false);
    }
  }, [costume]);

  const abilityLevel = clamp(ascendLevel - 1, 1, 3);
  const costumeAbilities = abilities.slice(0, 2);
  const awakeningAbility = abilities?.[2]?.[0];

  const officialTiers = costume.tierlistsItems.filter((tierlistItem) => {
    const tierlistId = tierlistItem.tiers.tierslists.tierlist_id;
    const isPve = FEATURED_TIERLISTS.pve.includes(tierlistId);
    const isPvp = FEATURED_TIERLISTS.pvp.includes(tierlistId);

    return isPve || isPvp;
  });

  const { maxNoAsc, maxWithAsc } = getCostumeLevelsByRarity(costume.rarity);

  const stats70 = [...stats]
    .filter((stat) => stat.level === maxNoAsc)
    .sort((a, b) => a.awakening_step - b.awakening_step);
  const stats90 = [...stats]
    .filter((stat) => stat.level === maxWithAsc)
    .sort((a, b) => a.awakening_step - b.awakening_step);
  const stats100 = [...stats]
    .filter((stat) => stat.level === maxWithAsc + 10)
    .sort((a, b) => a.awakening_step - b.awakening_step);

  const selectedStats = isExalted ? stats100 : stats90;

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

      {new Date(costume.release_time) > new Date() && (
        <p className="text-2xl font-display text-center p-8 bg-grey-dark border border-red-300 border-opacity-50 mt-4 md:mt-0 mb-4">
          As a courtesy to other fans, please refrain from sharing unreleased
          costumes on public platforms.
        </p>
      )}

      <div
        className={classNames({
          "filter blur-xl opacity-50": isSpoiler,
        })}
      >
        <div className="flex flex-col md:flex-row justify-between gap-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xl mt-4">
              <div className="flex items-center gap-x-2">
                <Tooltip
                  enterTouchDelay={0}
                  className="cursor-help"
                  title={
                    <div>
                      <p>
                        Primary weapons whose affinity matches a costume's
                        Proficient Affinity provide +5,000 HP, and matching
                        secondary weapons provide +2,500 HP, for a maximum
                        increase of +10,000 HP.{" "}
                      </p>
                      <Link
                        className="text-blue-300 underline"
                        href="https://nierrein.guide/notice/1043"
                      >
                        Learn more about Proficient Affinity
                      </Link>
                    </div>
                  }
                >
                  <Element size={32} type={costume.attribute} />
                </Tooltip>
                <div className="w-8">
                  <img
                    src={weaponsIcons[costume.weapon_type]}
                    alt={costume.weapon_type}
                  />
                </div>
                {costume.is_ex_costume && (
                  <span className="text-rarity-4">EX</span>
                )}
                {costume.is_rd_costume && (
                  <Tooltip title="Recollections of Dusk costume">
                    <span className="text-rarity-rd">RoD</span>
                  </Tooltip>
                )}
                <span className="uppercase px-2 text-black bg-beige">
                  {character.name}
                </span>
              </div>
              <span className="uppercase text-beige">{costume.title}</span>
              {costume.link?.is_limited && (
                <LimitedCostume isLogoOnly events={costume.link.events} />
              )}
              {costume.link?.is_collab && (
                <div className="inline-flex rounded-full bg-white bg-opacity-10 px-2 py-1">
                  <p className="font-display text-lg font-semibold text-rarity-collab leading-none">
                    Collab
                  </p>
                </div>
              )}
            </div>
            <p className="text-white text-opacity-60 mt-1 text-sm">
              Added {format(new Date(costume.release_time), "MM/dd/yyyy")} (
              {dateRelative})
            </p>
          </div>

          <div className="grid grid-cols-2 xs:flex gap-x-4 gap-y-2">
            <StatDisplay type="hp" value={selectedStats[awakeningLevel]?.hp} />
            <StatDisplay
              type="atk"
              value={selectedStats[awakeningLevel]?.atk}
            />
            <StatDisplay
              type="vit"
              value={selectedStats[awakeningLevel]?.vit}
            />
            <StatDisplay
              type="agi"
              value={selectedStats[awakeningLevel]?.agi}
            />
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
                  <img
                    key={`${CDN_URL}${costume.image_path_base}full${
                      isReplaced ? "_replace" : ""
                    }.png`}
                    layout="fill"
                    className="object-contain"
                    src={`${CDN_URL}${costume.image_path_base}full${
                      isReplaced ? "_replace" : ""
                    }.png`}
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

            {hasReplace && (
              <div className="absolute top-16 left-6 z-10">
                <button
                  className="w-12"
                  title="Switch costume artwork"
                  onClick={() => setIsReplaced(!isReplaced)}
                >
                  <img
                    className="object-contain"
                    src="/icons/switch.png"
                    alt="Switch costume design"
                  />
                </button>
              </div>
            )}

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
          <div>
            <ul className="grid grid-cols-1 mb-8">
              {officialTiers
                .filter((item) => item.tooltip)
                .map((item) => {
                  const isPvp = FEATURED_TIERLISTS.pvp.includes(
                    item.tiers.tierslists.tierlist_id
                  );

                  return (
                    <li key={item.id} className="grid grid-cols-12 gap-4">
                      <div className="col-span-4 relative flex flex-col bg-grey-dark bordered px-2 py-4 transform transition-transform hover:scale-95 ease-out-cubic">
                        <h4 className="text-2xl text-beige text-center mb-2">
                          {isPvp ? "PvP" : ""} {item.tiers.tierslists.title}
                        </h4>
                        <div className="flex flex-1 items-center justify-center text-center">
                          <TierLogo tier={item.tiers.tier} />
                        </div>
                        <Link
                          href={`/tierlist/${item.tiers.tierslists.slug}?highlight=${costume.costume_id}`}
                          passHref
                          title="View tierlist"
                          className="absolute inset-0"
                        >
                          <span className="sr-only">View tierlist</span>
                        </Link>
                      </div>
                      {item.tooltip && (
                        <div
                          className="p-4 col-span-8"
                          dangerouslySetInnerHTML={{ __html: item.tooltip }}
                        ></div>
                      )}
                    </li>
                  );
                })}
            </ul>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-4 mb-8">
              {officialTiers
                .filter((item) => !item.tooltip)
                .map((item) => {
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
                        title="View tierlist"
                        className="absolute inset-0"
                      >
                        <span className="sr-only">View tierlist</span>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}

        <div className="relative mt-12">
          <h2 className="text-3xl absolute -top-8 md:-top-6 left-1/2 transform -translate-x-1/2">
            Costume's weapon
          </h2>
          <HR className="my-8" />
        </div>

        {/* Costume's weapon */}
        {(costume?.weapon && <SingleWeapon weapon={costume.weapon} />) || (
          <p className="text-center">The weapon hasn't been linked yet.</p>
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
                stats={stats70}
                label={`Level ${maxNoAsc}`}
                description="No ascension"
              />
              <StatsOfLevel
                stats={stats90}
                label={`Level ${maxWithAsc}`}
                description="Max ascension"
              />
              <StatsOfLevel
                stats={stats100}
                label={`Level ${maxWithAsc + 10}`}
                description="Max ascension + Exalted"
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

            {costume.costume_karma_slot.length > 0 && (
              <div className="relative mb-8">
                <div className="mt-12">
                  <h2 className="text-3xl absolute -top-8 md:-top-6 left-1/2 transform -translate-x-1/2">
                    Karma
                  </h2>
                  <HR className="my-8" />
                </div>

                <div className="grid overflow-x-auto grid-cols-1 md:grid-cols-3 mt-8 gap-6">
                  {costume.costume_karma_slot
                    .sort((a, b) => a.order - b.order)
                    .map((slot) => (
                      <div
                        key={`karma-slot-${slot.order}`}
                        className="karma-list text-center"
                      >
                        <h4 className="mb-4 text-xl">Slot n°{slot.order}</h4>
                        <ul className="flex flex-col gap-2 relative bordered p-4">
                          {slot.karma_items
                            .sort((a, b) => a.order - b.order)
                            .map((item, index) => (
                              <li
                                key={`karma-ability-${item.order}`}
                                className="flex items-center gap-4"
                              >
                                <div className="relative h-16 w-16">
                                  <img
                                    src={`/icons/${
                                      KARMA_ICONS_PATHS[item.rarity]
                                    }.png`}
                                    alt=""
                                    loading="lazy"
                                  />
                                  <img
                                    className="absolute z-10 left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-8 h-auto"
                                    src={`${CDN_URL}${item.image_path}`}
                                    alt=""
                                    loading="lazy"
                                  />
                                </div>
                                <p className="flex-1 text-sm">{item.text}</p>
                              </li>
                            ))}
                        </ul>
                      </div>
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

            {costume.sources.length === 0 && !costume.link?.is_story && (
              <h3 className="md:col-span-2 font-display text-2xl text-center">
                Work in Progress...
              </h3>
            )}

            {costume.link?.is_story && (
              <div className="md:col-span-2 flex flex-col gap-y-4 items-center justify-center p-8">
                <img
                  src={chaptersIcons[costume.link?.chapter]}
                  alt="chapter icon"
                />
                <h3 className="font-display text-2xl text-center">
                  Chapter n°{costume.link?.chapter}
                  {costume.is_ex_costume ? (
                    <p>
                      EX Character Quests {">"} Dark Memory Quests {">"}
                      {character.name} {">"} Dark Trial: Hard
                    </p>
                  ) : (
                    ""
                  )}
                </h3>
              </div>
            )}
          </div>
        </div>

        {/* Story/Lore */}
        <div id="sources" className="relative">
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
        <img
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
  stats: costume_stat[];
  description?: string;
  rowsClasses?: string | string[];
}): JSX.Element {
  const awakeningLevel = useSettingsStore((state) => state.awakeningLevel);

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
          value={stats[awakeningLevel].hp ?? "???"}
          type="hp"
        />
        <SingleStat
          icon={statsIcons.atk}
          name="Attack"
          value={stats[awakeningLevel].atk ?? "???"}
          type="atk"
        />
        <SingleStat
          icon={statsIcons.def}
          name="Defense"
          value={stats[awakeningLevel].vit ?? "???"}
          type="vit"
        />
        {stats[awakeningLevel].agi > 0 && (
          <SingleStat
            icon={statsIcons.agility}
            name="Agility"
            value={stats[awakeningLevel].agi ?? "???"}
            type="agi"
          />
        )}
        {stats[awakeningLevel].crit_rate > 0 && (
          <SingleStat
            icon={statsIcons.cr}
            name="Critical Rate"
            value={`${stats[awakeningLevel].crit_rate ?? "???"}`}
            type="crit_rate"
          />
        )}
        {stats[awakeningLevel].crit_atk > 0 && (
          <SingleStat
            icon={statsIcons.cd}
            name="Critical Damage"
            value={`${stats[awakeningLevel].crit_atk ?? "???"}`}
            type="crit_atk"
          />
        )}
        {stats[awakeningLevel].eva_rate > 0 && (
          <SingleStat
            icon={statsIcons.eva_rate}
            name="Evasion Rate"
            value={`${stats[awakeningLevel].eva_rate ?? "???"}`}
            type="eva_rate"
          />
        )}
      </div>
    </div>
  );
}

export default CostumeDetails;
