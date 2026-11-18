# GO-LIVE — Option A

**timet.org on Vercel, media on Aruba (`media.timet.org`), Aruba hosting kept for the paid year.**

Do the steps in order. Do not delete the old site until step 6 passes.

---

## 1. Media on Aruba

1. In the Aruba control panel, create the subdomain **`media.timet.org`**.
2. Enable SSL for it (Let's Encrypt / AutoSSL in the panel).
3. Upload:
   - `deploy/aruba-media/audio/objects/*.mp3` → `media.timet.org/audio/objects/`
   - `.htaccess` **or** `web.config` (matching the hosting type) → `media.timet.org/audio/`
4. Test:

```bash
curl -I https://media.timet.org/audio/objects/obj-0005.mp3
curl -I -H "Origin: https://timet.org" https://media.timet.org/audio/objects/obj-0005.mp3
```

Required: `200`, `Accept-Ranges: bytes`, `Access-Control-Allow-Origin: *`.

If CORS is missing:

- Linux/Apache → the `.htaccess` file is in the wrong folder or `mod_headers` is off.
- Windows/IIS → use `web.config`; IIS static content already supports Range.

---

## 2. Vercel

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Environment variable, for Production, Preview and Development:

```
NEXT_PUBLIC_AUDIO_BASE=https://media.timet.org/audio
```

4. Deploy. Confirm the `*.vercel.app` build works.
5. Add domains in Vercel:
   - `timet.org`
   - `www.timet.org`
   Set the apex as primary; redirect `www` to the apex.

Do **not** add `media.timet.org` to Vercel. It must stay on Aruba.

---

## 3. Aruba DNS — keep the Aruba DNS zone

Do **not** switch nameservers to Vercel, otherwise `media.timet.org` would have to
be recreated in Vercel DNS. Keep Aruba DNS and change only these records:

```
A     @       76.76.21.21
CNAME www     cname.vercel-dns.com
CNAME media   <Aruba hostname shown in the panel>
```

If the Aruba panel gives an IP instead of a hostname for the subdomain, use an
`A` record with that IP.

Before editing, screenshot the existing zone, including TXT and any Search
Console verification records.

---

## 4. Verify

```bash
curl -I https://timet.org
curl -I https://www.timet.org
curl -I https://media.timet.org/audio/objects/obj-0005.mp3
```

Then:

```bash
BASE_URL=https://timet.org npm run check:links
```

Manual checks:

- `/open-database` → play `obj-0005` … `obj-0008`.
- `/releases` → the four previews on `obj-0001` … `obj-0004` still play from Vercel.
- `/releases/[slug]` → Bandcamp links open.
- `/archive` → paper register renders.
- Legacy URLs: `/index.asp`, `/contacts.htm`, `/downloads/cicli.htm`,
  `/database/index.asp` → 308 to the new pages.
- `/open-database/licence` and `/full`.

Open the site on desktop and mobile.

---

## 5. Old site on Aruba

The old site no longer answers on `timet.org`, but it may still be reachable from
the Aruba temporary URL. Do not leave the compromised PHP online:

- remove `public/*.php`, `cgi-bin/index.php`, `events/index.php`;
- disable PHP if the panel allows it;
- keep only static files if you want a reference copy;
- or put the old site behind HTTP authentication.

Keep the hosting plan active: it is the media origin for the paid year.

---

## 6. Rollback

If verification fails, point `A @` back to the old Aruba IP and `www` back to the
old Aruba hostname. The old site is still intact; DNS is the only switch.

Do not cancel Aruba before the new site has run for a stable period.

---

## 7. After the paid year

Two choices:

1. Renew Aruba and keep `media.timet.org` as the media origin.
2. Move `audio/` and `images/` to Cloudflare R2, Backblaze B2 or Bunny, then change
   only `NEXT_PUBLIC_AUDIO_BASE` in Vercel. No code change.

Bandcamp remains the album player in both cases.
