"""Corrects typos, encoding artefacts and web boilerplate in the English 2004 bios (content/people.json).
Meaning is preserved; Italian-language bios are left untouched."""
import json, re
d = json.load(open("content/people.json"))
R = {
"Lorenzo Brusci": [
 (".Italian metacomposer", "Italian metacomposer"), ("He was born and lives in Toscana.", "He was born and lives in Tuscany."),
 ("popular tuscan heritage", "popular Tuscan heritage"), ("Timet as recently composed the music for Graziano Staino 's \"Last tears from planet hearth\" (short movie)", "Timet has recently composed the music for Graziano Staino’s short film \"Last Tears from Planet Earth\"."),
 ("Our main efforts", "Our main efforts"), ("an excert:", "an excerpt:"), ("Filmhose, Cologne", "Filmhaus, Cologne"), ("Marseille (FRA)", "Marseille (F)"), ("(ESP)", "(E)"), ("www.timet.org Performances:", "Performances:"),
 ("Sosta Palmizi , Raffaella Giordano", "Sosta Palmizi, Raffaella Giordano"), ("AIEP-Ariella Vidach ;", "AIEP – Ariella Vidach;"), ("Progetto Klangturm- the Sound Tower-,", "Klangturm project (the Sound Tower),")],
"Mirio Cosottini": [
 ("Florence¹s", "Florence’s"), ("group¹s", "group’s"), ("Raffaella Giordano ­ Sosta Palmizi", "Raffaella Giordano – Sosta Palmizi"),
 ("Marco Parente , Andrea Chimenti , Ares Tavolazzi, Stefano Bollani , Mirko Guerrini", "Marco Parente, Andrea Chimenti, Ares Tavolazzi, Stefano Bollani, Mirko Guerrini"),
 ("Zeena Parkins , Frank Shulte", "Zeena Parkins, Frank Schulte"), ("Vinko Globocar , Eliott Sharp .", "Vinko Globocar, Elliott Sharp."),
 ("Centro per L'arte Contemporanea Luigi Pecci", "Centro per l’Arte Contemporanea Luigi Pecci"), ("Filmhouse, Cologne (D)", "Filmhaus, Cologne (D)"),
 ("Centre International d'arts visual, Marseille (FRA)", "Centre international d’arts visuels, Marseille (F)"), ("20° Biennale di Musica di Zagabria (International Festival of Contemporary Music), Zagabria", "20th Zagreb Music Biennale (International Festival of Contemporary Music)"),
 ("Theater of Luzern (Swiss)", "Theater Luzern (CH)"), ("a división of", "a division of"), ("Institute of Italian Culture, Los Angeles USA", "Italian Institute of Culture, Los Angeles (USA)")],
"Beppe Mangione": [("Mangione1s", "Mangione’s"), ("Elliot Sharp", "Elliott Sharp"), ("In particular evidence throughout the Group’s work are", "Particularly evident throughout the group’s work are"),
 ("which in recent years has received critical acclaim", "which has received critical acclaim in recent years")],
"Paolo Frasconi": [("joined Timet since its early conception. His contributions include some productions and with a few compositions.", "has been part of Timet since its earliest conception. His contributions include some productions and a few compositions."), ("early 80's", "early 1980s")],
"Matteo Milani": [("Actually he works in a post production facility", "He currently works in a post-production facility"), ("In the mid 90’s he pioneered the rising of digital audio workstations as Digidesign Pro Tools creative user.", "In the mid-1990s he was a pioneer, as a creative user of Digidesign Pro Tools, of the rise of digital audio workstations."),
 ("In the last years he studied and developed a deep interest in", "In recent years he has developed a deep interest in"), ("He joined Timet, reflecting most of his sensibility creating sound elements for new forms of art expression.", "He joined Timet, where he channels most of his sensibility into creating sound elements for new forms of artistic expression."),
 ("what is could became", "what it could become"), ("‘living” source", "“living” source"), ("that remind us something familiar", "that reminds us of something familiar"), ("usign", "using"),
 ("You may find samples of his work visiting graphicalsound", "Samples of his work can be found at graphicalsound."), ("end of the 80’s", "end of the 1980s")],
"Dino Bramanti": [("In 1996 took PhD", "In 1996 he took a PhD"), ("During 90's he's been working as DJ", "During the 1990s he worked as a DJ"), ("Together with A. Borghi is the author", "Together with A. Borghi he is the author"),
 ("Exibition", "Exhibition"), ("He's currently sharing his time", "He currently shares his time"), ("\"c'Arte d'identita' \"", "“c’Arte d’identità”"), ("\"quaa|ude - a quiet interlude\"", "“quaa|ude – a quiet interlude”"), ("\"L'Ospite Ingrato - A Medici Obsession\"", "“L’ospite ingrato – A Medici Obsession”")],
"Andres Bosshard": [("streamng", "streaming"), ("te collective", "the collective"), ("Nitterfeld", "Bitterfeld"), ("\" Dam in Fusio\"", "“Dam in Fusio”"), ("\" Sound Bridge Bern\"", "“Sound Bridge Bern”"), ("\" telefonia\"", "“telefonia”"),
 ("Expo project\"Agora\"", "Expo project “Agora”"), ("the\"Klangturm\"", "the “Klangturm”"), ("First presentation of the\"rotobossophon\"", "First presentation of the “rotobossophon”"), ("Hoergallerie Parochial Kirche", "Hörgalerie, Parochialkirche"), ("Hann.Münden", "Hann. Münden")],
"Giovanni Antignano": [("intrest", "interest"), ("wich", "which"), ("which occupies with video production", "which deals with video production"),
 ("This year, 2003, taking part of the Opensongs project he has now become member of the concept group Timet for which he now collaborates and has realised the homepage.", "In 2003, taking part in the Opensongs project, he became a member of the concept group Timet, with which he now collaborates and for which he has created the homepage."), ("In the year 2003 he was again awarded", "In 2003 he was again awarded"), ("the Best 100 webpages", "the 100 best web pages")],
"Giacomo Bonciolini": [("since early '70.", "since the early 1970s."), ("from the '900 avant-garde", "from the twentieth-century avant-garde"), ("in the '70,", "in the 1970s,"), ("In late 2003 He joined", "In late 2003 he joined"), ("pataphysique", "pataphysical"),
 ("as a interlinguistic", "as an interlinguistic"), ("specially in photography, alternates to free", "especially in photography, alternates with free"), ("some recent exhibitions:", "Recent exhibitions:"), ("webpage Giacomo Bonciolini is providing and designing sound objects for timet [ gallery ]", "He designs sound objects for Timet."), ("intrest", "interest")],
"Filippo Tincolini": [("he lives and he works in carrara Since 1997 Tincolini collaborates with different artisans shops as the atelier of Orlandini in Lucca, the foundry Del Chiaro in Pietrasanta, the sculptor's studio Statuaria Marmi and S.G.F. in Carrara.",
  "he lives and works in Carrara. Since 1997 Tincolini has collaborated with different artisan workshops, such as the Orlandini atelier in Lucca, the Del Chiaro foundry in Pietrasanta, and the sculptors’ studios Statuaria Marmi and S.G.F. in Carrara."),
 ("organize events of revaluation of abandoned marble mines near Macael (Spain)", "organise events to revalue abandoned marble mines near Macael (Spain)"), ("the first Symposium International de Scultura in Palma de Maiorca", "the first International Sculpture Symposium in Palma de Mallorca"),
 ("takes part as sculptor to the realization of a monumental park in Menorca", "takes part, as a sculptor, in the creation of a monumental park in Menorca"), ("he starts with FIGAIA CAVE s.p.a an artistic collaboration in order to revaluate anthropical meaning of the marble excavation area.", "he begins an artistic collaboration with Figaia Cave S.p.A. to reassess the anthropic meaning of the marble quarrying area."),
 ("young sculptores of all world, Claister of S.Agostino", "young sculptors from all over the world, Cloister of S. Agostino"), ("HOMMAGE TO", "HOMAGE TO"), ("Filippo Tincolini is providing and designing sound objects for timet [ gallery ]", "Filippo Tincolini designs sound objects for Timet.")],
"Davide Tidoni": [("fizzle-out", "fizzle out"), ("unfortunatly", "unfortunately")],
"James Wyness": [("http://myweb.tiscali.co.uk/slowtones/", "")],
"Purusha": [("Purusha is born in 1999 from Emanuele Rodolà", "Purusha was born in 1999 from Emanuele Rodolà"), ("which he is the founder and runner of", "which he founded and runs")],
"Frank Schulte": [("works among others with", "He works, among others, with"), ("multi -channel", "multichannel"), ("dancer, actors", "dancers, actors"), ("Berliner Ensembel", "Berliner Ensemble"), ("Argentinia", "Argentina"), ("performs since 1986", "He has performed since 1986"),
 ("Chris Cuttler", "Chris Cutler"), ("simpl songs", "simple songs"), ("The feeling of alienation", "The feeling of alienation")],
"Giampaolo di Cocco": [("Born September, 6, 1947", "Born 6 September 1947"), ("interviews Paolo Portoghesi, Renzo Piano, Aldo Rossi and other architecture", "interviews Paolo Portoghesi, Renzo Piano, Aldo Rossi and other architects."), ("Planing and project direction", "Planning and project direction"),
 ("new egiptyan museum", "new Egyptian museum"), ("appliede spontaneously", "applied spontaneously"), ("enviromental", "environmental"), ("exibition", "exhibition"), ("cataogue", "catalogue"), ("Igor Stravinskj", "Igor Stravinsky"), ("with architectural magazines for architecture as", "with architectural magazines such as")],
}
BOILER = [r"\s*<home <back to guests // Last update:: [^/]*//", r"\s*<home <back to guests.*$", r"\s*\[ ?(listen|link|gallery|sc 3 code) ?\]", r"\s*homepage\s*$", r"\s*_< \[email omessa\] >"]
miss = []
for q in d["people"]:
    b = q["originalBio"]
    if not b: continue
    for rx in BOILER: b = re.sub(rx, "", b)
    b = b.replace("­", "–").replace("¹", "’").replace("\xad", "")
    for a, c in R.get(q["name"], []):
        if a not in b: miss.append((q["name"], a[:40]))
        b = b.replace(a, c)
    q["originalBio"] = re.sub(r"\s{2,}", " ", b).strip()
