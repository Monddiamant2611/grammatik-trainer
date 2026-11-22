/**
 * Emits src/data/*.extra.ts and patches main data files to concatenate extras.
 * Run: node scripts/emit-pools.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const data = join(root, 'src', 'data')

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function writeExtra(name, body) {
  writeFileSync(join(data, name), body, 'utf8')
  console.log('wrote', name)
}

function ensureConcat(file, importLine, concatMap) {
  const path = join(data, file)
  let src = readFileSync(path, 'utf8')
  if (!src.includes(importLine)) {
    src = `${importLine}\n${src}`
  }
  for (const [base, extra] of Object.entries(concatMap)) {
    const re = new RegExp(`export const ${base}(:[^=]+)=\\s*(\\[[\\s\\S]*?\\])(\\s+as const)?\\s*`, 'm')
    if (src.includes(`...${extra}`) || src.includes(`${base}Extra`)) continue
    // Prefer appending after existing export by rewriting to concat form once
    if (src.includes(`export const ${base}`)) {
      // Change `export const foo: ... = [` to keep array then add: export const foo = [...fooBase, ...fooExtra]
      // Simpler: add at end of file
      if (!src.includes(`/* EXTRA_WIRE_${base} */`)) {
        src += `\n/* EXTRA_WIRE_${base} */\nimport { ${extra} } from './${file.replace('.ts', '')}.extra'\n`
        // Actually import must be top - handled by importLine
        src = src.replace(importLine + '\n', '') // avoid dup if we add below
      }
    }
  }
  // Cleaner approach: rewrite known export arrays to concat in a post-pass below
  writeFileSync(path, src, 'utf8')
}

// ---------- NOUNS ----------
const people = ['Lena','Paul','Mia','Ben','Anna','Jonas','Lea','Tim','Sara','Nina','Omar','Emma','Felix','Nora','Luis','Mara','Theo','Ida','Sam','Elena','Kai','Jule','Pia','Tom','Sofia','David','Amira','Luca','Hanna','Finn']
const places = ['Park','Schule','Garten','Bibliothek','Markt','Bahnhof','Wald','See','Museum','Spielplatz','Kirche','Brücke','Stadt','Dorf','Hof','Strand','Berg','Tal','Platz','Straße']
const things = ['Buch','Ball','Heft','Stift','Tasche','Tisch','Stuhl','Fenster','Tür','Fahrrad','Auto','Bus','Zug','Karte','Brief','Paket','Lampe','Uhr','Schlüssel','Rucksack']
const animals = ['Hund','Katze','Vogel','Pferd','Maus','Hase','Fisch','Kuh','Schaf','Fuchs']
const abstracts = ['Freude','Mut','Hoffnung','Liebe','Angst','Glück','Trauer','Ruhe','Kraft','Geduld','Freundschaft','Vertrauen','Neugier','Stolz','Dank']
const verbs = ['besucht','trägt','liest','findet','öffnet','schließt','bringt','sieht','holt','sucht','stellt','legt','zeigt','kauft','baut']

const nounSentences = []
let n = 21
for (let i = 0; i < 90; i++) {
  const person = people[i % people.length]
  const place = places[i % places.length]
  const thing = things[i % things.length]
  const animal = animals[i % animals.length]
  const abs = abstracts[i % abstracts.length]
  const verb = verbs[i % verbs.length]
  const pattern = i % 6
  let sentence, nouns, traps = [], difficulty = (i % 3) + 1, text = i % 3 === 0
  if (pattern === 0) {
    sentence = `${person} ${verb} den ${thing} im ${place}.`
    nouns = [person, thing, place]
  } else if (pattern === 1) {
    sentence = `Der ${animal} liegt neben dem ${thing}.`
    nouns = [animal, thing]
  } else if (pattern === 2) {
    sentence = `${abs} hilft ${person} in der ${place}.`
    nouns = [abs, person, place]
    difficulty = 3
  } else if (pattern === 3) {
    sentence = `Heute findet ${person} ein ${thing} auf dem ${place}.`
    nouns = [person, thing, place]
    traps = ['Heute']
    difficulty = 3
  } else if (pattern === 4) {
    sentence = `Schnell holt ${person} die ${animal === 'Maus' ? 'Maus' : animal} aus dem ${place}.`
    nouns = [person, animal === 'Maus' ? 'Maus' : animal, place]
    traps = ['Schnell']
    difficulty = 3
  } else {
    sentence = `Die Kinder spielen mit dem ${thing} und dem ${animal}.`
    nouns = ['Kinder', thing, animal]
  }
  // Fix articles roughly for feminine things
  sentence = sentence.replace('den Freude', 'die Freude').replace('den Hoffnung', 'die Hoffnung')
  nounSentences.push({ id: `nx${String(n).padStart(2,'0')}`, sentence, nouns, traps, difficulty, text })
  n++
}

const articleProbesExtra = [
  ...['Baum','Tisch','Lehrer','Vater','Bruder','Onkel','Arzt','Fahrer','Vogel','Fisch'].map(w => ({ word: w, correct: `der ${w}`, options: [`der ${w}`, `die ${w}`, `das ${w}`] })),
  ...['Blume','Schule','Straße','Mutter','Schwester','Tasche','Lampe','Uhr','Katze','Maus'].map(w => ({ word: w, correct: `die ${w}`, options: [`der ${w}`, `die ${w}`, `das ${w}`] })),
  ...['Haus','Buch','Kind','Mädchen','Fenster','Auto','Fahrrad','Heft','Paket','Meer'].map(w => ({ word: w, correct: `das ${w}`, options: [`der ${w}`, `die ${w}`, `das ${w}`] })),
]

const pluralExtra = [
  ['Tisch','Tische'],['Stuhl','Stühle'],['Lehrer','Lehrer'],['Blume','Blumen'],['Haus','Häuser'],
  ['Stadt','Städte'],['Baum','Bäume'],['Freund','Freunde'],['Name','Namen'],['Frau','Frauen'],
  ['Mann','Männer'],['Tag','Tage'],['Jahr','Jahre'],['Ort','Orte'],['Weg','Wege'],
  ['Ball','Bälle'],['Zug','Züge'],['Fuß','Füße'],['Hand','Hände'],['Wand','Wände'],
  ['Apfel','Äpfel'],['Vogel','Vögel'],['Mutter','Mütter'],['Vater','Väter'],['Tochter','Töchter'],
  ['Bruder','Brüder'],['Schwester','Schwestern'],['Schüler','Schüler'],['Aufgabe','Aufgaben'],['Fenster','Fenster'],
].map(([singular, plural]) => ({ singular, plural }))

const concreteExtra = [
  ...['Tisch','Stuhl','Ball','Buch','Hund','Katze','Baum','Haus','Auto','Stein','Apfel','Blume','Fenster','Tür','Schule'].map(word => ({ word, kind: 'konkret' })),
  ...['Freude','Mut','Angst','Hoffnung','Liebe','Glück','Trauer','Geduld','Stolz','Ruhe','Kraft','Neugier','Vertrauen','Dank','Mut'].map(word => ({ word, kind: 'abstrakt' })),
]
// dedupe Mut
const concreteSeen = new Set()
const concreteAbstractExtra = concreteExtra.filter(item => {
  if (concreteSeen.has(item.word)) return false
  concreteSeen.add(item.word)
  return true
})

const namesExtra = ['Leipzig','Hamburg','Köln','Dresden','Elbe','Donau','Alpen','Zugspitze','Paula','Omar','Amira','Finn']
const capPairsExtra = [
  ['der tisch','der Tisch','tisch'],['die tür','die Tür','tür'],['das auto','das Auto','auto'],
  ['die freude','die Freude','freude'],['der mut','der Mut','mut'],['die hoffnung','die Hoffnung','hoffnung'],
  ['das glück','das Glück','glück'],['die angst','die Angst','angst'],['der park','der Park','park'],
  ['die stadt','die Stadt','stadt'],['das kind','das Kind','kind'],['die lehrerin','die Lehrerin','lehrerin'],
  ['der garten','der Garten','garten'],['die bibliothek','die Bibliothek','bibliothek'],['das fenster','das Fenster','fenster'],
].map(([faulty, correct, error]) => ({ faulty, correct, error }))

writeExtra('nouns.extra.ts', `import type { NounSentence } from './nouns'

