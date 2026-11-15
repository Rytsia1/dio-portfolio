import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { profile } from "@/data/profile";

const profileLink =
  "inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-fg transition-colors duration-200 hover:text-accent";

/**
 * Contact card. It overlaps the footer by 48px so it sits on the grass;
 * the footer is rendered with `overlap` to leave room for it.
 */
export function Contact() {
  return (
    <section id="contact" className="relative z-10 -mb-12 scroll-mt-24">
      <Container>
        <div className="flex flex-col gap-8 rounded-card border border-border bg-surface p-6 card-shadow sm:p-12">
          <div className="flex flex-col gap-3">
            <h2 className="type-section text-balance">Hiring an intern or junior engineer?</h2>
            <p className="max-w-[36em] text-pretty text-lg leading-relaxed text-fg-muted">
              I am looking for quantitative developer and backend or full-stack roles, remote or
              hybrid. Email is the fastest way to reach me.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button href={profile.email} size="lg" icon="start">
                <Mail className="h-4 w-4" aria-hidden />
                Send email
              </Button>
              <CopyEmailButton email={profile.emailDisplay} />
              <span className="type-data break-all pl-1 text-fg-muted">{profile.emailDisplay}</span>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (opens in new tab)"
                className={profileLink}
              >
                <Github className="h-4 w-4" aria-hidden />
                GitHub
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in new tab)"
                className={profileLink}
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
