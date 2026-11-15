import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Story } from "@/components/sections/Story";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { profile } from "@/data/profile";
import { siteConfig } from "@/lib/site";

export const metadata = {
  // Short role in the tab so the title survives truncation. The full role
  // stays in the Open Graph and Twitter titles below.
  title: { absolute: `${siteConfig.name} | ${profile.role}` },
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
 * Single-page home, in the order a recruiter reads it:
 *
 *   Hero    -> who this is, and the areas of practice
 *   Work    -> the flagship project and two supporting ones
 *   Story   -> background, stack, experience, recognition
 *   Contact -> the one card that sits on the footer's grass
 *
 * Every other project lives in the /projects archive (linked from Work).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Story />
      <Contact />
      <Footer overlap />
    </>
  );
}
