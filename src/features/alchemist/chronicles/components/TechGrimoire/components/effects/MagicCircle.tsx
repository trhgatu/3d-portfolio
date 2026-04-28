import React, { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { MagicCircleMaterial, MagicCircleMaterialType } from "../../shaders";

extend({ MagicCircleMaterial });

export interface MagicCircleProps {
  opacity: number;
  scale?: number;
  speed: number;
  isIgnited?: boolean;
}

export function MagicCircle({ opacity, scale = 8, isIgnited = false }: MagicCircleProps) {
  const materialRef = useRef<MagicCircleMaterialType>(null);
  const texture = useTexture("/assets/images/craftings/magic_circle.png");
  const speedRef = useRef(0.2);

  useFrame((state, delta) => {
    if (materialRef.current) {
      const targetSpeed = isIgnited ? 3.0 : 0.2;
      speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, delta * 2);

      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uOpacity = opacity;
      materialRef.current.uSpeed = speedRef.current;
    }
  });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.4, 0]}
      scale={isIgnited ? scale * 1.2 : scale}
    >
      <planeGeometry args={[1.5, 1.5]} />
      <magicCircleMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
