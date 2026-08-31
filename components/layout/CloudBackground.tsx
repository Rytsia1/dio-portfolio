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
      {/* ── Background Layer (Slow, Small, Low Opacity) ────────────────── */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <div className="absolute left-[3%] top-[5%]">
          <Cloud size="sm" variant={1} opacity={0.4} drift="slow" />
        </div>
        <div className="absolute right-[4%] top-[25%] hidden sm:block">
          <Cloud size="sm" variant={3} opacity={0.35} drift="reverse" />
        </div>
        <div className="absolute left-[6%] top-[45%] hidden md:block">
          <Cloud size="sm" variant={2} opacity={0.3} drift="medium" />
        </div>
        <div className="absolute right-[5%] top-[75%]">
          <Cloud size="sm" variant={1} opacity={0.4} drift="slow" />
        </div>
        {/* Extended vertical coverage */}
        <div className="absolute left-[5%] top-[105vh]">
          <Cloud size="sm" variant={3} opacity={0.35} drift="reverse" />
        </div>
      </motion.div>

      {/* ── Midground Layer (Medium Speed, Medium Size/Opacity) ────────── */}
      <motion.div 
        style={{ y: yMid }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <div className="absolute right-[6%] top-[10%] hidden md:block">
          <Cloud size="md" variant={3} opacity={0.55} drift="fast" />
        </div>
        <div className="absolute left-[5%] top-[30%]">
          <Cloud size="md" variant={1} opacity={0.60} drift="reverse" />
        </div>
        <div className="absolute right-[5%] top-[52%] hidden sm:block">
          <Cloud size="md" variant={2} opacity={0.50} drift="medium" />
        </div>
        <div className="absolute left-[4%] top-[70%] hidden lg:block">
          <Cloud size="md" variant={3} opacity={0.55} drift="slow" />
        </div>
        {/* Extended vertical coverage */}
        <div className="absolute right-[7%] top-[115vh]">
          <Cloud size="md" variant={1} opacity={0.60} drift="reverse" />
        </div>
      </motion.div>

      {/* ── Foreground Layer (Fastest, Large, High Opacity) ────────────── */}
      <motion.div 
        style={{ y: yFg }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <div className="absolute left-[4%] top-[18%] hidden sm:block">
          <Cloud size="lg" variant={2} opacity={0.75} drift="medium" />
        </div>
        <div className="absolute right-[5%] top-[35%] hidden 2xl:block">
          <Cloud size="lg" variant={1} opacity={0.80} drift="slow" />
        </div>
        <div className="absolute right-[6%] top-[85%]">
          <Cloud size="lg" variant={3} opacity={0.70} drift="fast" />
        </div>
        {/* Extended vertical coverage */}
        <div className="absolute left-[4%] top-[125vh]">
          <Cloud size="lg" variant={1} opacity={0.75} drift="reverse" />
        </div>
      </motion.div>
    </div>
  );
}
