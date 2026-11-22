import { AREA_IDS, type AreaId, type TrainingArea } from '../domain/areas'
import type { Task } from '../engine/types'

export interface Outcome {
  taskId: string
  label: string
  correct: boolean
}

export interface AreaRecord {
  /** @deprecated prefer tutorialStep; kept for migration */
  foundationStep: number
  /** @deprecated prefer tutorialCompleted; kept for migration */
  foundationsDone: boolean
  tutorialStep: number
  tutorialCompleted: boolean
  attempted: number
  correct: number
  recent: Outcome[]
  lastLabel: string
}

export interface SessionRecord {
  area: TrainingArea
  taskIds: string[]
  index: number
  roundCorrect: number
  answered: boolean
}

export interface ProgressState {
  version: 2
  areas: Record<AreaId, AreaRecord>
  session: SessionRecord | null
}

export interface HistoryState {
  version: 1
  byArea: Record<string, string[]>
}

export const STORAGE_KEY = 'grammatik-trainer-progress-v1'
export const HISTORY_KEY = 'grammatik-trainer-history-v1'
const RECENT_LIMIT = 40
const HISTORY_LIMIT = 800

export function emptyArea(): AreaRecord {
  return {
    foundationStep: 0,
    foundationsDone: false,
    tutorialStep: 0,
    tutorialCompleted: false,
    attempted: 0,
    correct: 0,
    recent: [],
    lastLabel: '',
  }
}

export function emptyProgress(): ProgressState {
  return {
    version: 2,
    areas: Object.fromEntries(AREA_IDS.map((id) => [id, emptyArea()])) as Record<AreaId, AreaRecord>,
    session: null,
  }
}

export function emptyHistory(): HistoryState {
  return { version: 1, byArea: {} }
}

export function isAreaStarted(record: AreaRecord): boolean {
  return record.tutorialCompleted || record.tutorialStep > 0 || record.attempted > 0
}

export function uncertainLabels(recent: readonly Outcome[]): string[] {
  const groups = new Map<string, { correct: number; total: number }>()
  for (const item of recent) {
    const group = groups.get(item.label) ?? { correct: 0, total: 0 }
    group.total += 1
    if (item.correct) group.correct += 1
    groups.set(item.label, group)
  }
  return [...groups.entries()]
    .filter(([, group]) => group.total >= 3 && group.correct / group.total < 0.6)
    .map(([label]) => label)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function sanitizeArea(value: unknown): AreaRecord {
  const base = emptyArea()
  if (!isRecord(value)) return base
  const recent = Array.isArray(value.recent) ? value.recent : []
  const foundationStep = Math.max(0, Math.floor(typeof value.foundationStep === 'number' ? value.foundationStep : 0))
  const foundationsDone = value.foundationsDone === true
  const tutorialStep = Math.max(
    foundationStep,
    Math.max(0, Math.floor(typeof value.tutorialStep === 'number' ? value.tutorialStep : 0)),
  )
  const tutorialCompleted = value.tutorialCompleted === true || foundationsDone
  return {
    foundationStep: tutorialStep,
    foundationsDone: tutorialCompleted,
    tutorialStep,
    tutorialCompleted,
    attempted: Math.max(0, Math.floor(typeof value.attempted === 'number' ? value.attempted : 0)),
    correct: Math.max(0, Math.floor(typeof value.correct === 'number' ? value.correct : 0)),
    lastLabel: typeof value.lastLabel === 'string' ? value.lastLabel : '',
    recent: recent.flatMap((item) => {
      if (!isRecord(item) || typeof item.taskId !== 'string' || typeof item.label !== 'string') return []
      return [{ taskId: item.taskId, label: item.label, correct: item.correct === true }]
    }).slice(-RECENT_LIMIT),
  }
}

export function sanitizeProgress(value: unknown): ProgressState {
  const empty = emptyProgress()
  if (!isRecord(value) || !isRecord(value.areas)) return empty
  const areas = { ...empty.areas }
  for (const id of AREA_IDS) areas[id] = sanitizeArea(value.areas[id])
  return { version: 2, areas, session: sanitizeSession(value.session) }
}

function sanitizeSession(value: unknown): SessionRecord | null {
  if (!isRecord(value) || typeof value.area !== 'string' || !Array.isArray(value.taskIds)) return null
  const taskIds = value.taskIds.filter((item): item is string => typeof item === 'string' && item.length > 0)
  if (taskIds.length === 0) return null
  const index = Math.max(0, Math.min(taskIds.length - 1, Math.floor(typeof value.index === 'number' ? value.index : 0)))
  return {
    area: value.area as TrainingArea,
    taskIds,
    index,
    roundCorrect: Math.max(0, Math.floor(typeof value.roundCorrect === 'number' ? value.roundCorrect : 0)),
    answered: value.answered === true,
  }
}

export function loadProgress(storage: Storage | undefined): ProgressState {
  if (!storage) return emptyProgress()
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress()
    return sanitizeProgress(JSON.parse(raw) as unknown)
  } catch {
    return emptyProgress()
  }
}

