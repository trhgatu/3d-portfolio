"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { View } from "@react-three/drei";
import HeroScene from "@/components/scenes/HeroScene";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero() {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.6 })
      .from(".hero-text-name span", {
        opacity: 0,
        y: 60,
        stagger: 0.06,
        duration: 0.8,
      }, "-=0.4")
      .from(".hero-title span", {
        opacity: 0,
        y: 40,
        stagger: 0.04,
        duration: 0.6,
      }, "-=0.6")
      .from(".hero-description", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".hero-cta a", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
      }, "-=0.4");
  }, []);

  const name = "Tran Hoang Anh Tu";
  const title = "Software Engineer";

  return (
    <section className="hero flex flex-col items-center justify-center text-center min-h-screen bg-black text-white">
      <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
        <HeroScene />
      </View>
      <div className="px-6 py-20">
        <p className="hero-subtitle text-sm uppercase tracking-widest text-cyan-400/80 mb-4">
          trhgatu · 3D Portfolio
        </p>

        <h1 className="hero-text-name flex flex-wrap justify-center gap-1 text-5xl md:text-6xl font-extrabold text-cyan-300">
          <span className="text-white mr-3">Hi, I&apos;m</span>
          {name.split("").map((char, idx) => (
            <span key={idx} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <h2 className="hero-title mt-3 flex flex-wrap justify-center gap-1 text-2xl md:text-4xl font-bold text-pink-400">
          {title.split("").map((char, idx) => (
            <span key={idx} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>

        <p className="hero-description mt-6 max-w-2xl text-gray-300 text-lg">
          Welcome to my forge — where imagination meets interaction. I craft vibrant, responsive, and immersive web experiences.
        </p>


      </div>
    </section>

  );
}
