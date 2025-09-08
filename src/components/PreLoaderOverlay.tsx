"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoaderWithOverlay({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          const tl = gsap.timeline({
            defaults: { ease: "power4.inOut" },
            onComplete,
          });

          // 1. Ẩn số đếm
          tl.to(countRef.current, { autoAlpha: 0, duration: 1 }, 0);

          // 2. Hiện viền ngay lập tức (trước khi mở curtains)
          tl.set(leftRef.current, { borderRightColor: "#ffffff" }, 0.2);
          tl.set(rightRef.current, { borderLeftColor: "#ffffff" }, 0.2);

          // 3. Curtains mở ra
          tl.to(leftRef.current, { xPercent: -100, duration: 2 }, 0.3);
          tl.to(rightRef.current, { xPercent: 100, duration: 2 }, 0.3);

          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Left curtain */}
      <div
        ref={leftRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-black z-[9998] border-r border-transparent"
      />

      {/* Right curtain */}
      <div
        ref={rightRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-black z-[9998] border-l border-transparent"
      />

      {/* Center counter */}
      <div
        ref={countRef}
        className="absolute inset-0 z-[9999] flex items-center justify-center text-white text-7xl font-mono"
      >
        {count}%
      </div>
    </div>
  );
}
