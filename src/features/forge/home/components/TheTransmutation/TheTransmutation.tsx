"use client";

import { useRef } from "react";
import { useTransmutationAnimation } from "./hooks/useTransmutationAnimation";
import { useTransmutationCanvas } from "./hooks/useTransmutationCanvas";
import { TransmutationCanvas } from "./components/TransmutationCanvas";
import { TransmutationText } from "./components/TransmutationText";

interface TheTransmutationProps {
  triggerRef?: React.RefObject<HTMLDivElement | null>;
  triggerId?: string;
}

export function TheTransmutation({ triggerRef, triggerId }: TheTransmutationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLDivElement>(null);

  const { scrollProgress: animationScrollProgress } = useTransmutationAnimation({
    textRefs: { text1: textRef1, text2: textRef2, text3: textRef3 },
    containerRef,
    triggerRef,
    triggerSelector: triggerId,
  });

  const { scrollProgress } = useTransmutationCanvas(animationScrollProgress);

  return (
    <section
      id="transmutation-section"
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-10"
    >
      <TransmutationCanvas scrollProgress={scrollProgress} />
      <TransmutationText textRefs={{ text1: textRef1, text2: textRef2, text3: textRef3 }} />
    </section>
  );
}
