"use client";

import { usePathname } from "next/navigation";
import { NavbarForge, ForgeFooter } from "@/components/shared/forge";
import React from "react";

export function ForgeNavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define routes where we want a clean, immersive experience (no nav/footer)
  const isImmersiveRoute = pathname === "/awakening";

  return (
    <>
      {!isImmersiveRoute && <NavbarForge />}
      {children}
      {!isImmersiveRoute && <ForgeFooter />}
    </>
  );
}
