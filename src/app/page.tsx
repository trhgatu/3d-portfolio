"use client"

import About from "@/components/About/About";
import Hero from "@/components/Hero/Hero";
import { View } from "@react-three/drei";
import LoaderWithOverlay from "@/components/PreLoaderOverlay";
import InfinityLoopScene from "@/components/scenes/InfinityLoopScene";
import { useState } from "react";

export default function Home() {
  const [hasOverlayFinished, setOverlayFinished] = useState(false);

  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      {!hasOverlayFinished && <LoaderWithOverlay onComplete={() => setOverlayFinished(true)} />}
      <View className="infinity-scene fixed top-0 -z-10 inset-0 hidden md:block h-screen w-screen pointer-events-none">
        <InfinityLoopScene playAnimation={hasOverlayFinished}/>
      </View>
      <Hero
        playAnimation={hasOverlayFinished}
      />
      <About />
    </main>
  );
}
