import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";
import SVG from "react-inlinesvg";
import prisma from "@libs/prisma";
import classNames from "classnames";
import { useRouter } from "next/router";

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
  {
    label: "Events/EX (CMS data)",
    href: "/database/stories/content",
  },
  /* {
    label: "Characters",
    href: "#",
  },
  {
    label: "Events",
    href: "#",
  },
  {
    label: "Main story",
    href: "#",
  },
  {
    label: "Hidden stories",
    href: "#",
  }, */
];

export default function DatabaseStories(): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Stories - Database"
        description="Stories for costumes and weapons."
        cover="https://nierrein.guide/cover-stories.jpg"
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
        <h2 className="overlap">Stories</h2>

        <StoriesNavbar />
      </section>
    </Layout>
  );
}

export function StoriesNavbar() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 p-4 bg-grey-foreground border border-beige border-opacity-30">
      {ITEMS.map((item) => (
        <Link key={item.label} href={item.href}>
          <a
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
          </a>
        </Link>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const [costumes, selectCostumes] = await Promise.all([
    prisma.dump.costume.findMany({
      orderBy: {
        character_id: "asc",
      },
    }),
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
  ]);

  selectCostumes.sort(
    (a, b) => -b.character.name.localeCompare(a.character.name)
  );

  return {
    props: JSON.parse(
      JSON.stringify({
        costumes,
        selectCostumes,
      })
    ),
    revalidate: 86400,
  };
}
