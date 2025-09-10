"use client"

import About from "@/components/About/About";
import Hero from "@/components/Hero/Hero";
import { View } from "@react-three/drei";
import LoaderWithOverlay from "@/components/PreLoaderOverlay";
import InfinityLoopScene from "@/components/scenes/InfinityLoopScene";
import { useAppStore } from "@/hooks/useAppStore";

export default function Home() {
  const overlayDone = useAppStore((s) => s.overlayDone);
  const setOverlayDone = useAppStore((s) => s.setOverlayDone);
  const heroAnimationDone = useAppStore((s) => s.heroAnimationDone);

  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      {!overlayDone && <LoaderWithOverlay onComplete={setOverlayDone} />}
      {heroAnimationDone && (
        <View className="infinity-scene fixed top-0 -z-10 inset-0 hidden md:block h-screen w-screen pointer-events-none">
          <InfinityLoopScene />
        </View>
      )}
      <Hero />
      <About />
    </main>
  );
}
