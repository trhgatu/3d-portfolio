"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAppStore } from "@/hooks";
import { GlobalAtmosphere } from "../../shared";
import { useRouter } from "next/navigation";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const AnimatedText = ({
  text,
  className,
  fontClass = "",
}: {
  text: string;
  className?: string;
  fontClass?: string;
}) => (
  <span className={cn("inline-block", className)}>
    {text.split("").map((char, idx) => (
      <span key={idx} className={cn("inline-block opacity-0 translate-y-4", fontClass)}>
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </span>
);

export const HeroForgeEntry = () => {
  const { } = useAppStore();
  const scope = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shakeRef = useRef<HTMLDivElement>(null);
  const chargeTl = useRef<gsap.core.Timeline | null>(null);
  const router = useRouter();
  const lang = useLang();
  const [isIgnited, setIsIgnited] = useState(false);

  const t = translations[lang].awakening;

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(scope.current, { autoAlpha: 1, duration: 0.5 })
      .to(".hero-text-mini span", { opacity: 1, y: 0, stagger: 0.03, duration: 0.6 })
      .to(".hero-text-name span", { opacity: 1, y: 0, stagger: 0.06, duration: 1 }, "-=0.4")
      .to(".hero-title span", { opacity: 1, y: 0, stagger: 0.04, duration: 1 }, "-=0.6")
      .to(".hero-description span", { opacity: 1, y: 0, stagger: 0.02, duration: 0.5 }, "-=0.4");
  }, []);

  const handleIgniteStart = () => {
    setIsIgnited(true);
  };

  const handleIgniteEnd = () => {
    setIsIgnited(false);
  };

  return (
    <section
      id="hero"
      ref={scope}
      className="hero relative opacity-0 min-h-screen w-full flex items-center justify-center text-center overflow-hidden py-16 px-4"
    >
      <div 
        className="absolute -top-12 -left-12 -right-12 bottom-8 z-0 pointer-events-none"
        style={{ 
          filter: "url(#torn-paper-filter)",
          boxShadow: "0 0 40px rgba(255, 69, 0, 0.4), inset 0 0 60px rgba(255, 140, 0, 0.15)"
        }}
      >
        <div className="absolute inset-0 bg-[#f5f2eb] opacity-90" />
        <div className="absolute rotate-180 inset-0 opacity-40 mix-blend-multiply">
          <div
            style={{
              backgroundImage: "url(/assets/images/craftings/texture_washi.png)",
              backgroundSize: "cover",
              backgroundRepeat: "repeat",
            }}
            className="absolute inset-0"
          />
        </div>
      </div>




      {/* Content inside Full Screen Hero: Editorial Asymmetric Layout */}
      <div
        ref={contentRef}
        className="relative z-30 w-full max-w-screen-2xl h-full px-6 md:px-16 py-12 flex flex-col justify-between items-start text-left min-h-[85vh]"
      >
        {/* Top Section: Large Monumental Author Name on Left */}
        <div className="w-full flex flex-col items-start mt-6 md:mt-12">
          <div className="select-none">
            <h1
              className="hero-text-name text-8xl sm:text-[11rem] md:text-[14rem] font-bold leading-none tracking-tight text-neutral-900"
              style={{ filter: "url(#ink-smudge)" }}
            >
              <AnimatedText text="trhgatu" fontClass="font-kings" />
            </h1>
          </div>
        </div>

        {/* Middle/Bottom Split Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-12 md:mt-0">
          {/* Left Column: Editorial Quote Note */}
          <div className="md:col-span-6 space-y-4">
            <div className="w-12 h-[2px] bg-amber-900/40 mb-4" />
            <div className="hero-description relative">
              <p className="font-playfair-display text-neutral-800 text-base md:text-xl leading-[1.8] italic opacity-95 max-w-xl">
                {t.desc.split(" ").map((word, idx) => (
                  <span key={idx} className="inline-block opacity-0 mr-2">
                    {word}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="md:col-span-6 md:text-right flex flex-col items-start md:items-end justify-end space-y-6">
            <h1
              className={cn(
                "hero-title text-3xl sm:text-4xl md:text-6xl font-bold transition-all duration-700 tracking-wide",
                isIgnited ? "scale-105" : "scale-100"
              )}
            >
              <AnimatedText
                text={t.firstTitle}
                className={cn(
                  "block transition-colors duration-700",
                  isIgnited ? "text-amber-800" : "text-neutral-800"
                )}
                fontClass={
                  lang === "vi" ? "font-playfair-display italic" : "font-cinzel-decorative"
                }
              />
              <AnimatedText
                text={t.secondTitle}
                className={cn(
                  "block transition-colors duration-700 text-amber-900/80 mt-1",
                  isIgnited ? "text-amber-800" : "text-amber-900/80"
                )}
                fontClass={
                  lang === "vi" ? "font-playfair-display italic" : "font-cinzel-decorative"
                }
              />
            </h1>
          </div>
        </div>
      </div>

      <svg className="absolute w-0 h-0 pointer-events-none">
        <filter id="ink-smudge">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="4"
            seed="8"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
        </filter>
      </svg>
    </section>
  );
};
