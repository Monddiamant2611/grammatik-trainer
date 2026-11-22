/** @param {string} id @param {string} sentence @param {1|2|3} difficulty @param {object[]} targets */
function cs(id, sentence, difficulty, targets) {
  return { id, sentence, difficulty, targets }
}

const templates = [
  cs('c16', 'Der Vogel singt.', 1, [{ surface: 'Der Vogel', label: 'der Vogel', caseId: 'nom', probe: 'Wer oder was singt?' }]),
  cs('c17', 'Ich sehe den Vogel.', 1, [{ surface: 'den Vogel', label: 'den Vogel', caseId: 'akk', probe: 'Wen oder was sehe ich?' }]),
  cs('c18', 'Wir helfen dem Kind.', 1, [{ surface: 'dem Kind', label: 'dem Kind', caseId: 'dat', probe: 'Wem helfen wir?' }]),
  cs('c19', 'Das Fell des Hundes ist weich.', 2, [{ surface: 'des Hundes', label: 'des Hundes', caseId: 'gen', probe: 'Wessen Fell ist weich?' }]),
  cs('c20', 'Die Lehrerin gibt dem Schüler ein Buch.', 2, [
    { surface: 'dem Schüler', label: 'dem Schüler', caseId: 'dat', probe: 'Wem gibt die Lehrerin ein Buch?' },
    { surface: 'ein Buch', label: 'ein Buch', caseId: 'akk', probe: 'Wen oder was gibt die Lehrerin dem Schüler?' },
  ]),
  cs('c21', 'Papa kauft der Mutter Blumen.', 2, [
    { surface: 'der Mutter', label: 'der Mutter', caseId: 'dat', probe: 'Wem kauft Papa Blumen?' },
    { surface: 'Blumen', label: 'Blumen', caseId: 'akk', probe: 'Wen oder was kauft Papa der Mutter?' },
  ]),
  cs('c22', 'Der Name des Mädchens steht im Heft.', 2, [{ surface: 'des Mädchens', label: 'des Mädchens', caseId: 'gen', probe: 'Wessen Name steht im Heft?' }]),
  cs('c23', 'Tim folgt dem Hund.', 1, [{ surface: 'dem Hund', label: 'dem Hund', caseId: 'dat', probe: 'Wem folgt Tim?' }]),
  cs('c24', 'Lena trägt die Tasche.', 1, [{ surface: 'die Tasche', label: 'die Tasche', caseId: 'akk', probe: 'Wen oder was trägt Lena?' }]),
  cs('c25', 'Die Sonne scheint.', 1, [{ surface: 'Die Sonne', label: 'die Sonne', caseId: 'nom', probe: 'Wer oder was scheint?' }]),
  cs('c26', 'Ben besucht seinen Onkel.', 2, [{ surface: 'seinen Onkel', label: 'seinen Onkel', caseId: 'akk', probe: 'Wen oder was besucht Ben?' }]),
  cs('c27', 'Der Schlüssel der Tür fehlt.', 2, [{ surface: 'der Tür', label: 'der Tür', caseId: 'gen', probe: 'Wessen Schlüssel fehlt?' }]),
  cs('c28', 'Wir gratulieren der Freundin.', 2, [{ surface: 'der Freundin', label: 'der Freundin', caseId: 'dat', probe: 'Wem gratulieren wir?' }]),
  cs('c29', 'Der Arzt hilft dem Patienten.', 2, [{ surface: 'dem Patienten', label: 'dem Patienten', caseId: 'dat', probe: 'Wem hilft der Arzt?' }]),
  cs('c30', 'Ich lese die Nachricht.', 1, [{ surface: 'die Nachricht', label: 'die Nachricht', caseId: 'akk', probe: 'Wen oder was lese ich?' }]),
  cs('c31', 'Das Rad des Fahrrads ist neu.', 2, [{ surface: 'des Fahrrads', label: 'des Fahrrads', caseId: 'gen', probe: 'Wessen Rad ist neu?' }]),
  cs('c32', 'Die Katze liegt auf dem Sofa.', 1, [{ surface: 'dem Sofa', label: 'dem Sofa', caseId: 'dat', probe: 'Auf wem oder was liegt die Katze? Wem? Auf dem Sofa – Dativ mit auf.' }]),
  cs('c33', 'Er schenkt seiner Schwester Schokolade.', 2, [
    { surface: 'seiner Schwester', label: 'seiner Schwester', caseId: 'dat', probe: 'Wem schenkt er Schokolade?' },
    { surface: 'Schokolade', label: 'Schokolade', caseId: 'akk', probe: 'Wen oder was schenkt er seiner Schwester?' },
  ]),
  cs('c34', 'Der Brief des Chefs kommt heute.', 2, [{ surface: 'des Chefs', label: 'des Chefs', caseId: 'gen', probe: 'Wessen Brief kommt heute?' }]),
  cs('c35', 'Paul zeigt dem Lehrer das Bild.', 2, [
    { surface: 'dem Lehrer', label: 'dem Lehrer', caseId: 'dat', probe: 'Wem zeigt Paul das Bild?' },
    { surface: 'das Bild', label: 'das Bild', caseId: 'akk', probe: 'Wen oder was zeigt Paul dem Lehrer?' },
  ]),
  cs('c36', 'Die Schülerin beantwortet die Frage.', 2, [{ surface: 'die Frage', label: 'die Frage', caseId: 'akk', probe: 'Wen oder was beantwortet die Schülerin?' }]),
  cs('c37', 'Der Wind weht stark.', 1, [{ surface: 'Der Wind', label: 'der Wind', caseId: 'nom', probe: 'Wer oder was weht stark?' }]),
  cs('c38', 'Mama dankt dem Nachbarn.', 2, [{ surface: 'dem Nachbarn', label: 'dem Nachbarn', caseId: 'dat', probe: 'Wem dankt Mama?' }]),
  cs('c39', 'Ich kaufe einen Apfel.', 1, [{ surface: 'einen Apfel', label: 'einen Apfel', caseId: 'akk', probe: 'Wen oder was kaufe ich?' }]),
  cs('c40', 'Das Dach des Hauses ist rot.', 2, [{ surface: 'des Hauses', label: 'des Hauses', caseId: 'gen', probe: 'Wessen Dach ist rot?' }]),
  cs('c41', 'Wir geben den Gästen Platz.', 2, [
    { surface: 'den Gästen', label: 'den Gästen', caseId: 'dat', probe: 'Wem geben wir Platz?' },
    { surface: 'Platz', label: 'Platz', caseId: 'akk', probe: 'Wen oder was geben wir den Gästen?' },
  ]),
  cs('c42', 'Die Freundin schreibt der Oma.', 2, [{ surface: 'der Oma', label: 'der Oma', caseId: 'dat', probe: 'Wem schreibt die Freundin?' }]),
  cs('c43', 'Hannah liest dem Kind vor.', 2, [{ surface: 'dem Kind', label: 'dem Kind', caseId: 'dat', probe: 'Wem liest Hannah vor?' }]),
  cs('c44', 'Ein Hund bellt laut.', 1, [{ surface: 'Ein Hund', label: 'ein Hund', caseId: 'nom', probe: 'Wer oder was bellt laut?' }]),
  cs('c45', 'Sie findet den Weg.', 1, [{ surface: 'den Weg', label: 'den Weg', caseId: 'akk', probe: 'Wen oder was findet sie?' }]),
  cs('c46', 'Das Ende des Films überrascht uns.', 3, [{ surface: 'des Films', label: 'des Films', caseId: 'gen', probe: 'Wessen Ende überrascht uns?' }]),
  cs('c47', 'Der Trainer erklärt den Sportlern die Regel.', 3, [
    { surface: 'Der Trainer', label: 'der Trainer', caseId: 'nom', probe: 'Wer oder was erklärt den Sportlern die Regel?' },
    { surface: 'den Sportlern', label: 'den Sportlern', caseId: 'dat', probe: 'Wem erklärt der Trainer die Regel?' },
    { surface: 'die Regel', label: 'die Regel', caseId: 'akk', probe: 'Wen oder was erklärt der Trainer den Sportlern?' },
  ]),
  cs('c48', 'Jonas nimmt den Bus.', 1, [{ surface: 'den Bus', label: 'den Bus', caseId: 'akk', probe: 'Wen oder was nimmt Jonas?' }]),
  cs('c49', 'Die Decke des Bettes ist warm.', 2, [{ surface: 'des Bettes', label: 'des Bettes', caseId: 'gen', probe: 'Wessen Decke ist warm?' }]),
  cs('c50', 'Wir vertrauen der Lehrerin.', 2, [{ surface: 'der Lehrerin', label: 'der Lehrerin', caseId: 'dat', probe: 'Wem vertrauen wir?' }]),
]

