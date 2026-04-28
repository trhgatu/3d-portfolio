import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform sampler2D uTexture;

  varying vec2 vUv;

  void main() {
    vec2 centeredUv = vUv - 0.5;
    float dist = length(centeredUv);
    
    // Calculate two opposite rotations
    float angle1 = uTime * uSpeed;
    float angle2 = uTime * -uSpeed * 0.7;
    
    mat2 rotate1 = mat2(cos(angle1), -sin(angle1), sin(angle1), cos(angle1));
    mat2 rotate2 = mat2(cos(angle2), -sin(angle2), sin(angle2), cos(angle2));

    vec2 rotatedUv1 = rotate1 * centeredUv + 0.5;
    vec2 rotatedUv2 = rotate2 * centeredUv + 0.5;

    // Sample texture twice and combine
    vec4 texColor1 = texture2D(uTexture, rotatedUv1);
    vec4 texColor2 = texture2D(uTexture, rotatedUv2);

    // Combine layers for a complex gear-like effect
    float pattern = max(texColor1.r, texColor2.r * 0.6);
    
    // Circular Fade Mask
    float circleEdge = 1.0 - smoothstep(0.45, 0.5, dist);

    // Combine patterns
    float finalAlpha = pattern * circleEdge;

    // Pulse effect intensifies with speed
    float pulseSpeed = 2.0 + uSpeed * 2.0;
    float pulse = 0.8 + 0.2 * sin(uTime * pulseSpeed);

    // Color intensity increases with speed (bloom effect)
    vec3 finalColor = uColor * (1.0 + uSpeed * 0.5);

    gl_FragColor = vec4(finalColor, finalAlpha * uOpacity * pulse);
  }
`;

export const MagicCircleMaterial = shaderMaterial(
  {
    uTime: 0,
    uSpeed: 0.2,
    uColor: new THREE.Color("#ffd700"),
    uOpacity: 0,
    uTexture: new THREE.Texture(),
  },
  vertexShader,
  fragmentShader
);

export type MagicCircleMaterialType = {
  uTime: number;
  uSpeed: number;
  uColor: THREE.Color;
  uOpacity: number;
  uTexture: THREE.Texture;
} & THREE.ShaderMaterial;
