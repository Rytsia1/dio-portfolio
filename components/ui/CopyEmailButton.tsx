"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers or restricted iframe contexts
      const el = document.createElement("textarea");
      el.value = email;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sizeClasses = {
    sm: "h-9 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-11 px-5 text-sm gap-2",
  }[size];

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Email address copied to clipboard" : `Copy ${email} to clipboard`}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-full border transition-all duration-200 card-shadow-soft",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        copied
          ? "border-emerald-500/50 bg-emerald-50 text-emerald-700 shadow-sm"
          : "border-border bg-surface text-fg hover:border-accent/40 hover:bg-surface-soft",
        sizeClasses,
        className,
      )}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-600 animate-in fade-in zoom-in-75 duration-150" aria-hidden />
          <span className="font-semibold text-emerald-700">Copied!</span>
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
