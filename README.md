# Dio Stania Adinata — Portfolio

A professional personal portfolio for a Software Engineer with a
background in Game Technology and Game Design.

The visual identity is a **light editorial** design: a soft sky-blue
canvas, white content cards, dark navy text, warm orange accents, and
small pixel-art decorations. The site is built as a fast, mostly-static
Next.js project; every section reads from typed data files in `data/`,
so the content can be edited without touching the UI.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org) (strict)
- [Tailwind CSS v4](https://tailwindcss.com) — `@theme` tokens, no config file
- [Framer Motion](https://www.framer.com/motion/) — subtle reveal animations
- [Lucide React](https://lucide.dev) — icons
- [ESLint](https://eslint.org) + `eslint-config-next`

No backend, no database, no CMS. Hosting target is Vercel.

## Visual identity

| Token | Value | Used for |
| --- | --- | --- |
| `--bg` | `#dceeff` (sky blue) | Page background |
| `--surface` | `#ffffff` | White content cards |
| `--fg` | `#0f1b2d` (dark navy) | Primary text |
| `--accent` | `#ff6b35` (warm orange) | Highlights, CTAs |
| `--earth` | `#5a3a22` | Footer body |
| `--grass` | `#6cc04a` | Pixel-grass transition |

Pixel-art decorations are inline SVG (no external image files needed)
and live in `components/pixel/`. They are always `aria-hidden` and only
ever decorative.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Project structure

```
app/                Next.js App Router
  layout.tsx
  page.tsx
  globals.css       (light theme design tokens)
  opengraph-image.tsx
  robots.ts
  sitemap.ts
  not-found.tsx
  projects/[slug]/

components/         UI components
  About, Achievements, Button, Certificates, Contact, Container,
  Experience, Footer, GameProjectCard, Hero, Navbar, ProjectCard,
  Projects, Reveal, Section, Skills, Tag, Timeline
  pixel/            (Cloud, Mascot, Decor)

data/               Typed content
  profile, nav, skills, projects, experience, education, achievements,
  certificates

lib/cn.ts
types/portfolio.ts
```

## Editing content

Everything visible on the site is driven from `data/*.ts`. You can update your content by editing the files listed below:

| File | Controls |
| --- | --- |
| `data/profile.ts` | Hero section, personal details, social links, SEO metadata |
| `data/nav.ts` | Navigation menu links |
| `data/skills.ts` | Skills section |
| `data/projects.ts` | Featured projects, game projects, and individual project pages |
| `data/experience.ts` | Work experience timeline |
| `data/education.ts` | Education timeline |
| `data/achievements.ts` | Achievements list |
| `data/certificates.ts` | Certificates section |

*(Note: grep for `TODO:` in the codebase to view fields that still need real data.)*