export const nounSentencesExtra: readonly NounSentence[] = ${JSON.stringify(nounSentences, null, 2)}

export const articleProbesExtra = ${JSON.stringify(articleProbesExtra, null, 2)} as const

export const pluralProbesExtra = ${JSON.stringify(pluralExtra, null, 2)} as const

export const concreteAbstractExtra = ${JSON.stringify(concreteAbstractExtra, null, 2)} as const

export const properNamesExtra = ${JSON.stringify(namesExtra, null, 2)} as const

export const capitalizationPairsExtra = ${JSON.stringify(capPairsExtra, null, 2)} as const
`)

// ---------- ADJECTIVES ----------
const adjExtra = [
  ['hell','heller','am hellsten','regular',1],['klar','klarer','am klarsten','regular',1],
  ['frisch','frischer','am frischesten','esten',2],['nett','netter','am nettesten','esten',2],
  ['stark','stärker','am stärksten','umlaut',2],['scharf','schärfer','am schärfsten','umlaut',2],
  ['arm','ärmer','am ärmsten','umlaut',2],['gesund','gesünder','am gesündesten','umlaut',2],
  ['dumm','dümmer','am dümmsten','umlaut',2],['klug','klüger','am klügsten','umlaut',2],
  ['edel','edler','am edelsten','el-er',2],['sauber','sauberer','am saubersten','el-er',2],
  ['heiter','heiterer','am heitersten','el-er',2],['sicher','sicherer','am sichersten','regular',1],
  ['ruhig','ruhiger','am ruhigsten','regular',1],['mutig','mutiger','am mutigsten','regular',1],
  ['fleißig','fleißiger','am fleißigsten','regular',1],['höflich','höflicher','am höflichsten','regular',1],
  ['sparsam','sparsamer','am sparsamsten','regular',1],['praktisch','praktischer','am praktischsten','regular',2],
  ['einfach','einfacher','am einfachsten','regular',1],['schwierig','schwieriger','am schwierigsten','regular',2],
  ['langsam','langsamer','am langsamsten','regular',1],['früh','früher','am frühesten','esten',2],
  ['spät','später','am spätesten','esten',2],['nah','näher','am nächsten','irregular',3],
  ['gern','lieber','am liebsten','irregular',3],['wenig','weniger','am wenigsten','regular',2],
  ['frei','freier','am freisten','regular',1],['offen','offener','am offensten','regular',1],
  ['eng','enger','am engsten','regular',1],['weit','weiter','am weitesten','esten',2],
  ['hart','härter','am härtesten','umlaut',2],['weich','weicher','am weichsten','regular',1],
  ['süß','süßer','am süßesten','esten',2],['sauer','saurer','am sauersten','el-er',2],
  ['bitter','bitterer','am bittersten','el-er',2],['salzig','salziger','am salzigsten','regular',2],
  ['trocken','trockener','am trockensten','regular',2],['nass','nasser','am nassesten','esten',2],
  ['dünn','dünner','am dünnsten','regular',1],['dick','dicker','am dicksten','regular',1],
  ['flach','flacher','am flachsten','regular',1],['steil','steiler','am steilsten','regular',2],
].map(([positive, comparative, superlative, pattern, difficulty], i) => ({
  id: `ax${String(i + 1).padStart(2, '0')}`, positive, comparative, superlative, pattern, difficulty,
}))

const cmpExtra = []
const cmpTemplates = [
  ['Der Hund ist größer als die Katze.', 'als', 1],
  ['Lea ist so fleißig wie Tim.', 'wie', 1],
  ['Heute ist es kälter als gestern.', 'als', 2],
  ['Das Buch ist interessanter als der Film.', 'als', 2],
  ['Paul läuft genauso schnell wie Ben.', 'wie', 2],
  ['Der Turm ist höher als das Haus.', 'als', 3],
  ['Mia ist nicht so laut wie Jonas.', 'wie', 2],
  ['Dieser Weg ist länger als jener.', 'als', 1],
  ['Die Aufgabe ist leichter als die letzte.', 'als', 1],
  ['Omar ist so höflich wie seine Schwester.', 'wie', 2],
  ['Das Meer ist tiefer als der See.', 'als', 2],
  ['Finn ist so mutig wie Ida.', 'wie', 1],
  ['Der Winter ist kälter als der Herbst.', 'als', 1],
  ['Sara schreibt sauberer als früher.', 'als', 3],
  ['Das Brot ist frischer als gestern.', 'als', 2],
  ['Nora ist so ruhig wie Theo.', 'wie', 1],
  ['Der Berg ist steiler als der Hügel.', 'als', 3],
  ['Luis ist nicht so groß wie David.', 'wie', 2],
  ['Die Prüfung ist schwieriger als die Übung.', 'als', 2],
  ['Emma ist so freundlich wie Hanna.', 'wie', 1],
]
cmpTemplates.forEach(([sentence, connector, difficulty], i) => {
  cmpExtra.push({ id: `vx${String(i + 1).padStart(2, '0')}`, sentence, connector, difficulty })
})

writeExtra('adjectives.extra.ts', `import type { AdjectiveTriple, ComparisonSentence, SpellingFix } from './adjectives'

