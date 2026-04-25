"use client";

import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMail,
} from "@tabler/icons-react";

const year = new Date().getFullYear();

export const ForgeFooter = () => (
  <footer className="w-full bg-black border-t border-white/10 text-white font-mono relative overflow-hidden">
    <style jsx>{`
      @keyframes fire-flicker {
        0%,
        100% {
          text-shadow:
            0 0 4px #fff,
            0 -2px 4px #ff3,
            2px -4px 6px #f90,
            -2px -10px 10px #f60,
            2px -15px 15px #f30;
          transform: scale(1);
        }
        50% {
          text-shadow:
            0 0 4px #fff,
            0 -4px 8px #ff3,
            3px -8px 12px #f90,
            -3px -15px 18px #f60,
            3px -22px 22px #f30;
          transform: scale(1.01);
        }
      }
      .burning-text {
        color: #fff;
        animation: fire-flicker 2s infinite alternate ease-in-out;
        letter-spacing: -0.02em;
      }
    `}</style>

    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 items-center gap-10">
      <div className="flex flex-col gap-6 text-lg md:text-base order-2 md:order-1">
        {["Forge", "Craftings", "Timeline", "The Alchemist"].map((item) => (
          <Link
            key={item}
            href={item === "Forge" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
            className="nav-link relative w-fit group"
          >
            <span className="text-neutral-500 group-hover:text-amber-500 transition-colors duration-300 font-space-mono text-sm uppercase tracking-widest">
              {item}
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-500 transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center relative order-1 md:order-2">
        <div className="relative group text-center">
          <span className="text-8xl md:text-9xl lg:text-[10rem] font-kings leading-none select-none burning-text block">
            trhgatu
          </span>
        </div>

        <span className="mt-8 text-xs md:text-sm italic text-neutral-400 tracking-[0.4em] font-playfair-display uppercase text-center max-w-lg">
          One line at a time, fulfilling the Personal Legend.
        </span>
      </div>

      <div className="flex flex-col items-end gap-6 text-right order-3">
        <div className="flex gap-5">
          {[
            { icon: IconMail, href: "mailto:contact@trhgatu.dev", label: "Email" },
            { icon: IconBrandGithub, href: "https://github.com/trhgatu", label: "GitHub" },
            { icon: IconBrandLinkedin, href: "https://linkedin.com/in/trhgatu", label: "LinkedIn" },
            { icon: IconBrandFacebook, href: "https://facebook.com/tu.trhgatu", label: "Facebook" },
            {
              icon: IconBrandInstagram,
              href: "https://instagram.com/tu.trhgatu",
              label: "Instagram",
            },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-neutral-500 hover:text-amber-500 transition-all duration-300 hover:scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0)] hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
            >
              <social.icon size={24} stroke={1.5} />
            </a>
          ))}
        </div>

        <div className="space-y-1">
          <span className="block text-xs text-neutral-500 font-space-mono uppercase tracking-widest">
            &copy; {year} trhgatu — The Alchemical Engine
          </span>
          <span className="block text-[10px] text-neutral-600 font-playfair-display italic">
            “Infinity in every line of code.”
          </span>
        </div>
      </div>
    </div>

    <div className="w-full text-center py-4 bg-neutral-950/80 border-t border-white/5 backdrop-blur-md">
      <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-600 select-none">
        Maktub — It is Written
      </span>
    </div>
  </footer>
);
