import { Costume, CostumeStats } from "@models/types";
import Image from "next/image";
import Rank from "./decorations/Rank";
import HR from "./decorations/HR";
import Star from "./decorations/Star";
import SVG from "react-inlinesvg";
import RARITY from "@utils/rarity";

function SingleStat({ name, value }): JSX.Element {
  return (
    <div className="flex">
      <div className="w-1/2 uppercase">{name}</div>
      <div className="w-1/2 font-light">{value}</div>
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
    <div className="flex-1">
      <span className="mb-4 text-lg">{label}</span>
      <div className="flex flex-col">
        <SingleStat name="Attack" value={stats.atk.displayed ?? "???"} />
        <SingleStat name="Agility" value={stats.agility.displayed ?? "???"} />
        <SingleStat
          name="Crit"
          value={stats.critDamage.displayed ?? "???" + " %"}
        />
        <SingleStat
          name="Cdmg"
          value={stats.critDamage.displayed ?? "???" + " %"}
        />
        <SingleStat name="HP" value={stats.hp.displayed ?? "???"} />
        <SingleStat name="Defense" value={stats.def.displayed ?? "???"} />
      </div>
    </div>
  );
}

function CostumeDetails({ costume }: { costume: Costume }): JSX.Element {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-2 py-4 md:p-6">
      <div
        className="relative overflow-hidden max-w-xl mx-auto"
        style={{ height: "700px", width: "100%" }}
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

      <div className="mt-8 xl:mt-0">
        <div className="mx-4">
          <div className="text-xl">
            <span className="uppercase px-1 text-black bg-beige">
              {costume.character.en}
            </span>
            <span className="pl-2 uppercase text-beige">
              {costume.costume.name.en}
            </span>
          </div>
          <p
            className="whitespace-pre-wrap text-base mt-2 mb-4"
            style={{
              color: "lightgrey",
            }}
            dangerouslySetInnerHTML={{
              __html: `${costume.costume.description.en.replaceAll(
                "\\n",
                "<br>"
              )}`,
            }}
          ></p>

          {/* Costume skills & abilities */}
          <div className="flex flex-col gap-y-2 mb-6">
            <div className="bg-grey-dark p-4 relative bordered">
              <span className="text-sm absolute right-4 top-4">Skill</span>
              <strong className="font-display text-2xl text-beige">
                {costume.skills[0][0].name ? costume.skills[0][0].name : "???"}
              </strong>
              <p className="text-beige-text">
                {costume.skills[0][14].description.long
                  ? costume.skills[0][14].description.long
                  : "???"}
              </p>
            </div>
            {costume.abilities.map((ability) => (
              <div
                key={ability[3].NameSkillTextId}
                className="bg-grey-dark p-4 relative bordered"
              >
                <span className="text-sm absolute right-4 top-4">Ability</span>
                <strong className="font-display text-2xl text-beige">
                  {ability[3].name}
                </strong>
                <p className="text-beige-text">{ability[3].description.long}</p>
              </div>
            ))}
          </div>
        </div>
        <HR />
        {costume?.metadata?.stats && (
          <div className="flex flex-col md:flex-row mt-3 gap-6 mx-4">
            <StatsOfLevel stats={costume.metadata.stats.min} label="LVL 01" />
            <StatsOfLevel
              stats={costume.metadata.stats.maxNoAscension}
              label="LVL MAX (no asc)"
            />
            <StatsOfLevel
              stats={costume.metadata.stats.absoluteMax}
              label="LVL MAX (w/ asc)"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CostumeDetails;
