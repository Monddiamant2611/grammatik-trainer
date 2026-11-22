import { allTasks } from '../src/engine/generate'
import { spellingPairs } from '../src/data/spelling'

const all = allTasks()
const seen = new Map<string, string>()
const dups: string[] = []
for (const t of all) {
  if (seen.has(t.id)) dups.push(t.id)
  else seen.set(t.id, t.area)
}
console.log('total', all.length, 'unique', seen.size, 'dupIds', new Set(dups).size)
console.log([...new Set(dups)].slice(0, 50).join('\n'))

console.log('--- bad spelling pairs (wrong===correct) ---')
for (const p of spellingPairs) {
  if (p.wrong === p.correct) console.log(p.id, p.correct)
}
