/**
 * ⚙️ GRIMOIRE TIMELINE HOOK
 * ═══════════════════════════════════════════════════════════
 *
 * Custom hook to manage GSAP timeline for the Tech Grimoire section.
 * Handles all scroll-based animations including intro text, book entrance,
 * zoom effects, and flash transitions.
 *
 * @module tech-grimoire/hooks/useGrimoireTimeline
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE_CONFIG, BOOK_ENTRANCE_TIMING, ZOOM_TIMING, FLASH_TIMING } from "../constants";
import type { HTMLElementRef } from "../types";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook parameters
 */
export interface UseGrimoireTimelineParams {
  /** Container element ref (ScrollTrigger target) */
  containerRef: HTMLElementRef;

  /** Flash overlay element ref */
  flashRef: HTMLElementRef;
}

/**
 * Hook return value
 */
export interface UseGrimoireTimelineReturn {
  /** Current scroll progress (0-1) */
  scrollProgress: React.MutableRefObject<number>;
}

/**
 * Custom hook to manage Grimoire timeline animations
 *
 * @example
 * ```tsx
 * const { scrollProgress } = useGrimoireTimeline({
 *   containerRef,
 *   flashRef,
 * });
 * ```
 */
export function useGrimoireTimeline({
  containerRef,
  flashRef,
}: UseGrimoireTimelineParams): UseGrimoireTimelineReturn {
  const scrollProgress = useRef(0);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${TIMELINE_CONFIG.TOTAL_DURATION}`,
        pin: true,
        refreshPriority: TIMELINE_CONFIG.REFRESH_PRIORITY,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: () => `+=${TIMELINE_CONFIG.TOTAL_DURATION + window.innerHeight}`,
          scrub: TIMELINE_CONFIG.SCRUB,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        },
      });

      tl.to(
        flashRef.current,
        {
          opacity: 1,
          duration: FLASH_TIMING.FADE_IN.duration,
          ease: FLASH_TIMING.FADE_IN.ease,
        },
        FLASH_TIMING.FADE_IN.start
      ).to(
        flashRef.current,
        {
          opacity: 0,
          duration: FLASH_TIMING.FADE_OUT.duration,
          ease: FLASH_TIMING.FADE_OUT.ease,
        },
        FLASH_TIMING.FADE_OUT.start
      );
    },
    { scope: containerRef }
  );

  return { scrollProgress };
}
