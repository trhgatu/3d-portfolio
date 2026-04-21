"use client";

import React from "react";

export const AlchemicalFilters = () => {
  return (
    <svg className="fixed w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
      <defs>
        <filter
          id="torn-paper-filter"
          filterUnits="objectBoundingBox"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="3"
            seed="5"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter
          id="ink-transmutation-filter"
          filterUnits="objectBoundingBox"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="4"
            seed="10"
            result="inkNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="inkNoise"
            scale="60"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="alchemy-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.1" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
};
