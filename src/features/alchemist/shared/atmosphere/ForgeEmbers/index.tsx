"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber";
import * as THREE from "three";
import { AdditiveBlending, TextureLoader, Color } from "three";
import { MagicCircleMaterial } from "@/shared/shaders";
import { GoldenSparks } from "../GoldenSparks";

extend({ MagicCircleMaterial });

export function CameraRig({ isIgnited = false }: { isIgnited?: boolean }) {
  useFrame((state, delta) => {
    const targetZ = isIgnited ? 5 : 8;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 0.5);
  });
  return null;
}

export function MagicCircle({ isIgnited = false }: { isIgnited?: boolean }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, "/assets/images/craftings/magic_circle.png");

  const currentColor = useRef(new Color("#b87333"));
  const idleColor = useMemo(() => new Color("#b87333"), []); // Warm copper/bronze
  const activeColor = useMemo(() => new Color("#ff8c00"), []); // Glowing orange/gold (fire-like)

  const speedRef = useRef(0.1);

  useFrame((state, delta) => {
    if (materialRef.current && meshRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;

      // Smoothly accelerate speed based on ignition state
      const targetSpeed = isIgnited ? 1.5 : 0.1;
      const acceleration = isIgnited ? 0.8 : 2.0;
      speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, delta * acceleration);
      materialRef.current.uSpeed = speedRef.current;

      const time = state.clock.elapsedTime;
      const breathingScale = 2.2 + Math.sin(time) * 0.1;
      const targetScale = isIgnited ? 4.5 : breathingScale;

      const currentScale = meshRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(
        currentScale,
        targetScale,
        delta * (isIgnited ? 1.5 : 1)
      );
      meshRef.current.scale.set(newScale, newScale, newScale);

      const targetColor = isIgnited ? activeColor : idleColor;
      currentColor.current.lerp(targetColor, delta * 3);

      if (materialRef.current.uColor) {
        materialRef.current.uColor.copy(currentColor.current);
      }

      const targetOpacity = isIgnited ? 0.9 : 0.3;
      materialRef.current.uOpacity = THREE.MathUtils.lerp(
        materialRef.current.uOpacity || 0,
        targetOpacity,
        delta * 2
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]} scale={[5, 5, 5]}>
      <planeGeometry args={[1.5, 1.5]} />
      <magicCircleMaterial
        ref={materialRef}
        uTexture={texture}
        uColor={idleColor}
        uSpeed={0.2}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}

/**
 * Renders a particle-based golden sparks effect that responds to an ignition state.
 *
 * When `isIgnited` is true the particles accelerate, grow, and transition color toward the active (orange) tone;
 * when false they slow, shrink, and revert toward the idle (blue) tone. The system also rotates slowly and respawns
 * particles that move beyond the vertical threshold.
 *
 * @param isIgnited - If true, use the ignited visual state (faster, larger, orange sparks); defaults to `false`.
 * @returns A React element containing a Three.js Points particle system with buffer geometry and a textured PointsMaterial.
 */

interface ForgeEmbersProps {
  isIgnited?: boolean;
}

export function ForgeEmbers({ isIgnited = false }: ForgeEmbersProps) {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <CameraRig isIgnited={isIgnited} />
        <MagicCircle isIgnited={isIgnited} />
        <GoldenSparks isIgnited={isIgnited} />
      </Canvas>
    </div>
  );
}
