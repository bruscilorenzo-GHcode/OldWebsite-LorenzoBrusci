# TIMET.ORG — rebuild

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.24355802.svg)](https://doi.org/10.5281/zenodo.24355802)

Live preview: https://oldwebsite-lorenzobrusci.vercel.app  
(`timet.org` is not switched yet; see `docs/GO-LIVE-OPTION-A.md`.)

A new static site for **Timet**, the virtual label behind Lorenzo Brusci’s music productions, founded in 1993 as an Italian sound-art collective (collective performing activity 1993–2003).

Built from the legacy archive at `/Users/lorenzobrusci2020/TIMET_SITO_BACKUP`. The backup is read-only source material and is never modified.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS v4
- No UI kit, no Bootstrap, no jQuery
- `lucide-react` for the two player icons
- Static generation; client JavaScript only for the open database

## Local development

```bash
npm install
npm run dev
# http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Environment

Only one variable is required for full audio playback:

```bash
NEXT_PUBLIC_AUDIO_BASE=https://media.example.com/timet
```

- Leave it unset to use the four preview files in `public/audio/` (total 2.4 MB, each under 2 MB).
- When set, dataset object paths such as `objects/obj-0005.mp3` are resolved against this base.
- Paths starting with `/audio/` are always served by Vercel; the four previews stay local.
- The Aruba upload package is in `deploy/aruba-media/` (see its README).
- The client reads it through `lib/audio.ts`; there is no server-side audio proxy.

On Vercel: Project → Settings → Environment Variables → add `NEXT_PUBLIC_AUDIO_BASE` for Production, Preview and Development, then redeploy.

## Routes

| Route | Content |
|---|---|
| `/` | Manifesto, eight featured releases, selected projects |
| `/releases` | Discography index (14 releases, including Isiaca, Nova Compilatione, Easy Classics, SRS, LoLe and the 2003 Timet/Mariposa collaboration) |
| `/releases/[slug]` | Cover, year, credits, tracklist, archive notes |
| `/projects` | Eight research sections + appendices |
| `/about` | Collective, timeline since 1993, lineage to Giardino Sonoro / Architettura Sonora, full member/collaborator lists, 19 bios |
| `/archive` | Legacy register in the paper register: writings, PDFs, photographic inventory, held material |
| `/contact` | Canonical address `info@musi-co.com`; legacy addresses marked defunct |
| `/open-database` | Client-side sound-object index, filters, waveform, Web Audio playback |
| `/open-database/licence` | CC BY-NC 4.0 summary; full text redirects to creativecommons.org |

Also generated: `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon.svg`, `/apple-icon.png`.

## Link checking

The repository includes a repeatable crawl of the running site:

```bash
npm run build
npm run start          # terminal 1
npm run check:links    # terminal 2
```

Against a Vercel deployment:

```bash
BASE_URL=https://your-preview.vercel.app npm run check:links
```

It checks:

- every internal page reachable from `/`
- every image on those pages
- every external link
- the legacy redirects (`/index.asp`, `/downloads/*`, `/about/*`, etc.)

It exits with code 1 if an internal page, asset or legacy redirect fails. External
failures are reported but do not fail the run, because third-party sites may block
automated requests. The script uses `playwright` with the system Google Chrome.

## Design tokens

`app/globals.css` contains the provided `tokens.css` verbatim as the single source of colour, then maps it to Tailwind v4 with `@theme inline`.

- Dark register is the default (`:root`).
- `.register-paper` is the light archive register, applied in `app/archive/layout.tsx`.
- Object type colours use the `--type-*` tokens: acoustic, electronic, field, voice, percussion, texture.
- No component introduces a new hex value. The only non-CSS surfaces that repeat token values are `app/opengraph-image.tsx` and the favicon, because `ImageResponse` and SVG cannot read CSS custom properties; they use the same token values.

## Content and licence

- All editorial text comes from `content/`, extracted verbatim from the legacy pages. `Isiaca` (1999) is sourced from `lorenzobrusci.com`; release dates are from the same source.
- Thirteen releases link directly to their Bandcamp album pages (see `content/discography.json`), including the three Zarathustra volumes, Nova Compilatione (two volumes), Easy Classics, SRS, LoLe and the 2003 Timet/Mariposa collaboration. Isiaca is the only release without a public Bandcamp page; the release page says so.
- Everything (dataset, audio, texts, interviews) is licensed **CC BY-NC 4.0**. The earlier custom TOSOL-1.0 draft was dropped.
- `public/dataset.json` carries root fields (`licence`, `tdm_policy`, `ai_training`) and metadata per object, including `published`, `provenance`, `checksum`, `licence` and `tdm_reservation`.
- Two objects are `published: false`; they render as metadata-only rows labelled “Master held, not published” with playback disabled.

### Machine-readable reservation

`next.config.ts` adds the following headers to `/dataset.json`, `/dataset.csv` and `/audio/*`:

```
X-TDM-Reservation: reserved
X-Licence: CC-BY-NC-4.0
Link: <https://creativecommons.org/licenses/by-nc/4.0/>; rel="license"
```

`app/robots.ts` disallows the dataset and audio endpoints for all agents and lists the automated agents explicitly, while keeping the licence pages readable.

## Vercel deployment and DNS

1. Push the repository to GitHub.
2. Import it into Vercel. Confirm the preview `*.vercel.app` build.
3. Add `NEXT_PUBLIC_AUDIO_BASE` and redeploy.
4. Test desktop, mobile and playback on the Vercel URL.
5. Add `timet.org` and `www.timet.org` in Vercel. Do **not** add `media.timet.org` to Vercel.
6. Keep the **Aruba DNS zone** (do not switch nameservers, or `media` would need recreating at Vercel) and set:

```
A     @       76.76.21.21
CNAME www     cname.vercel-dns.com
CNAME media   <Aruba hostname shown in the panel>
```

7. Wait for verification and automatic SSL.
8. Verify:

```bash
curl -I https://timet.org
curl -I https://media.timet.org/audio/objects/obj-0005.mp3
BASE_URL=https://timet.org npm run check:links
```

9. Keep the Aruba hosting for the paid year. Later, move `audio/` and `images/` to R2/B2/Bunny and change only `NEXT_PUBLIC_AUDIO_BASE`.

Full checklist: `docs/GO-LIVE-OPTION-A.md`.

## Notes

- Audio is never committed. `public/audio/` contains only the four short previews required for the demo. `deploy/aruba-media/audio/` is gitignored; its README and server configs are committed.
- `/archive` is the only route using `.register-paper`; the header and footer remain in the dark register.
- The recombination engine is intentionally not implemented.

## Cite

Brusci, L. (2026). *timet.org archive: timet.database and texts* (CC BY-NC 4.0). Zenodo. https://doi.org/10.5281/zenodo.24355802
