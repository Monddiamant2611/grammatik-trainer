import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const path = join(import.meta.dirname, '..', 'src', 'data', 'spelling.extra.ts')
let src = readFileSync(path, 'utf8')

// Fix man/Man case gap
src = src.replace(
  /correct: 'man',\s*sentence: 'Man darf hier nicht rauchen\.'/,
  "correct: 'man',\n    sentence: 'Hier darf man nicht rauchen.'",
)

writeFileSync(path, src, 'utf8')

// Dynamic check after import
const mod = await import('../src/data/spelling.extra.ts')
const pairs = mod.spellingPairsExtra as { id: string; correct: string; wrong: string }[]
const confuse = mod.confusedWordsExtra as { id: string; correct: string; sentence: string }[]

console.log('pairs', pairs.length)
const same = pairs.filter((p) => p.wrong === p.correct)
console.log('same wrong/correct', same.map((p) => p.id).join(', ') || 'none')

for (const item of confuse) {
  if (item.correct === 'wider') continue
  const re = new RegExp(`(?<![\\p{L}])${item.correct.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}])`, 'u')
  if (!re.test(item.sentence)) console.log('NO GAP', item.id, item.correct, item.sentence)
}
