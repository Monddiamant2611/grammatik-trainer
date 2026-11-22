function cap(id, difficulty, correct, nouns, tokens, toggle = true) {
  const faulty = tokens.map((t) => `${t.before ?? ''}${t.faulty}${t.after ?? ''}`).join(' ')
  return { id, difficulty, tokens, nouns, faultySentence: faulty, correctSentence: correct, toggle }
}

const specs = [
  ['xk21', 1, 'Der Hase hüpft über die Wiese.', ['Hase', 'Wiese'], 'der hase hüpft über die wiese'],
  ['xk22', 1, 'Die Katze jagt die Maus.', ['Katze', 'Maus'], 'die katze jagt die maus'],
  ['xk23', 2, 'Am Dienstag gibt es Sport.', ['Dienstag', 'Sport'], 'am dienstag gibt es sport'],
  ['xk24', 2, 'Im Frühling blühen die Tulpen.', ['Frühling', 'Tulpen'], 'im frühling blühen die tulpen'],
  ['xk25', 2, 'Paul lernt Französisch in der Schule.', ['Paul', 'Französisch', 'Schule'], 'paul lernt französisch in der schule'],
  ['xk26', 2, 'Frau Weber erklärt die Regel.', ['Frau', 'Weber', 'Regel'], 'frau weber erklärt die regel'],
  ['xk27', 2, 'Die Donau fließt durch Ungarn.', ['Donau', 'Ungarn'], 'die donau fließt durch ungarn'],
  ['xk28', 1, 'Der Bäcker verkauft Brötchen.', ['Bäcker', 'Brötchen'], 'der bäcker verkauft brötchen'],
  ['xk29', 3, 'Leise schläft das Baby im Bett.', ['Baby', 'Bett'], 'leise schläft das baby im bett'],
  ['xk30', 2, 'Im Januar schneit es oft.', ['Januar'], 'im januar schneit es oft'],
  ['xk31', 2, 'Herr Schmidt fährt nach Hamburg.', ['Herr', 'Schmidt', 'Hamburg'], 'herr schmidt fährt nach hamburg'],
  ['xk32', 2, 'Die Schüler lesen Englisch.', ['Schüler', 'Englisch'], 'die schüler lesen englisch'],
  ['xk33', 2, 'Ostern schenken wir Ostereier.', ['Ostern', 'Ostereier'], 'ostern schenken wir ostereier'],
  ['xk34', 2, 'Der Herbst bringt bunte Blätter.', ['Herbst', 'Blätter'], 'der herbst bringt bunte blätter'],
  ['xk35', 2, 'München ist eine Landeshauptstadt.', ['München', 'Landeshauptstadt'], 'münchen ist eine landeshauptstadt'],
  ['xk36', 3, 'Eilig läuft Jonas zur Haltestelle.', ['Jonas', 'Haltestelle'], 'eilig läuft jonas zur haltestelle'],
  ['xk37', 2, 'Die Isar fließt durch München.', ['Isar', 'München'], 'die isar fließt durch münchen'],
  ['xk38', 1, 'Das Kind malt einen Stern.', ['Kind', 'Stern'], 'das kind malt einen stern'],
  ['xk39', 2, 'Am Samstag spielen wir Fußball.', ['Samstag', 'Fußball'], 'am samstag spielen wir fußball'],
  ['xk40', 2, 'Danke Ihnen für die Hilfe.', ['Hilfe'], 'danke ihnen für die hilfe'],
  ['xk41', 2, 'Im Oktober fallen die Blätter.', ['Oktober', 'Blätter'], 'im oktober fallen die blätter'],
  ['xk42', 3, 'Gerne hilft Lea der Lehrerin.', ['Lea', 'Lehrerin'], 'gerne hilft lea der lehrerin'],
  ['xk43', 2, 'Der Neckar fließt nach Mannheim.', ['Neckar', 'Mannheim'], 'der neckar fließt nach mannheim'],
  ['xk44', 2, 'Im Winter fahren wir Ski.', ['Winter', 'Ski'], 'im winter fahren wir ski'],
  ['xk45', 2, 'Silvester bleiben wir zu Hause.', ['Silvester'], 'silvester bleiben wir zu hause'],
  ['xk46', 3, 'Plötzlich beginnt der Unterricht.', ['Unterricht'], 'plötzlich beginnt der unterricht'],
  ['xk47', 2, 'Felix liest die Geschichte vom Fuchs.', ['Felix', 'Geschichte', 'Fuchs'], 'felix liest die geschichte vom fuchs'],
  ['xk48', 1, 'Der Mond scheint hell.', ['Mond'], 'der mond scheint hell'],
  ['xk49', 2, 'Am Mittwoch schreiben wir einen Test.', ['Mittwoch', 'Test'], 'am mittwoch schreiben wir einen test'],
  ['xk50', 2, 'Italienisch klingt melodisch.', ['Italienisch'], 'italienisch klingt melodisch'],
  ['xk51', 2, 'Die Elbe durchquert Dresden.', ['Elbe', 'Dresden'], 'die elbe durchquert dresden'],
  ['xk52', 2, 'Pfingsten besuchen wir Oma.', ['Pfingsten', 'Oma'], 'pfingsten besuchen wir oma'],
  ['xk53', 3, 'Heute liest Hannah ein Buch.', ['Hannah', 'Buch'], 'heute liest hannah ein buch'],
  ['xk54', 2, 'Köln liegt am Rhein.', ['Köln', 'Rhein'], 'köln liegt am rhein'],
  ['xk55', 2, 'Im Sommer baden wir im See.', ['Sommer', 'See'], 'im sommer baden wir im see'],
  ['xk56', 2, 'Herr Braun hält einen Vortrag.', ['Herr', 'Braun', 'Vortrag'], 'herr braun hält einen vortrag'],
  ['xk57', 3, 'Langsam verdunkelt sich der Himmel.', ['Himmel'], 'langsam verdunkelt sich der himmel'],
  ['xk58', 2, 'Am Donnerstag beginnt der Kurs.', ['Donnerstag', 'Kurs'], 'am donnerstag beginnt der kurs'],
  ['xk59', 2, 'Spanisch ist eine romanische Sprache.', ['Spanisch', 'Sprache'], 'spanisch ist eine romanische sprache'],
  ['xk60', 2, 'Die Oder grenzt an Polen.', ['Oder', 'Polen'], 'die oder grenzt an polen'],
  ['xk61', 2, 'Der Frühling lockt mit Sonne.', ['Frühling', 'Sonne'], 'der frühling lockt mit sonne'],
  ['xk62', 1, 'Die Ente schwimmt im Teich.', ['Ente', 'Teich'], 'die ente schwimmt im teich'],
  ['xk63', 2, 'Nikolaus bringt kleine Geschenke.', ['Nikolaus', 'Geschenke'], 'nikolaus bringt kleine geschenke'],
  ['xk64', 3, 'Schnell schließt Eva die Tür.', ['Eva', 'Tür'], 'schnell schließt eva die tür'],
  ['xk65', 2, 'Bern liegt in der Schweiz.', ['Bern', 'Schweiz'], 'bern liegt in der schweiz'],
  ['xk66', 2, 'Im Advent brennt der Kerzenkranz.', ['Advent', 'Kerzenkranz'], 'im advent brennt der kerzenkranz'],
  ['xk67', 2, 'Danke Sie für Ihre Mühe.', ['Mühe'], 'danke sie für ihre mühe'],
  ['xk68', 1, 'Der Apfel fällt vom Baum.', ['Apfel', 'Baum'], 'der apfel fällt vom baum'],
  ['xk69', 2, 'Am Sonntag ruhen wir aus.', ['Sonntag'], 'am sonntag ruhen wir aus'],
  ['xk70', 2, 'Griechisch hat andere Buchstaben.', ['Griechisch', 'Buchstaben'], 'griechisch hat andere buchstaben'],
  ['xk71', 2, 'Mainz liegt am Rhein.', ['Mainz', 'Rhein'], 'mainz liegt am rhein'],
  ['xk72', 2, 'Karneval feiern wir im Winter.', ['Karneval', 'Winter'], 'karneval feiern wir im winter'],
  ['xk73', 3, 'Oft schreibt Paul mit der Hand.', ['Paul', 'Hand'], 'oft schreibt paul mit der hand'],
  ['xk74', 2, 'Der Inn fließt in die Donau.', ['Inn', 'Donau'], 'der inn fließt in die donau'],
  ['xk75', 2, 'Im März beginnt der Frühling.', ['März', 'Frühling'], 'im märz beginnt der frühling'],
  ['xk76', 1, 'Tim trägt einen Rucksack.', ['Tim', 'Rucksack'], 'tim trägt einen rucksack'],
  ['xk77', 2, 'Herr Wagner unterrichtet Klasse 5b.', ['Herr', 'Wagner', 'Klasse'], 'herr wagner unterrichtet klasse 5b'],
  ['xk78', 3, 'Gestern holte Sofia den Postboten ein.', ['Sofia', 'Postboten'], 'gestern holte sofia den postboten ein'],
  ['xk79', 2, 'Norwegisch hat viele Vokale.', ['Norwegisch', 'Vokale'], 'norwegisch hat viele vokale'],
  ['xk80', 2, 'Bonn ist eine Bundesstadt.', ['Bonn', 'Bundesstadt'], 'bonn ist eine bundesstadt'],
  ['xk81', 2, 'Weihnachten duftet nach Plätzchen.', ['Weihnachten', 'Plätzchen'], 'weihnachten duftet nach plätzchen'],
  ['xk82', 3, 'Bald startet das Fußballturnier.', ['Fußballturnier'], 'bald startet das fußballturnier'],
  ['xk83', 1, 'Der Frosch sitzt auf dem Stein.', ['Frosch', 'Stein'], 'der frosch sitzt auf dem stein'],
  ['xk84', 2, 'Am Freitag fahren wir in die Berge.', ['Freitag', 'Berge'], 'am freitag fahren wir in die berge'],
  ['xk85', 2, 'Türkisch hat einen besonderen Klang.', ['Türkisch', 'Klang'], 'türkisch hat einen besonderen klang'],
  ['xk86', 2, 'Wien liegt an der Donau.', ['Wien', 'Donau'], 'wien liegt an der donau'],
  ['xk87', 1, 'Der Roboter baut ein Modell.', ['Roboter', 'Modell'], 'der roboter baut ein modell'],
  ['xk88', 2, 'Im November wird es kalt.', ['November'], 'im november wird es kalt'],
  ['xk89', 2, 'Dänisch klingt anders.', ['Dänisch'], 'dänisch klingt anders'],
  ['xk90', 2, 'Leipzig hat eine Oper.', ['Leipzig', 'Oper'], 'leipzig hat eine oper'],
]

