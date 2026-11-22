import { describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach } from 'vitest'
import { PromptBlock } from '../components/PromptBlock'
import { GLOSSARY, termsInPrompt } from '../domain/glossary'
import { allTasks } from '../engine/generate'
import { modules } from '../foundations/content'

afterEach(() => cleanup())

const REQUIRED = [
  'Substantiv', 'Nomen', 'Artikel', 'Genus', 'Numerus', 'Kasus', 'Nominativ', 'Genitiv', 'Dativ', 'Akkusativ',
  'Adjektiv', 'Komparation', 'Positiv', 'Komparativ', 'Superlativ', 'Verb', 'Infinitiv', 'Konjugation', 'Person',
  'Personalform', 'Partizip II', 'Hilfsverb', 'Tempus', 'Präsens', 'Präteritum', 'Perfekt', 'Plusquamperfekt',
  'Futur I', 'Futur II', 'Genus verbi', 'Aktiv', 'Passiv', 'Subjekt', 'Objekt', 'Vokal', 'Konsonant', 'Silbe', 'Konjunktion',
]

function tutorialText(): string {
  return JSON.stringify(modules)
}

describe('Fachbegriffe', () => {
  it('erklärt jeden verlangten Begriff im Glossar mit Definition und Beispiel', () => {
    for (const term of REQUIRED) {
      const entry = GLOSSARY.find((item) => item.term === term)
      expect(entry?.definition.length, term).toBeGreaterThan(8)
      expect(entry?.example.length).toBeGreaterThan(1)
    }
    const substantiv = GLOSSARY.find((item) => item.term === 'Substantiv')
    const nomen = GLOSSARY.find((item) => item.term === 'Nomen')
    expect(substantiv?.definition).toMatch(/Nomen/)
    expect(nomen?.definition).toMatch(/Substantiv/)
  })

  it('führt die zentralen Begriffe im Tutorial ein und verwendet sie im Training', () => {
    const tutorial = tutorialText()
    for (const term of ['Kasus', 'Numerus', 'Tempus', 'Komparation', 'Positiv', 'Komparativ', 'Superlativ', 'Konjugation', 'Infinitiv', 'Genus verbi', 'Substantiv', 'Nomen']) {
      expect(tutorial).toContain(term)
    }
    const nounCard = modules.find((module) => module.area === 'nouns')?.steps[0]?.concept
    expect(nounCard?.term).toBe('Substantiv')
    expect(nounCard?.also).toBe('Nomen')
    const prompts = allTasks().map((task) => `${task.typeLabel}\n${task.prompt}`).join('\n')
    for (const term of ['Kasus', 'Numerus', 'Tempus', 'Komparation', 'Positiv', 'Komparativ', 'Superlativ', 'Konjugation', 'Infinitiv', 'Genus verbi', 'Substantiv']) {
      expect(prompts).toContain(term)
    }
  })

  it('gibt leichten Aufgaben die Brücke und lässt sie bei schwierigen Aufgaben weg', () => {
    const cases = allTasks().filter((task) => task.type === 'case-identify')
    const easyCases = cases.filter((task) => task.difficulty === 1)
    const hardCases = cases.filter((task) => task.difficulty >= 2)
    expect(easyCases.length).toBeGreaterThan(0)
    expect(hardCases.length).toBeGreaterThan(0)
    expect(easyCases.every((task) => task.prompt.includes('Kasus (Fall)'))).toBe(true)
    expect(cases.filter((task) => task.difficulty >= 2).every((task) => task.prompt.includes('Kasus') && !task.prompt.includes('(Fall)'))).toBe(true)
    const voice = allTasks().filter((task) => task.type === 'voice-kind' && task.difficulty === 3)
    expect(voice.every((task) => task.prompt === 'Bestimme das Genus verbi.')).toBe(true)
    const easyVoice = allTasks().filter((task) => task.type === 'voice-kind' && task.difficulty === 1)
    expect(easyVoice.every((task) => task.prompt.includes('Genus verbi'))).toBe(true)
    const sample = allTasks().find((task) => task.id === 'case-id-c07-1')
    expect(sample?.interaction).toMatchObject({ kind: 'choose', correctId: 'Dativ' })
  })

  it('bietet die Begriffshilfe nur an, wenn sie eingeschaltet ist', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<PromptBlock text="Bestimme den Kasus." help />)
    await user.click(screen.getByRole('button', { name: 'Begriffshilfe' }))
    expect(screen.getByText(/grammatischer Fall/i)).toBeTruthy()
    expect(termsInPrompt('Bestimme das Genus verbi.')[0]?.term).toBe('Genus verbi')
    rerender(<PromptBlock text="Bestimme den Kasus." />)
    expect(screen.queryByRole('button', { name: 'Begriffshilfe' })).toBeNull()
  })
})
