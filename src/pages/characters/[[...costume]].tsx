/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  character,
  costume,
  PrismaClient,
  character_rank_bonus,
} from "@prisma/client";
import slug from "slugg";
import Costume from "../../components/pages/costume";
import Index from "../../components/pages/costumes";

interface CharactersPageProps {
  isIndex: boolean;
  currentCharacter: character;
  selectedCostume: costume;
  characters;
  costumes: costume[];
  abilities;
  skills;
  stats;
  rankBonus: character_rank_bonus[];
}

export default function CharactersPage({
  isIndex,
  currentCharacter,
  selectedCostume,
  characters,
  costumes,
  abilities,
  skills,
  stats,
  rankBonus,
}: CharactersPageProps): JSX.Element {
  if (!isIndex) {
    return (
      <Costume
        currentCharacter={currentCharacter}
        selectedCostume={selectedCostume}
        characters={characters}
        costumes={costumes}
        abilities={abilities}
        skills={skills}
        stats={stats}
        rankBonus={rankBonus}
      />
    );
  }

  return <Index characters={characters} />;
}

export async function getStaticProps(context) {
  const prisma = new PrismaClient();

  // No route parameters, show index page
  if (Object.entries(context.params).length === 0) {
    const characters = await prisma.character.findMany({
      orderBy: {
        character_id: "asc",
      },
      include: {
        costume: {
          orderBy: {
            costume_id: "asc",
          },
          include: {
            costume_ability_link: {
              where: {
                ability_level: 4,
              },
              orderBy: {
                ability_slot: "asc",
              },
              include: {
                costume_ability: true,
              },
            },
            costume_skill_link: {
              where: {
                skill_level: 15,
              },
              include: {
                costume_skill: true,
              },
            },
            costume_stat: {
              take: 1,
              orderBy: {
                level: "desc",
              },
            },
          },
        },
      },
    });

    return {
      props: JSON.parse(
        JSON.stringify({
          isIndex: true,
          currentCharacter: null,
          selectedCostume: null,
          characters: characters,
        })
      ),
    };
  }

  // Show costume page
  const [character, costume] = context.params.costume;

  const characters = await prisma.character.findMany({
    orderBy: {
      character_id: "asc",
    },
  });

  const currentCharacter = characters.find((ch) => {
    return slug(ch.name) === slug(character);
  });

  const selectedCostumes = await prisma.costume.findMany({
    orderBy: {
      costume_id: "asc",
    },
    where: {
      character_id: currentCharacter.character_id,
    },
    include: {
      emblem: true,
    },
  });

  const selectedCostume = selectedCostumes.find((ch) => {
    return ch.slug === slug(costume);
  });

  const rankBonus = [];

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
      orderBy: {
        ability_level: "asc",
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
      orderBy: {
        skill_level: "asc",
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

  return {
    props: JSON.parse(
      JSON.stringify({
        currentCharacter,
        selectedCostume,
        characters: characters,
        costumes: selectedCostumes,
        abilities: abilities,
        skills: skills,
        stats: stats,
        rankBonus: rankBonus,
      })
    ),
  };
}

export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const costumes = await prisma.costume.findMany({
    include: {
      character: true,
    },
  });

  const characters = await prisma.character.findMany({});

  prisma.$disconnect();

  const costumesPaths = costumes.map((costume) => ({
    params: {
      costume: [slug(costume.character.name), slug(costume.title)],
    },
  }));

  const charactersPaths = characters.map((character) => ({
    params: {
      costume: [slug(character.name)],
    },
  }));

  return {
    paths: [
      ...costumesPaths,
      ...charactersPaths,
      {
        params: {
          costume: [],
        },
      },
    ],
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
