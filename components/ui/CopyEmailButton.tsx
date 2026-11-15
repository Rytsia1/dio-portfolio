"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";

/**
 * Copies the email address. Success shows a tick for two seconds. Failure
 * stays on screen and says what to do instead, because a message that
 * disappears before it is read is no help.
 *
 * Render it inside a `flex-wrap` row: the failure message takes a full line.
 */
export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear a pending reset on unmount.
  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const handleCopy = async () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);

    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      // Fallback for older browsers and restricted iframe contexts.
      const el = document.createElement("textarea");
      el.value = email;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      document.body.removeChild(el);
    }

    setStatus(ok ? "copied" : "failed");
    if (ok) resetTimer.current = setTimeout(() => setStatus("idle"), 2000);
  };

  const copied = status === "copied";

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className={buttonClass({
          variant: "secondary",
          size: "lg",
          icon: "start",
          // Fixed minimum so the row does not shift when the label changes.
          className: "min-w-[10.5rem]",
        })}
      >
        {copied ? (
          <Check className="animate-pop h-4 w-4 text-accent" aria-hidden />
        ) : (
          <Copy className="h-4 w-4" aria-hidden />
        )}
        <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
      </button>

      {status === "failed" && (
        <p role="alert" className="basis-full text-sm leading-[1.55] text-fg-muted">
          <strong className="font-semibold text-accent">The address was not copied.</strong>{" "}
          Your browser blocked clipboard access. Select {email} and press Ctrl+C, or Cmd+C on a
          Mac.
        </p>
      )}
    </>
  );
}
