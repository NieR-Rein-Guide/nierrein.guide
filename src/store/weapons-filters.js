import produce from 'immer';
import { create } from 'zustand';

export const useWeaponsFilters = create((set, get) => ({
  skills: [],
  isRefinable: false,
  isEX: false,
  isRD: false,
  isSubjugation: false,
  clear: () => set({
    skills: [],
    isRefinable: false,
    isEX: false,
    isRD: false,
    isSubjugation: false,
  }),
  computed: {
    get hasFilters() {
      return !!get().skills.length > 0 ||
      !!get().isRefinable ||
      !!get().isEX ||
      !!get().isRD ||
      !!get().isSubjugation
    },
    get activeCount() {
      let count = 0;

      if (!!get().skills.length > 0) {
        count = count + !!get().skills.length;
      }

      if (!!get().isRefinable) {
        count = count + 1
      }
      if (!!get().isEX) {
        count = count + 1
      }
      if (!!get().isRD) {
        count = count + 1
      }
      if (!!get().isSubjugation) {
        count = count + 1
      }

      return count++
    },
  },
  toggleSkill: (skill) =>
    set((state) => {
      const newSkills = produce(state.skills, (draft) => {
        const index = draft.findIndex((sk) => sk.label === skill.label)
        if (index > -1) {
          draft.splice(index, 1);
        } else {
          draft.push(skill);
        }
      });

      return {
        skills: newSkills
      };
    }),
  setIsRefinable: (isRefinable) => set({ isRefinable }),
  setIsEX: (isEX) => set({ isEX }),
  setIsRD: (isRD) => set({ isRD }),
  setIsSubjugation: (isSubjugation) => set({ isSubjugation }),
}));