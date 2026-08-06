"use client";
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookScene } from "./components/scene/BookScene";
import { useGrimoireTimeline } from "./hooks";
import { TechParticles } from "./components/scene/TechParticles";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const TechGrimoire = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollProgress } = useGrimoireTimeline({
    containerRef,
  });

  return (
    <section
      ref={containerRef}
      id="tech-grimoire"
      className="relative w-full min-h-screen z-20 overflow-hidden"
    >
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
