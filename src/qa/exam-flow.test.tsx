import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import App from '../App'
import { correctAnswer, isCorrect, wrongAnswer } from '../engine/check'
import { tasksFor } from '../engine/generate'
import type { Answer, Task } from '../engine/types'
import { EXAM_STORAGE_KEY } from '../progress/exams'
import { HISTORY_KEY, STORAGE_KEY } from '../progress/model'
import { ProgressProvider } from '../progress/ProgressContext'

afterEach(() => cleanup())

function clickEnabled(user: ReturnType<typeof userEvent.setup>, text: string, root: ParentNode = document) {
  const button = [...root.querySelectorAll('button')].find((entry) => entry.textContent === text && !entry.hasAttribute('disabled'))
  if (!button) {
    const shown = [...root.querySelectorAll('button')].map((entry) => entry.textContent).slice(0, 6).join(' || ')
    throw new Error(`Button fehlt: ${text} | ${shown}`)
  }
  return user.click(button)
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

function visibleNounTask(): Task {
  const card = document.querySelector('.exercise-card')
  if (!card) throw new Error('Keine Aufgabenkarte')
  const heading = card.parentElement?.querySelector('h1')?.textContent ?? ''
  const prompt = card.querySelector('.prompt')?.textContent ?? ''
  const stimulus = card.querySelector('.stimulus')?.textContent ?? undefined
  let matches = tasksFor('nouns').filter((task) => task.typeLabel === heading && task.prompt === prompt && (task.stimulus ?? undefined) === stimulus)
  if (matches.length > 1) {
    const names = new Set([...card.querySelectorAll('button')].map((button) => button.textContent ?? ''))
    matches = matches.filter((task) => task.interaction.kind !== 'choose' || task.interaction.options.every((option) => names.has(option.text)))
  }
  if (matches.length > 1 && new Set(matches.map((task) => JSON.stringify(correctAnswer(task)))).size === 1) return matches[0]!
  if (matches.length !== 1) {
    const shown = [...card.querySelectorAll('button')].map((button) => button.textContent).slice(0, 8).join(' || ')
    throw new Error(`Aufgabe nicht eindeutig (${matches.length}): ${heading} | ${prompt} | ${shown}`)
  }
  return matches[0]!
}

async function drive(user: ReturnType<typeof userEvent.setup>, task: Task, answer: Answer) {
  const interaction = task.interaction
  const card = document.querySelector('.exercise-card') ?? document
  if (interaction.kind === 'choose' && answer.kind === 'choice') {
    const option = interaction.options.find((item) => item.id === answer.id)
    await clickEnabled(user, option?.text ?? answer.id, card)
    return
  }
  if (interaction.kind === 'bool' && answer.kind === 'bool') {
    await clickEnabled(user, answer.value ? 'Stimmt' : 'Stimmt nicht', card)
    return
  }
  if (interaction.kind === 'mark' && answer.kind === 'ids') {
    for (const id of answer.ids) {
      const text = interaction.tokens.find((token) => token.id === id)?.text ?? ''
      await clickEnabled(user, text, card)
    }
    return
  }
  if (interaction.kind === 'classify' && answer.kind === 'map') {
    for (const item of interaction.items) {
      await clickEnabled(user, item.text, card)
      const bucket = interaction.buckets.find((entry) => entry.id === answer.map[item.id])
      const heading = [...card.querySelectorAll('h3')].find((node) => node.textContent === bucket?.label)
      const section = heading?.closest('section')
      if (!section) throw new Error(`Ziel fehlt: ${bucket?.label}`)
      await clickEnabled(user, 'Hier zuordnen', section)
    }
    return
  }
  if (interaction.kind === 'order' && answer.kind === 'order') {
    for (const id of answer.ids) {
      const text = interaction.items.find((item) => item.id === id)?.text ?? id
      await clickEnabled(user, text, card)
    }
    return
  }
  if (interaction.kind === 'toggle' && answer.kind === 'toggle') {
    for (const token of interaction.tokens) {
      if (answer.values[token.id] === token.faulty) continue
      await clickEnabled(user, `${token.before ?? ''}${token.faulty}${token.after ?? ''}`, card)
    }
    return
  }
  if (interaction.kind === 'commas' && answer.kind === 'commas') {
    for (const slot of answer.slots) {
      await clickEnabled(user, `Komma nach ${interaction.words[slot]} setzen`, card)
    }
  }
}

describe('Prüfungsmodus', () => {
  it('prüft ohne Hilfen und wertet erst am Ende aus', async () => {
    const user = userEvent.setup()
    const storage = memoryStorage()
    renderApp(storage)
    const progressBefore = storage.getItem(STORAGE_KEY)
    const historyBefore = storage.getItem(HISTORY_KEY)

    await user.click(screen.getByRole('button', { name: 'Prüfung starten' }))
    expect(screen.getByRole('heading', { name: 'Wähle deine Prüfung.' })).toBeTruthy()
    for (const name of [/Leicht/, /Mittel/, /Schwierig/]) {
      await user.click(screen.getByRole('button', { name: name }))
      expect(screen.getByRole('button', { name: name }).getAttribute('aria-pressed')).toBe('true')
    }
    await user.click(screen.getByRole('button', { name: /Leicht/ }))
    await user.click(screen.getByRole('checkbox', { name: 'Alle Lernbereiche' }))
    expect((screen.getByRole('button', { name: 'Prüfung beginnen' }) as HTMLButtonElement).disabled).toBe(true)
    await user.click(screen.getByRole('checkbox', { name: 'Substantive (Nomen)' }))
    await user.click(screen.getByRole('radio', { name: '10 Aufgaben' }))
    await user.click(screen.getByRole('button', { name: 'Prüfung beginnen' }))

    let misses = 0
    let missedPrompt = ''
    for (let step = 0; step < 10; step += 1) {
      expect(screen.getByText(`Aufgabe ${step + 1} von 10`)).toBeTruthy()
      expect(screen.queryByText(/von 10 richtig/)).toBeNull()
      const task = visibleNounTask()
      const bad = wrongAnswer(task)
      if (misses === 0 && bad && !isCorrect(task, bad)) {
        await drive(user, task, bad)
        misses += 1
        missedPrompt = task.prompt
      } else {
        await drive(user, task, correctAnswer(task))
      }
      await user.click(screen.getByRole('button', { name: 'Antwort bestätigen' }))
      expect(screen.queryByText('Das stimmt.')).toBeNull()
      expect(document.querySelector('.feedback-banner')).toBeNull()
      expect(screen.queryByRole('button', { name: 'Antwort bestätigen' })).toBeNull()
      expect(document.querySelector('.exercise-card button[disabled]')).toBeTruthy()
      await user.click(screen.getByRole('button', { name: 'Nächste Aufgabe' }))
    }

    expect(misses).toBe(1)
    expect(screen.getByRole('heading', { name: '9 von 10 richtig' })).toBeTruthy()
    expect(screen.getByText('90 %')).toBeTruthy()
    expect(screen.getByText('Sehr sicher')).toBeTruthy()
    expect(screen.getByText('Substantive (Nomen): 9/10')).toBeTruthy()
    expect(storage.getItem(STORAGE_KEY)).toBe(progressBefore)
    expect(storage.getItem(HISTORY_KEY)).toBe(historyBefore)
    expect(storage.getItem(EXAM_STORAGE_KEY)).toMatch(/"percent":90/)

    await user.click(screen.getByRole('button', { name: 'Fehler ansehen' }))
    expect(screen.getByText(missedPrompt)).toBeTruthy()
    expect(screen.getByText(/Deine Antwort:/)).toBeTruthy()
    expect(screen.getByText(/Richtige Antwort:/)).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Zur Auswertung' }))

    await user.click(screen.getByRole('button', { name: 'Neue Prüfung' }))
    expect(screen.getByRole('heading', { name: 'Bisherige Prüfungen' })).toBeTruthy()
    expect(screen.getByText('90 %')).toBeTruthy()
    expect(screen.getAllByText('Leicht').length).toBeGreaterThan(0)

    await user.click(screen.getByRole('button', { name: 'Zur Startseite' }))
    await user.click(screen.getByRole('button', { name: 'Prüfung starten' }))
    expect(screen.getByText('9/10')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Zur Startseite' }))
    await user.click(screen.getByRole('button', { name: 'Prüfung' }))
    expect(screen.getByRole('heading', { name: 'Wähle deine Prüfung.' })).toBeTruthy()
  }, 120000)

  it('übt nach der Prüfung gezielt weiter', async () => {
    const user = userEvent.setup()
    const storage = memoryStorage()
    renderApp(storage)
    await user.click(screen.getByRole('button', { name: 'Prüfung starten' }))
    await user.click(screen.getByRole('button', { name: /Leicht/ }))
    await user.click(screen.getByRole('checkbox', { name: 'Alle Lernbereiche' }))
    await user.click(screen.getByRole('checkbox', { name: 'Substantive (Nomen)' }))
    await user.click(screen.getByRole('radio', { name: '10 Aufgaben' }))
    await user.click(screen.getByRole('button', { name: 'Prüfung beginnen' }))
    for (let step = 0; step < 10; step += 1) {
      const task = visibleNounTask()
      const bad = step === 0 ? wrongAnswer(task) : null
      await drive(user, task, bad && !isCorrect(task, bad) ? bad : correctAnswer(task))
      await user.click(screen.getByRole('button', { name: 'Antwort bestätigen' }))
      await user.click(screen.getByRole('button', { name: 'Nächste Aufgabe' }))
    }
    expect(storage.getItem(STORAGE_KEY)).not.toMatch(/"attempted":[1-9]/)
    await user.click(screen.getByRole('button', { name: 'Passend weiterüben' }))
    const task = visibleNounTask()
    await drive(user, task, correctAnswer(task))
    await user.click(screen.getByRole('button', { name: 'Prüfen' }))
    expect(screen.getByText('Das stimmt.')).toBeTruthy()
    expect(screen.getByText(task.feedbackCorrect)).toBeTruthy()
    expect(storage.getItem(STORAGE_KEY)).toMatch(/"attempted":1/)
  }, 120000)
})
