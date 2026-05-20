"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import birthdayData from "@/data/birthdayData.json";
import { ChevronLeft, ChevronRight, BookOpen, Heart } from "lucide-react";

export const MemoryBook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  const album = birthdayData.album;

  const handleNext = () => {
    if (currentPage < album.length - 1) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Drag handler for mobile swiping
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  // Dynamic 3D page flip transition configs
  const pageVariants = {
    initial: (dir: number) => ({
      rotateY: dir > 0 ? 80 : -80,
      opacity: 0,
      transformOrigin: dir > 0 ? "left center" : "right center",
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      transformOrigin: "center center",
      transition: {
        duration: 0.65,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number], // Custom realistic deceleration curve
      },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -80 : 80,
      opacity: 0,
      transformOrigin: dir > 0 ? "right center" : "left center",
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-[#FFF5F5] to-[#FFF0F5] dark:from-[#0F0208] dark:to-[#170611] overflow-hidden flex flex-col items-center justify-center min-h-screen">
      {/* Dynamic ambient stardust lights */}
      <div className="absolute top-10 left-10 w-[20rem] h-[20rem] rounded-full bg-rose-200/10 dark:bg-rose-950/5 blur-[80px]" />
      <div className="absolute bottom-10 right-10 w-[20rem] h-[20rem] rounded-full bg-violet-200/15 dark:bg-violet-950/5 blur-[80px]" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <span className="text-sm font-semibold tracking-widest text-rose-500/80 dark:text-rose-400 font-sans uppercase">
          Cuốn Sách Kỷ Niệm
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-slate-100 font-serif mt-2">
          Memory Book
        </h2>
        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="w-10 h-[1px] bg-rose-300" />
          <BookOpen className="w-4.5 h-4.5 text-rose-400 fill-rose-100 dark:fill-rose-950/20" />
          <div className="w-10 h-[1px] bg-rose-300" />
        </div>
      </motion.div>

      {/* Album Outer Book Wrapper */}
      <div className="relative z-10 w-full max-w-lg aspect-[3/4] md:aspect-[4/5] flex items-center justify-center perspective-[1500px]">
        {/* Book Spine Shadow Details */}
        <div className="absolute inset-0 bg-slate-900/[0.03] rounded-[2.5rem] blur-md transform translate-y-4 scale-[0.98]" />

        {/* Page Container */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="relative w-full h-full bg-[#FCFBF9] dark:bg-slate-900 border border-[#EBE7DF] dark:border-rose-950/20 rounded-[2rem] shadow-2xl p-6 md:p-8 flex flex-col justify-between select-none active:cursor-grabbing"
        >
          {/* Polaroid paper background texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,rgba(249,245,238,0.5)_100%)] dark:bg-none rounded-[2rem] pointer-events-none" />

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full flex flex-col justify-between"
            >
              {/* Polaroid Frame Container */}
              <div className="flex-1 bg-white dark:bg-slate-950 border border-slate-100 dark:border-rose-950/30 p-4 pb-12 shadow-md rounded-xl flex flex-col justify-between transform rotate-[-1deg]">
                {/* 1. Large Image Frame */}
                <div className="relative w-full aspect-[4.25/3.9] bg-rose-50/50 rounded-lg overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={album[currentPage].photoUrl}
                    alt={album[currentPage].caption}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  {/* Soft vignetting on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </div>

                {/* 2. Handwritten styled polaroid caption */}
                <div className="mt-8 px-2 text-center">
                  <p className="text-base md:text-lg font-normal text-slate-600 dark:text-slate-300 font-sans leading-relaxed px-4 select-text">
                    {album[currentPage].caption}
                  </p>
                </div>
              </div>

              {/* Bottom footer pagination */}
              <div className="mt-6 flex items-center justify-between text-xs tracking-wider text-slate-400 dark:text-slate-500 font-sans uppercase">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-400" />
                  <span>Trang {album[currentPage].id}</span>
                </span>
                <span>Chương Ký ức</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Interactive clicking page corners for retro look */}
          {/* Previous click zone */}
          {currentPage > 0 && (
            <div
              onClick={handlePrev}
              className="absolute bottom-4 left-4 w-12 h-12 flex items-end justify-start cursor-pointer group z-20"
            >
              <div className="w-6 h-6 border-b-2 border-l-2 border-slate-300 dark:border-rose-950 group-hover:border-rose-400 dark:group-hover:border-rose-500 transition-colors rounded-bl-lg animate-pulse" />
            </div>
          )}

          {/* Next click zone */}
          {currentPage < album.length - 1 && (
            <div
              onClick={handleNext}
              className="absolute bottom-4 right-4 w-12 h-12 flex items-end justify-end cursor-pointer group z-20"
            >
              <div className="w-6 h-6 border-b-2 border-r-2 border-slate-300 dark:border-rose-950 group-hover:border-rose-400 dark:group-hover:border-rose-500 transition-colors rounded-br-lg animate-pulse" />
            </div>
          )}
        </motion.div>
      </div>

      {/* Slider Manual Controls Overlay */}
      <div className="relative z-10 mt-10 flex items-center gap-6 select-none">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`w-12 h-12 bg-white dark:bg-slate-900 border border-rose-100/50 dark:border-rose-950/20 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95 text-slate-600 dark:text-slate-300 hover:text-rose-500 ${currentPage === 0 ? "opacity-35 cursor-not-allowed scale-100!" : ""
            }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 font-sans tracking-widest">
          {album[currentPage].id} / {album.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === album.length - 1}
          className={`w-12 h-12 bg-white dark:bg-slate-900 border border-rose-100/50 dark:border-rose-950/20 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95 text-slate-600 dark:text-slate-300 hover:text-rose-500 ${currentPage === album.length - 1 ? "opacity-35 cursor-not-allowed scale-100!" : ""
            }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
