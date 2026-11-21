export const tenseIds = ['praesens', 'praeteritum', 'perfekt', 'plusquam', 'futur1', 'futur2'] as const
export type TenseId = (typeof tenseIds)[number]

export const tenseLabels: Record<TenseId, string> = {
  praesens: 'Präsens',
  praeteritum: 'Präteritum',
  perfekt: 'Perfekt',
  plusquam: 'Plusquamperfekt',
  futur1: 'Futur I',
  futur2: 'Futur II',
}

export interface TenseSentence {
  tense: TenseId
  sentence: string
  parts: string[]
}

export interface TensePool {
  id: string
  verb: string
  difficulty: 1 | 2 | 3
  forms: Record<TenseId, TenseSentence>
}

function pool(
  id: string,
  verb: string,
  difficulty: 1 | 2 | 3,
  forms: Record<TenseId, TenseSentence>,
): TensePool {
  return { id, verb, difficulty, forms }
}

export const tensePools: readonly TensePool[] = [
  pool('lernen', 'lernen', 1, {
    praesens: { tense: 'praesens', sentence: 'Ich lerne für die Klassenarbeit.', parts: ['lerne'] },
    praeteritum: { tense: 'praeteritum', sentence: 'Ich lernte für die Klassenarbeit.', parts: ['lernte'] },
    perfekt: { tense: 'perfekt', sentence: 'Ich habe für die Klassenarbeit gelernt.', parts: ['habe', 'gelernt'] },
    plusquam: { tense: 'plusquam', sentence: 'Ich hatte für die Klassenarbeit gelernt.', parts: ['hatte', 'gelernt'] },
    futur1: { tense: 'futur1', sentence: 'Ich werde für die Klassenarbeit lernen.', parts: ['werde', 'lernen'] },
    futur2: { tense: 'futur2', sentence: 'Ich werde für die Klassenarbeit gelernt haben.', parts: ['werde', 'gelernt', 'haben'] },
  }),
  pool('spielen', 'spielen', 1, {
    praesens: { tense: 'praesens', sentence: 'Ben spielt Fußball.', parts: ['spielt'] },
    praeteritum: { tense: 'praeteritum', sentence: 'Ben spielte Fußball.', parts: ['spielte'] },
    perfekt: { tense: 'perfekt', sentence: 'Ben hat Fußball gespielt.', parts: ['hat', 'gespielt'] },
    plusquam: { tense: 'plusquam', sentence: 'Ben hatte Fußball gespielt.', parts: ['hatte', 'gespielt'] },
    futur1: { tense: 'futur1', sentence: 'Ben wird Fußball spielen.', parts: ['wird', 'spielen'] },
    futur2: { tense: 'futur2', sentence: 'Ben wird Fußball gespielt haben.', parts: ['wird', 'gespielt', 'haben'] },
  }),
  pool('gehen', 'gehen', 2, {
    praesens: { tense: 'praesens', sentence: 'Mia geht zur Schule.', parts: ['geht'] },
    praeteritum: { tense: 'praeteritum', sentence: 'Mia ging zur Schule.', parts: ['ging'] },
    perfekt: { tense: 'perfekt', sentence: 'Mia ist zur Schule gegangen.', parts: ['ist', 'gegangen'] },
    plusquam: { tense: 'plusquam', sentence: 'Mia war zur Schule gegangen.', parts: ['war', 'gegangen'] },
    futur1: { tense: 'futur1', sentence: 'Mia wird zur Schule gehen.', parts: ['wird', 'gehen'] },
    futur2: { tense: 'futur2', sentence: 'Mia wird zur Schule gegangen sein.', parts: ['wird', 'gegangen', 'sein'] },
  }),
  pool('schreiben', 'schreiben', 2, {
    praesens: { tense: 'praesens', sentence: 'Lena schreibt eine Nachricht.', parts: ['schreibt'] },
    praeteritum: { tense: 'praeteritum', sentence: 'Lena schrieb eine Nachricht.', parts: ['schrieb'] },
    perfekt: { tense: 'perfekt', sentence: 'Lena hat eine Nachricht geschrieben.', parts: ['hat', 'geschrieben'] },
    plusquam: { tense: 'plusquam', sentence: 'Lena hatte eine Nachricht geschrieben.', parts: ['hatte', 'geschrieben'] },
    futur1: { tense: 'futur1', sentence: 'Lena wird eine Nachricht schreiben.', parts: ['wird', 'schreiben'] },
    futur2: { tense: 'futur2', sentence: 'Lena wird eine Nachricht geschrieben haben.', parts: ['wird', 'geschrieben', 'haben'] },
  }),
  pool('lesen', 'lesen', 2, {
    praesens: { tense: 'praesens', sentence: 'Paul liest das Buch.', parts: ['liest'] },
    praeteritum: { tense: 'praeteritum', sentence: 'Paul las das Buch.', parts: ['las'] },
    perfekt: { tense: 'perfekt', sentence: 'Paul hat das Buch gelesen.', parts: ['hat', 'gelesen'] },
    plusquam: { tense: 'plusquam', sentence: 'Paul hatte das Buch gelesen.', parts: ['hatte', 'gelesen'] },
    futur1: { tense: 'futur1', sentence: 'Paul wird das Buch lesen.', parts: ['wird', 'lesen'] },
    futur2: { tense: 'futur2', sentence: 'Paul wird das Buch gelesen haben.', parts: ['wird', 'gelesen', 'haben'] },
  }),
  pool('kommen', 'kommen', 3, {
    praesens: { tense: 'praesens', sentence: 'Der Bus kommt pünktlich.', parts: ['kommt'] },
    praeteritum: { tense: 'praeteritum', sentence: 'Der Bus kam pünktlich.', parts: ['kam'] },
    perfekt: { tense: 'perfekt', sentence: 'Der Bus ist pünktlich gekommen.', parts: ['ist', 'gekommen'] },
    plusquam: { tense: 'plusquam', sentence: 'Der Bus war pünktlich gekommen.', parts: ['war', 'gekommen'] },
    futur1: { tense: 'futur1', sentence: 'Der Bus wird pünktlich kommen.', parts: ['wird', 'kommen'] },
    futur2: { tense: 'futur2', sentence: 'Der Bus wird pünktlich gekommen sein.', parts: ['wird', 'gekommen', 'sein'] },
  }),
]

