export const AREA_IDS = [
  'nouns',
  'cases',
  'adjectives',
  'verbs',
  'tenses',
  'voice',
  'capitalization',
  'spelling',
] as const

export type AreaId = (typeof AREA_IDS)[number]
export type TrainingArea = AreaId | 'mixed'

export interface AreaDefinition {
  id: AreaId
  order: number
  title: string
  description: string
  accent: 'sage' | 'sky' | 'rose' | 'violet' | 'clay' | 'teal'
}

export const AREAS: readonly AreaDefinition[] = [
  {
    id: 'nouns',
    order: 1,
    title: 'Substantive (Nomen) erkennen',
    description: 'Personen, Dinge, Orte und Gefühle im Satz finden.',
    accent: 'sage',
  },
  {
    id: 'cases',
    order: 2,
    title: 'Artikel & Fälle',
    description: 'der, die, das und die vier Fälle sicher verwenden.',
    accent: 'sky',
  },
  {
    id: 'adjectives',
    order: 3,
    title: 'Adjektive steigern',
    description: 'Grundform, Vergleich und höchste Stufe bilden.',
    accent: 'rose',
  },
  {
    id: 'verbs',
    order: 4,
    title: 'Verben konjugieren',
    description: 'Personen, Zeiten und Partizip II passend einsetzen.',
    accent: 'violet',
  },
  {
    id: 'tenses',
    order: 5,
    title: 'Zeitformen',
    description: 'Sechs Zeitformen erkennen und auseinanderhalten.',
    accent: 'clay',
  },
  {
    id: 'voice',
    order: 6,
    title: 'Aktiv & Passiv',
    description: 'Handlung und handelnde Person umformen.',
    accent: 'teal',
  },
  {
    id: 'capitalization',
    order: 7,
    title: 'Groß- & Kleinschreibung',
    description: 'Substantive (Nomen), Satzanfang und Eigennamen unterscheiden.',
    accent: 'sage',
  },
  {
    id: 'spelling',
    order: 8,
    title: 'Rechtschreibfehler',
    description: 'Häufige Schreibweisen prüfen und korrigieren.',
    accent: 'sky',
  },
]

export function areaById(id: AreaId): AreaDefinition {
  const area = AREAS.find((item) => item.id === id)
  if (!area) throw new Error(`Unbekannter Lernbereich: ${id}`)
  return area
}

export function isAreaId(value: string): value is AreaId {
  return AREA_IDS.some((id) => id === value)
}
