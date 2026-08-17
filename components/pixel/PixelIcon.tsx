import type { FC, SVGProps } from "react";
import { cn } from "@/lib/cn";

export type PixelIconName =
  | "github"
  | "linkedin"
  | "mail"
  | "twitter"
  | "instagram"
  | "file-text"
  | "arrow-right"
  | "arrow-left"
  | "arrow-up-right"
  | "external-link"
  | "download"
  | "chevron-down"
  | "menu"
  | "close"
  | "gamepad"
  | "trophy"
  | "award"
  | "briefcase"
  | "graduation"
  | "globe"
  | "map-pin"
  | "layers"
  | "images"
  | "star"
  | "play"
  | "terminal"
  | "code"
  | "shield"
  | "sword"
  | "heart"
  | "coin"
  | "check";

export interface PixelIconProps extends SVGProps<SVGSVGElement> {
  name: PixelIconName;
  size?: number;
  className?: string;
}

/**
 * Hand-crafted 16x16 retro pixel-art SVG icon system.
 * Zero external font/icon library dependencies.
 * Uses `shapeRendering="crispEdges"` for razor-sharp pixel edges.
 */
export const PixelIcon: FC<PixelIconProps> = ({
  name,
  size = 16,
  className,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      shapeRendering="crispEdges"
      className={cn("inline-block shrink-0 align-middle select-none", className)}
      aria-hidden="true"
      {...props}
    >
      {ICONS[name] ?? ICONS["star"]}
    </svg>
  );
};

