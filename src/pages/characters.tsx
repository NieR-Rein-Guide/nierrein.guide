import Head from "next/head";

import Layout from "@components/Layout";
import CHARACTERS from "@models/character";
import { allCostumes, CostumeInfo, typedCharacters, typedCostumes } from "@models/character";
import CharacterInfo from "@components/CharacterInfo";
import { allCharacters, costumeIDToIconURL, characterToIconURL } from "libs/nier_icons";
import { useState } from "react";



export default function Home() {
  const characters = allCharacters()
  const mid = characters.length / 2
  const firstRow = characters.slice(0, mid)
  const secondRow = characters.slice(mid)
  const [currentCostume, setCostume] = useState(typedCostumes[0])
  return (
    <Layout>
      <Head>
        <title>NieR Re[in] Global Guide & Database</title>
      </Head>

      <div>
        {Array.from(typedCharacters.entries()).map(([character, costumes]) => (
          <div key={character} className="flex items-center gap-2">
            <img src={costumeIDToIconURL(costumes[0].id)} alt="" />
            {character}:
            {costumes.map(costume => (
              <div key={costume.id} className="flex items-center border" onClick={() => setCostume(costume)}>
                {costume.name.en}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* <div className="grid grid-cols-4">
        {typedCostumes.map(costume => (
          <div key={costume.id} className="flex items-center" onClick={()=>setCostume(costume)}>
            <img src={costumeIDToIconURL(costume.id)} alt=""/>
            {costume.character} ({costume.name.en})
          </div>
        ))}
      </div> */}

      <CharacterInfo character={currentCostume}></CharacterInfo>
      {/* <div className="relative self-center h-32">
        <div className="flex">
          {firstRow.map((char) =>
            <div className="iso-bg" >
              <img style={{
              minWidth: '74px',
              maxWidth: '74px',
              minHeight: '74px',
              maxHeight: '74px',
            }} title={char} src={characterToIconURL(char)} key={char}/>
            </div>
          )}
        </div>
        <div className="absolute flex" style={{
          left: '-40px',
          top: '40px',
        }}>
          {secondRow.map((char) =>
            <div className="iso-bg" >
              <img style={{
              minWidth: '74px',
              maxWidth: '74px',
              minHeight: '74px',
              maxHeight: '74px',
            }} title={char} src={characterToIconURL(char)} key={char}/>
            </div>
          )}
        </div>
      </div> */}

    </Layout>
  );
}
