import Layout from "@components/Layout";
import Meta from "@components/Meta";
import WeaponThumbnail from "@components/WeaponThumbnail";
import CostumeThumbnail from "@components/CostumeThumbnail";
import DebrisThumbnail from "@components/DebrisThumbnail";
import prisma from "@libs/prisma";
import { FixedSizeList as List } from "react-window";
import toast from "react-hot-toast";
import {
  character,
  costume,
  costume_ability,
  costume_ability_link,
  costume_skill,
  costume_skill_link,
  costume_stat,
  debris,
  emblem,
  Prisma,
  weapon,
  weapon_ability,
  weapon_ability_link,
  weapon_skill,
  weapon_skill_link,
  weapon_stat,
} from "@prisma/client";
import { costumes_link } from "@prisma/client-nrg";
import { getAllCostumes } from "@models/costume";
import { CDN_URL } from "@config/constants";
import RARITY from "@utils/rarity";
import WeaponSelect from "@components/weapons/WeaponSelect";
import { useState } from "react";
import axios from "axios";
import produce from "immer";
import getBaseRarity from "@utils/getBaseRarity";
import { getAllEvents } from "@models/event";
import { Autocomplete, TextField } from "@mui/material";
import { Event } from "@models/types";
import MaterialTable from "@material-table/core";
import { getAllWeapons } from "@models/weapon";
import { Box } from "@mui/system";

interface LoadoutBuilderProps {
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
  weapons: (weapon & {
    weapon_ability_link: (weapon_ability_link & {
      weapon_ability: weapon_ability;
    })[];
    weapon_skill_link: (weapon_skill_link & {
      weapon_skill: weapon_skill;
    })[];
    weapon_stat: weapon_stat[];
  })[];
  debris: debris[];
  links: costumes_link[];
  events: Event[];
}

