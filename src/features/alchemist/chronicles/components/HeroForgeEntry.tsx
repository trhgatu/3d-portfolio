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
  const {} = useAppStore();
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
    chargeTl.current = gsap.timeline({ onComplete: () => router.push("/chronicles") });
    chargeTl.current
      .to(shakeRef.current, {
        x: "+=2",
        y: "+=2",
        yoyo: true,
        repeat: -1,
        duration: 0.05,
        ease: "none",
      })
      .to(
        contentRef.current,
        { scale: 8, filter: "blur(30px)", opacity: 0, duration: 1.2, ease: "power2.in" },
        0
      )
      .to(
        ".hero-wrapper-content span",
        {
          opacity: 0,
          scale: 0.5,
          y: 100,
          stagger: { amount: 0.4, from: "random" },
          duration: 0.8,
          ease: "power1.in",
        },
        0.2
      );
  };

  const handleIgniteEnd = () => {
    setIsIgnited(false);
    chargeTl.current?.kill();
    gsap.to([contentRef.current, shakeRef.current], {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.5,
    });
    gsap.to(".hero-wrapper-content span", { opacity: 1, y: 0, scale: 1, duration: 0.5 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const xPos = (clientX - left) / width - 0.5;
    const yPos = (clientY - top) / height - 0.5;
    gsap.to(contentRef.current, { x: xPos * 20, y: yPos * 20, duration: 1, ease: "power2.out" });
  };

  return (
    <section
      id="hero"
      ref={scope}
      onMouseMove={handleMouseMove}
      className="hero relative opacity-0 min-h-screen flex items-center justify-center text-center overflow-hidden bg-[#050810]"
    >
      <div
        className={cn(
          "absolute inset-0 z-0 transition-colors duration-[3000ms] ease-in-out",
          isIgnited ? "bg-[#2a0800]" : "bg-[#1a202c]"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 opacity-40 mix-blend-screen transition-colors duration-[3000ms] blur-[80px]",
            isIgnited
              ? "bg-[radial-gradient(circle,#ff4400_0%,transparent_70%)]"
              : "bg-[radial-gradient(circle,#ffffff_0%,transparent_60%)]"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 opacity-30 mix-blend-overlay transition-colors duration-[3000ms] blur-[60px]",
            isIgnited
              ? "bg-[radial-gradient(circle_at_20%_30%,#ff8800_0%,transparent_50%)]"
              : "bg-[radial-gradient(circle_at_80%_20%,#d1d5db_0%,transparent_50%)]"
          )}
        />
      </div>

      <GlobalAtmosphere isIgnited={isIgnited} showSeal={true} showStars={false} sparkCount={500} />

      <div
        ref={contentRef}
        className="relative z-30 w-full max-w-screen-xl px-4 py-12 will-change-transform flex flex-col items-center"
      >
        <div className="hero-wrapper-content w-full">
          <div
            className="cursor-pointer group select-none w-fit mx-auto"
            onMouseEnter={handleIgniteStart}
            onMouseLeave={handleIgniteEnd}
            onClick={() => router.push("/chronicles")}
          >
            <div ref={shakeRef}>
              <div className="flex flex-col md:flex-row items-center justify-center mb-4">
                <AnimatedText
                  text={t.intro}
                  className={cn(
                    "hero-text-mini md:mr-8 text-3xl md:text-4xl text-white/30 mb-4 md:mb-0 group-hover:text-amber-200/60 transition-colors duration-500",
                    lang === "vi" ? "font-playfair-display italic" : "font-cinzel-decorative"
                  )}
                />
                <h1
                  className={cn(
                    "hero-text-name text-7xl md:text-[10rem] font-bold leading-none transition-all duration-700",
                    isIgnited
                      ? "text-amber-100 drop-shadow-[0_0_45px_rgba(255,170,50,0.7)]"
                      : "text-white/90"
                  )}
                  style={{ filter: !isIgnited ? "url(#ink-smudge)" : "none" }}
                >
                  <AnimatedText text="trhgatu" fontClass="font-kings" />
                </h1>
              </div>

              <h1
                className={cn(
                  "hero-title flex flex-wrap justify-center gap-3 text-3xl md:text-5xl font-bold transition-all duration-700",
                  isIgnited ? "scale-105" : "scale-100"
                )}
              >
                <AnimatedText
                  text={t.firstTitle}
                  className={cn(
                    "transition-colors duration-700",
                    isIgnited
                      ? "text-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.9)]"
                      : "text-white/60"
                  )}
                  fontClass={
                    lang === "vi" ? "font-playfair-display italic" : "font-cinzel-decorative"
                  }
                />
                <AnimatedText
                  text={t.secondTitle}
                  className={cn(
                    "transition-colors duration-700",
                    isIgnited
                      ? "text-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.9)]"
                      : "text-white/60"
                  )}
                  fontClass={
                    lang === "vi" ? "font-playfair-display italic" : "font-cinzel-decorative"
                  }
                />
              </h1>
            </div>
          </div>

          <div className="hero-description relative mt-8 md:mt-12 max-w-3xl mx-auto">
            <p className="font-playfair-display text-white/60 text-base md:text-xl leading-[2] italic opacity-90">
              {t.desc.split(" ").map((word, idx) => (
                <span key={idx} className="inline-block opacity-0 mr-2">
                  {word}
                </span>
              ))}
            </p>
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
