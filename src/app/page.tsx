"use client"

import About from "@/components/About/About";
import Hero from "@/components/Hero/Hero";
import { View } from "@react-three/drei";
import LoaderWithOverlay from "@/components/PreLoaderOverlay";
import InfinityLoopScene from "@/components/scenes/InfinityLoopScene";
import { useState } from "react";

export default function Home() {
  const [hasOverlayFinished, setOverlayFinished] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [heroDone, setHeroDone] = useState(false);

  const canPlayHero = hasOverlayFinished && modelReady;
  const canPlayModelAnim = canPlayHero && heroDone;

  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      {!hasOverlayFinished && (
        <LoaderWithOverlay onComplete={() => setOverlayFinished(true)} />
      )}

      {/* Model is mounted early, but animation waits */}
      <View className="infinity-scene fixed top-0 -z-10 inset-0 hidden md:block h-screen w-screen pointer-events-none">
        <InfinityLoopScene
          playAnimation={canPlayModelAnim}
          onModelLoaded={() => setModelReady(true)}
        />
      </View>

      {/* Hero only animates after overlay + model ready */}
      <Hero
        playAnimation={canPlayHero}
        onAnimationComplete={() => setHeroDone(true)}
      />

      <About />
    </main>
  );
}
