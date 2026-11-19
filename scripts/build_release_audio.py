"""Match release tracks to audio files in the production archive on the Internet Archive.
Run: python3 scripts/build_release_audio.py /path/to/TIMET_SITO_BACKUP"""
import sys, re, json, pathlib, unicodedata
BK = pathlib.Path(sys.argv[1])
norm = lambda s: re.sub(r"[^a-z0-9]+"," ",unicodedata.normalize("NFD",s).encode("ascii","ignore").decode().lower()).split()
d = json.load(open("content/discography.json")); out = {}
for r in d["releases"]:
    folder = r.get("audioFolder") or ""
    if not folder.startswith("mp3/"): continue
    fd = next((p for p in (BK/"mp3").iterdir() if p.is_dir() and p.name.lower()==folder.split("/")[1].lower()), None)
    if not fd: continue
    files = sorted(p for p in fd.iterdir() if p.suffix.lower()==".mp3")
    tracks = r["tracks"]; matched = {}; used = set()
    for f in files:
        stem = f.stem; words = [w for w in norm(re.sub(r"\(.*?\)","",stem)) if w not in ("track","timet")]
        cands = [t for t in tracks if t["n"] not in matched and words and all(w in norm(t["title"]) for w in words) and not re.fullmatch(r"\d+", "".join(words))]
        if len(cands)==1: matched[cands[0]["n"]] = f.name; used.add(f.name); continue
        m = re.match(r"^(\d+)[\s\-\.]", stem) or re.search(r"Track(\d+)", stem)
        if m and int(m.group(1)) in {t["n"] for t in tracks} and int(m.group(1)) not in matched:
            matched[int(m.group(1))] = f.name; used.add(f.name)
    extras = [f.name for f in files if f.name not in used]
    out[r["slug"]] = {"folder": folder, "tracks": {str(k): v for k,v in sorted(matched.items())}, "extras": extras}
    print(f'{r["slug"]:36} tracks {len(tracks):2} matched {len(matched):2} files {len(files):2} extras {len(extras)}')
json.dump(out, open("content/release-audio.json","w"), ensure_ascii=False, indent=1)
