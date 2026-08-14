import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

/**
 * Dynamic Open Graph image, light editorial brand. Sky-blue canvas,
 * navy headline, orange accent role.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(180deg, #dceeff 0%, #c8e2f5 100%)",
          color: "#0f1b2d",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: "#ff6b35",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            D
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#ff6b35",
              fontWeight: 600,
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 28,
              color: "#ff6b35",
              marginBottom: 18,
              letterSpacing: 0.5,
              fontWeight: 600,
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1.05,
              color: "#0f1b2d",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 22,
              color: "#4a5a6e",
              maxWidth: 920,
              lineHeight: 1.4,
            }}
          >
            {profile.tagline}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
