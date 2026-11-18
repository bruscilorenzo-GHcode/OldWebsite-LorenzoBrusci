# CONTENT INVENTORY — timet.org legacy backup

Audit date: 2026-11-04
Backup root audited: `/Users/lorenzobrusci2020/TIMET_SITO_BACKUP`
Declared path in brief: `/Users/lorenzobrusci2020/TIMET_SITO_BACKUP/timet.org`
New repo scaffold: `/Users/lorenzobrusci2020/Desktop/OldWebsite-LorenzoBrusci`
Nothing in the backup was modified, moved or deleted.

---

## 0. Critical findings (read first)

### 0.1 The site root is not the path given in the brief

`/Users/lorenzobrusci2020/TIMET_SITO_BACKUP/timet.org` contains **only 3 files** (40 KB):

| File | What it is |
|---|---|
| `MMHTTPDB.asp` | Dreamweaver/InterAKT dynamic-database helper |
| `MMHTTPDB.js` | same, client side |
| `adojavas.inc` | ADO JavaScript include |

The actual 3.8 GB site mirror is the **parent folder**, `/Users/lorenzobrusci2020/TIMET_SITO_BACKUP`. All findings below refer to the parent. The `timet.org/` subfolder is a Dreamweaver artefact and is discardable.

### 0.2 The backup contains a compromised server, not just a legacy site

These are live malicious files and must never be deployed, copied to `/public`, or committed to the new repo:

| Path | Evidence | Verdict |
|---|---|---|
| `public/web.w2c9FXxrH.php` | Obfuscated PHP dropper/writer: `fopen($f,'w')`, `chmod(...,0755)`, `touch()` backdating, `md5(USER_AGENT)` gate | **Malware — discard** |
| `public/web_wc096.php` | Obfuscated base64 payload, `gz*`/`base64_decode` chain | **Malware — discard** |
| `public/index.php`, `public/shop/index.php`, `public/qkpshop/index.php` | Fake `HTTP_404_Not_Found` / encoded payloads, shop spam | **Malware/spam — discard** |
| `cgi-bin/index.php` | Cloaking: serves scraped "nike" search pages to Googlebot, JS injection to Google referrers (`se.it-wordpress.com`) | **Spam cloaking — discard** |
| `events/index.php` | Exact copy of the `cgi-bin` cloaking script | **Spam cloaking — discard** |
| `public/qkpshop/sitemap.xml`, `public/shop/sitemap.xml` | 122 KB / 93 KB spam sitemaps | **Spam — discard** |

Hidden SEO spam is also injected into legitimate pages as
`<div style="position:absolute;top:-888em;z-index:-1"><ul><li><a href="/cgi-bin/?nike-2015=…">nike …</a></li>…</ul></div>`
(found in `index.html`, `about/index.htm`, `modular/index.htm`, `downloads/index.htm`, `guest/index.htm`, plus duplicates `index.htm_`, `index.html_`, `NUOVO1.html`). The extractor in this repo strips that block before producing text. **Do not trust the old `.html` files as deployable output.**

Recommendation: treat the backup as untrusted input. Never run its PHP. Re-host only text/images that were reviewed, under a fresh origin.

### 0.3 The "last updated" dates are inconsistent

Pages carry at least four different final-update stamps: 2004-02-29, 2004-03-29, 2004-04-06, 2004-10-30, 2013-10-30, 2014-10-23, 2014-11-02. The site was patched over a decade, so dates must be treated per-page, not site-wide.

---

## 1. Master inventory

Counts and sizes are from `find`/`du` on the backup. "Legacy" marks formats that cannot ship as-is (Classic ASP, Access, Flash, tar bundles, FP metadata).

