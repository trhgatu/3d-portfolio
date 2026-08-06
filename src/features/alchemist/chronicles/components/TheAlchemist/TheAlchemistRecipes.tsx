"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";

export function TheAlchemistRecipes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const t = translations[lang].chronicles.alchemist.recipes;

  useGSAP(
    () => {
      // Subtle fade in for manuscript elements
      gsap.from(".recipe-anim", {
        opacity: 0,
        y: 30,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      // Burn scroll animation for Magnum Opus
      gsap.fromTo(
        ".magnum-opus-title .char",
        {
          opacity: 0.3,
          color: "#3d2817",
          filter: "brightness(1)",
          textShadow: "0 0 0px rgba(255,100,0,0)",
          y: 0,
        },
        {
          keyframes: [
            {
              opacity: 1,
              color: "#ff6b35",
              filter: "brightness(1.5)",
              textShadow: "0 0 20px rgba(255,107,53,0.9), 0 0 40px rgba(255,107,53,0.5)",
              y: -5,
              duration: 0.25,
            },
            {
              color: "#3d2817",
              filter: "brightness(1)",
              textShadow: "0 0 0px rgba(0,0,0,0)",
              y: 0,
              duration: 0.35,
            },
          ],
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".magnum-opus-title",
            start: "top 85%",
            end: "bottom 45%",
            scrub: 1,
          },
        }
      );

      // Burn scroll animation for Manifestation
      gsap.fromTo(
        ".manifestation-title .char",
        {
          opacity: 0.3,
          color: "#3d2817",
          filter: "brightness(1)",
          textShadow: "0 0 0px rgba(255,100,0,0)",
          y: 0,
        },
        {
          keyframes: [
            {
              opacity: 1,
              color: "#ff6b35",
              filter: "brightness(1.5)",
              textShadow: "0 0 20px rgba(255,107,53,0.9), 0 0 40px rgba(255,107,53,0.5)",
              y: -5,
              duration: 0.25,
            },
            {
              color: "#3d2817",
              filter: "brightness(1)",
              textShadow: "0 0 0px rgba(0,0,0,0)",
              y: 0,
              duration: 0.35,
            },
          ],
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".manifestation-title",
            start: "top 85%",
            end: "bottom 45%",
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto px-4 relative mt-16 md:mt-32 mb-24">
      {/* The Recipe Book / Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto md:p-8">
        {/* Title Area */}
        <div className="text-center mb-16 relative flex flex-col items-center recipe-anim">
          <h3 className="magnum-opus-title font-kings text-5xl md:text-7xl text-[#3d2817] mb-4 relative">
            {t.magnumOpus.split("").map((char, idx) => (
              <span key={idx} className="char inline-block" aria-hidden="true">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h3>
          <div className="flex items-center justify-center gap-4 my-6 relative z-20 opacity-70">
            <div className="w-24 h-[1px] bg-neutral-500" />
            <span className="text-xl text-neutral-500 font-serif">✧</span>
            <div className="w-24 h-[1px] bg-neutral-500" />
          </div>
          <p className="font-bilbo text-3xl text-neutral-700 max-w-2xl mx-auto italic mt-4">
            {t.desc}
          </p>
        </div>

        {/* The Recipe Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 relative z-10">
          {/* Left Column (Ingredients & Catalysts) */}
          <div className="space-y-12">
            <div className="recipe-anim">
              <h4 className="font-kings text-4xl text-[#5c3a21] border-b border-[#5c3a21]/20 pb-3 mb-6 flex items-center gap-4">
                <span className="text-3xl opacity-60">☿</span> {t.materiaPrima}
              </h4>
              <ul className="space-y-6 font-serif text-[#3d2817]">
                <li className="flex justify-between items-end border-b border-dotted border-[#8b5a2b]/40 pb-1">
                  <span>
                    <strong className="font-kings text-2xl">{t.ingredients.fluidity}</strong>{" "}
                    <span className="text-xs md:text-sm opacity-70 ml-1">
                      ({t.ingredients.mercury})
                    </span>
                  </span>
                  <span className="font-bilbo text-2xl text-[#78350f]">
                    {t.ingredients.measures}
                  </span>
                </li>
                <li className="flex justify-between items-end border-b border-dotted border-[#8b5a2b]/40 pb-1">
                  <span>
                    <strong className="font-kings text-2xl">{t.ingredients.passion}</strong>{" "}
                    <span className="text-xs md:text-sm opacity-70 ml-1">
                      ({t.ingredients.sulfur})
                    </span>
                  </span>
                  <span className="font-bilbo text-2xl text-[#78350f]">{t.ingredients.ember}</span>
                </li>
                <li className="flex justify-between items-end border-b border-dotted border-[#8b5a2b]/40 pb-1">
                  <span>
                    <strong className="font-kings text-2xl">{t.ingredients.grounding}</strong>{" "}
                    <span className="text-xs md:text-sm opacity-70 ml-1">
                      ({t.ingredients.salt})
                    </span>
                  </span>
                  <span className="font-bilbo text-2xl text-[#78350f]">
                    {t.ingredients.pinches}
                  </span>
                </li>
                <li className="flex justify-between items-end border-b border-dotted border-[#8b5a2b]/40 pb-1">
                  <span>
                    <strong className="font-kings text-2xl">{t.ingredients.energy}</strong>{" "}
                    <span className="text-xs md:text-sm opacity-70 ml-1">
                      ({t.ingredients.fire})
                    </span>
                  </span>
                  <span className="font-bilbo text-2xl text-[#78350f]">{t.ingredients.boil}</span>
                </li>
              </ul>
            </div>

            <div className="recipe-anim">
              <h4 className="font-kings text-4xl text-[#5c3a21] border-b border-[#5c3a21]/20 pb-3 mb-6 flex items-center gap-4">
                <span className="text-3xl opacity-60">⚗</span> {t.catalysts.title}
              </h4>
              <ul className="space-y-6 font-serif text-[#3d2817]">
                <li className="flex justify-between items-end border-b border-dotted border-[#8b5a2b]/40 pb-1">
                  <span>
                    <strong className="font-kings text-2xl">{t.catalysts.obsession}</strong>
                  </span>
                  <span className="font-bilbo text-2xl text-[#78350f]">
                    {t.catalysts.obsessionDesc}
                  </span>
                </li>
                <li className="flex justify-between items-end border-b border-dotted border-[#8b5a2b]/40 pb-1">
                  <span>
                    <strong className="font-kings text-2xl">{t.catalysts.curiosity}</strong>
                  </span>
                  <span className="font-bilbo text-2xl text-[#78350f]">
                    {t.catalysts.curiosityDesc}
                  </span>
                </li>
                <li className="flex justify-between items-end border-b border-dotted border-[#8b5a2b]/40 pb-1">
                  <span>
                    <strong className="font-kings text-2xl">{t.catalysts.discipline}</strong>
                  </span>
                  <span className="font-bilbo text-2xl text-[#78350f]">
                    {t.catalysts.disciplineDesc}
                  </span>
                </li>
                <li className="flex justify-between items-end border-b border-dotted border-[#8b5a2b]/40 pb-1">
                  <span>
                    <strong className="font-kings text-2xl">{t.catalysts.solitude}</strong>
                  </span>
                  <span className="font-bilbo text-2xl text-[#78350f]">
                    {t.catalysts.solitudeDesc}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column (The Process & Circle) */}
          <div className="flex flex-col h-full recipe-anim">
            <h4 className="font-kings text-4xl text-[#5c3a21] border-b border-[#5c3a21]/20 pb-3 mb-8 flex items-center gap-4">
              <span className="text-3xl opacity-60">☉</span> {t.process.title}
            </h4>

            <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-10 mt-4 group flex-shrink-0">
              {/* Transmutation Circle Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/craftings/transmutation_circle.png"
                alt="Transmutation Circle"
                className="absolute inset-0 w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-700 animate-[spin_40s_linear_infinite]"
                style={{ filter: "sepia(0.5) hue-rotate(-20deg) contrast(1.2)" }}
              />
              <div className="absolute inset-0 bg-amber-600/10 rounded-full blur-2xl opacity-40 mix-blend-multiply pointer-events-none" />
            </div>

            <div className="font-serif text-[#3d2817] space-y-8 text-justify leading-relaxed flex-grow text-lg">
              <p>
                <span className="float-left text-6xl font-kings text-[#78350f] pr-3 pt-2 leading-none">
                  I.
                </span>
                {t.process.step1}
              </p>
              <p>
                <span className="float-left text-6xl font-kings text-[#78350f] pr-3 pt-2 leading-none">
                  II.
                </span>
                {t.process.step2}
              </p>
              <p>
                <span className="float-left text-6xl font-kings text-[#78350f] pr-3 pt-2 leading-none">
                  III.
                </span>
                {t.process.step3}
              </p>
            </div>
          </div>
        </div>

        {/* The Manifestation */}
        <div className="mt-20 pt-10 recipe-anim flex flex-col items-center">
          <h4 className="manifestation-title font-kings text-5xl md:text-7xl text-[#3d2817] mb-4 relative">
            {t.manifestation.title.split("").map((char, idx) => (
              <span key={idx} className="char inline-block" aria-hidden="true">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h4>
          <div className="flex items-center justify-center gap-4 my-6 relative z-20 opacity-70">
            <div className="w-24 h-[1px] bg-neutral-500" />
            <span className="text-xl text-neutral-500 font-serif">✧</span>
            <div className="w-24 h-[1px] bg-neutral-500" />
          </div>
          <div className="font-bilbo text-4xl md:text-5xl text-[#2a1a10] text-center px-4 md:px-12 py-6 leading-relaxed">
            {t.manifestation.poem.map((line: string, i: number) => (
              <p key={i} className={i !== t.manifestation.poem.length - 1 ? "mb-8" : ""}>
                {i === 0 ? "“" : ""}
                {line}
                {i === t.manifestation.poem.length - 1 ? "”" : ""}
              </p>
            ))}
          </div>

          <div className="w-full max-w-2xl flex justify-end items-end mt-12 opacity-80 px-4">
            <div className="font-bilbo text-4xl text-[#3d2817] -rotate-3">
              {t.manifestation.author}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
