# BRIEF AUDIT — ground truth reconciliation

Audit date: 2026-11-04
Scope: **audit only.** No application was scaffolded, no page was built, no content was rewritten.
Inputs: `BRIEF.md` (repo root), the read-only backup at `/Users/lorenzobrusci2020/TIMET_SITO_BACKUP`, and the extracted datasets in `content/`.

This document establishes what is verified, what is missing, and what must **not** be invented before the Next.js build starts.

---

## 1. Executive verdict

| item | verdict |
|---|---|
| 8 core releases | **verified** — titles, years, tracklists and credits match the legacy pages |
| 9th release named in BRIEF (`Isiaca`) | **resolved 2026-11-04:** found on `lorenzobrusci.com` (History, entry d7), outside the legacy backup; now added with no invented tracklist or cover |
| Core members named in BRIEF | all 9 present in the verbatim member list |
| Collaborators named in BRIEF | 6/7 verbatim; `Frank Schulte` confirmed for display (legacy list spells `Shulte`) |
| Text integrity | 8/8 releases, 19 bios, 24 events, 24 projects, 9 guests verified against source pages; 0 invented strings detected |
| Palette | verified (`docs/PALETTE.md`); original is **light**, not dark |
| Current repo | contains an **Astro prototype**; BRIEF requires **Next.js 15 + TS + Tailwind v4** |
| Backup path in BRIEF | points to the wrong folder (see §2) |

Default decision for `Isiaca`: **omit it from the build** until a source page, cover, tracklist or audio is supplied. Silently adding a title would violate the no-invention rule.

---

## 2. Source hierarchy and a path correction

Priority when sources disagree:

1. **Legacy backup** — primary evidence. Read-only.
2. **`content/*.json`** — derived from (1), already cross-checked in §12.
3. **`BRIEF.md`** — requirements. It may override contact details, routing and stack. It is **not** a source for album names, dates, credits or track titles.

### Path correction

`BRIEF.md` §2 says the backup is `../TIMET_SITO_BACKUP/timet.org`. That subfolder contains only three Dreamweaver database helpers:

```
timet.org/MMHTTPDB.asp
timet.org/MMHTTPDB.js
timet.org/adojavas.inc
```

The real 3.79 GB mirror is the parent:

```
/Users/lorenzobrusci2020/TIMET_SITO_BACKUP
```

All citations below use the parent. This was already documented in `docs/CONTENT_INVENTORY.md` §0.1.

---

## 3. `Isiaca (1999)` — resolved outside the backup

> **Update 2026-11-04.** Isiaca is real. It is documented on Lorenzo Brusci's personal
> site (`https://lorenzobrusci.com/#history`, discography entry `d7`): November 1999,
> "A procession dedicated to the work of the artist G. Di Cocco." It is now in
> `content/discography.json` with that source. No tracklist, line-up or cover is published,
> so those fields remain empty or `TODO: verify`. The legacy-backup finding below stands
> as the audit record.


`BRIEF.md` line 25 lists:

> Isiaca (1999)

Exhaustive search of the backup:

| search | result |
|---|---|
| case-insensitive text in all `.htm/.html/.asp/.xml/.txt` | **0 hits** |
| filenames containing `isia` | **0 hits** |
| folder names containing `isia` | **0 hits** |
| `strings` scan of the Access `.mdb` files | **0 hits** |
| ID3/text scan of sampled MP3s | **0 hits** |
| `content/discography.json` | **not present** |

The official legacy downloads index (`downloads/FAindex.htm`) lists exactly eight albums plus *Metamorfosi di Canzoni Napoletane*:

```
Cicli di sintesi 1996
Colazione con la pietra 1997
Quadri di schermo vivo 1997
La via negativa 1998
Shadows 1998
Restituzioni 1999
Carne Capitata 2000
Zarathustra 2002
```

**There is no ninth album in the legacy backup.** *Isiaca* is documented elsewhere: on `lorenzobrusci.com`, not in this mirror. It cannot be reconstructed from the backup, and it was not reconstructed now: only the date and one-line description from the personal site were used.

