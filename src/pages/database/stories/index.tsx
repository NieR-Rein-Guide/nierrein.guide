import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";
import SVG from "react-inlinesvg";
import classNames from "classnames";
import { useRouter } from "next/router";

const ITEMS = [
  {
    label: "Main story",
    href: "/database/stories/main",
  },
  {
    label: "Characters",
    href: "/database/stories/character",
  },
  {
    label: "EX characters",
    href: "/database/stories/ex-character",
  },
  {
    label: "Recollections of Dusk",
    href: "/database/stories/rod-character",
  },
  {
    label: "Events",
    href: "/database/stories/events",
  },
  {
    label: "Anecdotes",
    href: "/database/stories/anecdotes",
  },
  {
    label: "Hidden stories",
    href: "/database/stories/hidden-stories",
  },
  {
    label: "Lost archives",
    href: "/database/stories/lost-archives",
  },
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

export default function DatabaseStories(): JSX.Element {
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
