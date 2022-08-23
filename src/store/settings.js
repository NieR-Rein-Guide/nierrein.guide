import create from "zustand";
import { persist } from "zustand/middleware";

export const useSettingsStore = create(
  persist(
    (set) => ({
      showUnreleasedContent: true,
      setShowUnreleasedContent: (showUnreleasedContent) =>
        set({ showUnreleasedContent }),
    }),
    {
      name: "settings",
    }
  )
);