// Generate more single-target sentences c51-c115
const more = [
  ['c51', 'Er öffnet die Tür.', 'die Tür', 'akk', 'Wen oder was öffnet er?', 1],
  ['c52', 'Sie sitzt auf dem Stuhl.', 'dem Stuhl', 'dat', 'Wem oder worauf sitzt sie?', 1],
  ['c53', 'Das Auto der Familie steht draußen.', 'der Familie', 'gen', 'Wessen Auto steht draußen?', 2],
  ['c54', 'Der Junge wirft den Ball.', 'den Ball', 'akk', 'Wen oder was wirft der Junge?', 1],
  ['c55', 'Die Biene summt.', 'Die Biene', 'nom', 'Wer oder was summt?', 1],
  ['c56', 'Ich antworte dem Freund.', 'dem Freund', 'dat', 'Wem antworte ich?', 2],
  ['c57', 'Wir hören die Musik.', 'die Musik', 'akk', 'Wen oder was hören wir?', 1],
  ['c58', 'Der Preis des Buches steht hinten.', 'des Buches', 'gen', 'Wessen Preis steht hinten?', 2],
  ['c59', 'Felix folgt seiner Mutter.', 'seiner Mutter', 'dat', 'Wem folgt Felix?', 2],
  ['c60', 'Ein Vogel baut ein Nest.', 'ein Nest', 'akk', 'Wen oder was baut ein Vogel?', 2],
  ['c61', 'Die Uhr des Turms ist alt.', 'des Turms', 'gen', 'Wessen Uhr ist alt?', 2],
  ['c62', 'Eva bringt der Klasse Kuchen.', 'der Klasse', 'dat', 'Wem bringt Eva Kuchen?', 2],
  ['c63', 'Wir sehen einen Film.', 'einen Film', 'akk', 'Wen oder was sehen wir?', 1],
  ['c64', 'Der Himmel wird dunkel.', 'Der Himmel', 'nom', 'Wer oder was wird dunkel?', 1],
  ['c65', 'Tom dankt dem Helfer.', 'dem Helfer', 'dat', 'Wem dankt Tom?', 2],
  ['c66', 'Sie waschen dem Baby die Hände.', 'dem Baby', 'dat', 'Wem waschen sie die Hände?', 2],
  ['c67', 'Ich trinke die Milch.', 'die Milch', 'akk', 'Wen oder was trinke ich?', 1],
  ['c68', 'Das Licht der Lampe flackert.', 'der Lampe', 'gen', 'Wessen Licht flackert?', 2],
  ['c69', 'Lea schickt der Tante eine Karte.', 'der Tante', 'dat', 'Wem schickt Lea eine Karte?', 2],
  ['c70', 'Der Koch schmeckt die Suppe.', 'die Suppe', 'akk', 'Wen oder was schmeckt der Koch?', 2],
  ['c71', 'Ein Pferd frisst Heu.', 'Ein Pferd', 'nom', 'Wer oder was frisst Heu?', 1],
  ['c72', 'Wir besuchen die Großeltern.', 'die Großeltern', 'akk', 'Wen oder was besuchen wir?', 1],
  ['c73', 'Der Kopf des Löwen ist groß.', 'des Löwen', 'gen', 'Wessen Kopf ist groß?', 3],
  ['c74', 'Paul schenkt seinem Freund ein Spiel.', 'seinem Freund', 'dat', 'Wem schenkt Paul ein Spiel?', 2],
  ['c75', 'Sie malt das Bild.', 'das Bild', 'akk', 'Wen oder was malt sie?', 1],
  ['c76', 'Der Schüler fragt den Lehrer.', 'den Lehrer', 'akk', 'Wen oder was fragt der Schüler?', 1],
  ['c77', 'Die Maus versteckt sich unter dem Bett.', 'dem Bett', 'dat', 'Unter wem oder was? Unter dem Bett – Dativ.', 2],
  ['c78', 'Hannah erklärt dem Kind die Aufgabe.', 'dem Kind', 'dat', 'Wem erklärt Hannah die Aufgabe?', 2],
  ['c79', 'Ich bestelle eine Pizza.', 'eine Pizza', 'akk', 'Wen oder was bestelle ich?', 1],
  ['c80', 'Der Arm des Roboters bewegt sich.', 'des Roboters', 'gen', 'Wessen Arm bewegt sich?', 3],
  ['c81', 'Wir gratulieren dem Sieger.', 'dem Sieger', 'dat', 'Wem gratulieren wir?', 2],
  ['c82', 'Die Flöte klingt schön.', 'Die Flöte', 'nom', 'Wer oder was klingt schön?', 1],
  ['c83', 'Ben repariert das Fahrrad.', 'das Fahrrad', 'akk', 'Wen oder was repariert Ben?', 1],
  ['c84', 'Die Farbe der Wand ist blau.', 'der Wand', 'gen', 'Wessen Farbe ist blau?', 2],
  ['c85', 'Sie hilft der Nachbarin.', 'der Nachbarin', 'dat', 'Wem hilft sie?', 1],
  ['c86', 'Ein Fuchs läuft über die Wiese.', 'Ein Fuchs', 'nom', 'Wer oder was läuft über die Wiese?', 2],
  ['c87', 'Tim sucht seinen Hut.', 'seinen Hut', 'akk', 'Wen oder was sucht Tim?', 1],
  ['c88', 'Das Herz des Kindes schlägt schnell.', 'des Kindes', 'gen', 'Wessen Herz schlägt schnell?', 2],
  ['c89', 'Wir leihen der Bibliothek Bücher zurück.', 'der Bibliothek', 'dat', 'Wem leihen wir Bücher zurück?', 3],
  ['c90', 'Sie pflückt einen Apfel.', 'einen Apfel', 'akk', 'Wen oder was pflückt sie?', 1],
  ['c91', 'Der Sturm tobt.', 'Der Sturm', 'nom', 'Wer oder was tobt?', 1],
  ['c92', 'Mia schreibt ihrer Freundin.', 'ihrer Freundin', 'dat', 'Wem schreibt Mia?', 2],
  ['c93', 'Ich ziehe den Mantel an.', 'den Mantel', 'akk', 'Wen oder was ziehe ich an?', 1],
  ['c94', 'Der Geruch des Brotes ist gut.', 'des Brotes', 'gen', 'Wessen Geruch ist gut?', 2],
  ['c95', 'Er zeigt dem Publikum den Trick.', 'dem Publikum', 'dat', 'Wem zeigt er den Trick?', 2],
  ['c96', 'Die Rose duftet.', 'Die Rose', 'nom', 'Wer oder was duftet?', 1],
  ['c97', 'Wir kaufen ein Geschenk.', 'ein Geschenk', 'akk', 'Wen oder was kaufen wir?', 1],
  ['c98', 'Der Fuß des Tisches wackelt.', 'des Tisches', 'gen', 'Wessen Fuß wackelt?', 2],
  ['c99', 'Jonas antwortet der Lehrerin.', 'der Lehrerin', 'dat', 'Wem antwortet Jonas?', 2],
  ['c100', 'Sie trägt den Rucksack.', 'den Rucksack', 'akk', 'Wen oder was trägt sie?', 1],
  ['c101', 'Ein Schiff fährt auf dem See.', 'Ein Schiff', 'nom', 'Wer oder was fährt auf dem See?', 1],
  ['c102', 'Der Onkel erzählt dem Neffen eine Geschichte.', 'dem Neffen', 'dat', 'Wem erzählt der Onkel eine Geschichte?', 2],
  ['c103', 'Ich löse das Rätsel.', 'das Rätsel', 'akk', 'Wen oder was löse ich?', 2],
  ['c104', 'Die Stimme des Sängers ist klar.', 'des Sängers', 'gen', 'Wessen Stimme ist klar?', 2],
  ['c105', 'Wir folgen dem Wanderweg.', 'dem Wanderweg', 'dat', 'Wem folgen wir?', 2],
  ['c106', 'Der Ball rollt.', 'Der Ball', 'nom', 'Wer oder was rollt?', 1],
  ['c107', 'Lea kauft der Mutter Kaffee.', 'der Mutter', 'dat', 'Wem kauft Lea Kaffee?', 2],
  ['c108', 'Er hört das Echo.', 'das Echo', 'akk', 'Wen oder was hört er?', 2],
  ['c109', 'Das Gewicht der Kiste ist hoch.', 'der Kiste', 'gen', 'Wessen Gewicht ist hoch?', 2],
  ['c110', 'Sie schenkt dem Vater eine Krawatte.', 'dem Vater', 'dat', 'Wem schenkt sie eine Krawatte?', 2],
]

