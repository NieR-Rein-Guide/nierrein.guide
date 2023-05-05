import Layout from "@components/Layout";
import Meta from "@components/Meta";
import { useEffect, useRef, useState } from "react";
import prisma from "@libs/prisma";
import { memoir, memoir_series } from "@prisma/client";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { Box } from "@mui/system";
import { StoriesNavbar } from "./index";
import { useSettingsStore } from "@store/settings";
import MemoirThumbnail from "@components/MemoirThumbnail";
import StoriesLayout from "@components/Layout/StoriesLayout";

interface DatabaseStoriesMemoirsProps {
  memoirs: (memoir & {
    memoir_series: memoir_series;
  })[];
  memoirsSeries: memoir_series[];
}

export default function DatabaseStoriesMemoirs({
  memoirs,
  memoirsSeries,
}: DatabaseStoriesMemoirsProps): JSX.Element {
  const router = useRouter();
  const firstUpdate = useRef(true);

  const [serieId, setSerieId] = useState<number | string>("all");

  useEffect(() => {
    if (firstUpdate.current) return;
    const params = new URLSearchParams();

    if (serieId !== "all") {
      params.append("memoir_series_id", serieId.toString());
    }

    router.push(`/database/stories/memoirs?${params.toString()}`);
  }, [serieId]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
  }, []);

  return (
    <Layout>
      <Meta
        title="Memoirs Stories - Database"
        description="Memoirs stories."
        cover="https://nierrein.guide/cover-stories.jpg"
      />

      <StoriesLayout>
        <div className="flex flex-col items-center md:flex-row gap-y-4 gap-x-4 bg-grey-dark border border-beige border-opacity-50 p-4 mb-8">
          <Autocomplete
            onChange={(e, serie: memoir_series) => {
              if (!serie) {
                setSerieId("all");
                return;
              }
              setSerieId(serie.memoir_series_id);
            }}
            className="w-full md:w-72"
            options={memoirsSeries}
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
                <p className="ml-2">{option.name}</p>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search memoir serie..."
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </div>

        <div>
          {memoirs.map((memoir) => (
            <div
              key={memoir.memoir_id}
              className="lg:col-start-3 lg:col-span-8 flex flex-col md:flex-row gap-x-4 bg-grey-dark bordered relative p-4"
            >
              <div className="ml-auto mr-auto mb-4 md:mb-0 md:ml-0 md:mr-0">
                <MemoirThumbnail {...memoir} />
              </div>
              <div>
                <h3 className="font-labor text-center md:text-left md:text-lg text-beige mb-1">
                  {memoir.name} [{memoir.memoir_series.name}]
                </h3>
                <div
                  className="text-beige-text whitespace-pre-wrap text-base mt-2 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: memoir.story.replaceAll("\\n", "<br>"),
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </StoriesLayout>
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  /**
   * Filters
   */

  const where = {
    lottery_id: 5,
    rarity: "SS_RARE",
  };

  if (context.query.memoir_series_id) {
    where["memoir_series"] = {};
    where["memoir_series"]["memoir_series_id"] = Number(
      context.query.memoir_series_id
    );
  }

  const memoirs = await prisma.dump.memoir.findMany({
    where,
    orderBy: {
      release_time: "desc",
    },
    include: {
      memoir_series: true,
    },
  });

  const memoirsSeries = await prisma.dump.memoir_series.findMany();

  return {
    props: JSON.parse(
      JSON.stringify({
        memoirs,
        memoirsSeries,
      })
    ),
  };
}
