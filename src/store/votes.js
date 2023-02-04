import { create } from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";

export const useLoadoutsVotes = create(
  persist(
    (set) => ({
      votes: [],
      /**
       * Add vote to a loadout
       */
      addVote: (loadoutId) =>
        set((state) => {
          const newVotes = produce(state.votes, (draft) => {
            draft.push(loadoutId);
          });

          return {
            votes: newVotes
          };
        }),
    }),
    {
      name: "loadouts_votes",
    }
  )
);
