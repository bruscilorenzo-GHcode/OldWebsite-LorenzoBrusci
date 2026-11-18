# timet.org archive

Preserved material from **timet.org** (Timet, Lorenzo Brusci, 1993–2000s): a sample database,
texts, interviews and project pages from the original website.

- `dataset/` — **timet.database**: 543 audio samples/elaborations with metadata (CSV + SQLite).
  Field dictionary below.
- `texts/` — pages of the old site converted to Markdown (about, articles and interviews, events,
  downloads, guest composers, modular projects). Original path in each file's `source:` field.
- `scripts/` — the scripts used for extraction and conversion.

Audio files are not in this repository (see `file` and `original_url` columns); they are archived
separately on the Internet Archive.

## Dataset fields
| field | meaning |
|---|---|
| id, order | record id; order within collection |
| year | year |
| sampled_musician | Sampled Musician |
| sampled_source_1 / _2 | Sampled Source (type / detail) |
| metaphor | Metaphor |
| timet_artwork | Timet Artwork |
| collection | original collection (vocalità, classica, db 1–3, …) |
| PP, CS, C | original codes, kept as-is (meaning to be confirmed) |
| file, original_url | audio file path in the site backup / old URL |

`-` = not specified.

## License
[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — credit *Lorenzo Brusci / timet.org*;
non-commercial use. See `LICENSE`.
