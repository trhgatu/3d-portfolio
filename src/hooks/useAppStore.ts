import { create } from "zustand";

interface AppState {
  overlayDone: boolean;
  modelEntryDone: boolean;
  heroAnimationDone: boolean;
  currentScene: string;

  setOverlayDone: () => void;
  setModelEntryDone: () => void;
  setHeroAnimationDone: () => void;
  setCurrentScene: (scene: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  overlayDone: false,
  modelEntryDone: false,
  heroAnimationDone: false,
  currentScene: "intro",

  setOverlayDone: () => {
    console.log("✅ Overlay done");
    set({ overlayDone: true });
  },
  setModelEntryDone: () => {
    console.log("✅ Model entry animation done");
    set({ modelEntryDone: true });
  },
  setHeroAnimationDone: () => {
    console.log("✅ Hero animation done");
    set({ heroAnimationDone: true });
  },
  setCurrentScene: (scene) => {
    console.log("🔁 Switching scene to:", scene);
    set({ currentScene: scene });
  },
}));
