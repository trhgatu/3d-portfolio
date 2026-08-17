"use client";

import { NavbarForge, ForgeFooter } from "@/components/shared/forge";
import React from "react";

export function ForgeNavigationWrapper({ children }: { children: React.ReactNode }) {
  // Define routes where we want a clean, immersive experience (no nav/footer)
  const isImmersiveRoute = false; // Add immersive routes here in the future

  return (
    <>
      {!isImmersiveRoute && <NavbarForge />}
      {children}
      {!isImmersiveRoute && <ForgeFooter />}
    </>
  );
}
