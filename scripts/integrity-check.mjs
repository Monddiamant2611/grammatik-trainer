/**
 * Integrity + 20-round simulation for all learning paths.
 * Run: node scripts/integrity-check.mjs
 * Or via: npm run integrity
 */
import { createRequire } from 'node:module'
import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

async function main() {
  // Prefer vitest/tsx path via dynamic import of compiled checks through tsx
  const { spawnSync } = await import('node:child_process')
  const result = spawnSync(
    'npx',
    [
      'tsx',
      '-e',
      `
import { AREA_IDS } from './src/domain/areas.ts'
import { allTasks, tasksFor } from './src/engine/generate.ts'
import { buildRound } from './src/engine/select.ts'
import { mulberry32 } from './src/engine/random.ts'
import { emptyHistory, withHistory } from './src/progress/model.ts'
import { isCorrect, correctAnswer, wrongAnswer } from './src/engine/check.ts'

const all = allTasks()
const ids = all.map((t) => t.id)
const unique = new Set(ids)
console.log('TOTAL', all.length)
console.log('UNIQUE', unique.size)
if (unique.size !== all.length) {
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i)
  console.error('DUPLICATES', [...new Set(dup)].slice(0, 20))
  process.exit(1)
}

let ok = true
for (const area of AREA_IDS) {
  const pool = tasksFor(area)
  const d1 = pool.filter((t) => t.difficulty === 1).length
  const d2 = pool.filter((t) => t.difficulty === 2).length
  const d3 = pool.filter((t) => t.difficulty === 3).length
  console.log(area, pool.length, 'diff', d1, d2, d3)
  if (pool.length < 500) {
    console.error('FAIL pool size', area, pool.length)
    ok = false
  }
  let history = emptyHistory()
  const seen = new Set()
  for (let r = 0; r < 20; r++) {
    const round = buildRound({
      pool,
      count: 20,
      recentIds: history.byArea[area] ?? [],
      preferred: new Set([1, 2, 3]),
      rng: mulberry32(5000 + r * 31 + AREA_IDS.indexOf(area)),
    })
    if (round.length !== 20) {
      console.error('FAIL round length', area, r + 1, round.length)
      ok = false
      break
    }
    for (const task of round) {
      if (seen.has(task.id)) {
        console.error('FAIL reuse', area, 'round', r + 1, task.id)
        ok = false
      }
      seen.add(task.id)
      if (!isCorrect(task, correctAnswer(task))) {
        console.error('FAIL ground truth', task.id)
        ok = false
      }
      const w = wrongAnswer(task)
      if (!w || isCorrect(task, w)) {
        console.error('FAIL wrong answer', task.id)
        ok = false
      }
    }
    history = withHistory(history, area, round.map((t) => t.id))
  }
  console.log(area, '20-round unique', seen.size)
}

if (!ok) process.exit(1)
console.log('INTEGRITY OK')
`,
    ],
    { cwd: process.cwd(), encoding: 'utf8', shell: true },
  )
  process.stdout.write(result.stdout ?? '')
  process.stderr.write(result.stderr ?? '')
  process.exit(result.status ?? 1)
}

main()
