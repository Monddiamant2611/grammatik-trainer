import { writeFileSync } from 'node:fs'
import { spellingPairsExtra, confusedWordsExtra, sWordsExtra, commaSentencesExtra, syllableItemsExtra } from '../src/data/spelling.extra'

const pairSeen = new Set<string>()
const pairs = spellingPairsExtra.filter((p) => {
  if (p.wrong === p.correct) {
    console.log('drop identical', p.id)
    return false
  }
  if (pairSeen.has(p.id)) {
    console.log('drop dup pair', p.id)
    return false
  }
  pairSeen.add(p.id)
  return true
})

const confuse = confusedWordsExtra.map((item) => {
  if (item.correct === 'wider') return item
  const re = new RegExp(`(?<![\\p{L}])${item.correct.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}])`, 'u')
  if (re.test(item.sentence)) return item
  // try to repair known broken sentences
  if (item.id === 'xcw23') return { ...item, sentence: 'Hier darf man nicht rauchen.' }
  if (item.id === 'xcw30') return { ...item, sentence: 'Bitte lies den Text vor.' }
  if (item.sentence.includes('___')) {
    return { ...item, sentence: item.sentence.replace('___', item.correct) }
  }
  console.log('unfixed confuse', item.id, item.correct, item.sentence)
  return item
}).filter((item) => {
  if (item.correct === 'wider') return true
  const re = new RegExp(`(?<![\\p{L}])${item.correct.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}])`, 'u')
  return re.test(item.sentence)
})

const body = `import type { SpellingPair, SGroup, ConfusedItem, CommaSentence } from './spelling'

export const spellingPairsExtra: readonly SpellingPair[] = ${JSON.stringify(pairs, null, 2)}

export const sWordsExtra: readonly { word: string; group: SGroup; note: string }[] = ${JSON.stringify(sWordsExtra, null, 2)}

export const confusedWordsExtra: readonly ConfusedItem[] = ${JSON.stringify(confuse, null, 2)}

export const commaSentencesExtra: readonly CommaSentence[] = ${JSON.stringify(commaSentencesExtra, null, 2)}

export const syllableItemsExtra = ${JSON.stringify(syllableItemsExtra, null, 2)} as const
`

writeFileSync(new URL('../src/data/spelling.extra.ts', import.meta.url), body, 'utf8')
console.log('wrote sanitized spelling.extra.ts', pairs.length, 'pairs', confuse.length, 'confuse')

const { allTasks } = await import('../src/engine/generate')
const all = allTasks()
const seen = new Map<string, number>()
for (const t of all) seen.set(t.id, (seen.get(t.id) ?? 0) + 1)
const dups = [...seen.entries()].filter(([, n]) => n > 1)
console.log('tasks', all.length, 'unique', seen.size, 'dupIds', dups.length)
console.log(dups.slice(0, 40).map(([id, n]) => `${id}×${n}`).join('\n'))
