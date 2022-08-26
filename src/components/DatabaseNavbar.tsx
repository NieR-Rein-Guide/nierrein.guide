import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

const ITEMS = [
  {
    label: "Costumes",
    href: "/characters",
  },
  {
    label: "Weapons",
    href: "/weapons",
  },
  {
    label: "Companions",
    href: "/database/companions",
  },
  {
    label: "Memoirs",
    href: "/database/memoirs",
  },
  {
    label: "Debris",
    href: "/database/debris",
  },
];

export default function DatabaseNavbar() {
  const router = useRouter();

  return (
    <nav className="flex xl:justify-center gap-x-1 p-4 bg-grey-foreground border border-beige border-opacity-30">
      {ITEMS.map((item) => (
        <Link key={item.label} href={item.href}>
          <a
            className={classNames(
              "p-4 transition-colors ease-out-cubic relative bordered",
              router.asPath === item.href
                ? "active bg-beige active"
                : "bg-grey-lighter"
            )}
          >
            <span
              className={classNames(
                "font-display font-bold text-xl tracking-wider transition-colors ease-out-cubic",
                router.asPath === item.href ? "text-grey-lighter" : "text-beige"
              )}
            >
              {item.label}
            </span>
          </a>
        </Link>
      ))}
    </nav>
  );
}
