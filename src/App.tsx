import { useState } from 'react'
import { ClipboardList, FileCheck, Home, Library, Menu, X } from 'lucide-react'
import { areaById, type AreaId, type TrainingArea } from './domain/areas'
import { FoundationsFlow } from './components/foundations/FoundationsFlow'
import { HomePage } from './components/HomePage'
import { ProgressPage } from './components/ProgressPage'
import { ExamFlow } from './components/exam/ExamFlow'
import { canTrain, TrainingSession } from './components/trainer/TrainingSession'
import { useProgress } from './progress/ProgressContext'
import './App.css'

type Screen =
  | { name: 'home' }
  | { name: 'progress' }
  | { name: 'foundations'; area: AreaId }
  | { name: 'training'; area: TrainingArea }
  | { name: 'exam' }

export default function App() {
  const progress = useProgress()
  const [screen, setScreen] = useState<Screen>({ name: 'home' })
  const [menuOpen, setMenuOpen] = useState(false)
  const [pending, setPending] = useState<TrainingArea | null>(null)

  const goHome = () => {
    setScreen({ name: 'home' })
    setMenuOpen(false)
  }

  const openExam = () => {
    setScreen({ name: 'exam' })
    setMenuOpen(false)
  }

  const openTutorial = (area: AreaId) => {
    setScreen({ name: 'foundations', area })
    setMenuOpen(false)
  }

  const startTraining = (area: TrainingArea) => {
    setScreen({ name: 'training', area })
    setMenuOpen(false)
  }

  const requestTrain = (area: TrainingArea) => {
    if (!canTrain(area, progress.state.areas)) return
    const current = progress.state.session
    if (current && current.area !== area) {
      setPending(area)
      return
    }
    startTraining(area)
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#inhalt">Zum Inhalt</a>
      <button type="button" className="mobile-menu" aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
        {menuOpen ? <X /> : <Menu />}
      </button>
      {menuOpen && <button type="button" className="menu-backdrop" aria-label="Menü schließen" onClick={() => setMenuOpen(false)} />}
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <button type="button" className="brand" onClick={goHome}>
          <span className="brand-mark"><Library size={22} /></span>
          <span>
            <strong>Grammatik</strong>
            <small>Trainer Klasse 5/6</small>
          </span>
        </button>
        <nav aria-label="Hauptbereiche">
          <button type="button" className={screen.name === 'home' ? 'active' : ''} onClick={goHome}>
            <Home size={18} /> Start
          </button>
          <button type="button" className={screen.name === 'progress' ? 'active' : ''} onClick={() => { setScreen({ name: 'progress' }); setMenuOpen(false) }}>
            <ClipboardList size={18} /> Fortschritt
          </button>
          <button type="button" className={screen.name === 'exam' ? 'active' : ''} onClick={openExam}>
            <FileCheck size={18} /> Prüfung
          </button>
        </nav>
      </aside>
      <main id="inhalt" className="content-shell">
        {screen.name === 'home' && <HomePage onLearn={openTutorial} onTrain={requestTrain} onExam={openExam} />}
        {screen.name === 'progress' && <ProgressPage />}
        {screen.name === 'foundations' && (
          <FoundationsFlow
            area={screen.area}
            onExit={goHome}
            onTrain={(area) => startTraining(area)}
          />
        )}
        {screen.name === 'training' && <TrainingSession key={screen.area} area={screen.area} onExit={goHome} />}
        {screen.name === 'exam' && <ExamFlow onExit={goHome} />}
      </main>
      {pending && (
        <div className="dialog-backdrop">
          <div className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="runde-titel">
            <h2 id="runde-titel">Laufende Runde beenden?</h2>
            <p>Du übst gerade {pendingLabel(progress.state.session?.area)}. Die schon geprüften Aufgaben bleiben gespeichert.</p>
            <div className="dialog-actions">
              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  progress.replaceSession(null)
                  setScreen({ name: 'training', area: pending })
                  setPending(null)
                  setMenuOpen(false)
                }}
              >
                Neue Runde starten
              </button>
              <button type="button" className="secondary-button" onClick={() => setPending(null)}>Zurück</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function pendingLabel(area: TrainingArea | undefined): string {
  if (!area) return 'eine andere Runde'
  if (area === 'mixed') return 'Gemischtes Training'
  return areaById(area).title
}
