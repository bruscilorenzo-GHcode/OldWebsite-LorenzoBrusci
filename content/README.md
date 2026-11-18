# content/ — extracted legacy text

These files are the machine-readable output of the audit of `/Users/lorenzobrusci2020/TIMET_SITO_BACKUP`.
They are **input for the rebuild**, not deployable UI.

## Rules applied

- Text is copied from the source pages **verbatim**. Wording, spelling, accents and original Italian/English mix are preserved.
- Inline site chrome (`timet.about us`, `<home`, `<back`, `// Last update::`) is stripped from `bodyText`.
- Hidden injected SEO spam (`<div style="position:absolute;top:-888em…nike…">`) is removed and recorded in `docs/CONTENT_INVENTORY.md`.
- Unknown values are `"TODO: verify"`. Nothing was guessed or paraphrased.
- Whitespace is normalised (runs of spaces/newlines collapsed); punctuation and glyphs are unchanged.

## Files

| file | contents |
|---|---|
| `discography.json` | 8 requested releases (full tracklists, durations, lineups, credits, covers, audio folders) + 8 additional releases found in `downloads/` |
| `about.json` | collective statement, verbatim member and collaborator name lists, 19 biographies |
| `guest-composers.json` | 9 guest-composer bios with the month/year published on the site |
| `events.json` | 24 event/project pages with verbatim body text, type, dateText, year, location |
| `projects.json` | 24 "Deepening Timet" project pages, including the "Pre-conditions" essay |
| `articles.json` | 3 full interview texts + 2 PDF records |
| `site.json` | 15 root/section pages: home, old home, news archive, contacts, licences, links, sitemap, newsletter, etc. |
| `media-manifest.json` | complete per-folder census (files, bytes, extensions) and every file ≥ 2 MB |
| `pages/` | 250 raw text dumps, one per source `.htm`/`.html`; each starts with `SOURCE: <path>` |

## Known gaps and anomalies

- `discography.json → cicli-di-sintesi`: track 15 has no title in the source; the MP3 `Track15` exists.
- `discography.json → carne-capitata`: 18 durations for 16 numbered tracks + 2 unnumbered pieces; the last three assignments are marked inferred.
- `discography.json → la-via-negativa`: no durations published.
- `discography.json → shadows-ombre`: MP3 filenames do not match HTML track numbering; two different "lost" files exist.
- Year conflicts: *Colazione con la Pietra* 1997 (index) vs 1998 (Mangione bio); *Carne Capitata* 2000 (index) vs 2001 (Mangione bio).
- `guest-composers.json`: index says James Wyness `jul 2004`, his page says `jan 2004`; index spells "frank schulte", bio spells "Frank Schulte".
- `about.json`: Dino Bramanti has both a member page and a collaborator page; both are kept.
- `about.json`: the site's member list includes people with no biography (Marco Veneri, Massimo Bressan, Alessandro Fiori, Enrico Gabrielli, Enzo Cimino, Monica Demuru, Stefano Bollani, Daniele Pianigiani, Phonat, Maurizio Meossi, Filippo Innocenti, Paolo Fiumi). They are listed by name only; no text was invented.
- `events.json`: several older events have no explicit year on the page; those fields are `TODO: verify`.
- `site.json → home-old`: contains Classic ASP edit-operation code; use only the editorial copy.
- `articles.json`: the two PDFs were not parsed in this phase.

## Security

Do not copy anything from `public/`, `cgi-bin/`, `events/index.php`, or the hidden spam blocks into the rebuild. See `docs/CONTENT_INVENTORY.md` §0.2.
