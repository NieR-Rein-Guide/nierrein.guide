import create from 'zustand';
import produce from "immer";

export const LOADOUT_TYPES = {
  quests: {
    label: "Quests",
    slotSize: 3,
  },
  arena: {
    label: "Arena",
    slotSize: 3,
  },
  subjugation: {
    label: "Subj.",
    slotSize: 9,
  },
};

export const DEFAULT_SLOT = {
  costume: null,
  weapons: [null, null, null],
  companion: null,
  debris: null,
  memoirs: [null, null, null],
};

export const useLoadoutStore = create((set) => ({
  title: "My Loadout",
  description: "Description of the loadout",
  type: "quests",
  attribute: "all",
  slots: [],
  costumeModal: false,
  weaponsModal: false,
  companionModal: false,
  debrisModal: false,
  memoirsModal: false,
  currentSlotIndex: 0,
  currentWeaponIndex: 0,
  currentMemoirIndex: 0,
  setTitle: (newTitle) => set({ title: newTitle }),
  setDescription: (newDesc) => set({ description: newDesc }),
  setType: (newType) => set({ type: newType }),
  setAttribute: (newAttribute) => set({ attribute: newAttribute }),
  setSlotSize: (newSize) =>
    set((state) => {
      /**
       * First time loading the page, fill 3 default slots
       */
      if (state.slots.length === 0) {
        return {
          slots: produce(new Array(newSize), (draft) => {
            draft.fill(DEFAULT_SLOT);
          })
        };
      }

      /**
       * If switching from "quests" or "arena" to "subj"
       * Keep old loadout and fill the rest
       */
      if (newSize > state.slots.length) {
        const slotsToCreate = newSize - state.slots.length
        const newSlots = new Array(slotsToCreate).fill(DEFAULT_SLOT);

        return {
          slots: produce(state.slots, (draft) => {
            newSlots.forEach(slot => draft.push(slot))
          })
        };
      }

      /**
       * If switching from "subj" to "quests" or "arena"
       */
      if (newSize < state.slots.length) {
        return {
          slots: state.slots.slice(0, newSize),
        };
      }

      /**
       * Same slots length so just return the same slots
       */
      return {
        slots: state.slots,
      }
    }),
  /**
   * Update the costume on a specific slot (slot index is set when opening modal)
   */
  setCostume: (costume) =>
    set((state) => {
      const newSlots = produce(state.slots, (draft) => {
        draft[state.currentSlotIndex].costume = costume;
      });

      return {
        slots: newSlots,
        costumeModal: false,
      };
    }),
  /**
   * Show the costumes modal and set current slot index to determine which slot to update
   */
  setCostumeModal: (currentSlotIndex, newState) =>
    set({
      costumeModal: newState,
      currentSlotIndex,
    }),
  /**
   * Show the weapons modal and set current slot index and weapon index
   * index are used in the parent component to determine the slots
   */
  setWeaponsModal: (currentSlotIndex, currentWeaponIndex, newState) =>
    set({
      weaponsModal: newState,
      currentSlotIndex,
      currentWeaponIndex,
    }),
  /**
   * Update the weapon on a specific slot (slot index/weapon index is set when opening modal)
   */
  setWeapon: (weapon) =>
    set((state) => {
      const newSlots = produce(state.slots, (draft) => {
        draft[state.currentSlotIndex].weapons[state.currentWeaponIndex] =
          weapon;
      });

      return {
        slots: newSlots,
        weaponsModal: false,
      };
    }),
  /**
   * Show the companion modal and set current slot index to determine which slot to update
   */
  setCompanionModal: (currentSlotIndex, newState) =>
    set({
      companionModal: newState,
      currentSlotIndex,
    }),
  /**
   * Update the companion on a specific slot (slot index is set when opening modal)
   */
  setCompanion: (companion) =>
    set((state) => {
      const newSlots = produce(state.slots, (draft) => {
        draft[state.currentSlotIndex].companion = companion;
      });

      return {
        slots: newSlots,
        companionModal: false,
      };
    }),
  setDebris: (debris) =>
    set((state) => {
      const newSlots = produce(state.slots, (draft) => {
        draft[state.currentSlotIndex].debris = debris;
      })

      return {
        slots: newSlots,
        debrisModal: false,
      };
    }),
  setDebrisModal: (currentSlotIndex, newState) =>
    set({
      debrisModal: newState,
      currentSlotIndex,
    }),
  setMemoir: (memoir) =>
    set((state) => {
      const newSlots = produce(state.slots, (draft) => {
        draft[state.currentSlotIndex].memoirs[state.currentMemoirIndex] = memoir;
      })

      return {
        slots: newSlots,
        memoirsModal: false,
      };
    }),
  setMemoirsModal: (currentSlotIndex, currentMemoirIndex, newState) =>
    set({
      memoirsModal: newState,
      currentSlotIndex,
      currentMemoirIndex,
    }),
}));