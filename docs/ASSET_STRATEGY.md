# ASSET STRATEGY — what lives in `/public`, what goes to object storage

Backup total: **3.79 GB / 2 781 files**, of which **574 files exceed 2 MB**.
By far the dominant cost is audio.

| type | files | size | share |
|---|---:|---:|---:|
| `.mp3` | 829 | 3 530.4 MB | 91.0 % |
| `.jpg` | 1 017 | 132.6 MB | 3.4 % |
| `.mov` | 19 | 111.0 MB | 2.9 % |
| `.tar` | 7 | 66.1 MB | 1.7 % |
| `.pdf` | 21 | 16.7 MB | 0.4 % |
| `.swf` | 31 | 7.8 MB | 0.2 % |
| everything else (`.asp/.htm/.gif/.png/.mdb/.xml/.js/.doc`) | 857 | ~20 MB | 0.5 % |

A static host or a Next.js repo should not carry 3.8 GB. Target: **`/public` under 5 MB**, everything else on object storage behind a CDN.

---

## 1. Decision rule

| keep in `/public` | move to object storage | discard |
|---|---|---|
| file `< 2 MB` **and** required on first paint or in the core reading experience | file `≥ 2 MB` **or** long-tail media (audio, video, stems, PDFs, full galleries) | malware, `.swf`, `.tar` served as downloads, OS junk, FP metadata, duplicate media |
| release covers, logo, favicon, 3–5 hero images, small nav glyphs | all 829 MP3s, 19 MOVs, 7 TARs, 21 PDFs, gallery JPGs, `.mdb` backups | `public/*.php`, `cgi-bin/index.php`, `events/index.php`, `_vti_*`, `Thumbs.db`, `index.htm_`, `index.html_` |
| optimised derivatives (AVIF/WebP, 2 sizes) | originals, untouched | Flash players |

"Under 2 MB" is a ceiling, not a target. For `/public`, aim at **≤ 250 KB per derivative** and **≤ 5 MB total**.

---

## 2. `/public` — proposed manifest (≈ 2.4 MB)

### 2.1 Release covers (8 files, ≈ 100 KB)

Source: `Assets/immagini/downloads/`

| release | original | size | `/public` derivative |
|---|---|---:|---|
| Cicli di sintesi | `cd_cicli.jpg` | 13 K | `covers/cicli-di-sintesi.jpg` + `.webp` |
| Quadri di schermo vivo | `cd_quadri.jpg` | 4.4 K | `covers/quadri-di-schermo-vivo.jpg` + `.webp` |
| Colazione con la Pietra | `cd_colaz.jpg` | 15 K | `covers/colazione-con-la-pietra.jpg` + `.webp` |
| La Via Negativa | `cd_vianeg.jpg` | 22 K | `covers/la-via-negativa.jpg` + `.webp` |
| Shadows / Ombre | `cd_shadows.jpg` | 17 K | `covers/shadows-ombre.jpg` + `.webp` |
| Restituzioni | `cd_restituzioni.jpg` | 14 K | `covers/restituzioni.jpg` + `.webp` |
| Carne Capitata | `cd_carnecap.jpg` | 20 K | `covers/carne-capitata.jpg` + `.webp` |
| On Zarathustra | `cd_zara.jpg` | 2.1 K | `covers/on-zarathustra.jpg` + `.webp` |

Keep the 8 small GIF thumbnails (`ciclisibt.gif`, `quadri.gif`, …) only if the design needs a 1-bit/8-bit texture; otherwise discard.

### 2.2 Identity and chrome (≈ 200 KB)

- `Assets/immagini/mainBackground.gif`, `sfondo.gif`, `strip.gif`, `stripe.gif`, `t_empty.gif`, `titolo curriculum.png` — inspect, keep at most 3.
- `Assets/immagini/about/cv*.gif` — 14 tiny name plates; useful as *reference* for the old typographic look, not as UI assets.
- `icons/*.png` — 75 files / 308 KB. Keep ≤ 10 that are actually used; recreate the rest as SVG.
- `favicon.ico` — derive from the old logo, regenerate at 32/180/512.

### 2.3 Project/event thumbnails (≈ 1.5 MB)

Only for pages that will exist at launch. Suggested cap: **40 images**, each resized to 1200 px max and encoded to AVIF/WebP at quality ~60 (typically 60–120 KB each). Pick from `Assets/immagini/events/*.gif` and the strongest `events/*/01.jpg`.

### 2.4 Explicitly **not** in `/public`

- `Assets/immagini/about/*.gif` full set (legacy nav).
- `Assets/immagini/downloads/*.gif` (old CD thumbnails) beyond the 8 above.
- `GSLI_img/` in its entirety (158 MB, separate project).
- `icons/` full set, `images/*.asp`, `timet new/assets`, `timet_test/assets`.

---

## 3. Object storage — buckets and prefixes

Use one bucket per environment, three prefixes:

