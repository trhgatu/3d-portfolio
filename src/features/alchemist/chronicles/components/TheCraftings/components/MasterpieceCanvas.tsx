"use client";

import React, { useRef } from "react";
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

  const displayImage =
    p.thumbnail || p.images?.[0] || "/assets/images/craftings/alchemist_mountain_path.png";

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;

    gsap.to(cardRef.current, {
      rotateX: tiltX,
      rotateY: tiltY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = contextSafe(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.6)",
      });
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[480px] aspect-[16/10] mx-auto select-none"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full rounded-xl overflow-hidden border border-amber-500/20 bg-[#0c0b12] shadow-[0_20px_50px_rgba(0,0,0,0.95)] transition-all duration-300 hover:border-amber-400/80 hover:shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(245,158,11,0.25)] group/art"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src={displayImage}
          alt={p.name}
          fill
          className="object-cover opacity-90 transition-opacity duration-300 group-hover/art:opacity-100"
          sizes="(max-width: 1024px) 100vw, 480px"
          priority={isActive}
        />

        {/* Subtle Dark Vignette & Edge Inset Ring */}
        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] pointer-events-none" />
        <div className="absolute inset-0 ring-1 ring-inset ring-amber-400/15 group-hover/art:ring-amber-400/40 transition-all duration-300 pointer-events-none rounded-xl" />
      </div>
    </div>
  );
}
