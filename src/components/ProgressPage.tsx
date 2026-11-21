import { AREAS } from '../domain/areas'
import { practiceLabel, practiceLevel } from '../engine/difficulty'
import { foundationCount } from '../foundations/content'
import { uncertainLabels } from '../progress/model'
import { useProgress } from '../progress/ProgressContext'

export function ProgressPage() {
  const { state } = useProgress()
  return (
    <section className="home-page">
      <header className="page-header">
        <span className="eyebrow">Lokal auf diesem Gerät</span>
        <h1>Fortschritt</h1>
        <p>Grundlagen zählen nicht als Leistung. Der Übungsstand steigt erst mit mehr richtigen Aufgaben.</p>
      </header>
      <div className="progress-list">
        {AREAS.map((area) => {
          const record = state.areas[area.id]
          const level = practiceLevel(record.attempted, record.correct)
          const unsure = uncertainLabels(record.recent)
          return (
            <article key={area.id} className={`area-card accent-${area.accent}`}>
              <div>
                <span className="eyebrow">Lernbereich</span>
                <h2>{area.title}</h2>
                <p className="progress-copy">
                  {record.foundationsDone ? 'Grundlagen angesehen' : `Grundlagen: Schritt ${Math.min(record.foundationStep + 1, foundationCount(area.id))} von ${foundationCount(area.id)}`}
                </p>
                <p className="progress-copy">
                  {record.attempted === 0
                    ? 'Noch keine Trainingsaufgabe'
                    : `${practiceLabel(level, record.attempted)} · ${level} % Übungsstand · ${record.correct} von ${record.attempted} richtig`}
                </p>
                {record.attempted > 0 && (
                  <div className="progress-bar" role="meter" aria-label={`Übungsstand ${area.title}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={level}>
                    <span style={{ width: `${level}%` }} />
                  </div>
                )}
                {record.lastLabel && <p className="muted-note">Zuletzt trainiert: {record.lastLabel}</p>}
                {unsure.length > 0 && <p className="muted-note">Noch unsicher: {unsure.join(', ')}</p>}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
