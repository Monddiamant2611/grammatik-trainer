import type { Answer, Task } from './types'
import { sameSet } from './types'

export function isComplete(task: Task, answer: Answer | null): boolean {
  if (!answer) return false
  const interaction = task.interaction
  if (interaction.kind === 'mark') {
    return answer.kind === 'ids' && answer.ids.length > 0
  }
  if (interaction.kind === 'choose') {
    return answer.kind === 'choice' && answer.id.length > 0
  }
  if (interaction.kind === 'classify') {
    if (answer.kind !== 'map') return false
    return interaction.items.every((item) => Boolean(answer.map[item.id]))
  }
  if (interaction.kind === 'order') {
    return answer.kind === 'order' && answer.ids.length === interaction.correctIds.length
  }
  if (interaction.kind === 'toggle') return answer.kind === 'toggle'
  if (interaction.kind === 'commas') return answer.kind === 'commas'
  if (interaction.kind === 'bool') return answer.kind === 'bool'
  return false
}

export function isCorrect(task: Task, answer: Answer): boolean {
  const interaction = task.interaction
  if (interaction.kind === 'mark') {
    return answer.kind === 'ids' && sameSet(answer.ids, interaction.correctIds)
  }
  if (interaction.kind === 'choose') {
    return answer.kind === 'choice' && answer.id === interaction.correctId
  }
  if (interaction.kind === 'classify') {
    if (answer.kind !== 'map') return false
    return interaction.items.every((item) => answer.map[item.id] === interaction.solution[item.id])
  }
  if (interaction.kind === 'order') {
    if (answer.kind !== 'order') return false
    return interaction.correctIds.every((id, index) => answer.ids[index] === id)
  }
  if (interaction.kind === 'toggle') {
    if (answer.kind !== 'toggle') return false
    return interaction.tokens.every((token) => answer.values[token.id] === token.correct)
  }
  if (interaction.kind === 'commas') {
    return answer.kind === 'commas' && sameSet(answer.slots.map(String), interaction.correctSlots.map(String))
  }
  if (interaction.kind === 'bool') {
    return answer.kind === 'bool' && answer.value === interaction.correct
  }
  return false
}

export function initialAnswer(task: Task): Answer | null {
  if (task.interaction.kind === 'toggle') {
    return {
      kind: 'toggle',
      values: Object.fromEntries(task.interaction.tokens.map((token) => [token.id, token.faulty])),
    }
  }
  if (task.interaction.kind === 'commas') return { kind: 'commas', slots: [] }
  return null
}

export function correctAnswer(task: Task): Answer {
  const interaction = task.interaction
  if (interaction.kind === 'mark') return { kind: 'ids', ids: [...interaction.correctIds] }
  if (interaction.kind === 'choose') return { kind: 'choice', id: interaction.correctId }
  if (interaction.kind === 'classify') return { kind: 'map', map: { ...interaction.solution } }
  if (interaction.kind === 'order') return { kind: 'order', ids: [...interaction.correctIds] }
  if (interaction.kind === 'toggle') {
    return {
      kind: 'toggle',
      values: Object.fromEntries(interaction.tokens.map((token) => [token.id, token.correct])),
    }
  }
  if (interaction.kind === 'commas') return { kind: 'commas', slots: [...interaction.correctSlots] }
  return { kind: 'bool', value: interaction.correct }
}

export function wrongAnswer(task: Task): Answer | null {
  const interaction = task.interaction
  if (interaction.kind === 'mark') {
    const wrongIds = interaction.tokens
      .filter((token) => token.selectable && !interaction.correctIds.includes(token.id))
      .map((token) => token.id)
    if (wrongIds.length === 0) return null
    return { kind: 'ids', ids: [wrongIds[0] ?? ''] }
  }
  if (interaction.kind === 'choose') {
    const other = interaction.options.find((option) => option.id !== interaction.correctId)
    return other ? { kind: 'choice', id: other.id } : null
  }
  if (interaction.kind === 'classify') {
    const first = interaction.buckets[0]?.id
    const second = interaction.buckets[1]?.id
    if (!first || !second) return null
    const map = Object.fromEntries(interaction.items.map((item) => {
      const expected = interaction.solution[item.id]
      return [item.id, expected === first ? second : first]
    }))
    return { kind: 'map', map }
  }
  if (interaction.kind === 'order') {
    if (interaction.correctIds.length < 2) return null
    return { kind: 'order', ids: [...interaction.correctIds].reverse() }
  }
  if (interaction.kind === 'toggle') {
    const changed = interaction.tokens.some((token) => token.faulty !== token.correct)
    if (!changed) return null
    return {
      kind: 'toggle',
      values: Object.fromEntries(interaction.tokens.map((token) => [token.id, token.faulty])),
    }
  }
  if (interaction.kind === 'commas') {
    if (interaction.correctSlots.length === 0) return { kind: 'commas', slots: [0] }
    return { kind: 'commas', slots: [] }
  }
  return { kind: 'bool', value: !interaction.correct }
}
