import { AREAS, type AreaId, type TrainingArea } from '../domain/areas'
import { tutorialCount } from '../foundations/content'
import { isAreaStarted } from '../progress/model'
import { useProgress } from '../progress/ProgressContext'
import { canTrain } from './trainer/TrainingSession'

export function HomePage({
  onLearn,
  onTrain,
  onExam,
}: {
  onLearn: (area: AreaId) => void
  onTrain: (area: TrainingArea) => void
  onExam: () => void
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
          const tutorial = record.tutorialCompleted
            ? 'Tutorial abgeschlossen'
            : record.tutorialStep > 0
              ? `Tutorial: Schritt ${Math.min(record.tutorialStep + 1, tutorialCount(area.id))} von ${tutorialCount(area.id)}`
              : 'Tutorial: Noch nicht begonnen'
          const training = record.attempted === 0
            ? 'Training: Noch nicht begonnen'
            : `${record.attempted} Aufgaben trainiert`
          const resume = state.session?.area === area.id
          const highlightTutorial = !record.tutorialCompleted
          return (
            <article key={area.id} className={`area-card accent-${area.accent}`}>
              <span className="area-index">{area.order}</span>
              <div>
                <span className="eyebrow">Lernpfad</span>
                <h2>{area.title}</h2>
                <p>{area.description}</p>
                <p className="progress-copy">{tutorial}</p>
                <p className="progress-copy">{training}</p>
                <div className="card-actions">
                  <button type="button" className={highlightTutorial ? 'primary-button' : 'secondary-button'} onClick={() => onLearn(area.id)}>
                    {record.tutorialCompleted ? 'Tutorial wiederholen' : record.tutorialStep > 0 ? 'Tutorial fortsetzen' : 'Tutorial starten'}
                  </button>
                  <button type="button" className={highlightTutorial ? 'secondary-button' : 'primary-button'} onClick={() => onTrain(area.id)}>
                    {resume ? 'Weiterüben' : 'Gemischt üben'}
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
      <div className="mode-grid">
        <article className={`area-card mixed-card ${mixedOpen ? 'accent-clay' : 'is-waiting'}`}>
          <div>
            <span className="eyebrow">Training</span>
            <h2>Gemischtes Training</h2>
            <p>Aufgaben aus Bereichen, die du schon begonnen hast. Gleiche Aufgabentypen folgen höchstens zweimal hintereinander.</p>
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
        <article className="area-card exam-card accent-violet">
          <div>
            <span className="eyebrow">Prüfung</span>
            <h2>Prüfungsmodus</h2>
            <p>Teste dein Wissen unter Prüfungsbedingungen.</p>
            <p className="progress-copy">Ohne Hilfen, ohne sofortige Lösung. Die Auswertung folgt am Ende.</p>
            <div className="card-actions">
              <button type="button" className="primary-button" onClick={onExam}>Prüfung starten</button>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
