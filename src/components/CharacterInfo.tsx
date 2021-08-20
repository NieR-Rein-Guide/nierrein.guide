import Corners from "./decorations/Corners";

function SingleStat({ name, value }) {
  return (
    <div className="flex">
      <div className="w-1/2 uppercase">{name}</div>
      <div className="w-1/2 font-light">{value}</div>
    </div>
  );
}

function StatsOfLevel({ label, stats }) {
  return (
    <div className="flex-1">
      <span className="mb-4 text-lg">{label}</span>
      <div className="flex flex-col">
        <SingleStat name="Force" value={stats.force} />
        <SingleStat name="HP" value={stats.hp} />
        <SingleStat name="Attack" value={stats.attack} />
        <SingleStat name="Defense" value={stats.defense} />
        <SingleStat name="Agility" value={stats.agility} />
        <SingleStat name="Crit" value={stats.crit + " %"} />
        <SingleStat name="Cdmg" value={stats.cdmg + " %"} />
      </div>
    </div>
  );
}

function CharacterInfo({ character }: { character: any }): JSX.Element {
  return (
    <div
      className="flex flex-col md:flex-row gap-8 md:p-6 background-repeat"
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      <div className="flex-1 h-auto relative bg-center bg-cover bg-white bg-opacity-25 border-2  flex">
        <img
          className="h-auto my-auto"
          src={character.illustration}
          alt={`${character.name} (${character.costumeName}) illustration`}
        />

        <span className="flex absolute top-2 left-2">
          {Array.from({ length: character.stars }).map((_, index) => (
            <img
              key={index}
              style={{
                marginRight: "-8px",
              }}
              className="w-8 h-8"
              src="/ui/actor/ma001001_01_actor_icon.png"
              alt="Mama icon used as star"
            />
          ))}
        </span>

        <Corners />

        <div className="w-12 h-12 absolute bottom-4 right-4 border bg-white bg-opacity-25 flex">
          <span className="self-center justify-self-center mx-auto">
            {character.tier}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <span className="uppercase px-1 text-black bg-beige">
          {character.name}
        </span>
        <span className="pl-2 uppercase text-beige">
          {character.costumeName}
        </span>
        <p
          className="whitespace-pre-wrap"
          style={{
            color: "lightgrey",
          }}
        >
          {character.story}
        </p>
        <div className="mt-4">
          <strong>Character skill:</strong>
          <p>{character.skillName}</p>
        </div>
        <hr />
        <div className="flex flex-col md:flex-row mt-3 gap-6">
          <StatsOfLevel stats={character.lvlOneStats} label="LVL 01" />
          <StatsOfLevel
            stats={character.lvlMaxStats}
            label="LVL MAX (no asc)"
          />
          <StatsOfLevel
            stats={character.lvlAscStats}
            label="LVL MAX (w/ asc)"
          />
        </div>
      </div>
    </div>
  );
}

export default CharacterInfo;
