import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Timeline } from "@/components/sections/Timeline";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

/**
 * Single-page home. The order is intentional — it walks the visitor
 * through the career narrative from identity → background → evolution
 * → skills → projects (current direction first, heritage second) →
 * evidence → contact.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Timeline />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Certificates />
      <Contact />
      <Footer />
    </>
  );
}
