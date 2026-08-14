"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  /** The HTML tag to render. */
  as?: "div" | "ul" | "ol" | "li" | "section";
}

/**
 * Subtle entrance animation. Fades and slides content up a few pixels
 * when it enters the viewport. Respects `prefers-reduced-motion` —
 * reduced-motion users see the content immediately with no movement.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  const common = {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
    className: cn(className),
  };

  switch (as) {
    case "ul":
      return <motion.ul {...common}>{children}</motion.ul>;
    case "ol":
      return <motion.ol {...common}>{children}</motion.ol>;
    case "li":
      return <motion.li {...common}>{children}</motion.li>;
    case "section":
      return <motion.section {...common}>{children}</motion.section>;
    case "div":
    default:
      return <motion.div {...common}>{children}</motion.div>;
  }
}
