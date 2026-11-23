import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { FoundationsFlow } from '../components/foundations/FoundationsFlow'
import { caseGroupCount } from '../data/case-contrast'
import { allTasks } from '../engine/generate'
import { rngFromString, shuffleVisible } from '../engine/random'
import { modules } from '../foundations/content'
import { LEGACY_TUTORIAL_IDS } from '../foundations/legacy'
import { sanitizeProgress } from '../progress/model'
import { ProgressProvider } from '../progress/ProgressContext'
import { consolidationCount, denseTutorialSteps, positionReports, weakCaseContexts } from './content-audit'

afterEach(() => cleanup())

describe('Didaktische Qualität', () => {
  it('mischt Auswahlantworten, ohne die Lösung zu verändern', () => {
    const tasks = allTasks().filter((task) => task.interaction.kind === 'choose' && task.interaction.options.length >= 3)
    expect(tasks.length).toBeGreaterThan(100)
    let sameOrder = 0
    for (const task of tasks) {
      const interaction = task.interaction
      if (interaction.kind !== 'choose') continue
      const order = shuffleVisible(interaction.options, rngFromString(task.id))
      expect(order.some((option) => option.id === interaction.correctId)).toBe(true)
      expect(order).toHaveLength(interaction.options.length)
      if (order.every((option, index) => option.id === interaction.options[index]?.id)) sameOrder += 1
    }
    expect(sameOrder).toBe(0)
  })

  it('bevorzugt keine Antwortposition deutlich', () => {
    const four = positionReports().find((report) => report.size === 4)
    const three = positionReports().find((report) => report.size === 3)
    expect(four).toBeTruthy()
    expect(three).toBeTruthy()
    for (const share of four?.shares ?? []) expect(share).toBeGreaterThan(18)
    for (const share of four?.shares ?? []) expect(share).toBeLessThan(32)
    for (const share of three?.shares ?? []) expect(share).toBeGreaterThan(25)
    for (const share of three?.shares ?? []) expect(share).toBeLessThan(42)
  })

  it('lässt Zuordnungen nicht in der Lösungsreihenfolge starten', () => {
    const items = [
      { id: 'wer', text: 'Wer oder was?' },
      { id: 'wessen', text: 'Wessen?' },
      { id: 'wem', text: 'Wem?' },
      { id: 'wen', text: 'Wen oder was?' },
    ]
    const order = shuffleVisible(items, rngFromString('c7-review-classify'))
    expect(order.map((item) => item.id).join(',')).not.toBe(items.map((item) => item.id).join(','))
  })

  it('gibt fortgeschrittenen Kasussätzen mehrere Kasusträger', () => {
    const sample = allTasks().find((task) => task.id === 'case-id-c01-0')
    expect(sample?.stimulus).toBeTruthy()
    expect(sample?.stimulus).not.toBe('Der Hund schläft.')
    expect(caseGroupCount(sample?.stimulus ?? '')).toBeGreaterThanOrEqual(2)
    expect(sample?.interaction).toMatchObject({ kind: 'choose', correctId: 'Nominativ' })
    expect(weakCaseContexts()).toEqual([])
    const competitive = allTasks().find((task) => task.id === 'case-id-c07-1')
    expect(competitive?.stimulus).toMatch(/den Spielern/)
    expect(caseGroupCount(competitive?.stimulus ?? '')).toBeGreaterThanOrEqual(3)
  })

  it('legt zwischen neue Lerninhalte kurze Übungen und bleibt navigierbar', async () => {
    const cases = modules.find((module) => module.area === 'cases')
    const nominative = cases?.steps.findIndex((step) => step.id === 'c4') ?? -1
    expect(cases?.steps[nominative + 1]?.id).toBe('c4-u1')
    expect(cases?.steps[nominative + 2]?.id).toBe('c4-u2')
    expect(consolidationCount()).toBeGreaterThan(80)
    expect(denseTutorialSteps()).toEqual([])
    for (const [area, ids] of Object.entries(LEGACY_TUTORIAL_IDS)) {
      const module = modules.find((entry) => entry.area === area)
      expect(module && module.steps.length).toBeGreaterThan(ids.length)
    }

    const user = userEvent.setup()
    localStorage.clear()
    render(
      <ProgressProvider>
        <FoundationsFlow area="cases" onExit={() => undefined} />
      </ProgressProvider>,
    )
    expect(screen.getByText(/Schritt 1 von/)).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'der Hund' }))
    await user.click(screen.getByRole('button', { name: 'Weiter' }))
    expect(screen.getByRole('heading', { name: 'Bestimmten Artikel wählen' })).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Zurück' }))
    expect(screen.getByRole('heading', { name: 'Bestimmte Artikel' })).toBeTruthy()
  })

  it('zeigt beim ersten Fehlversuch nur einen Hinweis', async () => {
    const user = userEvent.setup()
    localStorage.clear()
    render(
      <ProgressProvider>
        <FoundationsFlow area="nouns" onExit={() => undefined} />
      </ProgressProvider>,
    )
    await user.click(screen.getByRole('button', { name: 'laufen' }))
    expect(screen.getByText('Ein Substantiv benennt eine Person, ein Tier oder ein Ding.')).toBeTruthy()
    expect((screen.getByRole('button', { name: 'Weiter' }) as HTMLButtonElement).disabled).toBe(true)
    await user.click(screen.getByRole('button', { name: 'Hund' }))
    expect((screen.getByRole('button', { name: 'Weiter' }) as HTMLButtonElement).disabled).toBe(false)
  })

  it('ordnet ältere Tutorialstände derselben Lektion zu', () => {
    const saved = sanitizeProgress({
      version: 2,
      areas: {
        cases: { tutorialStep: 3, tutorialCompleted: false, attempted: 4, correct: 3 },
        nouns: { tutorialStep: 7, tutorialCompleted: true, foundationsDone: true, attempted: 2, correct: 2 },
      },
    })
    const cases = modules.find((module) => module.area === 'cases')
    expect(cases?.steps[saved.areas.cases.tutorialStep]?.id).toBe('c4')
    expect(saved.areas.cases.attempted).toBe(4)
    expect(saved.areas.cases.tutorialRevision).toBe(1)
    expect(saved.areas.nouns.tutorialCompleted).toBe(true)
    const again = sanitizeProgress(saved)
    expect(again.areas.cases.tutorialStep).toBe(saved.areas.cases.tutorialStep)
  })
})
