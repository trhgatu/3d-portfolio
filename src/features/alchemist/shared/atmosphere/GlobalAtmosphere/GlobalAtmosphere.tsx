"use client";

import React, { useRef, useState } from "react";
import { View } from "@react-three/drei";
import { GoldenSparks } from "../GoldenSparks";
import { StarField } from "../StarField";
import { MagicCircle, CameraRig } from "../ForgeEmbers";
import { useAtmosphereTimeline } from "./hooks/useAtmosphereTimeline";

interface GlobalAtmosphereProps {
  isIgnited?: boolean;
  showSeal?: boolean;
}

export const GlobalAtmosphere = ({
  isIgnited = false,
  showSeal = false,
}: GlobalAtmosphereProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const embersRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const [embersVisible, setEmbersVisible] = useState(true);

  useAtmosphereTimeline({
    containerRef,
    starsRef,
    embersRef,
    setEmbersVisible: (visible) => {
      setEmbersVisible((prev) => (prev !== visible ? visible : prev));
    },
  });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-neutral-950"
    >
      <div
        ref={starsRef}
        className="absolute inset-0 z-0 global-stars pointer-events-none transition-opacity duration-1000 bg-neutral-950"
      >
        <StarField />
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 0%, rgba(59,130,246,0.05) 40%, rgba(29,78,216,0.1) 70%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-cyan-500/5 blur-3xl opacity-50" />
        </div>
      </div>
      <div ref={embersRef} className="absolute inset-0 z-10 global-embers pointer-events-none">
        <View className="w-full h-full">
          {showSeal && <MagicCircle isIgnited={isIgnited} />}
          {showSeal && <CameraRig isIgnited={isIgnited} />}
          <GoldenSparks isIgnited={isIgnited} count={120} visible={embersVisible} />
          <ambientLight intensity={0.5} />
        </View>
      </div>
    </div>
  );
};
