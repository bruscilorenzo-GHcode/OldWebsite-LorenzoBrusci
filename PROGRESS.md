# PROGRESS

Updated: 2026-11-04

## Phase status

- [x] **0 — Legacy source audit**
  - `docs/CONTENT_INVENTORY.md` — 3.79 GB / 2 781 files classified
  - `docs/PALETTE.md` — legacy palette audit
  - `docs/ASSET_STRATEGY.md` — `/public` vs object storage
  - Security quarantine documented (PHP webshell, cloaking spam, injected spam links)
- [x] **1 — Content extraction**
  - `content/*.json` + 250 verbatim page dumps in `content/pages/`
- [x] **2 — BRIEF audit**
  - `docs/BRIEF_AUDIT.md`
  - `Isiaca (1999)` absent from the backup, later resolved from `lorenzobrusci.com` (History, d7); catalogue is now 9 releases
- [x] **3 — Next.js scaffold**
  - Next.js 15 App Router, TypeScript, Tailwind CSS v4
  - Astro prototype removed
- [x] **4 — Design tokens**
  - Provided `tokens.css` implemented verbatim in `app/globals.css`
  - Mapped to Tailwind v4 with `@theme inline`
  - Dark register default; `.register-paper` for `/archive`
  - No new colour values introduced in components
- [x] **5 — Pages**
  - `/`, `/releases`, `/releases/[slug]`, `/projects`, `/about`, `/archive`, `/contact`
  - `/open-database`, `/open-database/licence`, `/open-database/licence/full`
- [x] **6 — Audio**
  - `lib/audio.ts` with `NEXT_PUBLIC_AUDIO_BASE`
  - Single-object Web Audio playback, no autoplay
  - Persistent bottom player on `/open-database`
  - Four local previews under 2 MB each (2.4 MB total)
- [x] **7 — SEO and metadata**
  - `sitemap.xml`, `robots.txt`, Open Graph image, favicon and apple icon
- [x] **8 — Accessibility and polish**
  - WCAG AA token pairs, focus rings, landmarks, keyboard controls, alt text
  - `prefers-reduced-motion` respected
- [x] **9 — README and Vercel**
  - `README.md` with local commands, env setup and DNS records
- [x] **10 — TOSOL-1.0**
  - `content/licence/tosol-1.0.md` byte-identical to the supplied text
  - Section 6 headers in `next.config.ts`
  - Section 7 invariants in `types/soundObject.ts`
  - Root fields and per-object reservations in `public/dataset.json`
  - Robots directives for automated agents
  - `published: false` rows: dimmed, labelled, playback disabled
  - “Pending legal review” rendered on the licence page
- [ ] **11 — Recombination engine** — explicitly not built

## Verified behaviour

- `npm run build` passes; 25 routes generated.
- Dataset + audio endpoints return `X-TDM-Reservation: reserved`, `X-Licence: TOSOL-1.0` and the licence `Link` header.
- `/open-database`: 10 objects, 2 held, 2 disabled play buttons, 10 type blocks.
- Filters: type `voice` → 4 objects; year `1998` → 3 objects.
- Playback starts one object, bottom player appears, stop resets state.
- No browser console errors in the interaction test.

## Decisions

- Canonical contact: `info@musi-co.com`. Legacy `@timet.org` addresses are defunct.
- Display name: **Frank Schulte**; the legacy `Frank Shulte` spelling is kept as a source note.
- `Isiaca (1999)` is included from `lorenzobrusci.com` (History, d7): November 1999, "A procession dedicated to the work of the artist G. Di Cocco." No tracklist, line-up or Bandcamp page is published. The release now uses an archive image of a work by G. Di Cocco (`about/cogdc.htm`, `gdc02.jpg`), clearly labelled as an archive image and not confirmed as the original cover.
- `Metamorfosi di canzoni napoletane` (Timet / Mariposa, 2003) is now a full release with 7 tracks, credits, cover and a direct Bandcamp link.
- `Nova Compilatione` (The Metacollectors: Lorenzo Brusci, Paolo Frasconi, 2000) is now a full release with 14 Bandcamp tracks across two volumes, cover and two direct links.
- `Easy Classics` (2000) is now a full release with the 11-track Bandcamp edition, cover and a direct link.
- `Società Ritmico Sintetica` (2003) and `LoLe #1, Musica Leggiadra` (2006) are now full releases with Bandcamp links, 12 and 8 tracks, covers and credits.
- Object types follow the `--type-*` tokens: acoustic, electronic, field, voice, percussion, texture.

## Bandcamp finding (2026-11-04)

