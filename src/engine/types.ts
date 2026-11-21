import type { AreaId } from '../domain/areas'

export type Difficulty = 1 | 2 | 3

export interface WordToken {
  id: string
  text: string
  selectable: boolean
}

export interface ChoiceOption {
  id: string
  text: string
}

export interface SortItem {
  id: string
  text: string
}

export interface SortBucket {
  id: string
  label: string
}

export interface ToggleToken {
  id: string
  faulty: string
  correct: string
  reason?: string
  reasonLabel?: string
  note?: string
  before?: string
  after?: string
}

export type Interaction =
  | { kind: 'mark'; tokens: WordToken[]; correctIds: string[]; mode: 'single' | 'multi' }
  | { kind: 'choose'; options: ChoiceOption[]; correctId: string; layout: 'stack' | 'pair' }
  | { kind: 'classify'; items: SortItem[]; buckets: SortBucket[]; solution: Record<string, string> }
  | { kind: 'order'; items: SortItem[]; correctIds: string[] }
  | { kind: 'toggle'; tokens: ToggleToken[] }
  | { kind: 'commas'; words: string[]; correctSlots: number[] }
  | { kind: 'bool'; correct: boolean }

export interface Task {
  id: string
  area: AreaId
  type: string
  typeLabel: string
  difficulty: Difficulty
  tags: string[]
  prompt: string
  stimulus?: string
  interaction: Interaction
  feedbackCorrect: string
  feedbackIncorrect: string
}

export type Answer =
  | { kind: 'ids'; ids: string[] }
  | { kind: 'choice'; id: string }
  | { kind: 'map'; map: Record<string, string> }
  | { kind: 'order'; ids: string[] }
  | { kind: 'toggle'; values: Record<string, string> }
  | { kind: 'commas'; slots: number[] }
  | { kind: 'bool'; value: boolean }

export function sameSet(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) return false
  const bag = new Set(left)
  return right.every((item) => bag.has(item))
}