const reasonMap = {
  sentence: ['der', 'die', 'das', 'im', 'am', 'heute', 'leise', 'eilig', 'gerne', 'schnell', 'plötzlich', 'langsam', 'oft', 'bald', 'gestern', 'montags', 'abends'],
  weekday: ['montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag', 'samstag', 'sonntag'],
  month: ['januar', 'februar', 'märz', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'dezember'],
  season: ['frühling', 'sommer', 'herbst', 'winter'],
  holiday: ['ostern', 'weihnachten', 'pfingsten', 'silvester', 'nikolaus', 'karneval', 'advent'],
  language: ['englisch', 'französisch', 'spanisch', 'italienisch', 'griechisch', 'norwegisch', 'türkisch'],
  name: ['paul', 'jonas', 'lea', 'felix', 'hannah', 'tim', 'eva', 'sofia', 'schmidt', 'weber', 'braun', 'wagner', 'hamburg', 'münchen', 'köln', 'dresden', 'mannheim', 'polen', 'bern', 'bonn', 'wien', 'mainz', 'ungarn'],
  address: ['frau', 'herr', 'ihnen', 'sie'],
}

function reasonFor(word) {
  const low = word.toLowerCase()
  for (const [reason, list] of Object.entries(reasonMap)) {
    if (list.includes(low)) return reason
  }
  if (/^[A-Z]/.test(word) && nounsIncludes(word)) return 'noun'
  return 'noun'
}

