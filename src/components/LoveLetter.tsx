"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import birthdayData from "@/data/birthdayData.json";
import { Mail, MailOpen, X, Heart } from "lucide-react";

export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const lines = birthdayData.loveLetter.letterLines;

  // Typing effect for the active letter lines when opened
  useEffect(() => {
    if (!isOpen) {
      setTypedLines([]);
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      return;
    }

    if (currentLineIndex >= lines.length) return;

    const line = lines[currentLineIndex];

    // For empty lines (paragraphs breaks), skip typing and advance immediately
    if (line === "") {
      setTypedLines((prev) => [...prev, ""]);
      setCurrentLineIndex((prev) => prev + 1);
      return;
    }

    const interval = setTimeout(() => {
      if (currentCharIndex < line.length) {
        setTypedLines((prev) => {
          const next = [...prev];
          if (next[currentLineIndex] !== undefined) {
            next[currentLineIndex] = line.slice(0, currentCharIndex + 1);
          } else {
            next.push(line.charAt(0));
          }
          return next;
        });
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        // Line completed, move to next line after a tiny pause
        setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 180);
      }
    }, 18);

    return () => clearTimeout(interval);
  }, [isOpen, currentLineIndex, currentCharIndex, lines]);

  return (
    <>
      <section className="relative py-24 px-4 bg-gradient-to-b from-[#FFEBEB] to-[#FFF5F5] dark:from-[#170611] dark:to-[#0F0208] overflow-hidden flex flex-col items-center justify-center min-h-screen">
        {/* Decorative ambient glowing grids */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-rose-200/20 dark:bg-rose-950/5 blur-[120px] pointer-events-none" />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative z-10"
        >
          <span className="text-sm font-semibold tracking-widest text-rose-500/80 dark:text-rose-400 font-sans uppercase">
            Thư gửi công chúa
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-slate-100 font-serif mt-2">
            Ngại quá đừng đọc mò :3
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="w-10 h-[1px] bg-rose-300" />
            <Heart className="w-4 h-4 text-rose-400 fill-rose-300 animate-pulse" />
            <div className="w-10 h-[1px] bg-rose-300" />
          </div>
        </motion.div>

        {/* Envelope Container */}
        <div className="relative z-10 w-full max-w-lg flex flex-col items-center justify-center perspective-[1200px]">
          <AnimatePresence mode="wait">
            {!isOpen && (
              /* ENVELOPE (CLOSED STATE) */
              <motion.div
                key="closed-envelope"
                initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50, rotateX: -20 }}
                whileHover={{
                  scale: 1.03,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 25px 40px -10px rgba(255,182,193,0.4)",
                }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                onClick={() => setIsOpen(true)}
                className="relative w-full aspect-[4/3] bg-gradient-to-br from-rose-50 to-[#FFE4E6] dark:from-slate-900 dark:to-slate-950 border border-rose-100/50 dark:border-rose-950/20 rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-center cursor-pointer select-none group"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(251,113,133,0.08)_0%,transparent_60%)] pointer-events-none" />

                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 shadow-md group-hover:bg-rose-200/50 dark:group-hover:bg-rose-900/40 transition-colors"
                >
                  <Heart className="w-8 h-8 fill-rose-400 group-hover:scale-110 transition-transform duration-300" />
                </motion.div>

                <h3 className="mt-6 text-xl font-medium text-slate-800 dark:text-slate-200 font-serif">
                  {birthdayData.loveLetter.title}
                </h3>

                <p className="mt-2 text-xs tracking-wider text-slate-500/80 dark:text-slate-400/70 font-sans uppercase flex items-center gap-1.5 group-hover:text-rose-400 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Nhấp nhẹ để mở thư</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ===== OVERLAY — rendered outside <section> to avoid z-index/blur conflicts ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dim backdrop — NO backdrop-blur so the letter text stays crystal clear */}
            <motion.div
              key="letter-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[90] bg-black/50 dark:bg-black/70"
            />

            {/* LETTER CARD (OPEN STATE) */}
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 40 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:top-[8%] md:w-full md:max-w-2xl md:max-h-[82vh] z-[100] bg-[#FFFDFD] dark:bg-slate-900 border border-rose-100/50 dark:border-rose-950/30 rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col"
            >
              {/* Top Header Controls */}
              <div className="flex items-center justify-between border-b border-rose-100/40 dark:border-rose-950/20 pb-4 shrink-0">
                <div className="flex items-center gap-2 text-rose-500">
                  <MailOpen className="w-5 h-5" />
                  <span className="font-serif font-semibold text-lg text-slate-800 dark:text-slate-200">
                    {birthdayData.loveLetter.title}
                  </span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-rose-950 text-slate-500 dark:text-slate-400 hover:text-rose-500 cursor-pointer flex items-center justify-center transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Letter text scrolling container */}
              <div className="my-6 flex-1 overflow-y-auto pr-2">
                <div className="space-y-4 text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-base md:text-lg select-text whitespace-pre-line text-left">
                  {typedLines.map((line, idx) => (
                    <p key={idx} className="min-h-[1.5rem]">
                      {line}
                      {idx === typedLines.length - 1 && currentLineIndex < lines.length && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="inline-block w-[3px] h-[1.15em] ml-0.5 bg-rose-400 align-middle"
                        />
                      )}
                    </p>
                  ))}
                </div>
              </div>

              {/* Bottom Footer signature */}
              <div className="border-t border-rose-100/40 dark:border-rose-950/20 pt-4 flex items-center justify-between text-xs md:text-sm text-slate-400 dark:text-slate-500 font-sans select-none shrink-0">
                <span>Dành tặng em với tất cả tình yêu của anh</span>
                <span className="flex items-center gap-1 text-rose-400">
                  <span>Forever &amp; Always</span>
                  <Heart className="w-3.5 h-3.5 fill-rose-400 animate-pulse" />
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
