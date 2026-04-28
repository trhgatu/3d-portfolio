"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="ink-paper-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>

          <filter id="ink-bleed-edge">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03"
              numOctaves="3"
              seed="1"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div ref={overlayRef} className="fixed inset-0 bg-black z-[100] pointer-events-none" />

      {children}

      <ScriptForAnimation overlayRef={overlayRef} />
    </div>
  );
}

function ScriptForAnimation({
  overlayRef,
}: {
  overlayRef: React.RefObject<HTMLDivElement | null>;
}) {
  useGSAP(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const state = { percentage: 0 };

    gsap.to(state, {
      percentage: 150,
      duration: 1.8,
      ease: "power4.inOut",
      onUpdate: () => {
        const p = state.percentage;
        const mask = `radial-gradient(circle at center, transparent ${p}%, black ${p + 10}%)`;
        overlay.style.maskImage = mask;
        overlay.style.webkitMaskImage = mask;
      },
      onComplete: () => {
        overlay.style.display = "none";
        overlay.style.pointerEvents = "none";
      },
    });
  }, [overlayRef]);

  return null;
}
