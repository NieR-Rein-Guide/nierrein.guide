import Head from "next/head";

import Layout from "@components/Layout";
import { CostumeInfo, typedCharacters } from "@models/character";
import CostumeDetails from "@components/CharacterInfo";
import { Dispatch, SetStateAction, useState } from "react";


function CharacterRows({
  currentCostume,
  setCostume,
}: {
  currentCostume: CostumeInfo,
  setCostume: Dispatch<SetStateAction<CostumeInfo>>,
}) {
  const characters = Array.from(typedCharacters.values()).map(chars => chars[0])

  const firstRow: CostumeInfo[] = []
  const secondRow: CostumeInfo[] = []
  characters.forEach((costume, index) => {
    if (index%2 == 1) {
      firstRow.push(costume)
    } else {
      secondRow.push(costume)
    }
  })
  
  return (
    <div className="relative self-center h-32 mt-20 mb-20">
      <div className="flex">
        {firstRow.map((costume) =>
          <div key={costume.id} className="relative" onClick={() => {
            setCostume(costume)
          }}>
            <div className={`absolute text-sm bottom-20 right-0 flex justify-center text-white ${costume.character == currentCostume.character ? '' : 'text-opacity-60'}`} style={{ width: '56px' }}>
              {costume.character}
            </div>
            <div className={`iso-bg ${costume.character == currentCostume.character ? 'active' : ''}`}>
              <img style={{
                minWidth: '74px',
                maxWidth: '74px',
                minHeight: '74px',
                maxHeight: '74px',
              }} title={costume.character} src={costume.iconURL} key={costume.character} />
            </div>
          </div>
        )}
      </div>
      <div className="absolute flex" style={{
        left: '-40px',
        top: '42px',
      }}>
        {secondRow.map((costume) =>
          <div key={costume.id} className="relative" onClick={() => {
            setCostume(costume)
          }}>
            <div className={`absolute text-sm top-20 right-0 flex justify-center text-white ${costume.character == currentCostume.character ? '' : 'text-opacity-60'}`} style={{ width: '56px' }}>
              {costume.character}
            </div>
            <div className={`iso-bg ${costume.character == currentCostume.character ? 'active' : ''}`} >
              <img style={{
                minWidth: '74px',
                maxWidth: '74px',
                minHeight: '74px',
                maxHeight: '74px',
              }} title={costume.character} src={costume.iconURL} key={costume.character} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function CharacterCostumes({
  currentCostume,
  setCostume,
}: {
  currentCostume: CostumeInfo,
  setCostume: Dispatch<SetStateAction<CostumeInfo>>,
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 my-2">
      {typedCharacters.get(currentCostume.character).map(costume => (
        <div key={costume.id}
          className={`flex items-center border-beige border-2 p-2 ${currentCostume.id == costume.id ? '' : 'border-opacity-30'}`}
          onClick={() => setCostume(costume)}>
          {costume.name.en}
        </div>
      ))}
    </div>
  )
}

export default function CharactersPage() {


  const [currentCostume, setCostume] = useState(
    typedCharacters.values().next().value[0] as CostumeInfo
  )

  return (
    <Layout>
      <Head>
        <title>Characters - NieR Re[in] Global Guide & Database</title>
      </Head>

      <CharacterRows {...{ setCostume, currentCostume }} />
      <CharacterCostumes {...{ setCostume, currentCostume }} />

      <CostumeDetails costume={currentCostume}></CostumeDetails>
    </Layout>
  );
}
