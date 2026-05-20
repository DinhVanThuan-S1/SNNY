"use client";

import React from "react";
import { motion } from "framer-motion";
import birthdayData from "@/data/birthdayData.json";
import { Heart, Sparkles, Calendar } from "lucide-react";

export const LoveTimeline: React.FC = () => {
  const timeline = birthdayData.timeline;

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-[#FFF0F5] to-[#FFEBEB] dark:from-[#170611] dark:to-[#0F0208] overflow-hidden flex flex-col items-center justify-center min-h-screen">
      {/* Decorative stardust particles background */}
      <div className="absolute top-1/3 right-1/4 w-[25rem] h-[25rem] rounded-full bg-rose-200/10 dark:bg-rose-950/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[25rem] h-[25rem] rounded-full bg-violet-200/10 dark:bg-violet-950/5 blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative z-10"
      >
        <span className="text-sm font-semibold tracking-widest text-rose-500/80 dark:text-rose-400 font-sans uppercase">
          Hành Trình Tình Yêu
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-slate-100 font-serif mt-2">
          Love Story Timeline
        </h2>
        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="w-10 h-[1px] bg-rose-300" />
          <Heart className="w-4.5 h-4.5 text-rose-500 fill-rose-300 animate-pulse" />
          <div className="w-10 h-[1px] bg-rose-300" />
        </div>
      </motion.div>

      {/* Timeline Wrapper */}
      <div className="relative z-10 w-full max-w-4xl px-4">
        {/* Center Vertical Line (Left-aligned on mobile, perfectly centered on desktop) */}
        <div className="absolute left-[29px] md:left-1/2 top-2 bottom-2 w-[3px] bg-gradient-to-b from-rose-200 via-rose-300 to-violet-300 dark:from-rose-950/20 dark:via-rose-900/30 dark:to-violet-900/20 transform md:-translate-x-1/2 rounded-full pointer-events-none">
          {/* Scroll progress glowing bar inside the timeline */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full bg-gradient-to-b from-rose-400 via-rose-500 to-violet-500 dark:from-rose-500 dark:to-violet-400 rounded-full"
          />
        </div>

        {/* Timeline Events Stack */}
        <div className="space-y-12 relative">
          {timeline.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={event.id}
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between"
              >
                {/* 1. Beating Heart Checkpoint Marker */}
                <div className="absolute left-0 md:left-1/2 top-4 md:top-auto w-15 h-15 transform -translate-x-[22px] md:-translate-x-1/2 rounded-full bg-white dark:bg-slate-900 border-3 border-rose-400/80 dark:border-rose-600 flex items-center justify-center shadow-md z-20 group">
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-400 group-hover:fill-rose-500 transition-colors" />
                  </motion.div>
                  {/* Glowing ring */}
                  <span className="absolute inset-0 rounded-full border border-rose-300/40 animate-ping opacity-60 pointer-events-none" />
                </div>

                {/* 2. Left Event (Empty spacer on desktop if event is odd) */}
                <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${isEven ? "md:text-right" : "md:order-last md:text-left"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, type: "spring", stiffness: 70 }}
                    className="p-6 md:p-8 bg-white/70 dark:bg-slate-900/60 border border-rose-100/50 dark:border-rose-950/20 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl hover:border-rose-200/50 dark:hover:border-rose-900/30 transition-all select-text group"
                  >
                    {/* Timestamp Badge */}
                    <div className={`flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider text-rose-500 dark:text-rose-400 font-sans uppercase mb-3 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>

                    {/* Milestone Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 font-serif mb-3">
                      {event.title}
                    </h3>

                    {/* Milestone Description */}
                    <p className="text-sm md:text-base font-light text-slate-600/90 dark:text-slate-300/80 leading-relaxed font-sans">
                      {event.description}
                    </p>

                    {/* Delicate hover stardust glow */}
                    <span className="absolute top-4 right-4 text-rose-300/40 dark:text-rose-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </span>
                  </motion.div>
                </div>

                {/* 3. Right Empty spacer on desktop to balance layout */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
