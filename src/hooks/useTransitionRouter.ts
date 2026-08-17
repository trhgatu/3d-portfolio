"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "./useAppStore";

export function useTransitionRouter() {
  const router = useRouter();
  const { setIsTransitioning, setTransitionHref } = useAppStore();

  const transitionTo = (href: string) => {
    // If we are already on the same page, do nothing
    if (window.location.pathname === href) return;

    // Set transition state to trigger exit animation
    setTransitionHref(href);
    setIsTransitioning(true);

    // The actual routing will be handled by the GlobalTransition component
    // after the exit animation completes.
  };

  return { transitionTo, router };
}