| folder | files | size | what it is | classification |
|---|---:|---:|---|---|
| `about` | 20 | 320 K | 20 static `.htm` bios: collective index, 14 member CVs, 5 collaborator CVs | **keep as live content** (text → JSON; re-typeset) |
| `modular` | 227 | 348 M | 101 `.htm` project essays ("Deepening Timet"), 74 `.jpg`, 40 `.mp3`, 8 `.mov`, 2 `.swf`, galleries | **live content for text**; media **archive only**; `.swf` **discard** |
| `downloads` | 157 | 564 M | 24 `.htm` release pages + 124 `.mp3` + 1 `.xml` + 3 `.asp` + a `database/` subfolder | **live content** (text); audio → object storage; `.asp` **discard** |
| `database` | 455 | 1.3 G | 449 `.mp3` sample library + 6 `.asp` search interfaces (Classic ASP + Access) | **archive only** (audio); `.asp` **discard** |
| `guest` | 31 | 114 M | 10 `.htm` guest-composer pages + 20 `.mp3` + 1 `.pdf` | **live content** (text); audio → storage |
| `articles` | 6 | 468 K | 4 `.htm` interviews/essays + 2 `.pdf` | **live content** |
| `events` | 372 | 125 M | 24 main `.htm` event pages + gallery subfolders, 287 `.jpg`, 7 `.swf`, 3 `.pdf`, 1 `.php` (malicious) | **live content** (text + selected photos); `.swf` **discard**; `.php` **discard** |
| `images` | 2 | 8 K | 2 stray `.asp` (`Checkimg.asp`, `old1yw.asp`) | **discard** |
| `Assets` | 294 | 3.7 M | site chrome: 196 `.jpg`, 91 `.gif`, 3 `.htm`, 2 `.asp`; includes release covers under `immagini/downloads/` | **keep selected** (covers, logo, few nav graphics); `.asp` **discard** |
| `stream` | 40 | 648 K | 13 `.htm` + 13 Flash player `.swf` + 14 XML playlists | **.swf discard**; `.xml` **archive only** (track metadata) |
| `mp3` | 149 | 793 M | 141 `.mp3` + 7 `.tar` + 1 `.html`; per-release audio folders | **archive only** → external object storage |
| `tracks` | 36 | 398 M | 35 `.mp3` + `dwn.htm`; `zara/cd_1..3`, `easy_classics/cd_1..2`, `old/` | **archive only** → external object storage |
| `work file` | 1 | 4 K | `sonic.html` scratch file | **discard** |
| `timet new` | 34 | 172 K | abandoned redesign stub: 31 `.gif`, 2 `.db`, 1 `.asp` | **discard** (archive the 31 gifs only if wanted) |
| `timet_test` | 63 | 664 K | dev/test Classic ASP app (20 `.asp`, 34 `.gif`, `Connections/`, `mdb-database/`) | **discard** |
| `timet.org` | 3 | 40 K | Dreamweaver DB helpers (`MMHTTPDB.asp/.js`, `adojavas.inc`) | **discard** |
| `_notes` | 2 | 24 K | FrontPage site metadata XML (`Results.xml`, `dwSiteColumnsMe.xml`) | **discard** |
| `_private` | 0 | 0 | empty FrontPage folder | **discard** |
| `_vti_*` | 6 | — | `_vti_inf.html`, `_vti_log/`, `_vti_cnf/` FrontPage server extensions | **discard** |
| `cgi-bin` | 2 | 8 K | `index.php` (cloaking spam), `web.config` | **discard — security** |
| `aspnet_client` | 7 | 72 K | ASP.NET `WebResource.axd` / client validation scripts | **discard** |
| `public` | 16 | 3.5 M | Aruba document root: malware PHP, spam "shop"/"qkpshop", `403.html`, `423.html`, `_vti_cnf` | **discard — security** |
| `css` | 1 | 4 K | `testo.css` (only global stylesheet; palette source) | **archive only** (reference) |
| `gdc` | 5 | 44 K | 3 Classic ASP event editors + `text.css` | **discard** (keep `text.css` as palette reference) |
| `icons` | 75 | 308 K | 75 `.png` UI icons (FP/Windows style) | **keep selected** only; rest archive |
| `forum` | 219 | 3.2 M | Snitz Forum 2000 (94 `.asp`, 119 `.gif`, `snitz_forums_2000.mdb`) | **discard code**; **archive only** the `.mdb` if forum history is wanted |
| `Connections` | 6 | 24 K | Dreamweaver DB connection strings (Access paths, credentials) | **discard** |
| `Backup` | 1 | 16 K | `index 0206.htm` older homepage snapshot | **archive only** |
| `Compilazione` | 21 | 87 M | standalone "Com-pil-azione" page + 19 mp3 (duplicate of `Compilatione`) | **archive only** |
| `mdb-database` | 7 | 1.3 M | 5 Access `.mdb`: `member`, `news`, `newslett`, `dbtimetservice`, `snitz_forums_2000` | **archive only** (migration source) |
| `App_Data` | 1 | 4 K | `web.config` only | **discard** |
| `anti` | 1 | 12 K | `index.htm` (ANTI project page) | **archive only** |
| `GSLI_img` | — | 158 M | Giardino Sonoro / La Limonaia project: images, 8 Flash, 21 PDF, 11 MOV | **archive only** (separate GSLI project, not Timet core) |
| root files | 19 | — | see §2 | mixed |

