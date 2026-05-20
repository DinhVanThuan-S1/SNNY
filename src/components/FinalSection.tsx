"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import birthdayData from "@/data/birthdayData.json";
import { Heart, RefreshCw, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface FinalSectionProps {
  onReplay: () => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({ onReplay }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.4 });

  // Fire confetti romantic fireworks when in view
  useEffect(() => {
    if (!isInView) return;

    // Trigger high-density romantic heart-styled colored fireworks
    const duration = 5 * 1000; // 5 seconds of fireworks
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 30 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Fireworks shot from random positions in the lower half of the screen
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ffb6c1", "#ff69b4", "#f08080", "#dda0dd"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ffb6c1", "#ff69b4", "#f08080", "#dda0dd"],
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isInView]);

  const handleConfettiBlast = () => {
    // Blast a huge center burst of heart colors
    const end = Date.now() + 1 * 1000;

    const interval: NodeJS.Timeout = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);

      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ff1493", "#ff69b4", "#ffb6c1", "#dda0dd"],
      });
    }, 150);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-28 px-4 bg-gradient-to-b from-[#FFF5F5] to-[#FFF8F8] dark:from-[#170611] dark:to-[#0F0208] overflow-hidden flex flex-col items-center justify-center min-h-screen text-center"
    >
      {/* Decorative stardust particles background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-rose-200/20 dark:bg-rose-950/5 blur-[120px] pointer-events-none" />

      {/* Floating Sparkle Embellishments */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 text-rose-300 pointer-events-none"
      >
        <Sparkles className="w-8 h-8 fill-rose-100" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-1/4 right-1/4 text-violet-300 pointer-events-none"
      >
        <Sparkles className="w-6 h-6 fill-violet-100" />
      </motion.div>

      {/* Main Closing Container Card */}
      <div className="relative z-10 max-w-2xl px-4 flex flex-col items-center">
        {/* Pulsing Core Heart Badge */}
        <motion.div
          onClick={handleConfettiBlast}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-10 w-24 h-24 bg-gradient-to-tr from-rose-100 to-rose-200 dark:from-rose-950/40 dark:to-rose-900/30 rounded-full border border-rose-200/50 dark:border-rose-800/20 shadow-lg flex items-center justify-center text-rose-500 cursor-pointer select-none group"
        >
          <Heart className="w-12 h-12 fill-rose-500 group-hover:scale-110 transition-transform duration-300" />
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full border-2 border-rose-300/40 animate-ping opacity-60 pointer-events-none" />
        </motion.div>

        {/* Emotion Closing Title in Vietnamese */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-serif leading-tight mb-8 px-2 select-none bg-gradient-to-br from-rose-500 via-pink-500 to-amber-400 bg-clip-text text-transparent drop-shadow-sm pb-2"
        >
          {birthdayData.final.closingMessage}
        </motion.h2>

        {/* Heart subtitle and sign off */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-12 flex flex-col items-center gap-1.5"
        >
          <span className="text-sm font-medium tracking-widest text-slate-400 dark:text-slate-500 font-sans uppercase">
            Cảm ơn vì đã luôn ở bên anh
          </span>
          <span className="text-xs text-rose-400 font-sans flex items-center gap-1">
            <span>Tình yêu của anh duy nhất dành cho em</span>
            <Heart className="w-3 h-3 fill-rose-400" />
          </span>
        </motion.div>

        {/* Replay memories action button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReplay}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 bg-white hover:bg-rose-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 font-medium text-base rounded-full shadow-md border border-rose-100/50 dark:border-rose-950/20 transition-all cursor-pointer overflow-hidden"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
            <span>{birthdayData.final.btnReplay}</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
