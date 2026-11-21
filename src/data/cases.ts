export type CaseId = 'nom' | 'gen' | 'dat' | 'akk'

export const caseLabels: Record<CaseId, string> = {
  nom: 'Nominativ',
  gen: 'Genitiv',
  dat: 'Dativ',
  akk: 'Akkusativ',
}

export const caseQuestions: Record<CaseId, string> = {
  nom: 'Wer oder was?',
  gen: 'Wessen?',
  dat: 'Wem?',
  akk: 'Wen oder was?',
}

export interface CaseTarget {
  surface: string
  label: string
  caseId: CaseId
  probe: string
}

export interface CaseSentence {
  id: string
  sentence: string
  difficulty: 1 | 2 | 3
  targets: CaseTarget[]
}

export const caseSentences: readonly CaseSentence[] = [
  {
    id: 'c01',
    sentence: 'Der Hund schläft.',
    difficulty: 1,
    targets: [{ surface: 'Der Hund', label: 'der Hund', caseId: 'nom', probe: 'Wer oder was schläft?' }],
  },
  {
    id: 'c02',
    sentence: 'Das Fahrrad des Jungen ist neu.',
    difficulty: 1,
    targets: [{ surface: 'des Jungen', label: 'des Jungen', caseId: 'gen', probe: 'Wessen Fahrrad ist neu?' }],
  },
  {
    id: 'c03',
    sentence: 'Mia gibt dem Hund einen Ball.',
    difficulty: 2,
    targets: [
      { surface: 'dem Hund', label: 'dem Hund', caseId: 'dat', probe: 'Wem gibt Mia einen Ball?' },
      { surface: 'einen Ball', label: 'einen Ball', caseId: 'akk', probe: 'Wen oder was gibt Mia dem Hund?' },
    ],
  },
  {
    id: 'c04',
    sentence: 'Lena sieht den Lehrer.',
    difficulty: 1,
    targets: [{ surface: 'den Lehrer', label: 'den Lehrer', caseId: 'akk', probe: 'Wen oder was sieht Lena?' }],
  },
  {
    id: 'c05',
    sentence: 'Die Katze folgt dem Kind.',
    difficulty: 2,
    targets: [{ surface: 'dem Kind', label: 'dem Kind', caseId: 'dat', probe: 'Wem folgt die Katze?' }],
  },
  {
    id: 'c06',
    sentence: 'Das Buch der Schülerin liegt auf dem Tisch.',
    difficulty: 2,
    targets: [{ surface: 'der Schülerin', label: 'der Schülerin', caseId: 'gen', probe: 'Wessen Buch liegt auf dem Tisch?' }],
  },
  {
    id: 'c07',
    sentence: 'Der Trainer erklärt den Spielern die Aufgabe.',
    difficulty: 3,
    targets: [
      { surface: 'Der Trainer', label: 'der Trainer', caseId: 'nom', probe: 'Wer oder was erklärt den Spielern die Aufgabe?' },
      { surface: 'den Spielern', label: 'den Spielern', caseId: 'dat', probe: 'Wem erklärt der Trainer die Aufgabe?' },
      { surface: 'die Aufgabe', label: 'die Aufgabe', caseId: 'akk', probe: 'Wen oder was erklärt der Trainer den Spielern?' },
    ],
  },
  {
    id: 'c08',
    sentence: 'Die Farbe des Autos gefällt mir.',
    difficulty: 2,
    targets: [{ surface: 'des Autos', label: 'des Autos', caseId: 'gen', probe: 'Wessen Farbe gefällt mir?' }],
  },
  {
    id: 'c09',
    sentence: 'Der Schüler schreibt dem Lehrer eine Nachricht.',
    difficulty: 3,
    targets: [
      { surface: 'dem Lehrer', label: 'dem Lehrer', caseId: 'dat', probe: 'Wem schreibt der Schüler eine Nachricht?' },
      { surface: 'eine Nachricht', label: 'eine Nachricht', caseId: 'akk', probe: 'Wen oder was schreibt der Schüler dem Lehrer?' },
    ],
  },
  {
    id: 'c10',
    sentence: 'Die Kinder kaufen einen Ball.',
    difficulty: 1,
    targets: [{ surface: 'einen Ball', label: 'einen Ball', caseId: 'akk', probe: 'Wen oder was kaufen die Kinder?' }],
  },
  {
    id: 'c11',
    sentence: 'Die Mutter hilft dem Jungen.',
    difficulty: 1,
    targets: [{ surface: 'dem Jungen', label: 'dem Jungen', caseId: 'dat', probe: 'Wem hilft die Mutter?' }],
  },
  {
    id: 'c12',
    sentence: 'Das Dach des Hauses ist beschädigt.',
    difficulty: 2,
    targets: [{ surface: 'des Hauses', label: 'des Hauses', caseId: 'gen', probe: 'Wessen Dach ist beschädigt?' }],
  },
  {
    id: 'c13',
    sentence: 'Der Arzt untersucht den Patienten.',
    difficulty: 2,
    targets: [{ surface: 'den Patienten', label: 'den Patienten', caseId: 'akk', probe: 'Wen oder was untersucht der Arzt?' }],
  },
  {
    id: 'c14',
    sentence: 'Die Lehrerin gibt den Kindern neue Bücher.',
    difficulty: 3,
    targets: [
      { surface: 'den Kindern', label: 'den Kindern', caseId: 'dat', probe: 'Wem gibt die Lehrerin neue Bücher?' },
      { surface: 'neue Bücher', label: 'neue Bücher', caseId: 'akk', probe: 'Wen oder was gibt die Lehrerin den Kindern?' },
    ],
  },
  {
    id: 'c15',
    sentence: 'Der Hund gehört dem Nachbarn.',
    difficulty: 1,
    targets: [{ surface: 'dem Nachbarn', label: 'dem Nachbarn', caseId: 'dat', probe: 'Wem gehört der Hund?' }],
  },
]

