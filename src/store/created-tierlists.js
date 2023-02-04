import { create } from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";

export const useCreatedTierlists = create(
  persist(
    (set) => ({
      tierlists: [],
      /**
       * Add tierlist to list
       */
      addTierlist: (tierlist) =>
        set((state) => {
          const newTierlists = produce(state.tierlists, (draft) => {
            draft.push(tierlist);
          });

          return {
            tierlists: newTierlists,
          };
        }),
    }),
    {
      name: "created_tierlists",
    }
  )
);
