import type { Task } from './types'

export interface RoundRequest {
  pool: readonly Task[]
  count: number
  recentIds: readonly string[]
  preferred: ReadonlySet<number>
  rng: () => number
  varyArea?: boolean
}

export function buildRound(request: RoundRequest): Task[] {
  const recent = new Set(request.recentIds.slice(-16))
  const picked: Task[] = []
  const used = new Set<string>()
  let lastType = ''
  let lastArea = ''

  while (picked.length < request.count && used.size < request.pool.length) {
    const fresh = request.pool.filter((item) => !used.has(item.id) && item.type !== lastType)
    const typeSafe = fresh.length > 0 ? fresh : request.pool.filter((item) => !used.has(item.id))
    if (typeSafe.length === 0) break
    const areaSafe = request.varyArea
      ? typeSafe.filter((item) => item.area !== lastArea)
      : typeSafe
    const base = areaSafe.length > 0 ? areaSafe : typeSafe
    const unseen = base.filter((item) => !recent.has(item.id))
    const source = unseen.length > 0 ? unseen : base
    const leveled = source.filter((item) => request.preferred.has(item.difficulty))
    const bucket = leveled.length > 0 ? leveled : source
    const index = Math.floor(request.rng() * bucket.length)
    const next = bucket[index]
    if (!next) break
    picked.push(next)
    used.add(next.id)
    lastType = next.type
    lastArea = next.area
  }
  return picked
}