export default function AdminCostumesLink({
  costumes,
  weapons,
  links,
  events,
}: LoadoutBuilderProps): JSX.Element {
  const [newLinks, setNewLinks] = useState(links);
  const [loading, setLoading] = useState(false);

  async function save() {
    if (loading) return;

    try {
      setLoading(true);

      await axios({
        url: "/api/costumes-link",
        method: "POST",
        data: {
          costumes: newLinks,
        },
      });

      toast.success("Saved!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  function updateWeapon(
    costume: costume & {
      costume_ability_link: (costume_ability_link & {
        costume_ability: costume_ability;
      })[];
      costume_skill_link: (costume_skill_link & {
        costume_skill: costume_skill;
      })[];
      costume_stat: costume_stat[];
      character: character;
      emblem: emblem;
    },
    weapon: weapon & {
      weapon_ability_link: (weapon_ability_link & {
        weapon_ability: weapon_ability;
      })[];
      weapon_skill_link: (weapon_skill_link & {
        weapon_skill: weapon_skill;
      })[];
      weapon_stat: weapon_stat[];
    }
  ) {
    setNewLinks(
      produce(newLinks, (draft) => {
        const linkedCostume = draft.find(
          (link) => link.costume_id === costume.costume_id
        );

        if (!linkedCostume) {
          draft.push({
            costume_id: costume?.costume_id,
            weapon_id: weapon?.weapon_id,
            events: linkedCostume.events ?? [],
          });

          return;
        }

        linkedCostume.weapon_id = weapon.weapon_id;
      })
    );

    console.log(newLinks);
  }

  function updateEvents(
    costume: costume & {
      costume_ability_link: (costume_ability_link & {
        costume_ability: costume_ability;
      })[];
      costume_skill_link: (costume_skill_link & {
        costume_skill: costume_skill;
      })[];
      costume_stat: costume_stat[];
      character: character;
      emblem: emblem;
    },
    events
  ) {
    setNewLinks(
      produce(newLinks, (draft) => {
        const linkedCostume = draft.find(
          (link) => link.costume_id === costume.costume_id
        );

        if (!linkedCostume) {
          draft.push({
            costume_id: costume.costume_id,
            weapon_id: linkedCostume?.weapon_id,
            events,
          });

          return;
        }

        linkedCostume.events = events;
      })
    );

    console.log(newLinks);
  }

  return (
    <Layout>
      <Meta
        title="Link items to costumes"
        description="Link weapons/debris to costumes."
      />

      <section className="flex flex-col gap-y-4 p-4 md:p-8">
        <MaterialTable
          title={`${costumes.length} costumes in the database.`}
          data={costumes}
          columns={[
            {
              field: "title",
              title: "Title",
              type: "string",
              filterPlaceholder: "Search title or character...",
              render: (costume) => (
                <div className="flex items-center gap-x-2">
                  <div className="flex items-center gap-x-4 w-80 relative bg-white bg-opacity-5 rounded-lg hover:bg-opacity-20 focus-within:bg-opacity-20 transition">
                    <CostumeThumbnail
                      href={`/characters/${costume.character.slug}/${costume.slug}`}
                      src={`${CDN_URL}${costume.image_path_base}battle.png`}
                      alt={`${costume.title} thumbnail`}
                      rarity={RARITY[costume.rarity]}
                      weaponType={costume.weapon_type}
                      isDark={costume.is_ex_costume}
                    />
                    <span className="inline-block pr-12 line-clamp-2">
                      {costume.is_ex_costume && (
                        <span className="text-rarity-4">EX </span>
                      )}
                      {costume.title}
                    </span>
                  </div>
                </div>
              ),
              customFilterAndSearch: (term, costume) => {
                if (term.length === 0) return true;
                return `${costume.character.name.toLowerCase()} ${costume.title.toLowerCase()}`.includes(
                  term.toLowerCase()
                );
              },
            },
            {
              field: "weapon",
              title: "Associated Weapon",
              type: "string",
              render: (costume) => {
                const link = newLinks.find(
                  (link) => link.costume_id === costume.costume_id
                );

                const weaponLinked = weapons.find(
                  (weapon) => weapon.weapon_id === link?.weapon_id
                );

                return (
                  <WeaponThumbnail
                    href={`/weapons/${
                      costume?.weapon?.slug ?? weaponLinked.slug
                    }`}
                    image_path={weaponLinked?.image_path}
                    alt={`${weaponLinked?.name} thumbnail`}
                    rarity={
                      weaponLinked?.rarity
                        ? getBaseRarity(weaponLinked)
                        : "RARE"
                    }
                    type={weaponLinked?.weapon_type}
                    isDark={weaponLinked?.is_ex_weapon}
                    element={weaponLinked?.attribute}
                  />
                );
              },
            },
            {
              field: "events",
              title: "Costume sources",
              type: "string",
              render: (costume) => {
                const link = newLinks.find(
                  (link) => link.costume_id === costume.costume_id
                );

                const linkedEvents = link.events as Prisma.JsonArray;

                const costumeEvents = events.filter((event) =>
                  linkedEvents.includes(event.id)
                );

                return (
                  <div className="flex flex-col gap-y-4">
                    {costumeEvents.map((event) => (
                      <div key={event.id}>
                        <h2>{event.attributes.title}</h2>
                        <img
                          className="w-80 h-auto object-contain"
                          src={event.attributes.image.data.attributes?.url}
                          alt="event"
                        />
                      </div>
                    ))}
                  </div>
                );
              },
            },
          ]}
          detailPanel={({ rowData: costume }) => {
            const link = newLinks.find(
              (link) => link.costume_id === costume.costume_id
            );

            const weaponLinked = weapons.find(
              (weapon) => weapon.weapon_id === link?.weapon_id
            );

            const linkedEvents = link.events as Prisma.JsonArray;

            const costumeEvents = events.filter((event) =>
              linkedEvents.includes(event.id)
            );

            return (
              <section className="p-4">
                <div className="flex flex-col bg-grey-dark gap-y-4">
                  <WeaponSelect
                    defaultValue={weaponLinked}
                    classes="flex-1"
                    weapons={weapons}
                    onSelect={(e, value) => {
                      if (!value) return;
                      updateWeapon(costume, value);
                    }}
                    label="Add a weapon..."
                  />

                  <Autocomplete
                    value={costumeEvents ?? []}
                    multiple
                    onChange={(e, selectedEvents) =>
                      updateEvents(
                        costume,
                        selectedEvents.map(
                          (ev) => typeof ev === "object" && ev.id
                        )
                      )
                    }
                    options={events}
                    autoHighlight
                    getOptionLabel={(option) =>
                      typeof option === "object" &&
                      `${option?.attributes?.title}`
                    }
                    renderOption={(props, option) => (
                      <Box
                        key={option.id}
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        <img
                          className="object-contain"
                          loading="lazy"
                          width="200"
                          src={option.attributes.image.data.attributes.url}
                        />
                        {option.attributes.title}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Add event..."
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </div>
              </section>
            );
          }}
          options={{
            search: false,
            actionsColumnIndex: -1,
            searchFieldAlignment: "right",
            filtering: true,
            pageSize: 25,
            draggable: false,
            pageSizeOptions: [25, 50, 100, 200, 500],
          }}
        />
      </section>

      <div className="flex justify-center mt-4">
        <button onClick={save} className="btn">
          Save
        </button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const [costumesData, weaponsData, links] = await Promise.all([
    getAllCostumes({
      orderBy: {
        release_time: "desc",
      },
    }),
    getAllWeapons(),
    prisma.nrg.costumes_link.findMany({}),
  ]);

  const selectWeapons = [...weaponsData.weapons].sort(
    (a, b) => -b.weapon_type.localeCompare(a.weapon_type)
  );

  const events = await getAllEvents();

  return {
    props: JSON.parse(
      JSON.stringify({
        costumes: costumesData.costumes,
        weapons: selectWeapons,
        links,
        events,
      })
    ),
  };
}
