"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/AudioProvider";
import { Music, Volume2, VolumeX, Sparkles, Play } from "lucide-react";
import birthdayData from "@/data/birthdayData.json";

export const MusicPlayer: React.FC = () => {
  const { isPlaying, isBlocked, togglePlay, playAudio, frequencies } = useAudio();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Autoplay blocked fallback pop-up dialog */}
      <AnimatePresence>
        {isBlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="mb-4 mr-1 max-w-xs p-4 bg-white/95 dark:bg-slate-900/95 border border-rose-100 dark:border-rose-950/40 rounded-2xl shadow-xl backdrop-blur-md text-center flex flex-col items-center"
          >
            <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 mb-2 animate-bounce">
              <Music className="w-5 h-5 fill-rose-300" />
            </div>
            
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-normal font-sans">
              {birthdayData.music.alertMessage}
            </p>
            
            <button
              onClick={() => {
                playAudio();
              }}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white font-medium text-xs rounded-full shadow-sm cursor-pointer transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Bật Âm Thanh</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Music Widget */}
      <div className="flex items-center gap-3">
        {/* Visualizer bars dancing beside the music controller */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="h-10 px-4 bg-white/80 dark:bg-slate-900/80 border border-rose-100/50 dark:border-rose-950/20 rounded-full flex items-center justify-center gap-[3px] backdrop-blur-md shadow-md overflow-hidden select-none"
            >
              {frequencies.slice(0, 10).map((freq, i) => (
                <motion.div
                  key={i}
                  animate={{ height: `${freq * 0.6}px` }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 18,
                  }}
                  className="w-[3px] min-h-[3px] bg-gradient-to-t from-rose-400 to-rose-300 dark:from-rose-500 dark:to-rose-400 rounded-full"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play/Pause glass toggle button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={togglePlay}
          className="relative w-14 h-14 bg-white/80 dark:bg-slate-900/80 border border-rose-100/50 dark:border-rose-950/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer z-10"
        >
          {/* Beating background glow ring */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-rose-200/40 dark:bg-rose-900/20 animate-ping pointer-events-none" />
          )}

          {/* Rotating music node icon */}
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isPlaying
                ? { duration: 8, repeat: Infinity, ease: "linear" }
                : { duration: 0.4 }
            }
            className="text-rose-500 dark:text-rose-400"
          >
            <Music className={`w-6 h-6 ${isPlaying ? "fill-rose-100 dark:fill-rose-950/30" : ""}`} />
          </motion.div>

          {/* Small volume indicator in the corner */}
          <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-rose-400 dark:bg-rose-500 text-white rounded-full flex items-center justify-center shadow-sm text-[10px]">
            {isPlaying ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </span>
        </motion.button>
      </div>
    </div>
  );
};
