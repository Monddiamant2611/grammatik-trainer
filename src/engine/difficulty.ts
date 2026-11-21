export function practiceLevel(attempted: number, correct: number): number {
  if (attempted <= 0 || correct <= 0) return 0
  const accuracy = Math.min(1, correct / attempted)
  const volume = 1 - Math.exp(-correct / 14)
  const raw = volume * (0.55 + 0.45 * accuracy)
  const cap = correct >= 20 && accuracy >= 0.8 ? 1 : 0.96
  return Math.round(Math.min(cap, raw) * 100)
}

export function practiceLabel(level: number, attempted: number): string {
  if (attempted <= 0) return 'Training noch offen'
  if (level < 25) return 'Angefangen'
  if (level < 50) return 'Im Aufbau'
  if (level < 75) return 'Schon sicherer'
  return 'Gefestigt'
}

export function preferredDifficulties(correct: number): readonly (1 | 2 | 3)[] {
  if (correct < 4) return [1]
  if (correct < 10) return [1, 2]
  return [1, 2, 3]
}
