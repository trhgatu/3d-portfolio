"use client"

import About from "@/components/About/About";
import Hero from "@/components/Hero/Hero";
import { View } from "@react-three/drei";
import LoaderWithOverlay from "@/components/PreLoaderOverlay";
import InfinityLoopScene from "@/components/scenes/InfinityLoopScene";
import { useState } from "react";

export default function Home() {
  const [hasLoaderFinished, setLoaderFinished] = useState(false);

  return (
    <main className="bg-black text-white overflow-x-hidden">
      {!hasLoaderFinished && <LoaderWithOverlay onComplete={() => setLoaderFinished(true)} />}
      <View className="infinity-scene fixed top-0 z-0 hidden md:block h-screen w-screen pointer-events-none">
        <InfinityLoopScene />
      </View>

      <Hero key={hasLoaderFinished ? "played" : "not-played"} playAnimation={hasLoaderFinished} />
      <About />
    </main>
  );
}
