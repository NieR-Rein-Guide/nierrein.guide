import create from "zustand";
import { persist } from "zustand/middleware";

export const useSettingsStore = create(
  persist(
    (set) => ({
      databaseDisplayType: "table", // 'table' | 'grid'
      showUnreleasedContent: true,
      setShowUnreleasedContent: (showUnreleasedContent) =>
        set({ showUnreleasedContent }),
      setDatabaseDisplayType: (databaseDisplayType) =>
        set({ databaseDisplayType }),
    }),
    {
      name: "settings",
    }
  )
);
