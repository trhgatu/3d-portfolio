import { useState, useRef } from "react";
import { Project } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface ProphecyCardProps {
  project: Project;
  index: number;
  activeIndex: number;
}

export function ProphecyCard({ project: p, index: i, activeIndex }: ProphecyCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImg, setSelectedImg] = useState<string>(p.thumbnail || (p.images?.[0] ?? ""));
  const isActive = i === activeIndex;

  const allImages = [
    ...(p.thumbnail ? [p.thumbnail] : []),
    ...(p.images || []).filter((img) => img !== p.thumbnail),
  ];

  const currentDisplayImage = selectedImg || p.thumbnail || p.images?.[0];

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
        {/* Giant Ghosted Background Folio Number */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[20vw] leading-none font-kings text-amber-500/[0.03] select-none pointer-events-none -z-10 font-normal">
          {(i + 1).toString().padStart(2, "0")}
        </div>

        {/* 🌟 1. Top Horizon: Folio Inscription & Tech Signature */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-amber-500/15 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            <span className="font-space-mono text-[11px] tracking-[0.45em] uppercase text-white font-semibold">
              CHRONICLE № 0{i + 1}
            </span>
            <span className="w-6 h-[1px] bg-amber-500/30" />
            <span className="font-space-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400">
              VOL. I
            </span>
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

        {/* 🏛️ 3. Main Stage: Split Layout (Lore on Left, Floating Art on Right) */}
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

          {/* Right: Floating Masterpiece Artwork Frame */}
          <div className="w-full lg:w-[480px] shrink-0 flex flex-col gap-4">
            {/* Art Canvas */}
            <div className="relative w-full aspect-[16/10] rounded-sm overflow-hidden border border-amber-500/30 bg-[#0c0c10] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(180,83,9,0.15)] group/art">
              {currentDisplayImage ? (
                <Image
                  src={currentDisplayImage}
                  alt={p.name}
                  fill
                  className="object-cover opacity-90 transition-transform duration-1000 ease-out group-hover/art:scale-105 group-hover/art:opacity-100"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-600 font-space-mono text-xs">
                  ✦ Inscription Visual ✦
                </div>
              )}

              {/* Fine Gold Edge Highlight & Vignette */}
              <div className="absolute inset-0 ring-1 ring-inset ring-amber-400/25 pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none" />
            </div>

            {/* Thumbnail Plate Switcher Strip */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2.5 pt-1 overflow-x-auto pb-1 scrollbar-none">
                {allImages.map((img, imgIdx) => {
                  const isSelected = img === currentDisplayImage;
                  return (
                    <button
                      key={imgIdx}
                      type="button"
                      onClick={() => setSelectedImg(img)}
                      className={`relative w-16 h-11 rounded-sm overflow-hidden border transition-all duration-300 shrink-0 ${
                        isSelected
                          ? "border-amber-400 ring-1 ring-amber-400/50 scale-105 opacity-100"
                          : "border-neutral-800 opacity-40 hover:opacity-90 hover:border-amber-500/40"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Plate ${imgIdx + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
