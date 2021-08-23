import Corners from "./decorations/Corners";

import { CostumeInfo, Stats } from "@models/character";
import Image from "next/image";
import MamaStar from "./decorations/MamaStar";
import Rank from "./decorations/Rank";
import HR from "./decorations/HR";

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
    <div
      className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-5 gap-4 p-2 py-4 md:p-6 background-repeat"
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      <div className="2xl:col-span-2 relative bg-center bg-cover bg-white bg-opacity-25 border-2 flex">
        <Image
          width="2048"
          height="2048"
          objectFit="contain"
          src={costume.illustrationURL}
          alt={`${costume.character} (${costume.name.en}) illustration`}
        />

        <span className="flex absolute top-2 left-2">
          {Array.from({ length: costume.stars }).map((_, index) => (
            <div className="w-8 h-8" key={index}>
              <MamaStar />
            </div>
          ))}
        </span>

        <Corners />

        <div className="absolute bottom-4 right-4 border bg-beige-darker w-12 h-12 p-1">
          <Rank rank="S" />
        </div>
      </div>

      <div className="2xl:col-span-3">
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
