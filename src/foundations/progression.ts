import type { FoundationModule, FoundationStep, FoundationTry } from './types'

function choose(prompt: string, answer: string, options: readonly string[], hint: string): FoundationTry {
  return {
    kind: 'choice',
    prompt,
    hint,
    answerId: answer,
    options: options.map((text) => ({ id: text, text })),
  }
}

function practice(parent: string, index: number, title: string, lead: string, prompt: string, options: readonly string[], answer: string, observation: string, hint: string): FoundationStep {
  if (!options.includes(answer)) throw new Error(`Übung ${parent}: Antwort fehlt (${answer})`)
  return {
    id: `${parent}-u${index}`,
    title,
    lead,
    try: choose(prompt, answer, options, hint),
    observation,
    explanation: observation,
  }
}

function slim(step: FoundationStep): FoundationStep {
  if (step.id === 'n1') {
    return {
      ...step,
      lead: 'Ein Substantiv, auch Nomen genannt, benennt zum Beispiel eine Person, ein Tier oder ein Ding.',
      examples: ['Hund', 'Lehrerin'],
      try: choose('Welches Wort ist ein Substantiv?', 'Hund', ['Hund', 'laufen', 'schnell'], 'Ein Substantiv benennt eine Person, ein Tier oder ein Ding.'),
      observation: '„Hund“ benennt ein Tier und ist ein Substantiv. Nomen ist derselbe Fachbegriff.',
      explanation: '„Hund“ benennt ein Tier und ist ein Substantiv. Nomen ist derselbe Fachbegriff.',
    }
  }
  if (step.id === 'n2') {
    return {
      ...step,
      lead: 'Vor viele Substantive kann man der, die oder das setzen.',
      concept: { term: 'Artikelprobe', definition: 'Passt der, die oder das vor das Wort, ist es oft ein Substantiv.' },
      examples: ['der Baum'],
      try: choose('Welche Probe passt zu Baum?', 'der Baum', ['der Baum', 'die Baum', 'das Baum'], 'Probiere der, die und das.'),
      observation: 'Zusammen gehört: der Baum.',
      explanation: 'Zusammen gehört: der Baum.',
    }
  }
  if (step.id === 'n4') {
    return {
      ...step,
      title: 'Numerus: Singular',
      lead: 'Der Numerus ist die Zahlform. Singular bedeutet Einzahl: ein Hund.',
      concept: {
        term: 'Numerus',
        also: 'Zahlform',
        definition: 'Der Singular ist die Einzahl.',
        pairs: [{ term: 'Singular', hint: 'Einzahl' }],
      },
      examples: ['ein Hund'],
      try: choose('In welcher Zahlform steht „Hund“?', 'Singular', ['Singular', 'Plural'], 'Ein Hund ist einer, nicht mehrere.'),
      observation: '„Hund“ steht im Singular, also in der Einzahl.',
      explanation: '„Hund“ steht im Singular, also in der Einzahl.',
      merksatz: 'Singular = Einzahl.',
    }
  }
  if (step.id === 'n5') {
    return {
      ...step,
      lead: 'Ein konkretes Substantiv kann man anfassen oder sehen. Ein abstraktes nicht.',
      examples: ['Tisch'],
      try: choose('Ist „Tisch“ konkret oder abstrakt?', 'konkret', ['konkret', 'abstrakt'], 'Kann man es anfassen oder sehen?'),
      observation: 'Einen Tisch kann man sehen und anfassen. Deshalb ist er konkret.',
      explanation: 'Einen Tisch kann man sehen und anfassen. Deshalb ist er konkret.',
    }
  }
  if (step.id === 'c1') {
    return {
      ...step,
      lead: 'der, die und das begleiten ein Substantiv und zeigen, dass etwas Bestimmtes gemeint ist.',
      concept: { term: 'Artikel', also: 'Begleiter', definition: 'der, die und das sind bestimmte Artikel.' },
      examples: ['der Hund'],
    }
  }
  if (step.id === 'c3') {
    return {
      ...step,
      lead: 'Der Kasus ist der grammatische Fall einer Wortgruppe.',
      concept: { term: 'Kasus', also: 'grammatischer Fall', definition: 'Der Kasus zeigt, welche Rolle eine Wortgruppe im Satz hat.' },
      examples: ['Der Hund bringt dem Kind den Ball.'],
      try: choose('Was ist ein Kasus?', 'ein grammatischer Fall', ['ein grammatischer Fall', 'die Mehrzahl', 'eine Zeitform'], 'Kasus ist ein anderes Wort für Fall.'),
      observation: 'Der Kasus zeigt die Rolle der Wortgruppe im Satz, nicht ihre Zahl und nicht die Zeit.',
      explanation: 'Der Kasus zeigt die Rolle der Wortgruppe im Satz, nicht ihre Zahl und nicht die Zeit.',
      merksatz: 'Kasus = grammatischer Fall.',
    }
  }
  if (step.id === 'c4') {
    return {
      ...step,
      lead: 'Der Hund bringt dem Kind den Ball.',
      try: choose('Bestimme den Kasus von „der Hund“.', 'Nominativ', ['Nominativ', 'Dativ', 'Akkusativ'], 'Welche Wortgruppe antwortet auf Wer oder was?'),
      observation: '„der Hund“ antwortet auf „Wer oder was?“ und steht deshalb im Nominativ.',
      explanation: '„der Hund“ antwortet auf „Wer oder was?“ und steht deshalb im Nominativ.',
      merksatz: 'Nominativ → Wer oder was?',
    }
  }
  if (step.id === 'c5') {
    return {
      ...step,
      lead: 'Der Bruder des Jungen repariert das Fahrrad.',
      try: choose('Bestimme den Kasus von „des Jungen“.', 'Genitiv', ['Nominativ', 'Genitiv', 'Akkusativ'], 'Welche Wortgruppe antwortet auf Wessen?'),
      observation: '„des Jungen“ antwortet auf „Wessen?“ und steht im Genitiv.',
      explanation: '„des Jungen“ antwortet auf „Wessen?“ und steht im Genitiv.',
      merksatz: 'Genitiv → Wessen?',
    }
  }
  if (step.id === 'c6') {
    return {
      ...step,
      lead: 'Die Lehrerin zeigt dem Schüler den Weg.',
      try: choose('Bestimme den Kasus von „dem Schüler“.', 'Dativ', ['Nominativ', 'Dativ', 'Akkusativ'], 'Welche Wortgruppe antwortet auf Wem?'),
      observation: '„dem Schüler“ antwortet auf „Wem?“ und steht im Dativ.',
      explanation: '„dem Schüler“ antwortet auf „Wem?“ und steht im Dativ.',
      merksatz: 'Dativ → Wem?',
    }
  }
  if (step.id === 'c7') {
    return {
      ...step,
      lead: 'Mia gibt ihrer Freundin das Buch.',
      try: choose('Bestimme den Kasus von „das Buch“.', 'Akkusativ', ['Nominativ', 'Dativ', 'Akkusativ'], 'Welche Wortgruppe antwortet auf Wen oder was?'),
      observation: '„das Buch“ antwortet auf „Wen oder was?“ und steht im Akkusativ.',
      explanation: '„das Buch“ antwortet auf „Wen oder was?“ und steht im Akkusativ.',
      merksatz: 'Akkusativ → Wen oder was?',
    }
  }
  if (step.id === 'c8') {
    return {
      ...step,
      lead: 'Beim Maskulinum verändert sich der Artikel mit dem Kasus. Zuerst nur der Genitiv.',
      examples: ['des Hundes'],
      try: choose('Wie heißt „der Hund“ im Genitiv?', 'des Hundes', ['des Hundes', 'dem Hund', 'den Hund'], 'Der Genitiv fragt Wessen?'),
      observation: 'Im Genitiv heißt es des Hundes.',
      explanation: 'Im Genitiv heißt es des Hundes.',
      merksatz: 'Maskulinum, Genitiv: des Hundes.',
    }
  }
  if (step.id === 'c9') {
    return {
      ...step,
      title: 'Feminin: die Frau',
      lead: 'Beim Femininum sehen Genitiv und Dativ gleich aus: der Frau. Der Satz zeigt den Kasus.',
      concept: { term: 'feminin', definition: 'Weibliches Genus. Genitiv und Dativ lauten beide der Frau.' },
      examples: ['Ich helfe der Frau.'],
      try: choose('In welchem Kasus steht „der Frau“ in „Ich helfe der Frau“?', 'Dativ', ['Genitiv', 'Dativ', 'Nominativ'], 'Wer bekommt die Hilfe? Das fragt Wem?'),
      observation: 'Die Form der Frau kann Genitiv oder Dativ sein. Hier antwortet sie auf „Wem?“ und steht im Dativ.',
      explanation: 'Die Form der Frau kann Genitiv oder Dativ sein. Hier antwortet sie auf „Wem?“ und steht im Dativ.',
      merksatz: 'Feminin: Genitiv und Dativ sehen gleich aus.',
    }
  }
  if (step.id === 'a2') {
    return {
      ...step,
      concept: { term: 'Positiv', definition: 'Der Positiv ist die Grundstufe der Komparation.' },
      examples: ['klein'],
      observation: '„klein“ ist die Grundstufe und vergleicht noch nicht.',
      explanation: '„klein“ ist die Grundstufe und vergleicht noch nicht.',
    }
  }
  if (step.id === 't0') {
    return {
      ...step,
      lead: 'Das Tempus, auch Zeitform genannt, ordnet eine Handlung zeitlich ein.',
      concept: { term: 'Tempus', also: 'Zeitform', definition: 'Grammatische Zeitform. Die einzelnen Tempora folgen Schritt für Schritt.' },
      examples: ['Ich lerne.'],
      observation: 'Das Tempus sagt, ob etwas jetzt, früher oder später geschieht.',
      explanation: 'Das Tempus sagt, ob etwas jetzt, früher oder später geschieht.',
    }
  }
  if (step.id === 'p1') {
    return {
      ...step,
      concept: { term: 'Genus verbi', definition: 'Im Aktiv führt das Subjekt die Handlung selbst aus.' },
      observation: 'Der Junge führt die Handlung aus. Der Satz steht im Aktiv.',
      explanation: 'Der Junge führt die Handlung aus. Der Satz steht im Aktiv.',
    }
  }
  if (step.id === 'v4') {
    return {
      ...step,
      lead: 'Zuerst die drei Personen im Singular.',
      examples: ['ich mache', 'du machst', 'er macht'],
      observation: 'ich mache ist die 1. Person Singular.',
      explanation: 'ich mache ist die 1. Person Singular.',
    }
  }
  if (step.id === 'g4') {
    return {
      ...step,
      title: 'Wochentage',
      lead: 'Wochentage sind Substantive und werden großgeschrieben.',
      concept: { term: 'Wochentag', definition: 'Wochentage sind Substantive und werden großgeschrieben.' },
      examples: ['Montag', 'Dienstag'],
      observation: 'Montag ist ein Wochentag und wird großgeschrieben. montags ist kein Substantiv.',
      explanation: 'Montag ist ein Wochentag und wird großgeschrieben. montags ist kein Substantiv.',
      merksatz: 'Wochentage schreibt man groß.',
    }
  }
  if (step.id === 'v3') {
    return {
      ...step,
      concept: { term: 'Konjugation', definition: 'Konjugieren bedeutet: Die Verbform wird an die Person angepasst.' },
    }
  }
  if (step.id === 's2') {
    return {
      ...step,
      examples: ['kommen', 'bitter'],
      concept: { term: 'Doppelkonsonant', definition: 'Nach kurzem betontem Vokal, also einem Selbstlaut, steht häufig ein doppelter Konsonant.' },
    }
  }
  if (step.id === 's9') {
    return {
      ...step,
      title: 'wieder oder wider',
      lead: 'wieder bedeutet noch einmal. wider bedeutet dagegen.',
      concept: { term: 'wieder', definition: 'wieder = noch einmal. wider = dagegen.' },
      examples: ['wiederkommen'],
      try: choose('Welches Wort passt in „Komm bitte ___“?', 'wieder', ['wieder', 'wider'], 'Bedeutet der Satz noch einmal oder dagegen?'),
      observation: '„Komm bitte wieder“ bedeutet noch einmal. wider würde dagegen bedeuten.',
      explanation: '„Komm bitte wieder“ bedeutet noch einmal. wider würde dagegen bedeuten.',
      merksatz: 'wieder = noch einmal.',
    }
  }
  return step
}

