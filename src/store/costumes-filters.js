import produce from 'immer';
import create from 'zustand';

export const useCostumesFilters = create((set) => ({
  skills: [],
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
}));