`https://lorenzobrusci-timet.bandcamp.com/` resolves to “Music | Lorenzo Brusci” and lists
recent solo work (That JazzFeeling, BONDS & ARPEGGIOS, XINEMATRIX, ALIEN, Logical Prayers,
Behavioral Clouds, The Compassionate Flowers, Never Ending, Selfseismic, Preliminary Study,
and others). It does **not** list the eight Timet releases (Cicli di sintesi, Quadri di
schermo vivo, Colazione con la Pietra, La Via Negativa, Shadows, Restituzioni, Carne
Capitata, On Zarathustra) and does not mention Isiaca.

`timet.bandcamp.com` and `lorenzobrusci.bandcamp.com` are unregistered (they redirect to
the Bandcamp signup page). No per-release Bandcamp URL can be set yet. The artist page is
linked in the footer and in /about only.

## Lineage and people (2026-11-04)

- Timet stopped in 2003 and gave way to Giardino Sonoro (`https://www.giardinosonoro.com/`).
  Many Timet collaborators later worked in the Florentine sonic garden, before the launch
  of Architettura Sonora (`https://www.architetturasonora.com/`). This is rendered in `/about`.
- Taxonomy applied: musicians are members; artists are collaborators. The legacy name lists
  are preserved; the labels were changed to “Members · Musicians” and “Collaboration · Artists”.
- Verified personal websites were added for 17 people (from `links.htm` and the legacy bios).
  Dead URLs (Stefano Passerotti, Giampaolo di Cocco, Paolo Frasconi's old DSI page,
  Loozoo, Blindvision) were not linked. Andres Bosshard links to HEK.
- Release dates (month/year) and short descriptions were added from `lorenzobrusci.com`.
- Only *Cicli di sintesi* has a Bandcamp album page. The other releases link to the
  `lorenzobrusci.com` history. No per-release Bandcamp URL was invented.

## Bandcamp direct links (2026-11-04)

Resolved album URLs on `lorenzobrusci-timet.bandcamp.com`:

- Cicli di sintesi — `/album/cicli-di-sintesi-remastered` (remastered edition)
- Quadri di schermo vivo — `/album/quadri-di-schermo-vivo-remastered` (remastered edition)
- Colazione con la pietra — `/album/colazione-con-la-pietra` (remastered edition)
- La Via Negativa — `/album/la-via-negativa`
- Restituzioni — `/album/restituzioni` (remastered edition)
- Carne Capitata — `/album/carne-capitata`

No Bandcamp page found for Shadows, Isiaca or On Zarathustra. The generic
"History on lorenzobrusci.com" CTA was removed from release pages; those three
releases state that no Bandcamp page is published. No URL was invented.

## Bandcamp links, final pass (2026-11-04)

Direct album URLs provided by the client:

- Shadows — `/album/shadows-murder-in-the-cathedral`
- Zarathustra — `/album/zarathustra-vol-1`, `/album/zarathustra-vol-2`, `/album/zarathustra-vol-3`
- Metamorfosi di canzoni napoletane — `/album/metamorfosi-di-canzoni-napoletane`

Everything except *Isiaca* now has a direct Bandcamp link. Isiaca still has no
public Bandcamp page; the release page says so.

## Further Bandcamp links (2026-11-04, second pass)

- Nova Compilatione — `/album/the-metacollectors-nova-compilatione-lorenzo-brusci-paolo-frasconi-vol-1` and `vol-2`
- Easy Classics — `/album/easy-classics-in-electronics`

The catalogue now has 12 release pages. The original `Compilatione` and `Easy Classics`
entries were removed from "Further releases" to avoid duplicate listings; their legacy
pages remain the source for provenance.

## 108 pieces / 109 files (2026-11-04)

The `108 pieces for the web` page (`downloads/database/index.HTM`) has its audio in
`downloads/database/mp3`: **109 MP3 files, 500 MB**. The page says 108 pieces; one extra
file is present. The set is not in the repository and is a candidate for the open
database / object storage, not for a static `/public` upload.

## Catalogue size (2026-11-04)

14 release pages. 13 have direct Bandcamp links. Only Isiaca has no Bandcamp page.
SRS and LoLe were removed from "Further releases"; that section now has ATM, Marble and
108 pieces.

## Deployment (2026-11-18)

- Private GitHub repository: https://github.com/bruscilorenzo-GHcode/OldWebsite-LorenzoBrusci
- Vercel production preview: https://oldwebsite-lorenzobrusci.vercel.app
- `timet.org` and its DNS are untouched. No custom domain is attached yet.
- `NEXT_PUBLIC_AUDIO_BASE` is not set. The four previews in `public/audio/` play; the four
  Aruba objects (`obj-0005` … `obj-0008`) stay unavailable until `media.timet.org` is live.
- Link check against the Vercel URL: 23 pages, 14 assets, 39 external links, 0 failures;
  10 legacy redirects return 308.
- The Vercel project is not connected to GitHub for auto-deploy yet: the Vercel account
  needs a GitHub login connection first. Until then, deploy with `npx vercel --prod`.