Root total: **3.79 GB, 2 781 files.**

---

## 2. Root-level files

| file | what it is | verdict |
|---|---|---|
| `index.html` | current homepage; contains hidden nike spam | **keep text only**; rebuild |
| `index_old.asp` | earlier homepage, Classic ASP, same news | **archive only** |
| `index.htm_`, `index.html_` | byte-duplicates of the homepage/ASP saved with underscore | **discard** |
| `NUOVO1.html` | 34 KB homepage variant ("Tra Art" news block) | **archive only** |
| `archive.htm` | news archive, 2004 entries | **keep as live content** |
| `contacts.htm` | contact roles and emails | **keep as live content** |
| `licenses.htm` | EFF / GNU licence page (stub) | **keep as live content** |
| `links.htm` | outbound link list (27 names) | **keep as live content** (re-check URLs) |
| `sitemap.htm` | stub sitemap ("will soon be extended") | **keep as live content** |
| `thanks.htm` | newsletter thank-you page | **keep as live content** |
| `sonic.htm` | Giardino Sonoro / Limonaia event page + ASP insert code | **keep text**; strip ASP |
| `default.asp` | "Under Construction" | **discard** |
| `newsl.asp` | newsletter insert (Classic ASP + Access) | **discard code**; archive the form copy |
| `test.html` | 4-byte test file | **discard** |
| `postinfo.html` | FrontPage discussion metadata | **discard** |
| `pphlogger.js` | third-party PHP logger tracker | **discard** |
| `web.config` | ASP.NET temp-directory config pointing at `D:\AspnetTemp\site\timet.org` | **discard** |
| `_vti_inf.html` | FrontPage server extensions | **discard** |

---

## 3. Legacy-format register

### 3.1 Classic ASP — 141 files (all legacy)

| folder | count | notes |
|---|---:|---|
| `forum` | 94 | Snitz Forum 2000 application |
| `timet_test` | 20 | test CRUD app (`insert/update/delete/database/events/members/cv`) |
| `database` | 6 | `index.asp`, `result.asp`, `resultART.asp`, `resultSM.asp`, `resultSOURCE.asp`, `resultY.asp` |
| `Connections` | 6 | `timet*.asp` ADO connection includes |
| `gdc` | 3 | event editor |
| `downloads` | 3 | `database/maindbpage*.asp`, `selectmenu.asp` |
| `images` | 2 | `Checkimg.asp`, `old1yw.asp` |
| `Assets` | 2 | `news.asp`, `service.asp` |
| `timet.org` | 1 | `MMHTTPDB.asp` |
| `timet new` | 1 | `index.asp` |
| root | 4 | `default.asp`, `index_old.asp`, `newsl.asp`, `sonic.htm` (contains ASP) |

