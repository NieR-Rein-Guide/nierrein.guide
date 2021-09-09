import { Costume, CostumeStats } from "@models/types";
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

function CostumeDetails({ costume }: { costume: Costume }): JSX.Element {
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
                <div className="flex">
                  <div className="h-16 w-16 relative">
                    <Image
                      layout="fill"
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
                      {costume.skills[0][14].description.long
                        ? costume.skills[0][14].description.long
                        : "???"}
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
      {costume?.metadata?.weapon && (
        <div className="relative mb-8">
          <h2 className="text-3xl absolute top-1 left-1/2 transform -translate-x-1/2">
            Weapon
          </h2>
          <HR className="my-8" />
          <div className="flex justify-center">
            <h3 className="font-display text-2xl">{costume.metadata.weapon}</h3>
          </div>
        </div>
      )}

      {costume?.metadata?.stats && (
        <div className="relative mb-8">
          <h2 className="text-3xl absolute top-1 left-1/2 transform -translate-x-1/2">
            Statistics
          </h2>
          <HR className="my-8" />
          <div className="flex flex-col md:flex-row mt-3 gap-6 mx-4">
            <StatsOfLevel
              stats={costume.metadata.stats.min}
              label={`Level ${
                getCostumeLevelsByRarity(costume.costume.rarity).base
              }`}
            />
            <StatsOfLevel
              stats={costume.metadata.stats.maxNoAscension}
              label={`Level ${
                getCostumeLevelsByRarity(costume.costume.rarity).maxNoAsc
              }`}
            />
            <StatsOfLevel
              stats={costume.metadata.stats.absoluteMax}
              label={`Level ${
                getCostumeLevelsByRarity(costume.costume.rarity).maxWithAsc
              } (Absolute max)`}
            />
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
      <div className="font-light">{value}</div>
    </div>
  );
}

function StatsOfLevel({
  label,
  stats,
}: {
  label: string;
  stats: CostumeStats;
}): JSX.Element {
  return (
    <div className="flex-1 border border-beige-inactive bg-grey-lighter">
      <div className="bg-grey-foreground py-4 text-center mb-2">
        <h3 className="text-2xl text-beige-inactive">{label}</h3>
      </div>

      <div className="flex flex-col">
        <SingleStat
          icon={statsIcons.hp}
          name="HP"
          value={stats.hp.displayed ?? "???"}
        />
        <SingleStat
          icon={statsIcons.atk}
          name="Attack"
          value={stats.atk.displayed ?? "???"}
        />
        <SingleStat
          icon={statsIcons.def}
          name="Defense"
          value={stats.def.displayed ?? "???"}
        />
        <SingleStat
          icon={statsIcons.agility}
          name="Agility"
          value={stats.agility.displayed ?? "???"}
        />
        <SingleStat
          icon={statsIcons.cr}
          name="Critical Rate"
          value={`${stats.critRate.displayed ?? "???"}%`}
        />
        <SingleStat
          icon={statsIcons.cd}
          name="Critical Damage"
          value={`${stats.critDamage.displayed ?? "???"}%`}
        />
      </div>
    </div>
  );
}

export default CostumeDetails;
