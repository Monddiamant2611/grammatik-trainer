import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import App from '../App'
import { AREAS, type TrainingArea } from '../domain/areas'
import { correctAnswer } from '../engine/check'
import { allTasks, tasksFor } from '../engine/generate'
import { foundationModule } from '../foundations/content'
import type { FoundationStep } from '../foundations/types'
import { STORAGE_KEY } from '../progress/model'
import { ProgressProvider } from '../progress/ProgressContext'
import type { Task } from '../engine/types'

afterEach(() => cleanup())

function exactName(name: string) {
  return (value: string) => value === name
}

function clickButton(user: ReturnType<typeof userEvent.setup>, name: string) {
  return user.click(screen.getByRole('button', { name: exactName(name) }))
}

function memoryStorage(): Storage {
  const storage = new Map<string, string>()
  return {
    get length() { return storage.size },
    clear: () => storage.clear(),
    getItem: (key) => storage.get(key) ?? null,
    key: (index) => [...storage.keys()][index] ?? null,
    removeItem: (key) => { storage.delete(key) },
    setItem: (key, value) => { storage.set(key, value) },
  }
}

function renderApp(storage = memoryStorage()) {
  Object.defineProperty(window, 'localStorage', { configurable: true, value: storage })
  return render(
    <ProgressProvider>
      <App />
    </ProgressProvider>,
  )
}

function visibleTask(area: TrainingArea): Task {
  const card = document.querySelector('.exercise-card')
  if (!card) throw new Error('Keine Aufgabenkarte')
  const taskId = card.getAttribute('data-task-id')
  const pool = area === 'mixed' ? allTasks() : tasksFor(area)
  if (taskId) {
    const named = pool.find((task) => task.id === taskId)
    if (named) return named
  }
  const heading = within(card.parentElement as HTMLElement).getByRole('heading', { level: 1 }).textContent ?? ''
  const prompts = [...card.querySelectorAll('.prompt')].map((node) => node.textContent ?? '')
  const stimulus = card.querySelector('.stimulus')?.textContent ?? undefined
  let matches = pool.filter((task) => task.typeLabel === heading && prompts.includes(task.prompt) && (task.stimulus ?? undefined) === stimulus)
  if (matches.length > 1) {
    const names = new Set([...card.querySelectorAll('button')].map((button) => button.textContent ?? ''))
    const chips = [...card.querySelectorAll('.token-chip')].map((button) => button.textContent ?? '').join('|')
    matches = matches.filter((task) => {
      if (task.interaction.kind === 'choose') return task.interaction.options.every((option) => names.has(option.text))
      if (task.interaction.kind === 'toggle') {
        const expected = task.interaction.tokens
          .filter((token) => token.faulty !== token.correct)
          .map((token) => `${token.before ?? ''}${token.faulty}${token.after ?? ''}`)
          .join('|')
        return expected === chips
      }
      return true
    })
  }
  if (matches.length > 1) {
    const signatures = new Set(matches.map((task) => JSON.stringify(correctAnswer(task))))
    if (signatures.size === 1) return matches[0]!
  }
  if (matches.length !== 1) throw new Error(`Aufgabe nicht eindeutig: ${heading} | ${stimulus ?? ''} → ${matches.map((task) => task.id).join(', ')}`)
  return matches[0]!
}

