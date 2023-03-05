import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Ability from "@components/Ability";
import prisma from "@libs/prisma";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import DatabaseNavbar from "@components/DatabaseNavbar";
import {
  character,
  costume,
  costume_ability,
  costume_ability_link,
  weapon,
  weapon_ability,
  weapon_ability_link,
} from "@prisma/client";
import Link from "next/link";
import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import WeaponThumbnail from "@components/WeaponThumbnail";
import TierlistTab from "@components/tierlist/TierListTab";
import CostumeThumbnail from "@components/CostumeThumbnail";
import { CDN_URL } from "@config/constants";
import RARITY from "@utils/rarity";
import slug from "slugg";
import * as Tabs from "@radix-ui/react-tabs";
import { abilitiesBehaviorsTypes } from "@utils/behaviorTypes";

interface CompanionsPageProps {
  weaponAbilities: (weapon_ability & {
    links: (weapon_ability_link & {
      weapon: weapon;
    })[];
  })[];
  costumeAbilities: (costume_ability & {
    links: (costume_ability_link & {
      costume: costume & {
        character: character;
      };
    })[];
  })[];
}

export default function CompanionsPage({
  weaponAbilities,
  costumeAbilities,
}: CompanionsPageProps): JSX.Element {
  return (
    <Layout className="overflow-x-auto">
      <Meta
        title="Abilities - Database"
        description="List of abilities."
        cover="https://nierrein.guide/database/abilities.jpg"
      />

      <section className="mx-auto p-6">
        <DatabaseNavbar />
        <Tabs.Root className="mt-4" defaultValue="weapons">
          <Tabs.List className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
            <TierlistTab index="weapons">Weapons</TierlistTab>
            <TierlistTab index="costumes">Costumes</TierlistTab>
          </Tabs.List>

          <Tabs.Content value="weapons">
            <MaterialTable
              title={`${weaponAbilities.length} abilities in the database.`}
              data={weaponAbilities}
              columns={[
                {
                  field: "title",
                  title: "Title",
                  type: "string",
                  filterPlaceholder: "Search name or description...",
                  render: (ability) => (
                    <div className="flex items-center gap-x-4 p-2 relative bg-white bg-opacity-5 rounded-lg hover:bg-opacity-20 focus-within:bg-opacity-20 transition md:w-96">
                      <Ability
                        className="flex-1"
                        name={ability.name}
                        description={ability.description}
                        imagePathBase={ability.image_path_base}
                        level={15}
                        maxLevel={15}
                      />

                      <Link
                        href={`/ability/weapon/${slug(ability.name)}-${slug(
                          ability.ability_id
                        )}`}
                        passHref
                        title="Go to ability page"
                        className="absolute inset-0 z-10"
                      >
                        <span className="sr-only">
                          See more about {ability.name}
                        </span>
                      </Link>
                    </div>
                  ),
                  customFilterAndSearch: (term, ability) => {
                    if (term.length === 0) return true;
                    return ability.name
                      .toLowerCase()
                      .includes(term.toLowerCase());
                  },
                },
                {
                  field: "ability",
                  title: "Used by",
                  filtering: false,
                  render: (ability) => {
                    const MAX_EVOLUTION_ORDER_EX = ability.links
                      .filter((weap) => weap.weapon.is_ex_weapon)
                      .reduce(
                        (maxValue, value) =>
                          value.weapon.evolution_order > maxValue
                            ? value.weapon.evolution_order
                            : maxValue,
                        0
                      );

                    const MAX_EVOLUTION_ORDER = ability.links
                      .filter((weap) => !weap.weapon.is_ex_weapon)
                      .reduce(
                        (maxValue, value) =>
                          value.weapon.evolution_order > maxValue
                            ? value.weapon.evolution_order
                            : maxValue,
                        0
                      );

                    const options = ability.links
                      .filter((link) => {
                        if (link.weapon.is_ex_weapon) {
                          return (
                            link.weapon.evolution_order ===
                            MAX_EVOLUTION_ORDER_EX
                          );
                        } else {
                          return (
                            link.weapon.evolution_order === MAX_EVOLUTION_ORDER
                          );
                        }
                      })
                      .sort(
                        (a, b) =>
                          -b.weapon.weapon_type.localeCompare(
                            a.weapon.weapon_type
                          )
                      );
                    return (
                      <>
                        <Autocomplete
                          className="w-96"
                          onChange={(e, weapon) => {
                            if (!weapon) return;
                            if (
                              weapon.weapon.is_ex_weapon &&
                              weapon.weapon.evolution_order < 11
                            ) {
                              const fragments = weapon.weapon.slug.split("-");
                              fragments.pop();
                              fragments.push("iv");
                              const weaponSlug = fragments.join("-");

                              // @ts-expect-error location
                              window.location = `/weapons/${weaponSlug}`;
                              return;
                            }

                            window.location = `/weapons/${weapon.weapon.slug}`;
                          }}
                          options={options}
                          autoHighlight
                          groupBy={(ability) => ability.weapon.weapon_type}
                          getOptionLabel={(option) => option?.weapon?.name}
                          renderOption={(props, option) => (
                            <Box
                              component="li"
                              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                              {...props}
                            >
                              <WeaponThumbnail
                                type={option.weapon.weapon_type}
                                element={option.weapon.attribute}
                                rarity={option.weapon.rarity}
                                image_path={option.weapon.image_path}
                                isDark={option.weapon.is_ex_weapon}
                              />
                              <p className="ml-4">{option.weapon.name}</p>
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={`${options.length} Corresponding weapons...`}
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password", // disable autocomplete and autofill
                              }}
                            />
                          )}
                        />
                      </>
                    );
                  },
                },
                {
                  title: "Type",
                  field: "behaviors",
                  lookup: {
                    PASSIVE_SKILL: abilitiesBehaviorsTypes.PASSIVE_SKILL.label,
                    STATUS: abilitiesBehaviorsTypes.STATUS.label,
                    BLESS: abilitiesBehaviorsTypes.BLESS.label,
                  },
                  customFilterAndSearch: (term, ability) => {
                    if (term.length === 0) return true;
                    return ability.behaviour_types.every((type) =>
                      term.includes(type)
                    );
                  },
                  render: (ability) => (
                    <div className="flex gap-x-2">
                      {ability.behaviour_types.map((type) => (
                        <span
                          className="bg-grey-dark border border-beige border-opacity-50 py-1 px-2"
                          key={type}
                        >
                          {abilitiesBehaviorsTypes[type].label}
                        </span>
                      ))}
                    </div>
                  ),
                },
              ]}
              options={{
                search: false,
                actionsColumnIndex: -1,
                searchFieldAlignment: "right",
                filtering: true,
                pageSize: 50,
                pageSizeOptions: [25, 50, 100, 200, 500],
                exportMenu: [
                  {
                    label: "Export PDF",
                    exportFunc: (cols, datas) =>
                      ExportPdf(cols, datas, "myPdfFileName"),
                  },
                  {
                    label: "Export CSV",
                    exportFunc: (cols, datas) =>
                      ExportCsv(cols, datas, "myCsvFileName"),
                  },
                ],
                exportAllData: true,
              }}
            />
          </Tabs.Content>
          <Tabs.Content value="costumes">
            <MaterialTable
              title={`${costumeAbilities.length} abilities in the database.`}
              data={costumeAbilities}
              columns={[
                {
                  field: "title",
                  title: "Title",
                  type: "string",
                  filterPlaceholder: "Search name or description...",
                  render: (ability) => (
                    <div className="flex items-center gap-x-4 p-2 relative bg-white bg-opacity-5 rounded-lg hover:bg-opacity-20 focus-within:bg-opacity-20 transition md:w-96">
                      <Ability
                        className="flex-1"
                        name={ability.name}
                        description={ability.description}
                        imagePathBase={ability.image_path_base}
                        level={4}
                        maxLevel={4}
                      />

                      <Link
                        href={`/ability/costume/${slug(ability.name)}-${
                          ability.ability_id
                        }`}
                        passHref
                        title="Go to ability page"
                        className="absolute inset-0 z-10"
                      >
                        <span className="sr-only">
                          See more about {ability.name}
                        </span>
                      </Link>
                    </div>
                  ),
                  customFilterAndSearch: (term, ability) => {
                    if (term.length === 0) return true;
                    return ability.name
                      .toLowerCase()
                      .includes(term.toLowerCase());
                  },
                },
                {
                  field: "ability",
                  title: "Used by",
                  filtering: false,
                  render: (ability) => {
                    const options = ability.links.sort(
                      (a, b) =>
                        -b.costume.weapon_type.localeCompare(
                          a.costume.weapon_type
                        )
                    );
                    return (
                      <>
                        <Autocomplete
                          className="w-96"
                          onChange={(e, costume) => {
                            if (!costume) return;
                            // @ts-expect-error location
                            window.location = `/characters/${costume.costume.character.slug}/${costume.costume.slug}`;
                          }}
                          options={options}
                          autoHighlight
                          groupBy={(ability) => ability.costume.weapon_type}
                          getOptionLabel={(option) =>
                            typeof option === "object" &&
                            `${option.costume.title}`
                          }
                          renderOption={(props, option) => (
                            <Box
                              component="li"
                              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                              {...props}
                            >
                              <CostumeThumbnail
                                src={`${CDN_URL}${option.costume.image_path_base}battle.png`}
                                alt={`${option.costume.title} thumbnail`}
                                rarity={RARITY[option.costume.rarity]}
                                weaponType={option.costume.weapon_type}
                              />
                              <p className="ml-4">{option.costume.title}</p>
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={`${options.length} Corresponding costumes...`}
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password", // disable autocomplete and autofill
                              }}
                            />
                          )}
                        />
                      </>
                    );
                  },
                },
                {
                  title: "Type",
                  field: "behaviors",
                  lookup: {
                    PASSIVE_SKILL: abilitiesBehaviorsTypes.PASSIVE_SKILL.label,
                    STATUS: abilitiesBehaviorsTypes.STATUS.label,
                    BLESS: abilitiesBehaviorsTypes.BLESS.label,
                  },
                  customFilterAndSearch: (term, ability) => {
                    if (term.length === 0) return true;
                    return ability.behaviour_types.every((type) =>
                      term.includes(type)
                    );
                  },
                  render: (ability) => (
                    <div className="flex gap-x-2">
                      {ability.behaviour_types.map((type) => (
                        <span
                          className="bg-grey-dark border border-beige border-opacity-50 py-1 px-2"
                          key={type}
                        >
                          {abilitiesBehaviorsTypes[type].label}
                        </span>
                      ))}
                    </div>
                  ),
                },
              ]}
              options={{
                search: false,
                actionsColumnIndex: -1,
                searchFieldAlignment: "right",
                filtering: true,
                pageSize: 50,
                pageSizeOptions: [25, 50, 100, 200, 500],
                exportMenu: [
                  {
                    label: "Export PDF",
                    exportFunc: (cols, datas) =>
                      ExportPdf(cols, datas, "myPdfFileName"),
                  },
                  {
                    label: "Export CSV",
                    exportFunc: (cols, datas) =>
                      ExportCsv(cols, datas, "myCsvFileName"),
                  },
                ],
                exportAllData: true,
              }}
            />
          </Tabs.Content>
        </Tabs.Root>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const weaponAbilities = await prisma.dump.weapon_ability.findMany({
    where: {
      ability_level: 15,
    },
    distinct: ["description"],
    orderBy: {
      name: "asc",
    },
  });

  for (const ability of weaponAbilities) {
    const links = await getWeaponsLinks(ability);
    ability["links"] = links;
  }

  const costumeAbilities = await prisma.dump.costume_ability.findMany({
    where: {
      ability_level: 4,
    },
    distinct: ["description"],
    orderBy: {
      name: "asc",
    },
  });

  for (const ability of costumeAbilities) {
    const links = await getCostumesLinks(ability);
    ability["links"] = links;
  }

  return {
    props: JSON.parse(
      JSON.stringify({
        weaponAbilities,
        costumeAbilities,
      })
    ),
  };
}

async function getWeaponsLinks(ability: weapon_ability) {
  const tempAbilityLinks = await prisma.dump.weapon_ability.findMany({
    where: {
      description: ability.description,
      ability_level: 15,
    },
    include: {
      weapon_ability_link: {
        include: {
          weapon: true,
        },
      },
    },
  });

  const abilityLinks = tempAbilityLinks
    .map((links) => links.weapon_ability_link)
    .flat();

  return abilityLinks;
}

async function getCostumesLinks(ability: costume_ability) {
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
            },
          },
        },
      },
    },
  });

  const abilityLinks = tempAbilityLinks
    .map((links) => links.costume_ability_link)
    .flat();

  return abilityLinks;
}
