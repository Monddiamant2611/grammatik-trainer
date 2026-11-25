import type { AreaId } from '../domain/areas'
import { persons, verbParadigms, type Person } from '../data/verbs'
import { allTasks } from '../engine/generate'
import type { Task } from '../engine/types'

export const FLAG_NAMES = [
  'AMBIGUOUS_TARGET',
  'ANSWER_REVEALED',
  'QUESTION_ANSWER_MISMATCH',
  'AMBIGUOUS_PERSON_NUMBER',
  'WEAK_DISTRACTORS',
  'TOO_EASY_FOR_DIFFICULTY',
  'BOOLEAN_LOW_VALUE',
  'MISSING_CONTEXT',
  'MISSING_TARGET_MARK',
] as const

export type FlagName = (typeof FLAG_NAMES)[number]

export interface ContentFlag {
  flag: FlagName
  id: string
  area: AreaId
}

const PRONOUNS = new Set(['ich', 'du', 'er', 'wir', 'ihr', 'sie'])
const PERSON_LABEL = /^\d\. Person (Singular|Plural)$/

export function contentFlags(tasks: readonly Task[] = allTasks()): ContentFlag[] {
  const flags: ContentFlag[] = []
  for (const task of tasks) {
    const add = (flag: FlagName) => flags.push({ flag, id: task.id, area: task.area })
    if (task.target && task.stimulus) {
      const escaped = task.target.surface.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const found = task.stimulus.match(new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'gu'))
      if (found?.length !== 1) add('AMBIGUOUS_TARGET')
    }
    if ((task.type === 'case-identify' || task.type === 'case-question') && !task.target) add('MISSING_TARGET_MARK')
    if (/markiert/i.test(task.prompt) && task.stimulus && !task.target) add('MISSING_TARGET_MARK')
    if (task.stimulus?.includes('→')) add('ANSWER_REVEALED')
    if (task.interaction.kind === 'choose' && task.stimulus && /Komparativform|Steigerung von/.test(task.prompt) && task.stimulus.includes(task.interaction.correctId)) {
      add('ANSWER_REVEALED')
    }
    if (task.type === 'verb-person' && task.interaction.kind === 'choose') {
      const labels = task.interaction.options.map((option) => option.text)
      if (labels.some((label) => PRONOUNS.has(label)) || labels.some((label) => !PERSON_LABEL.test(label))) add('QUESTION_ANSWER_MISMATCH')
      const parsed = task.id.match(/^verb-person-(.+)-(ich|du|er|wir|ihr|sie)$/)
      if (parsed) {
        const verb = verbParadigms.find((item) => item.infinitive === parsed[1])
        const person = parsed[2] as Person
        const form = verb?.forms[person]
        const shared = verb && form ? persons.filter((item) => verb.forms[item] === form).length > 1 : false
        if (shared && !task.target) {
          add('AMBIGUOUS_PERSON_NUMBER')
          add('MISSING_CONTEXT')
        }
      }
    }
    if (task.type === 'verb-form' && task.difficulty >= 2 && /für „(?:ich|du|er|wir|ihr|sie)“/.test(task.prompt)) add('TOO_EASY_FOR_DIFFICULTY')
    if (task.type === 'verb-form' && task.difficulty === 3 && !/Präsens|Präteritum/.test(task.prompt)) add('TOO_EASY_FOR_DIFFICULTY')
    if (task.interaction.kind === 'bool' && (task.prompt.startsWith('Bekommt') || task.stimulus?.includes('→'))) add('BOOLEAN_LOW_VALUE')
    if (task.interaction.kind === 'choose' && task.interaction.options.some((option) => option.text === 'Banane')) add('WEAK_DISTRACTORS')
  }
  return flags
}

export function flagCounts(flags: readonly ContentFlag[] = contentFlags()): Record<FlagName, number> {
  const counts = Object.fromEntries(FLAG_NAMES.map((name) => [name, 0])) as Record<FlagName, number>
  for (const item of flags) counts[item.flag] += 1
  return counts
}

export function flagReport(flags: readonly ContentFlag[] = contentFlags()): string[] {
  const counts = flagCounts(flags)
  return FLAG_NAMES.map((name) => {
    const sample = flags.filter((item) => item.flag === name).slice(0, 8).map((item) => `${item.id} (${item.area})`)
    return sample.length > 0 ? `${name}: ${counts[name]} | ${sample.join(', ')}` : `${name}: ${counts[name]}`
  })
}
