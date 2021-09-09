import { Costume } from "@models/types";
import Image from "next/image";
import Rank from "./decorations/Rank";
import HR from "./decorations/HR";
import Star from "./decorations/Star";
import SVG from "react-inlinesvg";
import RARITY from "@utils/rarity";
import weaponsIcons from "@utils/weaponsIcons";
import statsIcons from "@utils/statsIcons";
import Lines from "./decorations/Lines";
import getAbilityIcon from "@utils/getAbilityIcon";
import getSkillIcon from "@utils/getSkillIcon";
import getCostumeLevelsByRarity from "@utils/getCostumeLevelsByRarity";
import classNames from "classnames";
import { useState } from "react";

function CostumeDetails({ costume }: { costume: Costume }): JSX.Element {
  const [statType, setStatType] = useState("base"); // can be 'base' or 'displayed'

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-2 py-4 md:p-6">
        {/* Costume info */}
        <div className="flex flex-col justify-between mt-4 mx-4 xl:mt-0 order-2 xl:order-1">
          {/* Costume story */}
          <div>
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
              <div className="flex gap-4 bg-grey-dark p-4 relative bordered">
                <div className="flex items-center">
                  <div className="h-16 w-16 relative">
                    <Image
                      layout="fixed"
                      width={64}
                      height={64}
                      alt=""
                      src={getSkillIcon(
                        costume.skills[0][0].SkillAssetCategoryId,
                        costume.skills[0][0].SkillAssetVariationId
                      )}
                    />
                  </div>
                  <div>
                    <strong className="font-display text-2xl text-beige">
                      {costume.skills[0][0].name
                        ? costume.skills[0][0].name
                        : "???"}
                    </strong>
                    <p className="text-beige-text">
                      <span>
                        {costume.skills[0][14].description.long
                          ? costume.skills[0][14].description.long
                          : "???"}
                      </span>
                      <p className="text-xs mt-2">
                        Skill Cooldown value:{" "}
                        {costume.skills[1][0].SkillCooltimeValue}
                      </p>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Lines
                className="mb-2"
                containerClass="justify-center"
                svgClass="w-96 xl:w-42"
              >
                <h2 className="text-2xl">Abilities</h2>
              </Lines>
              {costume.abilities.map((ability) => (
                <div
                  key={ability[3].NameSkillTextId}
                  className="flex gap-4 bg-grey-dark p-4 relative bordered"
                >
                  <div className="flex">
                    <div className="h-16 w-16 relative">
                      <Image
                        layout="fill"
                        alt=""
                        src={getAbilityIcon(
                          ability[3].AssetCategoryId,
                          ability[3].AssetVariationId
                        )}
                      />
                    </div>
                    <div>
                      <strong className="font-display text-2xl text-beige">
                        {ability[3].name}
                      </strong>
                      <p className="text-beige-text">
                        {ability[3].description.long}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
              <Image
                layout="fill"
                objectFit="cover"
                src={`/character_medium/${costume.ids.actor}_full-1920-1080.png`}
                alt={`${costume.character.en} (${costume.costume.name.en}) illustration`}
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
            {Array.from({ length: RARITY[costume.costume.rarity] }).map(
              (_, index) => (
                <div className="w-8 h-8" key={index}>
                  <Star rarity={RARITY[costume.costume.rarity]} />
                </div>
              )
            )}
          </span>

          <div className="absolute top-4 left-4 w-24 h-24 p-1">
            <Rank rank="S" />
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
            <label className="cursor-pointer relative">
              <span className="pl-10">Base stats</span>
              <SVG
                className="transform transition-all absolute -top-1"
                src="/decorations/checkbox.svg"
              />
              <SVG
                className={classNames(
                  "transform transition-all absolute -top-1 opacity-0 scale-75 ease-out-cubic",
                  statType === "base" && "opacity-100 scale-100"
                )}
                src="/decorations/checkbox_checked.svg"
              />
              <input
                className="sr-only"
                onChange={(e) => (e.target.value ? setStatType("base") : 0)}
                type="radio"
                checked={statType === "base"}
              />
            </label>

            <label className="cursor-pointer relative">
              <span className="pl-10">Stats with passive abilities</span>
              <SVG
                className="transform transition-all absolute -top-1"
                src="/decorations/checkbox.svg"
              />
              <SVG
                className={classNames(
                  "transform transition-all absolute -top-1 opacity-0 scale-75 ease-out-cubic",
                  statType === "displayed" && "opacity-100 scale-100"
                )}
                src="/decorations/checkbox_checked.svg"
              />
              <input
                className="sr-only"
                onChange={(e) =>
                  e.target.value ? setStatType("displayed") : 0
                }
                type="radio"
                checked={statType === "displayed"}
              />
            </label>
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
        </div>
      )}

      <div className="relative mb-8">
        <h2 className="text-3xl absolute top-1 left-1/2 transform -translate-x-1/2">
          Skill & Abilities
        </h2>
        <HR className="my-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {costume.abilities.map((abilityList, index) => (
            <div key={index}>
              {Object.entries(abilityList)
                .slice(0, 4)
                .map(([index, ability]) => (
                  <div
                    key={index}
                    className="relative bg-grey-foreground py-4 text-center mb-6 "
                  >
                    <div className="h-16 w-16 absolute left-12">
                      <Image
                        layout="fill"
                        alt={ability.name}
                        src={getAbilityIcon(
                          ability.AssetCategoryId,
                          ability.AssetVariationId
                        )}
                      />
                    </div>
                    <h3 className="text-2xl text-beige-inactive">
                      {ability.name} (lvl {Number(index) + 1})
                    </h3>
                    <p>{ability.description.long}</p>
                  </div>
                ))}
            </div>
          ))}

          {costume.skills.length > 0 &&
            Object.entries(costume.skills[0])
              .slice(0, 15)
              .filter((value) => Number(value[0]) % 2 === 0)
              .map(([index, skill]) => (
                <div
                  key={index}
                  className="relative bg-grey-foreground py-4 text-center mb-6 border border-beige-active px-4"
                >
                  <div className="h-16 w-16 relative mx-auto">
                    <Image
                      layout="fill"
                      alt=""
                      src={getSkillIcon(
                        costume.skills[0][0].SkillAssetCategoryId,
                        costume.skills[0][0].SkillAssetVariationId
                      )}
                    />
                  </div>
                  <h3 className="text-2xl text-beige-inactive">
                    {skill.name} (lvl {Number(index) + 1})
                  </h3>
                  <p>{skill.description.long}</p>
                  <p className="mt-2">
                    Skill Cooldown value:{" "}
                    {index === "14"
                      ? costume.skills[1][0].SkillCooltimeValue
                      : costume.skills[0][0].SkillCooltimeValue}
                  </p>
                </div>
              ))}
        </div>
      </div>

      {costume?.metadata?.weapon && (
        <div className="relative mb-8">
          <h2 className="text-3xl absolute top-1 left-1/2 transform -translate-x-1/2">
            Weapon (WIP)
          </h2>
          <HR className="my-8" />
          <div className="flex justify-center">
            <h3 className="font-display text-2xl">{costume.metadata.weapon}</h3>
          </div>
        </div>
      )}

      {costume?.metadata?.sources?.length > 0 && (
        <div className="relative my-8">
          <h2 className="text-3xl absolute top-1 left-1/2 transform -translate-x-1/2">
            Sources
          </h2>
          <HR className="my-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {costume.metadata.sources.map((source) => (
              <div
                key={source.sourceType}
                className="flex-1 border border-beige-inactive bg-grey-lighter"
              >
                <div className="bg-grey-foreground py-4 text-center">
                  <h3 className="text-2xl text-beige-inactive">
                    {source.sourceType} {source.questType ? " > " : ""}
                    {source.questType} {source.groupName ? " > " : ""}
                    {source.groupName} {source.questName ? " > " : ""}
                    {source.questName} {source.difficulty ? " > " : ""}
                    {source.difficulty}
                  </h3>
                </div>
              </div>
            ))}
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