const dualMore = [
  cs('c111', 'Die Nachbarin bringt dem Kind Wasser.', 2, [
    { surface: 'dem Kind', label: 'dem Kind', caseId: 'dat', probe: 'Wem bringt die Nachbarin Wasser?' },
    { surface: 'Wasser', label: 'Wasser', caseId: 'akk', probe: 'Wen oder was bringt die Nachbarin dem Kind?' },
  ]),
  cs('c112', 'Der Vater kauft der Tochter ein Kleid.', 2, [
    { surface: 'der Tochter', label: 'der Tochter', caseId: 'dat', probe: 'Wem kauft der Vater ein Kleid?' },
    { surface: 'ein Kleid', label: 'ein Kleid', caseId: 'akk', probe: 'Wen oder was kauft der Vater der Tochter?' },
  ]),
  cs('c113', 'Sie gibt dem Gast Brot.', 2, [
    { surface: 'dem Gast', label: 'dem Gast', caseId: 'dat', probe: 'Wem gibt sie Brot?' },
    { surface: 'Brot', label: 'Brot', caseId: 'akk', probe: 'Wen oder was gibt sie dem Gast?' },
  ]),
  cs('c114', 'Ben schenkt seiner Oma Blumen.', 2, [
    { surface: 'seiner Oma', label: 'seiner Oma', caseId: 'dat', probe: 'Wem schenkt Ben Blumen?' },
    { surface: 'Blumen', label: 'Blumen', caseId: 'akk', probe: 'Wen oder was schenkt Ben seiner Oma?' },
  ]),
  cs('c115', 'Der Hund bringt dem Herrchen den Stock.', 2, [
    { surface: 'dem Herrchen', label: 'dem Herrchen', caseId: 'dat', probe: 'Wem bringt der Hund den Stock?' },
    { surface: 'den Stock', label: 'den Stock', caseId: 'akk', probe: 'Wen oder was bringt der Hund dem Herrchen?' },
  ]),
  cs('c116', 'Die Tante zeigt dem Kind die Fotos.', 2, [
    { surface: 'dem Kind', label: 'dem Kind', caseId: 'dat', probe: 'Wem zeigt die Tante die Fotos?' },
    { surface: 'die Fotos', label: 'die Fotos', caseId: 'akk', probe: 'Wen oder was zeigt die Tante dem Kind?' },
  ]),
  cs('c117', 'Wir senden der Freundin einen Brief.', 2, [
    { surface: 'der Freundin', label: 'der Freundin', caseId: 'dat', probe: 'Wem senden wir einen Brief?' },
    { surface: 'einen Brief', label: 'einen Brief', caseId: 'akk', probe: 'Wen oder was senden wir der Freundin?' },
  ]),
  cs('c118', 'Papa repariert mir das Spielzeug.', 2, [
    { surface: 'mir', label: 'mir', caseId: 'dat', probe: 'Wem repariert Papa das Spielzeug?' },
    { surface: 'das Spielzeug', label: 'das Spielzeug', caseId: 'akk', probe: 'Wen oder was repariert Papa mir?' },
  ]),
  cs('c119', 'Die Katze bringt der Familie eine Maus.', 3, [
    { surface: 'der Familie', label: 'der Familie', caseId: 'dat', probe: 'Wem bringt die Katze eine Maus?' },
    { surface: 'eine Maus', label: 'eine Maus', caseId: 'akk', probe: 'Wen oder was bringt die Katze der Familie?' },
  ]),
  cs('c120', 'Der Kellner serviert den Gästen Suppe.', 2, [
    { surface: 'den Gästen', label: 'den Gästen', caseId: 'dat', probe: 'Wem serviert der Kellner Suppe?' },
    { surface: 'Suppe', label: 'Suppe', caseId: 'akk', probe: 'Wen oder was serviert der Kellner den Gästen?' },
  ]),
  cs('c121', 'Tim leiht der Schwester den Roman.', 2, [
    { surface: 'der Schwester', label: 'der Schwester', caseId: 'dat', probe: 'Wem leiht Tim den Roman?' },
    { surface: 'den Roman', label: 'den Roman', caseId: 'akk', probe: 'Wen oder was leiht Tim der Schwester?' },
  ]),
  cs('c122', 'Die Oma gibt dem Enkel Kekse.', 1, [
    { surface: 'dem Enkel', label: 'dem Enkel', caseId: 'dat', probe: 'Wem gibt die Oma Kekse?' },
    { surface: 'Kekse', label: 'Kekse', caseId: 'akk', probe: 'Wen oder was gibt die Oma dem Enkel?' },
  ]),
  cs('c123', 'Hannah schickt dem Opa eine Mail.', 2, [
    { surface: 'dem Opa', label: 'dem Opa', caseId: 'dat', probe: 'Wem schickt Hannah eine Mail?' },
    { surface: 'eine Mail', label: 'eine Mail', caseId: 'akk', probe: 'Wen oder was schickt Hannah dem Opa?' },
  ]),
  cs('c124', 'Der Trainer zeigt den Spielern die Übung.', 2, [
    { surface: 'den Spielern', label: 'den Spielern', caseId: 'dat', probe: 'Wem zeigt der Trainer die Übung?' },
    { surface: 'die Übung', label: 'die Übung', caseId: 'akk', probe: 'Wen oder was zeigt der Trainer den Spielern?' },
  ]),
  cs('c125', 'Felix zeigt der Lehrerin die Hausaufgabe.', 2, [
    { surface: 'der Lehrerin', label: 'der Lehrerin', caseId: 'dat', probe: 'Wem zeigt Felix die Hausaufgabe?' },
    { surface: 'die Hausaufgabe', label: 'die Hausaufgabe', caseId: 'akk', probe: 'Wen oder was zeigt Felix der Lehrerin?' },
  ]),
  cs('c126', 'Mama gibt den Kindern Obst.', 1, [
    { surface: 'den Kindern', label: 'den Kindern', caseId: 'dat', probe: 'Wem gibt Mama Obst?' },
    { surface: 'Obst', label: 'Obst', caseId: 'akk', probe: 'Wen oder was gibt Mama den Kindern?' },
  ]),
  cs('c127', 'Der Arzt verschreibt dem Patienten Medizin.', 3, [
    { surface: 'dem Patienten', label: 'dem Patienten', caseId: 'dat', probe: 'Wem verschreibt der Arzt Medizin?' },
    { surface: 'Medizin', label: 'Medizin', caseId: 'akk', probe: 'Wen oder was verschreibt der Arzt dem Patienten?' },
  ]),
  cs('c128', 'Jonas erzählt der Klasse einen Witz.', 2, [
    { surface: 'der Klasse', label: 'der Klasse', caseId: 'dat', probe: 'Wem erzählt Jonas einen Witz?' },
    { surface: 'einen Witz', label: 'einen Witz', caseId: 'akk', probe: 'Wen oder was erzählt Jonas der Klasse?' },
  ]),
  cs('c129', 'Die Lehrerin stellt den Schülern eine Frage.', 2, [
    { surface: 'den Schülern', label: 'den Schülern', caseId: 'dat', probe: 'Wem stellt die Lehrerin eine Frage?' },
    { surface: 'eine Frage', label: 'eine Frage', caseId: 'akk', probe: 'Wen oder was stellt die Lehrerin den Schülern?' },
  ]),
  cs('c130', 'Paul bringt seinem Freund den Ball.', 1, [
    { surface: 'seinem Freund', label: 'seinem Freund', caseId: 'dat', probe: 'Wem bringt Paul den Ball?' },
    { surface: 'den Ball', label: 'den Ball', caseId: 'akk', probe: 'Wen oder was bringt Paul seinem Freund?' },
  ]),
  cs('c131', 'Die Polizistin zeigt den Kindern den Zebrastreifen.', 2, [
    { surface: 'den Kindern', label: 'den Kindern', caseId: 'dat', probe: 'Wem zeigt die Polizistin den Zebrastreifen?' },
    { surface: 'den Zebrastreifen', label: 'den Zebrastreifen', caseId: 'akk', probe: 'Wen oder was zeigt die Polizistin den Kindern?' },
  ]),
  cs('c132', 'Lena bringt der Freundin Tee.', 1, [
    { surface: 'der Freundin', label: 'der Freundin', caseId: 'dat', probe: 'Wem bringt Lena Tee?' },
    { surface: 'Tee', label: 'Tee', caseId: 'akk', probe: 'Wen oder was bringt Lena der Freundin?' },
  ]),
  cs('c133', 'Wir geben dem Team neue Trikots.', 2, [
    { surface: 'dem Team', label: 'dem Team', caseId: 'dat', probe: 'Wem geben wir neue Trikots?' },
    { surface: 'neue Trikots', label: 'neue Trikots', caseId: 'akk', probe: 'Wen oder was geben wir dem Team?' },
  ]),
  cs('c134', 'Der Bauer füttert den Tieren Heu.', 2, [
    { surface: 'den Tieren', label: 'den Tieren', caseId: 'dat', probe: 'Wem füttert der Bauer Heu?' },
    { surface: 'Heu', label: 'Heu', caseId: 'akk', probe: 'Wen oder was füttert der Bauer den Tieren?' },
  ]),
  cs('c135', 'Sie erklärt den Gästen die Regeln.', 2, [
    { surface: 'den Gästen', label: 'den Gästen', caseId: 'dat', probe: 'Wem erklärt sie die Regeln?' },
    { surface: 'die Regeln', label: 'die Regeln', caseId: 'akk', probe: 'Wen oder was erklärt sie den Gästen?' },
  ]),
  cs('c136', 'Tom gibt seiner Cousine den Film.', 2, [
    { surface: 'seiner Cousine', label: 'seiner Cousine', caseId: 'dat', probe: 'Wem gibt Tom den Film?' },
    { surface: 'den Film', label: 'den Film', caseId: 'akk', probe: 'Wen oder was gibt Tom seiner Cousine?' },
  ]),
  cs('c137', 'Die Oma backt dem Enkel einen Kuchen.', 2, [
    { surface: 'dem Enkel', label: 'dem Enkel', caseId: 'dat', probe: 'Wem backt die Oma einen Kuchen?' },
    { surface: 'einen Kuchen', label: 'einen Kuchen', caseId: 'akk', probe: 'Wen oder was backt die Oma dem Enkel?' },
  ]),
  cs('c138', 'Der Direktor schenkt der Klasse Papier.', 2, [
    { surface: 'der Klasse', label: 'der Klasse', caseId: 'dat', probe: 'Wem schenkt der Direktor Papier?' },
    { surface: 'Papier', label: 'Papier', caseId: 'akk', probe: 'Wen oder was schenkt der Direktor der Klasse?' },
  ]),
  cs('c139', 'Mama schenkt dem Vater Kaffee.', 1, [
    { surface: 'dem Vater', label: 'dem Vater', caseId: 'dat', probe: 'Wem schenkt Mama Kaffee?' },
    { surface: 'Kaffee', label: 'Kaffee', caseId: 'akk', probe: 'Wen oder was schenkt Mama dem Vater?' },
  ]),
  cs('c140', 'Lea gibt dem Kunden die Rechnung.', 2, [
    { surface: 'dem Kunden', label: 'dem Kunden', caseId: 'dat', probe: 'Wem gibt Lea die Rechnung?' },
    { surface: 'die Rechnung', label: 'die Rechnung', caseId: 'akk', probe: 'Wen oder was gibt Lea dem Kunden?' },
  ]),
  cs('c141', 'Der Guide zeigt den Touristen die Karte.', 2, [
    { surface: 'den Touristen', label: 'den Touristen', caseId: 'dat', probe: 'Wem zeigt der Guide die Karte?' },
    { surface: 'die Karte', label: 'die Karte', caseId: 'akk', probe: 'Wen oder was zeigt der Guide den Touristen?' },
  ]),
  cs('c142', 'Jonas kauft seinem Bruder Eis.', 1, [
    { surface: 'seinem Bruder', label: 'seinem Bruder', caseId: 'dat', probe: 'Wem kauft Jonas Eis?' },
    { surface: 'Eis', label: 'Eis', caseId: 'akk', probe: 'Wen oder was kauft Jonas seinem Bruder?' },
  ]),
  cs('c143', 'Die Schwester bringt der Mutter Tee.', 1, [
    { surface: 'der Mutter', label: 'der Mutter', caseId: 'dat', probe: 'Wem bringt die Schwester Tee?' },
    { surface: 'Tee', label: 'Tee', caseId: 'akk', probe: 'Wen oder was bringt die Schwester der Mutter?' },
  ]),
  cs('c144', 'Herr Braun erklärt den Schülern die Formel.', 3, [
    { surface: 'den Schülern', label: 'den Schülern', caseId: 'dat', probe: 'Wem erklärt Herr Braun die Formel?' },
    { surface: 'die Formel', label: 'die Formel', caseId: 'akk', probe: 'Wen oder was erklärt Herr Braun den Schülern?' },
  ]),
  cs('c145', 'Sofia schreibt ihrer Freundin einen Text.', 2, [
    { surface: 'ihrer Freundin', label: 'ihrer Freundin', caseId: 'dat', probe: 'Wem schreibt Sofia einen Text?' },
    { surface: 'einen Text', label: 'einen Text', caseId: 'akk', probe: 'Wen oder was schreibt Sofia ihrer Freundin?' },
  ]),
  cs('c146', 'Der Postbote bringt uns die Pakete.', 2, [
    { surface: 'uns', label: 'uns', caseId: 'dat', probe: 'Wem bringt der Postbote die Pakete?' },
    { surface: 'die Pakete', label: 'die Pakete', caseId: 'akk', probe: 'Wen oder was bringt der Postbote uns?' },
  ]),
  cs('c147', 'Die Künstlerin verkauft dem Mann ein Bild.', 2, [
    { surface: 'dem Mann', label: 'dem Mann', caseId: 'dat', probe: 'Wem verkauft die Künstlerin ein Bild?' },
    { surface: 'ein Bild', label: 'ein Bild', caseId: 'akk', probe: 'Wen oder was verkauft die Künstlerin dem Mann?' },
  ]),
  cs('c148', 'Paul liest der Gruppe die Lösung vor.', 2, [
    { surface: 'der Gruppe', label: 'der Gruppe', caseId: 'dat', probe: 'Wem liest Paul die Lösung vor?' },
    { surface: 'die Lösung', label: 'die Lösung', caseId: 'akk', probe: 'Wen oder was liest Paul der Gruppe vor?' },
  ]),
  cs('c149', 'Die Verkäuferin gibt mir das Wechselgeld.', 2, [
    { surface: 'mir', label: 'mir', caseId: 'dat', probe: 'Wem gibt die Verkäuferin das Wechselgeld?' },
    { surface: 'das Wechselgeld', label: 'das Wechselgeld', caseId: 'akk', probe: 'Wen oder was gibt die Verkäuferin mir?' },
  ]),
  cs('c150', 'Tim schenkt seiner Schwester einen Korb.', 1, [
    { surface: 'seiner Schwester', label: 'seiner Schwester', caseId: 'dat', probe: 'Wem schenkt Tim einen Korb?' },
    { surface: 'einen Korb', label: 'einen Korb', caseId: 'akk', probe: 'Wen oder was schenkt Tim seiner Schwester?' },
  ]),
  cs('c151', 'Die Ärztin verschreibt dem Jungen Salbe.', 2, [
    { surface: 'dem Jungen', label: 'dem Jungen', caseId: 'dat', probe: 'Wem verschreibt die Ärztin Salbe?' },
    { surface: 'Salbe', label: 'Salbe', caseId: 'akk', probe: 'Wen oder was verschreibt die Ärztin dem Jungen?' },
  ]),
  cs('c152', 'Wir geben euch den Tipp.', 2, [
    { surface: 'euch', label: 'euch', caseId: 'dat', probe: 'Wem geben wir den Tipp?' },
    { surface: 'den Tipp', label: 'den Tipp', caseId: 'akk', probe: 'Wen oder was geben wir euch?' },
  ]),
]
templates.push(...dualMore)

