import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { AreaId } from '../domain/areas'
import type { Task } from '../engine/types'
import {
  loadProgress,
  saveProgress,
  withAnswer,
  withFoundation,
  withSession,
  type ProgressState,
  type SessionRecord,
} from './model'

interface ProgressApi {
  state: ProgressState
  saveFoundation: (area: AreaId, step: number, done: boolean) => void
  recordAnswer: (task: Task, correct: boolean) => void
  replaceSession: (session: SessionRecord | null) => void
}

const ProgressContext = createContext<ProgressApi | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => loadProgress(typeof window === 'undefined' ? undefined : window.localStorage))

  useEffect(() => {
    saveProgress(window.localStorage, state)
  }, [state])

  const api = useMemo<ProgressApi>(() => ({
    state,
    saveFoundation: (area, step, done) => setState((current) => withFoundation(current, area, step, done)),
    recordAnswer: (task, correct) => setState((current) => withAnswer(current, task, correct)),
    replaceSession: (session) => setState((current) => withSession(current, session)),
  }), [state])

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>
}

export function useProgress(): ProgressApi {
  const value = useContext(ProgressContext)
  if (!value) throw new Error('Fortschritt ist nicht verfügbar.')
  return value
}
