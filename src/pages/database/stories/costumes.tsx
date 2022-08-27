import Layout from "@components/Layout";
import Meta from "@components/Meta";
import { useEffect, useRef, useState } from "react";
import prisma from "@libs/prisma";
import { character, costume } from "@prisma/client";
import { CDN_URL } from "@config/constants";
import CostumeThumbnail from "@components/CostumeThumbnail";
import RARITY from "@utils/rarity";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { sub } from "date-fns";
import CostumeSelect from "@components/characters/CostumeSelect";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { Box } from "@mui/system";
import { StoriesNavbar } from "./index";

interface DatabaseStoriesCostumesProps {
  costumes: costume[];
  selectCostumes: {
    release_time: Date;
    slug: string;
    title: string;
    image_path_base: string;
    character: character;
  }[];
  selectCharacters: {
    slug: string;
    name: string;
    image_path: string;
  }[];
}

const DEFAULT_FROM_DATE = sub(new Date(), {
  months: 3,
});

export default function DatabaseStoriesCostumes({
  costumes,
  selectCostumes,
  selectCharacters,
}: DatabaseStoriesCostumesProps): JSX.Element {
  const router = useRouter();
  const firstUpdate = useRef(true);

  const [fromDate, setFromDate] = useState<Date | null>(DEFAULT_FROM_DATE);
  const [costumeSlug, setCostumeSlug] = useState("all");
  const [characterSlug, setCharacterSlug] = useState("all");

  useEffect(() => {
    if (firstUpdate.current) return;
    const params = new URLSearchParams();

    if (characterSlug !== "all" && costumeSlug === "all") {
      params.append("character", characterSlug);
    }
    if (costumeSlug !== "all") {
      params.append("costume", costumeSlug);
    }
    if (costumeSlug !== "all" && characterSlug !== "all") {
      setCharacterSlug("all");
      return;
    }
    if (costumeSlug === "all") {
      params.append("from", fromDate.toISOString());
    }

    router.push(`/database/stories/costumes?${params.toString()}`);
  }, [characterSlug, costumeSlug, fromDate]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
  }, []);

  function resetFilters() {
    setFromDate(DEFAULT_FROM_DATE);
    setCostumeSlug("all");
    setCharacterSlug("all");
  }

  return (
    <Layout>
      <Meta
        title="Stories - Database"
        description="Costumes stories."
        cover="https://nierrein.guide/cover-stories.jpg"
      />

      <section>
        <h2 className="overlap">Costumes stories</h2>

        <StoriesNavbar />

        <div className="flex flex-col items-center md:flex-row gap-y-4 gap-x-4 bg-grey-dark border border-beige border-opacity-50 p-4 mb-8">
          <Autocomplete
            onChange={(e, character) => {
              if (!character) {
                setCharacterSlug("all");
                return;
              }
              setCharacterSlug(character.slug);
            }}
            className="w-full md:w-72"
            options={selectCharacters}
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
                  src={`${CDN_URL}${option.image_path}`}
                />
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search character..."
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <p>or</p>
          <CostumeSelect
            costumes={selectCostumes}
            onSelect={(e, costume) => {
              if (!costume) {
                setCostumeSlug("all");
                return;
              }
              setCostumeSlug(costume.slug);
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              className="mt-4 md:mt-0"
              label="Created after"
              inputFormat="MM/dd/yyyy"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

        <div>
          {costumes.map((costume) => (
            <div
              key={costume.costume_id}
              className="flex flex-col md:flex-row gap-x-4 bg-grey-dark bordered relative p-4"
            >
              <div className="ml-auto mr-auto mb-4 md:mb-0 md:ml-0 md:mr-0">
                <CostumeThumbnail
                  src={`${CDN_URL}${costume.image_path_base}battle.png`}
                  alt={`${costume.title} thumbnail`}
                  rarity={RARITY[costume.rarity]}
                />
              </div>
              <div className="text-beige-text whitespace-pre-wrap text-base mb-4">
                <h3 className="font-labor text-center md:text-left md:text-lg text-beige mb-1">
                  {costume.title}
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${costume.description.replaceAll("\\n", "<br>")}`,
                  }}
                />
              </div>
            </div>
          ))}

          {costumes.length === 0 && (
            <div className="bg-grey-dark text-beige transition-colors w-full border-b border-beige-inactive border-opacity-50 p-8 text-center rounded-lg">
              <img
                className="inline-block"
                src="/decorations/fio-confused.png"
                alt="Fio confused"
              />
              <p className="mt-4">Sorry, no costumes found.</p>
              <div className="flex justify-center mt-4">
                <button onClick={resetFilters} className="btn">
                  Try resetting filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const where = {};

  if (Object.keys(context.query).length === 0) {
    where["release_time"] = {};
    where["release_time"]["gte"] = DEFAULT_FROM_DATE;
  }

  /**
   * Filters
   */
  if (context.query.from && !context.query.character) {
    where["release_time"] = {};
    where["release_time"]["gte"] = context.query.from;
  }

  if (context.query.costume) {
    if (context.query.costume !== "all") {
      where["slug"] = context.query.costume;
    }
  }

  if (context.query.character) {
    where["character"] = {};
    where["character"]["slug"] = context.query.character;
  }

  const costumes = await prisma.dump.costume.findMany({
    where,
    orderBy: {
      release_time: "desc",
    },
  });

  /**
   * Select autocomplete
   */

  const [selectCostumes, selectCharacters] = await Promise.all([
    prisma.dump.costume.findMany({
      orderBy: {
        costume_id: "asc",
      },
      select: {
        character: true,
        title: true,
        slug: true,
        image_path_base: true,
        release_time: true,
      },
    }),
    prisma.dump.character.findMany({
      orderBy: {
        character_id: "asc",
      },
      select: {
        name: true,
        image_path: true,
        slug: true,
      },
    }),
  ]);

  selectCostumes.sort(
    (a, b) => -b.character.name.localeCompare(a.character.name)
  );

  return {
    props: JSON.parse(
      JSON.stringify({
        costumes,
        selectCostumes,
        selectCharacters,
      })
    ),
  };
}