function nounsIncludes(word) {
  return true
}

function renderToggle(tokens, side) {
  return tokens.map((t) => `${t.before ?? ''}${side === 'faulty' ? t.faulty : t.correct}${t.after ?? ''}`).join(' ')
}

const built = specs.map(([id, difficulty, correct, nouns, faulty, toggle]) => {
  const faultyWords = faulty.split(/\s+/)
  const correctWords = correct.replace(/[„“"?.!,]/g, '').split(/\s+/)
  const tokens = faultyWords.map((fw, index) => {
    const cw = correctWords[index] ?? fw
    const cleanFw = fw.replace(/[„“"?.!,]/g, '')
    const cleanCw = cw.replace(/[„“"?.!,]/g, '')
    if (cleanFw === cleanCw && cleanFw.toLowerCase() === cleanFw) {
      if (index === 0) return { faulty: cleanFw, correct: cleanCw.charAt(0).toUpperCase() + cleanCw.slice(1), reason: 'sentence' }
      return { faulty: cleanFw, correct: cleanCw }
    }
    if (cleanFw.toLowerCase() === cleanCw.toLowerCase() && cleanCw !== cleanFw) {
      const reason = nouns.includes(cleanCw) ? 'noun' : reasonFor(cleanCw)
      return { faulty: cleanFw, correct: cleanCw, reason }
    }
    if (cleanFw !== cleanCw) {
      let reason = nouns.includes(cleanCw) ? 'noun' : reasonFor(cleanCw)
      if (['paul', 'jonas', 'lea'].includes(cleanFw)) reason = 'name'
      const note =
        index === 0 && cleanFw.toLowerCase() === cleanFw
          ? `${cleanCw.charAt(0).toUpperCase() + cleanCw.slice(1)} steht nur wegen des Satzanfangs groß.`
          : undefined
      return { faulty: cleanFw, correct: cleanCw, reason, note }
    }
    return { faulty: cleanFw, correct: cleanCw }
  })
  const punctuationMatch = correct.match(/[?.!,]+$/)
  if (punctuationMatch && tokens.length > 0) {
    tokens[tokens.length - 1].after = punctuationMatch[0]
  }
  return cap(id, difficulty, correct, nouns, tokens, toggle !== false)
})

export const capitalizationExtra = built.filter((sentence) => {
  if (!sentence.toggle) return true
  return (
    renderToggle(sentence.tokens, 'faulty') === sentence.faultySentence
    && renderToggle(sentence.tokens, 'correct') === sentence.correctSentence
  )
})