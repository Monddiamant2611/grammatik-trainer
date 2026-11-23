import { useMemo, useState } from 'react'
import { GLOSSARY } from '../domain/glossary'

export function GlossaryPage() {
  const [query, setQuery] = useState('')
  const needle = query.trim().toLocaleLowerCase('de')
  const entries = useMemo(
    () => GLOSSARY
      .filter((entry) => !needle || `${entry.term} ${entry.definition}`.toLocaleLowerCase('de').includes(needle))
      .slice()
      .sort((left, right) => left.term.localeCompare(right.term, 'de')),
    [needle],
  )
  return (
    <section className="content-task">
      <header className="task-header">
        <div>
          <span className="eyebrow">Nachschlagen</span>
          <h1>Glossar</h1>
        </div>
      </header>
      <p>Kurze Erklärungen zu den Fachbegriffen. Im Training öffnet das Fragezeichen dieselbe Hilfe. In der Prüfung gibt es sie nicht.</p>
      <label className="glossary-search">
        Begriff suchen
        <input value={query} onChange={(event) => setQuery(event.target.value)} />
      </label>
      <ul className="glossary-list">
        {entries.map((entry) => (
          <li key={entry.term}>
            <h2>{entry.term}</h2>
            <p>{entry.definition}</p>
            <p className="glossary-example">Beispiel: {entry.example}</p>
          </li>
        ))}
      </ul>
      {entries.length === 0 && <p>Kein Begriff passt zu dieser Suche.</p>}
    </section>
  )
}
