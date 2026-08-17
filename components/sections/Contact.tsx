import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Mascot } from "@/components/pixel/Mascot";
import { Decor } from "@/components/pixel/Decor";
import { PixelIcon, type PixelIconName } from "@/components/pixel/PixelIcon";
import { profile } from "@/data/profile";

/**
 * Contact & Dispatch Terminal.
 */
export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Comms Channel"
      title="Direct Dispatch & Collaboration"
      description="Open to game engineering, full-stack software roles, and quantitative finance collaborations."
      className="relative border-t-2 border-border"
    >
      <Decor
        kind="star"
        size={20}
        className="absolute right-10 top-10 hidden sm:block opacity-60"
      />

      <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-12 font-mono">
        {/* Main Comms Box */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border-2 border-border bg-surface p-6 sm:p-8 shadow-[3px_3px_0px_0px_rgba(15,27,45,0.14)]">
            <div className="flex items-center gap-2 border-b border-border pb-3 text-xs font-bold uppercase tracking-wider text-accent">
              <PixelIcon name="mail" size={14} />
              [ INITIATE CONTACT ]
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                href={profile.email}
                variant="primary"
                size="lg"
                aria-label={`Send email to ${profile.emailDisplay}`}
              >
                <PixelIcon name="mail" size={16} />
                Send Email
              </Button>
              <Button
                href={profile.resumeUrl}
                variant="secondary"
                size="lg"
                aria-label={profile.resumeLabel}
              >
                <PixelIcon name="file-text" size={14} />
                {profile.resumeLabel}
              </Button>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ContactLink
                href={profile.email}
                label="Email"
                sublabel={profile.emailDisplay}
                iconName="mail"
              />
              <ContactLink
                href={profile.githubUrl}
                label="GitHub"
                sublabel={profile.githubHandle}
                iconName="github"
                external
              />
              <ContactLink
                href={profile.linkedinUrl}
                label="LinkedIn"
                sublabel={profile.linkedinHandle}
                iconName="linkedin"
                external
              />
              {profile.twitterUrl && profile.twitterHandle && (
                <ContactLink
                  href={profile.twitterUrl}
                  label="Twitter / X"
                  sublabel={profile.twitterHandle}
                  iconName="twitter"
                  external
                />
              )}
            </ul>
          </div>
        </div>

        {/* Current Status Box */}
        <div className="relative lg:col-span-5">
          <div className="h-full rounded-xl border-2 border-border bg-surface p-6 sm:p-8 shadow-[3px_3px_0px_0px_rgba(15,27,45,0.14)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-border pb-3 text-xs font-bold uppercase tracking-wider text-accent">
                <PixelIcon name="terminal" size={14} />
                [ CURRENT AVAILABILITY ]
              </div>

              <h3 className="mt-4 text-base font-bold tracking-tight text-fg">
                Open for Engineering Roles & Projects
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-fg-muted font-mono sm:text-sm">
                Actively seeking roles in Game Technology, Systems Engineering,
                and Quantitative Software Development. Open to full-time,
                internship, and project contracts.
              </p>
              <p className="mt-4 text-xs font-bold text-accent">
                {profile.location ? `Based in ${profile.location}. ` : ""}
                Remote and relocation ready.
              </p>
            </div>

            {/* Sleeping mascot accent */}
            <div className="mt-6 flex justify-end">
              <Mascot
                size={96}
                pose="sleeping"
                trackCursor={false}
                reactToScroll={false}
                className="hidden sm:block"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

interface ContactLinkProps {
  href: string;
  label: string;
  sublabel: string;
  iconName: PixelIconName;
  external?: boolean;
}

function ContactLink({
  href,
  label,
  sublabel,
  iconName,
  external = false,
}: ContactLinkProps) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex items-center justify-between gap-3 rounded border border-border bg-surface-soft p-3.5 transition-all hover:border-accent hover:bg-surface active:translate-x-0.5 active:translate-y-0.5"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded border border-border bg-surface text-accent"
          >
            <PixelIcon name={iconName} size={14} />
          </span>
          <span className="min-w-0 font-mono">
            <span className="block truncate text-xs font-bold text-fg">
              {label}
            </span>
            <span className="block truncate text-[11px] text-fg-subtle">
              {sublabel}
            </span>
          </span>
        </span>
        <PixelIcon
          name="arrow-up-right"
          size={12}
          className="text-fg-subtle transition-colors group-hover:text-accent"
        />
      </a>
    </li>
  );
}