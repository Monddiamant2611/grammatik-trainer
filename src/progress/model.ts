import { AREA_IDS, type AreaId, type TrainingArea } from '../domain/areas'
import type { Task } from '../engine/types'

export interface Outcome {
  taskId: string
  label: string
  correct: boolean
}

export interface AreaRecord {
  foundationStep: number
  foundationsDone: boolean
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
  version: 1
  areas: Record<AreaId, AreaRecord>
  session: SessionRecord | null
}

export const STORAGE_KEY = 'grammatik-trainer-progress-v1'
const RECENT_LIMIT = 40

export function emptyArea(): AreaRecord {
  return {
    foundationStep: 0,
    foundationsDone: false,
    attempted: 0,
    correct: 0,
    recent: [],
    lastLabel: '',
  }
}

export function emptyProgress(): ProgressState {
  return {
    version: 1,
    areas: Object.fromEntries(AREA_IDS.map((id) => [id, emptyArea()])) as Record<AreaId, AreaRecord>,
    session: null,
  }
}

export function isAreaStarted(record: AreaRecord): boolean {
  return record.foundationsDone || record.foundationStep > 0 || record.attempted > 0
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
  return {
    foundationStep: Math.max(0, Math.floor(typeof value.foundationStep === 'number' ? value.foundationStep : 0)),
    foundationsDone: value.foundationsDone === true,
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
  return { version: 1, areas, session: sanitizeSession(value.session) }
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

export function withFoundation(state: ProgressState, area: AreaId, step: number, done: boolean): ProgressState {
  const current = state.areas[area]
  return {
    ...state,
    areas: {
      ...state.areas,
      [area]: {
        ...current,
        foundationStep: Math.max(current.foundationStep, step),
        foundationsDone: current.foundationsDone || done,
      },
    },
  }
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