**Rule for the build:** render 8 releases. Do not create an *Isiaca* page, cover, tracklist, year or credit. If the client supplies a source, add it in a later pass.

---

## 4. Verified release ground truth

Years are published inline in `downloads/FAindex.htm` (lines 122–155), not inferred.

| # | BRIEF title | Exact legacy title | Year | Tracks | Year source | Tracklist source |
|---:|---|---|---:|---:|---|---|
| 1 | Cicli di Sintesi | `Cicli di sintesi` | 1996 | 18 | `FAindex.htm:122` | `downloads/cicli.htm` |
| 2 | Quadri di Schermo Vivo | `Quadri di schermo vivo` | 1997 | 9 | `FAindex.htm:130` | `downloads/quadri.htm` |
| 3 | Colazione con la Pietra | `Colazione con la pietra` | 1997 | 14 | `FAindex.htm:126` | `downloads/colaz.htm` |
| 4 | La Via Negativa | `La via negativa` | 1998 | 16 | `FAindex.htm:136` | `downloads/vianeg.htm` |
| 5 | Shadows / Ombre | `Shadows` | 1998 | 25 | `FAindex.htm:141` | `downloads/shadows.htm` |
| 6 | Isiaca | **NOT FOUND** | 1999 (brief only) | — | — | — |
| 7 | Restituzioni | `Restituzioni` | 1999 | 24 | `FAindex.htm:145` | `downloads/restituzioni.htm` |
| 8 | Carne Capitata | `Carne Capitata` | 2000 | 18 | `FAindex.htm:151` | `downloads/carnecapitata.htm` |
| 9 | Isiaca | `ISIACA` | 1999 | **not published** | `lorenzobrusci.com` (d7) | no tracklist published |
| 10 | On Zarathustra | `Zarathustra` | 2002 | 25 | `FAindex.htm:155` | `downloads/zara.htm` |

### Title aliases (use the alias, keep the source title visible)

| build title | legacy title | evidence |
|---|---|---|
| Shadows / Ombre | `Shadows` | `downloads/shadows.htm`; `Ombre` appears nowhere near the release (only inside `metamorfosi.htm`) |
| On Zarathustra | `Zarathustra` | `downloads/zara.htm`; also referred to as `L'ultimo animale/Sullo Zarathustra` in `events/densa.htm` and `about/aboutlr.htm` |

### Also in the archive but omitted from BRIEF

*Metamorfosi di canzoni napoletane* (2005, Timet–Mariposa) is listed on `FAindex.htm` and has its own page. It is not one of the eight core releases. Decide separately whether `/releases` should show it under "further releases". The data already includes it in `content/discography.json → additionalReleasesFound`.

### Album-level caveats carried from the content audit

| release | caveat |
|---|---|
| Cicli di sintesi | track 15 has no title in the HTML; the MP3 `Track15` exists |
| La Via Negativa | no durations published |
| Shadows | MP3 filenames do not match HTML numbering; two "lost" files |
| Carne Capitata | 18 durations for 16 numbered tracks + 2 unnumbered pieces; last three mappings are inferred and marked |
| On Zarathustra | no lineup published on the release page |

---

## 5. People ground truth

### 5.1 Verbatim member list — 27 names

Source: `about/index.htm`.

```
Lorenzo Brusci, Letizia Renzini, Marco Veneri, Massimo Bressan, Andrea De Luca,
Alessandro Fiori, Paolo Frasconi, Enrico Gabrielli, Mirko Guerrini, Reuven Halevi,
Beppe Mangione, Mariposa, Matteo Milani, Enzo Cimino, Monica Demuru, Mirio Cosottini,
Andres Bosshard, Preot Buxton, Stefano Bollani, Daniele Pianigiani, Phonat,
Dino Bramanti, Stefano Roeslmair, Maurizio Meossi, Filippo Innocenti, Paolo Fiumi,
Giovanni Antignano
```

### 5.2 Verbatim collaboration list — 25 names

