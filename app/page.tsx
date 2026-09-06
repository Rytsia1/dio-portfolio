import { Hero } from "@/components/sections/Hero";
import { Focus } from "@/components/sections/Focus";
import { BeyondTheCode } from "@/components/sections/BeyondTheCode";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

import { siteConfig } from "@/lib/site";

export const metadata = {
  title: `${siteConfig.name} | ${siteConfig.role}`,
  description: siteConfig.description,
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
 * career narrative:
 *
 *   Hero           → identity: who, what, why
 *   Focus          → what engineering problems I like solving
 *   BeyondTheCode  → origin story: game tech → quant finance
 *   Projects       → selected work (software/quant first, game second)
 *   Skills         → engineering stack grouped by domain
 *   Timeline       → education + experience + key milestones
 *   Achievements   → verified recognition
 *   Contact        → open to opportunities
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Focus />
      <BeyondTheCode />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
      <Footer />
    </>
  );
}
