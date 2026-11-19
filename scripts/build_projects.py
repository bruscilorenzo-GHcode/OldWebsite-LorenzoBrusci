"""NOTE: after running this, run scripts/clean_texts.py (cleaned English texts overwrite the raw extraction).
Rebuild the 'projects' (legacy modular/) pages as structured, linked content.
Reads the read-only backup. Writes content/projects-living.json and public/projects/*.
Run: python3 scripts/build_projects.py /path/to/TIMET_SITO_BACKUP"""
import sys, re, json, shutil, pathlib, chardet
from bs4 import BeautifulSoup
from markdownify import markdownify as md
from PIL import Image

BK = pathlib.Path(sys.argv[1]); MOD = BK/"modular"; OUT = pathlib.Path("public/projects")
SLUG = {"01":"stressing","02":"hyper-classicism","03":"immersion","04":"performative","05":"sonic-architecture",
        "06":"metalanguages","07":"open-database","08":"video"}
EVENT_SLUG = lambda f: pathlib.Path(f).stem
def read(p):
    raw = p.read_bytes(); return BeautifulSoup(raw.decode(chardet.detect(raw)["encoding"] or "latin-1","replace"),"html.parser")
def body_cell(s):
    for t in s(["script","style","form"]): t.decompose()
    best, bl = s.body or s, 0
    for td in s.find_all("td"):
        if td.find("table"): continue
        l = len(td.get_text(" ",strip=True))
        if l > bl: best, bl = td, l
    return best
def popups(s):
    """function name -> target url, from inline scripts"""
    m = {}
    for sc in s.find_all("script"):
        for f in re.finditer(r'function (\w+)\(\)\s*\{\s*(?:\w+\s*=\s*)?window\.open\("([^"]+)"', sc.string or ""): m[f.group(1)] = f.group(2)
    return m
def gallery_images(urlpath):
    d = (MOD/urlpath.split("/modular/")[-1]).parent
    imgs = sorted(p for p in d.glob("*.jpg"))
    out = []
    for p in imgs:
        rel = f"{d.name.replace(' ','-')}/{p.name}"; dst = OUT/rel; dst.parent.mkdir(parents=True, exist_ok=True)
        im = Image.open(p).convert("RGB"); im.thumbnail((1400,1400)); im.save(dst, "JPEG", quality=78, optimize=True)
        out.append("/projects/"+rel)
    return out
def video_for(urlpath):
    s = read(MOD/urlpath.split("/modular/")[-1])
    mov = [pathlib.Path(a["src"] if a.get("src") else a.get("value","")).name for a in s.find_all(["embed","param"]) if re.search(r"\.(mov|swf)", (a.get("src") or a.get("value") or ""))]
    return list(dict.fromkeys(m for m in mov if m))
TITLES = {"01":"Stressing the limit of sound perception","02":"Hyper Classicism","03":"State of immersion","04":"Performative projects",
 "05":"Sonic architectures","06":"Metalanguages and nonlinearity","07":"Open database","08":"Video experiences and documentary",
 "04_2":"Easy Classics","04_3":"LoLe","04_4":"Zarathustra","04_5":"The poem","04_6":"Heritage to be played","04_7":"Compilatione",
 "04_8":"Maybe","04_9":"AL><Ter","04_10":"Sampling Art","04_11":"Shadows","04_12":"May the 1st",
 "app01":"Lole - Musica Leggiadra","app02":"Easy Classics","app06":"Sempre Straniero","app07":"Mariposa / Lo-Timet versions"}
pages = {}
ids = list(SLUG)+[f"04_{i}" for i in range(2,13)]+["app01","app02","app06","app07"]
for pid in ids:
    s = read(MOD/f"{pid}.htm"); pop = popups(s); cell = body_cell(s)
    media = {"galleries":[], "videos":[], "files":[]}
    for a in cell.find_all("a", href=True):
        h = a["href"].strip()
        if h.startswith("javascript:"):
            fn = re.match(r"javascript:(\w+)\(", h); fn = fn.group(1) if fn else ""
            if fn == "app": a["href"] = f"#excerpt"
            elif fn in pop and "/pic/" in pop[fn]:
                gal = pop[fn].split("/pic/")[1].split("/")[0]; key = gal.replace(" ","-")
                if not any(g["key"]==key for g in media["galleries"]):
                    media["galleries"].append({"key":key,"title":gal,"images":gallery_images(pop[fn])})
                a["href"] = f"#gallery-{key}"
            elif fn in pop and "/video/" in pop[fn]:
                vids = video_for(pop[fn]); key = pathlib.Path(pop[fn]).stem
                media["videos"].append({"key":key,"files":vids}); a["href"] = f"#video-{key}"
            else: a.replace_with(a.get_text())
        elif re.match(r"(\.\./)?(index\.htm|\w+\.htm)$", h) and "events" not in h:
            m = re.match(r"(?:\.\./)?(\w+)\.htm$", h); k = m.group(1) if m else ""
            if k in SLUG: a["href"] = f"/projects/{SLUG[k]}"
            elif re.match(r"04_\d+$", k): a["href"] = f"/projects/performative/{k}"
            elif k == "index": a["href"] = "/projects"
            else: a.replace_with(a.get_text())
        elif "../events/" in h: a["href"] = "/archive/events/"+EVENT_SLUG(h)
        elif h.endswith(".pdf"):
            name = pathlib.Path(h.replace("%20"," ")).name; src = MOD/h.replace("%20"," ")
            if src.exists():
                (OUT/"files").mkdir(parents=True, exist_ok=True); shutil.copy(src, OUT/"files"/name); a["href"] = "/projects/files/"+name.replace(" ","%20")
                media["files"].append(name)
        elif h.startswith("mailto:"): a["href"] = "mailto:info@musi-co.com"
        elif h.startswith("http") and "timet.org" in h: a.replace_with(a.get_text())
    for t in cell.find_all("img"): t.decompose()
    text = md(str(cell), heading_style="ATX"); text = re.sub(r"[ \t ]+"," ",text); text = re.sub(r"\n\s*\n\s*\n+","\n\n",text).strip()
    text = re.sub(r"(?<![ \n])\n(?![\n#*>\-\d\[])"," ",text)
    text = re.sub(r"(lorenzo\.brusci|stolen)@timet\.org","info@musi-co.com",text)
    text = re.sub(r"\[\[([^\]]+)\]\(([^)]+)\)(\d*)\]>?", lambda m: f"[{m.group(1)}{(' '+m.group(3)) if m.group(3) else ''}]({m.group(2)})", text)
    text = re.sub(r"\s+\.(?=[A-Z0-9][A-Za-z])", "\n\n- ", text)
    text = re.sub(r"\n\n- (.*?)\n\n", lambda m: "\n\n- "+m.group(1)+"\n\n", text)
    title = TITLES.get(pid, pid)
    pages[pid] = {"id":pid, "slug": SLUG.get(pid, pid), "title": title, "markdown": text, "media": media}
json.dump(pages, open("content/projects-living.json","w"), ensure_ascii=False, indent=1)
print(len(pages),"pagine;", sum(len(p["media"]["galleries"]) for p in pages.values()),"gallerie;", sum(len(g["images"]) for p in pages.values() for g in p["media"]["galleries"]),"immagini")
