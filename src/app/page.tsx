"use client"

import About from "@/components/About/About";
import Hero from "@/components/Hero/Hero";
import { View } from "@react-three/drei";
import LoaderWithOverlay from "@/components/PreLoaderOverlay";
import InfinityLoopScene from "@/components/scenes/InfinityLoopScene";
import { useState } from "react";

export default function Home() {
  const [hasOverlayFinished, setOverlayFinished] = useState(false);
  const [heroDone, setHeroDone] = useState(false);
  const shouleRenderInfLoop = hasOverlayFinished && heroDone;

  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      {!hasOverlayFinished && <LoaderWithOverlay onComplete={() => setOverlayFinished(true)} />}
        <View
          className="infinity-scene fixed top-0 -z-10 inset-0 hidden md:block h-screen w-screen pointer-events-none"
        >
          <InfinityLoopScene playAnimation={shouleRenderInfLoop} />
        </View>
      <Hero playAnimation={hasOverlayFinished} onAnimationComplete={() => setHeroDone(true)} />
      <About />
    </main>
  );
}
