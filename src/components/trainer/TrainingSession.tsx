import { useEffect, useMemo, useState } from 'react'
import { areaById, isAreaId, type AreaId, type TrainingArea } from '../../domain/areas'
import { isComplete, isCorrect, initialAnswer } from '../../engine/check'
import { preferredDifficulties } from '../../engine/difficulty'
import { allTasks, tasksFor } from '../../engine/generate'
import { mulberry32 } from '../../engine/random'
import { buildRound } from '../../engine/select'
import type { Answer, Task } from '../../engine/types'
import { historyFor, isAreaStarted, type HistoryState } from '../../progress/model'
import { useProgress } from '../../progress/ProgressContext'
import { FeedbackBanner } from '../feedback/FeedbackBanner'
import { MarkedStimulus } from '../MarkedStimulus'
import { PromptBlock } from '../PromptBlock'
import { TaskInteraction } from '../interactions/TaskInteraction'

export const AREA_LENGTH = 20
export const MIXED_LENGTH = 20

export function TrainingSession({ area, onExit }: { area: TrainingArea; onExit: () => void }) {
  const progress = useProgress()
  const existing = progress.state.session?.area === area ? progress.state.session : null
  const [created] = useState(() => existing ?? createSession(area, progress.state.areas, progress.history))
  const resumePastAnswer = Boolean(existing?.answered)
  const [index, setIndex] = useState(() => resumePastAnswer ? existing!.index + 1 : created.index)
  const [roundCorrect, setRoundCorrect] = useState(created.roundCorrect)
  const [answered, setAnswered] = useState(false)
  const [finished, setFinished] = useState(() => resumePastAnswer && created.index + 1 >= created.taskIds.length)
  const [remembered, setRemembered] = useState(Boolean(existing))
  const tasks = useMemo(() => resolveTasks(created.taskIds), [created.taskIds])
  const task = tasks[index]

  useEffect(() => {
    if (remembered || existing) return
    progress.rememberRound(area, created.taskIds)
    setRemembered(true)
  }, [area, created.taskIds, existing, progress, remembered])

  useEffect(() => {
    if (finished || index >= created.taskIds.length) return
    progress.replaceSession({
      area,
      taskIds: created.taskIds,
      index,
      roundCorrect,
      answered,
    })
  }, [answered, area, created.taskIds, finished, index, progress, roundCorrect])

  if (finished || !task) {
    return (
      <section className="content-task learning-card">
        <span className="eyebrow">Runde beendet</span>
        <h1>{roundCorrect} von {tasks.length} Aufgaben in dieser Runde</h1>
        <p>Der Übungsstand steigt mit der Menge der Aufgaben. Eine kurze Runde zeigt noch nicht, dass ein Bereich schon sicher sitzt.</p>
        <div className="exercise-actions">
          <button type="button" className="primary-button" onClick={onExit}>Zur Startseite</button>
        </div>
      </section>
    )
  }

  return (
    <TaskCard
      key={task.id}
      task={task}
      area={area}
      index={index}
      total={tasks.length}
      onExit={onExit}
      onChecked={(correct) => {
        if (answered) return
        progress.recordAnswer(task, correct)
        setAnswered(true)
        if (correct) setRoundCorrect((count) => count + 1)
      }}
      onNext={() => {
        const last = index + 1 >= tasks.length
        if (last) {
          progress.replaceSession(null)
          setFinished(true)
          return
        }
        setIndex(index + 1)
        setAnswered(false)
      }}
    />
  )
}

function TaskCard({
  task,
  area,
  index,
  total,
  onExit,
  onChecked,
  onNext,
}: {
  task: Task
  area: TrainingArea
  index: number
  total: number
  onExit: () => void
  onChecked: (correct: boolean) => void
  onNext: () => void
}) {
  const [answer, setAnswer] = useState<Answer | null>(() => initialAnswer(task))
  const [checked, setChecked] = useState(false)
  const correct = checked && answer ? isCorrect(task, answer) : false
  const title = area === 'mixed' ? `Gemischtes Training · ${areaById(task.area).title}` : areaById(area).title
  return (
    <section className="content-task">
      <header className="task-header">
        <div>
          <span className="eyebrow">{title}</span>
          <h1>{task.typeLabel}</h1>
        </div>
        <p className="step-line">Aufgabe {index + 1} von {total}</p>
      </header>
      <article className="learning-card exercise-card" data-task-id={task.id}>
        <PromptBlock text={task.prompt} help />
        {task.stimulus && <MarkedStimulus text={task.stimulus} target={task.target?.surface} />}
        <TaskInteraction task={task} answer={answer} locked={checked} tone="training" onChange={setAnswer} />
        {checked && answer && (
          <FeedbackBanner correct={correct} text={correct ? task.feedbackCorrect : task.feedbackIncorrect} />
        )}
        <div className="exercise-actions">
          {!checked && (
            <button
              type="button"
              className="primary-button"
              disabled={!isComplete(task, answer)}
              onClick={() => {
                if (!answer || !isComplete(task, answer)) return
                const ok = isCorrect(task, answer)
                setChecked(true)
                onChecked(ok)
              }}
            >
              Prüfen
            </button>
          )}
          {checked && <button type="button" className="primary-button" onClick={onNext}>Weiter</button>}
          <button type="button" className="ghost-button" onClick={onExit}>Pause</button>
        </div>
      </article>
    </section>
  )
}

export function createSession(
  area: TrainingArea,
  areas: ReturnType<typeof useProgress>['state']['areas'],
  history: HistoryState,
) {
  const started = (Object.keys(areas) as AreaId[]).filter((id) => isAreaStarted(areas[id]))
  const pool = area === 'mixed'
    ? allTasks().filter((task) => started.includes(task.area))
    : tasksFor(area)
  const correct = area === 'mixed'
    ? Math.max(0, ...started.map((id) => areas[id].correct))
    : areas[area].correct
  const recent = historyFor(history, area)
  const round = buildRound({
    pool,
    count: area === 'mixed' ? MIXED_LENGTH : AREA_LENGTH,
    recentIds: recent,
    preferred: new Set(preferredDifficulties(correct)),
    rng: mulberry32(Date.now() % 100000),
    varyArea: area === 'mixed',
  })
  return {
    area,
    taskIds: round.map((task) => task.id),
    index: 0,
    roundCorrect: 0,
    answered: false,
  }
}

function resolveTasks(ids: readonly string[]): Task[] {
  const byId = new Map(allTasks().map((task) => [task.id, task]))
  return ids.flatMap((id) => {
    const task = byId.get(id)
    return task ? [task] : []
  })
}

export function canTrain(area: TrainingArea, areas: ReturnType<typeof useProgress>['state']['areas']): boolean {
  if (area !== 'mixed') return isAreaId(area)
  return (Object.keys(areas) as AreaId[]).filter((id) => isAreaStarted(areas[id])).length >= 2
}
