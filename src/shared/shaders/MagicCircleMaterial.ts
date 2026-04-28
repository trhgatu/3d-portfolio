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
    
    // Single clear rotation
    float angle = uTime * uSpeed;
    mat2 rotate = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    vec2 rotatedUv = rotate * centeredUv + 0.5;

    // Sample texture once
    vec4 texColor = texture2D(uTexture, rotatedUv);
    float pattern = texColor.r;
    
    // Circular Fade Mask
    float circleEdge = 1.0 - smoothstep(0.45, 0.5, dist);

    // Combine patterns
    float finalAlpha = pattern * circleEdge;

    // Pulse effect intensifies with speed
    float pulseSpeed = 2.0 + uSpeed * 2.0;
    float pulse = 0.8 + 0.2 * sin(uTime * pulseSpeed);

    // Color intensity increases with speed
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