export const adjectivesExtra: readonly AdjectiveTriple[] = ${JSON.stringify(adjExtra, null, 2)}

export const comparisonSentencesExtra: readonly ComparisonSentence[] = ${JSON.stringify(cmpExtra, null, 2)}

export const adjectiveErrorsExtra: readonly SpellingFix[] = [
  { id: 'aex1', faulty: 'Sie ist schöner wie ihre Schwester.', correct: 'Sie ist schöner als ihre Schwester.', error: 'wie', note: 'Beim Unterschied steht als.' },
  { id: 'aex2', faulty: 'Das ist der am besten Spieler.', correct: 'Das ist der beste Spieler.', error: 'am', note: 'Vor einem Nomen steht der Superlativ mit Endung: der beste Spieler.' },
  { id: 'aex3', faulty: 'Er läuft am schneller.', correct: 'Er läuft am schnellsten.', error: 'schneller', note: 'Nach am folgt der Superlativ: am schnellsten.' },
  { id: 'aex4', faulty: 'Das ist mehr schöner.', correct: 'Das ist schöner.', error: 'mehr', note: 'Schöner ist schon der Komparativ.' },
  { id: 'aex5', faulty: 'Sie ist groß als er.', correct: 'Sie ist so groß wie er.', error: 'groß', note: 'Bei gleichem Vergleich: so … wie.' },
  { id: 'aex6', faulty: 'Das Auto ist am teuerste.', correct: 'Das Auto ist am teuersten.', error: 'teuerste', note: 'Nach am folgt -en: am teuersten.' },
  { id: 'aex7', faulty: 'Er ist besser wie ich.', correct: 'Er ist besser als ich.', error: 'wie', note: 'Beim Unterschied steht als.' },
  { id: 'aex8', faulty: 'Das ist die am schönsten Blume.', correct: 'Das ist die schönste Blume.', error: 'am', note: 'Vor einem Nomen: die schönste Blume.' },
]
`)

// ---------- CASES ----------
const caseExtra = []
const caseRows = [
  ['Der Lehrer erklärt.', 'Der Lehrer', 'der Lehrer', 'nom', 'Wer oder was erklärt?', 1],
  ['Das Heft der Schülerin liegt hier.', 'der Schülerin', 'der Schülerin', 'gen', 'Wessen Heft liegt hier?', 2],
  ['Paul hilft dem Freund.', 'dem Freund', 'dem Freund', 'dat', 'Wem hilft Paul?', 2],
  ['Mia sieht den Hund.', 'den Hund', 'den Hund', 'akk', 'Wen oder was sieht Mia?', 1],
  ['Die Farbe des Hauses gefällt mir.', 'des Hauses', 'des Hauses', 'gen', 'Wessen Farbe gefällt mir?', 2],
  ['Lena gibt dem Kind einen Apfel.', 'dem Kind', 'dem Kind', 'dat', 'Wem gibt Lena einen Apfel?', 2],
  ['Lena gibt dem Kind einen Apfel.', 'einen Apfel', 'einen Apfel', 'akk', 'Wen oder was gibt Lena dem Kind?', 2],
  ['Der Bus hält vor der Schule.', 'Der Bus', 'der Bus', 'nom', 'Wer oder was hält vor der Schule?', 1],
  ['Wir gedenken des Opfers.', 'des Opfers', 'des Opfers', 'gen', 'Wessen gedenken wir?', 3],
  ['Sie antwortet dem Lehrer.', 'dem Lehrer', 'dem Lehrer', 'dat', 'Wem antwortet sie?', 2],
  ['Er liest einen Roman.', 'einen Roman', 'einen Roman', 'akk', 'Wen oder was liest er?', 1],
  ['Das Spielzeug des Babys ist neu.', 'des Babys', 'des Babys', 'gen', 'Wessen Spielzeug ist neu?', 2],
  ['Ich danke der Frau.', 'der Frau', 'der Frau', 'dat', 'Wem danke ich?', 2],
  ['Wir besuchen die Oma.', 'die Oma', 'die Oma', 'akk', 'Wen oder was besuchen wir?', 1],
  ['Der Schlüssel des Autos fehlt.', 'des Autos', 'des Autos', 'gen', 'Wessen Schlüssel fehlt?', 2],
  ['Sie folgt dem Pfad.', 'dem Pfad', 'dem Pfad', 'dat', 'Wem folgt sie?', 3],
  ['Er kauft einen Stift.', 'einen Stift', 'einen Stift', 'akk', 'Wen oder was kauft er?', 1],
  ['Die Stimme der Sängerin ist klar.', 'der Sängerin', 'der Sängerin', 'gen', 'Wessen Stimme ist klar?', 2],
  ['Ich schreibe dem Onkel.', 'dem Onkel', 'dem Onkel', 'dat', 'Wem schreibe ich?', 2],
  ['Sie trägt eine Tasche.', 'eine Tasche', 'eine Tasche', 'akk', 'Wen oder was trägt sie?', 1],
]
// Expand with people/object loops
const datObjs = [['dem Hund','dem Hund'],['dem Kind','dem Kind'],['der Frau','der Frau'],['dem Lehrer','dem Lehrer'],['den Kindern','den Kindern']]
const akkObjs = [['den Ball','den Ball'],['die Aufgabe','die Aufgabe'],['das Buch','das Buch'],['einen Brief','einen Brief'],['die Tür','die Tür']]
let cid = 1
for (const [sentence, surface, label, caseId, probe, difficulty] of caseRows) {
  caseExtra.push({
    id: `cx${String(cid++).padStart(2,'0')}`,
    sentence,
    difficulty,
    targets: [{ surface, label, caseId, probe }],
  })
}
for (let i = 0; i < 40; i++) {
  const who = people[i % people.length]
  const [datSurf, datLab] = datObjs[i % datObjs.length]
  const [akkSurf, akkLab] = akkObjs[i % akkObjs.length]
  const sentence = `${who} gibt ${datSurf} ${akkSurf}.`
  caseExtra.push({
    id: `cx${String(cid++).padStart(2,'0')}`,
    sentence,
    difficulty: 2,
    targets: [
      { surface: datSurf, label: datLab, caseId: 'dat', probe: `Wem gibt ${who} ${akkSurf}?` },
      { surface: akkSurf, label: akkLab, caseId: 'akk', probe: `Wen oder was gibt ${who} ${datSurf}?` },
    ],
  })
}
for (let i = 0; i < 20; i++) {
  const thing = things[i % things.length]
  const who = people[i % people.length]
  caseExtra.push({
    id: `cx${String(cid++).padStart(2,'0')}`,
    sentence: `Das ${thing} ${who === 'Lena' || who === 'Mia' || who === 'Anna' ? 'der' : 'des'} ${who === 'Lena' || who === 'Mia' || who === 'Anna' ? who : who + 's'} liegt hier.`,
    difficulty: 3,
    targets: [{
      surface: who === 'Lena' || who === 'Mia' || who === 'Anna' ? `der ${who}` : `des ${who}s`,
      label: who === 'Lena' || who === 'Mia' || who === 'Anna' ? `der ${who}` : `des ${who}s`,
      caseId: 'gen',
      probe: `Wessen ${thing} liegt hier?`,
    }],
  })
}

writeExtra('cases.extra.ts', `import type { CaseSentence } from './cases'