**None of these can run on a modern static/Next host.** They are data-extraction sources only.

### 3.2 Access databases — 7 files (all legacy)

| path | size | likely contents |
|---|---:|---|
| `mdb-database/member.mdb` | 192 K | member records |
| `mdb-database/news.mdb` | 204 K | news items |
| `mdb-database/newslett.mdb` | 140 K | newsletter subscribers |
| `mdb-database/dbtimetservice.mdb` | 376 K | service/contact records |
| `mdb-database/snitz_forums_2000.mdb` | 460 K | forum data |
| `forum/snitz_forums_2000.mdb` | 284 K | forum data (duplicate/second copy) |
| `timet_test/mdb-database/news.mdb` | 132 K | test copy |

Open read-only on macOS with LibreOffice/`mdb-tools`. **Do not publish** — may contain emails and personal data (GDPR).

### 3.3 Flash — 31 `.swf` (all legacy)

| folder | count | examples |
|---|---:|---|
| `stream` | 13 | `carne.swf`, `quadri.swf`, `z01–z03.swf`, `radiotimet.swf` — audio players |
| `GSLI_img/fla` + galleries | 8 | `holdworkshop.swf` (2.2 M), `holdberlino.swf` (1.8 M), `philosophy_words*.swf` |
| `events` | 7 | `pendolo0/1.swf`, `serpentina0/1.swf`, `strozzifl.swf`, `campi/photogallery.swf`, `random_sfondo.swf` |
| `modular` | 2 | `caleido.flowers.swf`, `vg1test.swf` |
| `downloads` | 1 | `metamorfosi.swf` |

No Flash runtime exists in modern browsers. **Discard all `.swf`.** The XML playlists in `stream/` are the only salvageable data.

### 3.4 Tar bundles — 7 files (all legacy)

All in `mp3/QuadriDiSchermoVivo/`, total ~65 MB: `consegnarsi.tar` (5.6 M), `notte.tar` (21 M), `restituzione.tar` (10 M), `altpop.tar` (8.9 M), `equilibrio.tar` (4.8 M), `dignita.tar` (10 M), `mani.tar` (5.1 M).
These are probably full-quality stems/multitrack archives. **Do not serve as web downloads**; move to cold storage and document.

### 3.5 Junk files

- `Thumbs.db` — 4 files: `timet new/assets/common/`, `timet new/assets/menu/`, `timet_test/assets/common/`, `timet_test/assets/menu/`. **Discard.**
- `.DS_Store` — 0 inside the tree (a `.DS_Store` exists one level above, at `~/`). **Discard if found.**
- Other OS junk: `.doc` files (4) are legacy Word docs, not junk: `downloads/New Timet Productions.doc`, `GSLI_img/docs/*.doc` (3).

---

## 4. What is actually worth keeping

### 4.1 Unique, non-recoverable text (highest value)

1. `about/*.htm` — 19 member/collaborator biographies, several in Italian only, written by the subjects. No other copy found.
2. `downloads/*.htm` — 8 core release pages with full tracklists, durations, composer credits and musician line-ups.
3. `guest/*/index.htm` — 9 guest-composer bios with month/year.
4. `modular/*.htm` — the "Deepening Timet" theoretical essays (nonlinear composition, hyper-classicism, sonic architecture, open database).
5. `articles/*.htm` — three long interviews: Klangturm (M. Bencivenni), UT (P. Davoli), Konsequenz (2002).
6. `events/*.htm` — 24 project/event descriptions 1997–2005, with collaborators and venues.
7. `contacts.htm`, `links.htm`, `licenses.htm`, `archive.htm`.

### 4.2 Duplicates and near-duplicates (dedupe before migration)