# structured rewrites
for q in d["people"]:
    if q["name"] == "Hannes Hoelzl":
        q["originalBio"] = ("Born in 1974 in Bolzano/Bozen (I). Studied audio engineering in Graz (A) and audio design in Utrecht (NL); European Media Master of Arts in Sound & Music Technology. Lives in Cologne (D) as a freelance sound artist and musician. "
          "Collaborations: Echo Ho (www.earweego.net); Alberto de Campo, Jan-Kees van Kampen and Echo Ho (PowerBooks_Unplugged); Andres Bosshard et al. (Institute for SonoAviatics). Hardware: computer, ADAM monitor speakers. Software: SuperCollider 3 (www.audiosynth.com). Track: “OllieInDaTube150” (4'20'').")
    if q["name"] == "Reuven Halevi":
        q["originalBio"] = ("Director for film, television and theatre, working between Rome and Oslo. Education: Master of Fine Arts in Theatrical Directing, Accademia Nazionale d’Arte Drammatica “Silvio D’Amico”, Rome (1995–99); courses in directing and dramaturgy at the European School for the Actor (1996–98); general film studies at the Oslo Film School (1993–94); classical studies at Scholae Osloensis (1988–91). "
          "Theatre: Gli armi, i cavalieri e gli amori (Teatro Stabile d’Abruzzo, tour, 2002); The Investigation by P. Weiss (Teatro Stabile d’Abruzzo, L’Aquila, 2002; Teatro Eleonora Duse, Rome, 1998); The Purgatory, based on Dante’s Divine Comedy, director and co-author (Teatro Stabile d’Abruzzo, tour, 2001); A Midsummer Night’s Dream by W. Shakespeare (Compagnia Stabile dell’Alto Molise, national tour, 2000–01); Ilio, based on Homer’s Iliad, director and co-author (Teatro dell’Uovo, L’Aquila, 1998); Theomachia – The War of the Gods, based on the Iliad, director and co-author (Teatro dei Colori, tour, 1998); Six Characters in Search of an Author by L. Pirandello (Teatro Eleonora Duse, Rome, 1997); Ghosts by H. Ibsen (Teatro Eleonora Duse, Rome, 1996). "
          "Film and television: Rai1, Linea Verde Orizzonti – Le vie dei parchi, 18 episodes broadcast between June and October 2003, director (Rome, 2003); television commercial for Se og Hør, director (Oslo, 2001); industrial commercial for the cruise line Costa Crociere, production manager (Oslo, 2001). In 1999–2000 he worked in various roles on productions by Martin Scorsese and Barbara De Fina at Cappa Productions in New York (Bringing Out the Dead, Il dolce cinema, Gangs of New York, You Can Count on Me, Hi-Lo Country). "
          "Between 1991 and 1999 he directed short films and worked professionally on productions with directors such as J. Lien, L. Wertmüller, A. Minghella and E. Fox. In 2003 several television documentaries, live-action short films and experimental films were in pre-production, with Rai1, Rai Educational and the satellite channel Marco Polo among his immediate collaborators.")
json.dump(d, open("content/people.json", "w"), ensure_ascii=False, indent=1)
print("sostituzioni non trovate:", miss)
