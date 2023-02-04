import { create } from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";

export const usePanelStore = create(
  (set) => ({
    costumes: [],
    weapons: [],
    /**
     * Add or remove from costumes inventory
     */
    addCostume: (costumeId) =>
      set((state) => {
        const newCostumes = produce(state.costumes, (draft) => {
          const index = draft.indexOf(costumeId);
          if (index > -1) {
            draft.splice(index, 1);
          } else {
            draft.push(costumeId);
          }
        });

        return {
          costumes: newCostumes,
        };
      }),
    /**
     * Add or remove from weapons inventory
     */
    addWeapon: (weaponId) =>
      set((state) => {
        const newWeapons = produce(state.weapons, (draft) => {
          const index = draft.indexOf(weaponId);
          if (index > -1) {
            draft.splice(index, 1);
          } else {
            draft.push(weaponId);
          }
        });

        return {
          weapons: newWeapons,
        };
      }),
  }),
  {
    name: "panels",
  }
);
