export interface GlossaryEntry {
  term: string
  definition: string
  example: string
}

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: 'Substantiv', definition: 'Wortart für Personen, Tiere, Dinge, Orte oder Begriffe. Gleichbedeutend mit Nomen.', example: 'der Hund, die Freude' },
  { term: 'Nomen', definition: 'Gleichbedeutender Fachbegriff zu Substantiv.', example: 'die Schule' },
  { term: 'Artikel', definition: 'Begleiter eines Substantivs. Er zeigt oft Genus, Numerus und Kasus.', example: 'der Hund, eine Katze' },
  { term: 'bestimmter Artikel', definition: 'Artikel, der etwas Bestimmtes nennt.', example: 'der, die, das' },
  { term: 'unbestimmter Artikel', definition: 'Artikel, der etwas Unbestimmtes nennt.', example: 'ein, eine' },
  { term: 'Genus', definition: 'Grammatisches Geschlecht: maskulin, feminin oder neutral.', example: 'der Baum, die Blume, das Haus' },
  { term: 'maskulin', definition: 'Männliches grammatisches Geschlecht.', example: 'der Baum' },
  { term: 'feminin', definition: 'Weibliches grammatisches Geschlecht.', example: 'die Blume' },
  { term: 'neutral', definition: 'Sächliches grammatisches Geschlecht.', example: 'das Haus' },
  { term: 'Numerus', definition: 'Zahlform: Singular oder Plural.', example: 'Hund, Hunde' },
  { term: 'Singular', definition: 'Einzahl.', example: 'das Kind' },
  { term: 'Plural', definition: 'Mehrzahl.', example: 'die Kinder' },
  { term: 'Kasus', definition: 'Grammatischer Fall. Die vier Kasus sind Nominativ, Genitiv, Dativ und Akkusativ.', example: 'der Hund, des Hundes, dem Hund, den Hund' },
  { term: 'Nominativ', definition: 'Wer-oder-was-Fall.', example: 'Der Hund schläft.' },
  { term: 'Genitiv', definition: 'Wessen-Fall.', example: 'das Halsband des Hundes' },
  { term: 'Dativ', definition: 'Wem-Fall.', example: 'Ich gebe dem Hund Wasser.' },
  { term: 'Akkusativ', definition: 'Wen-oder-was-Fall.', example: 'Ich sehe den Hund.' },
  { term: 'Eigenname', definition: 'Substantiv für eine bestimmte Person, einen Ort oder ein Gewässer.', example: 'Anna, Leipzig, Rhein' },
  { term: 'Adjektiv', definition: 'Wortart, die eine Eigenschaft nennt und gesteigert werden kann.', example: 'klein, schnell' },
  { term: 'Komparation', definition: 'Steigerung von Adjektiven: Positiv, Komparativ, Superlativ.', example: 'klein, kleiner, am kleinsten' },
  { term: 'Positiv', definition: 'Grundstufe eines Adjektivs.', example: 'lang' },
  { term: 'Komparativ', definition: '1. Steigerungsstufe eines Adjektivs.', example: 'länger' },
  { term: 'Superlativ', definition: 'Höchste Steigerungsstufe eines Adjektivs.', example: 'am längsten' },
  { term: 'Vergleichspartikel', definition: 'Wort, das einen Vergleich anschließt: als oder wie.', example: 'größer als, so groß wie' },
  { term: 'Verb', definition: 'Wortart für eine Tätigkeit, einen Vorgang oder einen Zustand.', example: 'spielen, sein' },
  { term: 'Infinitiv', definition: 'Grundform eines Verbs.', example: 'lesen' },
  { term: 'Konjugation', definition: 'Veränderung eines Verbs. Konjugieren heißt: das Verb an Person und Numerus anpassen.', example: 'ich lese, du liest' },
  { term: 'Person', definition: 'Wer spricht, wen man anspricht oder über wen man spricht: 1., 2. oder 3. Person.', example: 'ich, du, er' },
  { term: 'Personalform', definition: 'Konjugierte Verbform.', example: 'liest' },
  { term: 'Partizip II', definition: 'Verbform, die zum Beispiel im Perfekt und im Passiv steht.', example: 'gelernt, gegangen' },
  { term: 'Hilfsverb', definition: 'Verb, das mit einer anderen Verbform eine zusammengesetzte Form bildet.', example: 'haben, sein, werden' },
  { term: 'Tempus', definition: 'Grammatische Zeitform. Mehrzahl: Tempora.', example: 'Präsens, Perfekt' },
  { term: 'Präsens', definition: 'Gegenwart. Mit einer Zeitangabe kann es auch Zukünftiges ausdrücken.', example: 'Ich lerne.' },
  { term: 'Präteritum', definition: 'Einfache Vergangenheit, typisch für Erzählungen.', example: 'Ich lernte.' },
  { term: 'Perfekt', definition: 'Vollendete Vergangenheit aus Hilfsverb und Partizip II.', example: 'Ich habe gelernt.' },
  { term: 'Plusquamperfekt', definition: 'Vorvergangenheit: etwas liegt vor einem anderen vergangenen Ereignis.', example: 'Ich hatte gelernt.' },
  { term: 'Futur I', definition: 'Zeitform für die Zukunft.', example: 'Ich werde lernen.' },
  { term: 'Futur II', definition: 'Vollendete Zukunft.', example: 'Ich werde gelernt haben.' },
  { term: 'Genus verbi', definition: 'Handlungsrichtung eines Verbs: Aktiv oder Passiv.', example: 'Mia öffnet das Fenster. Das Fenster wird geöffnet.' },
  { term: 'Aktiv', definition: 'Die handelnde Person steht im Mittelpunkt.', example: 'Mia öffnet das Fenster.' },
  { term: 'Passiv', definition: 'Die Handlung beziehungsweise das Betroffene steht im Mittelpunkt.', example: 'Das Fenster wird geöffnet.' },
  { term: 'Subjekt', definition: 'Satzglied, das im Nominativ steht und mit dem Verb übereinstimmt.', example: 'Der Hund schläft.' },
  { term: 'Objekt', definition: 'Satzglied, das von der Handlung betroffen ist, zum Beispiel im Akkusativ.', example: 'Ich sehe den Hund.' },
  { term: 'Vokal', definition: 'Selbstlaut.', example: 'a, e, i, o, u' },
  { term: 'Konsonant', definition: 'Mitlaut, also kein Selbstlaut.', example: 'm, t, n' },
  { term: 'Doppelkonsonant', definition: 'Doppelter Mitlaut, oft nach kurzem betontem Vokal.', example: 'kommen, bitter' },
  { term: 'Diphthong', definition: 'Zwielaut aus zwei Vokalen in einer Silbe.', example: 'ei, au, eu' },
  { term: 'Silbe', definition: 'Sprechteil eines Wortes mit einem Vokal oder Diphthong.', example: 'Schu-le' },
  { term: 'Stamm', definition: 'Wortteil, der in einer Wortfamilie gleich bleibt.', example: 'lern in lernen, lernte' },
  { term: 'Konjunktion', definition: 'Wort, das Sätze oder Satzteile verbindet.', example: 'dass, und, weil' },
  { term: 'Hauptsatz', definition: 'Satz, der allein stehen kann.', example: 'Ich weiß es.' },
  { term: 'Nebensatz', definition: 'Satz, der von einem anderen Satz abhängt.', example: 'Ich weiß, dass es regnet.' },
]

const byLength = [...GLOSSARY].sort((left, right) => right.term.length - left.term.length)

function isLetter(char: string | undefined): boolean {
  return Boolean(char && /\p{L}/u.test(char))
}

export function termsInPrompt(text: string): GlossaryEntry[] {
  const covered = new Set<number>()
  const found: GlossaryEntry[] = []
  for (const entry of byLength) {
    let from = 0
    while (from <= text.length - entry.term.length) {
      const at = text.indexOf(entry.term, from)
      if (at < 0) break
      const end = at + entry.term.length
      const touches = [...covered].some((index) => index >= at && index < end)
      if (!touches && !isLetter(text[at - 1]) && !isLetter(text[end])) {
        for (let index = at; index < end; index += 1) covered.add(index)
        found.push(entry)
        break
      }
      from = at + 1
    }
    if (found.length === 4) break
  }
  return found
}
