import type { Difficulty, Task } from './types'

export interface RoundRequest {
  pool: readonly Task[]
  count: number
  /** Previously seen task IDs (oldest → newest). Prefer unseen; on exhaustion reuse LRU (oldest first). */
  recentIds: readonly string[]
  preferred: ReadonlySet<number>
  rng: () => number
  varyArea?: boolean
  /** Target difficulty shares for the round. Defaults to ~30/45/25. */
  difficultyMix?: Readonly<Record<Difficulty, number>>
}

const DEFAULT_MIX: Record<Difficulty, number> = { 1: 0.3, 2: 0.45, 3: 0.25 }

export function buildRound(request: RoundRequest): Task[] {
  const mix = request.difficultyMix ?? DEFAULT_MIX
  const targets = difficultyTargets(request.count, mix)
  const historyOrder = request.recentIds
  const historyRank = new Map(historyOrder.map((id, index) => [id, index]))
  const picked: Task[] = []
  const used = new Set<string>()
  let lastType = ''
  let lastTypeCount = 0
  let lastArea = ''

  while (picked.length < request.count && used.size < request.pool.length) {
    const needed = neededDifficulty(picked, targets)
    const fresh = request.pool.filter((item) => !used.has(item.id))
    if (fresh.length === 0) break

    const typeSafe = fresh.filter((item) => {
      if (item.type !== lastType) return true
      return lastTypeCount < 2
    })
    const typePool = typeSafe.length > 0 ? typeSafe : fresh

    const areaSafe = request.varyArea
      ? typePool.filter((item) => item.area !== lastArea)
      : typePool
    const base = areaSafe.length > 0 ? areaSafe : typePool

    const unseen = base.filter((item) => !historyRank.has(item.id))
    const source = unseen.length > 0
      ? unseen
      : [...base].sort((a, b) => (historyRank.get(a.id) ?? -1) - (historyRank.get(b.id) ?? -1))

    const leveled = needed
      ? source.filter((item) => item.difficulty === needed)
      : source.filter((item) => request.preferred.has(item.difficulty))
    const bucket = leveled.length > 0 ? leveled : source
    const index = Math.floor(request.rng() * bucket.length)
    const next = bucket[index]
    if (!next) break
    picked.push(next)
    used.add(next.id)
    if (next.type === lastType) lastTypeCount += 1
    else {
      lastType = next.type
      lastTypeCount = 1
    }
    lastArea = next.area
  }
  return picked
}

function difficultyTargets(count: number, mix: Readonly<Record<Difficulty, number>>): Record<Difficulty, number> {
  const raw1 = Math.round(count * mix[1])
  const raw2 = Math.round(count * mix[2])
  let raw3 = count - raw1 - raw2
  if (raw3 < 0) {
    return { 1: raw1 + raw3, 2: raw2, 3: 0 }
  }
  return { 1: raw1, 2: raw2, 3: raw3 }
}

function neededDifficulty(picked: readonly Task[], targets: Record<Difficulty, number>): Difficulty | null {
  const counts: Record<Difficulty, number> = { 1: 0, 2: 0, 3: 0 }
  for (const item of picked) counts[item.difficulty] += 1
  const remaining: Difficulty[] = ([1, 2, 3] as Difficulty[]).filter((level) => counts[level] < targets[level])
  if (remaining.length === 0) return null
  return remaining[0] ?? null
}