const PACK: Record<string, readonly (readonly [string, string, string, readonly string[], string, string, string])[]> = {
  n1: [
    ['Substantiv erkennen', 'Die Lehrerin liest.', 'Welches Wort ist ein Substantiv?', ['Lehrerin', 'liest', 'die'], 'Lehrerin', '„Lehrerin“ benennt eine Person und ist ein Substantiv.', 'Suche das Wort, das eine Person benennt.'],
    ['Noch ein Substantiv', 'Freude ist ein Gefühl.', 'Welches Wort ist ein Substantiv?', ['Freude', 'ist', 'ein'], 'Freude', '„Freude“ benennt ein Gefühl und ist ein Substantiv, auch wenn man es nicht anfassen kann.', 'Auch Gefühle können Substantive sein.'],
  ],
  n2: [
    ['Artikelprobe anwenden', 'Blume', 'Welche Probe passt zu Blume?', ['der Blume', 'die Blume', 'das Blume'], 'die Blume', 'Zusammen gehört: die Blume.', 'Probiere die drei Artikel.'],
    ['Artikelprobe übertragen', 'Haus', 'Welche Probe passt zu Haus?', ['der Haus', 'die Haus', 'das Haus'], 'das Haus', 'Zusammen gehört: das Haus.', 'Nur eine der drei Proben klingt richtig.'],
  ],
  n3: [
    ['Großschreibung anwenden', 'der hund', 'Welche Schreibung ist richtig?', ['der hund', 'der Hund'], 'der Hund', 'Substantive schreibt man groß: der Hund.', 'Das Substantiv beginnt mit einem Großbuchstaben.'],
    ['Großschreibung übertragen', 'das leben', 'Welche Schreibung ist richtig?', ['das leben', 'das Leben'], 'das Leben', 'Auch „Leben“ ist ein Substantiv und wird großgeschrieben.', 'Prüfe, ob ein Substantiv im Wort steckt.'],
  ],
  n4: [
    ['Singular erkennen', 'ein Kind', 'In welcher Zahlform steht „Kind“?', ['Singular', 'Plural'], 'Singular', 'Ein Kind ist eines. Das ist Singular.', 'Einzahl oder Mehrzahl?'],
    ['Singular im Satz', 'Die Lehrerin liest.', 'In welcher Zahlform steht „Lehrerin“?', ['Singular', 'Plural'], 'Singular', 'Es ist eine Lehrerin, also Singular.', 'Ist eine Person gemeint oder mehrere?'],
  ],
  n5: [
    ['Abstrakt erkennen', 'Mut', 'Ist „Mut“ konkret oder abstrakt?', ['konkret', 'abstrakt'], 'abstrakt', 'Mut kann man nicht anfassen. Das Substantiv ist abstrakt.', 'Kann man es sehen oder anfassen?'],
    ['Konkret übertragen', 'Katze', 'Ist „Katze“ konkret oder abstrakt?', ['konkret', 'abstrakt'], 'konkret', 'Eine Katze kann man sehen. Das Substantiv ist konkret.', 'Tiere sind konkret.'],
  ],
  n6: [
    ['Eigenname erkennen', 'Berlin', 'Ist „Berlin“ ein Eigenname?', ['Ja', 'Nein'], 'Ja', 'Berlin benennt eine bestimmte Stadt und ist ein Eigenname.', 'Eigennamen benennen ein bestimmtes Einzelnes.'],
    ['Eigenname übertragen', 'Emma liest.', 'Welches Wort ist der Eigenname?', ['Emma', 'liest'], 'Emma', 'Emma benennt eine bestimmte Person.', 'Der Eigenname steht hier am Satzanfang, ist aber auch ohne Satzanfang ein Name.'],
  ],
  n7: [
    ['Satzanfang prüfen', 'Heute beginnt die Schule.', 'Welches großgeschriebene Wort ist kein Substantiv?', ['Heute', 'Schule'], 'Heute', 'Heute steht nur am Satzanfang groß. Schule ist das Substantiv.', 'Nicht jedes große Wort ist ein Substantiv.'],
    ['Satzanfang übertragen', 'Schnell läuft der Hund.', 'Welches großgeschriebene Wort ist kein Substantiv?', ['Schnell', 'Hund'], 'Schnell', 'Schnell ist kein Substantiv. Es ist nur das erste Wort des Satzes.', 'Prüfe die Wortart, nicht nur den Großbuchstaben.'],
  ],
  c1: [
    ['Bestimmten Artikel wählen', 'Katze', 'Welcher bestimmte Artikel passt?', ['die Katze', 'eine Katze'], 'die Katze', 'die Katze hat den bestimmten Artikel.', 'der, die und das sind bestimmt.'],
    ['Bestimmten Artikel übertragen', 'Haus', 'Welcher bestimmte Artikel passt?', ['das Haus', 'ein Haus'], 'das Haus', 'das Haus hat den bestimmten Artikel.', 'ein und eine sind unbestimmt.'],
  ],
  c2: [
    ['Unbestimmten Artikel wählen', 'Hund', 'Welche Form ist unbestimmt?', ['der Hund', 'ein Hund'], 'ein Hund', 'ein Hund hat den unbestimmten Artikel.', 'ein nennt etwas Unbestimmtes.'],
    ['Unbestimmten Artikel übertragen', 'Frau', 'Welche Form ist unbestimmt?', ['die Frau', 'eine Frau'], 'eine Frau', 'eine Frau hat den unbestimmten Artikel.', 'Beim Femininum heißt der unbestimmte Artikel eine.'],
  ],
  c3: [
    ['Kasus im Satz sehen', 'Der Hund bringt dem Kind den Ball.', 'Wie viele verschiedene Kasus stecken in den Wortgruppen der Hund, dem Kind und den Ball?', ['einen', 'drei'], 'drei', 'der Hund, dem Kind und den Ball stehen in drei verschiedenen Kasus.', 'Zähle die Rollen, nicht die Wörter.'],
    ['Rolle benennen', 'Der Hund schläft neben dem Haus.', 'Welche Wortgruppe ist hier noch nicht das Subjekt?', ['der Hund', 'dem Haus'], 'dem Haus', 'der Hund handelt. dem Haus ist eine weitere Wortgruppe mit einem anderen Kasus.', 'Das Subjekt antwortet auf Wer oder was?'],
  ],
  c4: [
    ['Nominativ bestimmen', 'Die Lehrerin zeigt dem Schüler den Weg.', 'Bestimme den Kasus von „die Lehrerin“.', ['Nominativ', 'Dativ', 'Akkusativ'], 'Nominativ', '„die Lehrerin“ antwortet auf „Wer oder was?“ und steht im Nominativ.', 'Wer zeigt den Weg?'],
    ['Nominativ markieren', 'Mia gibt ihrer Freundin das Buch.', 'Welche Wortgruppe steht im Nominativ?', ['Mia', 'ihrer Freundin', 'das Buch'], 'Mia', 'Mia handelt. Die Wortgruppe steht im Nominativ.', 'Wer gibt das Buch?'],
  ],
  c5: [
    ['Genitiv bestimmen', 'Die Farbe des Autos gefällt mir.', 'Bestimme den Kasus von „des Autos“.', ['Nominativ', 'Genitiv', 'Dativ'], 'Genitiv', '„des Autos“ antwortet auf „Wessen?“ und steht im Genitiv.', 'Wessen Farbe ist gemeint?'],
    ['Genitiv von anderen Kasus trennen', 'Der Bruder des Jungen repariert das Fahrrad.', 'Welche Wortgruppe steht im Genitiv?', ['der Bruder', 'des Jungen', 'das Fahrrad'], 'des Jungen', 'des Jungen antwortet auf „Wessen Bruder?“.', 'Nicht jede Wortgruppe mit Artikel ist Genitiv.'],
  ],
  c6: [
    ['Dativ bestimmen', 'Der Hund bringt dem Kind den Ball.', 'Bestimme den Kasus von „dem Kind“.', ['Nominativ', 'Dativ', 'Akkusativ'], 'Dativ', '„dem Kind“ antwortet auf „Wem?“ und steht im Dativ.', 'Wem bringt der Hund den Ball?'],
    ['Dativ von Akkusativ trennen', 'Die Lehrerin zeigt dem Schüler den Weg.', 'Welche Wortgruppe steht im Dativ?', ['die Lehrerin', 'dem Schüler', 'den Weg'], 'dem Schüler', 'dem Schüler antwortet auf „Wem?“. den Weg antwortet auf „Wen oder was?“.', 'Achte auf dem und den.'],
  ],
  c7: [
    ['Akkusativ bestimmen', 'Der Hund bringt dem Kind den Ball.', 'Bestimme den Kasus von „den Ball“.', ['Nominativ', 'Dativ', 'Akkusativ'], 'Akkusativ', '„den Ball“ antwortet auf „Wen oder was?“ und steht im Akkusativ.', 'Was wird gebracht?'],
    ['Frageprobe zuordnen', 'Mia gibt ihrer Freundin das Buch.', 'Welche Frage passt zu „das Buch“?', ['Wer oder was?', 'Wem?', 'Wen oder was?'], 'Wen oder was?', 'das Buch ist das, was gegeben wird. Die Frage lautet Wen oder was?', 'Die Frage folgt aus der Rolle, nicht aus der Stellung am Satzende.'],
  ],
  c8: [
    ['Maskulinum Dativ', 'der Hund', 'Wie heißt „der Hund“ im Dativ?', ['der Hund', 'dem Hund', 'den Hund'], 'dem Hund', 'Im Dativ heißt es dem Hund.', 'Dativ fragt Wem?'],
    ['Maskulinum Akkusativ', 'der Hund', 'Wie heißt „der Hund“ im Akkusativ?', ['des Hundes', 'dem Hund', 'den Hund'], 'den Hund', 'Im Akkusativ heißt es den Hund.', 'Akkusativ fragt Wen oder was?'],
  ],
  c9: [
    ['Feminin im Satz', 'Das Buch der Frau liegt hier.', 'In welchem Kasus steht „der Frau“?', ['Genitiv', 'Dativ', 'Akkusativ'], 'Genitiv', 'Wessen Buch? der Frau. Hier ist dieselbe Form Genitiv.', 'Dieselbe Form, anderer Satz, anderer Kasus.'],
    ['Feminin übertragen', 'Ich gebe der Frau das Buch.', 'In welchem Kasus steht „der Frau“?', ['Genitiv', 'Dativ', 'Akkusativ'], 'Dativ', 'Wem gebe ich das Buch? der Frau steht im Dativ.', 'Die Form allein reicht hier nicht.'],
  ],
  c10: [
    ['Präposition anwenden', 'durch den Park', 'Welchen Kasus verlangt „durch“?', ['Dativ', 'Akkusativ'], 'Akkusativ', 'durch verlangt den Akkusativ: durch den Park.', 'durch, für, gegen, ohne und um verlangen den Akkusativ.'],
    ['Präposition übertragen', 'aus der Schule', 'Welchen Kasus verlangt „aus“?', ['Dativ', 'Akkusativ'], 'Dativ', 'aus verlangt den Dativ: aus der Schule.', 'aus, bei, mit, nach, seit, von und zu verlangen den Dativ.'],
  ],
  a1: [
    ['Adjektiv erkennen', 'Der kleine Hund schläft.', 'Welches Wort ist das Adjektiv?', ['kleine', 'Hund', 'schläft'], 'kleine', '„kleine“ beschreibt den Hund und ist ein Adjektiv.', 'Das Adjektiv nennt eine Eigenschaft.'],
    ['Adjektiv übertragen', 'Das Wasser ist kalt.', 'Welches Wort ist das Adjektiv?', ['Wasser', 'kalt'], 'kalt', '„kalt“ nennt die Eigenschaft des Wassers.', 'Nicht das Substantiv ist gemeint.'],
  ],
  a2: [
    ['Positiv erkennen', 'schnell', 'Welche Form ist der Positiv?', ['schnell', 'schneller', 'am schnellsten'], 'schnell', '„schnell“ ist die Grundstufe, der Positiv.', 'Die Grundform vergleicht noch nicht.'],
    ['Positiv im Satz', 'Der Weg ist lang.', 'In welcher Steigerungsstufe steht „lang“?', ['Positiv', 'Komparativ', 'Superlativ'], 'Positiv', '„lang“ ist die Grundstufe.', 'Es hängt keine Vergleichsendung an.'],
  ],
  a3: [
    ['Komparativ bilden', 'lang', 'Bilde den Komparativ von „lang“.', ['lang', 'länger', 'am längsten'], 'länger', 'Der Komparativ von lang heißt länger.', 'Die 1. Steigerungsstufe endet oft auf -er.'],
    ['Komparativ erkennen', 'Der Turm ist höher als das Haus.', 'In welcher Steigerungsstufe steht „höher“?', ['Positiv', 'Komparativ', 'Superlativ'], 'Komparativ', '„höher“ vergleicht zwei Dinge und ist der Komparativ.', 'als zeigt hier den Vergleich.'],
  ],
  a4: [
    ['Superlativ bilden', 'klein', 'Bilde den Superlativ von „klein“.', ['klein', 'kleiner', 'am kleinsten'], 'am kleinsten', 'Die höchste Stufe heißt am kleinsten.', 'Der Superlativ ist die höchste Steigerungsstufe.'],
    ['Superlativ erkennen', 'Mia ist am schnellsten.', 'In welcher Steigerungsstufe steht „am schnellsten“?', ['Positiv', 'Komparativ', 'Superlativ'], 'Superlativ', '„am schnellsten“ ist die höchste Stufe.', 'am …-sten ist ein Signal des Superlativs.'],
  ],
  a5: [
    ['Regelmäßig steigern', 'schön', 'Welche Reihe ist regelmäßig?', ['schön, schöner, am schönsten', 'schön, besser, am meisten'], 'schön, schöner, am schönsten', 'schön hängt -er und am …-sten an.', 'Die Grundform bleibt erkennbar.'],
    ['Regelmäßig anwenden', 'schnell', 'Welche Form ist der Komparativ von „schnell“?', ['schnell', 'schneller', 'am schnellsten'], 'schneller', 'schnell wird regelmäßig zu schneller.', 'Nur die Endung kommt dazu.'],
  ],
  a6: [
    ['Umlaut bilden', 'alt', 'Welche Form ist der Komparativ von „alt“?', ['alter', 'älter', 'am alten'], 'älter', 'alt bekommt im Komparativ einen Umlaut: älter.', 'Achte auf ä, ö oder ü.'],
    ['Umlaut übertragen', 'kurz', 'Welche Form ist der Komparativ von „kurz“?', ['kurzer', 'kürzer', 'am kurzen'], 'kürzer', 'kurz wird zu kürzer.', 'Der Umlaut gehört zur Steigerung.'],
  ],
  a7: [
    ['e-Ausfall anwenden', 'dunkel', 'Welche Form ist der Komparativ von „dunkel“?', ['dunkeler', 'dunkler', 'am dunkel'], 'dunkler', 'Bei dunkel fällt im Komparativ ein e weg: dunkler.', 'Nicht jedes e bleibt stehen.'],
    ['e-Ausfall übertragen', 'teuer', 'Welche Form ist der Superlativ von „teuer“?', ['am teuersten', 'am teueren', 'teurer'], 'am teuersten', 'Der Superlativ heißt am teuersten. teurer ist der Komparativ.', 'Lies die ganze Form, nicht nur den Stamm.'],
  ],
  a8: [
    ['gut steigern', 'gut', 'Welche Form ist der Komparativ von „gut“?', ['guter', 'besser', 'mehr'], 'besser', 'gut wird unregelmäßig zu besser.', 'Diese Form muss man lernen.'],
    ['viel und hoch', 'hoch', 'Welche Form ist der Komparativ von „hoch“?', ['hocher', 'höher', 'mehr'], 'höher', 'hoch wird zu höher. viel wird zu mehr.', 'hoch verändert den Stamm und bekommt einen Umlaut.'],
  ],
  a9: [
    ['als anwenden', 'Tim ist kleiner ___ Mia.', 'Welches Vergleichswort passt beim Unterschied?', ['als', 'wie'], 'als', 'Beim Unterschied steht als: kleiner als Mia.', 'Unterschied und Gleichheit haben verschiedene Wörter.'],
    ['als übertragen', 'Der Weg ist länger als die Straße.', 'Welches Wort zeigt den Unterschied?', ['als', 'wie'], 'als', 'länger als zeigt den Unterschied.', 'wie würde ein gleiches Maß anzeigen.'],
  ],
  a10: [
    ['wie anwenden', 'so groß ___', 'Welches Vergleichswort passt bei gleichem Maß?', ['als', 'wie'], 'wie', 'Bei gleichem Maß steht wie: so groß wie.', 'Gleichheit fragt nicht nach als.'],
    ['wie übertragen', 'Mia ist genauso schnell wie Tim.', 'Ist das Maß gleich oder verschieden?', ['gleich', 'verschieden'], 'gleich', 'genauso … wie zeigt das gleiche Maß.', 'wie gehört zur Gleichheit.'],
  ],
  a11: [
    ['Attributiven Superlativ bilden', 'der schnelle Läufer', 'Welche Form steht vor dem Substantiv?', ['am schnellsten Läufer', 'der schnellste Läufer'], 'der schnellste Läufer', 'Vor einem Substantiv heißt es der schnellste Läufer.', 'am schnellsten steht nicht vor dem Substantiv.'],
    ['Attributiv übertragen', 'die kleine Tasche', 'Welche höchste Stufe passt vor das Substantiv?', ['die kleinste Tasche', 'am kleinsten Tasche'], 'die kleinste Tasche', 'Vor dem Substantiv steht die kleinste Tasche.', 'Artikel und Endung gehören zusammen.'],
  ],
  v1: [
    ['Verb erkennen', 'Der Hund schläft.', 'Welches Wort ist das Verb?', ['Hund', 'schläft'], 'schläft', '„schläft“ nennt die Handlung und ist das Verb.', 'Das Verb sagt, was geschieht.'],
    ['Verb übertragen', 'Mia liest ein Buch.', 'Welches Wort ist das Verb?', ['Mia', 'liest', 'Buch'], 'liest', '„liest“ ist die Personalform des Verbs.', 'Nicht jede Wortgruppe im Satz ist das Verb.'],
  ],
  v2: [
    ['Infinitiv bilden', 'schläft', 'Wie heißt der Infinitiv?', ['schläft', 'schlafen', 'schlief'], 'schlafen', 'Der Infinitiv ist die Grundform: schlafen.', 'Die Grundform nennt man auch Nennform.'],
    ['Infinitiv erkennen', 'lesen', 'Welche Form ist ein Infinitiv?', ['liest', 'lesen', 'las'], 'lesen', 'lesen ist die Grundform. liest und las sind Personalformen.', 'Der Infinitiv lässt sich mit „zu“ verbinden: zu lesen.'],
  ],
  v3: [
    ['Konjugation anwenden', 'machen, du', 'Welche Form passt zu du?', ['mache', 'machst', 'macht'], 'machst', 'du machst ist die konjugierte Form.', 'Die Endung richtet sich nach der Person.'],
    ['Konjugation übertragen', 'spielen, wir', 'Welche Form passt zu wir?', ['spielst', 'spielt', 'spielen'], 'spielen', 'wir spielen behält im Plural die Infinitivform.', 'Person und Numerus bestimmen die Form.'],
  ],
  v4: [
    ['2. Person Singular', 'lesen', 'Wie heißt lesen für du?', ['lese', 'liest', 'lesen'], 'liest', 'du liest ist die 2. Person Singular.', 'Hier wechselt auch der Vokal.'],
    ['3. Person Singular', 'machen', 'Wie heißt machen für sie (eine Person)?', ['mache', 'machst', 'macht'], 'macht', 'sie macht ist die 3. Person Singular.', 'Eine Person, nicht die Gruppe wir.'],
  ],
  v5: [
    ['Endung anwenden', 'machen, ihr', 'Wie heißt machen für ihr?', ['macht', 'machen', 'mache'], 'macht', 'ihr macht hat die Endung -t.', 'ihr ist die 2. Person Plural.'],
    ['Endung übertragen', 'fragen, er', 'Wie heißt fragen für er?', ['frage', 'fragst', 'fragt'], 'fragt', 'er fragt folgt derselben Endung wie er macht.', 'Der Stamm bleibt fragen ohne en.'],
  ],
  v6: [
    ['-ieren anwenden', 'studieren, er', 'Wie heißt die 3. Person Singular?', ['studiert', 'studierte', 'studieren'], 'studiert', 'er studiert. Das -ieren bleibt im Stamm erhalten.', 'Nicht jede Form ist schon das Präteritum.'],
    ['-ieren übertragen', 'probieren, du', 'Wie heißt probieren für du?', ['probierst', 'probiert', 'probieren'], 'probierst', 'du probierst hängt -st an den Stamm.', 'Der Stamm endet auf -ier.'],
  ],
  v7: [
    ['Vokalwechsel anwenden', 'nehmen, er', 'Welche Form gehört zu er?', ['nehmt', 'nimmt', 'nehmen'], 'nimmt', 'er nimmt wechselt e zu i.', 'Die 3. Person Singular verändert hier den Vokal.'],
    ['Vokalwechsel übertragen', 'lesen, du', 'Welche Form gehört zu du?', ['lesest', 'liest', 'lesen'], 'liest', 'du liest wechselt e zu ie.', 'Nicht die Infinitivform einsetzen.'],
  ],
  v8: [
    ['sein anwenden', 'ihr', 'Wie heißt sein für ihr?', ['seid', 'sind', 'ist'], 'seid', 'ihr seid ist die Form von sein.', 'sein ist unregelmäßig.'],
    ['sein übertragen', 'ich', 'Wie heißt sein für ich?', ['bin', 'bist', 'ist'], 'bin', 'ich bin ist die 1. Person Singular.', 'Die Form sieht dem Infinitiv nicht ähnlich.'],
  ],
  v9: [
    ['haben anwenden', 'du', 'Wie heißt haben für du?', ['habe', 'hast', 'hat'], 'hast', 'du hast ist die Form von haben.', 'Das b fällt in dieser Form weg.'],
    ['haben übertragen', 'wir', 'Wie heißt haben für wir?', ['habt', 'haben', 'hat'], 'haben', 'wir haben bleibt in dieser Person beim Infinitiv.', 'wir und sie (Plural) haben dieselbe Form.'],
  ],
  v10: [
    ['Partizip bilden', 'machen', 'Wie heißt das Partizip II?', ['macht', 'gemacht', 'machen'], 'gemacht', 'Das Partizip II von machen heißt gemacht.', 'Viele Partizipien beginnen mit ge- und enden auf -t.'],
    ['Partizip übertragen', 'spielen', 'Wie heißt das Partizip II?', ['gespielt', 'spielte', 'spielen'], 'gespielt', 'spielen wird zu gespielt.', 'spielte ist Präteritum, nicht das Partizip II.'],
  ],
  v11: [
    ['Hilfsverb wählen', 'Ich ___ nach Hause gegangen.', 'Welches Hilfsverb passt?', ['bin', 'habe'], 'bin', 'gehen bildet das Perfekt mit sein: ich bin gegangen.', 'Bewegung von einem Ort zum anderen oft mit sein.'],
    ['Hilfsverb übertragen', 'Ich ___ den Ball geholt.', 'Welches Hilfsverb passt?', ['bin', 'habe'], 'habe', 'holen bildet das Perfekt mit haben: ich habe geholt.', 'Nicht jedes Partizip steht mit sein.'],
  ],
  t0: [
    ['Tempus erkennen', 'Ich lerne.', 'Wozu dient das Tempus hier?', ['zur zeitlichen Einordnung', 'zur Großschreibung'], 'zur zeitlichen Einordnung', 'Das Tempus ordnet „lerne“ zeitlich ein.', 'Es geht nicht um die Wortart des Nomens.'],
    ['Tempus von anderen Kategorien trennen', 'gestern', 'Was zeigt das Wort „gestern“ allein noch nicht?', ['den Kasus', 'dass eine Zeit gemeint ist'], 'den Kasus', '„gestern“ gibt einen Zeitpunkt an. Den Kasus bestimmt es nicht.', 'Zeit und Fall sind verschiedene Kategorien.'],
  ],
  t1: [
    ['Präsens erkennen', 'Ich lerne.', 'Welches Tempus ist das?', ['Präsens', 'Präteritum', 'Perfekt'], 'Präsens', '„lerne“ ist die Gegenwartsform, das Präsens.', 'Es ist keine Vergangenheitsform.'],
    ['Präsens mit Zeitangabe', 'Morgen schreibe ich.', 'Welches Tempus steht im Satz?', ['Präsens', 'Futur I'], 'Präsens', '„schreibe“ bleibt Präsens. Morgen verschiebt nur die Bedeutung.', 'Nicht jedes zukünftige Geschehen steht im Futur.'],
  ],
  t2: [
    ['Präteritum erkennen', 'Ich lernte.', 'Welches Tempus ist das?', ['Präsens', 'Präteritum', 'Perfekt'], 'Präteritum', '„lernte“ ist Präteritum und erzählt Vergangenes.', 'Die Endung -te ist hier das Signal.'],
    ['Präsens und Präteritum unterscheiden', 'Ich lerne. Ich lernte.', 'Welche Form ist das Präteritum?', ['lerne', 'lernte'], 'lernte', 'lernte ist die Vergangenheitsform, lerne das Präsens.', 'Vergleiche die Endung.'],
  ],
  t3: [
    ['Perfekt erkennen', 'Ich habe gelernt.', 'Woraus besteht diese Form?', ['habe und gelernt', 'nur lernte'], 'habe und gelernt', 'Das Perfekt besteht hier aus habe und dem Partizip II gelernt.', 'Beide Teile gehören zur Verbform.'],
    ['Perfekt übertragen', 'Sie ist gekommen.', 'Welches Tempus ist das?', ['Präteritum', 'Perfekt', 'Plusquamperfekt'], 'Perfekt', 'ist gekommen ist Perfekt mit sein.', 'Das Hilfsverb steht im Präsens.'],
  ],
  t4: [
    ['Plusquamperfekt erkennen', 'Ich hatte gelernt, bevor die Arbeit begann.', 'Was geschah zuerst?', ['Ich hatte gelernt.', 'Die Arbeit begann.'], 'Ich hatte gelernt.', 'hatte gelernt liegt vor begann. Das ist Plusquamperfekt.', 'Vorvergangenheit liegt vor einer anderen Vergangenheit.'],
    ['Vergangenheitsebenen vergleichen', 'hatte gelernt / lernte', 'Welche Form ist die Vorvergangenheit?', ['lernte', 'hatte gelernt'], 'hatte gelernt', 'hatte gelernt ist Plusquamperfekt und damit die frühere der beiden Formen.', 'Das Hilfsverb steht selbst im Präteritum.'],
  ],
  t5: [
    ['Futur I bilden', 'lernen', 'Welche Form ist Futur I?', ['werde lernen', 'habe gelernt', 'lernte'], 'werde lernen', 'Futur I besteht aus werden und dem Infinitiv.', 'Noch kein Partizip II.'],
    ['Futur I erkennen', 'Ich werde schreiben.', 'Welches Tempus ist das?', ['Präsens', 'Futur I', 'Futur II'], 'Futur I', 'werde schreiben ist Futur I.', 'Es fehlt das Partizip, deshalb ist es nicht Futur II.'],
  ],
  t6: [
    ['Futur II erkennen', 'Ich werde gelernt haben.', 'Welche Teile stecken in der Form?', ['werden, Partizip II und haben', 'werden und Infinitiv'], 'werden, Partizip II und haben', 'Futur II verbindet werden mit dem Partizip II und haben oder sein.', 'Der Infinitiv allein wäre Futur I.'],
    ['Futur I und Futur II unterscheiden', 'werde lernen / werde gelernt haben', 'Welche Form ist Futur II?', ['werde lernen', 'werde gelernt haben'], 'werde gelernt haben', 'Erst das Partizip macht die Zukunft abgeschlossen: Futur II.', 'Futur I nennt nur den Infinitiv.'],
  ],
  t7: [
    ['Zeitstrahl anwenden', 'begann / hatte begonnen', 'Was liegt früher?', ['begann', 'hatte begonnen'], 'hatte begonnen', 'hatte begonnen ist die Vorvergangenheit und liegt vor begann.', 'Plusquamperfekt vor Präteritum.'],
    ['Zeitstrahl übertragen', 'lerne / werde lernen', 'Was liegt später?', ['lerne', 'werde lernen'], 'werde lernen', 'werde lernen weist in die Zukunft und liegt nach dem Präsens.', 'Nicht jede spätere Bedeutung muss Futur sein, hier ist es die Form.'],
  ],
  t8: [
    ['Verbteile erkennen', 'Ich habe gelernt.', 'Welche Wörter gehören zur Verbform?', ['habe und gelernt', 'nur habe'], 'habe und gelernt', 'Beide Teile bilden zusammen das Perfekt.', 'Das Partizip gehört dazu.'],
    ['Verbteile übertragen', 'Sie wird kommen.', 'Welche Wörter gehören zur Verbform?', ['wird und kommen', 'nur wird'], 'wird und kommen', 'wird kommen besteht aus Hilfsverb und Infinitiv.', 'Der Infinitiv ist Teil der Zeitform.'],
  ],
  t9: [
    ['Tempora vergleichen', 'Ich lernte.', 'Welches Tempus steht im Satz?', ['Präteritum', 'Perfekt', 'Plusquamperfekt'], 'Präteritum', 'lernte ist eine einfache Vergangenheitsform, das Präteritum.', 'Es gibt kein Hilfsverb.'],
    ['Tempora übertragen', 'Ich werde geschrieben haben.', 'Welches Tempus steht im Satz?', ['Futur I', 'Futur II', 'Perfekt'], 'Futur II', 'werden, geschrieben und haben bilden Futur II.', 'Das Partizip unterscheidet es vom Futur I.'],
  ],
  p1: [
    ['Aktiv erkennen', 'Der Junge wirft den Ball.', 'Wer führt die Handlung aus?', ['der Junge', 'der Ball'], 'der Junge', 'Der Junge handelt. Der Satz steht im Aktiv.', 'Das Subjekt tut hier etwas.'],
    ['Aktiv übertragen', 'Die Lehrerin öffnet das Fenster.', 'Steht der Satz im Aktiv oder im Passiv?', ['Aktiv', 'Passiv'], 'Aktiv', 'Die Lehrerin führt die Handlung selbst aus.', 'Es steht kein werden mit Partizip II im Satz.'],
  ],
  p2: [
    ['Passiv erkennen', 'Der Ball wird geworfen.', 'Was steht im Mittelpunkt?', ['die Handlung', 'der Name des Werfers'], 'die Handlung', 'Der Ball wird geworfen stellt die Handlung in den Mittelpunkt.', 'Der Handelnde muss nicht genannt sein.'],
    ['Passiv übertragen', 'Das Fenster wird geöffnet.', 'Steht der Satz im Aktiv oder im Passiv?', ['Aktiv', 'Passiv'], 'Passiv', 'wird geöffnet ist Passiv.', 'werden und das Partizip II bilden hier das Passiv.'],
  ],
  p3: [
    ['Täter bestimmen', 'Die Aufgabe wird vom Lehrer erklärt.', 'Wer ist der Täter?', ['der Lehrer', 'die Aufgabe'], 'der Lehrer', 'Der Lehrer handelt. vom Lehrer nennt den Täter.', 'Das Subjekt des Passivsatzes ist hier nicht der Täter.'],
    ['Täter übertragen', 'Der Brief wird von Mia geschrieben.', 'Wer handelt?', ['Mia', 'der Brief'], 'Mia', 'von Mia nennt die handelnde Person.', 'der Brief ist im Passiv das Subjekt.'],
  ],
  p3b: [
    ['Objekt finden', 'Der Lehrer erklärt die Aufgabe.', 'Welches Akkusativobjekt wird im Passiv zum Subjekt?', ['die Aufgabe', 'der Lehrer'], 'die Aufgabe', 'das Akkusativobjekt des Aktivsatzes wird im Passivsatz zum Subjekt.', 'Nicht der Handelnde wird zum neuen Subjekt.'],
    ['Umwandlung anwenden', 'Mia schreibt den Brief.', 'Wie beginnt der Passivsatz?', ['Der Brief wird geschrieben.', 'Mia wird geschrieben.'], 'Der Brief wird geschrieben.', 'den Brief wird zu Der Brief.', 'Der Akkusativ wird zum Nominativ.'],
  ],
  p4: [
    ['Passiv Präsens bilden', 'Der Ball wird geschossen.', 'Welches Tempus hat dieses Passiv?', ['Präsens', 'Präteritum', 'Perfekt'], 'Präsens', 'wird geschossen ist Passiv Präsens.', 'werden steht im Präsens.'],
    ['Passiv Präsens übertragen', 'Die Tür ___ geöffnet.', 'Welche Form bildet das Passiv Präsens?', ['wird', 'wurde', 'ist'], 'wird', 'Die Tür wird geöffnet.', 'Präsens von werden plus Partizip II.'],
  ],
  p5: [
    ['Passiv Präteritum erkennen', 'Der Ball wurde geschossen.', 'Welches Tempus ist das?', ['Präsens', 'Präteritum', 'Perfekt'], 'Präteritum', 'wurde geschossen ist Passiv Präteritum.', 'wurde ist die Präteritumform von werden.'],
    ['Präsens und Präteritum im Passiv', 'wird geschossen / wurde geschossen', 'Welche Form ist Präteritum?', ['wird geschossen', 'wurde geschossen'], 'wurde geschossen', 'wurde weist auf die Vergangenheit.', 'wird bleibt Gegenwart.'],
  ],
  p6: [
    ['Passiv Perfekt erkennen', 'Der Ball ist geschossen worden.', 'Welche Form ist richtig?', ['ist geschossen worden', 'ist geschossen geworden'], 'ist geschossen worden', 'Im Passiv Perfekt steht worden, nicht geworden.', 'worden gehört zum Passiv.'],
    ['Passiv Perfekt übertragen', 'Die Tür ist geöffnet ___.', 'Welches Wort schließt das Passiv Perfekt?', ['worden', 'geworden'], 'worden', 'ist geöffnet worden.', 'geworden wäre kein Passiv.'],
  ],
  p6b: [
    ['worden anwenden', 'Er ist berühmt geworden. Der Ball ist geworfen worden.', 'In welchem Satz steht ein Passiv?', ['Er ist berühmt geworden.', 'Der Ball ist geworfen worden.'], 'Der Ball ist geworfen worden.', 'worden bildet das Passiv. geworden nennt hier eine Veränderung.', 'Die beiden Wörter sehen ähnlich aus und bedeuten Verschiedenes.'],
    ['worden übertragen', 'Das Fenster ist geöffnet ___.', 'Welches Wort ist richtig?', ['worden', 'geworden'], 'worden', 'Das Fenster ist geöffnet worden.', 'Beim Passiv bleibt es worden.'],
  ],
  p7: [
    ['Plusquamperfekt Passiv', 'Der Ball war geschossen worden.', 'Welches Tempus ist das?', ['Perfekt', 'Plusquamperfekt', 'Präteritum'], 'Plusquamperfekt', 'war geschossen worden ist Passiv Plusquamperfekt.', 'war statt ist verlegt die Form in die Vorvergangenheit.'],
    ['Vergangenheit im Passiv vergleichen', 'war geschlossen worden / wurde geschlossen', 'Welche Form liegt früher, wenn beide im Text stehen?', ['war geschlossen worden', 'wurde geschlossen'], 'war geschlossen worden', 'Das Plusquamperfekt liegt vor dem Präteritum.', 'war … worden ist die frühere Stufe.'],
  ],
  p8: [
    ['Futur I Passiv', 'Der Ball wird geschossen werden.', 'Welches Tempus ist das?', ['Präsens', 'Futur I', 'Futur II'], 'Futur I', 'wird geschossen werden ist Passiv Futur I.', 'Am Ende steht der Infinitiv werden.'],
    ['Futur I von Präsens trennen', 'wird geschossen / wird geschossen werden', 'Welche Form ist Futur I?', ['wird geschossen', 'wird geschossen werden'], 'wird geschossen werden', 'Erst das zusätzliche werden macht das Futur I.', 'wird geschossen allein ist Präsens.'],
  ],
  p9: [
    ['Futur II Passiv', 'Der Ball wird geschossen worden sein.', 'Welches Tempus ist das?', ['Futur I', 'Futur II', 'Perfekt'], 'Futur II', 'wird geschossen worden sein ist Passiv Futur II.', 'worden sein schließt die Zukunft ab.'],
    ['Futurformen vergleichen', 'wird geschossen werden / wird geschossen worden sein', 'Welche Form ist Futur II?', ['wird geschossen werden', 'wird geschossen worden sein'], 'wird geschossen worden sein', 'worden sein unterscheidet das Futur II vom Futur I.', 'Futur I endet auf werden.'],
  ],
  p10: [
    ['Täterangabe setzen', 'Der Ball wird geschossen.', 'Welche Ergänzung nennt den Täter?', ['vom Jungen', 'den Jungen'], 'vom Jungen', 'vom Jungen nennt den Täter im Dativ nach von.', 'den Jungen wäre hier kein Täteranschluss.'],
    ['Täterangabe übertragen', 'Die Tür wird geöffnet.', 'Welche Ergänzung passt?', ['von der Lehrerin', 'die Lehrerin'], 'von der Lehrerin', 'von der Lehrerin nennt die handelnde Person.', 'Die Täterangabe ist kein zweites Subjekt.'],
  ],
  g1: [
    ['Grundregel anwenden', 'der hund', 'Welche Schreibung ist richtig?', ['der hund', 'der Hund'], 'der Hund', 'Substantive schreibt man groß.', 'Der Artikel der ändert die Wortart nicht.'],
    ['Grundregel übertragen', 'eine lehrerin', 'Welche Schreibung ist richtig?', ['eine lehrerin', 'eine Lehrerin'], 'eine Lehrerin', 'Lehrerin ist ein Substantiv und wird großgeschrieben.', 'Auch nach einem unbestimmten Artikel.'],
  ],
  g2: [
    ['Nomen großschreiben', 'Die freude ist groß.', 'Welche Schreibung ist richtig?', ['Die freude ist groß.', 'Die Freude ist groß.'], 'Die Freude ist groß.', 'Freude ist ein Substantiv und wird großgeschrieben.', 'Der Satzanfang ist hier nicht die einzige Großschreibung.'],
    ['Nomen übertragen', 'im garten', 'Welche Schreibung ist richtig?', ['im garten', 'im Garten'], 'im Garten', 'Garten ist ein Substantiv.', 'im verändert die Großschreibung nicht.'],
  ],
  g3: [
    ['Satzanfang anwenden', 'heute scheint die Sonne.', 'Welche Schreibung ist richtig?', ['heute scheint die Sonne.', 'Heute scheint die Sonne.'], 'Heute scheint die Sonne.', 'Das erste Wort schreibt man groß, auch wenn es kein Substantiv ist.', 'Satzanfang und Substantiv sind zwei verschiedene Regeln.'],
    ['Satzanfang übertragen', 'schnell läuft Mia.', 'Welche Schreibung ist richtig?', ['schnell läuft Mia.', 'Schnell läuft Mia.'], 'Schnell läuft Mia.', 'Schnell wird nur groß, weil der Satz dort beginnt.', 'Mia bleibt zusätzlich groß, weil es ein Eigenname ist.'],
  ],
  g4: [
    ['Wochentag anwenden', 'Am montag beginnt die Schule.', 'Welche Schreibung ist richtig?', ['Am montag beginnt die Schule.', 'Am Montag beginnt die Schule.'], 'Am Montag beginnt die Schule.', 'Montag ist ein Wochentag und wird großgeschrieben.', 'Nicht die adverbiale Form montags.'],
    ['Wochentag übertragen', 'dienstag', 'Welche Form ist der Wochentag?', ['dienstags', 'Dienstag'], 'Dienstag', 'Dienstag ist das Substantiv.', 'dienstags ist kleingeschrieben, weil es kein Substantiv ist.'],
  ],
  g4b: [
    ['Tageszeit anwenden', 'am Morgen', 'Welche Schreibung zeigt die Tageszeit als Substantiv?', ['am Morgen', 'morgens'], 'am Morgen', 'Morgen ist hier ein Substantiv.', 'morgens ist die adverbiale Form.'],
    ['Tageszeit übertragen', 'die Nacht', 'Welche Schreibung ist richtig?', ['die nacht', 'die Nacht'], 'die Nacht', 'Nacht ist ein Substantiv und wird großgeschrieben.', 'Der Artikel zeigt das Substantiv an.'],
  ],
  g4c: [
    ['Adverbial erkennen', 'morgens', 'Welche Form ist kein Substantiv?', ['der Morgen', 'morgens'], 'morgens', 'morgens ist adverbial und wird kleingeschrieben.', 'der Morgen bleibt ein Substantiv.'],
    ['Adverbial übertragen', 'abends', 'Welche Schreibung ist richtig, wenn keine Substantivierung gemeint ist?', ['abends', 'Abends'], 'abends', 'abends schreibt man klein, wenn es kein Substantiv ist.', 'Am Satzanfang wäre nur das erste Wort groß.'],
  ],
  g5: [
    ['Sprache großschreiben', 'Sie spricht deutsch.', 'Welche Schreibung ist richtig?', ['Sie spricht deutsch.', 'Sie spricht Deutsch.'], 'Sie spricht Deutsch.', 'Sprachen schreibt man groß.', 'deutsch als Adjektiv in eine deutsche Stadt bleibt klein. Hier ist die Sprache gemeint.'],
    ['Nationalität unterscheiden', 'eine deutsche Stadt', 'Welche Schreibung ist richtig?', ['eine deutsche Stadt', 'eine Deutsche Stadt'], 'eine deutsche Stadt', 'deutsche ist hier ein Adjektiv und bleibt klein. Stadt ist das Substantiv.', 'Nicht jede Herkunftsangabe ist ein Substantiv.'],
  ],
  g6: [
    ['Anrede anwenden', 'Wie geht es ihnen?', 'Welche Anrede ist höflich groß?', ['Wie geht es ihnen?', 'Wie geht es Ihnen?'], 'Wie geht es Ihnen?', 'Die Höflichkeitsform Ihnen schreibt man groß.', 'ihnen ohne Höflichkeit bleibt klein.'],
    ['Anrede übertragen', 'du', 'Welche Form ist die höfliche Anrede?', ['du', 'Sie'], 'Sie', 'Sie als Anrede schreibt man groß.', 'du bleibt klein.'],
  ],
  g7: [
    ['Eigenname anwenden', 'berlin', 'Welche Schreibung ist richtig?', ['berlin', 'Berlin'], 'Berlin', 'Berlin ist ein Eigenname und wird großgeschrieben.', 'Städtenamen sind Eigennamen.'],
    ['Eigenname übertragen', 'emma liest.', 'Welche Schreibung ist richtig?', ['emma liest.', 'Emma liest.'], 'Emma liest.', 'Emma ist ein Eigenname.', 'Der Name bleibt auch mitten im Satz groß.'],
  ],
  g8: [
    ['Kleinschreibung anwenden', 'Er kommt heute.', 'Welches Wort bleibt klein?', ['heute', 'Er'], 'heute', 'heute ist kein Substantiv und steht nicht am Satzanfang.', 'Er ist nur groß, weil der Satz beginnt.'],
    ['Kleinschreibung übertragen', 'Sie läuft schnell.', 'Welches Wort bleibt klein?', ['Sie', 'schnell'], 'schnell', 'schnell ist ein Adjektiv und bleibt klein.', 'Nicht jedes Wort im Satz wird großgeschrieben.'],
  ],
  s1: [
    ['ä ableiten', 'Wand', 'Welche Mehrzahl passt?', ['Wende', 'Wände'], 'Wände', 'Wand hat ein a, deshalb steht in der Mehrzahl ä: Wände.', 'Leite vom verwandten Wort mit a ab.'],
    ['ä übertragen', 'Apfel', 'Welche Mehrzahl passt?', ['Epfel', 'Äpfel'], 'Äpfel', 'Apfel wird zu Äpfel.', 'Das a der Grundform bleibt als ä erkennbar.'],
  ],
  s2: [
    ['Doppelkonsonant anwenden', 'komen', 'Welche Schreibung ist richtig?', ['komen', 'kommen'], 'kommen', 'Nach kurzem Vokal steht hier mm: kommen.', 'Der kurze betonte Vokal braucht oft den doppelten Mitlaut.'],
    ['Doppelkonsonant übertragen', 'Somer', 'Welche Schreibung ist richtig?', ['Somer', 'Sommer'], 'Sommer', 'Sommer hat einen kurzen Vokal und deshalb mm.', 'Nicht jeder Mitlaut wird verdoppelt, hier aber schon.'],
  ],
  s3: [
    ['ss anwenden', 'müssen', 'Warum steht ss?', ['weil der Vokal kurz ist', 'weil der Vokal lang ist'], 'weil der Vokal kurz ist', 'In müssen ist der Vokal kurz, deshalb steht ss.', 'Länge und Kürze entscheiden mit.'],
    ['ß anwenden', 'Straße', 'Warum steht ß?', ['weil der Vokal lang ist', 'weil der Vokal kurz ist'], 'weil der Vokal lang ist', 'In Straße ist der Vokal lang, deshalb steht ß.', 'Nach kurzem Vokal stünde ss.'],
  ],
  s4: [
    ['Doppelvokal anwenden', 'das Boot', 'Welche Schreibung ist richtig?', ['das Bot', 'das Boot'], 'das Boot', 'Boot hat einen langen Vokal und schreibt oo.', 'Nicht jeder lange Vokal bekommt einen Doppelvokal, dieses Wort aber schon.'],
    ['Doppelvokal übertragen', 'das Moor', 'Welche Schreibung ist richtig?', ['das Mor', 'das Moor'], 'das Moor', 'Moor schreibt man mit oo.', 'Höre die Länge und prüfe die übliche Schreibung.'],
  ],
  s5: [
    ['-ig oder -lich', 'fertig', 'Welche Schreibung ist richtig?', ['fertig', 'fertich'], 'fertig', 'fertig endet auf -ig.', 'Nicht jedes auslautende ich wird -ich geschrieben.'],
    ['-lich anwenden', 'freundlich', 'Welche Schreibung ist richtig?', ['freundlig', 'freundlich'], 'freundlich', 'freundlich endet auf -lich.', 'Die Endung -lich bleibt erkennbar.'],
  ],
  s6: [
    ['Zusammen anwenden', 'irgendwann', 'Welche Schreibung ist richtig?', ['irgend wann', 'irgendwann'], 'irgendwann', 'irgendwann schreibt man zusammen.', 'Die getrennte Form ist hier nicht richtig.'],
    ['Zusammen übertragen', 'deshalb', 'Welche Schreibung ist richtig?', ['des halb', 'deshalb'], 'deshalb', 'deshalb schreibt man zusammen.', 'Prüfe, ob die Teile zusammen ein Wort bilden.'],
  ],
  s7: [
    ['ie anwenden', 'Liebe', 'Welche Schreibung ist richtig?', ['Libe', 'Liebe'], 'Liebe', 'Liebe schreibt man mit ie.', 'Das lange i wird hier mit ie geschrieben.'],
    ['ie übertragen', 'spielen', 'Welche Schreibung ist richtig?', ['spilen', 'spielen'], 'spielen', 'spielen schreibt man mit ie.', 'Nicht jedes lange i, aber dieses Wort.'],
  ],
  s8: [
    ['dass anwenden', 'Ich weiß, ___ du kommst.', 'Welches Wort leitet den Nebensatz ein?', ['das', 'dass'], 'dass', 'dass leitet den Nebensatz ein.', 'das lässt sich hier nicht durch dieses ersetzen.'],
    ['das anwenden', '___ Buch liegt hier.', 'Welches Wort zeigt auf das Buch?', ['das', 'dass'], 'das', 'das Buch zeigt auf ein Substantiv. dass würde einen Nebensatz einleiten.', 'Die Probe mit dieses hilft.'],
  ],
  s8b: [
    ['seit anwenden', 'Ich bin ___ Montag hier.', 'Welches Wort passt?', ['seit', 'seid'], 'seit', 'seit nennt den Zeitpunkt.', 'seid wäre eine Form von sein.'],
    ['seid anwenden', 'Ihr ___ pünktlich.', 'Welches Wort passt?', ['seit', 'seid'], 'seid', 'Ihr seid ist die Form von sein.', 'seit würde einen Zeitpunkt nennen.'],
  ],
  s9: [
    ['wieder anwenden', 'Er versucht es ___ einmal.', 'Welches Wort passt?', ['wieder', 'wider'], 'wieder', 'wieder einmal bedeutet noch einmal.', 'wider würde einen Gegensatz nennen.'],
    ['wider anwenden', 'Sie handelt ___ besseres Wissen.', 'Welches Wort passt?', ['wieder', 'wider'], 'wider', 'wider besseres Wissen bedeutet gegen besseres Wissen.', 'Hier ist kein noch einmal gemeint.'],
  ],
  s9b: [
    ['Merkwort anwenden', 'vieleicht', 'Welche Schreibung ist richtig?', ['vieleicht', 'vielleicht'], 'vielleicht', 'vielleicht schreibt man mit ie und zwei l.', 'Das ist ein Merkwort.'],
    ['Merkwort übertragen', 'nämlich', 'Welche Schreibung ist richtig?', ['nähmlich', 'nämlich'], 'nämlich', 'nämlich schreibt man mit ä.', 'Nicht jede ähnliche Lautung bekommt ä.'],
  ],
  s10: [
    ['Aufzählung anwenden', 'Äpfel Birnen und Bananen', 'Welche Aufzählung ist richtig?', ['Äpfel Birnen und Bananen', 'Äpfel, Birnen und Bananen'], 'Äpfel, Birnen und Bananen', 'Zwischen Äpfel und Birnen steht ein Komma. Vor und steht hier keins.', 'Die Glieder einer Aufzählung werden getrennt.'],
    ['Aufzählung übertragen', 'rot gelb und blau', 'Welche Schreibung ist richtig?', ['rot gelb und blau', 'rot, gelb und blau'], 'rot, gelb und blau', 'Vor gelb steht ein Komma.', 'Vor und in dieser kurzen Aufzählung steht keins.'],
  ],
  s10b: [
    ['Nebensatz anwenden', 'Ich bleibe, weil es regnet.', 'Wo steht das Komma?', ['vor weil', 'hinter regnet'], 'vor weil', 'Der Nebensatz mit weil wird mit Komma abgetrennt.', 'weil leitet den Nebensatz ein.'],
    ['Nebensatz übertragen', 'Ich weiß dass du kommst.', 'Welche Schreibung ist richtig?', ['Ich weiß dass du kommst.', 'Ich weiß, dass du kommst.'], 'Ich weiß, dass du kommst.', 'Vor dass steht ein Komma.', 'Hauptsatz und Nebensatz werden getrennt.'],
  ],
  s10c: [
    ['Einschub anwenden', 'Mein Opa der in Rom lebt kommt heute.', 'Wie viele Kommas braucht der Einschub?', ['eines', 'zwei'], 'zwei', 'der in Rom lebt steht zwischen zwei Kommas.', 'Ein Einschub wird vorn und hinten abgetrennt.'],
    ['Einschub übertragen', 'Mia die heute fehlt ist krank.', 'Welche Schreibung ist richtig?', ['Mia die heute fehlt, ist krank.', 'Mia, die heute fehlt, ist krank.'], 'Mia, die heute fehlt, ist krank.', 'Der Einschub braucht ein Komma davor und danach.', 'Ein einzelnes Komma schließt den Einschub nicht.'],
  ],
  s11: [
    ['Silbe trennen', 'Fenster', 'Welche Trennung ist richtig?', ['Fe-nster', 'Fens-ter'], 'Fens-ter', 'Fenster trennt man Fens-ter.', 'Der letzte Mitlaut der Gruppe beginnt die nächste Silbe.'],
    ['Silbe übertragen', 'Kasten', 'Welche Trennung ist richtig?', ['Ka-sten', 'Kas-ten'], 'Kas-ten', 'Kasten trennt man Kas-ten.', 'st wird hier auf beide Silben verteilt.'],
  ],
}

