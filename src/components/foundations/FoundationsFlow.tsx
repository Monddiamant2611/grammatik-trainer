import { useState } from 'react'
import { areaById, type AreaId } from '../../domain/areas'
import type { FoundationStep, FoundationTry } from '../../foundations/types'
import { foundationModule } from '../../foundations/content'
import { useProgress } from '../../progress/ProgressContext'
import { ChoiceList, ClassifyBoard, OrderBoard } from '../interactions/TaskInteraction'

export function FoundationsFlow({ area, onExit }: { area: AreaId; onExit: () => void }) {
  const progress = useProgress()
  const module = foundationModule(area)
  const saved = progress.state.areas[area]
  const initial = saved.foundationsDone ? 0 : Math.min(saved.foundationStep, module.steps.length - 1)
  const [index, setIndex] = useState(initial)
  const [finished, setFinished] = useState(false)
  const definition = areaById(area)
  const step = module.steps[index]

  const goNext = () => {
    const done = index + 1 >= module.steps.length
    progress.saveFoundation(area, done ? module.steps.length : index + 1, done)
    if (done) setFinished(true)
    else setIndex(index + 1)
  }

  if (!step || finished) {
    return (
      <section className="content-task learning-card foundations-done">
        <span className="eyebrow">Grundlagen</span>
        <h1>{definition.title}</h1>
        <p>Du hast die Grundlagen dieses Bereichs angesehen. Es gibt dafür keine Punkte. Im Training bekommst du Rückmeldung zu einzelnen Aufgaben.</p>
        <div className="exercise-actions">
          <button type="button" className="primary-button" onClick={onExit}>Zur Startseite</button>
          <button type="button" className="secondary-button" onClick={() => { setFinished(false); setIndex(0) }}>Noch einmal ansehen</button>
        </div>
      </section>
    )
  }

  return (
    <section className="content-task">
      <header className="page-header">
        <span className="eyebrow">{definition.title} · Grundlagen</span>
        <h1>{step.title}</h1>
        <p className="step-line">Schritt {index + 1} von {module.steps.length} · ohne Bewertung</p>
      </header>
      <article className="learning-card" key={step.id}>
        <StepBody step={step} onNext={goNext} onBack={index > 0 ? () => setIndex(index - 1) : undefined} />
      </article>
    </section>
  )
}

function StepBody({ step, onNext, onBack }: { step: FoundationStep; onNext: () => void; onBack?: () => void }) {
  const [insight, setInsight] = useState(false)
  const [matched, setMatched] = useState(false)

  return (
    <div className="foundation-step">
      <p className="prompt">{step.lead}</p>
      {step.examples && (
        <ul className="example-list">
          {step.examples.map((example) => <li key={example}>{example}</li>)}
        </ul>
      )}
      <TryBlock tryStep={step.try} seed={step.id} revealed={insight} onReveal={(ok) => { setMatched(ok); setInsight(true) }} />
      {insight && (
        <div className="insight-panel">
          <p>{matched ? 'Das passt zur Beobachtung.' : 'Hier lohnt sich ein zweiter Blick. Die Beobachtung zeigt, worauf es ankommt.'}</p>
          <h2>Beobachtung</h2>
          <p>{step.observation}</p>
          <h2>Erklärung</h2>
          <p>{step.explanation}</p>
          {step.merksatz && (
            <aside className="merke-card" aria-label="Merksatz">
              <p className="merke-label">Merke</p>
              <p className="merke-text">{step.merksatz}</p>
            </aside>
          )}
        </div>
      )}
      <div className="exercise-actions">
        {onBack && <button type="button" className="ghost-button" onClick={onBack}>Zurück</button>}
        <button type="button" className="primary-button" disabled={!insight} onClick={onNext}>Weiter</button>
      </div>
    </div>
  )
}

function TryBlock({
  tryStep,
  seed,
  revealed,
  onReveal,
}: {
  tryStep: FoundationTry
  seed: string
  revealed: boolean
  onReveal: (matched: boolean) => void
}) {
  if (tryStep.kind === 'choice') {
    return <ChoiceTry tryStep={tryStep} seed={seed} revealed={revealed} onReveal={onReveal} />
  }
  if (tryStep.kind === 'compare') {
    return <CompareTry tryStep={tryStep} seed={seed} revealed={revealed} onReveal={onReveal} />
  }
  if (tryStep.kind === 'series') {
    return <SeriesTry tryStep={tryStep} seed={seed} revealed={revealed} onReveal={onReveal} />
  }
  if (tryStep.kind === 'classify') {
    return <ClassifyTry tryStep={tryStep} revealed={revealed} onReveal={onReveal} />
  }
  return <OrderTry tryStep={tryStep} seed={seed} revealed={revealed} onReveal={onReveal} />
}

