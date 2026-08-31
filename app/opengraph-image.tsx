import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

// ---------------------------------------------------------------------------
// Image metadata
// ---------------------------------------------------------------------------
// `size`, `contentType`, and `alt` are read by the App Router to populate
// the route's <meta property="og:image:..."> tags automatically.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} | ${siteConfig.role} | Game Technology Portfolio`;

// ---------------------------------------------------------------------------
// Font: Press Start 2P (Google Fonts)
// ---------------------------------------------------------------------------
// A pixel-art 8-bit display face. Fetched once at module init so the
// `ImageResponse` build doesn't pay the cost per render. The `cache:
// "force-cache"` hint is harmless on the Node runtime and a no-op on
// Edge (where module-scope fetches are cached by the platform anyway).
//
// `woff` is one of the three formats `next/og` supports (ttf/otf/woff).
// Google serves Press Start 2P in a single ~30 KB woff for Latin — well
// inside the 500 KB `ImageResponse` bundle budget.
//
// If the fetch fails (offline build, CDN hiccup, etc.) we fall through
// to a system monospace font so the image still renders.
const PRESS_START_2P_URL =
  "https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nUjvWuO5w.woff";

let pressStart2PData: ArrayBuffer | null = null;
try {
  pressStart2PData = await fetch(PRESS_START_2P_URL, {
    cache: "force-cache",
  }).then((r) => {
    if (!r.ok) throw new Error(`Press Start 2P fetch failed: ${r.status}`);
    return r.arrayBuffer();
  });
} catch {
  // Network unavailable at build time — fall through to system mono.
  pressStart2PData = null;
}

const FONT_NAME = pressStart2PData ? "PressStart2P" : "monospace";

// ---------------------------------------------------------------------------
// Visual tokens
// ---------------------------------------------------------------------------
// Kept in module scope so they're declared once and re-used by the JSX.
// Hex values match the site's CSS variables in `app/globals.css` so the
// OG card feels native to the rest of the brand.
const COLORS = {
  bg: "#0f172a", // deep slate, mirrors the open-graph "dark mode" feel
  bgDeep: "#020617",
  border: "#1e293b",
  borderStrong: "#334155",
  fg: "#f8fafc",
  fgMuted: "#94a3b8",
  accent: "#ff6b35", // warm orange (matches --accent)
  green: "#a3e635", // terminal green for subhead
  red: "#ef4444", // traffic light
  yellow: "#facc15",
  cyan: "#22d3ee",
} as const;

// ---------------------------------------------------------------------------
// Image generation
// ---------------------------------------------------------------------------
/**
 * Dynamic Open Graph image — retro game-menu aesthetic.
 *
 * Composition (top → bottom):
 *   1. Deep-slate canvas with a soft orange radial vignette and a faint
 *      pixel grid that echoes `bg-pixel-grid` from globals.css.
 *   2. "Terminal window" chrome: an 8 px solid border and three faux
 *      traffic-light dots in the top-left, plus a `~/portfolio` title
 *      bar to the right.
 *   3. A blinking-cursor `>` prompt line, then the name in 88 px Press
 *      Start 2P with a tight `0` letter-spacing so each pixel reads
 *      cleanly.
 *   4. A green subhead line: `> {siteConfig.role}`.
 *   5. A muted dim line: `siteConfig.description` (SEO honesty — the
 *      same string the meta description serves).
 *   6. A bottom strip with a `READY` badge and a `[PRESS START]` prompt.
 *
 * All identity text (name, role, description) is injected from the
 * `siteConfig` SSOT in `lib/site.ts` — nothing is hard-coded here.
 */
