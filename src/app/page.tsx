"use client"

import About from "@/components/About/About";
import Hero from "@/components/Hero/Hero";
import { View } from "@react-three/drei";
import AstronautScene from "@/components/scenes/HeroScene";


export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <View className="hero-scene pointer-events-none fixed top-0 z-50 hidden h-screen w-screen md:block">
        <AstronautScene />
      </View>
      <Hero />
      <About />
    </main>
  );
}
