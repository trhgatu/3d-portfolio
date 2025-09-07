"use client";

import { useGLTF } from "@react-three/drei";

export function Astronaut({ scale = 0.5, ...props }) {
  const { scene } = useGLTF("/models/astronaut.glb");

  return (
    <primitive
      object={scene}
      scale={scale}
      {...props}
    />
  );
}
