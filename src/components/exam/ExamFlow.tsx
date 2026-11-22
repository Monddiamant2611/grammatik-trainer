import { useState } from 'react'
import { AREA_IDS, areaById, type AreaId } from '../../domain/areas'
import { describeAnswer, describeSolution } from '../../engine/answer-text'
import { isComplete, isCorrect, initialAnswer } from '../../engine/check'
import {
  buildExam,
  buildPracticeRound,
  DEFAULT_EXAM_LENGTH,
  EXAM_LENGTHS,
  EXAM_LEVELS,
  EXAM_LEVEL_COPY,
  examRating,
  type ExamLength,
  type ExamLevel,
} from '../../engine/exam'
import { mulberry32 } from '../../engine/random'
import type { Answer, Task } from '../../engine/types'
import {
  loadExams,
  saveExams,
  summarizeExam,
  withExam,
  type ExamEntry,
  type ExamLog,
} from '../../progress/exams'
import { historyFor } from '../../progress/model'
import { useProgress } from '../../progress/ProgressContext'
import { TaskInteraction } from '../interactions/TaskInteraction'

const AREA_LABEL: Record<AreaId, string> = {
  nouns: 'Substantive (Nomen)',
  cases: 'Artikel & Fälle',
  adjectives: 'Adjektive',
  verbs: 'Verben',
  tenses: 'Zeitformen',
  voice: 'Aktiv & Passiv',
  capitalization: 'Groß- & Kleinschreibung',
  spelling: 'Rechtschreibung',
}

type Phase = 'setup' | 'run' | 'result' | 'review' | 'practice'

interface Attempt {
  task: Task
  answer: Answer
  correct: boolean
}

