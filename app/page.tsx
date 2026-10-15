import { Board1 } from "@/components/boards/Board1";
import { Board2 } from "@/components/boards/Board2";
import { Board3 } from "@/components/boards/Board3";
import { ContactFloor } from "@/components/boards/ContactFloor";
import { Footer } from "@/components/layout/Footer";

import { siteConfig } from "@/lib/site";

export const metadata = {
  title: `${siteConfig.name} | ${siteConfig.role}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
  },
};

/**
 * Single-page home. Section order walks the visitor through the
 * career narrative using the "Columns, not bands" architectural pattern:
 *
 *   Board 1 -> Identity & Quick Links
 *   Board 2 -> Current Work (Dense 2-column)
 *   Board 3 -> How I got here (Origin story & Stack)
 *   Contact floor -> pinned onto the footer's grass edge
 *
 * Game projects live in the /projects archive (linked from Board 2).
 */
export default function Home() {
  return (
    <>
      <Board1 />
      <Board2 />
      <Board3 />
      <ContactFloor />
      {/* Footer merges with the ground under the contact floor */}
      <Footer />
    </>
  );
}
