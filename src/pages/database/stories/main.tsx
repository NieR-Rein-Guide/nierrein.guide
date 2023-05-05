import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";
import SVG from "react-inlinesvg";
import prisma from "@libs/prisma";
import {
  main_quest_chapter,
  main_quest_route,
  main_quest_season,
} from "@prisma/client";
import { CDN_URL } from "@config/constants";
import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Squares from "@components/decorations/Squares";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import StoriesLayout from "@components/Layout/StoriesLayout";

interface Props {
  main_quest_season: (main_quest_season & {
    main_quest_route: (main_quest_route & {
      main_quest_chapter: main_quest_chapter[];
    })[];
  })[];
}

export default function DatabaseStories({
  main_quest_season,
}: Props): JSX.Element {
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [routeIndex, setRouteIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);

  const hasNextSeason = main_quest_season.length > seasonIndex + 1;
  const hasNextRoute =
    main_quest_season[seasonIndex].main_quest_route.length > routeIndex + 1;
  const hasNextChapter =
    main_quest_season[seasonIndex].main_quest_route[routeIndex]
      .main_quest_chapter.length >
    chapterIndex + 1;

  const hasPreviousSeason = !!main_quest_season[seasonIndex - 1];
  const hasPreviousRoute =
    !!main_quest_season[seasonIndex].main_quest_route[routeIndex - 1];
  const hasPreviousChapter =
    !!main_quest_season[seasonIndex].main_quest_route[routeIndex]
      .main_quest_chapter[chapterIndex - 1];

  function handlePrevious() {
    if (hasPreviousChapter) {
      setChapterIndex(chapterIndex - 1);
      return;
    }

    if (hasPreviousSeason) {
      setChapterIndex(0);
      setRouteIndex(0);
      setSeasonIndex(seasonIndex - 1);
      return;
    }
  }

  function handleNext() {
    if (hasNextChapter) {
      setChapterIndex(chapterIndex + 1);
      return;
    }

    if (hasNextRoute) {
      setChapterIndex(0);
      setRouteIndex(routeIndex + 1);
      return;
    }

    if (hasNextSeason) {
      setChapterIndex(0);
      setRouteIndex(routeIndex + 1);
      setSeasonIndex(seasonIndex + 1);
      return;
    }
  }

  return (
    <Layout>
      <Meta
        title="Main story - Database"
        description="Main story"
        cover="https://nierrein.guide/cover-stories.jpg"
      />

      <nav className="mb-16">
        <Link href="/database" passHref={true} className="btn">
          <SVG src="/decorations/arrow-left.svg" className="h-6" />
          <span>Return to Database</span>
        </Link>
      </nav>

      <StoriesLayout>
        <div className="relative">
          <div className="flex items-center gap-y-4 gap-x-4 bg-grey-dark border border-beige border-opacity-50 p-4 mb-8">
            <FormControl className="flex-1">
              <InputLabel id="season-index">Arc</InputLabel>
              <Select
                labelId="season-index"
                value={seasonIndex}
                label="Type"
                onChange={(e) => {
                  setChapterIndex(0);
                  setRouteIndex(0);
                  setSeasonIndex(Number(e.target.value));
                }}
              >
                {main_quest_season.map((season, index) => (
                  <MenuItem key={season.season_id} value={index}>
                    {season.season_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="flex-1">
              <InputLabel id="season-index">Route</InputLabel>
              <Select
                disabled={
                  main_quest_season[seasonIndex].main_quest_route.length === 0
                }
                labelId="season-index"
                value={routeIndex}
                label="Type"
                onChange={(e) => {
                  setChapterIndex(0);
                  setRouteIndex(Number(e.target.value));
                }}
              >
                {main_quest_season[seasonIndex].main_quest_route.map(
                  (route, index) => (
                    <MenuItem key={route.route_id} value={index}>
                      {route.route_name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            <FormControl className="flex-1">
              <InputLabel id="season-index">Chapter</InputLabel>
              <Select
                labelId="season-index"
                value={chapterIndex}
                label="Type"
                onChange={(e) => setChapterIndex(Number(e.target.value))}
              >
                {main_quest_season[seasonIndex].main_quest_route[
                  routeIndex
                ].main_quest_chapter.map((chapter, index) => (
                  <MenuItem key={chapter.chapter_id} value={index}>
                    {chapter.chapter_title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <article>
            {main_quest_season
              .filter((season, index) => index === seasonIndex)
              .map((season) => (
                <div key={season.season_id}>
                  {season.main_quest_route
                    .filter((route, index) => index === routeIndex)
                    .map((route) => (
                      <div key={route.route_id}>
                        {route.main_quest_chapter
                          .filter((route, index) => index === chapterIndex)
                          .map((chapter) => (
                            <div
                              className="relative bordered bg-grey-dark p-4 rounded-lg"
                              key={chapter.chapter_id}
                            >
                              <div className="rounded-lg bg-grey-lighter p-4 mb-4">
                                <h2 className="text-5xl">
                                  {season.season_name} - {chapter.chapter_title}
                                </h2>
                              </div>

                              {chapter.stories?.map(
                                ({ story, image_path }, index) => (
                                  <div key={index} className="my-4">
                                    <img
                                      className="mb-4"
                                      src={`${CDN_URL}${image_path}`}
                                      alt={`Story ${index + 1} image`}
                                      loading="lazy"
                                    />
                                    <p
                                      className="whitespace-pre-wrap mb-4 pl-4"
                                      dangerouslySetInnerHTML={{
                                        __html: story,
                                      }}
                                    ></p>
                                  </div>
                                )
                              )}

                              <Squares />
                            </div>
                          ))}
                      </div>
                    ))}
                </div>
              ))}
          </article>
          <nav className="sticky bottom-0 bg-grey-lighter rounded-t-xl flex border-t border-beige justify-between mt-4 w-full left-0 right-0 p-4 z-10">
            <Button
              disabled={
                !hasPreviousSeason && !hasPreviousRoute && !hasPreviousChapter
              }
              color="primary"
              variant="outlined"
              onClick={handlePrevious}
              startIcon={<FiArrowLeft />}
            >
              Previous
            </Button>

            <Button
              color="primary"
              variant="outlined"
              onClick={handleNext}
              endIcon={<FiArrowRight />}
            >
              Next
            </Button>
          </nav>
        </div>
      </StoriesLayout>
    </Layout>
  );
}

export async function getStaticProps() {
  const main_quest_season = await prisma.dump.main_quest_season.findMany({
    orderBy: {
      order: "asc",
    },
    include: {
      main_quest_route: {
        include: {
          main_quest_chapter: true,
        },
      },
    },
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        main_quest_season,
      })
    ),
  };
}