export function saveProgress(storage: Storage | undefined, state: ProgressState): void {
  storage?.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function sanitizeHistory(value: unknown): HistoryState {
  const empty = emptyHistory()
  if (!isRecord(value) || !isRecord(value.byArea)) return empty
  const byArea: Record<string, string[]> = {}
  for (const [key, list] of Object.entries(value.byArea)) {
    if (!Array.isArray(list)) continue
    byArea[key] = list.filter((item): item is string => typeof item === 'string' && item.length > 0).slice(-HISTORY_LIMIT)
  }
  return { version: 1, byArea }
}

export function loadHistory(storage: Storage | undefined): HistoryState {
  if (!storage) return emptyHistory()
  try {
    const raw = storage.getItem(HISTORY_KEY)
    if (!raw) return emptyHistory()
    return sanitizeHistory(JSON.parse(raw) as unknown)
  } catch {
    return emptyHistory()
  }
}

export function saveHistory(storage: Storage | undefined, state: HistoryState): void {
  storage?.setItem(HISTORY_KEY, JSON.stringify(state))
}

export function historyFor(state: HistoryState, area: TrainingArea): string[] {
  return state.byArea[area] ?? []
}

export function withHistory(state: HistoryState, area: TrainingArea, taskIds: readonly string[]): HistoryState {
  const previous = state.byArea[area] ?? []
  const merged = [...previous]
  for (const id of taskIds) {
    const existing = merged.indexOf(id)
    if (existing >= 0) merged.splice(existing, 1)
    merged.push(id)
  }
  return {
    version: 1,
    byArea: {
      ...state.byArea,
      [area]: merged.slice(-HISTORY_LIMIT),
    },
  }
}

export function withTutorial(state: ProgressState, area: AreaId, step: number, done: boolean): ProgressState {
  const current = state.areas[area]
  const tutorialStep = Math.max(current.tutorialStep, step)
  const tutorialCompleted = current.tutorialCompleted || done
  return {
    ...state,
    areas: {
      ...state.areas,
      [area]: {
        ...current,
        foundationStep: tutorialStep,
        foundationsDone: tutorialCompleted,
        tutorialStep,
        tutorialCompleted,
      },
    },
  }
}

/** @deprecated use withTutorial */
export function withFoundation(state: ProgressState, area: AreaId, step: number, done: boolean): ProgressState {
  return withTutorial(state, area, step, done)
}

export function withAnswer(state: ProgressState, task: Task, correct: boolean): ProgressState {
  const current = state.areas[task.area]
  const session = state.session
  const already = session?.taskIds[session.index] === task.id && session.answered
  if (already) return state
  const nextArea: AreaRecord = {
    ...current,
    attempted: current.attempted + 1,
    correct: current.correct + (correct ? 1 : 0),
    lastLabel: task.typeLabel,
    recent: [...current.recent, { taskId: task.id, label: task.typeLabel, correct }].slice(-RECENT_LIMIT),
  }
  const nextSession = session && session.taskIds[session.index] === task.id
    ? { ...session, answered: true, roundCorrect: session.roundCorrect + (correct ? 1 : 0) }
    : session
  return { ...state, areas: { ...state.areas, [task.area]: nextArea }, session: nextSession }
}

export function withSession(state: ProgressState, session: SessionRecord | null): ProgressState {
  if (sameSession(state.session, session)) return state
  return { ...state, session }
}

function sameSession(left: SessionRecord | null, right: SessionRecord | null): boolean {
  if (left === right) return true
  if (!left || !right) return false
  return left.area === right.area
    && left.index === right.index
    && left.roundCorrect === right.roundCorrect
    && left.answered === right.answered
    && left.taskIds.length === right.taskIds.length
    && left.taskIds.every((id, index) => id === right.taskIds[index])
}