function packed(parent: string): FoundationStep[] {
  const rows = PACK[parent]
  if (!rows || rows.length < 2) throw new Error(`Zu wenige Übungen nach ${parent}`)
  return rows.map((row, index) => practice(parent, index + 1, row[0], row[1], row[2], row[3], row[4], row[5], row[6]))
}

function special(parent: string): FoundationStep[] {
  if (parent === 'n2') {
    return [
      {
        id: 'n2-genus',
        title: 'Genus',
        lead: 'Substantive haben ein grammatisches Geschlecht.',
        concept: { term: 'Genus', also: 'grammatisches Geschlecht', definition: 'Substantive sind maskulin, feminin oder neutral.' },
        examples: ['der Hund', 'die Katze', 'das Kind'],
        try: {
          kind: 'classify',
          prompt: 'Ordne das Genus zu.',
          hint: 'Der Artikel zeigt das Genus.',
          items: [
            { id: 'hund', text: 'der Hund' },
            { id: 'katze', text: 'die Katze' },
            { id: 'kind', text: 'das Kind' },
          ],
          buckets: [
            { id: 'maskulin', text: 'maskulin' },
            { id: 'feminin', text: 'feminin' },
            { id: 'neutral', text: 'neutral' },
          ],
          solution: { hund: 'maskulin', katze: 'feminin', kind: 'neutral' },
        },
        observation: 'der Hund ist maskulin, die Katze feminin, das Kind neutral.',
        explanation: 'der Hund ist maskulin, die Katze feminin, das Kind neutral.',
        merksatz: 'Der Artikel zeigt das Genus.',
      },
      practice('n2-genus', 1, 'Genus anwenden', 'der Baum, die Blume, das Haus', 'Welches Genus hat „die Blume“?', ['maskulin', 'feminin', 'neutral'], 'feminin', 'die Blume ist feminin.', 'Sieh auf den Artikel.'),
      practice('n2-genus', 2, 'Genus übertragen', 'der Tisch', 'Welches Genus hat „der Tisch“?', ['maskulin', 'feminin', 'neutral'], 'maskulin', 'der Tisch ist maskulin.', 'der zeigt hier Maskulinum.'),
    ]
  }
  if (parent === 'n4') {
    return [
      {
        id: 'n4-plural',
        title: 'Plural',
        lead: 'Plural ist die Mehrzahl: aus Hund wird Hunde.',
        concept: { term: 'Plural', definition: 'Die Mehrzahl eines Substantivs.' },
        examples: ['Hund → Hunde'],
        try: choose('Bilde den Plural von „Hund“.', 'Hunde', ['Hunde', 'Hunden', 'Hunds'], 'Die Mehrzahl von Hund lautet nicht wie der Genitiv.'),
        observation: 'Die Mehrzahl von Hund heißt Hunde.',
        explanation: 'Die Mehrzahl von Hund heißt Hunde.',
        merksatz: 'Plural = Mehrzahl.',
      },
      practice('n4-plural', 1, 'Plural bilden', 'Kind', 'Bilde den Plural von „Kind“.', ['Kinden', 'Kinder', 'Kinds'], 'Kinder', 'Die Mehrzahl von Kind heißt Kinder.', 'Nicht jede Mehrzahl endet auf -en.'),
      practice('n4-plural', 2, 'Plural übertragen', 'Buch', 'Bilde den Plural von „Buch“.', ['Buche', 'Bücher', 'Buchs'], 'Bücher', 'Die Mehrzahl von Buch heißt Bücher.', 'Achte auf den Umlaut.'),
    ]
  }
  if (parent === 'n6') {
    return [
      practice('n6-mix', 1, 'Gemischt entscheiden', 'Berlin und Freude', 'Welches Wort ist ein Eigenname?', ['Berlin', 'Freude'], 'Berlin', 'Berlin benennt eine bestimmte Stadt. Freude ist ein Gefühl und kein Eigenname.', 'Eigennamen benennen ein bestimmtes Einzelnes.'),
    ]
  }
  if (parent === 'c7') {
    return [
      {
        id: 'c7-review',
        title: 'Fragen und Kasus',
        lead: 'Jetzt gehören die vier Fragen zu den vier Kasus.',
        try: {
          kind: 'classify',
          prompt: 'Ordne die Frage dem Kasus zu.',
          hint: 'Jede Frage gehört zu genau einem Kasus.',
          items: [
            { id: 'wer', text: 'Wer oder was?' },
            { id: 'wessen', text: 'Wessen?' },
            { id: 'wem', text: 'Wem?' },
            { id: 'wen', text: 'Wen oder was?' },
          ],
          buckets: [
            { id: 'nom', text: 'Nominativ' },
            { id: 'gen', text: 'Genitiv' },
            { id: 'dat', text: 'Dativ' },
            { id: 'akk', text: 'Akkusativ' },
          ],
          solution: { wer: 'nom', wessen: 'gen', wem: 'dat', wen: 'akk' },
        },
        observation: 'Wer oder was fragt nach dem Nominativ, Wessen nach dem Genitiv, Wem nach dem Dativ, Wen oder was nach dem Akkusativ.',
        explanation: 'Wer oder was fragt nach dem Nominativ, Wessen nach dem Genitiv, Wem nach dem Dativ, Wen oder was nach dem Akkusativ.',
        merksatz: 'Jede Frage gehört zu einem Kasus.',
      },
      practice('c7-review', 1, 'Alle Kasus im Satz', 'Der Hund bringt dem Kind den Ball.', 'Bestimme den Kasus von „dem Kind“.', ['Nominativ', 'Genitiv', 'Dativ', 'Akkusativ'], 'Dativ', '„dem Kind“ antwortet auf „Wem?“ und steht im Dativ.', 'Im Satz stehen noch weitere Kasus.'),
      {
        id: 'c7-schwer',
        title: 'Mehrere Kasus im Satz',
        lead: 'Nach der Pause gibt der Lehrer dem Bruder des neuen Schülers die Unterlagen.',
        try: choose(
          'Bestimme den Kasus von „des neuen Schülers“.',
          'Genitiv',
          ['Nominativ', 'Genitiv', 'Dativ', 'Akkusativ'],
          'Wessen Bruder ist gemeint?',
        ),
        observation: '„des neuen Schülers“ antwortet auf „Wessen?“ und steht im Genitiv. der Lehrer ist Nominativ, dem Bruder Dativ, die Unterlagen Akkusativ.',
        explanation: '„des neuen Schülers“ antwortet auf „Wessen?“ und steht im Genitiv. der Lehrer ist Nominativ, dem Bruder Dativ, die Unterlagen Akkusativ.',
        merksatz: 'Bei ähnlichen Formen entscheidet die Rolle im Satz.',
      },
    ]
  }
  if (parent === 'c9') {
    return [
      {
        id: 'c9-neutrum',
        title: 'Neutrum: das Kind',
        lead: 'Beim Neutrum gleichen sich Nominativ und Akkusativ oft: das Kind.',
        concept: { term: 'neutral', definition: 'Sächliches Genus. Nominativ und Akkusativ lauten oft gleich.' },
        examples: ['das Kind', 'des Kindes', 'dem Kind'],
        try: choose('Wie heißt „das Kind“ im Dativ?', 'dem Kind', ['das Kind', 'des Kindes', 'dem Kind'], 'Der Dativ fragt Wem?'),
        observation: 'Im Dativ heißt es dem Kind. Nominativ und Akkusativ bleiben das Kind.',
        explanation: 'Im Dativ heißt es dem Kind. Nominativ und Akkusativ bleiben das Kind.',
        merksatz: 'Neutrum: Nominativ und Akkusativ oft gleich.',
      },
      practice('c9-neutrum', 1, 'Neutrum anwenden', 'Ich sehe das Kind.', 'In welchem Kasus steht „das Kind“?', ['Nominativ', 'Dativ', 'Akkusativ'], 'Akkusativ', 'Wen oder was sehe ich? das Kind steht hier im Akkusativ, obwohl die Form wie der Nominativ aussieht.', 'Die Form allein zeigt den Kasus hier nicht.'),
      practice('c9-neutrum', 2, 'Neutrum übertragen', 'Das Kind schläft neben dem Haus.', 'In welchem Kasus steht „das Kind“?', ['Nominativ', 'Genitiv', 'Dativ'], 'Nominativ', 'das Kind handelt und steht im Nominativ. dem Haus steht in einem anderen Kasus.', 'Wer oder was schläft?'),
      {
        id: 'c9-review',
        title: 'Drei Genera im Vergleich',
        lead: 'Erst jetzt stehen die drei Reihen nebeneinander.',
        concept: {
          term: 'Genus und Kasus',
          definition: 'Dieselbe Kasusrolle hat je nach Genus eine andere Artikelform.',
        },
        examples: ['maskulin: der Hund, des Hundes, dem Hund, den Hund', 'feminin: die Frau, der Frau, der Frau, die Frau', 'neutral: das Kind, des Kindes, dem Kind, das Kind'],
        try: choose('Welche Form ist der Dativ von „das Kind“?', 'dem Kind', ['des Kindes', 'dem Kind', 'das Kind'], 'Vergleiche die drei Reihen nur an dieser einen Stelle.'),
        observation: 'Dem Kind ist der Dativ. Beim Femininum wären Genitiv und Dativ gleich, beim Neutrum nicht.',
        explanation: 'dem Kind ist der Dativ. Beim Femininum wären Genitiv und Dativ gleich, beim Neutrum nicht.',
        merksatz: 'Die Übersicht kommt nach den einzelnen Formen.',
      },
    ]
  }
  if (parent === 'v4') {
    return [
      {
        id: 'v4-plural',
        title: 'Plural der Person',
        lead: 'Im Plural heißen die Personen wir, ihr und sie.',
        concept: { term: 'Numerus beim Verb', definition: 'Auch die Personalform hat Singular oder Plural.' },
        examples: ['wir machen', 'ihr macht', 'sie machen'],
        try: choose('Wie heißt machen für ihr?', 'ihr macht', ['wir machen', 'ihr macht', 'sie machen'], 'ihr ist die 2. Person Plural.'),
        observation: 'ihr macht ist die 2. Person Plural.',
        explanation: 'ihr macht ist die 2. Person Plural.',
        merksatz: 'Plural: wir, ihr, sie.',
      },
      practice('v4-plural', 1, 'Plural anwenden', 'spielen', 'Wie heißt spielen für wir?', ['spielst', 'spielt', 'spielen'], 'spielen', 'wir spielen ist die 1. Person Plural.', 'Die Form gleicht hier dem Infinitiv.'),
    ]
  }
  if (parent === 'a4') {
    return [
      practice('a4-mix', 1, 'Drei Stufen vergleichen', 'klein, kleiner, am kleinsten', 'Welche Form ist der Komparativ?', ['klein', 'kleiner', 'am kleinsten'], 'kleiner', 'kleiner ist die 1. Steigerungsstufe. klein ist Positiv, am kleinsten Superlativ.', 'Vergleiche alle drei, wähle aber nur eine.'),
    ]
  }
  if (parent === 't6') {
    return [
      practice('t6-mix', 1, 'Sechs Tempora unterscheiden', 'Ich hatte gelernt.', 'Welches Tempus ist das?', ['Perfekt', 'Plusquamperfekt', 'Futur II'], 'Plusquamperfekt', 'hatte gelernt ist die Vorvergangenheit.', 'Das Hilfsverb steht im Präteritum.'),
    ]
  }
  if (parent === 'g4') {
    return [
      practice('g4-monat', 1, 'Monate', 'mai', 'Welche Schreibung ist richtig?', ['mai', 'Mai'], 'Mai', 'Mai ist ein Monatsname und wird großgeschrieben.', 'Monate sind Substantive.'),
      practice('g4-jahreszeit', 1, 'Jahreszeiten', 'sommer', 'Welche Schreibung ist richtig?', ['sommer', 'Sommer'], 'Sommer', 'Sommer ist eine Jahreszeit und wird großgeschrieben.', 'Auch Jahreszeiten sind Substantive.'),
    ]
  }
  if (parent === 's9') {
    return [
      practice('s9-wahr', 1, 'wahr oder war', 'Das ___ eine lange Stunde.', 'Welches Wort passt?', ['wahr', 'war'], 'war', 'war ist hier die Form von sein. wahr würde richtig bedeuten.', 'Ist eine Vergangenheitsform von sein gemeint?'),
      practice('s9-ihm', 1, 'ihm oder im', 'Das Buch liegt ___ Regal.', 'Welches Wort passt?', ['ihm', 'im'], 'im', 'im Regal gibt den Ort an. ihm wäre ein Pronomen.', 'Ort oder Pronomen?'),
    ]
  }
  return []
}

export function expandModules(source: readonly FoundationModule[]): FoundationModule[] {
  const modules = source.map((module) => ({
    ...module,
    steps: module.steps.flatMap((step) => [slim(step), ...packed(step.id), ...special(step.id)]),
  }))
  const ids = modules.flatMap((module) => module.steps.map((step) => step.id))
  const duplicate = ids.find((id, index) => ids.indexOf(id) !== index)
  if (duplicate) throw new Error(`Tutorialschritt doppelt: ${duplicate}`)
  return modules
}
