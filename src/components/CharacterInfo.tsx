import { Costume } from "@models/types";
import Image from "next/image";
import HR from "./decorations/HR";
import Star from "./decorations/Star";
import SVG from "react-inlinesvg";
import RARITY from "@utils/rarity";
import weaponsIcons from "@utils/weaponsIcons";
import statsIcons from "@utils/statsIcons";
import Lines from "./decorations/Lines";
import getCostumeLevelsByRarity from "@utils/getCostumeLevelsByRarity";
import classNames from "classnames";
import { useState } from "react";
import Radio from "@components/form/Radio";
import WeaponThumbnail from "@components/WeaponThumbnail";
import getGaugeLevel from "@utils/getGaugeLevel";
import Skill from "@components/Skill";
import Element from "@components/Element";
import Ability from "@components/Ability";
import { BtnSecondary } from "@components/btn";
import Ascend from "@components/decorations/Ascend";
import urlSlug from "url-slug";
import Slider from "rc-slider";
import dynamic from "next/dynamic";
import Link from "next/link";
import getModelPath from "@utils/getModelPath";
const ModelWithNoSSR = dynamic(() => import("@components/Model"), {
  ssr: false,
});

const dcTypeCostumes = [
  "ch006006",
  "ch006009",
  "ch009009",
  "ch010003",
  "ch010007",
  "ch012005",
  "ch014007",
  "ch019001",
  "ch019010",
  "ch019012",
];

