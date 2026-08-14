import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Timeline } from "@/components/Timeline";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Achievements } from "@/components/Achievements";
import { Certificates } from "@/components/Certificates";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

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
