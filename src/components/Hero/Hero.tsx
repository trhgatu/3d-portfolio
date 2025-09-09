"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero({
  playAnimation,
  onAnimationComplete

}: {
  playAnimation: boolean
  onAnimationComplete: () => void
}) {
  const scope = useRef(null);
  const animated = useRef(false)

  useGSAP(() => {
    if (!playAnimation || animated.current) return;
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        opacity: 0
      },
      onComplete: () => {
        animated.current = true;
        onAnimationComplete();
      }
    });

    tl
      .set(scope.current, { autoAlpha: 1 })
      .from(".hero-text-mini span", {
        opacity: 0,
        duration: 0.6,
        y: 20,
        stagger: 0.03
      })
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
      .from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.6
      })
      .from(".hero-description", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
  }, [playAnimation, /* onAnimationComplete */]);

  const name = "AnhTu";
  const firstTitle = "Software";
  const secondTitle = "Engineer";
  const introText = "Hi, I'm";

  return (
    <section id="hero" ref={scope} className="hero opacity-0 min-h-screen flex items-center text-center bg-black text-white">
      <div className="border-b border-r border-l rounded-lg border-white/20 py-20 w-full mx-auto max-w-6xl">
        <div className="hero-wrapper-content relative z-50">
          <p className="hero-subtitle text-sm uppercase tracking-widest text-gray-50 mb-4">
            forged in pixels · powered by code
          </p>
          <div className="hero-text-first font-mono items-baseline justify-center flex">
            <div className="hero-text-mini justify-center gap-1 mr-6 text-3xl">
              {introText.split("").map((char, idx) => (
                <span key={idx} className="inline-block text-3xl">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            <h1 className="hero-text-name justify-center gap-1 text-5xl md:text-8xl font-bold">
              {name.split("").map((char, idx) => (
                <span key={idx} className="inline-block ">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </div>

          <div className="hero-text-second font-mono ">
            <h1 className="hero-title flex flex-wrap justify-center gap-1 text-5xl md:text-8xl font-bold pr-10 md:pr-40">
              {firstTitle.split("").map((char, idx) => (
                <span key={idx} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
            <h1 className="hero-title flex flex-wrap justify-center gap-1 text-5xl md:text-8xl font-bold pl-10 md:pl-40">
              {secondTitle.split("").map((char, idx) => (
                <span key={idx} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </div>

          <div className="description flex justify-center">
            <p className="hero-description font-mono mt-6 max-w-2xl text-gray-300 text-lg">
              Welcome to my forge — where imagination meets interaction. I craft vibrant, responsive, and immersive web experiences.
            </p>
          </div>


        </div>
      </div>
    </section>

  );
}
