import Head from "next/head";

import Layout from "@components/Layout";
import CostumeDetails from "@components/CharacterInfo";
import { CostumeInfo, typedCharacters } from "@models/character";
import { useState } from "react";
import React from "react";
import CharacterCostumes from "@components/characters/CharacterCostumes";
import CharacterRows from "@components/characters/CharacterRows";
import CostumeSelect from "@components/characters/CostumeSelect";

export default function CharactersPage(): JSX.Element {
  const [currentCostume, setCostume] = useState(
    typedCharacters.values().next().value[0] as CostumeInfo
  );

  return (
    <Layout>
      <Head>
        <title>Characters - NieR Re[in] Global Guide & Database</title>
      </Head>

      <CharacterRows {...{ setCostume, currentCostume }} />
      <span className="hidden md:inline">
        <CharacterCostumes {...{ setCostume, currentCostume }} />
      </span>
      <span className="inline md:hidden">
        <CostumeSelect {...{ setCostume, currentCostume }} />
      </span>

      <CostumeDetails costume={currentCostume}></CostumeDetails>
    </Layout>
  );
}
