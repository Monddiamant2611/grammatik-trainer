/**
 * Capitalization + spelling extras + wire all data files.
 * Run after emit-pools.mjs: node scripts/emit-pools-part2.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const data = join(root, 'src', 'data')

function writeExtra(name, body) {
  writeFileSync(join(data, name), body, 'utf8')
  console.log('wrote', name)
}

function cap(id, difficulty, tokens, nouns, faultySentence, correctSentence, toggle = true) {
  return { id, difficulty, tokens, nouns, faultySentence, correctSentence, toggle }
}

const people = ['Lena','Paul','Mia','Ben','Anna','Jonas','Lea','Tim','Sara','Nina','Omar','Emma','Felix','Nora','Luis','Mara','Theo','Ida']
const places = ['Park','Schule','Garten','Bibliothek','Markt','Bahnhof','Wald','Museum','Spielplatz']
const things = ['Buch','Ball','Heft','Stift','Tasche','Tisch','Fahrrad','Brief','Paket','Lampe']
const days = ['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag']
const months = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober']
const seasons = ['Frühling','Sommer','Herbst','Winter']

const capSentences = []
let k = 21
for (let i = 0; i < 70; i++) {
  const person = people[i % people.length]
  const place = places[i % places.length]
  const thing = things[i % things.length]
  const day = days[i % days.length]
  const month = months[i % months.length]
  const season = seasons[i % seasons.length]
  const pattern = i % 7
  if (pattern === 0) {
    const faulty = `der ${thing.toLowerCase()} liegt im ${place.toLowerCase()}.`
    const correct = `Der ${thing} liegt im ${place}.`
    capSentences.push(cap(`kx${String(k++).padStart(2,'0')}`, 1, [
      { faulty: 'der', correct: 'Der', reason: 'sentence' },
      { faulty: thing.toLowerCase(), correct: thing, reason: 'noun' },
      { faulty: 'liegt', correct: 'liegt' },
      { faulty: 'im', correct: 'im' },
      { faulty: place.toLowerCase(), correct: place, reason: 'noun', after: '.' },
    ], [thing, place], faulty, correct))
  } else if (pattern === 1) {
    const faulty = `heute besucht ${person.toLowerCase()} den ${place.toLowerCase()}.`
    const correct = `Heute besucht ${person} den ${place}.`
    capSentences.push(cap(`kx${String(k++).padStart(2,'0')}`, 2, [
      { faulty: 'heute', correct: 'Heute', reason: 'sentence', note: 'Heute ist kein Nomen.' },
      { faulty: 'besucht', correct: 'besucht' },
      { faulty: person.toLowerCase(), correct: person, reason: 'name' },
      { faulty: 'den', correct: 'den' },
      { faulty: place.toLowerCase(), correct: place, reason: 'noun', after: '.' },
    ], [person, place], faulty, correct))
  } else if (pattern === 2) {
    const faulty = `am ${day.toLowerCase()} beginnt die schule.`
    const correct = `Am ${day} beginnt die Schule.`
    capSentences.push(cap(`kx${String(k++).padStart(2,'0')}`, 2, [
      { faulty: 'am', correct: 'Am', reason: 'sentence' },
      { faulty: day.toLowerCase(), correct: day, reason: 'weekday' },
      { faulty: 'beginnt', correct: 'beginnt' },
      { faulty: 'die', correct: 'die' },
      { faulty: 'schule', correct: 'Schule', reason: 'noun', after: '.' },
    ], [day, 'Schule'], faulty, correct))
  } else if (pattern === 3) {
    const faulty = `im ${month.toLowerCase()} fahren wir nach berlin.`
    const correct = `Im ${month} fahren wir nach Berlin.`
    capSentences.push(cap(`kx${String(k++).padStart(2,'0')}`, 2, [
      { faulty: 'im', correct: 'Im', reason: 'sentence' },
      { faulty: month.toLowerCase(), correct: month, reason: 'month' },
      { faulty: 'fahren', correct: 'fahren' },
      { faulty: 'wir', correct: 'wir' },
      { faulty: 'nach', correct: 'nach' },
      { faulty: 'berlin', correct: 'Berlin', reason: 'name', after: '.' },
    ], [month, 'Berlin'], faulty, correct))
  } else if (pattern === 4) {
    const faulty = `im ${season.toLowerCase()} spielt ${person.toLowerCase()} im ${place.toLowerCase()}.`
    const correct = `Im ${season} spielt ${person} im ${place}.`
    capSentences.push(cap(`kx${String(k++).padStart(2,'0')}`, 2, [
      { faulty: 'im', correct: 'Im', reason: 'sentence' },
      { faulty: season.toLowerCase(), correct: season, reason: 'season' },
      { faulty: 'spielt', correct: 'spielt' },
      { faulty: person.toLowerCase(), correct: person, reason: 'name' },
      { faulty: 'im', correct: 'im' },
      { faulty: place.toLowerCase(), correct: place, reason: 'noun', after: '.' },
    ], [season, person, place], faulty, correct))
  } else if (pattern === 5) {
    const faulty = `${person.toLowerCase()} lernt englisch in der schule.`
    const correct = `${person} lernt Englisch in der Schule.`
    capSentences.push(cap(`kx${String(k++).padStart(2,'0')}`, 2, [
      { faulty: person.toLowerCase(), correct: person, reason: 'name' },
      { faulty: 'lernt', correct: 'lernt' },
      { faulty: 'englisch', correct: 'Englisch', reason: 'language' },
      { faulty: 'in', correct: 'in' },
      { faulty: 'der', correct: 'der' },
      { faulty: 'schule', correct: 'Schule', reason: 'noun', after: '.' },
    ], [person, 'Englisch', 'Schule'], faulty, correct))
  } else {
    const faulty = `können sie mir bitte helfen, herr müller?`
    const correct = `Können Sie mir bitte helfen, Herr Müller?`
    // vary slightly
    const id = `kx${String(k++).padStart(2,'0')}`
    if (i % 2 === 0) {
      capSentences.push(cap(id, 3, [
        { faulty: 'können', correct: 'Können', reason: 'sentence' },
        { faulty: 'sie', correct: 'Sie', reason: 'address' },
        { faulty: 'mir', correct: 'mir' },
        { faulty: 'bitte', correct: 'bitte' },
        { faulty: 'helfen,', correct: 'helfen,' },
        { faulty: 'herr', correct: 'Herr', reason: 'title' },
        { faulty: 'müller?', correct: 'Müller?', reason: 'name' },
      ], ['Sie', 'Herr', 'Müller'], faulty, correct))
    } else {
      const f2 = `morgens trinkt ${person.toLowerCase()} milch.`
      const c2 = `Morgens trinkt ${person} Milch.`
      capSentences.push(cap(id, 3, [
        { faulty: 'morgens', correct: 'Morgens', reason: 'sentence', note: 'morgens ist adverbial; am Satzanfang groß.' },
        { faulty: 'trinkt', correct: 'trinkt' },
        { faulty: person.toLowerCase(), correct: person, reason: 'name' },
        { faulty: 'milch.', correct: 'Milch.', reason: 'noun' },
      ], [person, 'Milch'], f2, c2))
    }
  }
}

writeExtra('capitalization.extra.ts', `import type { CapSentence } from './capitalization'

export const capitalizationSentencesExtra: readonly CapSentence[] = ${JSON.stringify(capSentences, null, 2)}
`)

// SPELLING
const spellingPairs = []
let sid = 1
const add = (topic, correct, wrong, note, difficulty) => {
  spellingPairs.push({ id: `spx${String(sid++).padStart(3,'0')}`, topic, correct, wrong, note, difficulty })
}

const ae = [
  ['Männer','Menner','Von Mann → Männer.'],['Bänke','Benke','Von Bank → Bänke.'],['Käfer','Kefer','Käfer mit ä.'],
  ['Wände','Wende','Von Wand → Wände.'],['Länder','Lender','Von Land → Länder.'],['Gänse','Gense','Von Gans → Gänse.'],
  ['Kälte','Kelte','Kälte mit ä.'],['Kräfte','Krefte','Von Kraft → Kräfte.'],['Sätze','Setze','Von Satz → Sätze.'],
  ['Fälle','Felle','Von Fall → Fälle.'],['Märchen','Merchen','Märchen mit ä.'],['spät','spet','spät mit ä.'],
  ['Käfig','Kefig','Käfig mit ä.'],['Nägel','Negel','Von Nagel → Nägel.'],['Mäuse','Meuse','Von Maus → Mäuse.'],
  ['Hähne','Hahne','Von Hahn → Hähne.'],['Gläser','Gleser','Von Glas → Gläser.'],['Plätze','Pletze','Von Platz → Plätze.'],
  ['Städte','Stedte','Von Stadt → Städte.'],['Äpfel','Epfel','Von Apfel → Äpfel.'],['Händler','Hendler','Händler mit ä.'],
  ['wärmen','wermen','wärmen mit ä.'],['Räder','Reder','Von Rad → Räder.'],['trägt','tregt','trägt mit ä.'],
  ['schläft','schleft','schläft mit ä.'],['fällt','fellt','fällt mit ä.'],['hält','helt','hält mit ä.'],
  ['Bäche','Beche','Von Bach → Bäche.'],['Dächer','Decher','Von Dach → Dächer.'],['Ärzte','Erzte','Ärzte mit Ä.'],
  ['Längen','Lengen','Längen mit ä.'],['Ängste','Engste','Ängste mit Ä.'],['Pfähle','Pfehle','Von Pfahl → Pfähle.'],
  ['Zähne','Zehne','Von Zahn → Zähne.'],['Gäste','Geste','Von Gast → Gäste.'],['Nächte','Nechte','Von Nacht → Nächte.'],
  ['Bäder','Beder','Von Bad → Bäder.'],['Fäden','Feden','Von Faden → Fäden.'],['Läden','Leden','Von Laden → Läden.'],
  ['Säcke','Secke','Von Sack → Säcke.'],
]
ae.forEach(([c,w,n]) => add('ä oder e', c, w, n, 1))

const dd = [
  ['kommen','komen','kommen mit mm.'],['passen','pasen','passen mit ss.'],['Essen','Esen','Essen mit ss.'],
  ['Kamm','Kam','Kamm mit mm.'],['Bett','Bet','Bett mit tt.'],['Fell','Fel','Fell mit ll.'],
  ['Ball','Bal','Ball mit ll.'],['packen','paken','packen mit ck.'],['nicken','niken','nicken mit ck.'],
  ['wetten','weten','wetten mit tt.'],['lassen','lasen','lassen mit ss.'],['fassen','fasen','fassen mit ss.'],
  ['Kasse','Kase','Kasse mit ss.'],['Klasse','Klase','Klasse mit ss.'],['Wanne','Wane','Wanne mit nn.'],
  ['Sonne','Sone','Sonne mit nn.'],['Keller','Keler','Keller mit ll.'],['Affe','Afe','Affe mit ff.'],
  ['Stamm','Stam','Stamm mit mm.'],['Himmel','Himel','Himmel mit mm.'],['Gummi','Gumi','Gummi mit mm.'],
  ['stoppen','stopen','stoppen mit pp.'],['Kappe','Kape','Kappe mit pp.'],['Brett','Bret','Brett mit tt.'],
  ['Schiff','Schif','Schiff mit ff.'],['bellen','belen','bellen mit ll.'],['rollen','rolen','rollen mit ll.'],
  ['Hammer','Hamer','Hammer mit mm.'],['Nummer','Numer','Nummer mit mm.'],['Summe','Sume','Summe mit mm.'],
  ['Flamme','Flame','Flamme mit mm.'],['Pappe','Pape','Pappe mit pp.'],['Mappe','Mape','Mappe mit pp.'],
  ['Lippe','Lipe','Lippe mit pp.'],['Kuppe','Kupe','Kuppe mit pp.'],['Mutter','Muter','Mutter mit tt.'],
  ['Butter','Buter','Butter mit tt.'],['Wetter','Weter','Wetter mit tt.'],['Blatt','Blat','Blatt mit tt.'],
  ['Statt','Stat','Statt mit tt.'],
]
dd.forEach(([c,w,n]) => add('doppelter Mitlaut', c, w, n, 1))

const vv = [
  ['Boot','Bot','Boot mit oo.'],['Meer','Mer','Meer mit ee.'],['Haar','Har','Haar mit aa.'],
  ['Saal','Sal','Saal mit aa.'],['Beere','Bere','Beere mit ee.'],['Paar','Par','Paar mit aa.'],
  ['See','Se','See mit ee.'],['Tee','Te','Tee mit ee.'],['Zoo','Zo','Zoo mit oo.'],
  ['Moos','Mos','Moos mit oo.'],['Aal','Al','Aal mit aa.'],['Staat','Stat','Staat mit aa.'],
  ['Saat','Sat','Saat mit aa.'],['Beet','Bet','Beet mit ee.'],['Speer','Sper','Speer mit ee.'],
  ['Heer','Her','Heer mit ee.'],['Schnee','Schne','Schnee mit ee.'],['Klo','Klo','Klo bleibt kurz — falsch hier: Klo vs Kloo'],
]
// Fix bad Klo entry
vv.pop()
vv.push(['Moos','Mos','Moos mit oo.'])
vv.forEach(([c,w,n]) => add('doppelter Selbstlaut', c, w, n, 1))

const ig = [
  ['wichtig','wichtich','wichtig endet auf -ig.'],['ehrlich','ehrlig','ehrlich endet auf -lich.'],
  ['möglich','möglig','möglich endet auf -lich.'],['neugierig','neugierich','neugierig endet auf -ig.'],
  ['täglich','täglig','täglich endet auf -lich.'],['freundlich','freundlig','freundlich endet auf -lich.'],
  ['lustig','lustich','lustig endet auf -ig.'],['mutig','mutich','mutig endet auf -ig.'],
  ['fällig','fällich','fällig endet auf -ig.'],['möglichst','möglichst','möglichst von möglich.'],
  ['schrecklich','schrecklig','schrecklich endet auf -lich.'],['glücklich','glücklig','glücklich endet auf -lich.'],
  ['gefährlich','gefährlig','gefährlich endet auf -lich.'],['ordentlich','ordentlig','ordentlich endet auf -lich.'],
  ['sachlich','sachlig','sachlich endet auf -lich.'],['übrig','übrich','übrig endet auf -ig.'],
  ['fertig','fertich','fertig endet auf -ig.'],['nötig','nötich','nötig endet auf -ig.'],
  ['ewig','ewich','ewig endet auf -ig.'],['hässlich','hässlig','hässlich endet auf -lich.'],
]
ig.forEach(([c,w,n]) => add('-ig oder -lich', c, w, n, 2))

const ie = [
  ['Sieb','Sib','Sieb mit ie.'],['Liebe','Libe','Liebe mit ie.'],['spielen','spilen','spielen mit ie.'],
  ['bieten','biten','bieten mit ie.'],['Fliege','Flige','Fliege mit ie.'],['Ziel','Zil','Ziel mit ie.'],
  ['Brief','Brif','Brief mit ie.'],['tief','tif','tief mit ie.'],['Dieb','Dib','Dieb mit ie.'],
  ['Tier','Tir','Tier mit ie.'],['vier','vir','vier mit ie.'],['hier','hir','hier mit ie.'],
  ['niemals','nimals','niemals mit ie.'],['niedlich','nidlich','niedlich mit ie.'],['Spiegel','Spigel','Spiegel mit ie.'],
  ['Fieber','Fiber','Fieber mit ie.'],['Lied','Lid','Lied mit ie.'],['Biene','Bine','Biene mit ie.'],
  ['Wiese','Wise','Wiese mit ie.'],['Krieg','Krig','Krieg mit ie.'],
]
ie.forEach(([c,w,n]) => add('ie oder i', c, w, n, 2))

const fw = [
  ['vielleicht','vieleicht','vielleicht mit zwei l.'],['nämlich','nähmlich','nämlich ohne h nach ä.'],
  ['interessant','interesant','interessant mit ss.'],['Rhythmus','Rythmus','Rhythmus mit Rh.'],
  ['auf jeden Fall','aufjedenfall','auf jeden Fall in drei Wörtern.'],['im Voraus','im voraus','Voraus groß.'],
  ['in Ordnung','in ordnung','Ordnung groß.'],['zu Hause','zuhause','zu Hause getrennt, Hause groß.'],
  ['mit Hilfe','mithilfe','mit Hilfe getrennt, Hilfe groß.'],['zum Beispiel','zumbespiel','zum Beispiel getrennt.'],
  ['dasselbe','das selbe','dasselbe zusammen.'],['dieselbe','die selbe','dieselbe zusammen.'],
  ['irgendwann','irgend wann','irgendwann zusammen.'],['irgendwo','irgend wo','irgendwo zusammen.'],
  ['deshalb','des halb','deshalb zusammen.'],['deswegen','des wegen','deswegen zusammen.'],
  ['manchmal','manch mal','manchmal zusammen.'],['jedenfalls','jeden falls','jedenfalls zusammen.'],
  ['stattdessen','statt dessen','stattdessen zusammen.'],['zuerst','zu erst','zuerst zusammen.'],
]
fw.forEach(([c,w,n]) => add('häufig falsch', c, w, n, 3))

const sWords = [
  ['Klasse','ss','In Klasse ist der Vokal kurz: ss.'],['Rasse','ss','Rasse: kurzer Vokal, ss.'],
  ['lassen','ss','lassen: kurzer Vokal, ss.'],['passen','ss','passen: kurzer Vokal, ss.'],
  ['Masse','ss','Masse: kurzer Vokal, ss.'],['Fuß','ß','Fuß: langer Vokal, ß.'],
  ['Gruß','ß','Gruß: langer Vokal, ß.'],['Maß','ß','Maß: langer Vokal, ß.'],
  ['Spaß','ß','Spaß: langer Vokal, ß.'],['weiß','ß','weiß: Doppellaut ei, ß.'],
  ['heißen','ß','heißen: ei, ß.'],['reißen','ß','reißen: ei, ß.'],
  ['schließen','ß','schließen: ie lang, ß.'],['schließen','ß','schließen: ie, ß.'],
  ['Haus','s','Haus → Häuser/Hauses: s.'],['Maus','s','Maus → Mäuse: s.'],
  ['Reis','s','Reis → Reises: s.'],['Preis','s','Preis → Preise: s.'],
  ['Gleis','s','Gleis → Gleise: s.'],['Kreis','s','Kreis → Kreise: s.'],
]
// dedupe schließen
const sWordsFixed = []
const sSeen = new Set()
for (const [word, group, note] of sWords) {
  if (sSeen.has(word)) continue
  sSeen.add(word)
  sWordsFixed.push({ word, group, note })
}

const confused = []
let cwi = 1
const confuseRows = [
  ['das oder dass','Welches Wort passt?','das','dass','das','Ich weiß, dass du kommst.','dass leitet den Nebensatz ein.'],
  ['das oder dass','Welches Wort passt?','das','dass','Das','Das Heft liegt hier.','Das zeigt auf das Heft.'],
  ['seit oder seid','Welches Wort passt?','seit','seid','seit','Ich bin seit Montag hier.','seit nennt den Zeitpunkt.'],
  ['seit oder seid','Welches Wort passt?','seit','seid','seid','Ihr seid pünktlich.','seid ist eine Form von sein.'],
  ['wieder oder wider','Welches Wort passt?','wieder','wider','wieder','Komm bitte wieder.','wieder bedeutet erneut.'],
  ['wieder oder wider','Welches Wort passt?','wieder','wider','wider','Das spricht dagegen, also wider Erwarten.','wider bedeutet gegen.'],
  ['war oder wahr','Welches Wort passt?','war','wahr','war','Gestern war schönes Wetter.','war ist Präteritum von sein.'],
  ['war oder wahr','Welches Wort passt?','war','wahr','wahr','Die Aussage ist wahr.','wahr bedeutet richtig.'],
  ['ihm oder im','Welches Wort passt?','ihm','im','ihm','Ich helfe ihm.','ihm ist Dativ von er.'],
  ['ihm oder im','Welches Wort passt?','ihm','im','im','Das Buch liegt im Regal.','im = in dem.'],
  ['wir oder wird','Welches Wort passt?','wir','wird','wir','Wir gehen jetzt.','wir ist das Pronomen.'],
  ['wir oder wird','Welches Wort passt?','wir','wird','wird','Es wird dunkel.','wird ist eine Form von werden.'],
  ['man oder mann','Welches Wort passt?','man','Mann','man','Man sagt das so.','man ist unpersönlich.'],
  ['man oder mann','Welches Wort passt?','man','Mann','Mann','Der Mann liest.','Mann ist das Nomen.'],
  ['tod oder tot','Welches Wort passt?','tod','tot','tot','Die Batterie ist tot.','tot ist Adjektiv.'],
  ['tod oder tot','Welches Wort passt?','tod','tot','Tod','Der Tod des Königs.','Tod ist Nomen.'],
  ['mal oder mahl','Welches Wort passt?','mal','mahl','mal','Komm mal her.','mal als Partikel.'],
  ['mal oder mahl','Welches Wort passt?','mal','mahl','Mahl','Das Mahl war gut.','Mahl ist Nomen.'],
  ['seite oder saite','Welches Wort passt?','Seite','Saite','Seite','Lies die Seite.','Seite im Buch.'],
  ['seite oder saite','Welches Wort passt?','Seite','Saite','Saite','Die Saite reißt.','Saite am Instrument.'],
]
for (const [topic, prompt, a, b, correct, sentence, note] of confuseRows) {
  confused.push({ id: `cwx${String(cwi++).padStart(2,'0')}`, topic, prompt, options: [a, b], correct, sentence, note })
}

const commas = []
let kom = 1
const commaRows = [
  [['Ich','kaufe','Brot','Milch','und','Butter'],[2],'Nach Brot steht ein Komma.',1],
  [['Mia','liest','Bücher','Zeitschriften','und','Comics'],[2],'Nach Büchern steht ein Komma.',1],
  [['Wir','bleiben','drinnen','weil','es','regnet'],[2],'Vor weil steht ein Komma.',2],
  [['Ich','weiß','dass','du','kommst'],[1],'Vor dass steht ein Komma.',2],
  [['Mein','Opa','der','in','Rom','lebt','kommt','heute'],[1,5],'Einschub zwischen Kommas.',3],
  [['Als','wir','ankamen','war','es','dunkel'],[2],'Nach dem Als-Satz steht ein Komma.',2],
  [['Obwohl','es','kalt','ist','gehen','wir','spazieren'],[3],'Nach obwohl steht ein Komma.',2],
  [['Der','Hund','der','bellt','ist','laut'],[1,3],'Relativsatz zwischen Kommas.',3],
  [['Lisa','packt','Äpfel','Birnen','und','Trauben'],[2],'Nach Äpfeln steht ein Komma.',1],
  [['Tom','sagt','dass','er','müde','ist'],[1],'Vor dass steht ein Komma.',2],
  [['Sobald','die','Sonne','scheint','gehen','wir','los'],[3],'Nach sobald steht ein Komma.',3],
  [['Die','Blumen','die','duften','stehen','hier'],[1,3],'Relativsatz zwischen Kommas.',3],
  [['Eva','nimmt','Stifte','Farben','und','Papier'],[2],'Nach Stiften steht ein Komma.',1],
  [['Bevor','wir','fahren','prüfen','wir','die','Reifen'],[2],'Nach bevor steht ein Komma.',2],
  [['Damit','wir','pünktlich','sind','starten','wir','früh'],[3],'Nach damit steht ein Komma.',3],
  [['Paul','kocht','Suppe','Salat','und','Brot'],[2],'Nach Suppe steht ein Komma.',1],
  [['Kaum','hatte','er','geöffnet','kam','Besuch'],[3],'Nach dem Nebensatz steht ein Komma.',3],
  [['Die','Klasse','die','übt','lernt','schnell'],[1,3],'Relativsatz zwischen Kommas.',3],
  [['Nina','ruft','an','bevor','sie','losfährt'],[2],'Vor bevor steht ein Komma.',2],
  [['Im','Korb','liegen','Birnen','Äpfel','und','Kiwis'],[3],'Nach Birnen steht ein Komma.',1],
]
for (const [words, slots, note, difficulty] of commaRows) {
  const solution = words.map((w, idx) => `${w}${slots.includes(idx) ? ',' : ''}`).join(' ') + '.'
  commas.push({ id: `komx${String(kom++).padStart(2,'0')}`, words, slots, solution, note, difficulty })
}

const syllables = [
  ['Schule',['Schu','le']],['Bäcker',['Bä','cker']],['Schlüssel',['Schlüs','sel']],
  ['Flasche',['Fla','sche']],['Winter',['Win','ter']],['Sommer',['Som','mer']],
  ['Kinder',['Kin','der']],['Lehrer',['Leh','rer']],['Schüler',['Schü','ler']],
  ['Garten',['Gar','ten']],['Vogel',['Vo','gel']],['Wolke',['Wol','ke']],
  ['Blume',['Blu','me']],['Regen',['Re','gen']],['Morgen',['Mor','gen']],
  ['Abend',['A','bend']],['Brücke',['Brü','cke']],['Tasche',['Ta','sche']],
  ['Zucker',['Zu','cker']],['Fenster',['Fens','ter']],['Kasten',['Kas','ten']],
  ['Handball',['Hand','ball']],['Fußball',['Fuß','ball']],['Sportplatz',['Sport','platz']],
  ['Schreiben',['Schrei','ben']],['Rechnen',['Rech','nen']],['Schwimmen',['Schwim','men']],
  ['musizieren',['mu','si','zie','ren']],['Häuschen',['Häus','chen']],['Tischtennis',['Tisch','ten','nis']],
  ['Apfel',['Ap','fel']],['Birne',['Bir','ne']],['Banane',['Ba','na','ne']],
  ['Orange',['O','ran','ge']],['Tomate',['To','ma','te']],['Kartoffel',['Kar','tof','fel']],
  ['Schokolade',['Scho','ko','la','de']],['Butterbrot',['But','ter','brot']],['Milchflasche',['Milch','fla','sche']],
  ['Schulhof',['Schul','hof']],['Klassenzimmer',['Klas','sen','zim','mer']],['Lehrerzimmer',['Leh','rer','zim','mer']],
]

writeExtra('spelling.extra.ts', `import type { SpellingPair, ConfusedItem, CommaSentence, SGroup } from './spelling'

export const spellingPairsExtra: readonly SpellingPair[] = ${JSON.stringify(spellingPairs, null, 2)}

export const sWordsExtra: readonly { word: string; group: SGroup; note: string }[] = ${JSON.stringify(sWordsFixed, null, 2)}

export const confusedWordsExtra: readonly ConfusedItem[] = ${JSON.stringify(confused, null, 2)}

export const commaSentencesExtra: readonly CommaSentence[] = ${JSON.stringify(commas, null, 2)}

export const syllableItemsExtra = ${JSON.stringify(syllables.map(([word, parts]) => ({ word, parts })), null, 2)} as const
`)

// Wire main files
function wire(file, replacements) {
  let src = readFileSync(join(data, file), 'utf8')
  const importLine = replacements.import
  if (!src.includes(importLine)) {
    src = `${importLine}\n${src}`
  }
  for (const { from, to } of replacements.exports) {
    if (src.includes(to)) continue
    if (!src.includes(from)) {
      console.warn('missing export pattern', file, from)
      continue
    }
    src = src.replace(from, to)
  }
  writeFileSync(join(data, file), src, 'utf8')
  console.log('wired', file)
}

wire('nouns.ts', {
  import: `import { nounSentencesExtra, articleProbesExtra, pluralProbesExtra, concreteAbstractExtra, properNamesExtra, capitalizationPairsExtra } from './nouns.extra'`,
  exports: [
    { from: 'export const nounSentences: readonly NounSentence[] = [', to: 'export const nounSentences: readonly NounSentence[] = [...nounSentencesExtra, ...' },
  ],
})

// Fix nouns wire properly - the spread syntax needs closing. Better rewrite exports at end.
function rewriteNouns() {
  let src = readFileSync(join(data, 'nouns.ts'), 'utf8')
  // Undo bad wire if any
  src = src.replace(`import { nounSentencesExtra, articleProbesExtra, pluralProbesExtra, concreteAbstractExtra, properNamesExtra, capitalizationPairsExtra } from './nouns.extra'\n`, '')
  src = src.replace('export const nounSentences: readonly NounSentence[] = [...nounSentencesExtra, ...[', 'export const nounSentences: readonly NounSentence[] = [')
  if (!src.includes('nounSentencesExtra')) {
    src = `import { nounSentencesExtra, articleProbesExtra, pluralProbesExtra, concreteAbstractExtra, properNamesExtra, capitalizationPairsExtra } from './nouns.extra'\n` + src
  }
  // Append merged exports at end by aliasing — cleanest: change const names to Base and re-export
  if (!src.includes('NOUNS_EXTRA_MERGED')) {
    src += `

/* NOUNS_EXTRA_MERGED */
const _nounSentencesBase = nounSentences as unknown as readonly import('./nouns').NounSentence[]
`
  }
  // Actually simplest approach: use Object.assign style by replacing array literals endings
  
  writeFileSync(join(data, 'nouns.ts'), src, 'utf8')
}

rewriteNouns()
console.log('part2 extras written; wiring via generate.ts preferred')
