import { Download, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Mascot } from "@/components/pixel/Mascot";
import { Cloud } from "@/components/pixel/Cloud";
import { Decor } from "@/components/pixel/Decor";
import { profile } from "@/data/profile";

/**
 * Contact — light editorial design. Friendly closing with white cards,
 * orange CTAs, and pixel-art decorations.
 */
export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Want to build something together?"
      description="I'm open to software engineering roles, internships, and serious project collaborations. The fastest way to reach me is email — feel free to add context about what you're working on."
      className="relative border-t border-border"
    >
      <Cloud
        size="sm"
        variant={1}
        className="absolute left-6 top-6 hidden sm:block"
      />
      <Decor
        kind="star"
        size={20}
        className="absolute right-10 top-10 hidden sm:block"
      />

      <Reveal className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-border bg-surface p-6 card-shadow sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                href={profile.email}
                variant="primary"
                size="lg"
                aria-label={`Send email to ${profile.emailDisplay}`}
              >
                <Mail className="h-4 w-4" aria-hidden />
                Email me
              </Button>
              <Button
                href={profile.resumeUrl}
                variant="secondary"
                size="lg"
                aria-label={profile.resumeLabel}
              >
                <Download className="h-4 w-4" aria-hidden />
                {profile.resumeLabel}
              </Button>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              <ContactLink
                href={profile.email}
                label="Email"
                sublabel={profile.emailDisplay}
                icon={<Mail className="h-4 w-4" aria-hidden />}
              />
              <ContactLink
                href={profile.githubUrl}
                label="GitHub"
                sublabel={profile.githubHandle}
                icon={<Github className="h-4 w-4" aria-hidden />}
                external
              />
              <ContactLink
                href={profile.linkedinUrl}
                label="LinkedIn"
                sublabel={profile.linkedinHandle}
                icon={<Linkedin className="h-4 w-4" aria-hidden />}
                external
              />
              <ContactLink
                href={profile.resumeUrl}
                label="Resume"
                sublabel="Download the latest PDF"
                icon={<Download className="h-4 w-4" aria-hidden />}
              />
            </ul>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="rounded-3xl border border-border bg-surface p-6 card-shadow sm:p-8">
            <p className="eyebrow">Currently</p>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-fg">
              Open to engineering opportunities
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              Particularly interested in roles that combine software
              engineering with quantitative finance, FinTech, or systems
              work. Happy to chat about internships, new-grad, or
              short-term project collaborations.
            </p>
            <p className="mt-4 text-xs text-fg-subtle">
              {profile.location ? `Based in ${profile.location}. ` : ""}
              Open to remote and relocation.
            </p>
          </div>
          <Mascot
            size={88}
            className="absolute -bottom-4 -right-2 hidden lg:block"
          />
        </div>
      </Reveal>
    </Section>
  );
}

interface ContactLinkProps {
  href: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  external?: boolean;
}

function ContactLink({
  href,
  label,
  sublabel,
  icon,
  external = false,
}: ContactLinkProps) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface-soft p-4 transition-colors hover:border-accent/40 hover:bg-surface"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-accent"
          >
            {icon}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-fg">
              {label}
            </span>
            <span className="block truncate text-xs text-fg-subtle">
              {sublabel}
            </span>
          </span>
        </span>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-fg-subtle transition-colors group-hover:text-accent"
          aria-hidden
        />
      </a>
    </li>
  );
}
