import { useSettingsStore } from "@store/settings";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import Radio from "./form/Radio";
import { MdOutlineInventory } from "react-icons/md";

const SUPPORTED_MULTIPLE_DISPLAY = ["/characters", "/weapons"];

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
  const databaseDisplayType = useSettingsStore(
    (state) => state.databaseDisplayType
  );
  const setDatabaseDisplayType = useSettingsStore(
    (state) => state.setDatabaseDisplayType
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-9 lg:grid-cols-12 p-4 bg-grey-foreground border border-beige border-opacity-30">
      <Link href="/inventory">
        <a
          className={classNames(
            "order-2 mt-4 md:col-span-3 lg:mt-0 lg:order-first lg:col-span-2 p-4 transition-colors ease-out-cubic relative bordered text-center",
            router.asPath === "/inventory"
              ? "active bg-beige active"
              : "bg-grey-lighter",
            SUPPORTED_MULTIPLE_DISPLAY.includes(router.asPath) ? "w-64" : ""
          )}
        >
          <span
            className={classNames(
              "inline-flex items-center gap-x-2 font-display font-bold text-xl tracking-wider transition-colors ease-out-cubic",
              router.asPath === "/inventory"
                ? "text-grey-lighter"
                : "text-beige"
            )}
          >
            <MdOutlineInventory size={24} />
            Inventory
          </span>
        </a>
      </Link>

      <nav
        className={classNames(
          "overflow-x-auto flex xl:justify-center gap-x-1 gap-y-2 md:col-span-9 lg:col-start-4 xl:col-start-3 xl:col-span-8"
        )}
      >
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
                  router.asPath === item.href
                    ? "text-grey-lighter"
                    : "text-beige"
                )}
              >
                {item.label}
              </span>
            </a>
          </Link>
        ))}
      </nav>

      {SUPPORTED_MULTIPLE_DISPLAY.includes(router.asPath) && (
        <div className="flex gap-x-4 mt-6 xl:mt-0 xl:flex-col md:items-end gap-y-3 md:col-span-3 xl:col-span-2">
          <Radio
            name="Table"
            value="table"
            isChecked={databaseDisplayType === "table"}
            setState={setDatabaseDisplayType}
            labelClassname="inline-block text-center md:w-24"
          />
          <Radio
            name="Grid"
            value="grid"
            isChecked={databaseDisplayType === "grid"}
            setState={setDatabaseDisplayType}
            labelClassname="inline-block text-center md:w-24"
          />
        </div>
      )}
    </div>
  );
}