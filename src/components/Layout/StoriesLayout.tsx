import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";

const ITEMS = [
  {
    label: "Main story",
    href: "/database/stories/main",
  },
  {
    label: "Characters",
    href: "/database/stories/characters",
  },
  {
    label: "EX characters",
    href: "/database/stories/ex-characters",
  },
  {
    label: "Recollections of Dusk",
    href: "/database/stories/rod-characters",
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
    label: "Remnants",
    href: "/database/stories/remnants",
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

export default function StoriesLayout({ children }): JSX.Element {
  const router = useRouter();

  return (
    <>
      <h4 className="text-2xl mb-2">Ressources:</h4>
      <ul className="flex divide-x divide-beige-inactive mb-4">
        <li>
          <a
            href="https://nier.fandom.com/wiki/NieR_Reincarnation"
            className="text-xs md:text-base px-2 hover:underline"
          >
            NieR Wiki
          </a>
        </li>
        <li>
          <a
            href="https://accords-library.com/"
            className="text-xs md:text-base px-2 hover:underline"
          >
            Accord's Library
          </a>
        </li>
        <li>
          <a
            href="https://reinlibrary.neocities.org/"
            className="text-xs md:text-base px-2 hover:underline"
          >
            Re[in] Library
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/@BillyCoolGR/featured"
            className="text-xs md:text-base px-2 hover:underline"
          >
            BillyCool (YT)
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/@naotohex/videos"
            className="text-xs md:text-base px-2 hover:underline"
          >
            Naoto Hex (YT)
          </a>
        </li>
      </ul>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <aside className="col-span-1 flex flex-col mb-8 lg:col-span-3 lg:mb-0">
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

        <div className="col-span-1 lg:col-span-9">{children}</div>
      </div>
    </>
  );
}
