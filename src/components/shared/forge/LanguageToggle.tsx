"use client";

import { useAppStore } from "@/hooks/useAppStore";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn("fixed bottom-6 right-6 z-[60] flex flex-col items-center gap-3", className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="flex flex-col gap-2 p-1.5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <button
              onClick={() => setLang("en")}
              className={cn(
                "w-10 h-10 flex items-center justify-center text-[10px] font-space-mono transition-all duration-300 rounded-full border",
                lang === "en"
                  ? "bg-amber-500/20 border-amber-500 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                  : "border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLang("vi")}
              className={cn(
                "w-10 h-10 flex items-center justify-center text-[10px] font-space-mono transition-all duration-300 rounded-full border",
                lang === "vi"
                  ? "bg-amber-500/20 border-amber-500 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                  : "border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
              )}
            >
              VI
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-900 border border-white/10 text-amber-500 shadow-lg relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="font-kings text-xl relative z-10">{lang === "en" ? "A" : "V"}</span>
        <div className="absolute inset-0 border border-amber-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
      </motion.button>
    </div>
  );
}