export default async function OpenGraphImage() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "48px",
            background: `radial-gradient(circle at 30% 20%, rgba(255,107,53,0.18) 0%, rgba(15,23,42,0) 55%), ${COLORS.bg}`,
            color: COLORS.fg,
            fontFamily: `${FONT_NAME}, monospace`,
            // Synthetic pixel rendering hint — Satori ignores this but
            // a future runtime swap (e.g. to a real <canvas> renderer)
            // would honour it.
            imageRendering: "pixelated",
          }}
        >
          {/* Faint pixel grid backdrop — drawn with inline linear
              gradients because Satori does not support `background-image` */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              background: `
                linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
          />

          {/* ── Terminal window chrome ─────────────────────────────────── */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 24px",
              borderRadius: "4px",
              background: COLORS.bgDeep,
              border: `2px solid ${COLORS.borderStrong}`,
              boxShadow: `0 0 0 6px ${COLORS.bg}, 0 0 0 8px ${COLORS.accent}`,
            }}
          >
            {/* Traffic-light dots */}
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  background: COLORS.red,
                  display: "flex",
                }}
              />
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  background: COLORS.yellow,
                  display: "flex",
                }}
              />
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  background: "#22c55e",
                  display: "flex",
                }}
              />
            </div>

            {/* Fake title-bar text */}
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                fontSize: 16,
                color: COLORS.fgMuted,
                letterSpacing: 1,
              }}
            >
              ~/portfolio / bash / 80×24
            </div>

            {/* Right-side badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                color: COLORS.accent,
                letterSpacing: 1,
              }}
            >
              ● REC
            </div>
          </div>

          {/* ── Main hero block ───────────────────────────────────────── */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 36,
            }}
          >
            {/* Prompt + name */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 18,
                color: COLORS.accent,
                fontSize: 26,
                letterSpacing: 1,
                marginBottom: 14,
              }}
            >
              <span>{`>`}</span>
              <span style={{ color: COLORS.fgMuted, fontSize: 22 }}>
                whoami
              </span>
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 88,
                lineHeight: 1.05,
                letterSpacing: 0,
                color: COLORS.fg,
                fontWeight: 400,
                textShadow: `4px 4px 0 ${COLORS.accent}`,
              }}
            >
              {siteConfig.name}
            </div>

            {/* Subhead — green terminal line */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: 28,
                fontSize: 30,
                color: COLORS.green,
                letterSpacing: 1,
              }}
            >
              <span style={{ color: COLORS.accent }}>{`>`}</span>
              <span>{siteConfig.role}</span>
            </div>

            {/* Real description — dim, for SEO honesty */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 22,
                fontSize: 22,
                color: COLORS.fgMuted,
                letterSpacing: 0.5,
                lineHeight: 1.45,
                maxWidth: 1000,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <span style={{ color: COLORS.cyan }}>{`>`}</span>
                <span>{siteConfig.description}</span>
              </div>
            </div>
          </div>

          {/* ── Bottom action strip ────────────────────────────────────── */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 36,
              padding: "18px 24px",
              border: `2px solid ${COLORS.borderStrong}`,
              borderRadius: 4,
              background: COLORS.bgDeep,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 22,
                color: COLORS.fg,
                letterSpacing: 1,
              }}
            >
              <span
                style={{
                  display: "flex",
                  padding: "6px 12px",
                  background: COLORS.accent,
                  color: COLORS.bg,
                  fontSize: 18,
                  borderRadius: 2,
                }}
              >
                READY
              </span>
              <span style={{ color: COLORS.fgMuted }}>[ PRESS START ]</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 18,
                color: COLORS.fgMuted,
                letterSpacing: 1,
              }}
            >
              <span style={{ color: COLORS.green }}>●</span>
              ONLINE
              <span style={{ color: COLORS.borderStrong }}>|</span>
              1P
              <span style={{ color: COLORS.borderStrong }}>|</span>
              2026
            </div>
          </div>
        </div>
      ),
      {
        ...size,
        fonts: pressStart2PData
          ? [
              {
                name: FONT_NAME,
                data: pressStart2PData,
                weight: 400,
                style: "normal",
              },
            ]
          : undefined,
      },
    );
  } catch (err) {
    // Last-resort safety net. Never let a misconfigured OG image
    // break the homepage's social-share preview.
    console.error("[opengraph-image] failed:", err);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
