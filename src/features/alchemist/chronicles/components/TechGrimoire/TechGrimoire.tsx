"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookScene } from "./components/scene/BookScene";
import { useGrimoireTimeline } from "./hooks";
import { TechParticles } from "./components/scene/TechParticles";
import { ManuscriptNotes } from "./components/ManuscriptNotes";
import { useLang } from "@/hooks/useLang";
import { translations } from "@/constants/translations";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const TechGrimoire = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const washiRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  const lang = useLang();
  const t = translations[lang].chronicles.techGrimoire;

  const { scrollProgress } = useGrimoireTimeline({
    containerRef,
    washiRef,
    spaceRef,
    flashRef,
  });

  return (
    <section
      ref={containerRef}
      id="tech-grimoire"
      className="relative w-full min-h-screen z-20 overflow-hidden"
    >
      <div
        ref={washiRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.9 }}
      >
        <div
          className="absolute inset-[3%] md:inset-[8%] bg-[#e8e4d9]"
          style={{
            filter: "url(#torn-paper-filter)",
            boxShadow: "0 0 40px rgba(255, 69, 0, 0.4), inset 0 0 60px rgba(255, 140, 0, 0.15)",
          }}
        >
          <style jsx>{`
            .burning-edge {
              animation: burn-flicker 3s infinite alternate ease-in-out;
            }
            @keyframes burn-flicker {
              0% {
                box-shadow:
                  0 0 30px rgba(255, 69, 0, 0.3),
                  inset 0 0 40px rgba(255, 140, 0, 0.1);
              }
              50% {
                box-shadow:
                  0 0 50px rgba(255, 140, 0, 0.5),
                  inset 0 0 60px rgba(255, 69, 0, 0.2);
              }
              100% {
                box-shadow:
                  0 0 35px rgba(255, 69, 0, 0.35),
                  inset 0 0 45px rgba(255, 140, 0, 0.15);
              }
            }
          `}</style>
          <div className="absolute inset-0 bg-[#f5f2eb] opacity-90 burning-edge" />
          <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply z-0">
            <Image
              src="/assets/images/craftings/texture_washi.png"
              alt="Washi Texture"
              fill
              className="object-cover"
            />
          </div>
          {}
          <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              filter: "url(#torn-paper-filter)",
              boxShadow:
                "0 0 25px 5px rgba(255, 100, 0, 0.3), inset 0 0 20px rgba(180, 83, 9, 0.15)",
            }}
          />
        </div>

        {/* Scattered Manuscripts */}
        <ManuscriptNotes />

        {/* Title and Intro */}
        <div className="absolute top-28 md:top-32 left-0 w-full text-center pointer-events-none z-20 mix-blend-multiply">
          <h2 className="grimoire-title text-4xl md:text-6xl font-kings text-amber-900/80 tracking-widest drop-shadow-sm mb-4">
            {t.title}
          </h2>
          <div className="w-24 h-[1px] bg-amber-900/30 mx-auto mb-4" />
          <p className="font-space-mono text-xs md:text-sm text-amber-800/60 uppercase tracking-[0.3em]">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div
        ref={spaceRef}
        className="absolute inset-0 z-0 opacity-0 pointer-events-none transition-all duration-1000"
      />
      <div
        ref={flashRef}
        className="absolute inset-0 z-50 bg-white opacity-0 pointer-events-none mix-blend-screen"
      />
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 2, 8], fov: 35 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.3} />
          <spotLight
            position={[5, 8, 5]}
            angle={0.4}
            penumbra={0.6}
            intensity={1.2}
            castShadow
            color="#fffbf0"
          />
          <BookScene scrollProgress={scrollProgress} />
          <TechParticles scrollProgress={scrollProgress} />
          <Environment files="/hdr/qwantani_night_puresky_2k.hdr" environmentIntensity={0.8} />
        </Canvas>
      </div>
    </section>
  );
};
