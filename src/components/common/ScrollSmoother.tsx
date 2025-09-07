// components/common/ScrollSmoother.tsx
"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

export function SetupScrollSmoother() {
  useGSAP(() => {
    if (!ScrollSmoother.get()) {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        normalizeScroll: true,
        effects: true,
        ignoreMobileResize: true
      });
    }
  }, []);

  return null;
}
