import Layout from "@components/Layout";
import Meta from "@components/Meta";
import { useEffect, useRef, useState } from "react";
import prisma from "@libs/prisma";
import { companion } from "@prisma/client";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { Box } from "@mui/system";
import { StoriesNavbar } from "./index";
import { useSettingsStore } from "@store/settings";
import CompanionThumbnail from "@components/CompanionThumbnail";
import StoriesLayout from "@components/Layout/StoriesLayout";

interface DatabaseStoriesCompanionsProps {
  companions: companion[];
  allCompanions: companion[];
}

export default function DatabaseStoriesCompanions({
  companions,
  allCompanions,
}: DatabaseStoriesCompanionsProps): JSX.Element {
  const router = useRouter();
  const firstUpdate = useRef(true);

  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );

  const [companionId, setCompanionId] = useState<number | string>("all");

  useEffect(() => {
    if (firstUpdate.current) return;
    const params = new URLSearchParams();

    if (companionId !== "all") {
      params.append("companion_id", companionId.toString());
    }

    router.push(`/database/stories/companions?${params.toString()}`);
  }, [companionId]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
  }, []);

  return (
    <Layout>
      <Meta
        title="Companions Stories - Database"
        description="Companions stories."
        cover="https://nierrein.guide/cover-stories.jpg"
      />

      <StoriesLayout>
        <div className="flex flex-col items-center md:flex-row gap-y-4 gap-x-4 bg-grey-dark border border-beige border-opacity-50 p-4 mb-8">
          <Autocomplete
            onChange={(e, companion: companion) => {
              if (!companion) {
                setCompanionId("all");
                return;
              }
              setCompanionId(companion.companion_id);
            }}
            className="w-full md:w-72"
            options={allCompanions}
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
                <CompanionThumbnail companion={option} small />
                <p className="ml-2">{option.name}</p>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search companion..."
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </div>

        <div>
          {companions
            .filter((companion) => {
              if (showUnreleasedContent) return true;
              return new Date() > new Date(companion.release_time);
            })
            .map((companion) => (
              <div
                key={companion.companion_id}
                className="lg:col-start-3 lg:col-span-8 flex flex-col md:flex-row gap-x-4 bg-grey-dark bordered relative p-4"
              >
                <div className="ml-auto mr-auto mb-4 md:mb-0 md:ml-0 md:mr-0">
                  <CompanionThumbnail companion={companion} small />
                </div>
                <div>
                  <h3 className="font-labor text-center md:text-left md:text-lg text-beige mb-1">
                    {companion.name}
                  </h3>
                  <div
                    className="text-beige-text whitespace-pre-wrap text-base mt-2 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: companion.story.replaceAll("\\n", "<br>"),
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

  const where = {};

  if (context.query.companion_id) {
    where["companion_id"] = Number(context.query.companion_id);
  }

  const companions = await prisma.dump.companion.findMany({
    where,
    orderBy: {
      release_time: "desc",
    },
  });

  const allCompanions = await prisma.dump.companion.findMany();

  return {
    props: JSON.parse(
      JSON.stringify({
        companions,
        allCompanions,
      })
    ),
  };
}
