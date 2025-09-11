"use client";

import { useEffect, useRef, useState } from "react";
import { Environment } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useAppStore } from "@/hooks/useAppStore";
import { InfinityLoop } from "@/components/InfinityLoop";

gsap.registerPlugin(ScrollTrigger);

export default function InfinityLoopScene() {
  const heroAnimationDone = useAppStore((s) => s.heroAnimationDone);
  const onEntryDone = useAppStore((s) => s.setModelEntryDone);

  const asRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);

  const [modelVisible, setModelVisible] = useState(false);

  useEffect(() => {
    if (!heroAnimationDone) return;
    setModelVisible(true);
  }, [heroAnimationDone]);

  useEffect(() => {
    if (!modelVisible || !asRef.current) return;
    gsap.set(asRef.current.position, { y: 5 });

    requestAnimationFrame(() => {
      gsap.fromTo(
        asRef.current!.position,
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
        .to(asRef.current!.position, { x: 0, y: 0, z: 0 })
        .to(asRef.current!.rotation, { y: -1 })
        .to(asRef.current!.scale, { x: 0.6, y: 0.6, z: 0.6 });

      ScrollTrigger.refresh();
    });
  }, [modelVisible, onEntryDone]);

  return (
    <group ref={groupRef}>
      {modelVisible && (
        <group>
          <InfinityLoop ref={asRef} />
        </group>
      )}
      <Environment
        files="/hdr/qwantani_night_puresky_2k.hdr"
        environmentIntensity={1.5}
      />
    </group>
  );
}
