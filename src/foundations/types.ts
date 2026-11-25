import type { AreaId } from '../domain/areas'

export interface FoundationChoice {
  id: string
  text: string
}

export interface FoundationQuestion {
  stimulus: string
  prompt: string
  options: FoundationChoice[]
  answerId: string
  settle: string
  /** Erster Fehlversuch: Hinweis, noch keine Lösung. */
  hint?: string
}

export type FoundationTry =
  | { kind: 'choice'; prompt: string; options: FoundationChoice[]; answerId: string; hint?: string }
  | { kind: 'series'; questions: FoundationQuestion[] }
  | { kind: 'classify'; prompt: string; items: FoundationChoice[]; buckets: FoundationChoice[]; solution: Record<string, string>; hint?: string }
  | { kind: 'compare'; prompt: string; left: string; right: string; answer: 'left' | 'right'; hint?: string }
  | { kind: 'order'; prompt: string; items: FoundationChoice[]; correctIds: string[]; hint?: string }

export interface ConceptPair {
  term: string
  hint: string
}

export interface ConceptCard {
  term: string
  /** Gleichbedeutender Fachbegriff, sichtbar unter dem Hauptbegriff. */
  also?: string
  definition: string
  /** Kurze Zuordnungen, zum Beispiel Positiv → Grundstufe. */
  pairs?: readonly ConceptPair[]
}

export interface FoundationStep {
  id: string
  title: string
  lead: string
  /** Zielstelle im Einleitungssatz, wenn die Frage eine Wortgruppe im Satz meint. */
  mark?: string
  examples?: readonly string[]
  concept?: ConceptCard
  try: FoundationTry
  observation: string
  explanation: string
  merksatz?: string
}

export interface FoundationModule {
  area: AreaId
  steps: readonly FoundationStep[]
}

/** Tutorial aliases — same structure as foundations */
export type TutorialStep = FoundationStep
export type TutorialModule = FoundationModule
export type TutorialTry = FoundationTry
