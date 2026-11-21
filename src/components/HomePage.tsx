import { AREAS, type AreaId, type TrainingArea } from '../domain/areas'
import { practiceLabel, practiceLevel } from '../engine/difficulty'
import { foundationCount } from '../foundations/content'
import { isAreaStarted } from '../progress/model'
import { useProgress } from '../progress/ProgressContext'
import { canTrain } from './trainer/TrainingSession'

export function HomePage({
  onLearn,
  onTrain,
}: {
  onLearn: (area: AreaId) => void
  onTrain: (area: TrainingArea) => void
}) {
  const { state } = useProgress()
  const started = AREAS.filter((area) => isAreaStarted(state.areas[area.id])).length
  const mixedOpen = canTrain('mixed', state.areas)

  return (
    <section className="home-page">
      <header className="page-header">
        <span className="eyebrow">Klasse 5–6</span>
        <h1>Grammatik-Trainer</h1>
        <p>Lernen. Ausprobieren. Sicher anwenden.</p>
      </header>
      <div className="area-grid">
        {AREAS.map((area) => {
          const record = state.areas[area.id]
          const level = practiceLevel(record.attempted, record.correct)
          const foundation = record.foundationsDone
            ? 'Grundlagen angesehen'
            : record.foundationStep > 0
              ? `Grundlagen: Schritt ${Math.min(record.foundationStep + 1, foundationCount(area.id))} von ${foundationCount(area.id)}`
              : 'Grundlagen noch nicht begonnen'
          const training = record.attempted === 0
            ? 'Training noch offen'
            : `${practiceLabel(level, record.attempted)} · ${record.correct} von ${record.attempted} richtig`
          const resume = state.session?.area === area.id
          return (
            <article key={area.id} className={`area-card accent-${area.accent}`}>
              <span className="area-index">{area.order}</span>
              <div>
                <span className="eyebrow">Lernbereich</span>
                <h2>{area.title}</h2>
                <p>{area.description}</p>
                <p className="progress-copy">{foundation}</p>
                <p className="progress-copy">{training}</p>
                {record.attempted > 0 && (
                  <div className="progress-bar" role="meter" aria-label={`Übungsstand ${area.title}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={level}>
                    <span style={{ width: `${level}%` }} />
                  </div>
                )}
                {record.lastLabel && <p className="muted-note">Zuletzt: {record.lastLabel}</p>}
                <div className="card-actions">
                  <button type="button" className="secondary-button" onClick={() => onLearn(area.id)}>Lernen</button>
                  <button type="button" className="primary-button" onClick={() => onTrain(area.id)}>{resume ? 'Weiterüben' : 'Trainieren'}</button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
      <article className={`area-card mixed-card ${mixedOpen ? 'accent-clay' : 'is-waiting'}`}>
        <div>
          <span className="eyebrow">Über mehrere Bereiche</span>
          <h2>Gemischtes Training</h2>
          <p>Aufgaben aus Bereichen, die du schon begonnen hast. Gleiche Aufgabentypen folgen nicht direkt aufeinander.</p>
          <p className="progress-copy">
            {mixedOpen
              ? `${started} Bereiche begonnen`
              : 'Wird sinnvoll, wenn du mindestens zwei Bereiche kennengelernt oder trainiert hast.'}
          </p>
          <div className="card-actions">
            <button type="button" className="primary-button" disabled={!mixedOpen} onClick={() => onTrain('mixed')}>
              {state.session?.area === 'mixed' ? 'Weiterüben' : 'Gemischt trainieren'}
            </button>
          </div>
        </div>
      </article>
    </section>
  )
}