export const caseSentencesExtra: readonly CaseSentence[] = ${JSON.stringify(caseExtra, null, 2)}
`)

// ---------- VERBS ----------
const verbExtra = [
  ['wohnen','regular',1,{ich:'wohne',du:'wohnst',er:'wohnt',wir:'wohnen',ihr:'wohnt',sie:'wohnen'}],
  ['hören','regular',1,{ich:'höre',du:'hörst',er:'hört',wir:'hören',ihr:'hört',sie:'hören'}],
  ['kochen','regular',1,{ich:'koche',du:'kochst',er:'kocht',wir:'kochen',ihr:'kocht',sie:'kochen'}],
  ['malen','regular',1,{ich:'male',du:'malst',er:'malt',wir:'malen',ihr:'malt',sie:'malen'}],
  ['sagen','regular',1,{ich:'sage',du:'sagst',er:'sagt',wir:'sagen',ihr:'sagt',sie:'sagen'}],
  ['arbeiten','regular',2,{ich:'arbeite',du:'arbeitest',er:'arbeitet',wir:'arbeiten',ihr:'arbeitet',sie:'arbeiten'}],
  ['öffnen','regular',2,{ich:'öffne',du:'öffnest',er:'öffnet',wir:'öffnen',ihr:'öffnet',sie:'öffnen'}],
  ['rechnen','regular',2,{ich:'rechne',du:'rechnest',er:'rechnet',wir:'rechnen',ihr:'rechnet',sie:'rechnen'}],
  ['probieren','ieren',2,{ich:'probiere',du:'probierst',er:'probiert',wir:'probieren',ihr:'probiert',sie:'probieren'}],
  ['trainieren','ieren',2,{ich:'trainiere',du:'trainierst',er:'trainiert',wir:'trainieren',ihr:'trainiert',sie:'trainieren'}],
  ['organisieren','ieren',2,{ich:'organisiere',du:'organisierst',er:'organisiert',wir:'organisieren',ihr:'organisiert',sie:'organisieren'}],
  ['fotografieren','ieren',2,{ich:'fotografiere',du:'fotografierst',er:'fotografiert',wir:'fotografieren',ihr:'fotografiert',sie:'fotografieren'}],
  ['geben','vowel',2,{ich:'gebe',du:'gibst',er:'gibt',wir:'geben',ihr:'gebt',sie:'geben'}],
  ['sehen','vowel',2,{ich:'sehe',du:'siehst',er:'sieht',wir:'sehen',ihr:'seht',sie:'sehen'}],
  ['sprechen','vowel',2,{ich:'spreche',du:'sprichst',er:'spricht',wir:'sprechen',ihr:'sprecht',sie:'sprechen'}],
  ['treffen','vowel',2,{ich:'treffe',du:'triffst',er:'trifft',wir:'treffen',ihr:'trefft',sie:'treffen'}],
  ['werfen','vowel',3,{ich:'werfe',du:'wirfst',er:'wirft',wir:'werfen',ihr:'werft',sie:'werfen'}],
  ['fahren','vowel',2,{ich:'fahre',du:'fährst',er:'fährt',wir:'fahren',ihr:'fahrt',sie:'fahren'}],
  ['schlafen','vowel',2,{ich:'schlafe',du:'schläfst',er:'schläft',wir:'schlafen',ihr:'schlaft',sie:'schlafen'}],
  ['laufen','vowel',2,{ich:'laufe',du:'läufst',er:'läuft',wir:'laufen',ihr:'lauft',sie:'laufen'}],
  ['werden','irregular',3,{ich:'werde',du:'wirst',er:'wird',wir:'werden',ihr:'werdet',sie:'werden'}],
  ['wissen','irregular',3,{ich:'weiß',du:'weißt',er:'weiß',wir:'wissen',ihr:'wisst',sie:'wissen'}],
  ['wollen','irregular',3,{ich:'will',du:'willst',er:'will',wir:'wollen',ihr:'wollt',sie:'wollen'}],
  ['können','irregular',3,{ich:'kann',du:'kannst',er:'kann',wir:'können',ihr:'könnt',sie:'können'}],
  ['müssen','irregular',3,{ich:'muss',du:'musst',er:'muss',wir:'müssen',ihr:'müsst',sie:'müssen'}],
  ['dürfen','irregular',3,{ich:'darf',du:'darfst',er:'darf',wir:'dürfen',ihr:'dürft',sie:'dürfen'}],
  ['sollen','irregular',3,{ich:'soll',du:'sollst',er:'soll',wir:'sollen',ihr:'sollt',sie:'sollen'}],
  ['mögen','irregular',3,{ich:'mag',du:'magst',er:'mag',wir:'mögen',ihr:'mögt',sie:'mögen'}],
].map(([infinitive, pattern, difficulty, forms]) => ({ infinitive, pattern, difficulty, forms }))

const gapExtra = []
let g = 11
for (const v of verbExtra.slice(0, 20)) {
  for (const person of ['ich','du','er','wir','ihr','sie']) {
    const before = person === 'er' ? 'Er' : person === 'sie' ? 'Sie' : person === 'wir' ? 'Wir' : person === 'ihr' ? 'Ihr' : person === 'du' ? 'Du' : 'Ich'
    gapExtra.push({
      id: `gx${String(g++).padStart(2,'0')}`,
      before,
      after: 'gern.',
      infinitive: v.infinitive,
      solution: v.forms[person],
      difficulty: v.difficulty,
    })
  }
}

const partExtra = [
  ['wohnen','gewohnt'],['hören','gehört'],['kochen','gekocht'],['malen','gemalt'],['sagen','gesagt'],
  ['arbeiten','gearbeitet'],['öffnen','geöffnet'],['geben','gegeben'],['sprechen','gesprochen'],
  ['treffen','getroffen'],['werfen','geworfen'],['fahren','gefahren'],['schlafen','geschlafen'],
  ['laufen','gelaufen'],['werden','geworden'],['wissen','gewusst'],['wollen','gewollt'],
  ['können','gekonnt'],['müssen','gemusst'],['dürfen','gedurft'],['sollen','gesollt'],['mögen','gemocht'],
  ['trainieren','trainiert'],['organisieren','organisiert'],['fotografieren','fotografiert'],
]

const perfectExtra = []
let p = 11
const perfectBase = [
  ['Ich habe gewohnt.','haben','habe','gewohnt',1],
  ['Du hast gehört.','haben','hast','gehört',1],
  ['Er hat gekocht.','haben','hat','gekocht',1],
  ['Wir sind gefahren.','sein','sind','gefahren',2],
  ['Ihr seid gelaufen.','sein','seid','gelaufen',2],
  ['Sie hat geschlafen.','haben','hat','geschlafen',2],
  ['Lena ist gelaufen.','sein','ist','gelaufen',2],
  ['Ben hat gesprochen.','haben','hat','gesprochen',2],
  ['Mia ist gefahren.','sein','ist','gefahren',2],
  ['Paul hat gegeben.','haben','hat','gegeben',2],
  ['Wir haben gearbeitet.','haben','haben','gearbeitet',1],
  ['Du bist gelaufen.','sein','bist','gelaufen',2],
  ['Ich habe geöffnet.','haben','habe','geöffnet',2],
  ['Sie haben fotografiert.','haben','haben','fotografiert',2],
  ['Der Zug ist gefahren.','sein','ist','gefahren',3],
  ['Die Kinder haben gemalt.','haben','haben','gemalt',1],
  ['Omar hat trainiert.','haben','hat','trainiert',2],
  ['Amira ist gelaufen.','sein','ist','gelaufen',2],
  ['Finn hat geworfen.','haben','hat','geworfen',3],
  ['Ida hat getroffen.','haben','hat','getroffen',2],
]
for (const [sentence, auxiliary, auxiliaryForm, participle, difficulty] of perfectBase) {
  perfectExtra.push({ id: `px${String(p++).padStart(2,'0')}`, sentence, auxiliary, auxiliaryForm, participle, difficulty })
}
// more perfects from people
for (let i = 0; i < 30; i++) {
  const who = people[i % people.length]
  const aux = i % 2 === 0
  perfectExtra.push({
    id: `px${String(p++).padStart(2,'0')}`,
    sentence: aux ? `${who} hat gesagt.` : `${who} ist gelaufen.`,
    auxiliary: aux ? 'haben' : 'sein',
    auxiliaryForm: 'hat',
    participle: aux ? 'gesagt' : 'gelaufen',
    difficulty: aux ? 1 : 2,
  })
  if (!aux) perfectExtra[perfectExtra.length - 1].auxiliaryForm = 'ist'
}

const pretExtra = [
  ['wohnen','wohnte'],['hören','hörte'],['kochen','kochte'],['sagen','sagte'],['arbeiten','arbeitete'],
  ['geben','gab'],['sehen','sah'],['fahren','fuhr'],['laufen','lief'],['schlafen','schlief'],
  ['werden','wurde'],['können','konnte'],['müssen','musste'],['wollen','wollte'],['wissen','wusste'],
]

writeExtra('verbs.extra.ts', `import type { VerbParadigm, GapSentence, PerfectItem, Person } from './verbs'

