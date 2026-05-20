"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAudio } from "@/components/AudioProvider";
import birthdayData from "@/data/birthdayData.json";
import { ChevronDown, Heart } from "lucide-react";

interface HeroProps {
  onUnlock: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onUnlock }) => {
  const { playAudio } = useAudio();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Heart particle system canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Heart class representing each drifting particle
    class HeartParticle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 15 + 8;
        this.speedY = -(Math.random() * 1.5 + 0.8);
        this.speedX = Math.random() * 0.8 - 0.4;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.pulseSpeed = Math.random() * 0.05 + 0.02;
        this.pulsePhase = Math.random() * Math.PI * 2;

        // Sweet romantic palette colors
        const colors = [
          "rgba(255, 182, 193, opacity)", // LightPink
          "rgba(255, 192, 203, opacity)", // Pink
          "rgba(240, 128, 128, opacity)", // LightCoral
          "rgba(255, 105, 180, opacity)", // HotPink
          "rgba(221, 160, 221, opacity)"  // Plum
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.pulsePhase) * 0.15;
        this.pulsePhase += this.pulseSpeed;

        // Reset particle to bottom if it moves off-screen
        if (this.y < -30) {
          this.y = height + 30;
          this.x = Math.random() * width;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        const currentOpacity = this.opacity * (0.8 + Math.sin(this.pulsePhase) * 0.2);
        c.fillStyle = this.color.replace("opacity", currentOpacity.toString());
        c.beginPath();

        // Draw standard heart path using bezier curves
        const x = this.x;
        const y = this.y;
        const s = this.size;
        
        c.moveTo(x, y + s / 4);
        c.bezierCurveTo(x, y, x - s / 2, y, x - s / 2, y + s / 3);
        c.bezierCurveTo(x - s / 2, y + (2 * s) / 3, x, y + s, x, y + s);
        c.bezierCurveTo(x, y + s, x + s / 2, y + (2 * s) / 3, x + s / 2, y + s / 3);
        c.bezierCurveTo(x + s / 2, y, x, y, x, y + s / 4);

        c.closePath();
        c.fill();
        c.restore();
      }
    }

    const particles: HeartParticle[] = [];
    // Maintain ~35 floating hearts for ambient atmosphere without battery drain
    const maxParticles = Math.min(45, Math.floor(width / 35));
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new HeartParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Soft vignette gradient background
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        width * 0.8
      );
      gradient.addColorStop(0, "rgba(255, 245, 245, 0.4)");
      gradient.addColorStop(1, "rgba(255, 235, 235, 0.1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleUnlockClick = () => {
    // 1. Play audio immediately to unlock browser audio context
    playAudio();
    // 2. Trigger parent callbacks
    onUnlock();
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-radial from-[#FFF2F2] via-[#FFF8F8] to-[#FFEBEB] dark:from-[#12050A] dark:via-[#0F0208] dark:to-[#170611] px-4">
      {/* Falling hearts canvas backdrop */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Decorative ambient glowing lights */}
      <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] rounded-full bg-rose-200/25 dark:bg-rose-950/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full bg-violet-200/20 dark:bg-violet-950/5 blur-[100px] pointer-events-none z-0" />

      {/* Hero typographic content overlay */}
      <div className="relative z-10 text-center max-w-4xl flex flex-col items-center">
        {/* Beating Heart Icon with Ripple */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 15,
            delay: 0.2,
          }}
          className="relative mb-8 flex items-center justify-center w-20 h-20 bg-white/80 dark:bg-slate-900/50 rounded-full border border-rose-100/50 dark:border-rose-950/30 backdrop-blur-md shadow-md"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-9 h-9 text-rose-500 fill-rose-400" />
          </motion.div>
          
          {/* Beating pulse ring */}
          <span className="absolute inset-0 rounded-full border-2 border-rose-300 animate-ping opacity-30" />
        </motion.div>

        {/* Happy Birthday Big Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-rose-500 via-rose-600 to-violet-600 dark:from-rose-400 dark:to-violet-400 bg-clip-text text-transparent font-serif select-none pb-2 leading-tight"
        >
          {birthdayData.hero.title}
        </motion.h1>

        {/* Emotion Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-6 text-lg md:text-xl font-light text-slate-700/90 dark:text-slate-300/80 leading-relaxed font-sans max-w-2xl text-center"
        >
          {birthdayData.hero.subtitle}
        </motion.p>

        {/* Dynamic Unlock Action Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUnlockClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 dark:from-rose-600 dark:to-rose-700 text-white font-medium text-lg rounded-full shadow-lg shadow-rose-200 dark:shadow-none hover:shadow-xl transition-all cursor-pointer overflow-hidden"
          >
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span>{birthdayData.hero.btnOpen}</span>
            <Heart className="w-5 h-5 group-hover:scale-125 group-hover:fill-white transition-all duration-300" />
          </motion.button>
        </motion.div>
      </div>

      {/* Chevron scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1 text-slate-500/60 dark:text-slate-400/50"
      >
        <span className="text-xs tracking-widest font-light font-sans uppercase">Cuộn xuống dưới</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  );
};
