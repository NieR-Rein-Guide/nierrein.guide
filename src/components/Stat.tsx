import {
  CURSED_GOD_MONUMENT_SLABS,
  STONE_TOWER_MONUMENT_SLABS,
} from "@config/constants";
import { Tooltip } from "@mui/material";
import { useSettingsStore } from "@store/settings";
import classNames from "classnames";

interface StatProps {
  type: "hp" | "atk" | "vit" | "agi" | "crit_rate" | "crit_atk" | "eva_rate";
  value: number;
}

const STATS_VALUES = ["hp", "atk", "vit", "agi"];
const PERCENT_VALUES = ["crit_rate", "crit_atk", "eva_rate"];

export default function Stat({ type, value }: StatProps) {
  const stoneTowerSlabsPercent = useSettingsStore(
    (state) => state.stoneTowerSlabsPercent
  );
  const cursedGodSlabsPercent = useSettingsStore(
    (state) => state.cursedGodSlabsPercent
  );
  const awakeningLevel = useSettingsStore((state) => state.awakeningLevel);

  const addedStats = {
    stoneTowerSlabs: 0,
    cursedGodSlabs: 0,
  };

  let finalStat = value;

  if (STATS_VALUES.includes(type)) {
    if (stoneTowerSlabsPercent > 0) {
      finalStat += STONE_TOWER_MONUMENT_SLABS[stoneTowerSlabsPercent][type];
      addedStats.stoneTowerSlabs =
        STONE_TOWER_MONUMENT_SLABS[stoneTowerSlabsPercent][type];
    }

    if (cursedGodSlabsPercent > 0) {
      finalStat += CURSED_GOD_MONUMENT_SLABS[cursedGodSlabsPercent][type];
      addedStats.cursedGodSlabs =
        CURSED_GOD_MONUMENT_SLABS[cursedGodSlabsPercent][type];
    }
  }

  if (PERCENT_VALUES.includes(type)) {
    finalStat = finalStat / 10;
  }

  const isModified =
    (STATS_VALUES.includes(type) && value !== finalStat) || awakeningLevel > 0;

  return (
    <Tooltip
      enterTouchDelay={0}
      title={
        <p className="whitespace-pre">
          {Object.entries(addedStats)
            .map(([key, value]) => `${key}: ${Math.round(value)}`)
            .join("\n")}
        </p>
      }
    >
      <span
        className={classNames(
          isModified ? "underline" : "",
          type === "atk" ? "text-red-300" : "",
          type === "vit" ? "text-blue-300" : "",
          type === "agi" ? "text-green-300" : ""
        )}
      >
        {Math.round(finalStat)}
        {PERCENT_VALUES.includes(type) ? "%" : ""}
      </span>
    </Tooltip>
  );
}
