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
import { character, costume, PrismaClient } from "@prisma/client";

interface CharactersPageProps {
  currentCharacter: character;
  characters: character[];
  costumes: costume[];
}

export default function CharactersPage({
  currentCharacter,
  characters,
  costumes,
}: CharactersPageProps): JSX.Element {
  const userSettings = useStore((state) => state);
  const [currentCostume, setCurrentCostume] = useState<costume | null>(
    costumes[0]
  );

  useEffect(() => {
    setCurrentCostume(costumes[0]);
  }, [currentCharacter, costumes]);

  return (
    <Layout>
      <Meta
        title="Characters"
        description="All the costumes of NieR Re[in]carnation"
        cover="https://nierrein.guide/cover-characters.jpg"
      />

      <CharacterRows
        characters={characters}
        currentCharacter={currentCharacter}
      />

      <div className="hidden md:inline">
        <CharacterCostumes
          currentCharacter={currentCharacter}
          costumes={costumes}
          setCostume={setCurrentCostume}
          currentCostume={currentCostume}
        />
      </div>

      <div className="inline md:hidden">
        <CostumeSelect characters={characters} />
      </div>

      <CostumeDetails costume={currentCostume} />
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const prisma = new PrismaClient();
  const [characters, selectedCostumes] = await Promise.all([
    prisma.character.findMany(),
    prisma.costume.findMany({
      where: { character_id: Number(id) },
    }),
  ]);

  prisma.$disconnect();

  const currentCharacter = characters.find((character) => {
    return character.character_id === Number(id);
  });

  return {
    props: {
      currentCharacter,
      characters: JSON.parse(JSON.stringify(characters)),
      costumes: JSON.parse(JSON.stringify(selectedCostumes)),
    },
  };
}

export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const characters = await prisma.character.findMany({
    select: {
      character_id: true,
    },
  });

  prisma.$disconnect();

  const paths = characters.map((character) => ({
    params: {
      id: `${character.character_id}`,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