export function ExamFlow({ onExit }: { onExit: () => void }) {
  const progress = useProgress()
  const [log, setLog] = useState<ExamLog>(() => loadExams(storageOf()))
  const [phase, setPhase] = useState<Phase>('setup')
  const [level, setLevel] = useState<ExamLevel>('mittel')
  const [length, setLength] = useState<ExamLength>(DEFAULT_EXAM_LENGTH)
  const [areas, setAreas] = useState<AreaId[]>([...AREA_IDS])
  const [tasks, setTasks] = useState<Task[]>([])
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState<Answer | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [entry, setEntry] = useState<ExamEntry | null>(null)
  const [practiceTasks, setPracticeTasks] = useState<Task[]>([])
  const [practiceIndex, setPracticeIndex] = useState(0)
  const [practiceDone, setPracticeDone] = useState(false)
  const [cancel, setCancel] = useState(false)

  const remember = (next: ExamLog) => {
    setLog(next)
    saveExams(storageOf(), next)
  }

  const startExam = () => {
    if (areas.length === 0) return
    const round = buildExam({
      areas,
      level,
      count: length,
      rng: mulberry32(Date.now() % 100000),
    })
    const first = round[0]
    setTasks(round)
    setIndex(0)
    setAnswer(first ? initialAnswer(first) : null)
    setConfirmed(false)
    setAttempts([])
    setEntry(null)
    setPhase('run')
  }

  const confirmAnswer = () => {
    const task = tasks[index]
    if (!task || confirmed || !answer || !isComplete(task, answer)) return
    setAttempts((current) => [...current, { task, answer, correct: isCorrect(task, answer) }])
    setConfirmed(true)
  }

  const nextTask = () => {
    const last = index + 1 >= tasks.length
    if (last) {
      const summary = summarizeExam({
        level,
        areas,
        results: attempts.map((item) => ({ area: item.task.area, correct: item.correct })),
      })
      setEntry(summary)
      remember(withExam(log, summary))
      setPhase('result')
      return
    }
    const following = tasks[index + 1]
    setIndex(index + 1)
    setAnswer(following ? initialAnswer(following) : null)
    setConfirmed(false)
  }

  const startPractice = () => {
    const focus = entry && entry.weakAreas.length > 0 ? entry.weakAreas : areas
    const recent = focus.flatMap((id) => historyFor(progress.history, id))
    const round = buildPracticeRound(focus, recent, mulberry32(Date.now() % 100000))
    for (const id of focus) {
      progress.rememberRound(id, round.filter((task) => task.area === id).map((task) => task.id))
    }
    setPracticeTasks(round)
    setPracticeIndex(0)
    setPracticeDone(round.length === 0)
    setPhase('practice')
  }

  if (phase === 'setup') {
    return (
      <ExamSetup
        level={level}
        length={length}
        areas={areas}
        log={log}
        onLevel={setLevel}
        onLength={setLength}
        onAreas={setAreas}
        onStart={startExam}
        onExit={onExit}
      />
    )
  }

  if (phase === 'run') {
    const task = tasks[index]
    if (!task) return <ExamSetup level={level} length={length} areas={areas} log={log} onLevel={setLevel} onLength={setLength} onAreas={setAreas} onStart={startExam} onExit={onExit} />
    return (
      <>
        <ExamTask
          key={task.id}
          task={task}
          index={index}
          total={tasks.length}
          answer={answer}
          confirmed={confirmed}
          onChange={setAnswer}
          onConfirm={confirmAnswer}
          onNext={nextTask}
          onCancel={() => setCancel(true)}
        />
        {cancel && (
          <div className="dialog-backdrop">
            <div className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="pruefung-abbrechen">
              <h2 id="pruefung-abbrechen">Prüfung abbrechen?</h2>
              <p>Es wird nichts gespeichert. Der Trainingsstand bleibt unverändert.</p>
              <div className="dialog-actions">
                <button type="button" className="primary-button" onClick={onExit}>Prüfung verlassen</button>
                <button type="button" className="secondary-button" onClick={() => setCancel(false)}>Weiterprüfen</button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  if (phase === 'review' && entry) {
    const misses = attempts.filter((item) => !item.correct)
    return (
      <section className="content-task">
        <header className="task-header">
          <div>
            <span className="eyebrow">Fehleranalyse</span>
            <h1>{misses.length === 0 ? 'Keine Fehler in dieser Prüfung' : `${misses.length} Aufgaben ansehen`}</h1>
          </div>
        </header>
        {misses.length === 0 && <p>Alle Aufgaben waren richtig. Eine Erklärung ist deshalb nicht nötig.</p>}
        <div className="review-list">
          {misses.map((item) => (
            <article key={item.task.id} className="learning-card">
              <span className="eyebrow">{AREA_LABEL[item.task.area]}</span>
              <h2>{item.task.typeLabel}</h2>
              <p className="prompt">{item.task.prompt}</p>
              {item.task.stimulus && <p className="stimulus">{item.task.stimulus}</p>}
              <p><strong>Deine Antwort:</strong> {describeAnswer(item.task, item.answer)}</p>
              <p><strong>Richtige Antwort:</strong> {describeSolution(item.task)}</p>
              <p>{item.task.feedbackIncorrect}</p>
            </article>
          ))}
        </div>
        <div className="exercise-actions">
          <button type="button" className="primary-button" onClick={() => setPhase('result')}>Zur Auswertung</button>
        </div>
      </section>
    )
  }

  if (phase === 'practice') {
    return (
      <PracticeRound
        tasks={practiceTasks}
        index={practiceIndex}
        done={practiceDone}
        onChecked={(task, correct) => progress.recordAnswer(task, correct)}
        onNext={() => {
          if (practiceIndex + 1 >= practiceTasks.length) {
            setPracticeDone(true)
            return
          }
          setPracticeIndex(practiceIndex + 1)
        }}
        onExit={onExit}
      />
    )
  }

  if (!entry) return null
  return (
    <ExamResult
      entry={entry}
      onReview={() => setPhase('review')}
      onPractice={startPractice}
      onAgain={() => setPhase('setup')}
      onExit={onExit}
    />
  )
}

function ExamSetup({
  level,
  length,
  areas,
  log,
  onLevel,
  onLength,
  onAreas,
  onStart,
  onExit,
}: {
  level: ExamLevel
  length: ExamLength
  areas: readonly AreaId[]
  log: ExamLog
  onLevel: (level: ExamLevel) => void
  onLength: (length: ExamLength) => void
  onAreas: (areas: AreaId[]) => void
  onStart: () => void
  onExit: () => void
}) {
  const allOn = areas.length === AREA_IDS.length
  return (
    <section className="home-page exam-setup">
      <header className="page-header">
        <span className="eyebrow">Prüfungsmodus</span>
        <h1>Wähle deine Prüfung.</h1>
        <p>Teste dein Wissen ohne Hilfen.</p>
      </header>
      <div className="exam-levels">
        {EXAM_LEVELS.map((id) => {
          const copy = EXAM_LEVEL_COPY[id]
          return (
            <button
              key={id}
              type="button"
              className={`exam-level ${level === id ? 'selected' : ''}`}
              aria-pressed={level === id}
              onClick={() => onLevel(id)}
            >
              <strong>{copy.title}</strong>
              <span>{copy.lead}</span>
              <small>geeignet für: {copy.fit}</small>
              <small>Schwerpunkte: {copy.focus}</small>
            </button>
          )
        })}
      </div>
      <fieldset className="exam-fieldset">
        <legend>Lernbereiche</legend>
        <label className="exam-check">
          <input
            type="checkbox"
            checked={allOn}
            onChange={() => onAreas(allOn ? [] : [...AREA_IDS])}
          />
          Alle Lernbereiche
        </label>
        <div className="exam-area-grid">
          {AREA_IDS.map((id) => (
            <label key={id} className="exam-check">
              <input
                type="checkbox"
                checked={areas.includes(id)}
                onChange={() => {
                  const next = areas.includes(id) ? areas.filter((item) => item !== id) : [...areas, id]
                  onAreas(AREA_IDS.filter((item) => next.includes(item)))
                }}
              />
              {AREA_LABEL[id]}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="exam-fieldset">
        <legend>Anzahl der Aufgaben</legend>
        <div className="exam-lengths">
          {EXAM_LENGTHS.map((count) => (
            <label key={count} className={`exam-check ${length === count ? 'selected' : ''}`}>
              <input type="radio" name="exam-length" checked={length === count} onChange={() => onLength(count)} />
              {count} Aufgaben
            </label>
          ))}
        </div>
      </fieldset>
      <div className="exercise-actions">
        <button type="button" className="primary-button" disabled={areas.length === 0} onClick={onStart}>Prüfung beginnen</button>
        <button type="button" className="secondary-button" onClick={onExit}>Zur Startseite</button>
      </div>
      {log.entries.length > 0 && (
        <section className="exam-history">
          <h2>Bisherige Prüfungen</h2>
          <ul>
            {log.entries.map((item) => (
              <li key={item.id}>
                <span>{formatDate(item.at)}</span>
                <span>{EXAM_LEVEL_COPY[item.level].title}</span>
                <span>{item.correct}/{item.total}</span>
                <span>{item.percent} %</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  )
}

function ExamTask({
  task,
  index,
  total,
  answer,
  confirmed,
  onChange,
  onConfirm,
  onNext,
  onCancel,
}: {
  task: Task
  index: number
  total: number
  answer: Answer | null
  confirmed: boolean
  onChange: (answer: Answer) => void
  onConfirm: () => void
  onNext: () => void
  onCancel: () => void
}) {
  const position = index + (confirmed ? 1 : 0)
  return (
    <section className="content-task">
      <header className="task-header">
        <div>
          <span className="eyebrow">{AREA_LABEL[task.area]}</span>
          <h1>{task.typeLabel}</h1>
        </div>
        <p className="step-line">Aufgabe {index + 1} von {total}</p>
      </header>
      <div className="progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={position} aria-label={`Aufgabe ${index + 1} von ${total}`}>
        <span style={{ width: `${(position / total) * 100}%` }} />
      </div>
      <article className="learning-card exercise-card">
        <p className="prompt">{task.prompt}</p>
        {task.stimulus && <p className="stimulus">{task.stimulus}</p>}
        <TaskInteraction task={task} answer={answer} locked={confirmed} tone="exam" onChange={onChange} />
        <div className="exercise-actions">
          {!confirmed && (
            <button type="button" className="primary-button" disabled={!isComplete(task, answer)} onClick={onConfirm}>
              Antwort bestätigen
            </button>
          )}
          {confirmed && <button type="button" className="primary-button" onClick={onNext}>Nächste Aufgabe</button>}
          <button type="button" className="ghost-button" onClick={onCancel}>Prüfung abbrechen</button>
        </div>
      </article>
    </section>
  )
}

function ExamResult({
  entry,
  onReview,
  onPractice,
  onAgain,
  onExit,
}: {
  entry: ExamEntry
  onReview: () => void
  onPractice: () => void
  onAgain: () => void
  onExit: () => void
}) {
  return (
    <section className="content-task">
      <header className="page-header">
        <span className="eyebrow">Auswertung · {EXAM_LEVEL_COPY[entry.level].title}</span>
        <h1>{entry.correct} von {entry.total} richtig</h1>
        <p className="exam-percent">{entry.percent} %</p>
        <p>{examRating(entry.percent)}</p>
      </header>
      <ul className="exam-breakdown">
        {AREA_IDS.filter((id) => entry.byArea[id]).map((id) => {
          const score = entry.byArea[id]
          if (!score) return null
          return <li key={id}>{AREA_LABEL[id]}: {score.correct}/{score.total}</li>
        })}
      </ul>
      <div className="exercise-actions">
        <button type="button" className="secondary-button" onClick={onReview}>Fehler ansehen</button>
        <button type="button" className="primary-button" onClick={onPractice}>Passend weiterüben</button>
        <button type="button" className="secondary-button" onClick={onAgain}>Neue Prüfung</button>
        <button type="button" className="ghost-button" onClick={onExit}>Zur Startseite</button>
      </div>
    </section>
  )
}

function PracticeRound({
  tasks,
  index,
  done,
  onChecked,
  onNext,
  onExit,
}: {
  tasks: readonly Task[]
  index: number
  done: boolean
  onChecked: (task: Task, correct: boolean) => void
  onNext: () => void
  onExit: () => void
}) {
  const task = tasks[index]
  const [answer, setAnswer] = useState<Answer | null>(() => (task ? initialAnswer(task) : null))
  const [checked, setChecked] = useState(false)
  if (done || !task) {
    return (
      <section className="content-task learning-card">
        <span className="eyebrow">Passend weiterüben</span>
        <h1>Übungsrunde beendet</h1>
        <p>Diese Runde zählt zum Training. Die Prüfung bleibt davon getrennt.</p>
        <div className="exercise-actions">
          <button type="button" className="primary-button" onClick={onExit}>Zur Startseite</button>
        </div>
      </section>
    )
  }
  const correct = checked && answer ? isCorrect(task, answer) : false
  return (
    <section className="content-task">
      <header className="task-header">
        <div>
          <span className="eyebrow">Passend weiterüben · {areaById(task.area).title}</span>
          <h1>{task.typeLabel}</h1>
        </div>
        <p className="step-line">Aufgabe {index + 1} von {tasks.length}</p>
      </header>
      <article key={task.id} className="learning-card exercise-card">
        <p className="prompt">{task.prompt}</p>
        {task.stimulus && <p className="stimulus">{task.stimulus}</p>}
        <TaskInteraction task={task} answer={answer} locked={checked} tone="training" onChange={setAnswer} />
        {checked && answer && <p className="feedback-status">{correct ? 'Das stimmt.' : 'Schau noch einmal hin.'}</p>}
        {checked && <p>{correct ? task.feedbackCorrect : task.feedbackIncorrect}</p>}
        <div className="exercise-actions">
          {!checked && (
            <button
              type="button"
              className="primary-button"
              disabled={!isComplete(task, answer)}
              onClick={() => {
                if (!answer || !isComplete(task, answer)) return
                setChecked(true)
                onChecked(task, isCorrect(task, answer))
              }}
            >
              Prüfen
            </button>
          )}
          {checked && (
            <button
              type="button"
              className="primary-button"
              onClick={() => {
                setChecked(false)
                const following = tasks[index + 1]
                setAnswer(following ? initialAnswer(following) : null)
                onNext()
              }}
            >
              Weiter
            </button>
          )}
          <button type="button" className="ghost-button" onClick={onExit}>Zur Startseite</button>
        </div>
      </article>
    </section>
  )
}

function storageOf(): Storage | undefined {
  return typeof window === 'undefined' ? undefined : window.localStorage
}

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('de-DE')
}
