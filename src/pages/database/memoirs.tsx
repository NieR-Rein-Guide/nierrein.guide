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
    <Layout>
      <Meta
        title="Memoirs - Database"
        description="All memoirs in the game."
        cover="https://nierrein.guide/database/memoirs.jpg"
      />

      <nav className="mb-16">
        <Link href="/database" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Return to Database</span>
          </a>
        </Link>
      </nav>

      <section>
        <h2 className="overlap">Memoirs</h2>

        <Tabs defaultIndex={tabIndex} onChange={(index) => setTabIndex(index)}>
          <TabList className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
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
                      src={`${CDN_URL}${dungeon.image_path}`}
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
              {memoirs.map((memoir) => (
                <div className="mb-8" key={memoir.memoir_series_id}>
                  <h3 className="text-beige text-3xl">
                    {memoir.name} ({memoir.memoir_series_id})
                  </h3>
                  <span className="text-sm text-beige-text">
                    Small set: {memoir.small_set_description}
                  </span>

                  <div className="flex gap-2 mt-4">
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
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const memoirs = await prisma.memoir_series.findMany({
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
      image_path: "ui/quest/en/banner/event_banner_100.png",
    },
    {
      name: "The Officer's Memories",
      series: [5, 6, 7, 8],
      image_path: "ui/quest/en/banner/event_banner_102.png",
    },
    {
      name: "The Witch's Memories",
      series: [3, 4, 5, 6],
      image_path: "ui/quest/en/banner/event_banner_101.png",
    },
    {
      name: "Aberrant Memories",
      series: [9, 10, 11, 12],
      image_path: "ui/quest/en/banner/event_banner_103.png",
    },
    {
      name: "Magick Memories",
      series: [13, 14],
      image_path: "ui/quest/en/banner/event_banner_104.png",
    },
    {
      name: "Cyber Memories",
      series: [15, 16],
      image_path: "ui/quest/en/banner/event_banner_105.png",
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
