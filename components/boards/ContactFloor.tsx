import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import { Github, Linkedin, Mail } from "lucide-react";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";

const iconLink =
  "rounded-full p-2 text-fg-muted transition-[color,background-color,transform] duration-200 hover:bg-surface-soft hover:text-fg active:scale-95";

/** Pinned contact floor. Sits on the footer's grass edge (-mb-6 overlap). */
export function ContactFloor() {
  return (
    <div id="contact" className="relative z-20 -mb-6 w-full scroll-mt-24 pt-2">
      <Container>
        <div className="flex flex-col items-start gap-5 rounded-card border border-border bg-surface px-6 py-6 card-shadow sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <span aria-hidden className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
            <div>
              <p className="text-base font-bold text-fg sm:text-lg">
                You&apos;ve seen what I build. Let&apos;s build something together.
              </p>
              <p className="mt-1 font-mono text-xs leading-relaxed text-fg-subtle">
                Surabaya, Indonesia · Open to Quantitative Developer &amp; Software Engineering internships or junior roles (Remote / Hybrid)
              </p>
              <a
                href={profile.email}
                className="mt-2 inline-block break-all rounded-sm font-mono text-sm font-semibold text-fg underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
              >
                {profile.emailDisplay}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-fg-subtle sm:gap-4">
            <span
              className="font-mono text-sm font-bold text-accent select-none"
              title="Dio Mascot"
              aria-hidden
            >
              ▪◡▪
            </span>

            <div className="flex items-center gap-1">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={iconLink}
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className={iconLink}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={profile.email}
                className={iconLink}
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>

            <div className="h-5 w-px bg-border" />
            <CopyEmailButton email={profile.emailDisplay} />          </div>
        </div>
      </Container>
    </div>
  );
}
