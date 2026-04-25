// src/app/forge/page.tsx
"use client";

import {
  HeroForgeEntry,
  // TechGrimoire,
  // TheCraftings,
  // TheTransmutation,
  // TheAlchemist,
  // TheJourney,
  ForgeAssetTracker,
} from "@/features/forge/home/components";

import { useAppStore } from "@/hooks"; // Removed unused useLang
// import { usePublicProjects } from "@/features/forge/craftings/hooks"; // Unused
import { ScenePhase } from "@/constants/ScenePhase";
import { useGSAP } from "@gsap/react";

interface ForgeHomeProps {
  isVisited?: boolean;
}

export default function ForgeHome({ isVisited = false }: ForgeHomeProps) {
  const { scenePhase, setScenePhase } = useAppStore();
  useGSAP(() => {
    if (typeof window !== "undefined" && (isVisited || sessionStorage.getItem("forge_visited"))) {
      if (scenePhase === ScenePhase.LOADING) {
        setScenePhase(ScenePhase.HERO_ANIMATION);
      }
    }
  }, [setScenePhase, isVisited]);

  return (
    <section>
      <ForgeAssetTracker />
      <HeroForgeEntry />
    </section>
  );
}
