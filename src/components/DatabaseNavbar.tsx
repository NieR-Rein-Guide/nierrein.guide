import { useSettingsStore } from "@store/settings";
import { useRouter } from "next/router";
import { MdFilterAlt, MdViewColumn, MdViewComfy } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";

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
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Checkbox from "./form/Checkbox";
import { FiFilter } from "react-icons/fi";
import { useCostumesFilters } from "@store/costumes-filters";

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
    href: "/database/stories/costumes",
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
  const showInventory = useSettingsStore((state) => state.showInventory);
  const setShowInventory = useSettingsStore((state) => state.setShowInventory);
  const order = useSettingsStore((state) => state.order);
  const setOrder = useSettingsStore((state) => state.setOrder);
  const hasFilters = useCostumesFilters((state) => state.computed.hasFilters);
  const activeCount = useCostumesFilters((state) => state.computed.activeCount);

  if (SUPPORTED_MULTIPLE_DISPLAY.includes(router.asPath)) {
    return (
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center flex-col-reverse gap-y-4 sm:flex-row justify-between mb-2">
          <div className="flex gap-x-4">
            <Checkbox
              label="Only inventory"
              isChecked={showInventory}
              setState={(e) => setShowInventory(e.target.checked)}
            />

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

            {databaseDisplayType !== "table" && (
              <Checkbox
                label="Library view"
                isChecked={order === "library"}
                setState={() => setOrder(order === "desc" ? "library" : "desc")}
              />
            )}
          </div>

          {middleChildren}

          <ToggleButtonGroup
            value={databaseDisplayType}
            exclusive
            onChange={(e, newValue) => setDatabaseDisplayType(newValue)}
            aria-label="View"
          >
            <ToggleButton
              defaultChecked={databaseDisplayType === "table"}
              value="table"
              aria-label="table"
            >
              <MdFilterAlt /> <p className="ml-2">Table</p>
            </ToggleButton>
            <ToggleButton value="grid" aria-label="grid">
              <MdViewColumn /> <p className="ml-2">Comfy</p>
            </ToggleButton>
            <ToggleButton
              defaultChecked={databaseDisplayType === "compact"}
              value="compact"
              aria-label="compact"
            >
              <MdViewComfy /> <p className="ml-2">Compact</p>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    );
  }

  return null;
}
