"use client"

import About from "@/components/About/About";
import Hero from "@/components/Hero/Hero";
import { View } from "@react-three/drei";
import AstronautScene from "@/components/scenes/HeroScene";


export default function Home() {
  return (
    <>
      <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
        <AstronautScene />
      </View>
      <main>
        <Hero />
        <About />
      </main>
    </>
  );
}
