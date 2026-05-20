"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { AudioProvider } from "@/components/AudioProvider";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Hero } from "@/components/Hero";
import { MusicPlayer } from "@/components/MusicPlayer";
import { LoveLetter } from "@/components/LoveLetter";
import { MemoryBook } from "@/components/MemoryBook";
import { LoveTimeline } from "@/components/LoveTimeline";
import { Wishes } from "@/components/Wishes";
import { FinalSection } from "@/components/FinalSection";

interface HeartTrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [heartTrail, setHeartTrail] = useState<HeartTrailParticle[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll Progress indicator logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle active mouse particle stardust trail
  useEffect(() => {
    let particleId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle trail rate to prevent too many re-renders
      if (Math.random() > 0.25) return;

      const newParticle: HeartTrailParticle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 12 + 6,
      };

      setHeartTrail((prev) => [...prev.slice(-15), newParticle]); // Cap trail at 15 particles for peak performance
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Remove trail particles after they fade out
  useEffect(() => {
    if (heartTrail.length === 0) return;
    const timer = setTimeout(() => {
      setHeartTrail((prev) => prev.slice(1));
    }, 850);
    return () => clearTimeout(timer);
  }, [heartTrail]);

  const handleHeroUnlock = () => {
    setIsUnlocked(true);
    // Smoothly scroll down to the next section (Love Letter) after unlocking
    setTimeout(() => {
      const targetElement = document.getElementById("love-letter-section");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const handleReplayMemories = () => {
    // Scroll back to the top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AudioProvider>
      {/* 1. Loading Overlay Screen */}
      <LoadingScreen onFinished={() => setIsLoading(false)} />

      {!isLoading && (
        <div
          ref={containerRef}
          className={`w-full min-h-screen flex flex-col relative select-none ${
            !isUnlocked ? "h-screen overflow-hidden" : ""
          }`}
        >
          {/* Scroll progress glowing indicator */}
          {isUnlocked && (
            <motion.div
              style={{ scaleX }}
              className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-rose-400 via-rose-500 to-violet-500 z-50 transform origin-left"
            />
          )}

          {/* Interactive Mouse Trail Hearts */}
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            <AnimatePresence>
              {heartTrail.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0.8, scale: 1.2, x: p.x - p.size / 2, y: p.y - p.size / 2 }}
                  animate={{
                    opacity: 0,
                    scale: 0.3,
                    y: p.y - p.size / 2 - 35, // Drifts upwards slightly like warm smoke
                    rotate: Math.random() * 45 - 22.5
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute text-rose-400/70"
                  style={{ width: p.size, height: p.size }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M11.645 20.91l-.007-.003-.003-.001a15.69 15.69 0 01-1.003-.604 13.9 13.9 0 01-2.977-2.63C5.06 14.66 3.5 12.067 3.5 9.38 3.5 6.478 5.78 4 8.7 4c1.883 0 3.61 1.014 4.3 2.66h.002C13.69 5.014 15.417 4 17.3 4c2.92 0 5.2 2.478 5.2 5.38 0 2.686-1.56 5.28-4.156 7.294a13.9 13.9 0 01-2.977 2.63c-.577.44-1.01.7-1.003.604l-.003.001-.007.003-.004.001-.006.002h-.006l-.005-.002-.004-.001z" />
                  </svg>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* 2. Full-Screen Hero Opening */}
          <Hero onUnlock={handleHeroUnlock} />

          {/* Locked/Scrollable narrative components */}
          <AnimatePresence>
            {isUnlocked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full flex flex-col"
              >
                {/* Floating Music widget */}
                <MusicPlayer />

                {/* 3. 3D Love Letter Card Section */}
                <div id="love-letter-section" className="w-full">
                  <LoveLetter />
                </div>

                {/* 4. Memory Polaroid Flipping Album Book */}
                <div className="w-full">
                  <MemoryBook />
                </div>

                {/* 5. Love Milestones Timeline */}
                <div className="w-full">
                  <LoveTimeline />
                </div>

                {/* 6. Dreamy Wishes space */}
                <div className="w-full">
                  <Wishes />
                </div>

                {/* 7. Closing section & fireworks replay */}
                <div className="w-full">
                  <FinalSection onReplay={handleReplayMemories} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AudioProvider>
  );
}
