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

      if (window.scrollY < 100) {
        gsap.set(starsRef.current, { autoAlpha: ATMOSPHERE_CONFIG.STARS_INITIAL_OPACITY });
        gsap.set(embersRef.current, { autoAlpha: ATMOSPHERE_CONFIG.EMBERS_INITIAL_OPACITY });
      }

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

          const shouldBeVisible = self.progress < ATMOSPHERE_CONFIG.SPARKS_FADE_THRESHOLD;
          setEmbersVisible(shouldBeVisible);
        },
      });

      ScrollTrigger.create({
        trigger: "#craftings",
        start: ATMOSPHERE_CONFIG.CRAFTINGS_FADE_START,
        end: ATMOSPHERE_CONFIG.CRAFTINGS_FADE_END,
        scrub: true,
        onUpdate: (self) => {
          // Stay bright until background starts turning white (80% progress - near end of 3rd project)
          // Then fade out quickly in the remaining 20%
          const fadeProgress = gsap.utils.clamp(0, 1, (self.progress - 0.8) * 5);
          gsap.set(starsRef.current, {
            opacity: 1 - fadeProgress,
            autoAlpha: fadeProgress >= 1 ? 0 : 1,
          });
          gsap.set(embersRef.current, { autoAlpha: 0 });
          setEmbersVisible(false);
        },
      });
    },
    { scope: containerRef }
  );
};
