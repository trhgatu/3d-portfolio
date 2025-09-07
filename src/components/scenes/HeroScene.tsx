"use client";

import { useRef } from "react";
import { Environment} from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingAstronaut from "@/components/FloatingAstronaut";

gsap.registerPlugin(useGSAP, ScrollTrigger);


export default function HeroScene() {

  const asRef = useRef<Group>(null)

  const asGroupRef = useRef<Group>(null);

  const groupRef = useRef<Group>(null);

  const FLOAT_SPEED = 1.5;

  useGSAP(() => {
    if (
      !asRef.current ||
      !asGroupRef.current ||
      !asGroupRef.current ||
      !groupRef.current
    )
      return;


    gsap.set(asRef.current.position, { x: 2, y: -1 });

    const introTl = gsap.timeline({
      defaults: {
        duration: 3,
        ease: "back.out(1.4)",
      },
    });

    if (window.scrollY < 20) {
      introTl
        .from(asRef.current.position, { y: -5, x: 1 }, 0)
        .from(asRef.current.rotation, { z: 3 }, 0)
    }

    const scrollTl = gsap.timeline({
      defaults: {
        duration: 2,
      },
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scrollTl
      .to(groupRef.current.rotation, { y: Math.PI * 2 })

      // astronaut
      .to(asRef.current.position, { x: -0.2, y: -0.7, z: -2 }, 0)
      .to(asRef.current.rotation, { z: 0.3 }, 0)

      .to(
        groupRef.current.position,
        { x: 1, duration: 3, ease: "sine.inOut" },
        1.3,
      );
  });

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