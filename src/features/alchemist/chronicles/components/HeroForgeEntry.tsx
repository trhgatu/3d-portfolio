"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAppStore } from "@/hooks";
import { ScenePhase } from "@/constants/ScenePhase";
import { GlobalAtmosphere } from "../../shared";
import { useRouter } from "next/navigation";

gsap.registerPlugin(useGSAP);

export const HeroForgeEntry = () => {
  const { scenePhase, setScenePhase, loadingProgress } = useAppStore();
  const scope = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  const bgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [introFinished, setIntroFinished] = useState(false);
  const [forceProceed, setForceProceed] = useState(false);
  const [isIgnited, setIsIgnited] = useState(false);

  useEffect(() => {
    if (!introFinished) return;

    const timer = setTimeout(() => {
      setForceProceed(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, [introFinished]);

  const triggerExit = useCallback(() => {
    sessionStorage.setItem("forge_visited", "true");
    setScenePhase(ScenePhase.HERO_ANIMATION);
  }, [setScenePhase]);

  useEffect(() => {
    if (introFinished) {
      if (loadingProgress >= 100 || forceProceed) {
        triggerExit();
      }
    }
  }, [introFinished, loadingProgress, forceProceed, triggerExit]);

  useGSAP(() => {
    if (
      (scenePhase !== ScenePhase.OVERLAY_ANIMATION && scenePhase !== ScenePhase.HERO_ANIMATION) ||
      animated.current
    )
      return;
    animated.current = true;

    const tl = gsap.timeline({ defaults: { ease: "power3.out", opacity: 1 } });

    tl.set(scope.current, { autoAlpha: 1 });

    tl.fromTo(
      ".hero-text-mini span",
      { y: 20, opacity: 0 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
      }
    )
      .fromTo(
        ".hero-text-name span",
        { y: 30, opacity: 0 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.06,
        },
        "-=0.4"
      )
      .call(() => {
        setIntroFinished(true);
      })
      .fromTo(
        ".hero-title span",
        { y: 20, opacity: 0 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.04,
        },
        "-=0.6"
      )
      .fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.2"
      )
      .fromTo(
        ".hero-description span",
        { y: 10, opacity: 0 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.02,
        },
        "-=0.4"
      );

    gsap.to(bgRef.current, {
      scale: 1.05,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [scenePhase]);

  const chargeTl = useRef<gsap.core.Timeline | null>(null);
  const router = useRouter();
  const shakeRef = useRef<HTMLDivElement>(null);

  const handleIgniteStart = () => {
    setIsIgnited(true);

    chargeTl.current = gsap.timeline({
      onComplete: () => {
        router.push("/chronicles");
      },
    });

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
        {
          scale: 8,
          filter: "blur(30px)",
          opacity: 0,
          zIndex: 10,
          duration: 1.2,
          ease: "power2.in",
        },
        0
      )
      .to(
        ".hero-text-name span, .hero-title span, .hero-text-mini span",
        {
          opacity: 0,
          scale: 0.5,
          y: 100,
          stagger: { amount: 0.4, from: "random" },
          duration: 0.8,
          ease: "power1.in",
        },
        0.2
      )
      .to(
        bgRef.current,
        {
          scale: 2,
          opacity: 0,
          duration: 1,
        },
        0.2
      );
  };

  const handleIgniteEnd = () => {
    setIsIgnited(false);
    if (chargeTl.current) {
      chargeTl.current.kill();
      gsap.to(contentRef.current, {
        scale: 1,
        opacity: 1,
        zIndex: 30,
        filter: "blur(0px)",
        duration: 0.5,
      });
      gsap.to(shakeRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
      });
      gsap.to(bgRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
      });
      gsap.to("#ink-transmutation-filter feDisplacementMap", {
        attr: { scale: 0 },
        duration: 0.5,
      });
      gsap.to("#ink-transmutation-filter feTurbulence", {
        attr: { baseFrequency: 0.04 },
        duration: 0.5,
      });
      gsap.to(".hero-text-name span, .hero-title span, .hero-text-mini span", {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.5,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const { width, height } = rect;

    const xPos = clientX / width - 0.5;
    const yPos = clientY / height - 0.5;

    gsap.to(bgRef.current, {
      x: xPos * -30,
      y: yPos * -30,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(contentRef.current, {
      x: xPos * 15,
      y: yPos * 15,
      duration: 1,
      ease: "power2.out",
    });
  };

  const name = "trhgatu";
  const introText = "I am";
  const firstTitle = "Digital";
  const secondTitle = "Alchemist";
  const descriptionText =
    "Ideas are fleeting. Masterpieces are eternal. I transform the intangible into the unforgettable—forging reality from pure imagination.";

  return (
    <section
      id="hero"
      ref={scope}
      onMouseMove={handleMouseMove}
      className="hero relative opacity-0 min-h-screen flex items-center justify-center text-center overflow-hidden"
    >
      <div
        className={`absolute inset-0 z-0 transition-colors duration-1000 ease-in-out ${
          isIgnited ? "bg-[#1a0500]" : "bg-[#050810]"
        }`}
      />

      <GlobalAtmosphere isIgnited={isIgnited} showSeal={true} />

      <div className="absolute inset-0 z-[25] pointer-events-none" />
      <div
        ref={contentRef}
        className="py-12 w-full mx-auto max-w-screen-xl relative z-30 will-change-transform flex flex-col items-center justify-center"
      >
        <div className="hero-wrapper-content w-full px-4">
          <p className="hero-subtitle text-xs md:text-sm font-space-mono uppercase tracking-[0.4em] text-white/50 mb-8 opacity-80">
            Where Vision Becomes Masterpiece
          </p>

          <div
            className="interaction-trigger cursor-pointer group select-none w-fit mx-auto"
            onMouseEnter={handleIgniteStart}
            onMouseLeave={handleIgniteEnd}
            onClick={() => router.push("/chronicles")}
          >
            <div ref={shakeRef}>
              <div className="hero-text-first font-mono items-center justify-center flex flex-col md:flex-row mb-4">
                <div className="hero-text-mini justify-center gap-1 md:mr-8 text-3xl md:text-4xl text-neutral-500 font-cinzel-decorative mb-4 md:mb-0 group-hover:text-amber-200/80 transition-colors duration-500">
                  {introText.split("").map((char, idx) => (
                    <span key={idx} className="inline-block opacity-0">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </div>
                <h1
                  className={`hero-text-name justify-center gap-2 text-7xl md:text-[10rem] font-bold leading-none transition-all duration-700 ${
                    isIgnited
                      ? "text-amber-100 drop-shadow-[0_0_45px_rgba(255,170,50,0.7)]"
                      : "text-white/95 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  }`}
                >
                  {name.split("").map((char, idx) => (
                    <span key={idx} className="inline-block font-kings opacity-0">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </h1>
              </div>

              <div className="hero-text-second font-mono mb-12 md:mb-16">
                <h1
                  className={`hero-title flex flex-wrap justify-center gap-3 text-3xl md:text-5xl font-bold transition-all duration-700 ${
                    isIgnited ? "scale-105" : "scale-100"
                  }`}
                >
                  {firstTitle.split("").map((char, idx) => (
                    <span
                      key={idx}
                      className={`inline-block font-cinzel-decorative opacity-0 transition-colors duration-700 ${
                        isIgnited
                          ? "text-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.9)]"
                          : "text-neutral-500/80 drop-shadow-none"
                      }`}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                  <span className="w-3 md:w-6" />
                  {secondTitle.split("").map((char, idx) => (
                    <span
                      key={idx}
                      className={`inline-block font-cinzel-decorative opacity-0 transition-colors duration-700 ${
                        isIgnited
                          ? "text-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.9)]"
                          : "text-neutral-500/80 drop-shadow-none"
                      }`}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </h1>
              </div>
            </div>
          </div>

          <div className="description flex justify-center px-4">
            <div className="hero-description relative mt-4 md:mt-10 max-w-3xl">
              <div className="absolute -inset-10 bg-neutral-900/5 blur-3xl -z-10 rounded-full" />
              <p className="font-cinzel-decorative text-neutral-400 text-base md:text-lg leading-[1.8] block tracking-[0.1em]">
                {descriptionText.split(" ").map((word, idx) => (
                  <span key={idx} className="inline-block opacity-0 mr-2">
                    {word}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
