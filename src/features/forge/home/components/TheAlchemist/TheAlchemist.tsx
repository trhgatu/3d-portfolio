"use client";
import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { TheAlchemistJournal } from "./TheAlchemistJournal";
import { TheAlchemistRecipes } from "./TheAlchemistRecipes";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TheAlchemist() {
  const containerRef = useRef<HTMLDivElement>(null);

  const theAlchemistText =
    "In the digital forge, architecture and ambition become one. I do not merely write syntax; I shape the unseen systems that govern the living web. Each line of code is a forged link, binding chaotic ideas into enduring structures. Welcome to the crucible where engineering meets intent.";
  useGSAP(
    () => {
      gsap.fromTo(
        ".the-alchemist-title.line-1 span",
        { opacity: 0, y: 40, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.05,
          duration: 1,
          scrollTrigger: {
            trigger: ".the-alchemist-title.line-1",
            start: "top 85%",
            end: "bottom 65%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".the-alchemist-title.line-2 span",
        { opacity: 0, scale: 0.8, yPercent: 50 },
        {
          opacity: 1,
          scale: 1,
          yPercent: 0,
          stagger: 0.05,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".the-alchemist-title.line-2",
            start: "top 85%",
            end: "bottom 65%",
            scrub: 1,
          },
        }
      );

      // Text animation with burning effect
      gsap.fromTo(
        ".the-alchemist-desc-1 .char",
        {
          opacity: 0.3,
          color: "#a3a3a3",
          filter: "brightness(1)",
          textShadow: "0 0 0px rgba(255,100,0,0)",
        },
        {
          keyframes: [
            {
              opacity: 1,
              color: "#ff6b35",
              filter: "brightness(1.5)",
              textShadow: "0 0 15px rgba(255,107,53,0.8), 0 0 30px rgba(255,107,53,0.4)",
              duration: 0.25,
            },
            {
              color: "#171717",
              filter: "brightness(1)",
              textShadow: "0 0 0px rgba(0,0,0,0)",
              duration: 0.35,
            },
          ],
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".the-alchemist-desc-1",
            start: "top 80%",
            end: "bottom 50%",
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="the-alchemist"
      ref={containerRef}
      className="the-alchemist min-h-screen relative z-0 pb-32"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        {}
        <div
          className="absolute inset-[2%] md:inset-[5%] bg-[#e8e4d9] z-0"
          style={{
            filter: "url(#torn-paper-filter)",
            opacity: 0.85,
          }}
        >
          <div className="absolute inset-0 bg-[#f5f2eb] opacity-90" />
          <div className="absolute rotate-180 inset-0 opacity-40 mix-blend-multiply z-0">
            <div
              style={{
                backgroundImage: "url(/assets/images/craftings/texture_washi.png)",
                backgroundSize: "contain",
                backgroundRepeat: "repeat-y",
              }}
              className="absolute inset-0"
            />
          </div>
          {}
          <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              filter: "url(#torn-paper-filter)",
              boxShadow:
                "0 0 20px 5px rgba(251, 191, 36, 0.2), inset 0 0 15px rgba(180, 83, 9, 0.1)",
            }}
          />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-50">
        <div
          className="absolute left-10 top-1/2 origin-center"
          aria-hidden="true"
          style={{
            transform: "translateY(-50%) rotate(-90deg)",
            transformOrigin: "left center",
          }}
        >
          <div className="flex items-center gap-2 text-neutral-400/35 font-kings select-none mix-blend-multiply">
            <span className="text-neutral-500/20 text-xl">◆</span>
            <span className="text-4xl md:text-6xl tracking-[0.5em]">SOLVE</span>
            <span className="text-neutral-500/20 text-xl">◆</span>
          </div>
        </div>

        <div
          className="absolute right-10 top-1/2 origin-center"
          aria-hidden="true"
          style={{
            transform: "translateY(-50%) rotate(90deg)",
            transformOrigin: "right center",
          }}
        >
          <div className="flex items-center gap-2 text-neutral-400/35 font-kings select-none mix-blend-multiply">
            <span className="text-neutral-500/20 text-xl">◆</span>
            <span className="text-4xl md:text-6xl tracking-[0.5em]">COAGULA</span>
            <span className="text-neutral-500/20 text-xl">◆</span>
          </div>
        </div>
      </div>

      <div className="the-alchemist-wrapper max-w-7xl mx-auto py-12 relative z-10 flex flex-col items-center px-4 h-full justify-center">
        <div className="relative w-40 h-40 md:w-40 md:h-40 opacity-40 mix-blend-multiply z-50 pointer-events-none">
          <Image
            src="/assets/images/craftings/eye_of_providence.png"
            alt="Eye of Providence"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="the-alchemist-title-container text-center text-neutral-900 mb-8 pt-32 md:pt-40">
          <div
            className="the-alchemist-title line-1 text-5xl md:text-7xl font-kings tracking-wide relative z-20"
            aria-label="The Alchemist"
          >
            {"The Alchemist".split("").map((char, idx) => (
              <span key={idx} className="inline-block" aria-hidden="true">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 my-6 relative z-20 opacity-70">
            <div className="w-24 h-[1px] bg-neutral-500" />
            <span className="text-xl text-neutral-500 font-serif">✧</span>
            <div className="w-24 h-[1px] bg-neutral-500" />
          </div>

          <div
            className="the-alchemist-title line-2 text-2xl font-serif md:text-3xl italic mt-0 text-neutral-600 relative z-20 tracking-wide"
            aria-label="The Art of Forging the Creator"
          >
            {"The Art of Forging the Creator".split("").map((char, idx) => (
              <span key={idx} className="inline-block" aria-hidden="true">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>

        <div className="the-alchemist-content-container font-serif relative z-10 w-full flex flex-col items-center gap-16">
          <div className="space-y-6 p-6 md:p-0 relative z-20 text-center max-w-5xl mx-auto mb-12">
            <p
              className="the-alchemist-desc-1 text-3xl sm:text-4xl lg:text-5xl leading-[1.6] text-neutral-900 font-medium font-bilbo relative"
              aria-label={theAlchemistText}
            >
              {theAlchemistText.split(" ").map((word, wi) => (
                <span key={wi} className="word inline-block mr-2" aria-hidden="true">
                  {word.split("").map((char, ci) => (
                    <span key={ci} className="char inline-block text-neutral-600">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </p>
          </div>

          <div className="w-full space-y-12 mt-12">
            <TheAlchemistJournal />
            <TheAlchemistRecipes />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-12 opacity-30 pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <div className="w-8 h-[1px] bg-neutral-600" />
          <span className="font-kings text-sm text-neutral-700 tracking-wider">FOLIO III</span>
        </div>
      </div>
    </section>
  );
}
