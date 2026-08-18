import { useRef } from "react";
import { Project } from "@/types";
import Link from "next/link";
import { MasterpieceCanvas } from "./components/MasterpieceCanvas";

interface ProphecyCardProps {
  project: Project;
  index: number;
  activeIndex: number;
}

export function ProphecyCard({ project: p, index: i, activeIndex }: ProphecyCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isActive = i === activeIndex;

  return (
    <div className="min-h-screen w-full flex flex-col justify-center pr-4 md:pr-16 pl-2 md:pl-8 py-8">
      {/* 🌌 Borderless Spatial Project Showcase */}
      <div
        ref={containerRef}
        className={`relative w-full transition-all duration-700 ease-out transform-gpu flex flex-col justify-center
                   ${
                     isActive
                       ? "translate-x-0 opacity-100 scale-100 filter-none pointer-events-auto"
                       : "translate-x-8 opacity-25 scale-[0.96] blur-[0.5px] grayscale-[30%] pointer-events-none"
                   }`}
      >
        {/* 🌟 1. Top Horizon: Folio Inscription & Tech Signature */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-amber-500/15 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            <span className="font-space-mono text-xs tracking-[0.2em] uppercase text-amber-300 font-medium">
              {p.category || "PROJECT"}
            </span>
            {p.year && (
              <>
                <span className="text-neutral-600 text-xs">•</span>
                <span className="font-space-mono text-xs tracking-wider text-neutral-400">
                  {p.year}
                </span>
              </>
            )}
          </div>

          {/* Minimalist Tech Stack Line (No Clunky Pills) */}
          {p.tech && p.tech.length > 0 && (
            <div className="flex items-center gap-2 text-xs font-space-mono text-neutral-300 tracking-widest">
              {p.tech.slice(0, 5).map((t, idx, arr) => (
                <span key={idx} className="flex items-center gap-2">
                  <span className="text-white font-medium">{t.name}</span>
                  {idx < arr.length - 1 && <span className="text-amber-500/50 text-[8px]">•</span>}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 👑 2. Majestic Monumental Display Title */}
        <h2 className="font-kings text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-wide mb-8 drop-shadow-[0_4px_35px_rgba(245,158,11,0.2)]">
          {p.name}
        </h2>

        {/* 🏛️ 3. Main Stage: Split Layout (Lore on Left, Gilded Masterpiece Folio on Right) */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-between">
          {/* Left: Lore & Signature Action Link */}
          <div className="flex-1 flex flex-col justify-between max-w-xl">
            {/* Narrative Quote */}
            <div className="font-bilbo text-2xl md:text-3xl lg:text-4xl leading-relaxed text-white/90 mb-10 text-justify">
              <p>&ldquo;{p.description}&rdquo;</p>
            </div>

            {/* Signature Editorial Action Links */}
            <div className="flex flex-wrap items-center gap-10 pt-4 border-t border-amber-500/10">
              <Link
                href={`/project/${p.slug}`}
                className="group/link inline-flex items-center gap-4 py-2 relative"
              >
                <span className="font-kings text-2xl md:text-3xl text-white group-hover/link:text-amber-300 transition-colors">
                  Examine Chronicle
                </span>
                <span className="text-lg text-amber-400 group-hover/link:translate-x-2 transition-transform duration-300">
                  ⟶
                </span>
                {/* Glowing Underline Accent */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-amber-500/50 via-amber-400/80 to-transparent group-hover/link:h-[2px] group-hover/link:from-amber-400 transition-all duration-300" />
              </Link>

              {p.link && (
                <Link
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/live inline-flex items-center gap-2 font-space-mono text-xs uppercase tracking-widest text-white/80 hover:text-amber-300 transition-colors"
                >
                  <span>Live Manifestation</span>
                  <span className="group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-transform duration-300">
                    ↗
                  </span>
                </Link>
              )}
            </div>
          </div>

          {/* Right: The Gilded Obsidian Masterpiece Folio */}
          <div className="w-full lg:w-[480px] shrink-0 flex items-center justify-center">
            <MasterpieceCanvas project={p} index={i} isActive={isActive} />
          </div>
        </div>
      </div>
    </div>
  );
}
