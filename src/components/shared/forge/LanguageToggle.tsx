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
      className={cn("fixed bottom-10 right-10 z-[60] flex flex-col items-center gap-4", className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex font-playfair-display flex-col gap-2 p-1 bg-black border border-white/10 rounded-full shadow-2xl backdrop-blur-xl"
          >
            <button
              onClick={() => setLang("en")}
              className={cn(
                "w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 text-lg",
                lang === "en"
                  ? "bg-white text-black shadow-lg"
                  : "bg-transparent text-white/40 hover:text-white"
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLang("vi")}
              className={cn(
                "w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 font-playfair-display text-lg",
                lang === "vi"
                  ? "bg-white text-black shadow-lg"
                  : "bg-transparent text-white/40 hover:text-white"
              )}
            >
              VN
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 flex items-center justify-center rounded-full bg-black border border-white/20 text-white shadow-xl relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative z-10 flex flex-col items-center">
          <span className="text-2xl tracking-widest font-playfair-display">
            {lang === "en" ? "EN" : "VN"}
          </span>
        </div>

        <div className="absolute inset-[3px] border border-white/5 rounded-full pointer-events-none" />
      </motion.button>
    </div>
  );
}
