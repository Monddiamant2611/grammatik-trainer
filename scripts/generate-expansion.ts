/**
 * Generates src/data/*.extra.ts expansion files. Run: npx tsx scripts/generate-expansion.ts
 */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..', 'src', 'data')

function write(name: string, body: string) {
  writeFileSync(join(root, name), body, 'utf8')
  console.log('wrote', name)
}

// --- SPELLING ---
function genSpellingExtra(): string {
  type P = { id: string; topic: string; correct: string; wrong: string; note: string; difficulty: 1 | 2 | 3 }
  const pairs: P[] = []

  const add = (topic: string, items: [string, string, string][], diff: 1 | 2 | 3, prefix: string) => {
    items.forEach(([correct, wrong, note], i) => {
      pairs.push({ id: `${prefix}${String(i + 1).padStart(2, '0')}`, topic, correct, wrong, note, difficulty: diff })
    })
  }

  add('ä oder e', [
    ['Männer', 'Menner', 'Von Mann leitet man Männer ab. Deshalb steht ä.'],
    ['Bänke', 'Benke', 'Von Bank leitet man Bänke ab.'],
    ['Käfer', 'Kefer', 'Käfer schreibt man mit ä.'],
    ['Wände', 'Wende', 'Von Wand leitet man Wände ab.'],
    ['Länder', 'Lender', 'Von Land leitet man Länder ab.'],
    ['Pfanne', 'Pfene', 'Pfanne schreibt man mit ä.'],
    ['Gänse', 'Gense', 'Von Gans leitet man Gänse ab.'],
    ['Hände', 'Hende', 'Von Hand leitet man Hände ab.'],
    ['Kälte', 'Kelte', 'Kälte schreibt man mit ä.'],
    ['Kräfte', 'Krefte', 'Von Kraft leitet man Kräfte ab.'],
    ['Sätze', 'Setze', 'Von Satz leitet man Sätze ab.'],
    ['Fälle', 'Felle', 'Von Fall leitet man Fälle ab.'],
    ['Wälder', 'Welder', 'Von Wald leitet man Wälder ab.'],
    ['Käse', 'Kese', 'Käse schreibt man mit ä.'],
    ['März', 'Merz', 'Der Monat März schreibt man mit ä.'],
    ['Bär', 'Ber', 'Bär schreibt man mit ä.'],
    ['Märchen', 'Merchen', 'Märchen schreibt man mit ä.'],
    ['spät', 'spet', 'Spät schreibt man mit ä.'],
    ['Käfig', 'Kefig', 'Käfig schreibt man mit ä.'],
    ['kämmen', 'kemmen', 'Kämmen schreibt man mit ä.'],
    ['Nägel', 'Negel', 'Von Nagel leitet man Nägel ab.'],
    ['Mäuse', 'Meuse', 'Von Maus leitet man Mäuse ab.'],
    ['Hähne', 'Hahne', 'Von Hahn leitet man Hähne ab.'],
    ['Väter', 'Vater', 'Von Vater leitet man Väter ab.'],
    ['bräunlich', 'breunlich', 'Bräunlich schreibt man mit ä.'],
    ['Gläser', 'Gleser', 'Von Glas leitet man Gläser ab.'],
    ['Plätze', 'Pletze', 'Von Platz leitet man Plätze ab.'],
    ['Städte', 'Stedte', 'Von Stadt leitet man Städte ab.'],
    ['gräbt', 'grebt', 'Gräbt schreibt man mit ä.'],
    ['brät', 'bret', 'Brät schreibt man mit ä.'],
  ], 1, 'xae')

  add('doppelter Mitlaut', [
    ['passen', 'pasen', 'Nach dem kurzen Vokal in passen steht ss.'],
    ['müssen', 'musen', 'Müssen schreibt man mit ss nach kurzem ü.'],
    ['Essen', 'Esen', 'Essen schreibt man mit ss.'],
    ['Kamm', 'Kam', 'Kamm schreibt man mit mm.'],
    ['Bett', 'Bet', 'Bett schreibt man mit tt.'],
    ['Fell', 'Fel', 'Fell schreibt man mit ll.'],
    ['Ball', 'Bal', 'Ball schreibt man mit ll.'],
    ['Gott', 'Got', 'Gott schreibt man mit tt.'],
    ['Sinn', 'Sin', 'Sinn schreibt man mit nn.'],
    ['Kinn', 'Kin', 'Kinn schreibt man mit nn.'],
    ['packen', 'paken', 'Packen schreibt man mit ck und kurzem a.'],
    ['nicken', 'niken', 'Nicken schreibt man mit ck.'],
    ['wetten', 'weten', 'Wetten schreibt man mit tt.'],
    ['hatten', 'haten', 'Hatten schreibt man mit tt.'],
    ['lassen', 'lasen', 'Lassen schreibt man mit ss.'],
    ['fassen', 'fasen', 'Fassen schreibt man mit ss.'],
    ['Kasse', 'Kase', 'Kasse schreibt man mit ss.'],
    ['Klasse', 'Klase', 'Klasse schreibt man mit ss.'],
    ['Gasse', 'Gase', 'Gasse schreibt man mit ss.'],
    ['Tasse', 'Tase', 'Tasse schreibt man mit ss.'],
    ['Wanne', 'Wane', 'Wanne schreibt man mit nn.'],
    ['Sonne', 'Sone', 'Sonne schreibt man mit nn.'],
    ['Donner', 'Doner', 'Donner schreibt man mit nn.'],
    ['Sommer', 'Somer', 'Sommer schreibt man mit mm.'],
    ['Winter', 'Winer', 'Winter schreibt man mit nn im Wortinnern.'],
    ['Keller', 'Keler', 'Keller schreibt man mit ll.'],
    ['Koffer', 'Kofer', 'Koffer schreibt man mit ff.'],
    ['Affe', 'Afe', 'Affe schreibt man mit ff.'],
    ['Stamm', 'Stam', 'Stamm schreibt man mit mm.'],
    ['Himmel', 'Himel', 'Himmel schreibt man mit mm.'],
    ['Kamm', 'Kam', 'Kamm schreibt man mit mm.'],
    ['Gummi', 'Gumi', 'Gummi schreibt man mit mm.'],
    ['Pflanze', 'Pflanze', 'Pflanze hat ein z, kein s am Ende der Silbe.'],
    ['ritteln', 'riteln', 'Ritteln schreibt man mit tt.'],
    ['stoppen', 'stopen', 'Stoppen schreibt man mit pp.'],
    ['Kappe', 'Kape', 'Kappe schreibt man mit pp.'],
    ['Brett', 'Bret', 'Brett schreibt man mit tt.'],
    ['Schiff', 'Schif', 'Schiff schreibt man mit ff.'],
    ['Krall', 'Kral', 'Krall schreibt man mit ll.'],
    ['bellen', 'belen', 'Bellen schreibt man mit ll.'],
    ['rollen', 'rolen', 'Rollen schreibt man mit ll.'],
  ], 1, 'xdd')

  // fix duplicate Kamm in list - replace last Kamm entry
  const kammIdx = pairs.findIndex((p) => p.id === 'xdd30' && p.correct === 'Kamm')
  if (kammIdx >= 0) pairs[kammIdx] = { id: 'xdd30', topic: 'doppelter Mitlaut', correct: 'Drama', wrong: 'Drama', note: 'skip', difficulty: 1 }
  pairs.splice(pairs.findIndex((p) => p.note === 'skip'), 1)
  pairs.push({ id: 'xdd30', topic: 'doppelter Mitlaut', correct: 'Stille', wrong: 'Stile', note: 'Stille schreibt man mit ll.', difficulty: 1 })

  add('doppelter Selbstlaut', [
    ['Boot', 'Bot', 'Boot schreibt man mit oo.'],
    ['Meer', 'Mer', 'Meer schreibt man mit ee.'],
    ['See', 'Se', 'See schreibt man mit ee.'],
    ['Tor', 'Tor', 'Tor hat nur ein o – falsch: Toor'],
    ['Moos', 'Mos', 'Moos schreibt man mit oo.'],
    ['Floh', 'Flo', 'Floh hat nur ein o.'],
    ['Laub', 'Laub', 'Laub hat au.'],
    ['Tau', 'Tau', 'Tau hat au.'],
    ['Haus', 'Haus', 'Haus hat au.'],
    ['Baum', 'Bam', 'Baum schreibt man mit au.'],
    ['Traum', 'Tram', 'Traum schreibt man mit au.'],
    ['Lied', 'Lid', 'Lied schreibt man mit ie.'],
    ['Brief', 'Brif', 'Brief schreibt man mit ie.'],
    ['Biene', 'Bine', 'Biene schreibt man mit ie.'],
    ['Vieh', 'Vih', 'Vieh schreibt man mit ie.'],
    ['schießen', 'schissen', 'Schießen schreibt man mit ie.'],
    ['Tür', 'Tur', 'Tür schreibt man mit ü.'],
    ['früh', 'fruh', 'Früh schreibt man mit ü.'],
    ['grün', 'grun', 'Grün schreibt man mit ü.'],
    ['Blüte', 'Blute', 'Blüte schreibt man mit ü.'],
    ['Fuß', 'Fus', 'Fuß schreibt man mit ß.'],
    ['Groß', 'Gros', 'Groß schreibt man mit ß.'],
    ['Straße', 'Strasse', 'Straße schreibt man mit ß.'],
    ['heißen', 'heissen', 'Heißen schreibt man mit ß.'],
    ['müssen', 'mussen', 'Müssen schreibt man mit ü und ss.'],
    ['Fahrrad', 'Fahrad', 'Fahrrad schreibt man mit rr.'],
    ['Aal', 'Al', 'Aal schreibt man mit aa.'],
    ['Saft', 'Saft', 'Saft hat nur ein a.'],
    ['Team', 'Team', 'Team ist Fremdwort mit ea.'],
    ['Ideal', 'Ideal', 'Ideal schreibt man mit ea.'],
    ['Bootsfahrt', 'Botfahrt', 'Bootsfahrt schreibt man mit oo.'],
    ['Seerose', 'Serose', 'Seerose schreibt man mit ee.'],
    ['Beet', 'Bet', 'Beet schreibt man mit ee.'],
    ['Käse', 'Kese', 'Käse schreibt man mit ä.'],
    ['Fee', 'Fe', 'Fee schreibt man mit ee.'],
    ['Bootshaus', 'Botshaus', 'Bootshaus schreibt man mit oo.'],
    ['Meeresufer', 'Meresufer', 'Meeresufer schreibt man mit ee.'],
    ['Haarband', 'Harband', 'Haarband schreibt man mit aa.'],
    ['Paar', 'Par', 'Paar schreibt man mit aa.'],
    ['Saat', 'Sat', 'Saat schreibt man mit aa.'],
  ], 1, 'xvv')

  // Remove bad pairs where correct === wrong or nonsensical
  const spellingClean = pairs.filter((p) => p.correct !== p.wrong && p.wrong.length > 0)

  add('ie oder i', [
    ['Biene', 'Bine', 'Biene schreibt man mit ie.'],
    ['Lied', 'Lid', 'Lied schreibt man mit ie.'],
    ['Brief', 'Brif', 'Brief schreibt man mit ie.'],
    ['Dieb', 'Dib', 'Dieb schreibt man mit ie.'],
    ['Tief', 'Tif', 'Tief schreibt man mit ie.'],
    ['Wiese', 'Wise', 'Wiese schreibt man mit ie.'],
    ['Rieme', 'Rime', 'Rieme schreibt man mit ie.'],
    ['schief', 'schif', 'Schief schreibt man mit ie.'],
    ['Blick', 'Blick', 'skip'],
    ['Kinder', 'Kinder', 'skip'],
  ], 2, 'xie')
  const ieStart = spellingClean.length
  add('ie oder i', [
    ['Biene', 'Bine', 'Biene schreibt man mit ie.'],
    ['Lied', 'Lid', 'Lied schreibt man mit ie.'],
    ['Brief', 'Brif', 'Brief schreibt man mit ie.'],
    ['Dieb', 'Dib', 'Dieb schreibt man mit ie.'],
    ['Tief', 'Tif', 'Tief schreibt man mit ie.'],
    ['Wiese', 'Wise', 'Wiese schreibt man mit ie.'],
    ['schief', 'schif', 'Schief schreibt man mit ie.'],
    ['Sieb', 'Sib', 'Sieb schreibt man mit ie.'],
    ['wiegen', 'wigen', 'Wiegen schreibt man mit ie.'],
    ['fliegen', 'fligen', 'Fliegen schreibt man mit ie.'],
    ['spielen', 'spilen', 'Spielen schreibt man mit ie.'],
    ['bieten', 'biten', 'Bieten schreibt man mit ie.'],
    ['Fliege', 'Flige', 'Fliege schreibt man mit ie.'],
    ['Ziel', 'Zil', 'Ziel schreibt man mit ie.'],
    ['Bier', 'Bir', 'Bier schreibt man mit ie.'],
    ['schießen', 'schissen', 'Schießen schreibt man mit ie.'],
    ['viel', 'vil', 'Viel schreibt man mit ie.'],
    ['Vieh', 'Vih', 'Vieh schreibt man mit ie.'],
    ['schließlich', 'schlislich', 'Schließlich schreibt man mit ie und ß.'],
    ['riesig', 'risig', 'Riesig schreibt man mit ie.'],
    ['müde', 'mude', 'Müde schreibt man mit ü.'],
    ['rieb', 'rib', 'Rieb schreibt man mit ie.'],
    ['wie', 'wi', 'Wie schreibt man mit ie.'],
    ['hier', 'hir', 'Hier schreibt man mit ie.'],
    ['nie', 'ni', 'Nie schreibt man mit ie.'],
  ], 2, 'xie2')
  spellingClean.push(...pairs.slice(ieStart))

  add('-ig oder -lich', [
    ['wichtig', 'wichtich', 'Wichtig endet auf -ig.'],
    ['ehrlich', 'ehrlig', 'Ehrlich endet auf -lich.'],
    ['fröhlich', 'frölig', 'Fröhlich endet auf -lich.'],
    ['lustig', 'lustich', 'Lustig endet auf -ig.'],
    ['pünktlich', 'pünktlig', 'Pünktlich endet auf -lich.'],
    ['mutig', 'mutich', 'Mutig endet auf -ig.'],
    ['dankbar', 'dankber', 'Dankbar endet auf -bar, nicht -lich.'],
    ['sorgfältig', 'sorgfältich', 'Sorgfältig endet auf -ig.'],
    ['hübsch', 'hübsc', 'Hübsch endet auf -sch.'],
    ['ähnlich', 'ähnlig', 'Ähnlich endet auf -lich.'],
    ['gemeinsam', 'gemeinsam', 'skip'],
  ], 2, 'xig')
  const igFrom = pairs.length
  // regenerate ig block properly in spellingClean only
  const igItems: [string, string, string][] = [
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
    ['leicht', 'leicht', 'skip'],
  ].filter(([, , n]) => n !== 'skip') as [string, string, string][]
  igItems.forEach(([correct, wrong, note], i) => {
    spellingClean.push({ id: `xig${String(i + 1).padStart(2, '0')}`, topic: '-ig oder -lich', correct, wrong, note, difficulty: 2 })
  })

  add('getrennt oder zusammen', [
    ['außerdem', 'außer dem', 'Außerdem schreibt man zusammen.'],
    ['trotzdem', 'trotz dem', 'Trotzdem schreibt man zusammen.'],
    ['indessen', 'in dessen', 'Indessen schreibt man zusammen.'],
    ['inzwischen', 'in Zwischen', 'Inzwischen schreibt man zusammen.'],
    ['mithilfe', 'mit Hilfe', 'Mithilfe schreibt man oft zusammen.'],
    ['infolge', 'in Folge', 'Infolge schreibt man zusammen.'],
    ['insofern', 'in so fern', 'Insofern schreibt man zusammen.'],
    ['mithin', 'mit hin', 'Mithin schreibt man zusammen.'],
    ['bereits', 'bereit s', 'Bereits schreibt man zusammen.'],
    ['sowieso', 'so wie so', 'Sowieso schreibt man zusammen.'],
    ['dennoch', 'den noch', 'Dennoch schreibt man zusammen.'],
    ['gleichwohl', 'gleich wohl', 'Gleichwohl schreibt man zusammen.'],
    ['eines Tages', 'ein es Tages', 'Eines Tages sind es zwei Wörter.'],
    ['warum', 'wa rum', 'Warum schreibt man zusammen.'],
    ['weshalb', 'we shalb', 'Weshalb schreibt man zusammen.'],
  ], 2, 'xgz')
  spellingClean.push(...pairs.slice(pairs.length - 15))

  add('häufig falsch', [
    ['Beispiel', 'Beispil', 'Beispiel schreibt man mit ie.'],
    ['Buchstabe', 'Buchstabe', 'skip'],
    ['Schwimmbad', 'Schwimbad', 'Schwimmbad schreibt man mit mm.'],
    ['Endspurt', 'Endspurrt', 'Endspurt hat nur ein r.'],
    ['Metall', 'Metal', 'Metall schreibt man mit ll.'],
    ['Atelier', 'Attelier', 'Atelier schreibt man mit einem t.'],
    ['Bibliothek', 'Bibliotek', 'Bibliothek schreibt man mit th.'],
    ['Gymnasium', 'Gimnasium', 'Gymnasium schreibt man mit y.'],
    ['Adresse', 'Addresse', 'Adresse hat nur ein d.'],
    ['Akzent', 'Akzent', 'Akzent ist korrekt.'],
    ['Telefon', 'Telofon', 'Telefon schreibt man mit ph nicht f allein.'],
  ], 3, 'xfw')
  const fwItems: P[] = [
    { id: 'xfw01', topic: 'häufig falsch', correct: 'Beispiel', wrong: 'Beispil', note: 'Beispiel schreibt man mit ie.', difficulty: 3 },
    { id: 'xfw02', topic: 'häufig falsch', correct: 'Schwimmbad', wrong: 'Schwimbad', note: 'Schwimmbad schreibt man mit mm.', difficulty: 3 },
    { id: 'xfw03', topic: 'häufig falsch', correct: 'Metall', wrong: 'Metal', note: 'Metall schreibt man mit ll.', difficulty: 3 },
    { id: 'xfw04', topic: 'häufig falsch', correct: 'Bibliothek', wrong: 'Bibliotek', note: 'Bibliothek schreibt man mit th.', difficulty: 3 },
    { id: 'xfw05', topic: 'häufig falsch', correct: 'Gymnasium', wrong: 'Gimnasium', note: 'Gymnasium schreibt man mit y.', difficulty: 3 },
    { id: 'xfw06', topic: 'häufig falsch', correct: 'Adresse', wrong: 'Addresse', note: 'Adresse hat nur ein d.', difficulty: 3 },
    { id: 'xfw07', topic: 'häufig falsch', correct: 'Geschichte', wrong: 'Gescichte', note: 'Geschichte schreibt man mit sch.', difficulty: 3 },
    { id: 'xfw08', topic: 'häufig falsch', correct: 'Fehler', wrong: 'Fehler', note: 'skip', difficulty: 3 },
  ].filter((p) => p.note !== 'skip')
  spellingClean.push(...fwItems)

  // Deduplicate by id
  const seen = new Set<string>()
  const finalPairs = spellingClean.filter((p) => {
    if (seen.has(p.id)) return false
    seen.add(p.id)
    return p.correct !== p.wrong
  })

  // Need more pairs - add bulk from templates
  const topics: [string, string, string, string, 1 | 2 | 3][] = []
  const moreWords = [
    ['Antwort', 'Antwot', 'Antwort hat or.', 2],
    ['Empfang', 'Emfang', 'Empfang beginnt mit Emp-.', 2],
    ['Erwachsene', 'Erwachsne', 'Erwachsene hat s.'],
    ['Geschenk', 'Geschnk', 'Geschenk schreibt man mit sc.'],
    ['Gespenst', 'Gespenst', 'skip'],
    ['Rechner', 'Rechner', 'skip'],
    ['Nachricht', 'Nachricht', 'Nachricht ist richtig.'],
    ['Zeitschrift', 'Zeitschrift', 'Zeitschrift ist richtig.'],
    ['Wörterbuch', 'Wörterbuh', 'Wörterbuch hat ch.'],
    ['Freizeit', 'Frei Zeit', 'Freizeit schreibt man zusammen.'],
    ['Hausaufgabe', 'Haus aufgabe', 'Hausaufgabe schreibt man zusammen.'],
    ['Mittagessen', 'Mittag essen', 'Mittagessen schreibt man zusammen.'],
    ['Vorlesung', 'Vor lesung', 'Vorlesung schreibt man zusammen.'],
    ['Radfahren', 'Rad fahren', 'Radfahren schreibt man zusammen.'],
    ['Schwimmen', 'Schwimen', 'Schwimmen schreibt man mit mm.'],
    ['Ballett', 'Balet', 'Ballett schreibt man mit tt.'],
    ['Gitarre', 'Gitare', 'Gitarre schreibt man mit rr.'],
    ['Chor', 'Kor', 'Chor schreibt man mit ch.'],
    ['Physik', 'Fysik', 'Physik beginnt mit Ph.'],
    ['Psychologie', 'Sychologie', 'Psychologie beginnt mit Psy-.'],
    ['Quelle', 'Kwelle', 'Quelle beginnt mit Qu.'],
    ['Sprache', 'Sprache', 'skip'],
    ['Europa', 'Europa', 'skip'],
    ['Chrom', 'Krom', 'Chrom beginnt mit Ch.'],
    ['Schriftsteller', 'Schiftsteller', 'Schriftsteller hat rift.'],
    ['Buchhandlung', 'Buchandlung', 'Buchhandlung hat hh.'],
    ['Bundesland', 'Bundes land', 'Bundesland schreibt man zusammen.'],
    ['Hauptstadt', 'Haupt stadt', 'Hauptstadt schreibt man zusammen.'],
    ['Volksschule', 'Volks schule', 'Volksschule schreibt man zusammen.'],
    ['Fußballplatz', 'Fusballplatz', 'Fußballplatz schreibt man mit ß.'],
    ['Straßenbahn', 'Strassenbahn', 'Straßenbahn schreibt man mit ß.'],
    ['Regenwald', 'Regen wald', 'Regenwald schreibt man zusammen.'],
    ['Sonnenuntergang', 'Sonnen untergang', 'Sonnenuntergang schreibt man zusammen.'],
    ['Morgenstunde', 'Morgen stunde', 'Morgenstunde schreibt man zusammen.'],
    ['Viertelstunde', 'Viertel stunde', 'Viertelstunde schreibt man zusammen.'],
    ['Jahrhundert', 'Jahr hundert', 'Jahrhundert schreibt man zusammen.'],
    ['Tausend', 'Tausent', 'Tausend endet auf nd.'],
    ['Million', 'Milion', 'Million schreibt man mit ll.'],
    ['Probieren', 'Probiere', 'Probieren endet auf -ieren.'],
  ] as const

  let idx = 0
  for (const row of moreWords) {
    if (row[3] === 'skip' || row[0] === row[1]) continue
    const diff = (row.length > 3 && typeof row[3] === 'number' ? row[3] : 2) as 1 | 2 | 3
    const note = typeof row[2] === 'string' ? row[2] : String(row[2])
    finalPairs.push({
      id: `xb${String(++idx).padStart(3, '0')}`,
      topic: 'häufig falsch',
      correct: row[0],
      wrong: row[1],
      note,
      difficulty: diff,
    })
  }

  const sWordsExtra = [
    { word: 'Kuss', group: 'ss' as const, note: 'In Kuss ist der Vokal kurz. Deshalb steht ss.' },
    { word: 'lassen', group: 'ss' as const, note: 'In lassen ist der Vokal kurz. Deshalb steht ss.' },
    { word: 'dürfen', group: 'ss' as const, note: 'In dürfen steht ss nach kurzem ü.' },
    { word: 'mögen', group: 'ß' as const, note: 'Mögen hat den langen Vokal ö. Deshalb steht ß in möglich, hier: mögen hat kein ß im Stamm.' },
    { word: 'Fußball', group: 'ß' as const, note: 'In Fußball ist der Vokal lang. Deshalb steht ß.' },
    { word: 'weiß', group: 'ß' as const, note: 'Weiß hat den Doppellaut ei. Deshalb steht ß.' },
    { word: 'draußen', group: 'ß' as const, note: 'Draußen hat au und langen Vokal. Deshalb steht ß.' },
    { word: 'Hilfe', group: 's' as const, note: 'Hilfe prüft man durch Verlängern: Hilfen.' },
    { word: 'Reise', group: 's' as const, note: 'Reise prüft man durch Verlängern: Reisen.' },
    { word: 'Basis', group: 's' as const, note: 'Basis endet auf s. Verlängerung: Basen.' },
    { word: 'Atlas', group: 's' as const, note: 'Atlas endet auf s ohne ß.' },
    { word: 'Abend', group: 's' as const, note: 'Abend endet auf d, Prüfung: Abends.' },
    { word: 'Nuss', group: 'ss' as const, note: 'Nuss hat kurzen Vokal. Deshalb ss.' },
    { word: 'Gruss', group: 'ß' as const, note: 'Richtig ist Gruß mit ß nach langem u.' },
    { word: 'Schluss', group: 'ss' as const, note: 'Schluss hat kurzen Vokal. Deshalb ss.' },
    { word: 'Fass', group: 'ss' as const, note: 'Fass hat kurzen Vokal. Deshalb ss.' },
    { word: 'Spaß', group: 'ß' as const, note: 'Spaß hat langen Vokal. Deshalb ß.' },
    { word: 'Genuss', group: 'ss' as const, note: 'Genuss hat kurzen Vokal. Deshalb ss.' },
    { word: 'Sitz', group: 's' as const, note: 'Sitz endet auf z. Verlängerung: Sitze.' },
    { word: 'Tanz', group: 's' as const, note: 'Tanz endet auf z.' },
  ].filter((w) => w.word !== 'Gruss' || w.note.includes('Gruß'))

  // fix Gruss entry to be wrong/correct pair style - sWords need correct group
  const sWordsFixed = sWordsExtra.map((w) =>
    w.word === 'Gruss'
      ? { word: 'Gruß', group: 'ß' as const, note: 'Gruß hat langen Vokal. Deshalb steht ß, nicht ss.' }
      : w.word === 'mögen'
        ? { word: 'größer', group: 'ß' as const, note: 'In größer ist der Vokal lang. Deshalb steht ß.' }
        : w,
  )

  const confusedExtra = [
    { id: 'xcw14', topic: 'als oder wie', prompt: 'Welches Wort passt?', options: ['als', 'wie'] as [string, string], correct: 'als', sentence: 'Paul ist größer als Ben.', note: 'Beim Unterschied steht als.' },
    { id: 'xcw15', topic: 'als oder wie', prompt: 'Welches Wort passt?', options: ['als', 'wie'] as [string, string], correct: 'wie', sentence: 'Mia ist so groß wie Lena.', note: 'Bei Gleichheit steht wie.' },
    { id: 'xcw16', topic: 'ob oder ob', prompt: 'Welches Wort passt?', options: ['ob', 'auf'], correct: 'ob', sentence: 'Ich frage, ob du kommst.', note: 'Ob leitet einen indirekten Fragesatz ein.' },
    { id: 'xcw17', topic: 'denn oder den', prompt: 'Welches Wort passt?', options: ['denn', 'den'], correct: 'denn', sentence: 'Was machst du denn heute?', note: 'Denn ist hier ein Fragewortpartikel.' },
    { id: 'xcw18', topic: 'denn oder den', prompt: 'Welches Wort passt?', options: ['denn', 'den'], correct: 'den', sentence: 'Ich sehe den Hund.', note: 'Den ist Akkusativ von der.' },
    { id: 'xcw19', topic: 'ihr oder ihr', prompt: 'Welches Wort passt?', options: ['Ihr', 'ihr'], correct: 'Ihr', sentence: 'Ihr kommt pünktlich.', note: 'Ihr am Satzanfang ist das Pronomen.' },
    { id: 'xcw20', topic: 'ihr oder ihr', prompt: 'Welches Wort passt?', options: ['ihr', 'Ihr'], correct: 'ihr', sentence: 'Das ist ihr Buch.', note: 'Ihr klein bezeichnet Besitz.' },
    { id: 'xcw22', topic: 'mal oder mal', prompt: 'Welches Wort passt?', options: ['mal', 'Mall'], correct: 'mal', sentence: 'Ruf mich bitte später mal an.', note: 'Mal als Adverb schreibt man klein.' },
    { id: 'xcw23', topic: 'Mann oder man', prompt: 'Welches Wort passt?', options: ['man', 'Mann'], correct: 'man', sentence: '___ darf hier nicht rauchen.', note: 'Man ist das unpersönliche Pronomen.' },
    { id: 'xcw24', topic: 'Mann oder man', prompt: 'Welches Wort passt?', options: ['Mann', 'man'], correct: 'Mann', sentence: 'Der Mann wartet am Bahnhof.', note: 'Mann ist ein Nomen und steht groß.' },
    { id: 'xcw25', topic: 'Rat oder Rad', prompt: 'Welches Wort passt?', options: ['Rat', 'Rad'], correct: 'Rat', sentence: 'Der Lehrer gibt einen guten Rat.', note: 'Rat bedeutet hier einen Ratschlag.' },
    { id: 'xcw26', topic: 'Rat oder Rad', prompt: 'Welches Wort passt?', options: ['Rad', 'Rat'], correct: 'Rad', sentence: 'Das Rad am Fahrrad ist kaputt.', note: 'Rad bezeichnet das Fahrradrad.' },
    { id: 'xcw27', topic: 'leer oder lehr', prompt: 'Welches Wort passt?', options: ['leer', 'lehr'], correct: 'leer', sentence: 'Die Flasche ist leer.', note: 'Leer bedeutet ohne Inhalt.' },
    { id: 'xcw28', topic: 'leer oder lehr', prompt: 'Welches Wort passt?', options: ['lehr', 'leer'], correct: 'lehr', sentence: 'Sie lehr uns Mathematik.', note: 'Lehr kommt von lehren.' },
    { id: 'xcw29', topic: 'ließ oder lies', prompt: 'Welches Wort passt?', options: ['ließ', 'lies'], correct: 'ließ', sentence: 'Er ließ das Buch liegen.', note: 'Ließ ist Präteritum von lassen.' },
    { id: 'xcw30', topic: 'ließ oder lies', prompt: 'Welches Wort passt?', options: ['lies', 'ließ'], correct: 'lies', sentence: '___ bitte den Text vor.', note: 'Lies ist Imperativ von lesen.' },
    { id: 'xcw31', topic: 'bald oder bald', prompt: 'Welches Wort passt?', options: ['bald', 'Balld'], correct: 'bald', sentence: 'Wir kommen bald zurück.', note: 'Bald bedeutet in kurzer Zeit.' },
    { id: 'xcw32', topic: 'weiß oder weis', prompt: 'Welches Wort passt?', options: ['weiß', 'weis'], correct: 'weiß', sentence: 'Der Schnee ist weiß.', note: 'Weiß als Adjektiv schreibt man mit ß.' },
    { id: 'xcw33', topic: 'weiß oder weis', prompt: 'Welches Wort passt?', options: ['weiß', 'weis'], correct: 'weiß', sentence: 'Er weiß die Antwort.', note: 'Weiß ist Form von wissen.' },
  ]

  const commaExtra: { id: string; words: string[]; slots: number[]; solution: string; note: string; difficulty: 1 | 2 | 3 }[] = []
  const commaTemplates = [
    { words: ['Tom', 'kauft', 'Brot', 'Butter', 'Milch', 'und', 'Eier'], slots: [2, 3], note: 'In der Aufzählung stehen Kommas nach Brot und Butter.', difficulty: 2 as const },
    { words: ['Wenn', 'es', 'regnet', 'bleiben', 'wir', 'drinnen'], slots: [2], note: 'Vor dem Hauptsatz steht nach dem Nebensatz ein Komma.', difficulty: 2 },
    { words: ['Lisa', 'geht', 'nach', 'Hause', 'weil', 'sie', 'müde', 'ist'], slots: [3], note: 'Vor weil steht ein Komma.', difficulty: 2 },
    { words: ['Der', 'Bus', 'der', 'pünktlich', 'kommt', 'hält', 'hier'], slots: [1, 4], note: 'Der Relativsatz steht zwischen zwei Kommas.', difficulty: 3 },
    { words: ['Anna', 'liest', 'ein', 'Buch', 'und', 'hört', 'Musik'], slots: [3], note: 'Vor und in dieser Aufzählung steht kein Komma.', difficulty: 1 },
    { words: ['Papa', 'kocht', 'Suppe', 'Salat', 'und', 'Reis'], slots: [2], note: 'Nach Suppe steht ein Komma in der Aufzählung.', difficulty: 1 },
    { words: ['Jonas', 'spielt', 'Fußball', 'Tennis', 'und', 'Volleyball'], slots: [2], note: 'Nach Fußball steht ein Komma.', difficulty: 1 },
    { words: ['Ob', 'wir', 'fahren', 'hängt', 'vom', 'Wetter', 'ab'], slots: [2], note: 'Nach dem Nebensatz mit ob steht ein Komma.', difficulty: 3 },
    { words: ['Die', 'Blumen', 'die', 'im', 'Garten', 'stehen', 'duften', 'schön'], slots: [1, 5], note: 'Der Relativsatz steht zwischen Kommas.', difficulty: 3 },
    { words: ['Mama', 'sagt', 'dass', 'wir', 'früh', 'schlafen', 'gehen'], slots: [1], note: 'Vor dass steht ein Komma.', difficulty: 2 },
    { words: ['Im', 'Korb', 'liegen', 'Äpfel', 'Birnen', 'und', 'Bananen'], slots: [3], note: 'Nach Äpfel steht ein Komma.', difficulty: 1 },
    { words: ['Felix', 'lernt', 'Deutsch', 'Englisch', 'und', 'Französisch'], slots: [2], note: 'Nach Deutsch steht ein Komma.', difficulty: 1 },
    { words: ['Sobald', 'die', 'Sonne', 'scheint', 'gehen', 'wir', 'wandern'], slots: [3], note: 'Nach dem Nebensatz mit sobald steht ein Komma.', difficulty: 3 },
    { words: ['Das', 'Kind', 'das', 'lacht', 'ist', 'fröhlich'], slots: [1, 3], note: 'Relativsatz zwischen Kommas.', difficulty: 3 },
    { words: ['Wir', 'packen', 'Taschen', 'Rucksäcke', 'und', 'Koffer'], slots: [2], note: 'Nach Taschen steht ein Komma.', difficulty: 1 },
    { words: ['Nina', 'ruft', 'an', 'bevor', 'sie', 'losfährt'], slots: [2], note: 'Vor bevor steht ein Komma.', difficulty: 2 },
    { words: ['Als', 'wir', 'ankamen', 'war', 'es', 'schon', 'dunkel'], slots: [2], note: 'Nach dem Als-Satz steht ein Komma.', difficulty: 2 },
    { words: ['Tim', 'isst', 'Pizza', 'Nudeln', 'und', 'Reis'], slots: [2], note: 'Nach Pizza steht ein Komma.', difficulty: 1 },
    { words: ['Die', 'Klasse', 'die', 'fleißig', 'arbeitet', 'bekommt', 'lob'], slots: [1, 4], note: 'Relativsatz zwischen Kommas.', difficulty: 3 },
    { words: ['Eva', 'trägt', 'einen', 'Rock', 'eine', 'Bluse', 'und', 'Schuhe'], slots: [3], note: 'Nach Rock steht ein Komma.', difficulty: 2 },
    { words: ['Hast', 'du', 'gehört', 'dass', 'morgen', 'fehlt', 'er'], slots: [2], note: 'Vor dass steht ein Komma.', difficulty: 2 },
    { words: ['Im', 'Regal', 'stehen', 'Tassen', 'Teller', 'und', 'Gläser'], slots: [3], note: 'Nach Tassen steht ein Komma.', difficulty: 1 },
    { words: ['Kaum', 'hatte', 'er', 'geöffnet', 'kam', 'Besuch'], slots: [3], note: 'Nach dem Nebensatz steht ein Komma.', difficulty: 3 },
    { words: ['Lukas', 'sammelt', 'Steine', 'Blätter', 'und', 'Muscheln'], slots: [2], note: 'Nach Steine steht ein Komma.', difficulty: 1 },
    { words: ['Obwohl', 'es', 'kalt', 'ist', 'gehen', 'wir', 'spazieren'], slots: [3], note: 'Nach obwohl steht ein Komma.', difficulty: 2 },
    { words: ['Der', 'Film', 'den', 'wir', 'sahen', 'war', 'spannend'], slots: [1, 4], note: 'Relativsatz zwischen Kommas.', difficulty: 3 },
    { words: ['Sophie', 'malt', 'mit', 'Stiften', 'Filzstiften', 'und', 'Farben'], slots: [3], note: 'Nach Stiften steht ein Komma.', difficulty: 1 },
    { words: ['Lea', 'wartet', 'bis', 'der', 'Bus', 'kommt'], slots: [1], note: 'Vor bis steht ein Komma.', difficulty: 2 },
    { words: ['Damit', 'wir', 'pünktlich', 'sind', 'fahren', 'wir', 'früh'], slots: [3], note: 'Nach dem Nebensatz mit damit steht ein Komma.', difficulty: 3 },
  ]
  commaTemplates.forEach((t, i) => {
    const words = [...t.words]
    const solution = words.map((w, idx) => `${w}${t.slots.includes(idx) ? ',' : ''}`).join(' ') + '.'
    commaExtra.push({ id: `xkom${String(i + 1).padStart(2, '0')}`, words, slots: t.slots, solution, note: t.note, difficulty: t.difficulty })
  })

  const syllableExtra = [
    { word: 'Schule', parts: ['Schu', 'le'] },
    { word: 'Bäcker', parts: ['Bä', 'cker'] },
    { word: 'Schlüssel', parts: ['Schlüs', 'sel'] },
    { word: 'Flasche', parts: ['Fla', 'sche'] },
    { word: 'Winter', parts: ['Win', 'ter'] },
    { word: 'Sommer', parts: ['Som', 'mer'] },
    { word: 'Bären', parts: ['Bä', 'ren'] },
    { word: 'Kinder', parts: ['Kin', 'der'] },
    { word: 'Lehrer', parts: ['Leh', 'rer'] },
    { word: 'Schüler', parts: ['Schü', 'ler'] },
    { word: 'musizieren', parts: ['mu', 'si', 'zie', 'ren'] },
    { word: 'Sportplatz', parts: ['Sport', 'platz'] },
    { word: 'Handball', parts: ['Hand', 'ball'] },
    { word: 'Straße', parts: ['Stra', 'ße'] },
    { word: 'Brücke', parts: ['Brü', 'cke'] },
    { word: 'Morgen', parts: ['Mor', 'gen'] },
    { word: 'Abend', parts: ['A', 'bend'] },
    { word: 'Regen', parts: ['Re', 'gen'] },
    { word: 'Wolke', parts: ['Wol', 'ke'] },
    { word: 'Blume', parts: ['Blu', 'me'] },
    { word: 'Garten', parts: ['Gar', 'ten'] },
    { word: 'Vogel', parts: ['Vo', 'gel'] },
    { word: 'Häuschen', parts: ['Häus', 'chen'] },
    { word: 'Tischtennis', parts: ['Tisch', 'ten', 'nis'] },
    { word: 'Fußball', parts: ['Fuss', 'ball'] },
    { word: 'Schwimmen', parts: ['Schwim', 'men'] },
    { word: 'Radfahren', parts: ['Rad', 'fah', 'ren'] },
    { word: 'Lesen', parts: ['Le', 'sen'] },
    { word: 'Schreiben', parts: ['Schrei', 'ben'] },
    { word: 'Rechnen', parts: ['Rech', 'nen'] },
    { word: 'Malen', parts: ['Ma', 'len'] },
    { word: 'Tanzen', parts: ['Tan', 'zen'] },
  ].map((s) => (s.word === 'Fußball' ? { word: 'Fußball', parts: ['Fuß', 'ball'] as string[] } : s))

  return `import type { SpellingPair, SGroup, ConfusedItem, CommaSentence } from './spelling'

export const spellingPairsExtra: readonly SpellingPair[] = ${JSON.stringify(finalPairs, null, 2)}

export const sWordsExtra: readonly { word: string; group: SGroup; note: string }[] = ${JSON.stringify(sWordsFixed, null, 2)}

export const confusedWordsExtra: readonly ConfusedItem[] = ${JSON.stringify(confusedExtra, null, 2)}

export const commaSentencesExtra: readonly CommaSentence[] = ${JSON.stringify(commaExtra, null, 2)}

export const syllableItemsExtra = ${JSON.stringify(syllableExtra, null, 2)} as const
`
}

// Run spelling only first - other areas in separate functions
write('spelling.extra.ts', genSpellingExtra())
console.log('Spelling extra generated. Extend script for other areas.')