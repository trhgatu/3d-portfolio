"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { OglTransitionOverlay, OglTransitionRef } from "@/components/OglTransitionOverlay";
import { useAppStore } from "@/hooks/useAppStore";

export function GlobalTransitionOverlay() {
  const oglRef = useRef<OglTransitionRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const { isTransitioning, setIsTransitioning, transitionHref, setTransitionHref } = useAppStore();
  const [isVisible, setIsVisible] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useGSAP(() => {
    if (!hasHydrated) return;

    if (isTransitioning && transitionHref) {
      // Show the canvas
      setIsVisible(true);

      // We need to wait a tick for the canvas to mount if it was hidden
      setTimeout(() => {
        // EXIT ANIMATION: Screen turns BLACK (uProgress goes from 1.0 to 0.0)
        // Ensure starting state is 1.0 (transparent)
        if (oglRef.current) {
          oglRef.current.setProgress(1.0);
        }

        const state = { p: 1.0 };
        gsap.to(state, {
          p: 0.0,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => {
            if (oglRef.current) {
              oglRef.current.setProgress(state.p);
            }
          },
          onComplete: () => {
            // Once screen is completely black, actually navigate
            router.push(transitionHref);
          },
        });
      }, 50);
    }
  }, [isTransitioning, transitionHref, hasHydrated, router]);

  // When pathname changes, we trigger the ENTRY animation
  // (Screen turns TRANSPARENT: uProgress goes from 0.0 to 1.0)
  useGSAP(() => {
    if (!hasHydrated || !isTransitioning) return;

    // We reached the new page! Reset states.
    setTransitionHref(null);
    setIsTransitioning(false);

    // Play entry animation
    const state = { p: 0.0 };
    gsap.to(state, {
      p: 1.0,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        if (oglRef.current) {
          oglRef.current.setProgress(state.p);
        }
      },
      onComplete: () => {
        setIsVisible(false);
      },
    });
  }, [pathname]); // Depend on pathname change

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] pointer-events-none">
      <OglTransitionOverlay ref={oglRef} />
    </div>
  );
}