| content | copies |
|---|---|
| Homepage | `index.html`, `index_old.asp`, `NUOVO1.html`, `index.htm_`, `index.html_`, `Backup/index 0206.htm` |
| Compilatione | `downloads/compilatione.htm`, `downloads/compilazione.htm`, `Compilazione/index.html` (+ 19 duplicate mp3) |
| Cicli tracks | `downloads/cicli.htm` ↔ `mp3/CiclidiSintesi/*` ↔ `stream/cicli.xml` (no `cicli.xml`; stream uses `colazione/quadri/...`) |
| Zara audio | `stream/z01–z03.xml` ↔ `tracks/zara/cd_1..3` ↔ `database/…` |
| Quadri audio | `mp3/QuadriDiSchermoVivo/*.mp3` + `.tar` + `database/…` |
| Guest bios | `about/aboutdb.htm` ↔ `guest/db/index.htm` (Bramanti); `about/coab.htm` ↔ `guest/ab/index.htm` (Bosshard) |

### 4.3 Content that is explicitly "coming soon" (do not invent)

`sitemap.htm` and `licenses.htm` both say `[This section will soon be further extended] / [Questa sezione sarà presto ampliata]`. `downloads/index.htm` and `database/index.asp` contain only framing text, not a catalogue. These must be represented as stubs, not filled with invented copy.

---

## 5. Data-quality flags for the rebuild

| issue | where | handling |
|---|---|---|
| Track 15 of *Cicli di sintesi* has no title | `downloads/cicli.htm` | title `TODO: verify`; audio `Track15` exists |
| *Colazione con la Pietra* year is 1997 on `FAindex`, 1998 in Mangione bio | `downloads/FAindex.htm`, `about/aboutbm.htm` | keep both; `TODO: verify` |
| *Carne Capitata* year is 2000 on `FAindex`, 2001 in Mangione bio | same | keep both; `TODO: verify` |
| *Carne Capitata* has 18 durations for 16 numbered tracks + 2 unnumbered pieces | `downloads/carnecapitata.htm` | last three duration mappings marked inferred |
| *La Via Negativa* has no durations | `downloads/vianeg.htm` | all `TODO: verify` |
| *Shadows* has two different track-15/16 MP3s and a 17/18 combined file | `mp3/Shadows/` | flag, reconcile against CD |
| Guest index says James Wyness `jul 2004`, his page says `jan 2004` | `guest/index.htm` vs `guest/jw/index.htm` | `TODO: verify` |
| Guest index says "frank schulte"; page filename `fs`, bio spells `Frank Schulte` | `guest/index.htm` | normalise to page bio |
| `about/index.htm` member list includes people with no bio page (Veneri, Bressan, Fiori, Gabrielli, Cimino, Demuru, Bollani, etc.) | `about/index.htm` | list name only; no invented bio |
| Typo `Mangione1s` | `about/aboutbm.htm` | keep verbatim in source text; correct only in display copy with note |
| Emails exposed in plain text | `contacts.htm` | keep, but obfuscate on rebuild |
| Inconsistent Italian/English | throughout | keep original language per page; do not silently translate |
| `index.html` uses `nike` spam anchors | homepage | strip |

---

## 6. Extraction artefacts produced in this phase

```
content/pages/                250 verbatim text dumps, one per .htm/.html source
content/discography.json      8 requested releases + 8 additional releases found
content/about.json            collective statement, member/collaborator lists, 19 bios
content/guest-composers.json  9 guest bios
content/events.json           24 event pages with verbatim body text
content/projects.json         24 modular project pages incl. preconditions essay
content/articles.json         3 interview texts + 2 PDF stubs
content/site.json             15 root/section pages
content/media-manifest.json   full per-folder file/byte/extension census + all files >2 MB
```

`content/pages/*.txt` is the audit trail: every text claim in the JSON can be checked against it. Hidden spam blocks were removed; wording was not otherwise changed.
