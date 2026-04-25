// src/hooks/useAppStore.ts
import { create } from "zustand";
import { ScenePhase } from "@/constants/ScenePhase";

export type Language = "vi" | "en";

interface AppState {
  scenePhase: ScenePhase;
  setScenePhase: (phase: ScenePhase) => void;

  emptySlotRef: HTMLDivElement | null;
  setEmptySlotRef: (ref: HTMLDivElement | null) => void;

  loadingProgress: number;
  setLoadingProgress: (progress: number) => void;

  lang: Language;
  setLang: (lang: Language) => void;
}

const getStoredLang = (): Language => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("lang");
    if (stored === "vi" || stored === "en") return stored;
  }
  return "vi";
};

export const useAppStore = create<AppState>((set) => ({
  scenePhase: ScenePhase.LOADING,
  setScenePhase: (phase) => {
    console.log("🔁 Switching to:", phase);
    set({ scenePhase: phase });
  },
  emptySlotRef: null,
  setEmptySlotRef: (ref) => set({ emptySlotRef: ref }),
  loadingProgress: 0,
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
  lang: getStoredLang(),
  setLang: (lang) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
    set({ lang });
  },
}));
