import { correctAnswer } from './check'
import type { Answer, Task } from './types'

export function describeAnswer(task: Task, answer: Answer): string {
  const interaction = task.interaction
  if (interaction.kind === 'mark' && answer.kind === 'ids') {
    const texts = answer.ids.map((id) => interaction.tokens.find((token) => token.id === id)?.text ?? id)
    return texts.length > 0 ? texts.join(', ') : 'keine Markierung'
  }
  if (interaction.kind === 'choose' && answer.kind === 'choice') {
    return interaction.options.find((option) => option.id === answer.id)?.text ?? answer.id
  }
  if (interaction.kind === 'classify' && answer.kind === 'map') {
    return interaction.items.map((item) => {
      const bucket = interaction.buckets.find((entry) => entry.id === answer.map[item.id])
      return `${item.text} → ${bucket?.label ?? '—'}`
    }).join('; ')
  }
  if (interaction.kind === 'order' && answer.kind === 'order') {
    return answer.ids.map((id) => interaction.items.find((item) => item.id === id)?.text ?? id).join(' · ')
  }
  if (interaction.kind === 'toggle' && answer.kind === 'toggle') {
    return interaction.tokens.map((token) => `${token.before ?? ''}${answer.values[token.id] ?? token.faulty}${token.after ?? ''}`).join('')
  }
  if (interaction.kind === 'commas' && answer.kind === 'commas') {
    return interaction.words.map((word, index) => (answer.slots.includes(index) ? `${word},` : word)).join(' ')
  }
  if (interaction.kind === 'bool' && answer.kind === 'bool') return answer.value ? 'Stimmt' : 'Stimmt nicht'
  return '—'
}

export function describeSolution(task: Task): string {
  return describeAnswer(task, correctAnswer(task))
}
