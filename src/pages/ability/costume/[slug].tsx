import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Ability from "@components/Ability";
import prisma from "@libs/prisma";
import {
  character,
  costume,
  costume_ability,
  costume_ability_link,
  costume_skill,
  costume_skill_link,
  costume_stat,
} from "@prisma/client";
import Link from "next/link";
import { CDN_URL } from "@config/constants";
import Checkbox from "@components/form/Checkbox";
import { useState } from "react";
import { useInventoryStore } from "@store/inventory";
import classNames from "classnames";
import AbilityThumbnail from "@components/AbilityThumbnail";
import slug from "slugg";
import CostumeThumbnail from "@components/CostumeThumbnail";
import RARITY from "@utils/rarity";
import SVG from "react-inlinesvg";

interface WeaponAbilityProps {
  ability: costume_ability;
  abilityLinks: (costume_ability_link & {
    costume: costume & {
      costume_ability_link: (costume_ability_link & {
        costume_ability: costume_ability;
      })[];
      character: character;
      costume_skill_link: (costume_skill_link & {
        costume_skill: costume_skill;
      })[];
      costume_stat: costume_stat[];
    };
  })[];
}

export default function CostumeAbility({
  ability,
  abilityLinks,
}: WeaponAbilityProps): JSX.Element {
  const [showOnlyInventory, setShowOnlyInventory] = useState(false);
  const ownedCostumes = useInventoryStore((state) => state.costumes);

  return (
    <Layout>
      <Meta
        title={`${ability.name} - Weapon Ability - Database`}
        description={ability.description}
        cover={`${CDN_URL}${ability.image_path_base}standard.png`}
      />

      <nav className="mb-16">
        <Link href="/database" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Return to Abilities</span>
          </a>
        </Link>
      </nav>

      <section className="relative grid grid-cols-1 md:grid-cols-7 gap-8 mx-auto p-6 w-full">
        <div className="flex flex-col gap-y-6 md:col-span-3">
          <Ability
            name={ability.name}
            description={ability.description}
            imagePathBase={ability.image_path_base}
            level={15}
            maxLevel={15}
          />

          <div className="bg-grey-lighter relative bordered p-4">
            <p>[Notes] WIP</p>
          </div>

          <Checkbox
            label="Only inventory"
            isChecked={showOnlyInventory}
            setState={(e) => setShowOnlyInventory(e.target.checked)}
          />
        </div>
        <div className="flex flex-col gap-y-4 md:col-span-4">
          {abilityLinks
            .filter((cost) => {
              if (showOnlyInventory) {
                return ownedCostumes.includes(cost.costume.costume_id);
              }
              return true;
            })
            .map((costume) => (
              <div
                key={costume.costume.costume_id}
                className="relative bordered flex items-center bg-grey-dark p-4"
              >
                <div className="flex items-center flex-1">
                  <CostumeThumbnail
                    src={`${CDN_URL}${costume.costume.image_path_base}battle.png`}
                    alt={`${costume.costume.title} thumbnail`}
                    rarity={RARITY[costume.costume.rarity]}
                    weaponType={costume.costume.weapon_type}
                  />
                  <div className="ml-4 flex flex-col gap-y-2 flex-1">
                    <p className="mb-1">
                      {costume.costume.is_ex_costume && (
                        <span className="text-rarity-4">EX </span>
                      )}
                      {costume.costume.title}
                    </p>
                    <div className="flex flex-col md:flex-row justify-between flex-1 gap-y-8">
                      <ul className="flex flex-col gap-4">
                        {costume.costume.costume_skill_link.map(
                          (costumeSkill) => (
                            <li key={costumeSkill.costume_skill.skill_id}>
                              <p className="text-xs text-beige leading-3 max-w-[200px]">
                                {costumeSkill.costume_skill.short_description}
                              </p>
                            </li>
                          )
                        )}
                      </ul>
                      <ul className="flex gap-x-2">
                        {costume.costume.costume_ability_link.map(
                          (costumeAbility) => (
                            <li
                              className="transform hover:scale-105 ease-out-cubic transition-transform relative"
                              key={costumeAbility.costume_ability.ability_id}
                            >
                              <AbilityThumbnail
                                ability={costumeAbility.costume_ability}
                              >
                                <span
                                  className={classNames(
                                    "truncate w-16 text-xxs text-center",
                                    costumeAbility.costume_ability
                                      .description === ability.description
                                      ? "text-green-300"
                                      : ""
                                  )}
                                >
                                  {costumeAbility.costume_ability.name}
                                </span>
                              </AbilityThumbnail>
                              <Link
                                href={`/ability/costume/${slug(
                                  costumeAbility.costume_ability.name
                                )}-${
                                  costumeAbility.costume_ability.ability_id
                                }`}
                              >
                                <a
                                  title={costumeAbility.costume_ability.name}
                                  className="absolute inset-0"
                                >
                                  <span className="sr-only">
                                    see {costumeAbility.costume_ability.name}
                                  </span>
                                </a>
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const queryFragments = params.slug.split("-");
  const ability_id = queryFragments[queryFragments.length - 1];

  const ability = await prisma.dump.costume_ability.findFirst({
    where: {
      ability_id: Number(ability_id),
    },
    orderBy: {
      ability_level: "desc",
    },
    take: 1,
  });

  const tempAbilityLinks = await prisma.dump.costume_ability.findMany({
    where: {
      description: ability.description,
    },
    include: {
      costume_ability_link: {
        include: {
          costume: {
            include: {
              character: true,
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
              costume_stat: true,
            },
          },
        },
      },
    },
  });

  const abilityLinks = tempAbilityLinks
    .map((links) => links.costume_ability_link)
    .flat();

  return {
    props: JSON.parse(
      JSON.stringify({
        ability,
        abilityLinks,
      })
    ),
  };
}

export async function getStaticPaths() {
  const abilities = await prisma.dump.costume_ability.findMany({
    select: {
      ability_id: true,
      name: true,
    },
  });

  console.log(abilities);

  const paths = abilities.map((ability) => ({
    params: {
      slug: `${slug(ability.name)}-${ability.ability_id.toString()}`,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