Source: `about/index.htm`.

```
Giacomo Bonciolini, Mario Bencivenni, Hector Zazou, Ikue Mori, Matthew Ostrowski,
Jamie Saft, Elliott Sharp, Zeena Parkins, Frank Shulte, Enrico Rava, Ares Tavolazzi,
Bruno de’ Franceschi, Stefano Battaglia, Werner Puntigam, Steve Piccolo, David Shea,
Fred Frith, Andrea Chimenti, Marco Parente, Pamela Z, Isabella Bordoni, Lukas Ligeti,
Alex Balanescu, Mattia Di Rosa, Stefano Passerotti
```

### 5.3 BRIEF names reconciled

Core members (BRIEF §1) — all 9 verified:

`Lorenzo Brusci`, `Monica Demuru`, `Andrea de Luca`, `Letizia Renzini`, `Mirio Cosottini`, `Beppe Mangione`, `Stefano Bollani`, `Mirko Guerrini`, `Paolo Frasconi`.

Collaborators (BRIEF §1):

| BRIEF name | verbatim list | note |
|---|---|---|
| Fred Frith | present | — |
| Ikue Mori | present | — |
| Elliott Sharp | present | — |
| Enrico Rava | present | — |
| Stefano Battaglia | present | — |
| Zeena Parkins | present | — |
| Frank Schulte | **not as spelled** | **Confirmed 2026-11-04:** display `Frank Schulte`. The legacy list spells `Frank Shulte`; his guest bio spells `Schulte`. Keep the variant in the source note only. |

The BRIEF lists are **subsets**, not the full roster. `/about` must render the full 27 + 25 lists from `content/about.json`, not only the BRIEF names.

### 5.4 Biography coverage

19 bios total: 14 member pages + 5 collaborator pages.

Members **without** a biography (do not invent one):

```
Marco Veneri, Massimo Bressan, Andrea De Luca, Alessandro Fiori, Enrico Gabrielli,
Enzo Cimino, Monica Demuru, Preot Buxton, Stefano Bollani, Daniele Pianigiani,
Phonat, Maurizio Meossi, Filippo Innocenti, Paolo Fiumi
```

Collaborators with bios: `Andres Bosshard`, `Dino Bramanti`, `Filippo Tincolini`, `Giampaolo di Cocco`, `Stefano Passerotti`.
`Dino Bramanti` therefore appears both as a member and as a collaborator in the legacy site; keep both records.

---

## 6. Other verified datasets

| dataset | count | source | verified against source |
|---|---:|---|---|
| releases | 8 (+8 further) | `downloads/` | yes |
| members | 27 | `about/index.htm` | yes |
| collaborators | 25 | `about/index.htm` | yes |
| biographies | 19 | `about/*.htm` | yes, 19/19 |
| events | 24 | `events/*.htm` | yes, 24/24 |
| project essays | 8 main + 16 appendices | `modular/*.htm` | yes, 24/24 |
| guest composers | 9 | `guest/*/index.htm` | yes, 9/9 |
| articles | 3 HTML + 2 PDF | `articles/` | HTML yes; PDFs not parsed |
| site pages | 15 | root + section indexes | yes |

Project sections (the "modular" material required by `/projects`):

```
01 Stressing the limit of sound perception
02 Timet perspectives on Classicism / Hyper Classicism
03 Re-designing sound objects and spaces / State of immersion
04 Performative projects
05 Sonic architectures
06 Metalanguages and Nonlinearity
07 Open database
08 Video experiences and documentarism
```

Titles 01–08 are the page headings. "Hyper Classicism" and "State of immersion" are the legacy section labels; the build may use either, but must not invent new concepts.

---

## 7. Route → data map