```
s3://timet-media-prod/
  audio/       # 829 mp3, ~3.53 GB originals
  video/       # 19 mov, ~111 MB
  archives/    # 7 tar, ~66 MB (cold)
  images/      # gallery jpg, ~132 MB (full-size originals)
  documents/   # 21 pdf, ~16.7 MB
  legacy/      # optional: mdbs, doc, swf for provenance (never public)
```

### 3.1 `audio/` — the 3.5 GB problem

Source folders and their role:

| backup folder | files | size | what it is |
|---|---:|---:|---|
| `database/` | 449 | 1.3 G | the "open database" sample library (per-musician, per-year, per-source) |
| `mp3/` | 141 | 793 M | per-release listening copies + 7 tar stems |
| `downloads/mp3/` | 124 | 564 M | downloadable release tracks |
| `tracks/` | 35 | 398 M | `zara/cd_1..3`, `easy_classics/cd_1..2`, `old/` |
| `modular/` | 40 | ~40 M | project excerpts |
| `guest/` | 20 | ~20 M | guest-composer tracks |
| `Compilazione/` | 19 | 87 M | duplicate of `Compilatione` |
| `stream/` | — | — | XML playlists only (`.swf` players discarded) |

**There is heavy duplication.** `CiclidiSintesi` appears in `mp3/`, `downloads/mp3/`, `database/`, and as `stream` playlist entries. Before upload:

1. Hash every file (`sha256`), group by hash.
2. Keep the highest-bitrate copy per hash; record all source paths in a manifest.
3. Keep the 7 `.tar` stems only in `archives/` (cold) — they are ~66 MB and are not web deliverables.
4. Store originals untouched in `audio/originals/`, then publish a web derivative in `audio/stream/` (AAC/Opus, 128–192 kbps) and, where licensing allows (EFF Open Audio License v1.0.1 on `Compilatione`), a download copy in `audio/download/`.

Do not commit audio to git. Do not use Git LFS for 3.5 GB; use the bucket + a manifest committed to the repo.

### 3.2 `images/`

- `events/` — 287 JPGs / 125 MB total folder. Keep the ~40 images used in the event pages; the rest go to `images/events-originals/`.
- `modular/galleria/` — 74 JPGs. Gallery-only; object storage.
- `GSLI_img/` — 158 MB of GSLI project images + 11 MOVs. **Out of scope for the Timet rebuild**; archive whole folder.
- Every published image gets: original in `images/originals/<slug>/`, derivative in `/public` or CDN (`images/derived/<slug>/<width>.avif`).

### 3.3 `documents/`

21 PDFs (16.7 MB): 2 articles (190 K, 144 K), event flyers, GSLI catalogues. Publish the 2 article PDFs as downloads; keep the rest in `documents/` and link only if a page references them.

### 3.4 `archives/` and `legacy/`

- `archives/`: the 7 `.tar` (66 MB), `.mdb` backups (1.7 MB), `.doc` (0.5 MB).
- `legacy/`: optional frozen copy of the original HTML/ASP for provenance — **excluding** `public/*.php`, `cgi-bin/index.php`, `events/index.php`, `web.w2c9FXxrH.php`, `web_wc096.php`. If in doubt, exclude the whole `public/` and `cgi-bin/`.

---

## 4. CDN / delivery configuration

- Set long cache (`max-age=31536000, immutable`) on hashed derivatives.
- Serve audio with HTTP Range support; do **not** proxy MP3s through the app server.
- Signed URLs only for anything not intended as a public download.
- Keep the origin bucket private; publish through a CDN distribution.
- For audio previews use 30–60 s clips in `/public` (≤ 500 KB each) or stream from the bucket; the full 3.5 GB is not a first-paint concern.

---

## 5. Migration order

1. **Freeze and scan** the backup. Quarantine `public/`, `cgi-bin/`, `events/index.php`. Never run PHP.
2. **Extract text** (already done: `content/`).
3. **Copy 8 covers + logo + selected thumbnails** into `/public`.
4. **Dedupe audio by hash**, write `content/media-manifest.json` entries to `audio/manifest.json` with `sha256`, `sourcePaths`, `bytes`, `bitrate`.
5. **Upload** audio/video/images/documents to the bucket; keep the repo free of binaries.
6. **Rewrite** every media reference through a single `assetUrl()` helper so the bucket/CDN base is one env var.
7. **Verify**: no file ≥ 2 MB in `/public`; no `.asp`, `.mdb`, `.swf`, `.tar` anywhere in the deploy artefact; no `nike` string in any built page; no `eval`, `base64_decode`, `fopen(...'w')` in the repo.

---

## 6. Budget summary

| destination | files | size |
|---|---:|---:|
| `/public` (derivatives only) | ~70 | **≤ 5 MB** (target ~2.4 MB) |
| object storage `audio/` | ~829 originals + derivatives | ~3.5 GB |
| object storage `video/` | 19 | ~111 MB |
| object storage `images/` | ~400 selected originals | ~130 MB |
| object storage `archives/` | 7 tar + 7 mdb + 4 doc | ~68 MB |
| object storage `documents/` | 21 | ~17 MB |
| discarded | ~1 400 (swf, asp, php, gif chrome, dupes, junk) | ~30 MB |
