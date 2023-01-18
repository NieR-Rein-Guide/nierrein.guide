import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";
import Image from "next/image";
import SVG from "react-inlinesvg";
import prisma from "@libs/prisma";
import { CDN_URL } from "@config/constants";
import { Tabs, TabList, TabPanels, TabPanel } from "@reach/tabs";
import TierListTab from "@components/tierlist/TierListTab";
import slug from "slugg";
import { useState } from "react";
import { memoir, memoir_series } from "@prisma/client";
import DatabaseNavbar from "@components/DatabaseNavbar";

interface MemoirByDungeonsInterface {
  name: string;
  series: number[];
  image_path: string;
  memoirs: (memoir_series & {
    memoir: memoir[];
  })[];
}

interface DatabaseMemoirsProps {
  memoirs: (memoir_series & {
    memoir: memoir[];
  })[];
  memoirsByDungeons: MemoirByDungeonsInterface[];
}

const TABS = [
  {
    index: 0,
    label: "By dungeons",
    slug: slug("By dungeons"),
  },
  {
    index: 1,
    label: "By sets",
    slug: slug("By sets"),
  },
];

export default function MemoirsPage({
  memoirs,
  memoirsByDungeons,
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

        <Tabs
          className="mt-4"
          defaultIndex={tabIndex}
          onChange={(index) => setTabIndex(index)}
        >
          <TabList className="grid grid-cols-2 gap-8 mb-8">
            {TABS.map((tab) => (
              <TierListTab key={tab.index} index={tab.index}>
                {tab.label}
              </TierListTab>
            ))}
          </TabList>

          <TabPanels>
            <TabPanel className="space-y-16">
              {memoirsByDungeons.map((dungeon) => (
                <div className="wysiwyg" key={dungeon.name}>
                  <div className="flex flex-col justify-center items-center">
                    <Image
                      src={dungeon.image_path}
                      layout="intrinsic"
                      height={424}
                      width={348}
                    />

                    <h3 className="overlap">{dungeon.name}</h3>
                  </div>

                  <table>
                    <tbody>
                      {dungeon.memoirs.map((serie) => (
                        <tr key={serie.memoir_series_id}>
                          <td>
                            <ul>
                              <li>
                                <strong>
                                  Large set: {serie.large_set_description}
                                </strong>
                              </li>
                              <li>
                                <i>Small set: {serie.small_set_description}</i>
                              </li>
                            </ul>
                          </td>
                          <td className="text-center">
                            <div className="flex justify-center gap-2 mt-4">
                              {serie.memoir.map((memoir) => (
                                <div
                                  className="relative"
                                  key={memoir.memoir_id}
                                >
                                  <Image
                                    width={96}
                                    height={96}
                                    src={`${CDN_URL}${memoir.image_path_base}full.png`}
                                    alt=""
                                  />
                                </div>
                              ))}
                            </div>
                            <small>{serie.name}</small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </TabPanel>
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 place-items-center text-center gap-8">
                {memoirs.map((memoir) => (
                  <div key={memoir.memoir_series_id}>
                    <h3 className="text-beige text-3xl">{memoir.name}</h3>
                    <p className="text-sm text-beige-text">
                      {memoir.large_set_description}
                    </p>
                    <p className="text-xs text-beige-text">
                      2 pieces: {memoir.small_set_description}
                    </p>

                    <div className="flex justify-center gap-2 mt-4">
                      {memoir.memoir.map((memoir) => (
                        <div className="relative" key={memoir.memoir_id}>
                          <Image
                            width={96}
                            height={96}
                            src={`${CDN_URL}${memoir.image_path_base}full.png`}
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
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

  const memoirsByDungeons = [
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
      name: "TBA",
      series: [17, 18],
      image_path: "/images/tba-dungeon.jpg",
    },
  ].map((dungeon) => {
    const matchedMemoirs = dungeon.series.map(
      (serieId) => memoirs[serieId - 1]
    );
    return {
      ...dungeon,
      memoirs: matchedMemoirs,
    };
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        memoirs,
        memoirsByDungeons,
      })
    ),
  };
}
