# PALETTE — timet.org legacy colours

Method: every `.htm`, `.html`, `.css`, `.asp`, `.php`, `.js`, `.xml` under the backup root was scanned for hex literals, excluding `_vti_*` metadata. 459 text files scanned; 52 distinct values. Three-digit shorthand (`#fff`, `#000`, `#ccc`, `#150`, …) was recorded separately and expanded only where it is a genuine design colour.

No hue has been modernised, shifted or desaturated. The tokens below map the old values onto roles; they do not replace them.

---

## 1. Ranked hex list (6-digit literals, by frequency)

| # | hex | count | role in the old site |
|---:|---|---:|---|
| 1 | `#CCCCCC` | 1469 | **global page background**; table cells; the `bgcolor` of nearly every page |
| 2 | `#000000` | 1351 | body text; borders on dark tables |
| 3 | `#FFFFFF` | 1290 | content panels, `img` backgrounds, text on dark bars |
| 4 | `#666666` | 869 | secondary text, dark grey panel/header bars |
| 5 | `#999999` | 716 | mid grey: outer table borders, menu column, box frames |
| 6 | `#336699` | 534 | **primary link blue**; borders; `bgcolor` of header cells |
| 7 | `#E1E1E1` | 409 | list rows / alternating table background |
| 8 | `#333333` | 285 | body text in content areas, captions |
| 9 | `#006699` | 206 | link blue variant on white panels; table accents |
| 10 | `#EEEEEE` | 134 | light surface (scrollbars, boxes) |
| 11 | `#000066` | 120 | **deep navy**: menu bar, dark title cells |
| 12 | `#99B5CA` | 95 | **dusty steel blue**: title bands, table headers |
| 13 | `#FF6600` | 89 | **orange accent**: people/credits, event metadata |
| 14 | `#9FAFDF` | 89 | pale periwinkle — forum admin CSS only, not public design |
| 15 | `#4D5A6F` | 72 | **slate navy**: database header bars, dark panels |
| 16 | `#FF0000` | 56 | red: admin/form errors, old `gdc/text.css` titles |
| 17 | `#E5E5E5` | 48 | light grey surface |
| 18 | `#F5F5F5` | 35 | near-white surface |
| 19 | `#0066CC` | 30 | brighter link blue (secondary) |
| 20 | `#6666CC` | 20 | periwinkle link — test pages only |
| 21 | `#003399` | 13 | dark link blue |
| 22 | `#BADEB6` | 12 | pale green — event-page highlight (Ri.Natura) |
| 23 | `#111111` | 6 | near-black text |
| 24 | `#FF0033` | 5 | hot red (admin) |
| 25 | `#008000` | 5 | green (admin status) |
| 26 | `#800080` | 5 | purple (admin status) |
| 27 | `#000033` | 5 | near-black navy |
| 28 | `#003366` | 3 | navy variant |
| 29 | `#AFC2CD` | 2 | pale steel grey |
| 30 | `#FFCCCC` | 2 | pale pink (error background) |
| 31 | `#BBBBBB` | 2 | grey |
| 32 | `#191970` | 2 | midnight blue |
| 33 | `#114466` | 2 | dark teal |
| 34 | `#113333` | 2 | dark green-grey |
| 35 | `#6666FF` | 2 | periwinkle |
| 36 | `#BEC6D1` | 1 | pale grey-blue |
| 37 | `#0099CC` | 1 | cyan-blue (`css/testo.css` `.titolo`) |
| 38 | `#F5FFFA` | 1 | mint white |
| 39 | `#808000` | 1 | olive |
| 40 | `#008080` | 1 | teal |
| 41 | `#FF00FF` | 1 | magenta |
| 42 | `#004433` | 1 | dark green |
| 43 | `#112244` | 1 | navy |
| 44 | `#94B6C6` | 1 | steel blue |
| 45 | `#114477` | 1 | navy |
| 46 | `#114488` | 1 | navy |
| 47 | `#0700B6` | 1 | electric blue |
| 48 | `#008999` | 1 | teal |
| 49 | `#00848F` | 1 | teal |
| 50 | `#00424F` | 1 | dark teal |
| 51 | `#99CCFF` | 1 | pale blue |

### Three-digit shorthand (recorded separately, not merged)

`#150` ×17 (expands to `#115500`, a dark green used as a table accent in `Compilazione/index.html`), `#146` ×2, `#133` ×2, `#BAD` ×1, `#ADD` ×1, `#043` ×1, `#124` ×1, `#147` ×1, `#148` ×1.
Earlier scans that expanded shorthand produced a phantom `#115500` at rank 21; it is only `#150`. Treat shorthand as a secondary, hand-authored accent, not a system colour.

---

## 2. Where the core colours actually come from

| evidence | file |
|---|---|
| `body bgcolor="#CCCCCC" text="#000000"` on almost every page | `downloads/*.htm`, `database/*.asp`, `about/*.htm` |
| `.titolo { color:#FFFFFF; background:#0099CC }` | `css/testo.css` |
| `.ucase { color:#000000 }`, `.ucase_white_right { color:#ffffff }`, `.textnewswhite { color:#FFFFFF; background:#999999 }`, `.fondonero { background:#000000 }`, `.default { color:#333333 }` | `css/testo.css` |
| menu/header bands in `#000066`, `#4D5A6F`, `#666666`, `#99B5CA` | `downloads/database/index.HTM`, `database/index.asp` |
| links `#336699` / `#006699` | `downloads/index.htm`, `database/result*.asp` |
| `.events_people { color:#FF6600; font-style:italic }` | `downloads/database/index.HTM` |
| `.text { color:#000000 }`, `a { color:#6666CC }`, `.titolo { color:#FF0000 }` | `gdc/text.css` (admin) |

