import { create } from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";

export const useTierlistsVotes = create(
  persist(
    (set) => ({
      votes: [],
      /**
       * Add vote to a tierlist
       */
      addVote: (tierlistId) =>
        set((state) => {
          const newVotes = produce(state.votes, (draft) => {
            draft.push(tierlistId);
          });

          return {
            votes: newVotes
          };
        }),
    }),
    {
      name: "tierlists_votes",
    }
  )
);
