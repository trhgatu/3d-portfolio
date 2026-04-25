"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TheJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgAdventureRef = useRef<HTMLDivElement>(null);
  const mistLeftRef = useRef<HTMLDivElement>(null);
  const mistRightRef = useRef<HTMLDivElement>(null);
  const legaciesContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.to(".sand-layer-1", {
        backgroundPosition: "20% 100%",
        duration: 40,
        repeat: -1,
        ease: "linear",
        yoyo: true,
      });

      gsap.to(".sand-layer-2", {
        backgroundPosition: "-20% 50%",
        duration: 25,
        repeat: -1,
        ease: "linear",
        yoyo: true,
      });

      gsap.to(".sand-layer-3", {
        xPercent: -50,
        duration: 15,
        repeat: -1,
        ease: "linear",
      });

      const entries = containerRef.current.querySelectorAll(".narrative-entry");
      gsap.set(entries, { opacity: 0 });
      gsap.set(".narrative-char", { opacity: 0, x: -20, filter: "blur(10px)" });

      gsap.set(bgAdventureRef.current, { opacity: 0, scale: 1.5, filter: "blur(10px)" });
      gsap.set(mistLeftRef.current, { xPercent: 0, opacity: 1 });
      gsap.set(mistRightRef.current, { xPercent: 0, opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%",
          pin: true,
          scrub: 1.5,
        },
      });

      entries.forEach((entry) => {
        const chars = entry.querySelectorAll(".narrative-char");
        tl.to(entry, { opacity: 1, duration: 0.1 })
          .to(
            chars,
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              stagger: 0.02,
              duration: 0.8,
              ease: "power2.out",
            },
            ">"
          )
          .to(chars, { opacity: 1, duration: 1 })
          .to(
            chars,
            {
              opacity: 0,
              x: 40,
              filter: "blur(15px)",
              stagger: 0.01,
              duration: 0.6,
              ease: "power2.in",
            },
            ">"
          )
          .to(entry, { opacity: 0, duration: 0.1 });
      });

      tl.to([".bridge-bg"], { opacity: 0, duration: 1.5, ease: "power2.inOut" }, "+=0.2");
      tl.to(containerRef.current, { backgroundColor: "#0a0a0a", duration: 2 }, "<");

      tl.to(
        mistLeftRef.current,
        { xPercent: -120, opacity: 0, duration: 3, ease: "power2.inOut" },
        "<+=0.5"
      );
      tl.to(
        mistRightRef.current,
        { xPercent: 120, opacity: 0, duration: 3, ease: "power2.inOut" },
        "<"
      );
      tl.to(
        bgAdventureRef.current,
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2.5, ease: "power2.out" },
        "<"
      );

      tl.fromTo(
        ".crafting-title span",
        { opacity: 0, y: 50, filter: "blur(10px)", scale: 1.2 },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          stagger: 0.05,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
        "-=1.0"
      )
        .fromTo(
          ".crafting-text span",
          { opacity: 0, y: 30, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.02,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .fromTo(
          ".crafting-quote",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          "#maktub",
          { opacity: 0, scale: 1.2, filter: "blur(10px)" },
          { opacity: 0.4, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" },
          "+=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-transparent text-neutral-800 overflow-hidden"
    >
      <div
        ref={bgAdventureRef}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none transition-colors duration-1000"
      >
        <div className="absolute inset-0 bg-neutral-950 opacity-0 group-data-[final=true]:opacity-100 transition-opacity duration-1000" />
        <Image
          src="/assets/images/adventure.svg"
          alt="Desert Adventure"
          width={1000}
          height={1000}
          priority
          className="object-contain w-full h-full opacity-5 md:opacity-[0.05] invert brightness-200"
        />
        {}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-950/20 to-neutral-950 opacity-80" />
      </div>

      {}
      <div className="absolute inset-0 z-10 pointer-events-none flex">
        <div ref={mistLeftRef} className="flex-1 h-full relative z-20">
          <Image
            src="/assets/images/cloud.png"
            alt="Mist"
            fill
            className="object-cover scale-150 translate-x-1/4 sepia saturate-150 hue-rotate-15 contrast-110 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200 via-amber-200/50 to-transparent mix-blend-overlay" />
        </div>
        <div ref={mistRightRef} className="flex-1 h-full relative z-20">
          <Image
            src="/assets/images/cloud.png"
            alt="Mist"
            fill
            className="object-cover scale-150 -translate-x-1/4 sepia saturate-150 hue-rotate-15 contrast-110 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-amber-200 via-amber-200/50 to-transparent mix-blend-overlay" />
        </div>
      </div>

      <div className="bridge-bg absolute inset-0 z-30 pointer-events-none">
        <Image
          src="/assets/images/sun-clouds-bg.png"
          alt="Ethereal Sun and Clouds"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-amber-900/20 mix-blend-multiply opacity-60" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle, transparent 40%, rgba(120, 60, 0, 0.3) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
        <div className="absolute top-0 left-0 right-0 h-60 bg-gradient-to-b from-white via-white/60 to-transparent" />
        <div
          className="sand-layer-1 absolute inset-0 bg-repeat opacity-60 mix-blend-screen scale-110"
          style={{
            backgroundImage: `url(/assets/images/sandstorm-overlay.png)`,
            backgroundSize: "cover",
            filter: "sepia(1) saturate(1.5)",
          }}
        />
        <div
          className="sand-layer-2 absolute inset-0 bg-repeat opacity-50 mix-blend-screen scale-125"
          style={{
            backgroundImage: `url(/assets/images/sandstorm-overlay.png)`,
            backgroundSize: "120% auto",
            transform: "scaleX(-1)",
            filter: "sepia(1) saturate(2) hue-rotate(-15deg)",
          }}
        />
        <div className="sand-layer-3 absolute inset-0 w-[200%] h-full opacity-40 mix-blend-overlay flex">
          <div
            className="w-full h-full relative"
            style={{
              backgroundImage: `url(/assets/images/sandstorm-overlay.png)`,
              backgroundSize: "cover",
              filter: "blur(2px) sepia(1)",
            }}
          />
          <div
            className="w-full h-full relative"
            style={{
              backgroundImage: `url(/assets/images/sandstorm-overlay.png)`,
              backgroundSize: "cover",
              filter: "blur(2px) sepia(1)",
              transform: "scaleX(-1)",
            }}
          />
        </div>
      </div>
      <div className="relative z-50 w-full max-w-4xl px-6 h-full flex items-center justify-center pointer-events-none">
        <div className="narrative-entry absolute inset-0 flex items-center justify-center">
          <p className="font-playfair-display text-3xl md:text-5xl leading-tight italic text-neutral-800 drop-shadow-sm text-center">
            {'"There is a language beyond words..."'.split("").map((char, i) => (
              <span key={i} className="narrative-char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>
        <div className="narrative-entry absolute inset-0 flex items-center justify-center">
          <p className="font-playfair-display text-3xl md:text-5xl leading-tight italic text-neutral-800 drop-shadow-sm text-center">
            {'"It speaks of the courage to follow one\'s own Personal Legend."'
              .split("")
              .map((char, i) => (
                <span key={i} className="narrative-char inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
          </p>
        </div>
        <div className="narrative-entry absolute inset-0 flex items-center justify-center">
          <p className="font-playfair-display text-4xl md:text-6xl italic text-neutral-900 tracking-wide text-center">
            {'"Until the hands build what the heart has always known."'.split("").map((char, i) => (
              <span key={i} className="narrative-char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div
        ref={legaciesContentRef}
        className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        <div className="crafting-content relative">
          <h2 className="crafting-title text-3xl md:text-5xl lg:text-6xl font-kings tracking-wide mb-8 text-amber-100 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]">
            {"Crafting Legacies".split("").map((char, i) => (
              <span key={i} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>

          <p className="crafting-text text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto text-neutral-400 font-playfair-display">
            {"Every line of code is not just a solution — it's a legacy, a trace left behind to inspire, empower, and endure."
              .split(" ")
              .map((word, i) => (
                <span key={i} className="inline-block mr-2">
                  {word}
                </span>
              ))}
          </p>

          <div className="crafting-quote relative mt-16 italic text-lg md:text-2xl max-w-4xl mx-auto text-neutral-300">
            <Image
              src="/assets/images/apos.svg"
              alt="quote open mark"
              width={80}
              height={80}
              className="absolute -top-10 -left-12 opacity-20 invert select-none pointer-events-none"
            />
            <Image
              src="/assets/images/apos.svg"
              alt="quote close mark"
              width={80}
              height={80}
              className="absolute -bottom-10 -right-12 opacity-20 invert rotate-180 select-none pointer-events-none"
            />
            <span className="relative z-10 block leading-relaxed text-3xl md:text-5xl font-playfair-display text-neutral-100">
              “And, when you want something, all the universe conspires in helping you to achieve
              it.”
            </span>

            <div className="mt-8 relative z-10 font-space-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
              — Paulo Coelho, <span className="text-amber-500 font-bold">The Alchemist</span>
            </div>

            <div
              id="maktub"
              className="mt-20 font-kings text-4xl md:text-6xl tracking-[0.6em] text-amber-500 select-none pointer-events-none drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]"
            >
              MAKTUB
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