async function answerTask(user: ReturnType<typeof userEvent.setup>, task: Task) {
  const answer = correctAnswer(task)
  const interaction = task.interaction
  if (interaction.kind === 'choose' && answer.kind === 'choice') {
    const option = interaction.options.find((item) => item.id === answer.id)
    await clickButton(user, option?.text ?? answer.id)
    return
  }
  if (interaction.kind === 'bool' && answer.kind === 'bool') {
    await clickButton(user, answer.value ? 'Stimmt' : 'Stimmt nicht')
    return
  }
  if (interaction.kind === 'mark' && answer.kind === 'ids') {
    const counts = new Map<string, number>()
    for (const id of answer.ids) {
      const text = interaction.tokens.find((token) => token.id === id)?.text ?? ''
      counts.set(text, (counts.get(text) ?? 0) + 1)
    }
    for (const [text, count] of counts) {
      const buttons = screen.getAllByRole('button', { name: exactName(text) }).filter((button) => !button.hasAttribute('disabled'))
      for (let index = 0; index < count; index += 1) await user.click(buttons[index]!)
    }
    return
  }
  if (interaction.kind === 'classify' && answer.kind === 'map') {
    for (const item of interaction.items) {
      await clickButton(user, item.text)
      const bucket = interaction.buckets.find((entry) => entry.id === answer.map[item.id])
      const heading = screen.getByRole('heading', { name: exactName(bucket?.label ?? '') })
      const section = heading.closest('section')
      if (!section) throw new Error(`Ziel fehlt: ${bucket?.label}`)
      await user.click(within(section).getByRole('button', { name: exactName('Hier zuordnen') }))
    }
    return
  }
  if (interaction.kind === 'order' && answer.kind === 'order') {
    for (const id of answer.ids) {
      const text = interaction.items.find((item) => item.id === id)?.text ?? id
      const button = screen.getAllByRole('button', { name: exactName(text) }).find((entry) => !entry.hasAttribute('disabled'))
      if (!button) throw new Error(`Baustein fehlt: ${text}`)
      await user.click(button)
    }
    return
  }
  if (interaction.kind === 'toggle' && answer.kind === 'toggle') {
    for (const token of interaction.tokens) {
      if (token.faulty === token.correct) continue
      await clickButton(user, `${token.before ?? ''}${token.faulty}${token.after ?? ''}`)
    }
    return
  }
  if (interaction.kind === 'commas' && answer.kind === 'commas') {
    for (const slot of answer.slots) {
      const word = interaction.words[slot]
      await clickButton(user, `Komma nach ${word} setzen`)
    }
  }
}

async function solveFoundation(user: ReturnType<typeof userEvent.setup>, step: FoundationStep) {
  const attempt = step.try
  if (attempt.kind === 'choice') {
    const option = attempt.options.find((item) => item.id === attempt.answerId)
    await clickButton(user, option?.text ?? '')
    return
  }
  if (attempt.kind === 'compare') {
    await clickButton(user, attempt.answer === 'left' ? attempt.left : attempt.right)
    return
  }
  if (attempt.kind === 'series') {
    for (const [index, question] of attempt.questions.entries()) {
      const option = question.options.find((item) => item.id === question.answerId)
      await clickButton(user, option?.text ?? '')
      const label = index + 1 >= attempt.questions.length ? 'Zur Beobachtung' : 'Nächstes Wort'
      await clickButton(user, label)
    }
    return
  }
  if (attempt.kind === 'classify') {
    expect(screen.getAllByRole('button', { name: 'Erst antippen, dann hier' }).length).toBeGreaterThan(0)
    for (const item of attempt.items) {
      await clickButton(user, item.text)
      const bucket = attempt.buckets.find((entry) => entry.id === attempt.solution[item.id])
      const heading = screen.getByRole('heading', { name: exactName(bucket?.text ?? ''), level: 3 })
      const section = heading.closest('section')
      if (!section) throw new Error(`Gruppe fehlt: ${bucket?.text}`)
      await user.click(within(section).getByRole('button', { name: exactName('Hier zuordnen') }))
    }
    await clickButton(user, 'Beobachtung ansehen')
    return
  }
  for (const id of attempt.correctIds) {
    const text = attempt.items.find((item) => item.id === id)?.text ?? id
    const button = screen.getAllByRole('button', { name: exactName(text) }).find((entry) => !entry.hasAttribute('disabled'))
    if (!button) throw new Error(`Reihenfolge fehlt: ${text}`)
    await user.click(button)
  }
  await clickButton(user, 'Beobachtung ansehen')
}

function seedTutorialsDone(storage: Storage) {
  const areas = Object.fromEntries(
    AREAS.map((area) => [
      area.id,
      {
        foundationStep: 99,
        foundationsDone: true,
        tutorialStep: 99,
        tutorialCompleted: true,
        attempted: 0,
        correct: 0,
        recent: [],
        lastLabel: '',
      },
    ]),
  )
  storage.setItem(STORAGE_KEY, JSON.stringify({ version: 2, areas, session: null }))
}

