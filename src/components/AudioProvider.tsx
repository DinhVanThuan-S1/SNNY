"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import birthdayData from "@/data/birthdayData.json";

interface AudioContextType {
  isPlaying: boolean;
  isBlocked: boolean;
  togglePlay: () => void;
  playAudio: () => void;
  pauseAudio: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  frequencies: number[];
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [frequencies, setFrequencies] = useState<number[]>(new Array(16).fill(5));
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // Set up Audio element
  useEffect(() => {
    const audio = new Audio(birthdayData.music.audioUrl);
    audio.loop = true;
    audioRef.current = audio;

    // Không tự động phát nhạc ngay khi load trang để tránh trình duyệt báo lỗi NotAllowedError.
    // Thay vào đó, âm thanh sẽ được kích hoạt mượt mà khi người dùng tương tác (nhấn nút khám phá).

    return () => {
      audio.pause();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Update frequencies (Simulated rhythmic visualization for 100% CORS safety and mobile smoothness)
  useEffect(() => {
    let phase = 0;
    const updateFrequencies = () => {
      if (isPlaying) {
        phase += 0.1;
        setFrequencies((prev) =>
          prev.map((_, i) => {
            // Combine multiple sine waves with random jitter for realistic music movement
            const base = Math.sin(phase + i * 0.5) * 15 + Math.cos(phase * 1.5 - i * 0.2) * 10;
            const jitter = Math.random() * 8 - 4;
            const val = Math.max(4, Math.min(45, 25 + base + jitter));
            return val;
          })
        );
      } else {
        // Decay to zero when paused
        setFrequencies((prev) => prev.map((val) => Math.max(3, val * 0.85)));
      }
      animationRef.current = requestAnimationFrame(updateFrequencies);
    };

    updateFrequencies();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsBlocked(false);
        })
        .catch((err) => {
          console.error("Playback failed", err);
          setIsBlocked(true);
        });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isBlocked,
        togglePlay,
        playAudio,
        pauseAudio,
        audioRef,
        frequencies,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
