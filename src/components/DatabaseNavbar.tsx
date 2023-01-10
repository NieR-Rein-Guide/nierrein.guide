import { useSettingsStore } from "@store/settings";
import { useRouter } from "next/router";
import { MdFilterAlt, MdViewColumn, MdViewComfy } from "react-icons/md";
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
import {
  FormControlLabel,
  FormGroup,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

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

export default function DatabaseNavbar() {
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

  const isMobile = useMedia("(max-width: 1023px)");

  useEffect(() => {
    if (!SUPPORTED_MULTIPLE_DISPLAY.includes(router.asPath)) {
      return;
    }

    if (databaseDisplayType !== "table") {
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
      <div className="flex items-center flex-col-reverse gap-y-4 sm:flex-row justify-between mb-2">
        <div className="flex gap-x-4">
          <FormGroup>
            <FormControlLabel
              control={<Switch value={showInventory} />}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShowInventory(e.target.checked)
              }
              label="Show only inventory"
            />
          </FormGroup>

          {databaseDisplayType !== "table" && (
            <FormGroup>
              <FormControlLabel
                control={<Switch value={order} />}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOrder(e.target.checked ? "library" : "desc")
                }
                label="Library view"
              />
            </FormGroup>
          )}
        </div>

        <ToggleButtonGroup
          value={databaseDisplayType}
          exclusive
          onChange={(e, newValue) => setDatabaseDisplayType(newValue)}
          aria-label="View"
        >
          <ToggleButton value="table" aria-label="table">
            <MdFilterAlt /> <p className="ml-2">Table</p>
          </ToggleButton>
          <ToggleButton value="grid" aria-label="grid">
            <MdViewColumn /> <p className="ml-2">Comfy</p>
          </ToggleButton>
          <ToggleButton value="compact" aria-label="compact">
            <MdViewComfy /> <p className="ml-2">Compact</p>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }

  return null;
}