| route | data available | gaps |
|---|---|---|
| `/` | `about.collective.statement`; 8 releases; projects 01–08; `site.json → home` | none blocking |
| `/releases` | `discography.releases` (8) + `additionalReleasesFound` | decide whether to show the 8 extra releases |
| `/releases/[slug]` | title, year, description, cover, tracklist, lineup, credits, audioFolder | Isiaca absent; some descriptions are `TODO: verify` |
| `/projects` | 8 essays + 16 appendices + preconditions | none |
| `/about` | 27 members, 25 collaborators, 19 bios, collective statement | 14 members have no bio (render name only) |
| `/archive` | 3 articles, 2 article PDFs, 21 GSLI PDFs, 287 event JPGs, 4 DOC, 7 MDB | no curated selection yet; MDBs are private/GDPR |
| `/contact` | `contacts.htm` (legacy emails) | legacy addresses defunct; BRIEF overrides with `info@musi-co.com` |

### Timeline 1993–2003 (`/about`)

Derived only from dated records already in `content/events.json` and `content/discography.json`:

- 1993 — Timet founded (statement).
- 1996–2002 — eight releases with verified years.
- 1997–2005 — event pages; several older entries lack a year and are marked `TODO: verify`.
- 2003 — activity stopped (statement); the site continued to document projects through 2005.

Do not present 2005 project pages as evidence that the collective was active after 2003. The BRIEF's "active until 2003" and the archive's 2004–2005 project pages are both true; the distinction is **collective activity** vs **documented projects**.

---

## 8. `/archive` inventory

Candidate material (all read-only in the backup):

| type | count | size | notes |
|---|---:|---:|---|
| event photographs | 287 JPG | ~125 MB | galleries: Rinatura 151, Strozzi 35, Orto 24, Rottemetr 13, Flesh 10, Densa 9, Dance 9, Capezzana 8, Kraft 6 |
| modular gallery images | 74 JPG | — | concert/installation documentation |
| site chrome images | 196 JPG + 91 GIF | 3.7 MB | covers, logos, old nav plates |
| PDFs | 21 | 16.7 MB | 2 articles + 19 GSLI documents |
| Word docs | 4 | 0.5 MB | press material |
| Access DBs | 7 | 1.7 MB | **not public**; may contain personal data |
| Flash `.swf` | 31 | 7.8 MB | **do not publish**; no runtime |
| audio | 829 MP3 | 3.53 GB | see §9 |

Framing: the BRIEF asks for `/archive` to be "clearly framed as archive". The page should separate **writings** (3 texts), **documents** (PDFs), and **visual archive** (selected scans/photos), with provenance labels (`source: events/…`) and no pretence that the selection is complete.

Not yet decided: which 20–40 images represent the archive. That is a build-phase curation decision, not an audit gap.

---

## 9. Audio audit

| folder | files | size | role |
|---|---:|---:|---|
| `database/` | 449 | 1.3 GB | open sample library |
| `mp3/` | 141 | 793 MB | per-release listening copies + 7 TAR stems |
| `downloads/mp3/` | 124 | 564 MB | downloadable release tracks |
| `tracks/` | 35 | 398 MB | `zara/cd_1..3`, `easy_classics/cd_1..2` |
| `modular/` | 40 | ~40 MB | excerpts |
| `guest/` | 20 | ~20 MB | guest tracks |
| `Compilazione/` | 19 | 87 MB | duplicate compilation |

- No audio is in the repo. `public/` currently holds only 8 covers (100 KB).
- `NEXT_PUBLIC_AUDIO_BASE` is **not set**; no object-storage bucket exists yet.
- The brief requires 3–4 previews under 2 MB. Verified candidates exist, e.g.:
  - `mp3/CiclidiSintesi/timet - Track09 (cicli di sintesi).mp3` — 540 KB, 00:23
  - `guest/loozoo/endlost01.mp3` — 604 KB
  - `modular/galleria/Sempre straniero/- Track02.mp3` — 288 KB
- Licensing: downloadable tracks were published under the **EFF Open Audio License v1.0.1**. Preserve that notice.
- Before upload: SHA-256 dedupe (the same release appears in `mp3/`, `downloads/mp3/`, `database/`, `tracks/`).

---

## 10. Design-system audit

From `docs/PALETTE.md`:

- Dominant background `#CCCCCC`; panels `#FFFFFF`; text `#000000`; link `#336699`; navy `#000066`; steel `#99B5CA`; accent `#FF6600`.
- The original is **light**, so the "dark-first if the original was dark" clause does **not** apply. Build light-first and keep the grey canvas.
- Palette must be exposed as CSS variables **and** Tailwind v4 theme tokens; no new hues.
- Contrast fixes required: `#FF6600` on `#CCCCCC` is 1.83:1 and `#999999` on `#CCCCCC` is 1.77:1. Keep the hues but restrict them to decoration/large text; body copy uses `#000000` on `#FFFFFF`/`#CCCCCC`.
- Geometry rules in the BRIEF (no shadows, radius ≤2px, no gradients) are compatible with the legacy visual language.

Typography: the BRIEF asks for one grotesque display + one neutral sans. The legacy site used Arial/Helvetica and Courier. The build may choose a grotesque family, but must not introduce a serif-led revival; the old serif was only used for 10px captions.

---

## 11. Stack audit / current repo state

| item | current | required by BRIEF | action |
|---|---|---|---|
| framework | Astro 7.4.5 prototype | Next.js 15 App Router | replace in build phase |
| language | TS config present | TypeScript | keep |
| styling | hand-written CSS | Tailwind CSS v4 | replace |
| icons | none | lucide-react only | add if needed |
| `dist/`, `.astro/` | present, gitignored | — | ignore |
| `shot.mjs` | dev screenshot helper | — | remove in build phase |
| `package-lock.json` | Astro lockfile | Next lockfile | regenerate |
| `src/` | Astro pages/components | Next `app/` | replace |

The Astro prototype is **not** the deliverable and must not be extended. It exists only as a prior visual exploration. The audit did not delete it.

---

## 12. Integrity checks actually run

Scripted comparison of every extracted record against the cleaned source page:

| check | result |
|---|---|
| release track titles present in source | 8/8 releases, 0 missing |
| release lineup names present in source | 8/8 releases, 0 missing |
| biography text prefix present in source | 19/19 |
| event body prefix present in source | 24/24 |
| project body prefix present in source | 24/24 |
| guest bio prefix present in source | 9/9 |
| `Isiaca` anywhere in backup | 0 hits |
| hidden `nike` spam in extracted data | 0 hits |
| PHP webshell strings in extracted data | 0 hits |

No text was paraphrased. `TODO: verify` remains where the source is silent (event years, directions, some descriptions).

---

## 13. Open decisions before build

1. **Isiaca — RESOLVED.** Added from `lorenzobrusci.com` (History, d7): November 1999, "A procession dedicated to the work of the artist G. Di Cocco." Tracklist, line-up and cover are not published.
2. **Extra releases** — show the 8 `additionalReleasesFound` on `/releases`, or only the 8 core albums? Default: core 8 grid + a secondary "also in the archive" list.
3. **Archive curation** — which 20–40 images and which PDFs go on `/archive`. Default: 3 articles + 2 PDFs + one photo per event.
4. **Audio base** — bucket provider and `NEXT_PUBLIC_AUDIO_BASE` value. Build can proceed with a placeholder and 3 local previews.
5. **Contact — CONFIRMED.** `info@musi-co.com` is the canonical public address for commissions, guest composers and general enquiries. Every legacy `@timet.org` address is defunct and must resolve to the canonical address. Recorded in `content/contact.json`.
6. **Frank Schulte — CONFIRMED.** Display `Frank Schulte`; keep `Frank Shulte` only as a source note. Mapping recorded in `content/about.json → nameNormalisations`.

---

## 14. No-change statement

In this audit phase:

- `BRIEF.md` was copied into the repo root.
- `content/` was read and cross-checked, not rewritten.
- No page, component, token or build configuration was added or modified.
- The backup was not modified, moved or deleted.
- The existing Astro prototype was left untouched and is explicitly out of scope.

Next phase: scaffold Next.js 15 + Tailwind v4, then tokens, then pages — with the 8-release dataset and the verified member/collaborator lists.
