import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { ProgressProvider } from '../progress/ProgressContext'

function renderApp() {
  const storage = new Map<string, string>()
  const memory: Storage = {
    get length() { return storage.size },
    clear: () => storage.clear(),
    getItem: (key) => storage.get(key) ?? null,
    key: (index) => [...storage.keys()][index] ?? null,
    removeItem: (key) => { storage.delete(key) },
    setItem: (key, value) => { storage.set(key, value) },
  }
  Object.defineProperty(window, 'localStorage', { configurable: true, value: memory })
  return render(
    <ProgressProvider>
      <App />
    </ProgressProvider>,
  )
}

describe('Startseite', () => {
  it('zeigt acht Lernbereiche und hält gemischtes Training zurück', async () => {
    renderApp()
    expect(screen.getByRole('heading', { name: 'Grammatik-Trainer' })).toBeTruthy()
    expect(screen.getByText('Lernen. Ausprobieren. Sicher anwenden.')).toBeTruthy()
    expect(screen.getAllByRole('button', { name: 'Lernen' })).toHaveLength(8)
    expect(screen.getAllByRole('button', { name: 'Trainieren' })).toHaveLength(8)
    const mixed = screen.getByRole('button', { name: 'Gemischt trainieren' })
    expect((mixed as HTMLButtonElement).disabled).toBe(true)

    await userEvent.click(screen.getAllByRole('button', { name: 'Lernen' })[0]!)
    expect(screen.getByText(/ohne Bewertung/)).toBeTruthy()
  })

  it('öffnet eine Trainingsaufgabe mit Prüfen', async () => {
    renderApp()
    await userEvent.click(screen.getAllByRole('button', { name: 'Trainieren' })[0]!)
    expect(screen.getByRole('button', { name: 'Prüfen' })).toBeTruthy()
    expect(screen.getByText(/Aufgabe 1 von/)).toBeTruthy()
  })
})
