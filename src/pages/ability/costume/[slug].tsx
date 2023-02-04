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
import { useEffect, useState } from "react";
import { useInventoryStore } from "@store/inventory";
import classNames from "classnames";
import AbilityThumbnail from "@components/AbilityThumbnail";
import slug from "slugg";
import CostumeThumbnail from "@components/CostumeThumbnail";
import RARITY from "@utils/rarity";
import SVG from "react-inlinesvg";
import Image from "next/legacy/image";
import statsIcons from "@utils/statsIcons";
import { Chip } from "@mui/material";
import dynamic from "next/dynamic";
const DisclosureWithNoSSR = dynamic(
  () => import("../../../components/Disclosure"),
  {
    ssr: false,
  }
);

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
  otherAbilities: costume_ability[];
}

export default function CostumeAbility({
  ability,
  abilityLinks,
  otherAbilities,
}: WeaponAbilityProps): JSX.Element {
  const [showOnlyInventory, setShowOnlyInventory] = useState(false);
  const ownedCostumes = useInventoryStore((state) => state.costumes);
  const [links, setLinks] = useState(abilityLinks);

  useEffect(() => {
    setLinks(
      abilityLinks.filter((cost) => {
        if (showOnlyInventory) {
          return ownedCostumes.includes(cost.costume.costume_id);
        }
        return true;
      })
    );
  }, [showOnlyInventory]);

  return (
    <Layout>
      <Meta
        title={`${ability.name} - Weapon Ability - Database`}
        description={ability.description}
        cover={`${CDN_URL}${ability.image_path_base}standard.png`}
      />

      <nav className="mb-16">
        <Link href="/database/abilities" passHref={true} className="btn">

          <SVG src="/decorations/arrow-left.svg" className="h-6" />
          <span>Return to Abilities</span>

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

          {otherAbilities.length > 0 && (
            <div className="flex flex-col gap-y-2 bg-grey-dark p-4">
              <h2 className="text-2xl text-center">
                Similar abilities
                <sup className="text-beige">{otherAbilities.length}</sup>
              </h2>
              <DisclosureWithNoSSR initialHeight="150px">
                {otherAbilities.map((otherAbility) => (
                  <Ability
                    fullLink
                    key={otherAbility.ability_id}
                    href={`/ability/costume/${slug(otherAbility.name)}-${
                      otherAbility.ability_id
                    }`}
                    name={otherAbility.name}
                    description={otherAbility.description}
                    imagePathBase={otherAbility.image_path_base}
                    level={otherAbility.ability_level}
                    maxLevel={4}
                  />
                ))}
              </DisclosureWithNoSSR>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-4 md:col-span-4">
          {links.length > 0 && (
            <h3 className="text-2xl">
              {links.length} costume{links.length > 1 ? "s" : ""} found.
            </h3>
          )}
          {links.length === 0 && (
            <div className="bg-grey-dark text-beige transition-colors w-full border-b border-beige-inactive border-opacity-50 p-8 text-center rounded-lg">
              <img
                className="inline-block"
                src="/decorations/fio-confused.png"
                alt="Fio confused"
              />
              <p className="mt-4">Sorry, no costumes found.</p>
              <div className="flex justify-center mt-4">
                <Link href="/database/abilities" passHref className="btn">
                  See all abilities
                </Link>
              </div>
            </div>
          )}
          {links.map((costume) => (
            <div
              key={costume.costume.costume_id}
              className="relative bordered flex items-center bg-grey-dark p-4"
            >
              <Chip
                className="absolute z-10 bg-beige text-black -right-2 -top-2"
                label={`Lv. ${costume.costume.costume_stat[0].level}`}
                size="small"
              />
              <div className="flex lg:items-center flex-1">
                <CostumeThumbnail
                  href={`/characters/${costume.costume.character.slug}/${costume.costume.slug}`}
                  src={`${CDN_URL}${costume.costume.image_path_base}battle.png`}
                  alt={`${costume.costume.title} thumbnail`}
                  rarity={RARITY[costume.costume.rarity]}
                  weaponType={costume.costume.weapon_type}
                />
                <div className="ml-4 flex flex-col gap-y-2 flex-1">
                  <div className="flex flex-col sm:flex-row justify-between mb-1">
                    <Link
                      href={`/characters/${costume.costume.character.slug}/${costume.costume.slug}`}
                      passHref
                      className="mb-1 hover:underline">

                      {costume.costume.is_ex_costume && (
                        <span className="text-rarity-4">EX </span>
                      )}
                      {costume.costume.title}

                    </Link>
                    <ul className="flex gap-x-4 text-sm">
                      <li className="flex items-center gap-x-1">
                        <Image
                          layout="intrinsic"
                          src={statsIcons.largeHp}
                          alt="HP"
                          width={24}
                          height={24}
                        />
                        {costume.costume.costume_stat[0].hp}
                      </li>
                      <li className="flex items-center gap-x-1 text-red-300">
                        <Image
                          layout="intrinsic"
                          src={statsIcons.largeAtk}
                          alt="HP"
                          width={24}
                          height={24}
                        />
                        {costume.costume.costume_stat[0].atk}
                      </li>
                      <li className="flex items-center gap-x-1 text-blue-300">
                        <Image
                          layout="intrinsic"
                          src={statsIcons.largeDef}
                          alt="HP"
                          width={24}
                          height={24}
                        />
                        {costume.costume.costume_stat[0].vit}
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between flex-1 gap-y-8">
                    <ul className="flex flex-col gap-4">
                      {costume.costume.costume_skill_link.map(
                        (costumeSkill) => (
                          <li key={costumeSkill.costume_skill.skill_id}>
                            <p className="text-xs text-beige leading-3 max-w-[200px]">
                              ◈ {costumeSkill.costume_skill.short_description}
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
                                  costumeAbility.costume_ability.description ===
                                    ability.description
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
                              )}-${costumeAbility.costume_ability.ability_id}`}
                              title={costumeAbility.costume_ability.name}
                              className="absolute inset-0">

                              <span className="sr-only">
                                see {costumeAbility.costume_ability.name}
                              </span>

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
  const ability_id = Number(queryFragments[queryFragments.length - 1]);

  const ability = await prisma.dump.costume_ability.findFirst({
    where: {
      ability_id,
    },
    orderBy: {
      ability_level: "desc",
    },
    take: 1,
  });

  const otherAbilities = (
    await prisma.dump.costume_ability.findMany({
      where: {
        name: ability.name,
        ability_id: {
          not: ability_id,
        },
        ability_level: 4,
      },
      orderBy: {
        description: "desc",
      },
      distinct: ["description"],
    })
  ).sort((a, b) => b.description.length - a.description.length);

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
              costume_stat: {
                take: 1,
                orderBy: {
                  level: "desc",
                },
              },
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
        otherAbilities,
      })
    ),
  };
}

export async function getStaticPaths() {
  const abilities = await prisma.dump.costume_ability.findMany({
    where: {
      ability_level: 4,
    },
    select: {
      ability_id: true,
      name: true,
    },
  });

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