function CostumeDetails({ costume }: { costume: Costume }): JSX.Element {
  const [statType, setStatType] = useState("base"); // can be 'base' or 'displayed'
  const [skillLevel, setSkillLevel] = useState(14);
  const [abilityLevel, setAbilityLevel] = useState(3);
  const [isShowingModel, setIsShowingModel] = useState(false);
  const [ascendLevel, setAscendLevel] = useState(4);

  const firstAbility = Object.entries(costume.abilities[0])
    .slice(0, 4)
    .map(([, value]) => value);

  const secondAbility = Object.entries(costume.abilities[1])
    .slice(0, 4)
    .map(([, value]) => value);

  const skill = Object.entries(costume.skills[ascendLevel === 4 ? 1 : 0])
    .slice(0, 15)
    .map(([, value]) => value);

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-2 py-4 md:p-6">
        {/* Costume info */}
        <div className="flex flex-col justify-between mt-4 mx-4 xl:mt-0 order-2 xl:order-1">
          {/* Costume story */}
          <div className="flex flex-col items-center xl:items-start mb-12 xl:mb-0">
            <div className="flex items-center gap-x-2 text-xl">
              <div className="w-8">
                <Image
                  layout="responsive"
                  src={weaponsIcons[costume.costume.weaponType]}
                  alt={costume.costume.weaponType}
                />
              </div>
              <span className="uppercase px-2 text-black bg-beige">
                {costume.character.en}
              </span>
              <span className="uppercase text-beige">
                {costume.costume.name.en}
              </span>
            </div>
            <p
              className="text-beige-text whitespace-pre-wrap text-base mt-2 mb-4"
              dangerouslySetInnerHTML={{
                __html: `${costume.costume.description.en.replaceAll(
                  "\\n",
                  "<br>"
                )}`,
              }}
            ></p>
          </div>

          {/* Costume skills & abilities */}
          <div className="flex flex-col gap-y-8 mb-6">
            <div>
              <Lines
                className="mb-2"
                containerClass="justify-center"
                svgClass="w-96 xl:w-42"
              >
                <h2 className="text-2xl">Skill</h2>
              </Lines>
              <Skill
                className="flex-1"
                name={skill[skillLevel].name}
                description={skill[skillLevel].description.long}
                SkillCooltimeValue={skill[skillLevel].SkillCooltimeValue}
                AssetCategoryId={skill[skillLevel].SkillAssetCategoryId}
                AssetVariationId={skill[skillLevel].SkillAssetVariationId}
                level={skillLevel + 1}
              />
            </div>

            <div>
              <Lines
                className="mb-2"
                containerClass="justify-center"
                svgClass="w-96 xl:w-42"
              >
                <h2 className="text-2xl">Abilities</h2>
              </Lines>
              <Ability
                className="flex-1"
                key={`${costume.ids.costume}ability${firstAbility[abilityLevel].name}`}
                name={firstAbility[abilityLevel].name}
                description={firstAbility[abilityLevel].description.long}
                AssetCategoryId={firstAbility[abilityLevel].AssetCategoryId}
                AssetVariationId={firstAbility[abilityLevel].AssetVariationId}
                level={abilityLevel + 1}
              />

              <Ability
                className="flex-1"
                key={`${costume.ids.costume}ability${secondAbility[abilityLevel].name}`}
                name={secondAbility[abilityLevel].name}
                description={secondAbility[abilityLevel].description.long}
                AssetCategoryId={secondAbility[abilityLevel].AssetCategoryId}
                AssetVariationId={secondAbility[abilityLevel].AssetVariationId}
                level={abilityLevel + 1}
              />
            </div>

            {/* Controls */}
            <div>
              <div className="mt-2">
                <p className="text-beige">Skill Lv. {skillLevel + 1}</p>
                <Slider
                  value={skillLevel}
                  className="mt-2 xl:mt-0 max-w-lg"
                  min={0}
                  max={14}
                  onChange={(value) => setSkillLevel(value)}
                />
              </div>
              <div className="mt-2">
                <p className="text-beige">Abilities Lv. {abilityLevel + 1}</p>
                <Slider
                  value={abilityLevel}
                  className="mt-2 xl:mt-0 max-w-lg"
                  min={0}
                  max={3}
                  onChange={(value) => setAbilityLevel(value)}
                />
              </div>
              <div className="mt-2">
                <p className="text-beige">Ascend Lv. {ascendLevel}</p>
                <Slider
                  value={ascendLevel}
                  className="mt-2 xl:mt-0 max-w-lg"
                  min={1}
                  max={4}
                  onChange={(value) => setAscendLevel(value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Costume artwork */}
        <div
          className="relative overflow-hidden max-w-xl mx-auto order-1 xl:order-2 w-full"
          style={{ height: "700px" }}
        >
          <div className="bordered-lg bg-grey-dark h-full w-full">
            <div className="relative z-10 h-full w-full">
              {(isShowingModel && (
                <ModelWithNoSSR
                  path={getModelPath(
                    "character",
                    `${
                      dcTypeCostumes.includes(costume.ids.actor) ? "dc" : "sk"
                    }_${costume.ids.actor}`
                  )}
                />
              )) || (
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={`/character_medium/${costume.ids.actor}_full-1920-1080.png`}
                  alt={`${costume.character.en} (${costume.costume.name.en}) illustration`}
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
            {Array.from({ length: RARITY[costume.costume.rarity] }).map(
              (_, index) => (
                <div className="w-8 h-8" key={index}>
                  <Star rarity={RARITY[costume.costume.rarity]} />
                </div>
              )
            )}
          </span>

          {costume.costume.weapon && (
            <Link
              href={`/database/weapons/${urlSlug(
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
          )}

          <div className="absolute top-4 left-4 w-42 h-24 p-1 z-50">
            {/* <Rank rank="S" /> */}
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

      {costume?.costume?.stats && (
        <div className="relative mb-8">
          <h2 className="text-3xl absolute top-1 left-1/2 transform -translate-x-1/2">
            Statistics
          </h2>
          <HR className="my-8" />

          <div className="flex justify-center gap-x-6 mb-8">
            <Radio
              name="Base stats"
              value="base"
              isChecked={statType === "base"}
              setState={setStatType}
            />

            <Radio
              name="Stats with passive abilities"
              value="displayed"
              isChecked={statType === "displayed"}
              setState={setStatType}
            />
          </div>
          <div className="flex flex-col md:flex-row mt-3 gap-6 mx-4">
            <StatsOfLevel
              stats={costume.costume.stats.base[statType]}
              label={`Level ${
                getCostumeLevelsByRarity(costume.costume.rarity).base
              }`}
              description={
                statType === "displayed"
                  ? `${costume.abilities[0][3].name} is at level 1`
                  : ""
              }
            />
            <StatsOfLevel
              stats={costume.costume.stats.maxNoAscension[statType]}
              label={`Level ${
                getCostumeLevelsByRarity(costume.costume.rarity).maxNoAsc
              } (No ascension)`}
              description={
                statType === "displayed"
                  ? `${costume.abilities[0][3].name} is at level 1`
                  : ""
              }
            />
            <StatsOfLevel
              stats={costume.costume.stats.maxWithAscension[statType]}
              label={`Level ${
                getCostumeLevelsByRarity(costume.costume.rarity).maxWithAsc
              } (Max ascension)`}
              description={
                statType === "displayed"
                  ? `${costume.abilities[0][3].name} & ${costume.abilities[1][3].name} are at level 4`
                  : ""
              }
            />
          </div>

          <p className="bg-grey-dark bordered relative p-4 text-sm mt-8 max-w-xl mx-auto text-center">
            Timed or conditional passives are not included in the stats.
          </p>
        </div>
      )}

      {costume?.metadata?.sources?.length > 0 && (
        <div className="relative my-8">
          <h2 className="text-3xl absolute top-1 left-1/2 transform -translate-x-1/2">
            Costume Sources
          </h2>
          <HR className="my-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {costume.metadata.sources.map((source, index) => (
              <div
                key={`${costume.ids.costume}source${index}`}
                className="flex justify-center gap-x-4 items-center border border-beige-inactive border-opacity-50 bg-grey-dark p-4"
              >
                {source.isBookOnly && (
                  <div className="relative">
                    <Image
                      height={64}
                      width={64}
                      layout="fixed"
                      src={`/ui/material/material${costume.ids.material}_standard.png`}
                      alt={`Handbook of ${costume.costume.name.en}`}
                    />
                  </div>
                )}
                <h3 className="text-2xl text-beige-inactive">
                  {source.sourceType} {source.questType ? " > " : ""}
                  {source.banner}
                  {source.questType} {source.groupName ? " > " : ""}
                  {source.groupName} {source.questName ? " > " : ""}
                  {source.questName} {source.difficulty ? " > " : ""}
                  {source.storeName}
                  {source.difficulty}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {costume?.costume?.weapon && (
        <div className="relative mb-16">
          <h2 className="text-3xl absolute top-1 left-1/2 transform -translate-x-1/2">
            Weapon
          </h2>
          <HR className="my-8" />
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
                      src={`/ui/weapon/wp${costume.costume.weapon.ids.asset}_full.png`}
                      alt={`${costume.costume.weapon.name.en} thumbnail`}
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
                    length: RARITY[costume.costume.weapon.rarity],
                  }).map((_, index) => (
                    <div className="w-8 h-8" key={index}>
                      <Star rarity={RARITY[costume.costume.weapon.rarity]} />
                    </div>
                  ))}
                </span>

                <div className="absolute left-6 bottom-6 text-xl z-50">
                  {costume.costume.weapon.name.en}
                </div>

                <div className="absolute flex flex-col gap-y-4 top-4 left-4 p-1">
                  <div className="w-16 h-16">
                    <Element type={costume.costume.weapon.attribute} />
                  </div>
                  <div className="w-16 h-16">
                    <Image
                      src={weaponsIcons[costume.costume.weapon.type]}
                      alt={costume.costume.weapon.type}
                    />
                  </div>

                  {costume.costume.weapon.isDark && (
                    <SVG src="/icons/weapons/dark.svg" className="h-16 w-16" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-1 justify-between gap-y-6 p-2">
              {costume.costume.weapon?.stories.length > 0 && (
                <>
                  <h4 className="text-3xl bg-grey-lighter p-3 mt-8 xl:mt-0">
                    Stories
                  </h4>

                  {costume.costume.weapon.stories.map((story, index) => (
                    <p
                      className="bg-grey-dark p-4 border border-beige-inactive border-opacity-50"
                      key={`${costume.costume.weapon.ids.base}-${index}`}
                      dangerouslySetInnerHTML={{
                        __html: `${story.replaceAll("\\n", "<br>")}`,
                      }}
                    ></p>
                  ))}
                </>
              )}
            </div>
          </div>

          {costume.costume.weapon?.metadata?.weapon?.sources?.length > 0 && (
            <div className="mt-8">
              <h3 className="font-display text-2xl mb-4">Weapon Sources</h3>

              <div className="flex flex-wrap gap-4">
                {costume.costume.weapon.metadata?.weapon?.sources.map(
                  (source, index) => (
                    <div
                      key={`${costume.costume.weapon.ids.asset}source${index}`}
                      className="flex justify-center gap-x-4 items-center border border-beige-inactive border-opacity-50 bg-grey-dark p-4"
                    >
                      <h3 className="text-2xl text-beige-inactive">
                        {source.sourceType && <p>{source.sourceType}</p>}
                        {source.storeName && <p>{source.storeName}</p>}
                      </h3>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <BtnSecondary
              href={`/database/weapons/${urlSlug(
                costume.costume.weapon.name.en
              )}/${costume.costume.weapon.ids.base}`}
            >
              Learn more
            </BtnSecondary>
          </div>
        </div>
      )}
    </>
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
  stats;
  description: string;
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
          value={stats.def ?? "???"}
        />
        <SingleStat
          icon={statsIcons.agility}
          name="Agility"
          value={stats.agility ?? "???"}
        />
        <SingleStat
          icon={statsIcons.cr}
          name="Critical Rate"
          value={`${stats.cr ?? "???"}%`}
        />
        <SingleStat
          icon={statsIcons.cd}
          name="Critical Damage"
          value={`${stats.cd ?? "???"}%`}
        />
      </div>
    </div>
  );
}

export default CostumeDetails;
