/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import CostumeDetails from "@components/CharacterInfo";
import { useEffect, useState } from "react";
import React from "react";
import CharacterCostumes from "@components/characters/CharacterCostumes";
import CharacterRows from "@components/characters/CharacterRows";
import CostumeSelect from "@components/characters/CostumeSelect";
import {
  character,
  costume,
  PrismaClient,
  character_rank_bonus,
} from "@prisma/client";

interface CharactersPageProps {
  currentCharacter: character;
  characters: character[];
  costumes: costume[];
  abilities;
  skills;
  stats;
  rankBonus: character_rank_bonus[];
}

export default function CharactersPage({
  currentCharacter,
  characters,
  costumes,
  abilities,
  skills,
  stats,
  rankBonus,
}: CharactersPageProps): JSX.Element {
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

      {costumes.length > 0 && (
        <CostumeDetails
          character={currentCharacter}
          costume={currentCostume}
          abilities={abilities[currentCostume.costume_id]}
          skill={skills[currentCostume.costume_id]}
          stats={stats[currentCostume.costume_id]}
          rankBonus={rankBonus}
        />
      )}
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const prisma = new PrismaClient();
  const [characters, selectedCostumes, rankBonus] = await Promise.all([
    prisma.character.findMany({
      orderBy: {
        character_id: "asc",
      },
    }),
    prisma.costume.findMany({
      orderBy: {
        costume_id: "asc",
      },
      where: { character_id: Number(id) },
      include: {
        emblem: true,
      },
    }),
    prisma.character_rank_bonus.findMany({
      orderBy: {
        rank_bonus_id: "asc",
      },
      where: {
        character_id: Number(id),
      },
    }),
  ]);

  const stats = {};
  const abilities = {};
  const skills = {};

  for (const costume of selectedCostumes) {
    const allAbilities = await prisma.costume_ability_link.findMany({
      where: {
        costume_id: costume.costume_id,
      },
      include: {
        costume_ability: true,
      },
    });

    abilities[costume.costume_id] = Object.values(
      groupByKey(allAbilities, "ability_id")
    );

    const allSkills = await prisma.costume_skill_link.findMany({
      where: {
        costume_id: costume.costume_id,
      },
      include: {
        costume_skill: true,
      },
    });

    skills[costume.costume_id] = allSkills;

    const allStats = await prisma.costume_stat.findMany({
      where: {
        costume_id: costume.costume_id,
      },
    });

    stats[costume.costume_id] = allStats.sort((a, b) => a.level - b.level);
  }

  prisma.$disconnect();

  const currentCharacter = characters.find((character) => {
    return character.character_id === Number(id);
  });

  return {
    props: {
      currentCharacter,
      characters: JSON.parse(JSON.stringify(characters)),
      costumes: JSON.parse(JSON.stringify(selectedCostumes)),
      abilities: JSON.parse(JSON.stringify(abilities)),
      skills: JSON.parse(JSON.stringify(skills)),
      stats: JSON.parse(JSON.stringify(stats)),
      rankBonus: JSON.parse(JSON.stringify(rankBonus)),
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

function groupByKey(list, key) {
  return list.reduce(
    (hash, obj) => ({
      ...hash,
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    }),
    {}
  );
}
