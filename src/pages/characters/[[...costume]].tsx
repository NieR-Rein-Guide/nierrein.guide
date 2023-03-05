/* eslint-disable react-hooks/rules-of-hooks */
import slug from "slugg";
import Costume from "../../components/pages/costume";
import prisma from "@libs/prisma";
import Index from "../../components/pages/costumes";
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
import alterCostumeToAddWeapon from "@utils/alterCostumeToAddWeapon";
import alterCostumeToAddSources from "@utils/alterCostumeToAddSources";
import { useFilteredCostumes } from "@hooks/useFilteredCostumes";

interface CharactersPageProps {
  isIndex: boolean;
  currentCharacter: character;
  selectedCostume: costume;
  characters: character[];
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
}: CharactersPageProps): JSX.Element {
  const { filteredCharacters, filteredCostumes } = useFilteredCostumes({
    costumes,
    characters,
  });

  if (!isIndex) {
    return (
      <Costume
        currentCharacter={currentCharacter}
        selectedCostume={selectedCostume}
        characters={filteredCharacters}
        costumes={filteredCostumes}
        abilities={abilities}
        skills={skills}
        stats={stats}
        rankBonus={rankBonus}
      />
    );
  }

  return (
    <Index
      costumes={filteredCostumes}
      abilitiesLookup={abilitiesLookup}
      charactersLookup={charactersLookup}
      characters={filteredCharacters}
    />
  );
}

export async function getStaticProps(context) {
  // No route parameters, show index page
  if (Object.entries(context.params).length === 0) {
    const { costumes, abilitiesLookup, charactersLookup } =
      await getAllCostumes({
        orderBy: {
          release_time: "desc",
        },
      });

    const characters = await prisma.dump.character.findMany({
      orderBy: {
        character_id: "asc",
      },
    });

    return {
      props: JSON.parse(
        JSON.stringify({
          isIndex: true,
          currentCharacter: null,
          selectedCostume: null,
          costumes,
          abilitiesLookup,
          charactersLookup,
          characters,
        })
      ),
    };
  }

  // Show costume page
  const [character, costume] = context.params.costume;

  const characters = await prisma.dump.character.findMany({
    orderBy: {
      character_id: "asc",
    },
  });

  const currentCharacter = characters.find((ch) => {
    return ch.slug === slug(character);
  });

  const [selectedCostumes, rankBonus] = await Promise.all([
    prisma.dump.costume.findMany({
      orderBy: {
        costume_id: "asc",
      },
      where: {
        character_id: currentCharacter.character_id,
      },
      include: {
        character: {
          include: {
            debris: true,
          },
        },
        emblem: true,
        debris: true,
        costume_ability_link: {
          where: {
            OR: [
              {
                ability_level: 4,
                AND: {
                  ability_slot: {
                    lte: 2,
                  },
                },
              },
              {
                ability_level: 1,
                AND: {
                  ability_slot: {
                    equals: 3,
                  },
                },
              },
            ],
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
          orderBy: {
            awakening_step: "asc",
          },
        },
      },
    }),
    prisma.dump.character_rank_bonus.findMany({
      where: {
        character_id: currentCharacter.character_id,
      },
      orderBy: {
        rank_bonus_level: "asc",
      },
    }),
  ]);

  let selectedCostume = selectedCostumes.find((ch) => {
    return ch.slug === slug(costume);
  });

  if (!selectedCostume) {
    selectedCostume = selectedCostumes[0];
  }

  const stats = {};
  const abilities = {};
  const skills = {};

  for (const costume of selectedCostumes) {
    const allAbilities = await prisma.dump.costume_ability_link.findMany({
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

    const allSkills = await prisma.dump.costume_skill_link.findMany({
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

    const allStats = await prisma.dump.costume_stat.findMany({
      where: {
        costume_id: costume.costume_id,
      },
    });

    abilities[costume.costume_id] = Object.values(
      groupByKey(allAbilities, "ability_id")
    );
    skills[costume.costume_id] = allSkills;
    stats[costume.costume_id] = allStats.sort((a, b) => a.level - b.level);

    const link = await prisma.nrg.costumes_link.findUnique({
      where: {
        costume_id: costume.costume_id,
      },
    });

    costume.link = link;

    await Promise.all([
      alterCostumeToAddWeapon(costume), // Add costume's weapon
      alterCostumeToAddSources(costume), // Add costume's sources
    ]);

    const tierlistsItems = await prisma.nrg.tiers_items.findMany({
      where: {
        item_id: costume.costume_id,
      },
      include: {
        tiers: {
          include: {
            tierslists: true,
          },
        },
      },
    });

    costume.tierlistsItems = tierlistsItems;
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
      })
    ),
  };
}

export async function getStaticPaths() {
  const costumes = await prisma.dump.costume.findMany({
    include: {
      character: true,
    },
  });

  const characters = await prisma.dump.character.findMany({});

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
