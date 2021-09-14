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

interface CharactersPageProps {
  costumes: Costume[];
}

export default function CharactersPage({
  costumes,
}: CharactersPageProps): JSX.Element {
  if (!costumes) {
    return null;
  }
  const userSettings = useStore(state => state);
  if (!userSettings.spoilers) {
    costumes = costumes.filter(c=>c.metadata.inLibrary)
  }
  const query = useRouter().query;
  const [currentCostume, setCurrentCostume] = useState(costumes[0]);

  useEffect(() => {
    if (query.all) {
      const [characterName, costumeName] = query.all;

      const costume = costumes.find(
        (costume) =>
          slugify(costume.costume.name.en, { lower: true }) === costumeName
      );

      if (costume) {
        setCurrentCostume(costume);
      } else {
        if (characterName) {
          const character = costumes.find(
            (costume) =>
              slugify(costume.character.en, { lower: true }) === characterName
          );

          if (character) {
            setCurrentCostume(character);
          }
        } else {
          setCurrentCostume(costumes[0]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const characters = costumes.reduce((acc, costume) => {
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
        <Checkbox isChecked={userSettings.spoilers} setState={(ev) => {
          userSettings.toggleSpoilers(ev.target.checked)
        }}>
          <span>
            Show spoilers
          </span>
        </Checkbox>
      </span>

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
  const costumes = await getAllCostumes({
    allStats: false,
  });

  return {
    props: {
      costumes,
    },
  };
}
