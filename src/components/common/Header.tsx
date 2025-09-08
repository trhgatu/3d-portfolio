"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/all";
import { useIntroStore } from "@/app/stores/introStore";

gsap.registerPlugin(useGSAP, ScrollTrigger)

const navItems = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const { hasIntroPlayed } = useIntroStore();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (hasIntroPlayed) {
      gsap.fromTo(
        ".header",
        { y: -40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6 }
      );
    }
  }, [hasIntroPlayed]);


  return (
    <header className="header fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold tracking-wide text-white hover:text-cyan-300">
          trhgatu<span className="text-cyan-300">.</span>
        </Link>

        {/* Nav */}
        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 hover:text-cyan-300 transition"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/80 hover:text-cyan-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-white/80 hover:text-cyan-300 transition"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}