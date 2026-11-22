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
}

export type FoundationTry =
  | { kind: 'choice'; prompt: string; options: FoundationChoice[]; answerId: string }
  | { kind: 'series'; questions: FoundationQuestion[] }
  | { kind: 'classify'; prompt: string; items: FoundationChoice[]; buckets: FoundationChoice[]; solution: Record<string, string> }
  | { kind: 'compare'; prompt: string; left: string; right: string; answer: 'left' | 'right' }
  | { kind: 'order'; prompt: string; items: FoundationChoice[]; correctIds: string[] }

export interface ConceptCard {
  term: string
  definition: string
}

export interface FoundationStep {
  id: string
  title: string
  lead: string
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
