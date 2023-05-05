import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";
import SVG from "react-inlinesvg";
import prisma from "@libs/prisma";
import classNames from "classnames";
import { useRouter } from "next/router";
import {
  main_quest_chapters,
  main_quest_routes,
  main_quest_seasons,
} from "@prisma/client";

const ITEMS = [
  {
    label: "Costumes",
    href: "/database/stories/costumes",
  },
  {
    label: "Weapons",
    href: "/database/stories/weapons",
  },
  {
    label: "Companions",
    href: "/database/stories/companions",
  },
  {
    label: "Memoirs",
    href: "/database/stories/memoirs",
  },
];

interface Props {
  main_quest_seasons: (main_quest_seasons & {
    main_quest_routes: (main_quest_routes & {
      main_quest_chapters: main_quest_chapters[];
    })[];
  })[];
}

export default function DatabaseStories({
  main_quest_seasons,
}: Props): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Stories - Database"
        description="Stories for costumes and weapons."
        cover="https://nierrein.guide/cover-stories.jpg"
      />

      <nav className="mb-16">
        <Link href="/database" passHref={true} className="btn">
          <SVG src="/decorations/arrow-left.svg" className="h-6" />
          <span>Return to Database</span>
        </Link>
      </nav>

      <section>
        <h2 className="overlap">Stories</h2>

        <div className="grid-cols-2">
          <StoriesNavbar />

          <div className="bg-black">
            {main_quest_seasons.map((season) => (
              <div key={season.season_id}>
                <h2 className="text-5xl">{season.season_name}</h2>

                <div className="pl-4">
                  {season.main_quest_routes.map((route) => (
                    <div key={route.route_id}>
                      <h3 className="text-3xl text-beige">
                        {route.route_name}
                      </h3>

                      {route.main_quest_chapters.map((chapter) => (
                        <div className="pl-4" key={chapter.chapter_id}>
                          <h4 className="text-2xl text-beige">
                            {chapter.chapter_title}
                          </h4>
                          {chapter.stories.map((story, index) => (
                            <div key={index}>
                              <p
                                className="whitespace-pre mb-4 pl-4"
                                dangerouslySetInnerHTML={{ __html: story }}
                              ></p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export function StoriesNavbar() {
  const router = useRouter();

  return (
    <aside className="flex flex-col p-4 bg-grey-foreground border border-beige border-opacity-30">
      {ITEMS.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={classNames(
            "flex items-center justify-center text-center p-4 transition-colors ease-out-cubic relative bordered",
            router.asPath.includes(item.href)
              ? "active bg-beige active"
              : "bg-grey-lighter"
          )}
        >
          <span
            className={classNames(
              "font-display font-bold text-xl tracking-wider transition-colors ease-out-cubic",
              router.asPath.includes(item.href)
                ? "text-grey-lighter"
                : "text-beige"
            )}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </aside>
  );
}

export async function getStaticProps() {
  const main_quest_seasons = await prisma.dump.main_quest_seasons.findMany({
    orderBy: {
      order: "asc",
    },
    include: {
      main_quest_routes: {
        include: {
          main_quest_chapters: true,
        },
      },
    },
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        main_quest_seasons,
      })
    ),
    revalidate: 86400,
  };
}
