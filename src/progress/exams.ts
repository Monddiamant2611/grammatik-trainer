import { AREA_IDS, isAreaId, type AreaId } from '../domain/areas'
import { examPercent, type ExamLevel } from '../engine/exam'

export const EXAM_STORAGE_KEY = 'grammatik-trainer-exams-v1'
const EXAM_LIMIT = 20

export interface ExamAreaScore {
  total: number
  correct: number
}

export interface ExamEntry {
  id: string
  at: string
  level: ExamLevel
  areas: AreaId[]
  total: number
  correct: number
  percent: number
  byArea: Partial<Record<AreaId, ExamAreaScore>>
  weakAreas: AreaId[]
}

export interface ExamLog {
  version: 1
  entries: ExamEntry[]
}

export function emptyExamLog(): ExamLog {
  return { version: 1, entries: [] }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isLevel(value: unknown): value is ExamLevel {
  return value === 'leicht' || value === 'mittel' || value === 'schwierig'
}

function sanitizeEntry(value: unknown): ExamEntry | null {
  if (!isRecord(value) || typeof value.id !== 'string' || typeof value.at !== 'string' || !isLevel(value.level)) return null
  const areas = Array.isArray(value.areas) ? value.areas.filter((id): id is AreaId => isAreaId(typeof id === 'string' ? id : '')) : []
  const total = Math.max(0, Math.floor(typeof value.total === 'number' ? value.total : 0))
  const correct = Math.max(0, Math.min(total, Math.floor(typeof value.correct === 'number' ? value.correct : 0)))
  const byArea: ExamEntry['byArea'] = {}
  if (isRecord(value.byArea)) {
    for (const id of AREA_IDS) {
      const score = value.byArea[id]
      if (!isRecord(score)) continue
      const areaTotal = Math.max(0, Math.floor(typeof score.total === 'number' ? score.total : 0))
      const areaCorrect = Math.max(0, Math.min(areaTotal, Math.floor(typeof score.correct === 'number' ? score.correct : 0)))
      if (areaTotal > 0) byArea[id] = { total: areaTotal, correct: areaCorrect }
    }
  }
  const weakAreas = Array.isArray(value.weakAreas)
    ? value.weakAreas.filter((id): id is AreaId => isAreaId(typeof id === 'string' ? id : ''))
    : []
  return {
    id: value.id,
    at: value.at,
    level: value.level,
    areas,
    total,
    correct,
    percent: examPercent(correct, total),
    byArea,
    weakAreas,
  }
}

export function sanitizeExamLog(value: unknown): ExamLog {
  if (!isRecord(value) || !Array.isArray(value.entries)) return emptyExamLog()
  return {
    version: 1,
    entries: value.entries.flatMap((entry) => {
      const clean = sanitizeEntry(entry)
      return clean ? [clean] : []
    }).slice(0, EXAM_LIMIT),
  }
}

export function loadExams(storage: Storage | undefined): ExamLog {
  if (!storage) return emptyExamLog()
  try {
    const raw = storage.getItem(EXAM_STORAGE_KEY)
    if (!raw) return emptyExamLog()
    return sanitizeExamLog(JSON.parse(raw) as unknown)
  } catch {
    return emptyExamLog()
  }
}

export function saveExams(storage: Storage | undefined, log: ExamLog): void {
  storage?.setItem(EXAM_STORAGE_KEY, JSON.stringify(log))
}

export function withExam(log: ExamLog, entry: ExamEntry): ExamLog {
  return { version: 1, entries: [entry, ...log.entries].slice(0, EXAM_LIMIT) }
}

export function summarizeExam(input: {
  level: ExamLevel
  areas: readonly AreaId[]
  results: readonly { area: AreaId; correct: boolean }[]
  at?: string
  id?: string
}): ExamEntry {
  const byArea: ExamEntry['byArea'] = {}
  for (const item of input.results) {
    const score = byArea[item.area] ?? { total: 0, correct: 0 }
    score.total += 1
    if (item.correct) score.correct += 1
    byArea[item.area] = score
  }
  const correct = input.results.filter((item) => item.correct).length
  const weakAreas = AREA_IDS.filter((id) => {
    const score = byArea[id]
    return Boolean(score && score.correct < score.total)
  })
  return {
    id: input.id ?? `exam-${Date.now()}`,
    at: input.at ?? new Date().toISOString(),
    level: input.level,
    areas: [...input.areas],
    total: input.results.length,
    correct,
    percent: examPercent(correct, input.results.length),
    byArea,
    weakAreas,
  }
}