export const verbParadigmsExtra: readonly VerbParadigm[] = ${JSON.stringify(verbExtra, null, 2)}

export const gapSentencesExtra: readonly GapSentence[] = ${JSON.stringify(gapExtra, null, 2)}

export const participlePairsExtra = ${JSON.stringify(partExtra.map(([infinitive, participle]) => ({ infinitive, participle })), null, 2)} as const

export const perfectItemsExtra: readonly PerfectItem[] = ${JSON.stringify(perfectExtra, null, 2)}

export const preteriteFormsExtra = ${JSON.stringify(pretExtra.map(([infinitive, form]) => ({ infinitive, form })), null, 2)} as const
`)

// ---------- TENSES ----------
function tensePool(id, verb, difficulty, forms) {
  return { id, verb, difficulty, forms }
}
const tenseExtra = []
const tenseVerbs = [
  ['malen','male','malte','gemalt','haben',1],
  ['kochen','kocht','kochte','gekocht','haben',1],
  ['wohnen','wohnt','wohnte','gewohnt','haben',1],
  ['hören','hört','hörte','gehört','haben',1],
  ['sagen','sagt','sagte','gesagt','haben',1],
  ['arbeiten','arbeitet','arbeitete','gearbeitet','haben',2],
  ['öffnen','öffnet','öffnete','geöffnet','haben',2],
  ['fahren','fährt','fuhr','gefahren','sein',2],
  ['laufen','läuft','lief','gelaufen','sein',2],
  ['schlafen','schläft','schlief','geschlafen','haben',2],
  ['geben','gibt','gab','gegeben','haben',2],
  ['sehen','sieht','sah','gesehen','haben',2],
  ['sprechen','spricht','sprach','gesprochen','haben',2],
  ['treffen','trifft','traf','getroffen','haben',2],
  ['werfen','wirft','warf','geworfen','haben',3],
  ['kommen','kommt','kam','gekommen','sein',2],
  ['bleiben','bleibt','blieb','geblieben','sein',2],
  ['fliegen','fliegt','flog','geflogen','sein',3],
  ['schwimmen','schwimmt','schwamm','geschwommen','sein',3],
  ['finden','findet','fand','gefunden','haben',2],
]
tenseVerbs.forEach(([verb, praes, praet, part, aux, difficulty], i) => {
  const who = people[i % people.length]
  const auxPraes = aux === 'sein' ? 'ist' : 'hat'
  const auxPast = aux === 'sein' ? 'war' : 'hatte'
  const auxInf = aux
  tenseExtra.push(tensePool(`tx${verb}`, verb, difficulty, {
    praesens: { tense: 'praesens', sentence: `${who} ${praes}.`, parts: [praes] },
    praeteritum: { tense: 'praeteritum', sentence: `${who} ${praet}.`, parts: [praet] },
    perfekt: { tense: 'perfekt', sentence: `${who} ${auxPraes} ${part}.`, parts: [auxPraes, part] },
    plusquam: { tense: 'plusquam', sentence: `${who} ${auxPast} ${part}.`, parts: [auxPast, part] },
    futur1: { tense: 'futur1', sentence: `${who} wird ${verb}.`, parts: ['wird', verb] },
    futur2: { tense: 'futur2', sentence: `${who} wird ${part} ${auxInf}.`, parts: ['wird', part, auxInf] },
  }))
})

const recogExtra = []
let r = 11
for (const pool of tenseExtra) {
  for (const tense of ['praesens','praeteritum','perfekt','plusquam','futur1','futur2']) {
    recogExtra.push({
      id: `trx${String(r++).padStart(2,'0')}`,
      sentence: pool.forms[tense].sentence,
      tense,
      difficulty: pool.difficulty,
    })
  }
}

writeExtra('tenses.extra.ts', `import type { TensePool, TenseId } from './tenses'