function ChoiceTry({
  tryStep,
  seed,
  revealed,
  onReveal,
}: {
  tryStep: Extract<FoundationTry, { kind: 'choice' }>
  seed: string
  revealed: boolean
  onReveal: (matched: boolean) => void
}) {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div className="try-block">
      <p className="prompt">{tryStep.prompt}</p>
      <ChoiceList
        options={tryStep.options}
        value={value}
        layout="stack"
        locked={revealed}
        tone="explore"
        seed={seed}
        onChange={(id) => {
          setValue(id)
          onReveal(id === tryStep.answerId)
        }}
      />
    </div>
  )
}

function CompareTry({
  tryStep,
  seed,
  revealed,
  onReveal,
}: {
  tryStep: Extract<FoundationTry, { kind: 'compare' }>
  seed: string
  revealed: boolean
  onReveal: (matched: boolean) => void
}) {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div className="try-block">
      <p className="prompt">{tryStep.prompt}</p>
      <ChoiceList
        options={[{ id: 'left', text: tryStep.left }, { id: 'right', text: tryStep.right }]}
        value={value}
        layout="pair"
        locked={revealed}
        tone="explore"
        seed={seed}
        onChange={(id) => {
          setValue(id)
          onReveal(id === tryStep.answer)
        }}
      />
    </div>
  )
}

function SeriesTry({
  tryStep,
  seed,
  revealed,
  onReveal,
}: {
  tryStep: Extract<FoundationTry, { kind: 'series' }>
  seed: string
  revealed: boolean
  onReveal: (matched: boolean) => void
}) {
  const [cursor, setCursor] = useState(0)
  const [value, setValue] = useState<string | null>(null)
  const [settle, setSettle] = useState<string | null>(null)
  const [matchedAll, setMatchedAll] = useState(true)
  const question = tryStep.questions[cursor]
  if (!question || revealed) return null
  return (
    <div className="try-block">
      <p className="stimulus">{question.stimulus}</p>
      <p className="prompt">{question.prompt}</p>
      <ChoiceList
        key={`${seed}-${cursor}`}
        options={question.options}
        value={value}
        layout="stack"
        locked={settle !== null}
        tone="explore"
        seed={`${seed}-${cursor}`}
        onChange={(id) => {
          setValue(id)
          setSettle(question.settle)
          if (id !== question.answerId) setMatchedAll(false)
        }}
      />
      {settle && <p className="settle-note">{settle}</p>}
      {settle && (
        <button
          type="button"
          className="secondary-button"
          onClick={() => {
            const last = cursor + 1 >= tryStep.questions.length
            if (last) onReveal(matchedAll && value === question.answerId)
            else {
              setCursor(cursor + 1)
              setValue(null)
              setSettle(null)
            }
          }}
        >
          {cursor + 1 >= tryStep.questions.length ? 'Zur Beobachtung' : 'Nächstes Wort'}
        </button>
      )}
    </div>
  )
}

function ClassifyTry({
  tryStep,
  revealed,
  onReveal,
}: {
  tryStep: Extract<FoundationTry, { kind: 'classify' }>
  revealed: boolean
  onReveal: (matched: boolean) => void
}) {
  const [map, setMap] = useState<Record<string, string>>({})
  const complete = tryStep.items.every((item) => map[item.id])
  const matched = tryStep.items.every((item) => map[item.id] === tryStep.solution[item.id])
  return (
    <div className="try-block">
      <p className="prompt">{tryStep.prompt}</p>
      <ClassifyBoard
        items={tryStep.items}
        buckets={tryStep.buckets.map((bucket) => ({ id: bucket.id, label: bucket.text }))}
        value={map}
        locked={revealed}
        tone="explore"
        onChange={setMap}
      />
      <button type="button" className="secondary-button" disabled={!complete || revealed} onClick={() => onReveal(matched)}>
        Beobachtung ansehen
      </button>
    </div>
  )
}

function OrderTry({
  tryStep,
  seed,
  revealed,
  onReveal,
}: {
  tryStep: Extract<FoundationTry, { kind: 'order' }>
  seed: string
  revealed: boolean
  onReveal: (matched: boolean) => void
}) {
  const [ids, setIds] = useState<string[]>([])
  const complete = ids.length === tryStep.correctIds.length
  const matched = tryStep.correctIds.every((id, index) => ids[index] === id)
  return (
    <div className="try-block">
      <p className="prompt">{tryStep.prompt}</p>
      <OrderBoard
        items={tryStep.items}
        value={ids}
        correctIds={tryStep.correctIds}
        locked={revealed}
        tone="explore"
        seed={seed}
        onChange={setIds}
      />
      <button type="button" className="secondary-button" disabled={!complete || revealed} onClick={() => onReveal(matched)}>
        Beobachtung ansehen
      </button>
    </div>
  )
}
