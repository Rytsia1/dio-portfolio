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

components/
  boards/           Home page sections (Board1-3, ContactFloor)
  layout/           Board, Column, Navbar, Footer, CloudBackground
  ui/               Button, Container, CopyEmailButton, GameProjectCard,
                    ImageGallery, ProjectCard, Reveal, Tag
  pixel/            (Cloud, Decor)

data/               Typed content
  profile, nav, projects

lib/cn.ts
types/portfolio.ts
```

## Editing content

Update your content by editing the files listed below:

| File | Controls |
| --- | --- |
| `data/profile.ts` | Personal details, social links, contact email |
| `data/nav.ts` | Navigation menu links |
| `data/projects.ts` | Home page project tiles, the `/projects` archive, and individual project pages |
| `components/boards/Board1.tsx` | Hero copy and areas of practice |
| `components/boards/Board3.tsx` | Story, experience, tech stack, and recognition |
| `lib/site.ts` | Site name, role, description, canonical URL (SEO) |

*(Note: grep for `TODO:` in the codebase to view fields that still need real data.)*
