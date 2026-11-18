import sys, csv, sqlite3, pathlib
from access_parser import AccessParser
src = pathlib.Path(sys.argv[1]); out_csv = pathlib.Path(sys.argv[2]); out_db = pathlib.Path(sys.argv[3])
for mdb in sorted(src.glob("*.mdb")):
    name = mdb.stem
    try:
        db = AccessParser(str(mdb))
    except Exception as e:
        print(f"FAIL {name}: {e}"); continue
    con = sqlite3.connect(out_db / f"{name}.sqlite")
    for t in db.catalog:
        if t.startswith("MSys"): continue
        try:
            tab = db.parse_table(t)
        except Exception as e:
            print(f"  FAIL table {name}.{t}: {e}"); continue
        cols = list(tab.keys()); n = len(tab[cols[0]]) if cols else 0
        with open(out_csv / f"{name}__{t}.csv", "w", newline="", encoding="utf-8") as f:
            w = csv.writer(f); w.writerow(cols)
            for i in range(n): w.writerow([tab[c][i] for c in cols])
        q = ",".join('"%s"' % c.replace('"','') for c in cols)
        con.execute(f'DROP TABLE IF EXISTS "{t}"'); con.execute(f'CREATE TABLE "{t}" ({q})')
        con.executemany(f'INSERT INTO "{t}" VALUES ({",".join("?"*len(cols))})',
            [tuple(None if tab[c][i] is None else str(tab[c][i]) for c in cols) for i in range(n)])
        print(f"{name}.{t}: {n} righe, {len(cols)} colonne")
    con.commit(); con.close()
