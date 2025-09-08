"use client";

import { useRef } from "react";
import { Environment } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingAstronaut from "@/components/FloatingAstronaut";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HeroScene() {
  const asRef = useRef<Group>(null);
  const asGroupRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);

  const FLOAT_SPEED = 1.5;

  useGSAP(() => {
    if (!asRef.current || !asGroupRef.current || !groupRef.current) return;

    // Initial position
    gsap.set(asRef.current.position, { x: 6, y: -2.5 });

    // Intro animation
    if (window.scrollY < 20) {
      gsap.timeline({ defaults: { duration: 3, ease: "back.out(1.4)" } })
        .from(asGroupRef.current.position, { y: 5, x: 1 }, 0)
        .from(asGroupRef.current.rotation, { z: 3 }, 0);
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        id: "hero",
      },
    })
      .to(asRef.current.position, { x: 0, y: 0, z: 0, duration: 1 })
      .to(asRef.current.rotation, { y: Math.PI * 0.1, duration: 1 }, "<");

    gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        id: "about",
      }
    })
      .to(asRef.current.position, { x: -1.5, y: 0.5, z: -0.5, duration: 1 })
      .to(asRef.current.rotation, { y: Math.PI * -0.3, z: Math.PI * 0.1, duration: 1 }, "<")
      .to(asRef.current.scale, { x: 0.8, y: 0.8, z: 0.8, duration: 1 }, "<");

  }, []);

  return (
    <group ref={groupRef}>
      <group ref={asGroupRef}>
        <FloatingAstronaut
          ref={asRef}
          floatSpeed={FLOAT_SPEED}
        />
      </group>
      <Environment files="/hdr/qwantani_night_puresky_2k.hdr" environmentIntensity={1.5} />
    </group>
  );
}
