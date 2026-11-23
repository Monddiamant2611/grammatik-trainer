export function mulberry32(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function rngFromString(text: string): () => number {
  let seed = 2166136261
  for (const char of text) seed = Math.imul(seed ^ char.charCodeAt(0), 16777619)
  return mulberry32(seed)
}

export function shuffle<T>(items: readonly T[], rng: () => number): T[] {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(rng() * (index + 1))
    const current = copy[index]
    copy[index] = copy[swap] as T
    copy[swap] = current as T
  }
  return copy
}

/** Mischt und vermeidet die Ausgangsreihenfolge, damit sie keine Lösung verrät. */
export function shuffleVisible<T>(items: readonly T[], rng: () => number, reveals?: (order: readonly T[]) => boolean): T[] {
  if (items.length < 2) return [...items]
  const next = shuffle(items, rng)
  const sameAsSource = next.every((item, index) => item === items[index])
  if (sameAsSource || reveals?.(next)) {
    const first = next.shift() as T
    next.push(first)
  }
  return next
}
