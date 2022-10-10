import create from "zustand";
import { persist } from "zustand/middleware";

export const useSettingsStore = create(
  persist(
    (set) => ({
      databaseDisplayType: "table", // 'table' | 'grid'
      showUnreleasedContent: false,
      stoneTowerSlabsPercent: 0, // 0 | 33 | 67 | 100
      cursedGodSlabsPercent: 0, // 0 | 33 | 67 | 100
      awakeningLevel: 0, // 0 | 1 | 2 | 3 | 4 | 5
      setShowUnreleasedContent: (showUnreleasedContent) =>
        set({ showUnreleasedContent }),
      setDatabaseDisplayType: (databaseDisplayType) =>
        set({ databaseDisplayType }),
      setStoneTowerSlabsPercent: (stoneTowerSlabsPercent) =>
        set({ stoneTowerSlabsPercent }),
      setCursedGodSlabsPercent: (cursedGodSlabsPercent) =>
        set({ cursedGodSlabsPercent }),
      setAwakeningLevel: (awakeningLevel) =>
        set({ awakeningLevel }),
    }),
    {
      name: "settings",
    }
  )
);