export const tensePoolsExtra: readonly TensePool[] = ${JSON.stringify(tenseExtra, null, 2)} as unknown as readonly TensePool[]

export const recognitionSentencesExtra = ${JSON.stringify(recogExtra, null, 2)} as const
`)

// ---------- VOICE ----------
const voiceExtra = []
let vid = 17
const voiceAgents = [
  ['der Lehrer','die Aufgabe','die Aufgabe','vom Lehrer','erklärt','erklären'],
  ['die Köchin','das Essen','das Essen','von der Köchin','gekocht','kochen'],
  ['der Junge','den Ball','der Ball','vom Jungen','geschossen','schießen'],
  ['die Kinder','ein Haus','ein Haus','von den Kindern','gebaut','bauen'],
  ['Mia','das Fenster','das Fenster','von Mia','geöffnet','öffnen'],
  ['Paul','die Kiste','die Kiste','von Paul','getragen','tragen'],
  ['der Mechaniker','das Fahrrad','das Fahrrad','vom Mechaniker','repariert','reparieren'],
  ['die Feuerwehr','das Feuer','das Feuer','von der Feuerwehr','gelöscht','löschen'],
  ['die Klasse','den Text','der Text','von der Klasse','gelesen','lesen'],
  ['der Hausmeister','die Tür','die Tür','vom Hausmeister','geschlossen','schließen'],
]
const voiceTenses = [
  ['praesens', (obj, agent, part) => [`wird`, part], (a, o, v) => `${a} ${v} ${o}.`, (p, ag, part) => `${p} wird ${ag} ${part}.`],
  ['praeteritum', (obj, agent, part) => [`wurde`, part], (a, o, v) => `${a} ${v}te ${o}.`, (p, ag, part) => `${p} wurde ${ag} ${part}.`],
  ['perfekt', (obj, agent, part) => [`ist`, part, 'worden'], (a, o, v) => `${a} hat ${o} ${v}.`, (p, ag, part) => `${p} ist ${ag} ${part} worden.`],
  ['plusquam', (obj, agent, part) => [`war`, part, 'worden'], (a, o, v) => `${a} hatte ${o} ${v}.`, (p, ag, part) => `${p} war ${ag} ${part} worden.`],
  ['futur1', (obj, agent, part) => [`wird`, part, 'werden'], (a, o, v) => `${a} wird ${o} ${v}.`, (p, ag, part) => `${p} wird ${ag} ${part} werden.`],
]
// Simpler curated pairs
const curatedVoice = [
  [1,'praesens','Der Arzt untersucht den Patienten.','Der Patient wird vom Arzt untersucht.','der Arzt','der Patient','den Patienten','vom Arzt',['wird','untersucht']],
  [1,'praesens','Die Mutter weckt das Kind.','Das Kind wird von der Mutter geweckt.','die Mutter','das Kind','das Kind','von der Mutter',['wird','geweckt']],
  [1,'praesens','Der Bäcker backt das Brot.','Das Brot wird vom Bäcker gebacken.','der Bäcker','das Brot','das Brot','vom Bäcker',['wird','gebacken']],
  [1,'praesens','Die Polizei sucht den Dieb.','Der Dieb wird von der Polizei gesucht.','die Polizei','der Dieb','den Dieb','von der Polizei',['wird','gesucht']],
  [1,'praesens','Der Gärtner gießt die Blumen.','Die Blumen werden vom Gärtner gegossen.','der Gärtner','die Blumen','die Blumen','vom Gärtner',['werden','gegossen']],
  [1,'praesens','Die Autorin schreibt den Roman.','Der Roman wird von der Autorin geschrieben.','die Autorin','der Roman','den Roman','von der Autorin',['wird','geschrieben']],
  [1,'praesens','Der Trainer lobt die Mannschaft.','Die Mannschaft wird vom Trainer gelobt.','der Trainer','die Mannschaft','die Mannschaft','vom Trainer',['wird','gelobt']],
  [1,'praesens','Die Nachbarin füttert die Katze.','Die Katze wird von der Nachbarin gefüttert.','die Nachbarin','die Katze','die Katze','von der Nachbarin',['wird','gefüttert']],
  [2,'praeteritum','Der Arzt untersuchte den Patienten.','Der Patient wurde vom Arzt untersucht.','der Arzt','der Patient','den Patienten','vom Arzt',['wurde','untersucht']],
  [2,'praeteritum','Die Mutter weckte das Kind.','Das Kind wurde von der Mutter geweckt.','die Mutter','das Kind','das Kind','von der Mutter',['wurde','geweckt']],
  [2,'praeteritum','Der Bäcker backte das Brot.','Das Brot wurde vom Bäcker gebacken.','der Bäcker','das Brot','das Brot','vom Bäcker',['wurde','gebacken']],
  [2,'praeteritum','Die Polizei suchte den Dieb.','Der Dieb wurde von der Polizei gesucht.','die Polizei','der Dieb','den Dieb','von der Polizei',['wurde','gesucht']],
  [2,'praeteritum','Der Gärtner goss die Blumen.','Die Blumen wurden vom Gärtner gegossen.','der Gärtner','die Blumen','die Blumen','vom Gärtner',['wurden','gegossen']],
  [2,'praeteritum','Die Autorin schrieb den Roman.','Der Roman wurde von der Autorin geschrieben.','die Autorin','der Roman','den Roman','von der Autorin',['wurde','geschrieben']],
  [2,'praeteritum','Der Trainer lobte die Mannschaft.','Die Mannschaft wurde vom Trainer gelobt.','der Trainer','die Mannschaft','die Mannschaft','vom Trainer',['wurde','gelobt']],
  [2,'praeteritum','Die Nachbarin fütterte die Katze.','Die Katze wurde von der Nachbarin gefüttert.','die Nachbarin','die Katze','die Katze','von der Nachbarin',['wurde','gefüttert']],
  [3,'perfekt','Der Arzt hat den Patienten untersucht.','Der Patient ist vom Arzt untersucht worden.','der Arzt','der Patient','den Patienten','vom Arzt',['ist','untersucht','worden']],
  [3,'perfekt','Die Mutter hat das Kind geweckt.','Das Kind ist von der Mutter geweckt worden.','die Mutter','das Kind','das Kind','von der Mutter',['ist','geweckt','worden']],
  [3,'perfekt','Der Bäcker hat das Brot gebacken.','Das Brot ist vom Bäcker gebacken worden.','der Bäcker','das Brot','das Brot','vom Bäcker',['ist','gebacken','worden']],
  [3,'perfekt','Die Polizei hat den Dieb gesucht.','Der Dieb ist von der Polizei gesucht worden.','die Polizei','der Dieb','den Dieb','von der Polizei',['ist','gesucht','worden']],
  [3,'perfekt','Der Gärtner hat die Blumen gegossen.','Die Blumen sind vom Gärtner gegossen worden.','der Gärtner','die Blumen','die Blumen','vom Gärtner',['sind','gegossen','worden']],
  [3,'perfekt','Die Autorin hat den Roman geschrieben.','Der Roman ist von der Autorin geschrieben worden.','die Autorin','der Roman','den Roman','von der Autorin',['ist','geschrieben','worden']],
  [3,'plusquam','Der Arzt hatte den Patienten untersucht.','Der Patient war vom Arzt untersucht worden.','der Arzt','der Patient','den Patienten','vom Arzt',['war','untersucht','worden']],
  [3,'plusquam','Die Mutter hatte das Kind geweckt.','Das Kind war von der Mutter geweckt worden.','die Mutter','das Kind','das Kind','von der Mutter',['war','geweckt','worden']],
  [3,'plusquam','Der Bäcker hatte das Brot gebacken.','Das Brot war vom Bäcker gebacken worden.','der Bäcker','das Brot','das Brot','vom Bäcker',['war','gebacken','worden']],
  [3,'plusquam','Die Polizei hatte den Dieb gesucht.','Der Dieb war von der Polizei gesucht worden.','die Polizei','der Dieb','den Dieb','von der Polizei',['war','gesucht','worden']],
  [3,'futur1','Der Arzt wird den Patienten untersuchen.','Der Patient wird vom Arzt untersucht werden.','der Arzt','der Patient','den Patienten','vom Arzt',['wird','untersucht','werden']],
  [3,'futur1','Die Mutter wird das Kind wecken.','Das Kind wird von der Mutter geweckt werden.','die Mutter','das Kind','das Kind','von der Mutter',['wird','geweckt','werden']],
  [3,'futur1','Der Bäcker wird das Brot backen.','Das Brot wird vom Bäcker gebacken werden.','der Bäcker','das Brot','das Brot','vom Bäcker',['wird','gebacken','werden']],
  [3,'futur1','Die Polizei wird den Dieb suchen.','Der Dieb wird von der Polizei gesucht werden.','die Polizei','der Dieb','den Dieb','von der Polizei',['wird','gesucht','werden']],
  [1,'praesens','Der Schüler löst die Aufgabe.','Die Aufgabe wird vom Schüler gelöst.','der Schüler','die Aufgabe','die Aufgabe','vom Schüler',['wird','gelöst']],
  [1,'praesens','Die Lehrerin sammelt die Hefte.','Die Hefte werden von der Lehrerin gesammelt.','die Lehrerin','die Hefte','die Hefte','von der Lehrerin',['werden','gesammelt']],
  [1,'praesens','Der Postbote bringt den Brief.','Der Brief wird vom Postboten gebracht.','der Postbote','der Brief','den Brief','vom Postboten',['wird','gebracht']],
  [1,'praesens','Die Köchin schneidet das Gemüse.','Das Gemüse wird von der Köchin geschnitten.','die Köchin','das Gemüse','das Gemüse','von der Köchin',['wird','geschnitten']],
  [1,'praesens','Der Maler streicht die Wand.','Die Wand wird vom Maler gestrichen.','der Maler','die Wand','die Wand','vom Maler',['wird','gestrichen']],
  [2,'praeteritum','Der Schüler löste die Aufgabe.','Die Aufgabe wurde vom Schüler gelöst.','der Schüler','die Aufgabe','die Aufgabe','vom Schüler',['wurde','gelöst']],
  [2,'praeteritum','Die Lehrerin sammelte die Hefte.','Die Hefte wurden von der Lehrerin gesammelt.','die Lehrerin','die Hefte','die Hefte','von der Lehrerin',['wurden','gesammelt']],
  [2,'praeteritum','Der Postbote brachte den Brief.','Der Brief wurde vom Postboten gebracht.','der Postbote','der Brief','den Brief','vom Postboten',['wurde','gebracht']],
  [3,'perfekt','Der Schüler hat die Aufgabe gelöst.','Die Aufgabe ist vom Schüler gelöst worden.','der Schüler','die Aufgabe','die Aufgabe','vom Schüler',['ist','gelöst','worden']],
  [3,'perfekt','Die Lehrerin hat die Hefte gesammelt.','Die Hefte sind von der Lehrerin gesammelt worden.','die Lehrerin','die Hefte','die Hefte','von der Lehrerin',['sind','gesammelt','worden']],
  [3,'futur1','Der Schüler wird die Aufgabe lösen.','Die Aufgabe wird vom Schüler gelöst werden.','der Schüler','die Aufgabe','die Aufgabe','vom Schüler',['wird','gelöst','werden']],
  [3,'plusquam','Der Postbote hatte den Brief gebracht.','Der Brief war vom Postboten gebracht worden.','der Postbote','der Brief','den Brief','vom Postboten',['war','gebracht','worden']],
]
for (const row of curatedVoice) {
  const [difficulty, tense, active, passive, agent, patient, activeObject, passiveAgent, parts] = row
  voiceExtra.push({ id: `vx${String(vid++).padStart(2,'0')}`, difficulty, tense, active, passive, agent, patient, activeObject, passiveAgent, parts })
}

writeExtra('voice.extra.ts', `import type { VoicePair } from './voice'

