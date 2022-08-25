/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import slug from "slugg";
import Costume from "../../components/pages/costume";
import Index from "../../components/pages/costumes";
import prisma from "@libs/prisma";
import {
  character,
  character_rank_bonus,
  costume,
  costume_ability,
  costume_ability_link,
  costume_skill,
  costume_skill_link,
  costume_stat,
  emblem,
} from "@prisma/client";
import { getAllCostumes } from "@models/costume";

interface CharactersPageProps {
  isIndex: boolean;
  currentCharacter: character;
  selectedCostume: costume;
  characters;
  costumes: (costume & {
    costume_ability_link: (costume_ability_link & {
      costume_ability: costume_ability;
    })[];
    costume_skill_link: (costume_skill_link & {
      costume_skill: costume_skill;
    })[];
    costume_stat: costume_stat[];
    character: character;
    emblem: emblem;
  })[];
  abilities;
  skills;
  stats;
  rankBonus: character_rank_bonus[];
  abilitiesLookup;
  charactersLookup;
  selectCostumes: {
    title: string;
    character: character;
    slug: string;
    image_path_base: string;
    release_time: Date;
  }[];
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
  abilitiesLookup,
  charactersLookup,
  selectCostumes,
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
        selectCostumes={selectCostumes}
      />
    );
  }

  return (
    <Index
      costumes={costumes}
      abilitiesLookup={abilitiesLookup}
      charactersLookup={charactersLookup}
    />
  );
}

export async function getStaticProps(context) {
  // No route parameters, show index page
  if (Object.entries(context.params).length === 0) {
    const { costumes, abilitiesLookup, charactersLookup } =
      await getAllCostumes();

    return {
      props: JSON.parse(
        JSON.stringify({
          isIndex: true,
          currentCharacter: null,
          selectedCostume: null,
          costumes,
          abilitiesLookup,
          charactersLookup,
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
    return ch.slug === slug(character);
  });

  const [selectedCostumes, rankBonus, selectCostumes] = await Promise.all([
    prisma.costume.findMany({
      orderBy: {
        costume_id: "asc",
      },
      where: {
        character_id: currentCharacter.character_id,
      },
      include: {
        emblem: true,
      },
    }),
    prisma.character_rank_bonus.findMany({
      where: {
        character_id: currentCharacter.character_id,
      },
      orderBy: {
        rank_bonus_level: "asc",
      },
    }),
    prisma.costume.findMany({
      orderBy: {
        costume_id: "asc",
      },
      select: {
        character,
        title: true,
        slug: true,
        image_path_base: true,
        release_time: true,
      },
    }),
  ]);

  selectCostumes.sort(
    (a, b) => -b.character.name.localeCompare(a.character.name)
  );

  const selectedCostume = selectedCostumes.find((ch) => {
    return ch.slug === slug(costume);
  });

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

    const allStats = await prisma.costume_stat.findMany({
      where: {
        costume_id: costume.costume_id,
      },
    });

    abilities[costume.costume_id] = Object.values(
      groupByKey(allAbilities, "ability_id")
    );
    skills[costume.costume_id] = allSkills;
    stats[costume.costume_id] = allStats.sort((a, b) => a.level - b.level);
  }

  return {
    props: JSON.parse(
      JSON.stringify({
        currentCharacter,
        selectedCostume,
        characters,
        costumes: selectedCostumes,
        abilities,
        skills,
        stats,
        rankBonus,
        selectCostumes,
      })
    ),
  };
}

export async function getStaticPaths() {
  const costumes = await prisma.costume.findMany({
    include: {
      character: true,
    },
  });

  const characters = await prisma.character.findMany({});

  const costumesPaths = costumes.map((costume) => ({
    params: {
      costume: [costume.character.slug, costume.slug],
    },
  }));

  const charactersPaths = characters.map((character) => ({
    params: {
      costume: [character.slug],
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
