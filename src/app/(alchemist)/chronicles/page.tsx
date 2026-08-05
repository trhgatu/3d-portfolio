"use client";

import { useEffect } from "react";
import {
  HeroForgeEntry,
  TechGrimoire,
  TheAlchemist,
  TheCraftings,
  TheJourney,
} from "@/features/alchemist/chronicles/components";
import { GlobalAtmosphere } from "@/features/alchemist/shared/atmosphere";
import { AlchemicalFilters } from "@/features/alchemist/shared/effects";
import { usePublicProjects } from "@/features/alchemist/craftings/hooks";
import { useLang } from "@/hooks";

export default function ChroniclesPage() {
  const lang = useLang();
  const { data: projects = [], isLoading, isError } = usePublicProjects(lang);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative w-full">
      <GlobalAtmosphere isIgnited={true} />
      <AlchemicalFilters />

      {/* HERO INTRODUCTION */}
      <div className="relative z-20 w-full">
        <HeroForgeEntry />
      </div>

      {/* JOURNEY CONTENT */}
      <div className="relative z-20 w-full">
        <TheAlchemist />
        <TechGrimoire />
        <TheCraftings projects={projects} isLoading={isLoading} isError={isError} />
        <TheJourney />
      </div>
    </main>
  );
}