for (const [id, sentence, surface, caseId, probe, difficulty] of more) {
  templates.push(
    cs(id, sentence, /** @type {1|2|3} */ (difficulty), [
      {
        surface: surface.startsWith('die ') || surface.startsWith('der ') || surface.startsWith('dem ') || surface.startsWith('den ') || surface.startsWith('des ') || surface.startsWith('ein ')
          ? surface
          : surface,
        label: surface.charAt(0).toLowerCase() + surface.slice(1).replace(/^Die /, 'die ').replace(/^Der /, 'der ').replace(/^Ein /, 'ein '),
        caseId,
        probe,
      },
    ]),
  )
}

// Fix labels for nom targets that are proper sentences
for (const item of templates) {
  for (const t of item.targets) {
    if (t.caseId === 'nom' && /^[A-Z]/.test(t.surface)) {
      const parts = t.surface.split(' ')
      if (parts.length >= 2) t.label = `${parts[0].toLowerCase()} ${parts.slice(1).join(' ')}`
    }
    if (t.surface === 'Die Biene') t.label = 'die Biene'
    if (t.surface === 'Die Flöte') t.label = 'die Flöte'
    if (t.surface === 'Die Rose') t.label = 'die Rose'
    if (t.surface === 'Der Himmel') t.label = 'der Himmel'
    if (t.surface === 'Der Sturm') t.label = 'der Sturm'
    if (t.surface === 'Der Ball') t.label = 'der Ball'
    if (t.surface === 'Ein Hund') t.label = 'ein Hund'
    if (t.surface === 'Ein Pferd') t.label = 'ein Pferd'
    if (t.surface === 'Ein Fuchs') t.label = 'ein Fuchs'
    if (t.surface === 'Ein Schiff') t.label = 'ein Schiff'
    if (t.surface === 'Ein Vogel') t.label = 'ein Vogel'
  }
}

export const casesExtra = templates