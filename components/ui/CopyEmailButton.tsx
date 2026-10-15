"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface CopyEmailButtonProps {
  email?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Interactive button that copies the contact email to clipboard
 * with instant tactile feedback (icon change + "Copied!" badge).
 */
export function CopyEmailButton({
  email = "dioadinata520@gmail.com",
  className,
  size = "lg",
}: CopyEmailButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear a pending reset on unmount.
  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const flash = (next: "copied" | "failed") => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    setStatus(next);
    resetTimer.current = setTimeout(() => setStatus("idle"), 2000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      flash("copied");
    } catch {
      // Fallback for older browsers or restricted iframe contexts
      const el = document.createElement("textarea");
      el.value = email;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      document.body.removeChild(el);
      flash(ok ? "copied" : "failed");
    }
  };

  const copied = status === "copied";

  const sizeClasses = {
    sm: "h-9 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-11 px-5 text-sm gap-2",
  }[size];

  return (
    <button
      type="button"
      onClick={handleCopy}
      // Each label starts with the visible text (WCAG 2.5.3 label in name).
      aria-label={
        copied
          ? "Copied! Email address copied to clipboard"
          : status === "failed"
            ? `Copy failed. Email is ${email}`
            : `Copy email (${email})`
      }
      className={cn(
        "group inline-flex items-center justify-center whitespace-nowrap font-medium rounded-full border card-shadow-soft",
        "transition-[color,background-color,border-color,transform] duration-200 ease-out active:scale-[0.97]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset",
        copied
          ? "border-emerald-500/50 bg-emerald-50 text-emerald-700 shadow-sm"
          : status === "failed"
            ? "border-accent/50 bg-accent-soft text-accent-strong"
            : "border-border bg-surface text-fg hover:border-accent/40 hover:bg-surface-soft",
        sizeClasses,
        className,
      )}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-600" aria-hidden />
          <span className="font-semibold text-emerald-700">Copied!</span>
        </>
      ) : status === "failed" ? (
        <>
          <X className="h-4 w-4" aria-hidden />
          <span className="font-semibold">Copy failed</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 text-fg-subtle transition-colors group-hover:text-fg" aria-hidden />
          <span>Copy email</span>
        </>
      )}
    </button>
  );
}
