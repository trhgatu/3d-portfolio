"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  speedX: number;
  speedY: number;
  phase: number;
  phaseSpeed: number;
  color: string;
}

const GOLD_PALETTE = [
  "245, 158, 11", // Amber 500
  "251, 191, 36", // Amber 400
  "252, 211, 77", // Amber 300
  "217, 119, 6", // Amber 600
  "254, 240, 138", // Amber 200
];

interface DesertDustCanvasProps {
  className?: string;
  particleCount?: number;
}

export function DesertDustCanvas({ className = "", particleCount = 100 }: DesertDustCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const depth = Math.random(); // 0 (far) to 1 (near)
      const radius = 0.8 + depth * 2.2;
      const baseAlpha = 0.2 + depth * 0.5;
      const speedX = (0.3 + depth * 0.9) * (Math.random() * 0.4 + 0.8);
      const speedY = (Math.random() - 0.5) * 0.3;
      const color = GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)];

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        baseAlpha,
        alpha: baseAlpha,
        speedX,
        speedY,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.015 + Math.random() * 0.03,
        color,
      };
    });

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let time = 0;

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);
        time += 0.01;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Gentle sine drift representing warm wind currents
          p.x += p.speedX;
          p.y += p.speedY + Math.sin(time + p.phase) * 0.3;
          p.phase += p.phaseSpeed;

          // Shimmering luminescence
          p.alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(p.phase));

          // Wrap edges
          if (p.x > width + 20) p.x = -20;
          if (p.y > height + 20) p.y = -20;
          if (p.y < -20) p.y = height + 20;

          // Draw Glowing Golden Particle
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

          // Subtle radial glow for larger particles
          if (p.radius > 2.0) {
            const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
            glow.addColorStop(0, `rgba(${p.color}, ${p.alpha})`);
            glow.addColorStop(0.5, `rgba(${p.color}, ${p.alpha * 0.4})`);
            glow.addColorStop(1, `rgba(${p.color}, 0)`);
            ctx.fillStyle = glow;
            ctx.fillRect(p.x - p.radius * 2.5, p.y - p.radius * 2.5, p.radius * 5, p.radius * 5);
          } else {
            ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
            ctx.fill();
          }

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-10 w-full h-full ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
