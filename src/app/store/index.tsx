import { create } from "zustand";

export type Category = {
  id: number;
  name: string;
};

export type Config = {
  numberOfQuestions: number;
  category: Category;
  level: string;
  type: string;
  status: string;
  score: number;
};

type QuizStore = {
  config: Config;
  addLevel: (level: string) => void;
  addType: (type: string) => void;
  addNumberOfQuestions: (count: number) => void;
  addCategory: (id: number, name: string) => void;
  addStatus: (status: string) => void;
  addScore: () => void;
  resetQuiz: () => void;
};

const defaultConfig: Config = {
  numberOfQuestions: 5,
  category: { id: 0, name: "" },
  level: "",
  type: "",
  status: "",
  score: 0,
};

const useQuiz = create<QuizStore>((set) => ({
  config: { ...defaultConfig },
  addLevel: (level: string) =>
    set((state) => ({ config: { ...state.config, level } })),
  addType: (type: string) =>
    set((state) => ({ config: { ...state.config, type } })),
  addNumberOfQuestions: (count: number) =>
    set((state) => ({
      config: { ...state.config, numberOfQuestions: count },
    })),
  addCategory: (id: number, name: string) =>
    set((state) => ({
      config: { ...state.config, category: { id, name } },
    })),
  addStatus: (status: string) =>
    set((state) => ({ config: { ...state.config, status } })),
  addScore: () =>
    set((state) => ({ config: { ...state.config, score: state.config.score + 1 } })),
  resetQuiz: () => set({ config: { ...defaultConfig } }),
}));

export default useQuiz;