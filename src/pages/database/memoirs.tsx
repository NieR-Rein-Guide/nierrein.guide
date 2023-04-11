import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Image from "next/legacy/image";
import prisma from "@libs/prisma";
import { CDN_URL } from "@config/constants";
import * as Tabs from "@radix-ui/react-tabs";
import TierListTab from "@components/tierlist/TierListTab";
import slug from "slugg";
import { useState } from "react";
import { memoir, memoir_series } from "@prisma/client";
import DatabaseNavbar from "@components/DatabaseNavbar";
import { Chip } from "@mui/material";
import { getEventById } from "@models/event";
import { Event } from "@models/types";
import { EventItem } from "pages/events";

export const dungeons = [
  {
    name: "The Dynast's Memories",
    series: [1, 2, 3, 4],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_100.png`,
  },
  {
    name: "The Officer's Memories",
    series: [5, 6, 7, 8],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_102.png`,
  },
  {
    name: "The Witch's Memories",
    series: [3, 4, 5, 6],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_101.png`,
  },
  {
    name: "Aberrant Memories",
    series: [9, 10, 11, 12],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_103.png`,
  },
  {
    name: "Magick Memories",
    series: [13, 14],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_104.png`,
  },
  {
    name: "Cyber Memories",
    series: [15, 16],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_105.png`,
  },
  {
    name: "Desert Memories",
    series: [17, 18],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_106.png`,
  },
];

export const variations = [
  {
    name: "Variation: Tempestuous Senior Officer",
    eventId: 1,
    memoirs_ids: [8140, 8160, 8180],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_302.png`,
  },
  {
    name: "Variation: Cascading Armed Aberration",
    eventId: 12,
    memoirs_ids: [8200, 8220, 8240],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_303.png`,
  },
  {
    name: "Variation: Aurora Daemon",
    eventId: 17,
    memoirs_ids: [8260, 8280, 8300],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_304.png`,
  },
  {
    name: "Variation: Cascading Blossom",
    eventId: 21,
    memoirs_ids: [8320, 8340, 8360],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_305.png`,
  },
  {
    name: "Variation: Gloomy Resentful Witch",
    eventId: 219,
    memoirs_ids: [8380, 8400, 8420],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_306.png`,
  },
  {
    name: "Variation: Blazing Armed Aberration",
    eventId: 218,
    memoirs_ids: [8440, 8460, 8480],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_307.png`,
  },
  {
    name: "Variation: Cascading Daemon",
    eventId: 217,
    memoirs_ids: [8500, 8520, 8540],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_308.png`,
  },
  {
    name: "Variation: Aurora Dynast",
    eventId: 29,
    memoirs_ids: [8020, 8040, 8060],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_300.png`,
  },
  {
    name: "Variation: Aurora Blossom",
    eventId: 36,
    memoirs_ids: [8560, 8580, 8600],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_309.png`,
  },
  {
    name: "Variation: Blazing Resentful Witch",
    eventId: 39,
    memoirs_ids: [8080, 8100, 8120],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_301.png`,
  },
  {
    name: "Variation: Gloomy Armed Aberration",
    eventId: 60,
    memoirs_ids: [8920, 8940, 8960],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_315.png`,
  },
  {
    name: "Variation: Cascading Mage",
    eventId: 69,
    memoirs_ids: [8980, 9000, 9020],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_316.png`,
  },
  {
    name: "Variation: Aurora Phantom",
    eventId: 90,
    memoirs_ids: [9040, 9060, 9080],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_318.png`,
  },
  /* {
    name: "Variation: Puppets Parrah-Noya",
    eventId: 109,
    memoirs_ids: [],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_317.png`,
  }, */
  {
    name: "Variation: Blazing Dynast",
    eventId: 127,
    memoirs_ids: [9100, 9120, 9140],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_321.png`,
  },
  {
    name: "Variation: Tempestuous Daemon",
    eventId: 153,
    memoirs_ids: [9160, 9180, 9200],
    image_path: `${CDN_URL}ui/quest/en/banner/event_banner_322.png`,
  },
];

interface MemoirByDungeonsInterface {
  name: string;
  series: number[];
  image_path: string;
  memoirs: (memoir_series & {
    memoir: memoir[];
  })[];
}

interface MemoirByVariationInterface {
  name: string;
  eventId: number;
  image_path: string;
  event: Event;
  memoirs: (memoir & {
    serie: memoir_series;
  })[];
}

interface DatabaseMemoirsProps {
  memoirs: memoir[];
  memoirsByDungeons: MemoirByDungeonsInterface[];
  memoirsByVariations: MemoirByVariationInterface[];
}

const TABS = [
  {
    index: 0,
    label: "By dungeons",
    slug: slug("By dungeons"),
  },
  {
    index: 1,
    label: "By variations",
    slug: slug("By variations"),
  },
  {
    index: 2,
    label: "By sets",
    slug: slug("By sets"),
  },
];

export default function MemoirsPage({
  memoirs,
  memoirsByDungeons,
  memoirsByVariations,
}: DatabaseMemoirsProps): JSX.Element {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Layout hasContainer={false} className="overflow-x-auto max-w-7xl">
      <Meta
        title="Memoirs - Database"
        description="All memoirs in the game."
        cover="https://nierrein.guide/database/memoirs.jpg"
      />

      <section className="p-6">
        <DatabaseNavbar />

        <Tabs.Root
          className="mt-4"
          defaultValue={TABS[0].slug}
          onChange={(index) => setTabIndex(index)}
        >
          <Tabs.List className="grid md:grid-cols-3 gap-8 mb-8">
            {TABS.map((tab) => (
              <TierListTab key={tab.slug} index={tab.slug}>
                {tab.label}
              </TierListTab>
            ))}
          </Tabs.List>

          <Tabs.Content value={TABS[0].slug} className="space-y-16">
            {memoirsByDungeons.map((dungeon) => (
              <div key={dungeon.name}>
                <div className="flex flex-col justify-center items-center">
                  <Image
                    src={dungeon.image_path}
                    layout="intrinsic"
                    height={424}
                    width={348}
                  />

                  <h3 className="text-3xl mt-2 mb-6">{dungeon.name}</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {dungeon.memoirs.map((serie) => (
                    <div
                      key={serie.memoir_series_id}
                      className="flex flex-col items-center justify-center bg-grey-dark border border-beige border-opacity-50 p-4 w-full"
                    >
                      <h3 className="text-beige text-center text-3xl mb-2">
                        {serie.name}
                      </h3>
                      <div className="hidden md:flex flex-col items-center gap-2 mt-1">
                        <Chip
                          label={serie.large_set_description}
                          color="primary"
                        />
                        <Chip
                          className="text-xs"
                          label={`2 pieces: ${serie.small_set_description}`}
                          variant="outlined"
                        />
                      </div>

                      <div className="md:hidden text-center">
                        <p className="text-sm text-beige-text">
                          {serie.large_set_description}
                        </p>
                        <p className="text-xs text-beige-text mt-2">
                          2 pieces: {serie.small_set_description}
                        </p>
                      </div>
                      <div
                        key={serie.memoir_series_id}
                        className="flex flex-wrap justify-center gap-4 mt-6 max-w-sm mx-auto border-beige border-opacity-20"
                      >
                        {serie.memoir.map((memoir) => (
                          <div className="relative" key={memoir.memoir_id}>
                            <div className="mx-auto h-16 w-16 md:h-24 md:w-24">
                              <Image
                                layout="responsive"
                                width={96}
                                height={96}
                                src={`${CDN_URL}${memoir.image_path_base}full.png`}
                                alt={memoir.name}
                              />
                            </div>
                            <a
                              href={`/database/stories/memoirs?memoir_series_id=${memoir.series_id}`}
                              className="hidden text-xs font-mono z-10 text-shadow text-beige md:inline-block md:w-28 text-center hover:underline"
                            >
                              {memoir.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Tabs.Content>
          <Tabs.Content value={TABS[1].slug} className="space-y-16">
            {memoirsByVariations.map((variation) => (
              <div key={variation.name}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <EventItem {...variation.event} />

                  <div
                    key={variation.eventId}
                    className="flex flex-col items-center justify-center bg-grey-dark border border-beige border-opacity-50 p-4 w-full"
                  >
                    <h3 className="text-beige text-3xl">
                      {variation.memoirs[0].serie.name}
                    </h3>
                    <div className="hidden md:flex flex-col items-center gap-2 mt-1">
                      <Chip
                        label={variation.memoirs[0].serie.large_set_description}
                        color="primary"
                      />
                      <Chip
                        className="text-xs"
                        label={`2 pieces: ${variation.memoirs[0].serie.small_set_description}`}
                        variant="outlined"
                      />
                    </div>

                    <div className="md:hidden text-center">
                      <p className="text-sm text-beige-text">
                        {variation.memoirs[0].serie.large_set_description}
                      </p>
                      <p className="text-xs text-beige-text mt-2">
                        2 pieces:{" "}
                        {variation.memoirs[0].serie.small_set_description}
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mt-2 max-w-sm mx-auto border-beige border-opacity-20">
                      {variation.memoirs.map((memoir) => (
                        <div className="relative" key={memoir.memoir_id}>
                          <div className="mx-auto h-16 w-16 md:h-24 md:w-24">
                            <Image
                              layout="responsive"
                              width={96}
                              height={96}
                              src={`${CDN_URL}${memoir.image_path_base}full.png`}
                              alt={memoir.name}
                            />
                          </div>
                          <a
                            href={`/database/stories/memoirs?memoir_series_id=${memoir.series_id}`}
                            className="hidden text-xs font-mono z-10 text-shadow text-beige md:inline-block md:w-28 text-center hover:underline"
                          >
                            {memoir.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Tabs.Content>
          <Tabs.Content value={TABS[2].slug}>
            <div className="grid grid-cols-1 md:grid-cols-2 place-items-center text-center gap-8">
              {memoirs.map((memoir) => (
                <div
                  key={memoir.series_id}
                  className="bg-grey-dark border border-beige border-opacity-50 p-4 w-full"
                >
                  <h3 className="text-beige text-3xl">{memoir.name}</h3>
                  <div className="hidden md:flex flex-col items-center gap-2 mt-1">
                    <Chip
                      label={memoir.large_set_description}
                      color="primary"
                    />
                    <Chip
                      className="text-xs"
                      label={`2 pieces: ${memoir.small_set_description}`}
                      variant="outlined"
                    />
                  </div>

                  <div className="md:hidden text-center">
                    <p className="text-sm text-beige-text">
                      {memoir.large_set_description}
                    </p>
                    <p className="text-xs text-beige-text mt-2">
                      2 pieces: {memoir.small_set_description}
                    </p>
                  </div>

                  <div className="flex justify-center gap-2 mt-4">
                    {memoir.memoir
                      .filter((memoir) => !memoir.is_variation_memoir)
                      .map((memoir) => (
                        <div className="relative" key={memoir.memoir_id}>
                          <div className="mx-auto h-16 w-16 md:h-24 md:w-24">
                            <Image
                              layout="responsive"
                              width={96}
                              height={96}
                              src={`${CDN_URL}${memoir.image_path_base}full.png`}
                              alt={memoir.name}
                            />
                          </div>
                          <a
                            href={`/database/stories/memoirs?memoir_series_id=${memoir.series_id}`}
                            className="hidden text-xs font-mono z-10 text-shadow text-beige md:inline-block md:w-28 text-center hover:underline"
                          >
                            {memoir.name}
                          </a>
                        </div>
                      ))}
                  </div>
                  {memoir.memoir.some((mem) => mem.is_variation_memoir) && (
                    <h2 className="text-beige text-2xl mt-4 underline">
                      Variation memoirs
                    </h2>
                  )}
                  <div className="flex flex-wrap justify-center gap-4 mt-2 max-w-sm mx-auto border-l border-r border-beige border-opacity-20">
                    {memoir.memoir
                      .filter((mem) => mem.is_variation_memoir)
                      .sort((a, b) => a.memoir_id - b.memoir_id)
                      .map((mem) => (
                        <div className="relative" key={mem.memoir_id}>
                          <div className="mx-auto h-16 w-16 md:h-24 md:w-24">
                            <Image
                              layout="responsive"
                              width={96}
                              height={96}
                              src={`${CDN_URL}${mem.image_path_base}full.png`}
                              alt={mem.name}
                            />
                          </div>
                          <a
                            href={`/database/stories/memoirs?memoir_series_id=${mem.memoir_series_id}`}
                            className="hidden text-xs font-mono z-10 text-shadow text-beige md:inline-block md:w-28 text-center hover:underline"
                          >
                            {mem.name}
                          </a>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const memoirs = await prisma.dump.memoir_series.findMany({
    orderBy: {
      memoir_series_id: "asc",
    },
    include: {
      memoir: {
        where: {
          lottery_id: 5,
          rarity: "SS_RARE",
        },
      },
    },
  });

  const memoirsByDungeons = dungeons.map((dungeon) => {
    const matchedMemoirs = dungeon.series
      .map((serieId) => memoirs[serieId - 1])
      .map((serie) => ({
        ...serie,
        memoir: serie.memoir.filter((mem) => !mem.is_variation_memoir),
      }));

    return {
      ...dungeon,
      memoirs: matchedMemoirs,
    };
  });

  const memoirsByVariations = await Promise.all(
    variations.map(async (variation) => {
      const allMemoirs = memoirs.map((memoir) => memoir.memoir).flat();
      const matchedMemoirs = allMemoirs
        .filter((memoir) => variation.memoirs_ids.includes(memoir.memoir_id))
        .map((mem) => ({
          ...mem,
          serie: memoirs.find((m) => m.memoir_series_id === mem.series_id),
        }));

      const event = await getEventById(variation.eventId);

      return {
        ...variation,
        memoirs: matchedMemoirs,
        event,
      };
    })
  );

  return {
    props: JSON.parse(
      JSON.stringify({
        memoirs,
        memoirsByDungeons,
        memoirsByVariations,
      })
    ),
  };
}
