# TIMET.ORG — REBUILD BRIEF

Project context for AI coding assistants (DeepSeek / Claude / Copilot) working in VS Code.

---

## 1. What Timet is

Timet is an Italian sound-art collective founded by Lorenzo Brusci in 1993, active until 2003.
Work spanned music for theatre, dance, television, radio, and sound installations.

Core focus: evolution of compositional and performing techniques for nonlinear music and
sound architecture. Support for the open data philosophy in the distribution of intellectual
objects: final compositions, single audio elements, electronic partitures.

Core members: Lorenzo Brusci (electronics, composition, production, theory), Monica Demuru,
Andrea de Luca, Letizia Renzini, Mirio Cosottini, Beppe Mangione, Stefano Bollani,
Mirko Guerrini, Paolo Frasconi.

Collaborators include Fred Frith, Ikue Mori, Elliott Sharp, Enrico Rava, Stefano Battaglia,
Zeena Parkins, Frank Schulte.

Discography: Cicli di Sintesi (1996), Quadri di Schermo Vivo (1997),
Colazione con la Pietra (1997), La Via Negativa (1998), Shadows / Ombre (1998),
Isiaca (1999), Restituzioni (1999), Carne Capitata (2000), On Zarathustra (2002).

Activity stopped in 2003. The site today is a FrontPage / Classic ASP / Flash relic.

---

## 2. Goal

Rebuild timet.org from scratch as a modern static site, deployed on Vercel,
replacing the legacy Aruba Windows hosting.

The existing backup at `../TIMET_SITO_BACKUP/timet.org` is READ-ONLY source material.
Never delete, move, or modify files there.

---

## 3. Design direction

- Geometric, minimal, editorial, quiet.
- Strict 12-column grid, generous whitespace, everything aligned to it.
- Typography-led: one grotesque for display at large sizes with tight tracking,
  one neutral sans for UI and body. Fluid type scale with `clamp()`.
- Geometry is the only ornament: thin 1px rules, perfect squares and circles,
  horizontal strata, hard edges. No shadows. No border-radius above 2px.
  No gradients. No glassmorphism. No stock-photo feel.
- Colour: keep the original hues, extracted from the legacy site. Do not invent a new palette.
  Expose them as CSS variables and as Tailwind theme tokens.
- Dark-first if the original was dark.
- Motion: 150-250ms opacity and transform reveals only. No parallax, no bounce.
  Fully respect `prefers-reduced-motion`.
- Accessibility: WCAG AA contrast, visible focus rings, semantic landmarks,
  keyboard navigable, alt text on every image.

---

## 4. Stack

- Next.js 15 App Router, TypeScript, Tailwind CSS v4
- No UI kit, no Bootstrap, no jQuery, icons from lucide-react only
- Server components and static generation preferred, no client JS unless required
- Deploy target: Vercel

---

## 5. Content rules

- All text must come from the extracted legacy content. Never paraphrase, never invent.
- Keep original Italian where it was Italian.
- Where a field is unclear or missing, write `TODO: verify` rather than guessing.
- Legacy contact address `lorenzo.brusci@timet.org` is DEFUNCT.
  Use `info@musi-co.com` as the site contact instead.
- Keep external links to `lorenzobrusci.com`, `musstdesign.com` and the SoundCloud
  profiles as references to ongoing work.
- No Lorem Ipsum in the final output.

---

## 6. Pages

| Route | Purpose |
|---|---|
| `/` | Manifesto statement, featured releases, recent projects |
| `/releases` | Discography index |
| `/releases/[slug]` | Cover, year, credits, tracklist, description |
| `/projects` | Modular: sonic architecture, hyper classicism, nonlinear music, installations |
| `/about` | The collective, timeline 1993-2003, full collaborator list |
| `/archive` | Legacy material: scans, articles, documents, clearly framed as archive |
| `/contact` | Contact via info@musi-co.com |

Plus `sitemap.xml`, `robots.txt`, Open Graph images, favicon set.

---

## 7. Audio strategy

- Do NOT commit audio files to the repository. `tracks/` and `mp3/` are hundreds of MB.
- Store audio in external object storage (Cloudflare R2, Backblaze B2, Bunny).
- `lib/audio.ts` exposes the base URL from `NEXT_PUBLIC_AUDIO_BASE`.
- A persistent bottom player streams from that base, integrated with tracklists.
- No autoplay.
- In `/public` keep only 3-4 short previews under 2MB each so the Vercel demo works.

---

## 8. DNS and go-live

Email on timet.org is NOT in use. No MX, SPF, DKIM or mailbox migration required.

Sequence:

1. Push the repo to GitHub.
2. Import into Vercel, get the `*.vercel.app` preview working first.
3. Test on the Vercel URL: desktop, mobile, audio base URL configured.
4. Screenshot the current Aruba DNS zone for records worth recreating
   (TXT verification, Google Search Console).
5. Either add the two records in Aruba DNS:
   - `A @ -> 76.76.21.21`
   - `CNAME www -> cname.vercel-dns.com`
   or change nameservers to Vercel's:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
6. Add the domain in Vercel, verify, SSL issues automatically.
7. Add permanent redirects from legacy URLs such as `index.asp`, `database/index.asp`,
   `www.timet.org` to their new equivalents or to `/archive`.
8. Only after a period of stability, cancel the Aruba hosting plan.
   Keep the domain registered.

---

## 9. Working protocol

- Work in small steps: scaffold, design tokens, pages, polish.
- Run `npm run build` after each step and fix all errors before continuing.
- Maintain `PROGRESS.md` and update it as work advances.
- Deliver a repo that builds cleanly, plus a README with local dev commands,
  Vercel environment variable setup, and the DNS records listed above.
