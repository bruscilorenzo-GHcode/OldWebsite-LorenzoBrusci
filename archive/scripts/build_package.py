import csv, re, sqlite3, urllib.parse, pathlib
root = pathlib.Path("/Users/lorenzobrusci2020/TIMET_SITO_BACKUP")
idx = {}
for p in root.rglob("*.mp3"): idx.setdefault(p.name.lower(), p)
rows = list(csv.DictReader(open("data_csv/dbtimetservice__timet.csv", encoding="utf-8")))
out = []
for r in rows:
    rel = urllib.parse.unquote(re.search(r'href="([^"]+)"', r["Campo10"]).group(1)).split("timet.org/",1)[-1]
    p = root/rel if (root/rel).exists() else idx[pathlib.Path(rel).name.lower()]
    clean = lambda v: (v or "").strip()
    y = clean(r["Y"]); y = str(int(float(y))) if y else ""
    out.append({"id": r["ID"], "year": y, "order": str(int(float(r["indice"]))) if r["indice"] else "",
      "PP": clean(r["PP"]), "sampled_musician": clean(r["SM"]), "sampled_source_1": clean(r["SS1"]),
      "sampled_source_2": clean(r["SS2"]), "metaphor": clean(r["M"]), "CS": clean(r["CS"]),
      "timet_artwork": clean(r["TA"]), "C": clean(r["C"]), "collection": clean(r["sourc"]),
      "file": str(p.relative_to(root)),
      "original_url": "http://www.timet.org/"+rel})
cols = list(out[0])
with open("package/timet_database.csv","w",newline="",encoding="utf-8") as f:
    w = csv.DictWriter(f, cols); w.writeheader(); w.writerows(out)
con = sqlite3.connect("package/timet_database.sqlite")
con.execute("DROP TABLE IF EXISTS samples")
con.execute("CREATE TABLE samples (%s)" % ",".join(f'"{c}"' for c in cols))
con.executemany("INSERT INTO samples VALUES (%s)" % ",".join("?"*len(cols)), [tuple(o[c] for c in cols) for o in out])
con.commit(); con.close()
print(len(out), "righe"); print(out[0]); print(out[300])