export interface RecognitionSentence {
  id: string
  sentence: string
  tense: TenseId
  difficulty: 1 | 2 | 3
}

export const recognitionSentences: readonly RecognitionSentence[] = [
  { id: 'r01', sentence: 'Morgen besucht Mia ihre Freundin.', tense: 'praesens', difficulty: 2 },
  { id: 'r02', sentence: 'Gestern spielte Ben lange im Garten.', tense: 'praeteritum', difficulty: 1 },
  { id: 'r03', sentence: 'Die Klasse hat einen Test geschrieben.', tense: 'perfekt', difficulty: 2 },
  { id: 'r04', sentence: 'Paul hatte bereits gegessen.', tense: 'plusquam', difficulty: 3 },
  { id: 'r05', sentence: 'Wir werden morgen früher starten.', tense: 'futur1', difficulty: 2 },
  { id: 'r06', sentence: 'Sie wird die Arbeit bis dahin beendet haben.', tense: 'futur2', difficulty: 3 },
  { id: 'r07', sentence: 'Lena ist nach Hause gegangen.', tense: 'perfekt', difficulty: 2 },
  { id: 'r08', sentence: 'Der Zug war bereits abgefahren.', tense: 'plusquam', difficulty: 3 },
  { id: 'r09', sentence: 'Mia wird später anrufen.', tense: 'futur1', difficulty: 2 },
  { id: 'r10', sentence: 'Der Hund schläft unter dem Tisch.', tense: 'praesens', difficulty: 1 },
]

export const timelineOrder = ['plusquam', 'praeteritum', 'praesens', 'futur1'] as const

export const timelineLabels: Record<(typeof timelineOrder)[number], string> = {
  plusquam: 'Vorvergangenheit',
  praeteritum: 'Vergangenheit',
  praesens: 'Gegenwart',
  futur1: 'Zukunft',
}
