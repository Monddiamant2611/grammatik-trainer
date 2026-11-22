import { spawnSync } from 'node:child_process'

const code = `
import { tasksFor, allTasks } from './src/engine/generate.ts'
import { AREA_IDS } from './src/domain/areas.ts'
const all = allTasks()
console.log('total', all.length, 'unique', new Set(all.map(t => t.id)).size)
for (const a of AREA_IDS) console.log(a, tasksFor(a).length)
`

const result = spawnSync('npx', ['tsx', '-e', code], { encoding: 'utf8', shell: true, cwd: process.cwd() })
process.stdout.write(result.stdout || '')
process.stderr.write(result.stderr || '')
process.exit(result.status ?? 1)
