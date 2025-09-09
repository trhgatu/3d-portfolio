"use client";

import { useRef } from "react";
import { Environment } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { InfinityLoop } from "@/components/InfinityLoop";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function InfinityLoopScene({ playAnimation }: { playAnimation: boolean }) {
  const asRef = useRef<Group>(null);
  const asGroupRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);

  useGSAP(() => {
    if (!playAnimation || !asRef.current || !asGroupRef.current || !groupRef.current) return;
    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    })


    gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    })
      /* .to(asRef.current.position, { x: -1.5, y: 0.5, z: -0.5 }) */
      .to(asRef.current.position, { x: 0, y: 0, z: 0 })
      .to(asRef.current.rotation, { y: -1 })
      .to(asRef.current.scale, { x: 0.6, y: 0.6, z: 0.6 })


    ScrollTrigger.refresh();
  }, [playAnimation]);

  return (
    <group ref={groupRef}>
      <group ref={asGroupRef}>
        <InfinityLoop
          ref={asRef}
        />
      </group>
      <Environment files="/hdr/qwantani_night_puresky_2k.hdr" environmentIntensity={1.5} />
    </group>
  );
}
