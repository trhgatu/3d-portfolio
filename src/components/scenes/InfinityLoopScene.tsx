"use client";

import { useRef } from "react";
import { Environment } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useAppStore } from "@/hooks/useAppStore";
import { InfinityLoop } from "@/components/InfinityLoop";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function InfinityLoopScene() {
  const playAnimation = useAppStore((s) => s.heroAnimationDone);
  const onEntryDone = useAppStore((s) => s.setModelEntryDone);

  const asRef = useRef<Group>(null);
  const asGroupRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);

  useGSAP(() => {
    if (!playAnimation || !asRef.current || !asGroupRef.current || !groupRef.current) return;
    console.log("▶️ Start model animation");
    gsap.set(asRef.current.position, { y: 5 });

    gsap.fromTo(
      asRef.current.position,
      { y: 5 },
      {
        y: 0,
        duration: 1.8,
        ease: "power3.out",
        onComplete: onEntryDone,
      }
    );

    gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    })
      .to(asRef.current.position, { x: 0, y: 0, z: 0 })
      .to(asRef.current.rotation, { y: -1 })
      .to(asRef.current.scale, { x: 0.6, y: 0.6, z: 0.6 });

    ScrollTrigger.refresh();
  }, [playAnimation]);

  return (
    <group ref={groupRef}>
      <group ref={asGroupRef}>
        <InfinityLoop ref={asRef} />
      </group>
      <Environment
        files="/hdr/qwantani_night_puresky_2k.hdr"
        environmentIntensity={1.5}
      />
    </group>
  );
}
