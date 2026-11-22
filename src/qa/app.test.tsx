import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

afterEach(() => cleanup())
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
    expect(screen.getAllByRole('button', { name: 'Tutorial starten' })).toHaveLength(8)
    expect(screen.getAllByRole('button', { name: 'Zuerst Tutorial' })).toHaveLength(8)
    const mixed = screen.getByRole('button', { name: 'Gemischt trainieren' })
    expect((mixed as HTMLButtonElement).disabled).toBe(true)

    await userEvent.click(screen.getAllByRole('button', { name: 'Tutorial starten' })[0]!)
    expect(screen.getByText(/ohne Bewertung/)).toBeTruthy()
    expect(screen.getByText(/Tutorial/)).toBeTruthy()
  })

  it('leitet Erstbesuch vom Training ins Tutorial', async () => {
    const { unmount } = renderApp()
    await userEvent.click(screen.getAllByRole('button', { name: 'Zuerst Tutorial' })[0]!)
    expect(screen.getAllByText(/ohne Bewertung/).length).toBeGreaterThan(0)
    expect(screen.getByText(/Tutorial/)).toBeTruthy()
    unmount()
  })
})
