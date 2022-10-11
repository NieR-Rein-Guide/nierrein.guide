import {
  AWAKENING_LEVEL,
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
const AWAKENING_VALUES = ["hp", "atk", "vit"];
const AWAKENING_LEVELS_STATS = [1, 2, 4];

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
    awakening: 0,
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

  /**
   * Add awakening stat bonus
   * Only 1, 2 and 4 influence stats
   */
  if (AWAKENING_VALUES.includes(type) && awakeningLevel > 0) {
    const needle = awakeningLevel;
    const closest = AWAKENING_LEVELS_STATS.reduce((a, b) => {
      return Math.abs(b - needle) < Math.abs(a - needle) ? b : a;
    });

    const bonus = value * AWAKENING_LEVEL[closest];
    addedStats.awakening = bonus;
    finalStat = finalStat + bonus;
  }

  const isModified = STATS_VALUES.includes(type) && value !== finalStat;

  return (
    <Tooltip
      title={
        <p className="whitespace-pre">
          {Object.entries(addedStats)
            .map(([key, value]) => `${key}: ${Math.round(value)}`)
            .join("\n")}
        </p>
      }
    >
      <span className={classNames(isModified ? "underline" : "")}>
        {Math.round(finalStat)}
        {PERCENT_VALUES.includes(type) ? "%" : ""}
      </span>
    </Tooltip>
  );
}
