import { useRef } from "react";
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

  return (
    <div className="min-h-screen w-full flex flex-col justify-center pr-4 md:pr-12">
      {/* SVG Mask with UserSpace Units for accurate tearing */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id={`prophecy-ink-distortion-${i}`} x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="4"
              seed={i + 555}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="60"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <mask
            id={`torn-mask-user-${i}`}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="500"
            height="500"
          >
            {/* The white circle is what gets torn by the filter */}
            <circle
              cx="250"
              cy="250"
              r="180"
              fill="white"
              style={{ filter: `url(#prophecy-ink-distortion-${i})` }}
            />
          </mask>
        </defs>
      </svg>

      <div
        ref={containerRef}
        className={`relative group/card p-8 md:p-12 rounded-sm transition-all duration-1000 ease-out transform-gpu overflow-hidden min-h-[65vh] flex flex-col border
                      bg-[#f5f2eb] border-[#8b5a2b]/30 text-[#3d2817] shadow-xl
                      ${
                        i === activeIndex
                          ? "translate-x-0 opacity-100 scale-100"
                          : "translate-x-20 opacity-20 scale-95 grayscale"
                      }`}
        style={{
          boxShadow: i === activeIndex ? "0 20px 50px rgba(61, 40, 23, 0.15)" : "none",
        }}
      >
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("/assets/images/craftings/texture_washi.png")`,
              backgroundSize: "cover",
            }}
          />
        </div>

        <div className="relative z-10 flex-1 flex flex-col lg:flex-row gap-12 items-center">
          {/* Content Side */}
          <div className="flex-1 flex flex-col w-full">
            <div className="mb-8 border-b-2 border-double border-[#8b5a2b]/20 pb-6 flex justify-between items-start">
              <div className="flex-1">
                <span className="font-space-mono text-[10px] tracking-[0.5em] uppercase block mb-4 text-[#8b5a2b]/60">
                  Codex Fragment 0{i + 1}
                </span>
                <h2 className="font-kings leading-tight text-5xl md:text-6xl text-[#3d2817]">
                  {p.name}
                </h2>
              </div>
            </div>

            <div className="mb-8 font-bilbo text-2xl md:text-3xl leading-relaxed max-w-none text-[#5c3a21]/90 text-justify">
              <p>{p.description}</p>
            </div>

            <div className="mt-auto">
              <div className="mb-8 pt-6 border-t border-[#8b5a2b]/10">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-3 text-[#8b5a2b]/80">
                  <span className="w-6 h-[1px] bg-[#8b5a2b]/40" />
                  Runes & Sigils
                </h4>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {p.tech?.slice(0, 5).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs uppercase tracking-widest font-space-mono text-[#8b5a2b]"
                    >
                      <span className="opacity-40 mr-1">#</span>
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 pt-4">
                <Link
                  href={`/project/${p.slug}`}
                  className="group/link flex items-center gap-4 py-2 relative overflow-hidden"
                >
                  <span className="font-kings text-2xl text-[#3d2817] group-hover/link:translate-x-1 transition-transform">
                    Access Archives
                  </span>
                  <span className="w-12 h-[1px] bg-[#3d2817]/30" />
                </Link>

                {p.link && (
                  <Link
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-4 py-2 relative overflow-hidden"
                  >
                    <span className="font-kings text-2xl text-[#78350f] group-hover/link:translate-x-1 transition-transform">
                      Live Signal
                    </span>
                    <span className="w-12 h-[1px] bg-[#78350f]/30" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Precise Ink-Blob Reveal Section */}
          <div className="relative w-full lg:w-[450px] aspect-square shrink-0 flex items-center justify-center">
            {/* Background Halo */}
            <div className="absolute inset-0 bg-amber-500/5 blur-[100px] rounded-full" />

            <div className="relative w-full h-full z-10 flex items-center justify-center">
              {/* Outer Decorative Border (Distorted) */}
              <div
                className="absolute inset-0 border-4 border-[#8b5a2b]/20 pointer-events-none z-30"
                style={{
                  maskImage: `url(#torn-mask-user-${i})`,
                  WebkitMaskImage: `url(#torn-mask-user-${i})`,
                  maskSize: "100% 100%",
                  WebkitMaskSize: "100% 100%",
                }}
              />

              {/* The Actual Image Container - Masked but NO FILTER directly on the Image */}
              <div
                className="relative w-full h-full overflow-hidden bg-neutral-950 shadow-2xl"
                style={{
                  maskImage: `url(#torn-mask-user-${i})`,
                  WebkitMaskImage: `url(#torn-mask-user-${i})`,
                  maskSize: "100% 100%",
                  WebkitMaskSize: "100% 100%",
                }}
              >
                {/* Image stays sharp! */}
                <div className="absolute inset-0 bg-amber-900/5 mix-blend-multiply z-10 pointer-events-none" />

                {p.thumbnail ? (
                  <Image src={p.thumbnail} alt={p.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                    <span className="font-kings text-amber-500/20 text-4xl">Locked Archive</span>
                  </div>
                )}

                {/* Inner Depth Shadow */}
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-20 pointer-events-none" />
              </div>
            </div>

            {/* Background Index Number */}
            <div className="absolute -right-8 -bottom-12 text-[14rem] leading-none font-kings text-[#8b5a2b]/10 select-none pointer-events-none z-0 rotate-[-5deg]">
              {(i + 1).toString().padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
