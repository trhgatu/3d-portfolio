"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Project } from "@/types";

interface MasterpieceCanvasProps {
  project: Project;
  index: number;
  isActive: boolean;
}

export function MasterpieceCanvas({ project: p, isActive }: MasterpieceCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const displayImage =
    p.thumbnail || p.images?.[0] || "/assets/images/craftings/alchemist_mountain_path.png";

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width;
    const normY = (e.clientY - rect.top) / rect.height;

    setMousePos({ x: normX * 100, y: normY * 100 });
    const tiltX = (normY - 0.5) * -18;
    const tiltY = (normX - 0.5) * 18;

    gsap.to(cardRef.current, {
      rotateX: tiltX,
      rotateY: tiltY,
      z: 35,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 900,
    });

    if (shadowRef.current) {
      const shadowX = (normX - 0.5) * -35;
      const shadowY = (normY - 0.5) * -35 + 25;
      gsap.to(shadowRef.current, {
        x: shadowX,
        y: shadowY,
        opacity: 0.85,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseEnter = contextSafe(() => {
    setIsHovered(true);
  });

  const handleMouseLeave = contextSafe(() => {
    setIsHovered(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        z: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      });
    }
    if (shadowRef.current) {
      gsap.to(shadowRef.current, {
        x: 0,
        y: 20,
        opacity: 0.4,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[480px] aspect-[16/10] mx-auto select-none"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={shadowRef}
        className="absolute inset-4 rounded-2xl bg-amber-500/10 blur-2xl pointer-events-none transition-opacity duration-500"
        style={{
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.95), 0 10px 40px rgba(180, 83, 9, 0.2)",
        }}
      />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full rounded-xl overflow-hidden border border-amber-500/25 bg-[#0c0b12] cursor-pointer transition-colors duration-300 hover:border-amber-400/80 group/art"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: "translateZ(18px)",
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src={displayImage}
            alt={p.name}
            fill
            className="object-cover opacity-90 transition-opacity duration-300 group-hover/art:opacity-100"
            sizes="(max-width: 1024px) 100vw, 480px"
            priority={isActive}
          />
        </div>

        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 mix-blend-color-dodge"
          style={{
            background: `radial-gradient(circle 320px at ${mousePos.x}% ${mousePos.y}%, rgba(254, 240, 138, 0.25), rgba(245, 158, 11, 0.08) 45%, transparent 80%)`,
            opacity: isHovered ? 1 : 0,
            transform: "translateZ(30px)",
          }}
        />

        <div
          className="absolute inset-0 shadow-[inset_0_0_35px_rgba(0,0,0,0.85)] pointer-events-none"
          style={{ transform: "translateZ(24px)" }}
        />
        <div
          className="absolute inset-0 ring-1 ring-inset ring-amber-400/20 group-hover/art:ring-amber-400/50 transition-all duration-300 pointer-events-none rounded-xl"
          style={{ transform: "translateZ(26px)" }}
        />
      </div>
    </div>
  );
}
