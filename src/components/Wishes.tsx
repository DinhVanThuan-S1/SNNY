"use client";

import React from "react";
import { motion } from "framer-motion";
import birthdayData from "@/data/birthdayData.json";
import { Sparkles, Heart } from "lucide-react";

export const Wishes: React.FC = () => {
  const wishes = birthdayData.wishes;

  // Render floating wishes with different random positions and animation parameters
  return (
    <section className="relative py-28 px-4 bg-gradient-to-b from-[#FFEBEB] to-[#FFF5F5] dark:from-[#0F0208] dark:to-[#170611] overflow-hidden flex flex-col items-center justify-center min-h-screen">
      {/* Starry starry night romantic nebula backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,182,193,0.15)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/10 w-[20rem] h-[20rem] rounded-full bg-rose-300/10 dark:bg-rose-950/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[25rem] h-[25rem] rounded-full bg-violet-300/10 dark:bg-violet-950/5 blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative z-10"
      >
        <span className="text-sm font-semibold tracking-widest text-rose-500/80 dark:text-rose-400 font-sans uppercase">
          Lời Chúc Ngọt Ngào
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-slate-100 font-serif mt-2">
          Sweet Wishes
        </h2>
        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="w-10 h-[1px] bg-rose-300" />
          <Sparkles className="w-4.5 h-4.5 text-rose-400 fill-rose-100 dark:fill-rose-950/20" />
          <div className="w-10 h-[1px] bg-rose-300" />
        </div>
      </motion.div>

      {/* Dynamic Staggered floating wishes container */}
      <div className="relative z-10 w-full max-w-4xl min-h-[450px] flex flex-wrap items-center justify-center gap-6 px-4 md:px-10">
        {wishes.map((wish, index) => {
          // Predefined asymmetric floating offsets based on index to ensure gorgeous visual design
          const rotations = [-3, 2, -1, 3, -2, 1];
          const delays = [0, 0.2, 0.4, 0.1, 0.3, 0.5];
          const hoverScales = [1.03, 1.05, 1.04, 1.03, 1.05, 1.04];
          
          const rot = rotations[index % rotations.length];
          const del = delays[index % delays.length];
          const hs = hoverScales[index % hoverScales.length];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35, scale: 0.95, rotate: rot }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: rot }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{
                scale: hs,
                rotate: rot * 1.5,
                y: -6,
                boxShadow: "0 20px 25px -5px rgba(244,63,94,0.15)",
                borderColor: "rgba(244,63,94,0.3)"
              }}
              // Ambient floating animation loop (gpu-accelerated translateY drift)
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                // Base entry animation
                duration: 0.8,
                delay: del,
                type: "spring",
                stiffness: 80,
                damping: 15,
                // Loop vertical drift transition overrides
                y: {
                  duration: 4 + (index % 3) * 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3,
                }
              }}
              className="p-6 bg-white/70 dark:bg-slate-900/60 border border-rose-100/50 dark:border-rose-950/20 backdrop-blur-md rounded-2xl shadow-md flex items-start gap-4 max-w-sm md:max-w-md transition-all select-text group relative overflow-hidden"
            >
              {/* Sweet visual background stardust sparkle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-rose-100/20 dark:bg-rose-950/5 rounded-full blur-xl pointer-events-none" />

              {/* Glowing Heart Icon */}
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center flex-shrink-0 z-10 shadow-inner group-hover:scale-110 transition-transform">
                <Heart className="w-4.5 h-4.5 fill-rose-300 group-hover:fill-rose-400 transition-colors" />
              </div>

              {/* Message text */}
              <div className="flex-1 text-left z-10">
                <p className="text-slate-700 dark:text-slate-200 text-sm md:text-base font-light font-sans leading-relaxed">
                  {wish}
                </p>
              </div>

              {/* Glowing sparkles in the corner */}
              <span className="absolute top-2 right-2 text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-3.5 h-3.5 fill-rose-100 dark:fill-rose-950" />
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
