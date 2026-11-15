import { Container } from "@/components/ui/Container";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

/**
 * The ground the page ends on: a row of pixel grass tufts, a grass strip,
 * then earth. `overlap` leaves room for the contact card that sits on the
 * grass on the home page.
 */
export function Footer({ overlap = false }: { overlap?: boolean }) {
  return (
    <footer className="mt-auto text-on-accent">
      <div
        aria-hidden
        className="h-1.5"
        style={{
          background:
            "repeating-linear-gradient(90deg, var(--grass) 0 6px, transparent 6px 12px, var(--grass) 12px 24px, transparent 24px 30px)",
        }}
      />
      <div aria-hidden className="h-1.5 bg-grass" />

      <div
        className={cn(
          "bg-linear-to-b from-earth from-60% to-earth-deep pb-10",
          overlap ? "pt-24" : "pt-12",
        )}
      >
        <Container className="flex flex-col gap-8">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div>
              <p className="font-bold">{profile.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-on-accent/85">
                Software engineer. Quantitative finance and backend systems.
              </p>
            </div>
            <BackToTopButton className="group inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium hover:underline focus-visible:outline-on-accent" />
          </div>
          <p className="text-[13px] tabular-nums text-on-accent/85">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </Container>
      </div>
    </footer>
  );
}
