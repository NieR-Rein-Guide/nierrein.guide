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
import Checkbox from "@components/form/Checkbox";
import { useStore } from "@libs/user-settings";

const getBaseCostume = (costumes: Costume[]): Costume => {
  const query = useRouter().query;

  if (!query.all) {
    return costumes[0];
  }
  const [characterName, costumeName] = query.all;

  const costume = costumes.find(
    (costume) =>
      slugify(costume.costume.name.en, { lower: true }) === costumeName
  );

  if (costume) {
    return costume;
  }

  if (characterName) {
    const character = costumes.find(
      (costume) =>
        slugify(costume.character.en, { lower: true }) === characterName
    );

    if (character) {
      return character;
    }
  }
  return costumes[0];
};

interface CharactersPageProps {
  costumes: Costume[];
}

export default function CharactersPage({
  costumes: baseCostumes,
}: CharactersPageProps): JSX.Element {
  if (!baseCostumes) {
    return null;
  }
  const userSettings = useStore((state) => state);
  const [filteredCostumes, setFilteredCostumes] = useState(baseCostumes);
  const [currentCostume, setCurrentCostume] = useState(
    getBaseCostume(filteredCostumes)
  );
  const [querySearch, setQuerySearch] = useState("");

  // all filtering here (search, filters ...)
  useEffect(() => {
    let newCostumes = baseCostumes.filter((c) => {
      // TODO: use a good search algorithm
      if (c.costume.name.en.toLowerCase().includes(querySearch.toLowerCase())) {
        return true;
      }
      if (c.character.en.toLowerCase().includes(querySearch.toLowerCase())) {
        return true;
      }
      return false;
    });
    if (!userSettings.spoilers) {
      newCostumes = newCostumes.filter((c) => c.metadata.inLibrary);
    }
    setFilteredCostumes(newCostumes);
  }, [querySearch, userSettings.spoilers, baseCostumes]);

  const setCostume = (costume: Costume) => {
    setCurrentCostume(costume);
    history.replaceState(
      null,
      "",
      `/characters/${slugify(costume.character.en, { lower: true })}/${slugify(
        costume.costume.name.en,
        { lower: true }
      )}`
    );
  };

  const characters = filteredCostumes.reduce((acc, costume) => {
    if (acc.has(costume.character.en)) {
      return acc;
    }

    acc.set(costume.character.en, costume);
    return acc;
  }, new Map() as Map<string, Costume>);

  return (
    <Layout>
      <Meta
        title="Characters"
        description="All the costumes of NieR Re[in]carnation"
        cover="https://nierrein.guide/cover-characters.jpg"
      />

      <span className="w-48">
        <Checkbox
          isChecked={userSettings.spoilers}
          setState={(ev) => {
            userSettings.toggleSpoilers(ev.target.checked);
          }}
        >
          <span>Show spoilers</span>
        </Checkbox>
      </span>
      <input
        placeholder="Search a character or costume"
        type="text"
        value={querySearch}
        onChange={(ev) => {
          setQuerySearch(ev.target.value);
        }}
      />

      <CharacterRows
        costumes={characters}
        setCostume={setCostume}
        currentCostume={currentCostume}
      />

      <div className="hidden md:inline">
        <CharacterCostumes
          costumes={filteredCostumes}
          setCostume={setCostume}
          currentCostume={currentCostume}
        />
      </div>

      <div className="inline md:hidden">
        <CostumeSelect
          setCostume={setCostume}
          currentCostume={currentCostume}
          costumes={filteredCostumes}
        />
      </div>

      <CostumeDetails costume={currentCostume}></CostumeDetails>
    </Layout>
  );
}

export async function getServerSideProps() {
  const costumes = await getAllCostumes({
    allStats: false,
  });

  return {
    props: {
      costumes,
    },
  };
}
