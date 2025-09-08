// stores/introStore.ts
import { create } from "zustand";

type IntroState = {
  hasIntroPlayed: boolean;
  setIntroPlayed: () => void;
};

export const useIntroStore = create<IntroState>((set) => ({
  hasIntroPlayed: false,
  setIntroPlayed: () => set({ hasIntroPlayed: true }),
}));
