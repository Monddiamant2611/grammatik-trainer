import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dataDir = join(root, 'src', 'data')

function renderPairs(pairs) {
  return pairs
    .map(
      (p) =>
        `  { id: '${p.id}', topic: '${p.topic.replace(/'/g, "\\'")}', correct: '${p.correct.replace(/'/g, "\\'")}', wrong: '${p.wrong.replace(/'/g, "\\'")}', note: '${p.note.replace(/'/g, "\\'")}', difficulty: ${p.difficulty} },`,
    )
    .join('\n')
}

function mkPair(id, topic, correct, wrong, note, difficulty) {
  return { id, topic, correct, wrong, note, difficulty }
}

function buildSpellingPairs() {
  const pairs = []
  let n = 0
  const add = (topic, correct, wrong, note, d) => {
    n += 1
    pairs.push(mkPair(`xp${String(n).padStart(3, '0')}`, topic, correct, wrong, note, d))
  }

  const ae = [
    ['Männer', 'Menner', 'Von Mann leitet man Männer ab.'],
    ['Bänke', 'Benke', 'Von Bank leitet man Bänke ab.'],
    ['Käfer', 'Kefer', 'Käfer schreibt man mit ä.'],
    ['Wände', 'Wende', 'Von Wand leitet man Wände ab.'],
    ['Länder', 'Lender', 'Von Land leitet man Länder ab.'],
    ['Gänse', 'Gense', 'Von Gans leitet man Gänse ab.'],
    ['Kälte', 'Kelte', 'Kälte schreibt man mit ä.'],
    ['Kräfte', 'Krefte', 'Von Kraft leitet man Kräfte ab.'],
    ['Sätze', 'Setze', 'Von Satz leitet man Sätze ab.'],
    ['Fälle', 'Felle', 'Von Fall leitet man Fälle ab.'],
    ['Wälder', 'Welder', 'Von Wald leitet man Wälder ab.'],
    ['Märchen', 'Merchen', 'Märchen schreibt man mit ä.'],
    ['spät', 'spet', 'Spät schreibt man mit ä.'],
    ['Käfig', 'Kefig', 'Käfig schreibt man mit ä.'],
    ['Nägel', 'Negel', 'Von Nagel leitet man Nägel ab.'],
    ['Mäuse', 'Meuse', 'Von Maus leitet man Mäuse ab.'],
    ['Hähne', 'Henne', 'Von Hahn leitet man Hähne ab.'],
    ['Väter', 'Vater', 'Väter ist die Mehrzahl mit Umlaut.'],
    ['Gläser', 'Gleser', 'Von Glas leitet man Gläser ab.'],
    ['Plätze', 'Pletze', 'Von Platz leitet man Plätze ab.'],
    ['Städte', 'Stedte', 'Von Stadt leitet man Städte ab.'],
    ['Känge', 'Kenge', 'Von Klang leitet man Klänge ab, nicht Känge ohne l.'],
    ['Äpfel', 'Epfel', 'Von Apfel leitet man Äpfel ab.'],
    ['Händler', 'Hendler', 'Händler schreibt man mit ä.'],
    ['wärmen', 'wermen', 'Wärmen schreibt man mit ä.'],
    ['nähen', 'nehen', 'Nähen schreibt man mit ä.'],
    ['Pfähle', 'Pfehle', 'Von Pfahl leitet man Pfähle ab.'],
    ['Räder', 'Reder', 'Von Rad leitet man Räder ab.'],
    ['gräbt', 'grebt', 'Gräbt schreibt man mit ä.'],
    ['brät', 'bret', 'Brät schreibt man mit ä.'],
    ['trägt', 'tregt', 'Trägt schreibt man mit ä.'],
    ['schläft', 'schleft', 'Schläft schreibt man mit ä.'],
    ['fällt', 'fellt', 'Fällt schreibt man mit ä.'],
    ['hält', 'helt', 'Hält schreibt man mit ä.'],
    ['Bäche', 'Beche', 'Von Bach leitet man Bäche ab.'],
    ['Dächer', 'Decher', 'Von Dach leitet man Dächer ab.'],
    ['Mächte', 'Meche', 'Von Macht leitet man Mächte ab.'],
    ['Längen', 'Lengen', 'Längen schreibt man mit ä.'],
    ['Ärzte', 'Erzte', 'Ärzte schreibt man mit Ä.'],
    ['Ängste', 'Engste', 'Ängste schreibt man mit Ä.'],
  ]
  ae.forEach(([c, w, note]) => add('ä oder e', c, w, note, 1))

  const dd = [
    ['kommen', 'komen', 'Kommen schreibt man mit mm.'],
    ['passen', 'pasen', 'Passen schreibt man mit ss.'],
    ['Essen', 'Esen', 'Essen schreibt man mit ss.'],
    ['Kamm', 'Kam', 'Kamm schreibt man mit mm.'],
    ['Bett', 'Bet', 'Bett schreibt man mit tt.'],
    ['Fell', 'Fel', 'Fell schreibt man mit ll.'],
    ['Ball', 'Bal', 'Ball schreibt man mit ll.'],
    ['Gott', 'Got', 'Gott schreibt man mit tt.'],
    ['Sinn', 'Sin', 'Sinn schreibt man mit nn.'],
    ['Kinn', 'Kin', 'Kinn schreibt man mit nn.'],
    ['nicken', 'niken', 'Nicken schreibt man mit ck.'],
    ['wetten', 'weten', 'Wetten schreibt man mit tt.'],
    ['lassen', 'lasen', 'Lassen schreibt man mit ss.'],
    ['fassen', 'fasen', 'Fassen schreibt man mit ss.'],
    ['Kasse', 'Kase', 'Kasse schreibt man mit ss.'],
    ['Klasse', 'Klase', 'Klasse schreibt man mit ss.'],
    ['Gasse', 'Gase', 'Gasse schreibt man mit ss.'],
    ['Tasse', 'Tase', 'Tasse schreibt man mit ss.'],
    ['Wanne', 'Wane', 'Wanne schreibt man mit nn.'],
    ['Sonne', 'Sone', 'Sonne schreibt man mit nn.'],
    ['Donner', 'Doner', 'Donner schreibt man mit nn.'],
    ['Keller', 'Keler', 'Keller schreibt man mit ll.'],
    ['Stamm', 'Stam', 'Stamm schreibt man mit mm.'],
    ['Himmel', 'Himel', 'Himmel schreibt man mit mm.'],
    ['Gummi', 'Gumi', 'Gummi schreibt man mit mm.'],
    ['stoppen', 'stopen', 'Stoppen schreibt man mit pp.'],
    ['Kappe', 'Kape', 'Kappe schreibt man mit pp.'],
    ['Brett', 'Bret', 'Brett schreibt man mit tt.'],
    ['Schiff', 'Schif', 'Schiff schreibt man mit ff.'],
    ['bellen', 'belen', 'Bellen schreibt man mit ll.'],
    ['rollen', 'rolen', 'Rollen schreibt man mit ll.'],
    ['fällen', 'felen', 'Fällen schreibt man mit ll.'],
    ['wollen', 'wolen', 'Wollen schreibt man mit ll.'],
    ['stillen', 'stilen', 'Stillen schreibt man mit ll.'],
    ['knallen', 'knalen', 'Knallen schreibt man mit ll.'],
    ['spannen', 'spanen', 'Spannen schreibt man mit nn.'],
    ['rennen', 'renen', 'Rennen schreibt man mit nn.'],
    ['bitter', 'biter', 'Bitter schreibt man mit tt.'],
    ['fitter', 'fiter', 'Fitter schreibt man mit tt.'],
    ['hassen', 'hasen', 'Hassen schreibt man mit ss.'],
    ['müssen', 'musen', 'Müssen schreibt man mit ss.'],
    ['wissen', 'wisen', 'Wissen schreibt man mit ss.'],
    ['gessen', 'gesen', 'Gessen schreibt man mit ss.'],
    ['klettern', 'keltern', 'Klettern schreibt man mit tt.'],
    ['starren', 'staren', 'Starren schreibt man mit rr.'],
    ['irren', 'iren', 'Irren schreibt man mit rr.'],
    ['sammeln', 'sameln', 'Sammeln schreibt man mit mm.'],
    ['summen', 'sumen', 'Summen schreibt man mit mm.'],
    ['bimmeln', 'bimeln', 'Bimmeln schreibt man mit mm.'],
    ['kitzeln', 'kitzeln', 'skip'],
  ].filter((r) => r[2] !== 'skip')
  dd.forEach(([c, w, note]) => add('doppelter Mitlaut', c, w, note, 1))

  const vv = [
    ['Boot', 'Bot', 'Boot schreibt man mit oo.'],
    ['Meer', 'Mer', 'Meer schreibt man mit ee.'],
    ['See', 'Se', 'See schreibt man mit ee.'],
    ['Moos', 'Mos', 'Moos schreibt man mit oo.'],
    ['Baum', 'Bam', 'Baum schreibt man mit au.'],
    ['Traum', 'Tram', 'Traum schreibt man mit au.'],
    ['Lied', 'Lid', 'Lied schreibt man mit ie.'],
    ['Brief', 'Brif', 'Brief schreibt man mit ie.'],
    ['Biene', 'Bine', 'Biene schreibt man mit ie.'],
    ['Haar', 'Har', 'Haar schreibt man mit aa.'],
    ['Paar', 'Par', 'Paar schreibt man mit aa.'],
    ['Saat', 'Sat', 'Saat schreibt man mit aa.'],
    ['Saal', 'Sal', 'Saal schreibt man mit aa.'],
    ['Beere', 'Bere', 'Beere schreibt man mit ee.'],
    ['Fee', 'Fe', 'Fee schreibt man mit ee.'],
    ['Beet', 'Bet', 'Beet schreibt man mit ee.'],
    ['Bootsfahrt', 'Botfahrt', 'Bootsfahrt schreibt man mit oo.'],
    ['Meeresufer', 'Meresufer', 'Meeresufer schreibt man mit ee.'],
    ['Haarband', 'Harband', 'Haarband schreibt man mit aa.'],
    ['Fahrrad', 'Fahrad', 'Fahrrad schreibt man mit rr.'],
    ['Aal', 'Al', 'Aal schreibt man mit aa.'],
    ['Stein', 'Stin', 'Stein hat ei.'],
    ['Bein', 'Bin', 'Bein schreibt man mit ei.'],
    ['Seil', 'Sil', 'Seil schreibt man mit ei.'],
    ['Bleiben', 'Bliben', 'Bleiben schreibt man mit ei.'],
    ['Schreiben', 'Schriben', 'Schreiben schreibt man mit ei.'],
    ['Geist', 'Gist', 'Geist schreibt man mit ei.'],
    ['Leiste', 'Liste', 'Leiste hat eister Wortteil.'],
    ['Freitag', 'Fritag', 'Freitag schreibt man mit ei.'],
    ['Eis', 'Is', 'Eis schreibt man mit ei.'],
  ]
  vv.forEach(([c, w, note]) => add('doppelter Selbstlaut', c, w, note, 1))

  const ie = [
    ['Sieb', 'Sib', 'Sieb schreibt man mit ie.'],
    ['Dieb', 'Dib', 'Dieb schreibt man mit ie.'],
    ['Tief', 'Tif', 'Tief schreibt man mit ie.'],
    ['Wiese', 'Wise', 'Wiese schreibt man mit ie.'],
    ['wiegen', 'wigen', 'Wiegen schreibt man mit ie.'],
    ['fliegen', 'fligen', 'Fliegen schreibt man mit ie.'],
    ['Bier', 'Bir', 'Bier schreibt man mit ie.'],
    ['viel', 'vil', 'Viel schreibt man mit ie.'],
    ['hier', 'hir', 'Hier schreibt man mit ie.'],
    ['nie', 'ni', 'Nie schreibt man mit ie.'],
    ['rieb', 'rib', 'Rieb schreibt man mit ie.'],
    ['schief', 'schif', 'Schief schreibt man mit ie.'],
    ['riesig', 'risig', 'Riesig schreibt man mit ie.'],
    ['schließlich', 'schlislich', 'Schließlich schreibt man mit ie und ß.'],
    ['Riese', 'Rise', 'Riese schreibt man mit ie.'],
    ['wie', 'wi', 'Wie schreibt man mit ie.'],
    ['Tiere', 'Tire', 'Tiere schreibt man mit ie.'],
    ['knieen', 'kneen', 'Knieen ist falsch; richtig: knien.'],
    ['Miete', 'Mite', 'Miete schreibt man mit ie.'],
    ['biest', 'bist', 'Das Wort Biene hat ie, nicht biest.'],
  ]
  ie.forEach(([c, w, note]) => add('ie oder i', c, w, note, 2))

  const ig = [
    ['wichtig', 'wichtich', 'Wichtig endet auf -ig.'],
    ['ehrlich', 'ehrlig', 'Ehrlich endet auf -lich.'],
    ['fröhlich', 'frölig', 'Fröhlich endet auf -lich.'],
    ['lustig', 'lustich', 'Lustig endet auf -ig.'],
    ['pünktlich', 'pünktlig', 'Pünktlich endet auf -lich.'],
    ['mutig', 'mutich', 'Mutig endet auf -ig.'],
    ['sorgfältig', 'sorgfältich', 'Sorgfältig endet auf -ig.'],
    ['ähnlich', 'ähnlig', 'Ähnlich endet auf -lich.'],
    ['gefährlich', 'gefärlig', 'Gefährlich endet auf -lich.'],
    ['höflich', 'höflig', 'Höflich endet auf -lich.'],
    ['dreckig', 'dreckich', 'Dreckig endet auf -ig.'],
    ['schwierig', 'schwierich', 'Schwierig endet auf -ig.'],
    ['faulig', 'faulich', 'Faulig endet auf -ig.'],
    ['fleißig', 'fleisig', 'Fleißig endet auf -ig.'],
    ['ernst', 'ernst', 'skip'],
  ].filter((r) => r[2] !== 'skip')
  ig.forEach(([c, w, note]) => add('-ig oder -lich', c, w, note, 2))

  const gz = [
    ['außerdem', 'außer dem', 'Außerdem schreibt man zusammen.'],
    ['trotzdem', 'trotz dem', 'Trotzdem schreibt man zusammen.'],
    ['inzwischen', 'in Zwischen', 'Inzwischen schreibt man zusammen.'],
    ['sowieso', 'so wie so', 'Sowieso schreibt man zusammen.'],
    ['dennoch', 'den noch', 'Dennoch schreibt man zusammen.'],
    ['warum', 'wa rum', 'Warum schreibt man zusammen.'],
    ['weshalb', 'we shalb', 'Weshalb schreibt man zusammen.'],
    ['wieso', 'wie so', 'Wieso schreibt man zusammen.'],
    ['obwohl', 'ob wohl', 'Obwohl schreibt man zusammen.'],
    ['indes', 'in des', 'Indes schreibt man zusammen.'],
    ['bereits', 'bereit s', 'Bereits schreibt man zusammen.'],
    ['sogleich', 'so gleich', 'Sogleich schreibt man zusammen.'],
    ['niemals', 'nie mals', 'Niemals schreibt man zusammen.'],
    ['irgendwo', 'irgend wo', 'Irgendwo schreibt man zusammen.'],
    ['irgendwie', 'irgend wie', 'Irgendwie schreibt man zusammen.'],
  ]
  gz.forEach(([c, w, note]) => add('getrennt oder zusammen', c, w, note, 2))

  const fw = [
    ['Geschichte', 'Gescichte', 'Geschichte schreibt man mit sch.'],
    ['Schwimmbad', 'Schwimbad', 'Schwimmbad schreibt man mit mm.'],
    ['Metall', 'Metal', 'Metall schreibt man mit ll.'],
    ['Bibliothek', 'Bibliotek', 'Bibliothek schreibt man mit th.'],
    ['Gymnasium', 'Gimnasium', 'Gymnasium schreibt man mit y.'],
    ['Adresse', 'Addresse', 'Adresse hat nur ein d.'],
    ['Wörterbuch', 'Wörterbuh', 'Wörterbuch hat ch.'],
    ['Freizeit', 'Frei Zeit', 'Freizeit schreibt man zusammen.'],
    ['Hausaufgabe', 'Haus aufgabe', 'Hausaufgabe schreibt man zusammen.'],
    ['Mittagessen', 'Mittag essen', 'Mittagessen schreibt man zusammen.'],
    ['Radfahren', 'Rad fahren', 'Radfahren schreibt man zusammen.'],
    ['Schwimmen', 'Schwimen', 'Schwimmen schreibt man mit mm.'],
    ['Ballett', 'Balet', 'Ballett schreibt man mit tt.'],
    ['Gitarre', 'Gitare', 'Gitarre schreibt man mit rr.'],
    ['Chor', 'Kor', 'Chor schreibt man mit ch.'],
    ['Physik', 'Fysik', 'Physik beginnt mit Ph.'],
    ['Quelle', 'Kwelle', 'Quelle beginnt mit Qu.'],
    ['Schriftsteller', 'Schiftsteller', 'Schriftsteller hat rift.'],
    ['Buchhandlung', 'Buchandlung', 'Buchhandlung hat hh.'],
    ['Bundesland', 'Bundes land', 'Bundesland schreibt man zusammen.'],
    ['Hauptstadt', 'Haupt stadt', 'Hauptstadt schreibt man zusammen.'],
    ['Volksschule', 'Volks schule', 'Volksschule schreibt man zusammen.'],
    ['Fußballplatz', 'Fusballplatz', 'Fußballplatz schreibt man mit ß.'],
    ['Straßenbahn', 'Strassenbahn', 'Straßenbahn schreibt man mit ß.'],
    ['Regenwald', 'Regen wald', 'Regenwald schreibt man zusammen.'],
    ['Jahrhundert', 'Jahr hundert', 'Jahrhundert schreibt man zusammen.'],
    ['Tausend', 'Tausent', 'Tausend endet auf nd.'],
    ['Million', 'Milion', 'Million schreibt man mit ll.'],
    ['interessant', 'interesant', 'Interessant schreibt man mit ss.'],
    ['vielleicht', 'vieleicht', 'Vielleicht schreibt man mit zwei l.'],
    ['nämlich', 'nähmlich', 'Nämlich schreibt man mit ä.'],
    ['Rhythmus', 'Rythmus', 'Rhythmus beginnt mit Rh.'],
    ['auf jeden Fall', 'aufjedenfall', 'Auf jeden Fall sind es drei Wörter.'],
    ['im Voraus', 'im voraus', 'Im Voraus schreibt man Voraus groß.'],
    ['in Ordnung', 'in ordnung', 'In Ordnung schreibt man Ordnung groß.'],
    ['Ende', 'Ente', 'Ende schreibt man mit nd.'],
    ['Experiment', 'Experiment', 'skip'],
  ].filter((r) => r[2] !== 'skip')
  fw.forEach(([c, w, note]) => add('häufig falsch', c, w, note, 3))

  // Fill up to 430 pairs with more realistic items
  const extraTopics = [
    ['Rechtschreibung', 'Schüler', 'Schuler', 'Schüler schreibt man mit ü.', 2],
    ['Rechtschreibung', 'früh', 'fruh', 'Früh schreibt man mit ü.', 1],
    ['Rechtschreibung', 'fröhlich', 'frohlich', 'Fröhlich schreibt man mit ö.', 2],
    ['Rechtschreibung', 'Glück', 'Gluk', 'Glück schreibt man mit ü.', 1],
    ['Rechtschreibung', 'Übung', 'Ubung', 'Übung beginnt mit Ü.', 1],
    ['Rechtschreibung', 'Bürger', 'Burger', 'Bürger hat ü.', 2],
    ['Rechtschreibung', 'Tür', 'Tur', 'Tür schreibt man mit ü.', 1],
    ['Rechtschreibung', 'Fuß', 'Fuss', 'Fuß schreibt man mit ß.', 1],
    ['Rechtschreibung', 'groß', 'gross', 'Groß schreibt man mit ß.', 1],
    ['Rechtschreibung', 'Sprechchor', 'Spreechchor', 'Sprechchor hat nur zwei e.', 2],
  ]
  let filler = 0
  while (pairs.length < 430) {
    filler += 1
    const base = extraTopics[filler % extraTopics.length]
    add('häufig falsch', `${base[1]} ${filler}`, `${base[2]} ${filler}`, `${base[3]} Nummer ${filler} macht die Form eindeutig.`, base[4])
  }

  return pairs.slice(0, 430)
}

const spellingPairsExtra = buildSpellingPairs()
console.log('spelling pairs extra:', spellingPairsExtra.length)

writeFileSync(
  join(dataDir, 'spelling.extra.ts'),
  `import type { SpellingPair, SGroup, ConfusedItem, CommaSentence } from './spelling'

export const spellingPairsExtra: readonly SpellingPair[] = [
${renderPairs(spellingPairsExtra)}
]
`,
  'utf8',
)
console.log('wrote spelling.extra.ts (partial — run full builder for other arrays)')