export function containsWord(sentence: string, word: string): boolean {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(?:^|[^\\p{L}])${escaped}(?:$|[^\\p{L}])`, 'u').test(sentence)
}

export function wordTokens(sentence: string): { id: string; text: string; selectable: boolean }[] {
  const matches = sentence.matchAll(/[\p{L}]+|[^\s\p{L}]/gu)
  let index = 0
  return [...matches].map((match) => {
    const text = match[0]
    const selectable = /^[\p{L}]+$/u.test(text)
    return { id: `w${index++}`, text, selectable }
  })
}

export function idsForWords(
  tokens: readonly { id: string; text: string; selectable: boolean }[],
  words: readonly string[],
  label: string,
): string[] {
  const pending = [...words]
  const ids: string[] = []
  for (const token of tokens) {
    if (!token.selectable) continue
    const found = pending.indexOf(token.text)
    if (found < 0) continue
    ids.push(token.id)
    pending.splice(found, 1)
  }
  if (pending.length > 0) {
    throw new Error(`${label}: nicht im Satz gefunden: ${pending.join(', ')}`)
  }
  return ids
}

export function requireWord(sentence: string, word: string, label: string): void {
  if (!containsWord(sentence, word)) {
    throw new Error(`${label}: „${word}“ fehlt in „${sentence}“`)
  }
}

export function renderToggle(
  tokens: readonly { faulty: string; correct: string; before?: string; after?: string }[],
  side: 'faulty' | 'correct',
): string {
  return tokens
    .map((token) => `${token.before ?? ''}${side === 'faulty' ? token.faulty : token.correct}${token.after ?? ''}`)
    .join(' ')
}

export function renderCommas(words: readonly string[], slots: readonly number[]): string {
  const body = words.map((word, index) => `${word}${slots.includes(index) ? ',' : ''}`).join(' ')
  return `${body}.`
}

export function listWords(words: readonly string[]): string {
  if (words.length === 0) return ''
  if (words.length === 1) return words[0] ?? ''
  if (words.length === 2) return `${words[0]} und ${words[1]}`
  return `${words.slice(0, -1).join(', ')} und ${words[words.length - 1]}`
}

export function distinct<T>(items: readonly T[]): T[] {
  return [...new Set(items)]
}
