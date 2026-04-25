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

  // Function to generate a torn circle mask as a data URI
  // This is the most reliable way to get a consistent "torn" edge that scales perfectly
  const getTornMask = (seed: number, scale: number = 40) => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
        <filter id="f">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="${seed}" />
          <feDisplacementMap in="SourceGraphic" scale="${scale}" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <circle cx="200" cy="200" r="160" fill="white" filter="url(#f)" />
      </svg>
    `
      .trim()
      .replace(/\n/g, "")
      .replace(/"/g, "'");

    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  };

  const mainMask = getTornMask(i + 100, 50);
  const subMask = getTornMask(i + 200, 40);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center pr-4 md:pr-12">
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

        {/* Decorative Corners */}
        {i === activeIndex && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-[#8b5a2b]/40" />
            <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-[#8b5a2b]/40" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-[#8b5a2b]/40" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-[#8b5a2b]/40" />
          </div>
        )}

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

          {/* Multi-Hole Reveal Section */}
          <div className="relative w-full lg:w-[480px] aspect-square shrink-0 flex items-center justify-center">
            {/* Main Thumbnail Hole */}
            <div className="relative w-[75%] h-[75%] z-10">
              <div className="absolute inset-0 bg-amber-500/5 blur-[100px] rounded-full -z-10" />
              <div
                className="relative w-full h-full overflow-hidden bg-neutral-950 shadow-2xl"
                style={{
                  maskImage: mainMask,
                  WebkitMaskImage: mainMask,
                  maskSize: "cover",
                  WebkitMaskSize: "cover",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                }}
              >
                {p.thumbnail && (
                  <Image src={p.thumbnail} alt={p.name} fill className="object-cover" />
                )}
                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] z-20 pointer-events-none" />
              </div>
            </div>

            {/* Sub-Holes for other images */}
            {p.images && p.images.length > 0 && (
              <>
                {/* Sub Hole 1: Top-Right */}
                <div className="absolute top-0 right-0 w-[40%] aspect-square z-20 -translate-y-6 translate-x-6 rotate-6">
                  <div
                    className="relative w-full h-full overflow-hidden bg-neutral-950 shadow-xl"
                    style={{
                      maskImage: subMask,
                      WebkitMaskImage: subMask,
                      maskSize: "cover",
                      WebkitMaskSize: "cover",
                    }}
                  >
                    <Image src={p.images[0]} alt="Fragment 1" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
                  </div>
                </div>

                {/* Sub Hole 2: Bottom-Left */}
                {p.images.length > 1 && (
                  <div className="absolute bottom-0 left-0 w-[35%] aspect-square z-20 translate-y-8 -translate-x-10 -rotate-12">
                    <div
                      className="relative w-full h-full overflow-hidden bg-neutral-900 shadow-xl"
                      style={{
                        maskImage: subMask,
                        WebkitMaskImage: subMask,
                        maskSize: "cover",
                        WebkitMaskSize: "cover",
                      }}
                    >
                      <Image src={p.images[1]} alt="Fragment 2" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
                    </div>
                  </div>
                )}
              </>
            )}

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
