import { useSettingsStore } from "@store/settings";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import Radio from "./form/Radio";
import { MdOutlineInventory } from "react-icons/md";
import { toast } from "react-hot-toast";

import loadoutsIcon from "../../public/icons/loadout.png";
import charactersIcon from "../../public/icons/characters.png";
import abilitiesIcon from "../../public/icons/abilities.png";
import debrisIcon from "../../public/icons/debris.png";
import companionsIcon from "../../public/icons/companions.png";
import memoirsIcon from "../../public/icons/memoirs.png";
import emblemsIcon from "../../public/icons/emblems.png";
import storiesIcon from "../../public/icons/stories.png";
import noticesIcon from "../../public/icons/notices.png";
import eventsIcon from "../../public/icons/events.png";
import { useMedia } from "react-use";
import { useEffect } from "react";

const SUPPORTED_MULTIPLE_DISPLAY = ["/characters", "/weapons"];

export const ITEMS = [
  {
    label: "Costumes",
    href: "/characters",
    icon: charactersIcon,
  },
  {
    label: "Weapons",
    href: "/weapons",
    icon: loadoutsIcon,
  },
  {
    label: "Abilities",
    href: "/database/abilities",
    icon: abilitiesIcon,
  },
  {
    label: "Debris",
    href: "/database/debris",
    icon: debrisIcon,
  },
  {
    label: "Companions",
    href: "/database/companions",
    icon: companionsIcon,
  },
  {
    label: "Memoirs",
    href: "/database/memoirs",
    icon: memoirsIcon,
  },
  {
    label: "Emblems",
    href: "/database/emblems",
    icon: emblemsIcon,
  },
  {
    label: "Stories",
    href: "/database/stories",
    icon: storiesIcon,
  },
  {
    label: "Notices",
    href: "/database/notices",
    icon: noticesIcon,
  },
  {
    label: "Events",
    href: "/events",
    icon: eventsIcon,
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

  const isMobile = useMedia("(max-width: 1023px)");

  useEffect(() => {
    if (!SUPPORTED_MULTIPLE_DISPLAY.includes(router.asPath)) {
      return;
    }

    if (databaseDisplayType === "grid") {
      return;
    }

    if (databaseDisplayType === "table" && !isMobile) {
      return;
    }

    setDatabaseDisplayType("grid");
    toast.success('Automatically switched to "grid" view on mobile.');
  }, [isMobile]);

  if (SUPPORTED_MULTIPLE_DISPLAY.includes(router.asPath)) {
    return (
      <div className="flex flex-col xl:flex-row justify-between p-4 bg-grey-foreground border border-beige border-opacity-30">
        <Link href="/inventory">
          <a
            className={classNames(
              "mt-4 lg:mt-0 p-4 transition-colors ease-out-cubic relative bordered text-center",
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

        <div className="flex gap-x-4 mt-6 xl:mt-0 xl:flex-col md:items-end gap-y-3">
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
      </div>
    );
  }

  return null;
}
