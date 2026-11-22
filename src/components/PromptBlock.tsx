import { useState } from 'react'
import { termsInPrompt } from '../domain/glossary'

export function PromptBlock({ text, help = false }: { text: string; help?: boolean }) {
  const entries = help ? termsInPrompt(text) : []
  const [open, setOpen] = useState(false)
  return (
    <div className="prompt-block">
      <div className="prompt-line">
        <p className="prompt">{text}</p>
        {entries.length > 0 && (
          <button
            type="button"
            className="term-help-button"
            aria-label="Begriffshilfe"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            ?
          </button>
        )}
      </div>
      {open && (
        <ul className="term-help">
          {entries.map((entry) => (
            <li key={entry.term}>
              <strong>{entry.term}</strong> {entry.definition} <span>Beispiel: {entry.example}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
