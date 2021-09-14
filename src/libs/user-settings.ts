import create from "zustand"
import { persist } from "zustand/middleware"

export const useStore = create(persist<any>(
    (set, get) => ({
        spoilers: 0,
        toggleSpoilers: (newValue: boolean) => set({
            spoilers: newValue ?? !(get().spoilers)
        })
    }),
    {
        name: "user-settings", // unique name
    }
))