export const voicePairsExtra: readonly VoicePair[] = ${JSON.stringify(voiceExtra, null, 2)}

export const voiceErrorsExtra = [
  { id: 'vex1', faulty: 'Das Brot wird vom Bäcker backen.', correct: 'Das Brot wird vom Bäcker gebacken.', error: 'backen', note: 'Nach wird steht das Partizip II: gebacken.' },
  { id: 'vex2', faulty: 'Das Kind ist geweckt geworden.', correct: 'Das Kind ist geweckt worden.', error: 'geworden', note: 'Im Passiv Perfekt steht worden.' },
  { id: 'vex3', faulty: 'Die Blumen wird gegossen.', correct: 'Die Blumen werden gegossen.', error: 'wird', note: 'Die Blumen ist Plural: werden.' },
  { id: 'vex4', faulty: 'Der Brief wird gebracht werden sein.', correct: 'Der Brief wird gebracht worden sein.', error: 'werden', note: 'Futur II Passiv: worden sein.' },
  { id: 'vex5', faulty: 'Die Aufgabe wurden gelöst.', correct: 'Die Aufgabe wurde gelöst.', error: 'wurden', note: 'Die Aufgabe ist Singular: wurde.' },
  { id: 'vex6', faulty: 'Der Patient wird untersuchen.', correct: 'Der Patient wird untersucht.', error: 'untersuchen', note: 'Passiv Präsens: wird + Partizip II.' },
  { id: 'vex7', faulty: 'Das Feuer ist gelöscht geworden.', correct: 'Das Feuer ist gelöscht worden.', error: 'geworden', note: 'worden, nicht geworden.' },
  { id: 'vex8', faulty: 'Die Hefte wird gesammelt.', correct: 'Die Hefte werden gesammelt.', error: 'wird', note: 'Plural: werden.' },
]
`)

console.log('Core extras written. Continuing capitalization + spelling...')

// Cap + spelling will be in part 2 of script execution via dynamic append
writeFileSync(join(root, 'scripts', '_emit-part2-ready.txt'), 'ok')
console.log('Part 1 done')
