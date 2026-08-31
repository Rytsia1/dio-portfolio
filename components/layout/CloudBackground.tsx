"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cloud } from "@/components/pixel/Cloud";

/**
 * Dynamic Multi-Layer Parallax Background
 * 
 * Tracks the user's vertical scroll position and moves three distinct depth layers
 * of clouds at different speeds to create a 2.5D parallax effect.
 */
export function CloudBackground() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  // Parallax translation ranges mapped dynamically to total page scroll percentage.
  // Using vh ensures they smoothly drift exactly this far by the absolute bottom of the page,
  // preventing them from ever freezing halfway down or flying completely off-screen.
  const yBg = useTransform(scrollYProgress, [0, 1], ["0vh", "-20vh"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0vh", "-45vh"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["0vh", "-75vh"]);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return null on server and initial render
  }

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full select-none"
    >
      {/* ── Background Layer (Slow, Small, High Crispness) ─────────────── */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <div className="absolute left-[3%] top-[4%]">
          <Cloud size="sm" variant={1} opacity={0.85} drift="slow" />
        </div>
        <div className="absolute right-[4%] top-[22%] hidden sm:block">
          <Cloud size="sm" variant={3} opacity={0.8} drift="reverse" />
        </div>
        <div className="absolute left-[5%] top-[46%] hidden md:block">
          <Cloud size="sm" variant={2} opacity={0.8} drift="medium" />
        </div>
        <div className="absolute right-[5%] top-[72%]">
          <Cloud size="sm" variant={1} opacity={0.85} drift="slow" />
        </div>
        {/* Extended vertical parallax coverage */}
        <div className="absolute left-[4%] top-[95vh]">
          <Cloud size="sm" variant={3} opacity={0.8} drift="reverse" />
        </div>
        <div className="absolute right-[6%] top-[115vh] hidden sm:block">
          <Cloud size="sm" variant={2} opacity={0.85} drift="slow" />
        </div>
      </motion.div>

      {/* ── Midground Layer (Medium Speed, Medium Size) ────────────────── */}
      <motion.div 
        style={{ y: yMid }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <div className="absolute right-[6%] top-[8%] hidden md:block">
          <Cloud size="md" variant={3} opacity={0.9} drift="fast" />
        </div>
        <div className="absolute left-[4%] top-[28%]">
          <Cloud size="md" variant={1} opacity={0.92} drift="reverse" />
        </div>
        <div className="absolute right-[5%] top-[50%] hidden sm:block">
          <Cloud size="md" variant={2} opacity={0.88} drift="medium" />
        </div>
        <div className="absolute left-[3%] top-[68%] hidden lg:block">
          <Cloud size="md" variant={3} opacity={0.9} drift="slow" />
        </div>
        {/* Extended vertical parallax coverage */}
        <div className="absolute right-[5%] top-[105vh]">
          <Cloud size="md" variant={1} opacity={0.9} drift="reverse" />
        </div>
        <div className="absolute left-[6%] top-[125vh] hidden md:block">
          <Cloud size="md" variant={3} opacity={0.92} drift="fast" />
        </div>
      </motion.div>

      {/* ── Foreground Layer (Fastest, Large, Full Contrast) ───────────── */}
      <motion.div 
        style={{ y: yFg }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <div className="absolute left-[4%] top-[14%] hidden sm:block">
          <Cloud size="lg" variant={2} opacity={0.96} drift="medium" />
        </div>
        <div className="absolute right-[4%] top-[34%] hidden xl:block">
          <Cloud size="xl" variant={1} opacity={0.98} drift="slow" />
        </div>
        <div className="absolute right-[5%] top-[82%]">
          <Cloud size="lg" variant={3} opacity={0.95} drift="fast" />
        </div>
        {/* Extended vertical parallax coverage */}
        <div className="absolute left-[3%] top-[110vh]">
          <Cloud size="lg" variant={1} opacity={0.95} drift="reverse" />
        </div>
        <div className="absolute right-[4%] top-[135vh] hidden sm:block">
          <Cloud size="xl" variant={2} opacity={0.98} drift="medium" />
        </div>
      </motion.div>
    </div>
  );
}
