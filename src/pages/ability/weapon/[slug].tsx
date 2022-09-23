import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Ability from "@components/Ability";
import prisma from "@libs/prisma";
import {
  weapon,
  weapon_ability,
  weapon_ability_link,
  weapon_skill,
  weapon_skill_link,
  weapon_stat,
} from "@prisma/client";
import Link from "next/link";
import WeaponThumbnail from "@components/WeaponThumbnail";
import { CDN_URL } from "@config/constants";
import Checkbox from "@components/form/Checkbox";
import { useState } from "react";
import { useInventoryStore } from "@store/inventory";
import classNames from "classnames";
import AbilityThumbnail from "@components/AbilityThumbnail";
import slug from "slugg";
import SVG from "react-inlinesvg";

interface WeaponAbilityProps {
  ability: weapon_ability;
  abilityLinks: (weapon_ability_link & {
    weapon: weapon & {
      weapon_ability_link: (weapon_ability_link & {
        weapon_ability: weapon_ability;
      })[];
      weapon_skill_link: (weapon_skill_link & {
        weapon_skill: weapon_skill;
      })[];
      weapon_stat: weapon_stat[];
    };
  })[];
}

export default function WeaponAbility({
  ability,
  abilityLinks,
}: WeaponAbilityProps): JSX.Element {
  const [showOnlyInventory, setShowOnlyInventory] = useState(false);
  const ownedWeapons = useInventoryStore((state) => state.weapons);

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
            level={ability.ability_level}
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
            .filter((weap) => {
              if (showOnlyInventory) {
                return ownedWeapons.includes(weap.weapon.weapon_id);
              }
              return true;
            })
            .map((weapon) => (
              <div
                key={weapon.weapon.weapon_id}
                className="relative bordered flex items-center bg-grey-dark p-4"
              >
                <div className="flex items-center flex-1">
                  <WeaponThumbnail
                    href={`/weapons/${weapon.weapon.slug}`}
                    type={weapon.weapon.weapon_type}
                    element={weapon.weapon.attribute}
                    rarity={weapon.weapon.rarity}
                    image_path={weapon.weapon.image_path}
                    isDark={weapon.weapon.is_ex_weapon}
                  />
                  <div className="ml-4 flex flex-col gap-y-2 flex-1">
                    <p className="mb-1">
                      {weapon.weapon.is_ex_weapon && (
                        <span className="text-rarity-4">EX </span>
                      )}
                      {weapon.weapon.name}
                    </p>
                    <div className="flex flex-col md:flex-row justify-between flex-1 gap-y-8">
                      <ul className="flex flex-col gap-4">
                        {weapon.weapon.weapon_skill_link.map((weaponSkill) => (
                          <li key={weaponSkill.weapon_skill.skill_id}>
                            <p className="text-xs text-beige leading-3 max-w-[200px]">
                              {weaponSkill.weapon_skill.short_description}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <ul className="flex gap-x-2">
                        {weapon.weapon.weapon_ability_link.map(
                          (weaponAbility) => (
                            <li
                              className="transform hover:scale-105 ease-out-cubic transition-transform relative"
                              key={weaponAbility.weapon_ability.ability_id}
                            >
                              <AbilityThumbnail
                                ability={weaponAbility.weapon_ability}
                              >
                                <span
                                  className={classNames(
                                    "truncate w-16 text-xxs text-center",
                                    weaponAbility.weapon_ability.description ===
                                      ability.description
                                      ? "text-green-300"
                                      : ""
                                  )}
                                >
                                  {weaponAbility.weapon_ability.name}
                                </span>
                              </AbilityThumbnail>
                              <Link
                                href={`/ability/weapon/${slug(
                                  weaponAbility.weapon_ability.name
                                )}-${weaponAbility.weapon_ability.ability_id}`}
                              >
                                <a
                                  title={weaponAbility.weapon_ability.name}
                                  className="absolute inset-0"
                                >
                                  <span className="sr-only">
                                    see {weaponAbility.weapon_ability.name}
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

  const ability = await prisma.dump.weapon_ability.findFirst({
    where: {
      ability_id: Number(ability_id),
    },
    orderBy: {
      ability_level: "desc",
    },
    take: 1,
  });

  const tempAbilityLinks = await prisma.dump.weapon_ability.findMany({
    where: {
      description: ability.description,
      ability_level: 15,
    },
    include: {
      weapon_ability_link: {
        include: {
          weapon: {
            include: {
              weapon_ability_link: {
                where: {
                  ability_level: 15,
                },
                orderBy: {
                  slot_number: "asc",
                },
                include: {
                  weapon_ability: true,
                },
              },
              weapon_skill_link: {
                where: {
                  skill_level: 15,
                },
                orderBy: {
                  slot_number: "asc",
                },
                include: {
                  weapon_skill: true,
                },
              },
              weapon_stat: {
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
    .map((links) => links.weapon_ability_link)
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
  const abilities = await prisma.dump.weapon_ability.findMany({
    where: {
      ability_level: 15,
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
