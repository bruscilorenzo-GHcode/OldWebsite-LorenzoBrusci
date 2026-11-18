# Aruba media origin

This folder is the upload package for **Option A**: Vercel serves the frontend at
`timet.org`, Aruba serves the media at `media.timet.org`.

## What to upload

```
deploy/aruba-media/
  .htaccess              # Linux / Apache hosting
  web.config             # Windows / IIS hosting
  audio/objects/
    obj-0005.mp3
    obj-0006.mp3
    obj-0007.mp3
    obj-0008.mp3
```

Only one of `.htaccess` or `web.config` applies, depending on the Aruba plan.
Keep both in the repo; upload the one that matches the hosting.

## Where

Create the subdomain `media.timet.org` in the Aruba control panel, then:

```
media.timet.org/audio/objects/obj-0005.mp3
media.timet.org/audio/objects/obj-0006.mp3
media.timet.org/audio/objects/obj-0007.mp3
media.timet.org/audio/objects/obj-0008.mp3
```

Upload the headers file to `media.timet.org/audio/` (the folder that contains
`objects/`), not to the domain root.

## Environment

Set in Vercel:

```
NEXT_PUBLIC_AUDIO_BASE=https://media.timet.org/audio
```

The four short previews in `public/audio/` remain on Vercel. Only the dataset
objects under `objects/` use the Aruba base.

## Verify

```bash
curl -I https://media.timet.org/audio/objects/obj-0005.mp3
curl -I -H "Origin: https://timet.org" https://media.timet.org/audio/objects/obj-0005.mp3
```

Expected:

- `200 OK`
- `Accept-Ranges: bytes`
- `Access-Control-Allow-Origin: *`

Then open `/open-database` and play `obj-0005` … `obj-0008`.

## Do not upload

- The old `public/`, `cgi-bin/`, `events/index.php`, or any `.asp`/`.php`.
- The 3.5 GB audio archive. Start with these four objects; add the 108 pieces
  later under `audio/108/` only if you decide to publish them.
