"use client";

import React, { useRef } from "react";
import { View } from "@react-three/drei";
import { GoldenSparks } from "./GoldenSparks";
import { StarField } from "./TheCraftings/StarField";
import { MagicCircle, CameraRig } from "./ForgeEmbers";

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

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-neutral-950"
    >
      <div
        ref={starsRef}
        className="absolute inset-0 z-0 global-stars opacity-0 pointer-events-none transition-opacity duration-1000"
      >
        <StarField />
      </div>
      <div ref={embersRef} className="absolute inset-0 z-10 global-embers pointer-events-none">
        <View className="w-full h-full">
          {showSeal && <MagicCircle isIgnited={isIgnited} />}
          {showSeal && <CameraRig isIgnited={isIgnited} />}
          <GoldenSparks isIgnited={isIgnited} count={120} />
          <ambientLight intensity={0.5} />
        </View>
      </div>
    </div>
  );
};
