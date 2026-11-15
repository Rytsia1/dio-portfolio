import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon: the navbar's D mark. The letter is drawn as a bordered box
 * with a rounded right side, so it does not depend on a font being
 * available to the image renderer. Colours are accent-fill and on-accent.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "#c2410c",
        }}
      >
        <div
          style={{
            width: 14,
            height: 18,
            marginLeft: 1,
            border: "4px solid #ffffff",
            borderTopLeftRadius: 1,
            borderBottomLeftRadius: 1,
            borderTopRightRadius: 9,
            borderBottomRightRadius: 9,
          }}
        />
      </div>
    ),
    size,
  );
}
