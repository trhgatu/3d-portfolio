import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ATMOSPHERE_CONFIG } from "../constants";

interface UseAtmosphereTimelineProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  starsRef: React.RefObject<HTMLDivElement | null>;
  embersRef: React.RefObject<HTMLDivElement | null>;
  setEmbersVisible: (visible: boolean) => void;
}

export const useAtmosphereTimeline = ({
  containerRef,
  starsRef,
  embersRef,
  setEmbersVisible,
}: UseAtmosphereTimelineProps) => {
  useGSAP(
    () => {
      if (!containerRef.current || !starsRef.current || !embersRef.current) return;

      // 1. Initial State
      if (window.scrollY < 100) {
        gsap.set(starsRef.current, { autoAlpha: ATMOSPHERE_CONFIG.STARS_INITIAL_OPACITY });
        gsap.set(embersRef.current, { autoAlpha: ATMOSPHERE_CONFIG.EMBERS_INITIAL_OPACITY });
      }

      // 2. Grimoire Entrance (Stars begin to appear)
      ScrollTrigger.create({
        trigger: "#tech-grimoire",
        start: ATMOSPHERE_CONFIG.GRIMOIRE_FADE_START,
        end: ATMOSPHERE_CONFIG.GRIMOIRE_FADE_END,
        scrub: true,
        onUpdate: (self) => {
          gsap.set(starsRef.current, {
            autoAlpha: self.progress > 0 ? 1 : 0,
            opacity: self.progress * ATMOSPHERE_CONFIG.STARS_MID_OPACITY,
          });
        },
      });

      // 3. Grimoire Space Transition (Embers fade, Stars fully appear)
      ScrollTrigger.create({
        trigger: "#tech-grimoire",
        start: "top top",
        end: ATMOSPHERE_CONFIG.SPARKS_FADE_DURATION,
        scrub: true,
        onUpdate: (self) => {
          gsap.set(starsRef.current, {
            opacity:
              ATMOSPHERE_CONFIG.STARS_MID_OPACITY +
              self.progress * ATMOSPHERE_CONFIG.STARS_MID_OPACITY,
          });

          gsap.set(embersRef.current, {
            opacity: 1 - self.progress,
            autoAlpha: self.progress >= 1 ? 0 : 1,
          });

          // Toggle component unmounting
          const shouldBeVisible = self.progress < ATMOSPHERE_CONFIG.SPARKS_FADE_THRESHOLD;
          setEmbersVisible(shouldBeVisible);
        },
      });

      // 4. Craftings Exit (Everything fades out for Journey)
      ScrollTrigger.create({
        trigger: "#craftings",
        start: ATMOSPHERE_CONFIG.CRAFTINGS_FADE_START,
        end: ATMOSPHERE_CONFIG.CRAFTINGS_FADE_END,
        scrub: true,
        onUpdate: (self) => {
          gsap.set(starsRef.current, {
            opacity: 1 - self.progress,
            autoAlpha: self.progress >= 1 ? 0 : 1,
          });
          gsap.set(embersRef.current, { autoAlpha: 0 });
          setEmbersVisible(false);
        },
      });
    },
    { scope: containerRef }
  );
};
