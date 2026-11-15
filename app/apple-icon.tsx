import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Touch icon: the same D mark as `icon.tsx`, on a full-bleed square.
 * iOS applies its own corner mask and does not support transparency.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#c2410c",
        }}
      >
        <div
          style={{
            width: 70,
            height: 92,
            marginLeft: 6,
            border: "20px solid #ffffff",
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            borderTopRightRadius: 46,
            borderBottomRightRadius: 46,
          }}
        />
      </div>
    ),
    size,
  );
}
