export const persons = ['ich', 'du', 'er', 'wir', 'ihr', 'sie'] as const
export type Person = (typeof persons)[number]

export interface VerbParadigm {
  infinitive: string
  pattern: 'regular' | 'ieren' | 'vowel' | 'irregular'
  difficulty: 1 | 2 | 3
  forms: Record<Person, string>
}

export const verbParadigms: readonly VerbParadigm[] = [
  { infinitive: 'machen', pattern: 'regular', difficulty: 1, forms: { ich: 'mache', du: 'machst', er: 'macht', wir: 'machen', ihr: 'macht', sie: 'machen' } },
  { infinitive: 'spielen', pattern: 'regular', difficulty: 1, forms: { ich: 'spiele', du: 'spielst', er: 'spielt', wir: 'spielen', ihr: 'spielt', sie: 'spielen' } },
  { infinitive: 'lernen', pattern: 'regular', difficulty: 1, forms: { ich: 'lerne', du: 'lernst', er: 'lernt', wir: 'lernen', ihr: 'lernt', sie: 'lernen' } },
  { infinitive: 'fragen', pattern: 'regular', difficulty: 1, forms: { ich: 'frage', du: 'fragst', er: 'fragt', wir: 'fragen', ihr: 'fragt', sie: 'fragen' } },
  { infinitive: 'studieren', pattern: 'ieren', difficulty: 2, forms: { ich: 'studiere', du: 'studierst', er: 'studiert', wir: 'studieren', ihr: 'studiert', sie: 'studieren' } },
  { infinitive: 'nehmen', pattern: 'vowel', difficulty: 2, forms: { ich: 'nehme', du: 'nimmst', er: 'nimmt', wir: 'nehmen', ihr: 'nehmt', sie: 'nehmen' } },
  { infinitive: 'lesen', pattern: 'vowel', difficulty: 2, forms: { ich: 'lese', du: 'liest', er: 'liest', wir: 'lesen', ihr: 'lest', sie: 'lesen' } },
  { infinitive: 'helfen', pattern: 'vowel', difficulty: 2, forms: { ich: 'helfe', du: 'hilfst', er: 'hilft', wir: 'helfen', ihr: 'helft', sie: 'helfen' } },
  { infinitive: 'sein', pattern: 'irregular', difficulty: 3, forms: { ich: 'bin', du: 'bist', er: 'ist', wir: 'sind', ihr: 'seid', sie: 'sind' } },
  { infinitive: 'haben', pattern: 'irregular', difficulty: 3, forms: { ich: 'habe', du: 'hast', er: 'hat', wir: 'haben', ihr: 'habt', sie: 'haben' } },
]

export interface GapSentence {
  id: string
  before: string
  after: string
  infinitive: string
  solution: string
  difficulty: 1 | 2 | 3
}

export const gapSentences: readonly GapSentence[] = [
  { id: 'g01', before: 'Ich', after: 'Fußball.', infinitive: 'spielen', solution: 'spiele', difficulty: 1 },
  { id: 'g02', before: 'Du', after: 'für die Schule.', infinitive: 'lernen', solution: 'lernst', difficulty: 1 },
  { id: 'g03', before: 'Er', after: 'ein Buch.', infinitive: 'lesen', solution: 'liest', difficulty: 2 },
  { id: 'g04', before: 'Wir', after: 'die Hausaufgaben.', infinitive: 'machen', solution: 'machen', difficulty: 1 },
  { id: 'g05', before: 'Ihr', after: 'der Lehrerin.', infinitive: 'helfen', solution: 'helft', difficulty: 2 },
  { id: 'g06', before: 'Sie', after: 'pünktlich.', infinitive: 'kommen', solution: 'kommen', difficulty: 2 },
  { id: 'g07', before: 'Mia', after: 'einen Ball.', infinitive: 'werfen', solution: 'wirft', difficulty: 3 },
  { id: 'g08', before: 'Ben', after: 'seine Tasche.', infinitive: 'tragen', solution: 'trägt', difficulty: 3 },
  { id: 'g09', before: 'Du', after: 'einen Apfel.', infinitive: 'nehmen', solution: 'nimmst', difficulty: 2 },
  { id: 'g10', before: 'Die Kinder', after: 'im Garten.', infinitive: 'spielen', solution: 'spielen', difficulty: 1 },
]

export const preteriteForms = [
  { infinitive: 'machen', form: 'machte' },
  { infinitive: 'sein', form: 'war' },
  { infinitive: 'haben', form: 'hatte' },
] as const

export const participlePairs = [
  { infinitive: 'machen', participle: 'gemacht' },
  { infinitive: 'fragen', participle: 'gefragt' },
  { infinitive: 'spielen', participle: 'gespielt' },
  { infinitive: 'studieren', participle: 'studiert' },
  { infinitive: 'probieren', participle: 'probiert' },
  { infinitive: 'gehen', participle: 'gegangen' },
  { infinitive: 'nehmen', participle: 'genommen' },
  { infinitive: 'sehen', participle: 'gesehen' },
] as const

export interface PerfectItem {
  id: string
  sentence: string
  auxiliary: 'haben' | 'sein'
  auxiliaryForm: string
  participle: string
  difficulty: 1 | 2 | 3
}

export const perfectItems: readonly PerfectItem[] = [
  { id: 'p01', sentence: 'Ich habe gelernt.', auxiliary: 'haben', auxiliaryForm: 'habe', participle: 'gelernt', difficulty: 1 },
  { id: 'p02', sentence: 'Du hast gespielt.', auxiliary: 'haben', auxiliaryForm: 'hast', participle: 'gespielt', difficulty: 1 },
  { id: 'p03', sentence: 'Er ist gekommen.', auxiliary: 'sein', auxiliaryForm: 'ist', participle: 'gekommen', difficulty: 2 },
  { id: 'p04', sentence: 'Wir haben gegessen.', auxiliary: 'haben', auxiliaryForm: 'haben', participle: 'gegessen', difficulty: 2 },
  { id: 'p05', sentence: 'Lena ist gegangen.', auxiliary: 'sein', auxiliaryForm: 'ist', participle: 'gegangen', difficulty: 2 },
  { id: 'p06', sentence: 'Mia hat geschrieben.', auxiliary: 'haben', auxiliaryForm: 'hat', participle: 'geschrieben', difficulty: 2 },
  { id: 'p07', sentence: 'Ben ist eingeschlafen.', auxiliary: 'sein', auxiliaryForm: 'ist', participle: 'eingeschlafen', difficulty: 3 },
  { id: 'p08', sentence: 'Die Kinder haben gelacht.', auxiliary: 'haben', auxiliaryForm: 'haben', participle: 'gelacht', difficulty: 1 },
  { id: 'p09', sentence: 'Der Zug ist angekommen.', auxiliary: 'sein', auxiliaryForm: 'ist', participle: 'angekommen', difficulty: 3 },
  { id: 'p10', sentence: 'Paul hat das Fahrrad repariert.', auxiliary: 'haben', auxiliaryForm: 'hat', participle: 'repariert', difficulty: 2 },
]