export interface ArticleForm {
  def: string
  indef: string
}

export interface ArticleParadigm {
  gender: 'maskulin' | 'feminin' | 'neutrum'
  noun: string
  forms: Record<CaseId, ArticleForm>
}

export const articleParadigms: readonly ArticleParadigm[] = [
  {
    gender: 'maskulin',
    noun: 'Mann',
    forms: {
      nom: { def: 'der Mann', indef: 'ein Mann' },
      gen: { def: 'des Mannes', indef: 'eines Mannes' },
      dat: { def: 'dem Mann', indef: 'einem Mann' },
      akk: { def: 'den Mann', indef: 'einen Mann' },
    },
  },
  {
    gender: 'feminin',
    noun: 'Frau',
    forms: {
      nom: { def: 'die Frau', indef: 'eine Frau' },
      gen: { def: 'der Frau', indef: 'einer Frau' },
      dat: { def: 'der Frau', indef: 'einer Frau' },
      akk: { def: 'die Frau', indef: 'eine Frau' },
    },
  },
  {
    gender: 'neutrum',
    noun: 'Kind',
    forms: {
      nom: { def: 'das Kind', indef: 'ein Kind' },
      gen: { def: 'des Kindes', indef: 'eines Kindes' },
      dat: { def: 'dem Kind', indef: 'einem Kind' },
      akk: { def: 'das Kind', indef: 'ein Kind' },
    },
  },
]

export const hundParadigm: Record<CaseId, string> = {
  nom: 'der Hund',
  gen: 'des Hundes',
  dat: 'dem Hund',
  akk: 'den Hund',
}

export const dativePrepositions = ['aus', 'bei', 'mit', 'nach', 'seit', 'von', 'zu', 'gegenüber'] as const
export const accusativePrepositions = ['durch', 'für', 'gegen', 'ohne', 'um'] as const

export const prepositionExamples = [
  { phrase: 'mit dem Bus', preposition: 'mit', caseId: 'dat' as const },
  { phrase: 'bei der Freundin', preposition: 'bei', caseId: 'dat' as const },
  { phrase: 'nach dem Unterricht', preposition: 'nach', caseId: 'dat' as const },
  { phrase: 'seit einem Monat', preposition: 'seit', caseId: 'dat' as const },
  { phrase: 'von der Schule', preposition: 'von', caseId: 'dat' as const },
  { phrase: 'zu dem Arzt', preposition: 'zu', caseId: 'dat' as const },
  { phrase: 'zum Arzt', preposition: 'zu', caseId: 'dat' as const },
  { phrase: 'durch den Park', preposition: 'durch', caseId: 'akk' as const },
  { phrase: 'für den Bruder', preposition: 'für', caseId: 'akk' as const },
  { phrase: 'gegen den Wind', preposition: 'gegen', caseId: 'akk' as const },
  { phrase: 'ohne einen Regenschirm', preposition: 'ohne', caseId: 'akk' as const },
  { phrase: 'um das Haus', preposition: 'um', caseId: 'akk' as const },
]