The public identity is therefore: **grey canvas + white panels + navy/steel-blue bands + one orange accent + one blue link colour.** Red, green, purple and periwinkle are admin/system UI, not identity.

---

## 3. Proposed semantic tokens (old hues preserved)

```css
:root {
  /* canvas */
  --bg:              #CCCCCC;  /* dominant page background (rank 1) */
  --surface:         #FFFFFF;  /* content panels (rank 3) */
  --surface-alt:     #E1E1E1;  /* alternating rows / list bands (rank 7) */
  --surface-soft:    #F5F5F5;  /* near-white panel (rank 18) */
  --surface-sunken:  #EEEEEE;  /* scrollbar / inset boxes (rank 10) */

  /* ink */
  --text:            #000000;  /* body copy (rank 2) */
  --text-secondary:  #333333;  /* captions, dense text (rank 8) */
  --muted:           #666666;  /* secondary labels (rank 4) */
  --muted-soft:      #999999;  /* decorative frames only — see contrast note */

  /* brand / navigation */
  --accent:          #336699;  /* primary link + band (rank 6) */
  --accent-strong:   #006699;  /* link on white (rank 9) */
  --accent-ink:      #000066;  /* deep navy menu (rank 11) */
  --accent-soft:     #99B5CA;  /* dusty steel-blue band (rank 12) */
  --accent-slate:    #4D5A6F;  /* slate navy panel (rank 15) */

  /* signal */
  --highlight:       #FF6600;  /* credits / people / event meta (rank 13) */
  --danger:          #FF0000;  /* errors only (rank 16) */

  /* structure */
  --border:          #999999;  /* visible 1px frame (rank 5) */
  --border-strong:   #666666;  /* heavier rule (rank 4) */
  --border-subtle:   #CCCCCC;  /* hairline on white (rank 1) */
}
```

### Mapping notes

- `--bg` and `--border-subtle` intentionally resolve to the same hex (`#CCCCCC`); the old site used one grey for both. Keep it as two tokens so a future theme can diverge them without changing markup.
- `--accent-soft` (`#99B5CA`) is the title-band colour, not a tint of `--accent`. It is a distinct hue from the `#336699` family and should not be generated with `color-mix()`.
- `--highlight` (`#FF6600`) is used for *typographic emphasis* (people, roles), never as a large fill on light grey.
- `#9FAFDF` is deliberately absent from tokens: it appears only in `forum/admin_mod_dbsetup*.asp` and `forum/setup*.asp`.

### Contrast audit (WCAG 2.1)

| pair | ratio | verdict |
|---|---:|---|
| `#000000` on `#CCCCCC` | 13.08:1 | AAA |
| `#000000` on `#FFFFFF` | 21.00:1 | AAA |
| `#333333` on `#FFFFFF` | 12.63:1 | AAA |
| `#666666` on `#FFFFFF` | 5.74:1 | AA (normal text) |
| `#666666` on `#CCCCCC` | 3.58:1 | **fails normal text**; large text only |
| `#336699` on `#FFFFFF` | 6.00:1 | AA / AAA large |
| `#336699` on `#CCCCCC` | 3.73:1 | **fails normal text**; large text only |
| `#FFFFFF` on `#336699` | 6.00:1 | AA |
| `#FFFFFF` on `#006699` | 6.25:1 | AA |
| `#FFFFFF` on `#000066` | 17.62:1 | AAA |
| `#FFFFFF` on `#4D5A6F` | 6.98:1 | AA |
| `#000000` on `#99B5CA` | 9.82:1 | AAA |
| `#FF6600` on `#FFFFFF` | 2.94:1 | **fails**; emphasis/decoration only |
| `#FF6600` on `#CCCCCC` | 1.83:1 | **fails**; decoration only |
| `#FF0000` on `#FFFFFF` | 4.00:1 | fails normal text; large/error only |
| `#999999` on `#CCCCCC` | 1.77:1 | **fails**; do not use for text |

The old site routinely set `#FF6600` and `#999999` on grey. Reproducing the *hues* is required; reproducing those *pairs for body text* is not. Rule for the rebuild: keep the hues, restrict `--highlight`, `--muted-soft` and `--danger` to non-essential or large text, and set body copy in `--text` on `--surface`.

---

## 4. Typography observed (not a palette, but part of the same visual system)

| stack | sizes | where |
|---|---|---|
| `Arial, Helvetica, sans-serif` | 9–14 px | body, titles, nav |
| `"Courier New", Courier, mono` | 11 px | menus, tracklists, labels, uppercase nav |
| `Georgia, "Times New Roman", Times, serif` | 10 px | `.default` text |
| `Verdana, Arial, Helvetica, sans-serif` | 9 px | `gdc/text.css` admin |

No web fonts, no gradients, no border-radius, no shadows. Layout is `table` + `cellspacing=3` + 1 px borders. The optical signature is: dense 11 px Courier uppercase labels against 3 px grey gutters, with colour used as a *banding* device (navy bar → steel-blue title → white content) rather than as a modern accent system.

---

## 5. Files to use as visual reference only

- `css/testo.css` — the only public stylesheet, 8 rules.
- `gdc/text.css` — admin stylesheet; contains `#FF0000` and `#6666CC` that are **not** public identity.
- `downloads/database/index.HTM` — inline CSS with the clearest public token usage (`latest_text_link #336699`, `events_people #FF6600`, `text_news #FFFFFF on #999999`).
- `database/index.asp` and `database/result*.asp` — the `#99B5CA` / `#4D5A6F` band system.

All `.css`/`.htm` files must be copied, not linked, because the originals contain injected spam and ASP includes.
