/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import CostumeDetails from "@components/CharacterInfo";
import { getAllCostumes } from "@models/character";
import { useEffect, useState } from "react";
import React from "react";
import CharacterCostumes from "@components/characters/CharacterCostumes";
import CharacterRows from "@components/characters/CharacterRows";
import CostumeSelect from "@components/characters/CostumeSelect";
import { useRouter } from "next/router";
import slugify from "slugify";
import { Costume } from "@models/types";

interface CharactersPageProps {
  costumes: Costume[];
}

export default function CharactersPage({
  costumes,
}: CharactersPageProps): JSX.Element {
  if (!costumes) {
    return null;
  }

  const [currentCostume, setCurrentCostume] = useState(costumes[0]);

  const setCostume = (costume: Costume) => {
    setCurrentCostume(costume);
    history.replaceState(
      null,
      "",
      `/characters/${slugify(costume.character.en)}/${slugify(
        costume.costume.name.en
      )}`
    );
  };

  console.log(costumes);

  const characters = costumes.reduce((acc, costume) => {
    if (acc.has(costume.character.en)) {
      return acc;
    }

    acc.set(costume.character.en, costume);
    return acc;
  }, new Map() as Map<string, Costume>);

  console.log(characters);

  return (
    <Layout>
      <Meta
        title="Characters"
        description="All the costumes of NieR Re[in]carnation"
        cover="https://nierrein.guide/cover-characters.jpg"
      />

      <CharacterRows
        costumes={characters}
        setCostume={setCostume}
        currentCostume={currentCostume}
      />

      <div className="hidden md:inline">
        <CharacterCostumes
          costumes={costumes}
          setCostume={setCostume}
          currentCostume={currentCostume}
        />
      </div>

      <div className="inline md:hidden">
        <CostumeSelect
          setCostume={setCostume}
          currentCostume={currentCostume}
          costumes={costumes}
        />
      </div>

      <CostumeDetails costume={currentCostume}></CostumeDetails>
    </Layout>
  );
}

export async function getServerSideProps() {
  const costumes = await getAllCostumes();

  return {
    props: {
      costumes,
    },
  };
}
