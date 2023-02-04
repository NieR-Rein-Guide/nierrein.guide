import produce from 'immer';
import { create } from 'zustand';

export const useCostumesFilters = create((set, get) => ({
  characters: [],
  skills: [],
  limited: false,
  collab: false,
  story: false,
  clear: () => set({
    characters: [],
    skills: [],
    limited: false,
    collab: false,
    story: false,
  }),
  computed: {
    get hasFilters() {
      return !!get().skills.length > 0 ||
      !!get().characters.length > 0 ||
      !!get().limited ||
      !!get().collab ||
      !!get().story ||
      !!get().showInventory;
    },
    get activeCount() {
      let count = 0;

      if (!!get().skills.length > 0) {
        count = count + !!get().skills.length;
      }
      if (!!get().characters.length > 0) {
        count = count + !!get().characters.length;
      }
      if (!!get().limited) {
        count++;
      }
      if (!!get().collab) {
        count++;
      }
      if (!!get().story) {
        count++;
      }
      if (!!get().showInventory) {
        count++;
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
  toggleCharacter: (character) =>
    set((state) => {
      const newCharacters = produce(state.characters, (draft) => {
        const index = draft.findIndex((ch) => ch.name === character.name)
        if (index > -1) {
          draft.splice(index, 1);
        } else {
          draft.push(character);
        }
      });

      return {
        characters: newCharacters
      };
    }),
  setLimited: (limited) => set({ limited }),
  setCollab: (collab) => set({ collab }),
  setStory: (story) => set({ story }),
}));