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
import { character, PrismaClient } from "@prisma/client";

interface CharactersPageProps {
  characters: character[];
}

export default function CharactersPage({
  characters,
}: CharactersPageProps): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Characters"
        description="All the costumes of NieR Re[in]carnation"
        cover="https://nierrein.guide/cover-characters.jpg"
      />

      <CharacterRows characters={characters} currentCharacter={null} />

      {/*
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

      <CostumeDetails costume={currentCostume}></CostumeDetails> */}
    </Layout>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const characters = await prisma.character.findMany({
    orderBy: {
      character_id: "asc",
    },
  });

  prisma.$disconnect();

  return {
    props: {
      characters: JSON.parse(JSON.stringify(characters)),
    },
  };
}
