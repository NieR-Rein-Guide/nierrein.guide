import { CostumeInfo, Stats } from "@models/character";
import Image from "next/image";
import Rank from "./decorations/Rank";
import HR from "./decorations/HR";
import Star from "./decorations/Star";
import SVG from "react-inlinesvg";

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
  stats: Stats;
}): JSX.Element {
  return (
    <div className="flex-1">
      <span className="mb-4 text-lg">{label}</span>
      <div className="flex flex-col">
        <SingleStat name="Force" value={stats.force ?? "???"} />
        <SingleStat name="HP" value={stats.hp ?? "???"} />
        <SingleStat name="Attack" value={stats.attack ?? "???"} />
        <SingleStat name="Defense" value={stats.defence ?? "???"} />
        <SingleStat name="Agility" value={stats.agility ?? "???"} />
        <SingleStat name="Crit" value={stats.criticalRate ?? "???" + " %"} />
        <SingleStat name="Cdmg" value={stats.criticalDamage ?? "???" + " %"} />
      </div>
    </div>
  );
}

function CostumeDetails({ costume }: { costume: CostumeInfo }): JSX.Element {
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
              src={costume.mediumURL}
              alt={`${costume.character} (${costume.name.en}) illustration`}
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

          {/* <div
            className="absolute -left-2/3 -top-1/2 filter brightness-30 z-0"
            style={{
              height: "2100px",
              width: "1500px",
            }}
          >
            <Image
              className="pointer-events-none"
              layout="responsive"
              objectFit="cover"
              height={2100}
              width={1500}
              src={costume.illustrationURL}
              alt={`${costume.character} (${costume.name.en}) illustration`}
            />
          </div> */}
        </div>

        <span className="flex absolute bottom-6 right-6">
          {Array.from({ length: costume.stars }).map((_, index) => (
            <div className="w-8 h-8" key={index}>
              <Star rarity={costume.stars} />
            </div>
          ))}
        </span>

        <div className="absolute top-4 left-4 w-24 h-24 p-1">
          <Rank rank="S" />
        </div>
      </div>

      <div className="">
        <div className="mx-4">
          <div className="text-xl">
            <span className="uppercase px-1 text-black bg-beige">
              {costume.character}
            </span>
            <span className="pl-2 uppercase text-beige">{costume.name.en}</span>
          </div>
          <p
            className="whitespace-pre-wrap text-base mt-2"
            style={{
              color: "lightgrey",
            }}
            dangerouslySetInnerHTML={{ __html: costume.description.en }}
          ></p>
          <div className="mt-4 mb-2">
            <strong>Character skill:</strong>
            <p>{costume.skills}</p>
          </div>
        </div>
        <HR />
        <div className="flex flex-col md:flex-row mt-3 gap-6 mx-4">
          <StatsOfLevel stats={costume.statsLvl1} label="LVL 01" />
          <StatsOfLevel stats={costume.statsMax} label="LVL MAX (no asc)" />
          <StatsOfLevel stats={costume.statsMaxAsc} label="LVL MAX (w/ asc)" />
        </div>
      </div>
    </div>
  );
}

export default CostumeDetails;
