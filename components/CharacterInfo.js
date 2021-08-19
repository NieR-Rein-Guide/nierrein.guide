function SingleStat(props) {
  return (
    <div className="flex">
      <div className="w-1/2 uppercase">{props.name}</div>
      <div className="w-1/2 font-light">{props.value}</div>
    </div>
  )
}

function CharacterInfo(props) {
  const character = props.character;
  return (
    <div className="flex p-6 background-repeat"
      style={{
        backgroundImage: "url('https://cdn.discordapp.com/attachments/877530614138560603/877587502142201926/unknown.png')",
        }}>
      <div>
        <img 
        className="flex-none w-auto p-2 px-12 border-2 border-white border-opacity-50 bg-white bg-opacity-20"

        src={character.illustration} alt="NieR Re[in]carnation Launched !" />
      </div>
      <div className="flex-1 mx-2 px-4">
        <span style={{
          background: "lightgrey",
          color: "black",
          padding: "0 2px",
          textTransform: "uppercase",
        }}>
          {character.name}
        </span>
        <span className="pl-2 uppercase text-gray-300">
          {character.costumeName}
        </span>
        <p className="whitespace-pre-wrap"
        style={{
          color: "lightgrey",
        }}
        >{character.story}</p>
        <div className="mt-4">
          <strong>Character skill:</strong>
          <p>{character.skillName}</p>
        </div>
        <hr/>
        <div class="flex mt-3">
          <div className="flex-1">
            <h3 className="mb-4">LVL 01</h3>
            <div className="flex flex-col">
              <SingleStat name="Force" value={character.lvl1stats.force}/>
              <SingleStat name="HP" value={character.lvl1stats.hp}/>
              <SingleStat name="Attack" value={character.lvl1stats.attack}/>
              <SingleStat name="Defense" value={character.lvl1stats.defense}/>
              <SingleStat name="Agility" value={character.lvl1stats.agility}/>
              <SingleStat name="Crit" value={character.lvl1stats.crit+" %"}/>
              <SingleStat name="Cdmg" value={character.lvl1stats.cdmg+" %"}/>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="mb-4">LVL 70</h3>
            <div className="flex flex-col">
            <SingleStat name="Force" value={character.lvl60stats.force}/>
              <SingleStat name="HP" value={character.lvl60stats.hp}/>
              <SingleStat name="Attack" value={character.lvl60stats.attack}/>
              <SingleStat name="Defense" value={character.lvl60stats.defense}/>
              <SingleStat name="Agility" value={character.lvl60stats.agility}/>
              <SingleStat name="Crit" value={character.lvl60stats.crit+" %"}/>
              <SingleStat name="Cdmg" value={character.lvl60stats.cdmg+" %"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterInfo;