const ICONS: Record<PixelIconName, React.ReactNode> = {
  // ── Social & Links ────────────────────────────────────────────────────────
  github: (
    <path d="M5,1h6v1h-6z M3,2h2v1h-2z M11,2h2v1h-2z M2,3h1v3h-1z M13,3h1v3h-1z M1,6h1v5h-1z M14,6h1v5h-1z M2,11h2v2h-2z M12,11h2v2h-2z M4,13h8v2h-8z M4,8h2v2h-2z M10,8h2v2h-2z M6,10h4v2h-4z" />
  ),
  linkedin: (
    <path d="M2,2h3v3h-3z M2,6h3v8h-3z M7,6h3v2h1v-1h1v-1h3v8h-3v-5h-2v5h-3z" />
  ),
  mail: (
    <path d="M1,3h14v10h-14z M2,4h12v1h-12z M3,5h2v1h-2z M11,5h2v1h-2z M5,6h2v1h-2z M9,6h2v1h-2z M7,7h2v1h-2z M2,12h12v-1h-12z" />
  ),
  twitter: (
    <path d="M2,3h3v1h1v1h1v1h-1v1h-1v1h-1v2h1v1h2v1h3v-1h2v-1h2v-1h1v-2h-1v-1h1v-2h-2v1h-2v-2h-3v1h-1v-2h-3z" />
  ),
  instagram: (
    <path d="M3,2h10v1h-10z M2,3h1v10h-1z M13,3h1v10h-1z M3,13h10v1h-10z M10,4h2v2h-2z M6,6h4v4h-4z M7,5h2v1h-2z M7,10h2v1h-2z M5,7h1v2h-1z M10,7h1v2h-1z" />
  ),
  "file-text": (
    <path d="M3,1h7v1h1v1h1v1h1v11h-10z M4,2h5v3h3v9h-8z M5,6h6v1h-6z M5,8h6v1h-6z M5,10h4v1h-4z" />
  ),

  // ── Navigation & Actions ──────────────────────────────────────────────────
  "arrow-right": (
    <path d="M2,7h9v2h-9z M9,4h2v1h-2z M11,5h2v1h-2z M13,6h2v4h-2z M11,10h2v1h-2z M9,11h2v1h-2z" />
  ),
  "arrow-left": (
    <path d="M5,7h9v2h-9z M5,4h2v1h-2z M3,5h2v1h-2z M1,6h2v4h-2z M3,10h2v1h-2z M5,11h2v1h-2z" />
  ),
  "arrow-up-right": (
    <path d="M5,2h9v9h-2v-5h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-2h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h-5z" />
  ),
  "external-link": (
    <path d="M8,2h6v6h-2v-3h-1v1h-1v1h-1v1h-1v-2h1v-1h1v-1h-2z M2,4h4v2h-3v7h7v-3h2v4h-10z" />
  ),
  download: (
    <path d="M7,2h2v6h2v-1h1v1h-1v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1h-1v-1h1v1h2z M2,12h12v2h-12z" />
  ),
  "chevron-down": (
    <path d="M3,6h2v1h-2z M5,7h2v1h-2z M7,8h2v1h-2z M9,7h2v1h-2z M11,6h2v1h-2z" />
  ),
  menu: (
    <path d="M2,3h12v2h-12z M2,7h12v2h-12z M2,11h12v2h-12z" />
  ),
  close: (
    <path d="M3,3h2v2h-2z M11,3h2v2h-2z M5,5h2v2h-2z M9,5h2v2h-2z M7,7h2v2h-2z M5,9h2v2h-2z M9,9h2v2h-2z M3,11h2v2h-2z M11,11h2v2h-2z" />
  ),

  // ── Game & Tech ───────────────────────────────────────────────────────────
  gamepad: (
    <path d="M3,4h10v1h1v1h1v5h-1v1h-2v-1h-1v-1h-4v1h-1v1h-2v-1h-1v-5h1v-1h1z M4,7h1v-1h1v1h1v1h-1v1h-1v-1h-1z M11,6h1v1h-1z M12,7h1v1h-1z M10,7h1v1h-1z M11,8h1v1h-1z" />
  ),
  trophy: (
    <path d="M3,2h10v5h-2v2h-1v1h-1v2h2v2h-6v-2h2v-2h-1v-1h-1v-2h-2z M2,3h1v3h-1z M13,3h1v3h-1z M5,4h6v3h-6z" />
  ),
  award: (
    <path d="M5,1h6v1h2v4h-1v2h-1v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1h-1v-2h-1v-4h2z M6,3h4v3h-4z M4,11h2v4h-1v-2h-1z M10,11h2v4h-1v-2h-1z" />
  ),
  briefcase: (
    <path d="M6,2h4v2h-4z M2,4h12v10h-12z M3,5h10v2h-4v1h-2v-1h-4z M7,7h2v2h-2z" />
  ),
  graduation: (
    <path d="M8,2l7,4l-7,4l-7,-4z M3,7v4l5,3l5,-3v-4l-1,1v2l-4,2l-4,-2v-2z M13,8v5h1v-5z" />
  ),
  globe: (
    <path d="M5,1h6v1h2v2h1v6h-1v2h-2v1h-6v-1h-2v-2h-1v-6h1v-2h2z M7,2h2v12h-2z M3,5h10v1h-10z M3,10h10v1h-10z M4,3h1v10h-1z M11,3h1v10h-1z" />
  ),
  "map-pin": (
    <path d="M5,1h6v1h2v4h-1v2h-1v2h-1v2h-1v2h-1v2h-2v-2h-1v-2h-1v-2h-1v-2h-1v-4h2z M6,4h4v3h-4z" />
  ),
  layers: (
    <path d="M8,1l6,3l-6,3l-6,-3z M2,7l6,3l6,-3v2l-6,3l-6,-3z M2,11l6,3l6,-3v2l-6,3l-6,-3z" />
  ),
  images: (
    <path d="M2,2h12v12h-12z M3,3h10v10h-10z M4,4h3v3h-3z M4,11l3,-4l2,2l2,-3l2,4h-9z" />
  ),
  star: (
    <path d="M7,1h2v2h-2z M3,5h10v2h-10z M2,6h12v1h-12z M4,9h2v2h-2z M10,9h2v2h-2z" />
  ),
  play: (
    <path d="M4,2h3v2h-3z M4,4h5v2h-5z M4,6h7v4h-7z M4,10h5v2h-5z M4,12h3v2h-3z" />
  ),
  terminal: (
    <path d="M1,2h14v12h-14z M2,3h12v10h-12z M3,4h2v1h-2z M4,5h2v1h-2z M5,6h2v1h-2z M4,7h2v1h-2z M3,8h2v1h-2z M7,9h5v1h-5z" />
  ),
  code: (
    <path d="M4,4h2v2h-2z M2,6h2v4h-2z M4,10h2v2h-2z M10,4h2v2h-2z M12,6h2v4h-2z M10,10h2v2h-2z M8,3h2v2h-1v6h1v2h-2z" />
  ),
  shield: (
    <path d="M2,2h12v5h-1v3h-1v2h-1v1h-2v1h-2v-1h-2v-1h-1v-2h-1v-3h-1z M4,4h8v3h-1v2h-1v1h-1v1h-2v-1h-1v-1h-1v-2h-1z" />
  ),
  sword: (
    <path d="M12,1h3v3h-2v1h-1v1h-1v1h-1v1h-1v1h-1v1h1v1h-1v1h-2v1h-1v2h-2v-2h2v-1h1v-1h-1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1z" />
  ),
  heart: (
    <path d="M3,2h3v2h-3z M10,2h3v2h-3z M2,4h12v4h-12z M3,8h10v2h-10z M4,10h8v2h-8z M6,12h4v2h-4z" />
  ),
  coin: (
    <path d="M5,2h6v1h-6z M4,3h8v10h-8z M5,13h6v1h-6z M6,5h4v6h-4z" />
  ),
  check: (
    <path d="M12,3h2v2h-2z M10,5h2v2h-2z M8,7h2v2h-2z M6,9h2v2h-2z M4,7h2v2h-2z M2,5h2v2h-2z" />
  ),
};
