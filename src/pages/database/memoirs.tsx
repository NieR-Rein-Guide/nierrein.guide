import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";
import Image from "next/image";
import SVG from "react-inlinesvg";
import prisma from "@libs/prisma";
import { memoir, memoir_series } from "@prisma/client";
import { CDN_URL } from "@config/constants";

interface DatabaseMemoirsProps {
  memoirs: (memoir_series & {
    memoir: memoir[];
  })[];
}

export default function MemoirsPage({
  memoirs,
}: DatabaseMemoirsProps): JSX.Element {
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

        {memoirs.map((memoir) => (
          <div className="mb-8" key={memoir.memoir_series_id}>
            <h3 className="text-beige text-3xl">
              {memoir.large_set_description}
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

  return {
    props: JSON.parse(
      JSON.stringify({
        memoirs,
      })
    ),
  };
}
