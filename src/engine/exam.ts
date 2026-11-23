import { AREA_IDS, type AreaId } from '../domain/areas'
import { allTasks } from './generate'
import { buildRound } from './select'
import type { Difficulty, Task } from './types'

export const EXAM_LEVELS = ['leicht', 'mittel', 'schwierig'] as const
export type ExamLevel = (typeof EXAM_LEVELS)[number]
export const EXAM_LENGTHS = [10, 20, 30] as const
export type ExamLength = (typeof EXAM_LENGTHS)[number]
export const DEFAULT_EXAM_LENGTH: ExamLength = 20

export const EXAM_MIX: Record<ExamLevel, Record<Difficulty, number>> = {
  leicht: { 1: 0.7, 2: 0.3, 3: 0 },
  mittel: { 1: 0.2, 2: 0.6, 3: 0.2 },
  schwierig: { 1: 0.1, 2: 0.35, 3: 0.55 },
}

export const EXAM_LEVEL_COPY: Record<ExamLevel, { title: string; lead: string; fit: string; focus: string }> = {
  leicht: {
    title: 'Leicht',
    lead: 'Grundlagen sicher beherrschen',
    fit: 'erste Wiederholung',
    focus: 'klare Grundregeln, kurze Sätze, eindeutige Formen',
  },
  mittel: {
    title: 'Mittel',
    lead: 'Regeln sicher anwenden',
    fit: 'normale Leistungsüberprüfung',
    focus: 'verschiedene Aufgabentypen, unregelmäßige Formen, mehrere grammatische Informationen',
  },
  schwierig: {
    title: 'Schwierig',
    lead: 'Grammatik wirklich beherrschen',
    fit: 'anspruchsvolle Wiederholung',
    focus: 'Transfer, Fehleranalyse, ähnliche Antwortmöglichkeiten, komplexere Satzstrukturen, mehrere Regeln gleichzeitig',
  },
}

export function examPercent(correct: number, total: number): number {
  if (total <= 0) return 0
  return Math.round((correct / total) * 100)
}

export function examRating(percent: number): string {
  if (percent >= 90) return 'Sehr sicher'
  if (percent >= 75) return 'Weitgehend sicher'
  if (percent >= 60) return 'Teilweise sicher'
  return 'Noch Übungsbedarf'
}

export function buildExam(options: {
  areas: readonly AreaId[]
  level: ExamLevel
  count: number
  rng: () => number
}): Task[] {
  const selected = new Set(options.areas)
  const pool = allTasks().filter((task) => selected.has(task.area))
  return buildRound({
    pool,
    count: Math.min(options.count, pool.length),
    recentIds: [],
    preferred: new Set<Difficulty>([1, 2, 3]),
    rng: options.rng,
    varyArea: options.areas.length > 1,
    difficultyMix: EXAM_MIX[options.level],
  })
}

export function buildPracticeRound(areas: readonly AreaId[], recentIds: readonly string[], rng: () => number): Task[] {
  const selected = new Set(areas)
  const pool = allTasks().filter((task) => selected.has(task.area))
  return buildRound({
    pool,
    count: Math.min(10, pool.length),
    recentIds,
    preferred: new Set<Difficulty>([1, 2, 3]),
    rng,
    varyArea: areas.length > 1,
  })
}

export function weakAreas(results: readonly { area: AreaId; correct: boolean }[]): AreaId[] {
  const totals = new Map<AreaId, { total: number; correct: number }>()
  for (const item of results) {
    const group = totals.get(item.area) ?? { total: 0, correct: 0 }
    group.total += 1
    if (item.correct) group.correct += 1
    totals.set(item.area, group)
  }
  return AREA_IDS.filter((id) => {
    const group = totals.get(id)
    return Boolean(group && group.correct < group.total)
  })
}