describe('Lernwege', () => {
  it('führt durch alle Tutorials ohne Punkte', async () => {
    const user = userEvent.setup()
    renderApp()
    for (const [index, area] of AREAS.entries()) {
      await user.click(screen.getAllByRole('button', { name: /Tutorial starten|Tutorial wiederholen|Tutorial fortsetzen/ })[index]!)
      for (const step of foundationModule(area.id).steps) {
        expect(screen.getByRole('heading', { name: step.title })).toBeTruthy()
        expect(screen.getByText(/ohne Bewertung/)).toBeTruthy()
        expect(document.body.textContent ?? '').not.toMatch(/undefined|null|Fehlerquote|Punktzahl|Prozent/)
        await solveFoundation(user, step)
        await clickButton(user, 'Weiter')
      }
      expect(screen.getByText(/keine Punkte/)).toBeTruthy()
      expect(screen.getByRole('button', { name: 'Jetzt trainieren' })).toBeTruthy()
      expect(screen.getByRole('button', { name: 'Tutorial wiederholen' })).toBeTruthy()
      await clickButton(user, 'Zur Startseite')
    }
  }, 180000)

  it('prüft drei Aufgaben je Lernbereich und speichert den Stand', async () => {
    const user = userEvent.setup()
    const storage = memoryStorage()
    seedTutorialsDone(storage)
    const view = renderApp(storage)
    for (const area of AREAS) {
      const card = screen.getByRole('heading', { name: area.title }).closest('article')
      if (!card) throw new Error(area.title)
      await user.click(within(card).getByRole('button', { name: /Gemischt üben|Weiterüben/ }))
      const confirm = screen.queryByRole('button', { name: exactName('Neue Runde starten') })
      if (confirm) await user.click(confirm)
      const seen = new Set<string>()
      for (let step = 0; step < 3; step += 1) {
        const task = visibleTask(area.id)
        expect(seen.has(task.id)).toBe(false)
        seen.add(task.id)
        expect(task.prompt.trim().length).toBeGreaterThan(0)
        expect(document.body.textContent ?? '').not.toMatch(/undefined|null/)
        await answerTask(user, task)
        await clickButton(user, 'Prüfen')
        expect(screen.getByText(task.feedbackCorrect)).toBeTruthy()
        await clickButton(user, 'Weiter')
      }
      await clickButton(user, 'Pause')
    }
    expect(storage.getItem(STORAGE_KEY)).toMatch(/"attempted":3/)
    view.unmount()
    renderApp(storage)
    expect(screen.getAllByText(/3 Aufgaben trainiert/).length).toBe(AREAS.length)
  }, 120000)

  it('beschriftet gemischte Aufgaben mit ihrem Lernbereich', async () => {
    const user = userEvent.setup()
    const storage = memoryStorage()
    seedTutorialsDone(storage)
    renderApp(storage)
    const openArea = async (title: string) => {
      const card = screen.getByRole('heading', { name: exactName(title) }).closest('article')
      if (!card) throw new Error(title)
      await user.click(within(card).getByRole('button', { name: /Gemischt üben|Weiterüben/ }))
      const confirm = screen.queryByRole('button', { name: exactName('Neue Runde starten') })
      if (confirm) await user.click(confirm)
    }
    await openArea('Substantive (Nomen) erkennen')
    await answerTask(user, visibleTask('nouns'))
    await clickButton(user, 'Prüfen')
    await clickButton(user, 'Pause')
    await openArea('Zeitformen')
    await answerTask(user, visibleTask('tenses'))
    await clickButton(user, 'Prüfen')
    await clickButton(user, 'Pause')
    await clickButton(user, 'Gemischt trainieren')
    const confirmMixed = screen.queryByRole('button', { name: exactName('Neue Runde starten') })
    if (confirmMixed) await user.click(confirmMixed)
    const areas = new Set<string>()
    const types = new Set<string>()
    for (let step = 0; step < 4; step += 1) {
      const task = visibleTask('mixed')
      areas.add(task.area)
      types.add(task.type)
      expect(screen.getByText(`Gemischtes Training · ${AREAS.find((item) => item.id === task.area)?.title}`)).toBeTruthy()
      await answerTask(user, task)
      await clickButton(user, 'Prüfen')
      expect(screen.getByText(task.feedbackCorrect)).toBeTruthy()
      await clickButton(user, 'Weiter')
    }
    expect(areas.size).toBeGreaterThan(1)
    expect(types.size).toBeGreaterThan(1)
  }, 60000)
})
