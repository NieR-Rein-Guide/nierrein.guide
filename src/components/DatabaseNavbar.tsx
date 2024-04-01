import { useSettingsStore } from "@store/settings";
import { useRouter } from "next/router";
import { MdFilterAlt, MdViewColumn, MdViewComfy } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";

import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Checkbox from "./form/Checkbox";
import { FiFilter } from "react-icons/fi";
import { useCostumesFilters } from "@store/costumes-filters";

const loadoutsIcon = "/icons/loadout.png";
const charactersIcon = "/icons/characters.png";
const abilitiesIcon = "/icons/abilities.png";
const debrisIcon = "/icons/debris.png";
const companionsIcon = "/icons/companions.png";
const memoirsIcon = "/icons/memoirs.png";
const emblemsIcon = "/icons/emblems.png";
const storiesIcon = "/icons/stories.png";
const noticesIcon = "/icons/notices.png";
const eventsIcon = "/icons/events.png";

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
    href: "/database/stories/main",
    icon: storiesIcon,
  },
  {
    label: "Notices",
    href: "/notices",
    icon: noticesIcon,
  },
  {
    label: "Events",
    href: "/events",
    icon: eventsIcon,
  },
];

export default function DatabaseNavbar({
  children,
  middleChildren,
}: {
  children?: JSX.Element[] | JSX.Element;
  middleChildren?: JSX.Element[] | JSX.Element;
}) {
  const router = useRouter();
  const databaseDisplayType = useSettingsStore(
    (state) => state.databaseDisplayType
  );
  const setDatabaseDisplayType = useSettingsStore(
    (state) => state.setDatabaseDisplayType
  );
  const order = useSettingsStore((state) => state.order);
  const setOrder = useSettingsStore((state) => state.setOrder);
  const hasFilters = useCostumesFilters((state) => state.computed.hasFilters);
  const activeCount = useCostumesFilters((state) => state.computed.activeCount);

  if (SUPPORTED_MULTIPLE_DISPLAY.includes(router.asPath)) {
    return (
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center flex-col-reverse gap-y-4 sm:flex-row justify-between mb-2">
          <div className="flex gap-x-4">
            {children && (
              <Popover.Root>
                <Popover.Trigger asChild>
                  <Button
                    color={hasFilters ? "secondary" : "primary"}
                    variant="outlined"
                    component="label"
                    startIcon={<FiFilter />}
                  >
                    <span>
                      {hasFilters ? `${activeCount} filters applied` : "Filter"}
                    </span>
                  </Button>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    className="PopoverContent bg-grey-dark border border-beige border-opacity-50 p-4"
                    sideOffset={5}
                  >
                    <div className="grid md:grid-cols-2 gap-2 max-w-xl">
                      {children}
                    </div>
                    <Popover.Arrow className="PopoverArrow" />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            )}

            {["grid", "compact"].includes(databaseDisplayType) && (
              <Checkbox
                label="Library view"
                isChecked={order === "library"}
                setState={() => setOrder(order === "desc" ? "library" : "desc")}
              />
            )}
          </div>

          {middleChildren}
        </div>
      </div>
    );
  }

  return null;
}
