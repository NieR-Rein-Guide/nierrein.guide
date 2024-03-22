import Layout from "@components/Layout";
import Meta from "@components/Meta";
import { useState } from "react";
import prisma from "@libs/prisma";
import { weapon, weapon_story, weapon_story_link } from "@prisma/client";
import { CDN_URL } from "@config/constants";
import RARITY from "@utils/rarity";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { sub } from "date-fns";
import { Box } from "@mui/system";
import WeaponThumbnail from "@components/WeaponThumbnail";
import StoriesLayout from "@components/Layout/StoriesLayout";

interface DatabaseStoriesWeaponsProps {
  weapons: (weapon & {
    weapon_story_link: (weapon_story_link & {
      weapon_story: weapon_story;
    })[];
  })[];
  selectWeapons: {
    slug: string;
    name: string;
    image_path: string;
  }[];
}

const DEFAULT_FROM_DATE = sub(new Date(), {
  months: 3,
});

export default function DatabaseStoriesWeapons({
  weapons,
  selectWeapons,
}: DatabaseStoriesWeaponsProps): JSX.Element {
  const [weaponSlug, setWeaponSlug] = useState("all");

  function resetFilters() {
    setWeaponSlug("all");
  }

  return (
    <Layout>
      <Meta
        title="Weapons - Database"
        description="Weapons stories."
        cover="https://nierrein.guide/cover-stories.jpg"
      />

      <StoriesLayout>
        <div className="flex flex-col items-center md:flex-row gap-y-4 gap-x-4 bg-grey-dark border border-beige border-opacity-50 p-4 mb-8">
          <Autocomplete
            onChange={(e, weapon) => {
              if (!weapon) {
                setWeaponSlug("all");
                return;
              }
              setWeaponSlug(weapon.slug);
            }}
            className="w-full md:w-72"
            options={selectWeapons}
            getOptionLabel={(option) =>
              typeof option === "object" && `${option.name}`
            }
            autoHighlight
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="40"
                  height="40"
                  src={`${CDN_URL}${option.image_path}standard.png`}
                />
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search weapon..."
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </div>

        <div>
          {weapons
            .filter((weapon) => {
              if (weaponSlug === 'all') return true;
              return weapon.slug === weaponSlug;
            })
            .map((weapon) => (
              <div
                key={weapon.weapon_id}
                className="lg:col-start-3 lg:col-span-8 flex flex-col md:flex-row gap-x-4 bg-grey-dark bordered relative p-4"
              >
                <div className="ml-auto mr-auto mb-4 md:mb-0 md:ml-0 md:mr-0">
                  <WeaponThumbnail
                    href={`/weapons/${weapon.slug}`}
                    image_path={weapon.image_path}
                    alt={`${weapon.name} thumbnail`}
                    rarity={RARITY[weapon.rarity]}
                    type={weapon.weapon_type}
                    isDark={weapon.is_ex_weapon}
                    element={weapon.attribute}
                  />
                </div>
                <div>
                  <h3 className="font-labor text-center md:text-left md:text-lg text-beige mb-1">
                    {weapon.name}
                  </h3>
                  {weapon.weapon_story_link.map((story) => (
                    <div
                      key={story.weapon_story_id}
                      className="text-beige-text whitespace-pre-wrap text-base mt-2 mb-4"
                      dangerouslySetInnerHTML={{
                        __html: story.weapon_story.story.replaceAll(
                          "\\n",
                          "<br>"
                        ),
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}

          {weapons.length === 0 && (
            <div className="bg-grey-dark text-beige transition-colors w-full border-b border-beige-inactive border-opacity-50 p-8 text-center rounded-lg">
              <img
                className="inline-block"
                src="/decorations/fio-confused.png"
                alt="Fio confused"
              />
              <p className="mt-4">Sorry, no weapons found.</p>
              <div className="flex justify-center mt-4">
                <button onClick={resetFilters} className="btn">
                  Try resetting filters
                </button>
              </div>
            </div>
          )}
        </div>
      </StoriesLayout>
    </Layout>
  );
}

export async function getStaticProps() {
  const where = {
    evolution_order: 1,
  };

  const weapons = await prisma.dump.weapon.findMany({
    where,
    orderBy: {
      release_time: "desc",
    },
    include: {
      weapon_story_link: {
        include: {
          weapon_story: true,
        },
      },
    },
  });

  /**
   * Select autocomplete
   */

  const [selectWeapons] = await Promise.all([
    prisma.dump.weapon.findMany({
      where: {
        evolution_order: 1,
      },
      orderBy: {
        weapon_id: "asc",
      },
      select: {
        name: true,
        slug: true,
        image_path: true,
      },
    }),
  ]);

  return {
    props: JSON.parse(
      JSON.stringify({
        weapons,
        selectWeapons,
      })
    ),
  };
}
