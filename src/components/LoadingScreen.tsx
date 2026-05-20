"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onFinished: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Elegant, natural speed variations in counting
    const duration = 800; // 0.5s loading
    const intervalTime = 16;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progressPercent = Math.min(100, Math.floor((currentStep / steps) * 100));

      // Add a slight slowdown as it approaches 100 for suspense (Zeigarnik/Goal Gradient style)
      setProgress(progressPercent);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onFinished, 600); // Wait for fade-out animation to complete
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onFinished]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-radial from-[#FFF2F2] via-[#FFF8F8] to-[#FFEBEB] dark:from-[#1A0B12] dark:via-[#0F050A] dark:to-[#12070D] select-none"
        >
          {/* Stardust glow effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,182,193,0.15)_0%,transparent_70%)] blur-2xl" />

          <div className="relative flex flex-col items-center">
            {/* Heart Beating Svg Container */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1.1, 1.3, 1],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-28 h-28 flex items-center justify-center filter drop-shadow-[0_10px_15px_rgba(255,105,180,0.3)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-24 h-24 text-rose-400 dark:text-rose-500"
              >
                <path d="M11.645 20.91l-.007-.003-.003-.001a15.69 15.69 0 01-1.003-.604 13.9 13.9 0 01-2.977-2.63C5.06 14.66 3.5 12.067 3.5 9.38 3.5 6.478 5.78 4 8.7 4c1.883 0 3.61 1.014 4.3 2.66h.002C13.69 5.014 15.417 4 17.3 4c2.92 0 5.2 2.478 5.2 5.38 0 2.686-1.56 5.28-4.156 7.294a13.9 13.9 0 01-2.977 2.63c-.577.44-1.01.7-1.003.604l-.003.001-.007.003-.004.001-.006.002h-.006l-.005-.002-.004-.001z" />
              </svg>

              {/* Glowing stardust core */}
              <div className="absolute w-6 h-6 rounded-full bg-white blur-md opacity-70 animate-pulse" />
            </motion.div>

            {/* Glowing rings */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.8], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute w-28 h-28 border-2 border-rose-300 rounded-full blur-xs"
            />

            {/* Text and Percentage */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-12 text-center"
            >
              <h2 className="text-xl font-medium tracking-wide text-rose-500/90 dark:text-rose-400 font-sans">
                Preparing a special birthday surprise...
              </h2>
              <p className="mt-2 text-3xl font-light tracking-widest text-slate-700/80 dark:text-slate-200/80 font-mono">
                {progress}%
              </p>
            </motion.div>

            {/* Loading progress bar */}
            <div className="mt-8 w-60 h-[2px] bg-rose-100 dark:bg-rose-950/40 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
                className="h-full bg-gradient-to-r from-rose-300 via-rose-400 to-rose-300 dark:from-rose-600 dark:to-rose-500"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
