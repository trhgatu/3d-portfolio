"use client";

import { useRef, useState } from "react";
import { Environment } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { InfinityLoop } from "@/components/InfinityLoop";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type InfinityLoopSceneProps = {
  playAnimation: boolean;
  onModelLoaded: () => void;
};

export default function InfinityLoopScene({ playAnimation, onModelLoaded }: InfinityLoopSceneProps) {
  const asRef = useRef<Group>(null);
  const asGroupRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);

  const [modelReady, setModelReady] = useState(false);

  useGSAP(() => {
    if (!playAnimation || !modelReady || !asRef.current || !asGroupRef.current || !groupRef.current) return;

    gsap.set(asRef.current, {
      opacity: 0,
      visibility: "hidden"
    });

    gsap.set(asRef.current, {
      opacity: 1,
      visibility: "visible"
    });

    //position init
    gsap.set(asRef.current.position, { x: 0, y: 0, z: 0 });

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
        /* markers: true */
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
        /* markers: true */
      }
    })
      .to(asRef.current.position, { x: -1.5, y: 0.5, z: -0.5, duration: 1 })
      .to(asRef.current.rotation, { y: Math.PI * -0.3, z: Math.PI * 0.1, duration: 1 }, "<")
      .to(asRef.current.scale, { x: 0.8, y: 0.8, z: 0.8, duration: 1 }, "<");

    ScrollTrigger.refresh();
  }, [playAnimation, modelReady]);

  return (
    <group ref={groupRef}>
      <group ref={asGroupRef}>
        <InfinityLoop
          onLoaded={() => {
            setModelReady(true);
            onModelLoaded();
          }}
          ref={asRef}
          visible={playAnimation && modelReady} />
      </group>
      <Environment files="/hdr/qwantani_night_puresky_2k.hdr" environmentIntensity={1.5} />
    </group>
  );
}
