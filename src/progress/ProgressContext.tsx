import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { AreaId, TrainingArea } from '../domain/areas'
import type { Task } from '../engine/types'
import {
  loadHistory,
  loadProgress,
  saveHistory,
  saveProgress,
  withAnswer,
  withHistory,
  withSession,
  withTutorial,
  type HistoryState,
  type ProgressState,
  type SessionRecord,
} from './model'

interface ProgressApi {
  state: ProgressState
  history: HistoryState
  saveTutorial: (area: AreaId, step: number, done: boolean) => void
  /** @deprecated use saveTutorial */
  saveFoundation: (area: AreaId, step: number, done: boolean) => void
  recordAnswer: (task: Task, correct: boolean) => void
  replaceSession: (session: SessionRecord | null) => void
  rememberRound: (area: TrainingArea, taskIds: readonly string[]) => void
}

const ProgressContext = createContext<ProgressApi | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => loadProgress(typeof window === 'undefined' ? undefined : window.localStorage))
  const [history, setHistory] = useState<HistoryState>(() => loadHistory(typeof window === 'undefined' ? undefined : window.localStorage))

  useEffect(() => {
    saveProgress(window.localStorage, state)
  }, [state])

  useEffect(() => {
    saveHistory(window.localStorage, history)
  }, [history])

  const api = useMemo<ProgressApi>(() => ({
    state,
    history,
    saveTutorial: (area, step, done) => setState((current) => withTutorial(current, area, step, done)),
    saveFoundation: (area, step, done) => setState((current) => withTutorial(current, area, step, done)),
    recordAnswer: (task, correct) => setState((current) => withAnswer(current, task, correct)),
    replaceSession: (session) => setState((current) => withSession(current, session)),
    rememberRound: (area, taskIds) => setHistory((current) => withHistory(current, area, taskIds)),
  }), [history, state])

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>
}

export function useProgress(): ProgressApi {
  const value = useContext(ProgressContext)
  if (!value) throw new Error('Fortschritt ist nicht verfügbar.')
  return value
}
