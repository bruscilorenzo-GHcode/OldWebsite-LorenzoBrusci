import csv, pathlib, re, chardet, shutil
from bs4 import BeautifulSoup
from markdownify import markdownify as md
root = pathlib.Path("/Users/lorenzobrusci2020/TIMET_SITO_BACKUP"); out = pathlib.Path("content_md")
if out.exists(): shutil.rmtree(out)
EXCL = ("gdc/","database/","images/","public/","timet.org/","timet new/","index","downloads/database/","newsl.asp","NUOVO1")
rows = [r for r in csv.DictReader(open("inventory.csv")) if r["class"]=="text" and not r["path"].startswith(EXCL)]
done=[]
for r in rows:
    p = root/r["path"]; raw = p.read_bytes(); enc = chardet.detect(raw)["encoding"] or "latin-1"
    soup = BeautifulSoup(raw.decode(enc, errors="replace"), "html.parser")
    for t in soup(["script","style","noscript","form","select"]): t.decompose()
    # choose the largest <td> with the most text but few nested tables = content cell
    best, bl = soup.body or soup, 0
    for td in soup.find_all("td"):
        if td.find("table"): continue
        l = len(td.get_text(" ", strip=True))
        if l > bl: best, bl = td, l
    best.name = "div"
    text = md(str(best), heading_style="ATX", strip=["img"]) 
    text = re.sub(r"[ \t ]+"," ",text); text = re.sub(r"\n\s*\n\s*\n+","\n\n",text).strip()
    text = re.sub(r"(?<![ \n])\n(?![\n#*>\-\d])"," ",text)
    title = r["title"].split("|")[-1].strip() or p.stem
    dest = out/pathlib.Path(r["path"]).with_suffix(".md"); dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(f'---\ntitle: "{title.replace(chr(34),chr(39))}"\nsource: "{r["path"]}"\nsection: "{pathlib.Path(r["path"]).parts[0]}"\nlicense: CC BY-NC 4.0\n---\n\n{text}\n', encoding="utf-8")
    done.append((r["path"], len(text)))
print(len(done), "pagine convertite")
for d in done[:0]: print(d)
