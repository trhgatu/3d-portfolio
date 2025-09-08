"use client"

import About from "@/components/About/About";
import Hero from "@/components/Hero/Hero";
/* import { View } from "@react-three/drei";
import AstronautScene from "@/components/scenes/HeroScene"; */
import LoaderWithOverlay from "@/components/PreLoaderOverlay";
import { useState } from "react";

export default function Home() {
  const [hasLoaderFinished, setLoaderFinished] = useState(false);

  return (
    <main className="bg-black text-white overflow-x-hidden">
      {!hasLoaderFinished && <LoaderWithOverlay onComplete={() => setLoaderFinished(true)} />}
      {/*       <View className="hero-scene fixed top-0 z-0 hidden md:block h-screen w-screen pointer-events-none">
        <AstronautScene />
      </View> */}

      <Hero key={hasLoaderFinished ? "played" : "not-played"} playAnimation={hasLoaderFinished} />
      <About />
    </main>
  );
}
