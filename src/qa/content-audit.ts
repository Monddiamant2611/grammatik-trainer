import { caseGroupCount } from '../data/case-contrast'
import { AREA_IDS, type AreaId } from '../domain/areas'
import { allTasks } from '../engine/generate'
import { rngFromString, shuffleVisible } from '../engine/random'
import { modules } from '../foundations/content'
import type { Task } from '../engine/types'

export interface PositionReport {
  size: number
  counts: number[]
  shares: number[]
}

export function positionReports(): PositionReport[] {
  const buckets = new Map<number, number[]>()
  for (const task of allTasks()) {
    const interaction = task.interaction
    if (interaction.kind !== 'choose' || interaction.options.length < 2) continue
    const order = shuffleVisible(interaction.options, rngFromString(task.id))
    const index = order.findIndex((option) => option.id === interaction.correctId)
    const counts = buckets.get(order.length) ?? Array.from({ length: order.length }, () => 0)
    if (index >= 0) counts[index] += 1
    buckets.set(order.length, counts)
  }
  return [...buckets.entries()]
    .sort((left, right) => left[0] - right[0])
    .map(([size, counts]) => {
      const total = counts.reduce((sum, count) => sum + count, 0)
      return {
        size,
        counts,
        shares: counts.map((count) => (total === 0 ? 0 : (count / total) * 100)),
      }
    })
}

export function weakCaseContexts(): Task[] {
  return allTasks().filter((task) => {
    if (task.type !== 'case-identify' || !task.stimulus) return false
    const needed = task.difficulty === 1 ? 2 : 3
    return caseGroupCount(task.stimulus) < needed
  })
}

export function repeatedCasePatterns(limit = 8): { pattern: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const task of allTasks()) {
    if (task.type !== 'case-identify' || !task.stimulus) continue
    const pattern = task.stimulus
      .replace(/\b[A-ZÄÖÜ][a-zäöü]+\b/g, 'Name')
      .replace(/\b(der|die|das|dem|den|des|ein|eine|einem|einen|einer|eines)\b/giu, 'Artikel')
    counts.set(pattern, (counts.get(pattern) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([pattern, count]) => ({ pattern, count }))
    .sort((left, right) => right.count - left.count)
    .slice(0, limit)
}

export interface DensityFlag {
  area: AreaId
  id: string
  freshTerms: number
  pairs: number
}

export function denseTutorialSteps(): DensityFlag[] {
  const flags: DensityFlag[] = []
  for (const module of modules) {
    const seen = new Set<string>()
    for (const step of module.steps) {
      const terms = [
        step.concept?.term,
        step.concept?.also,
        ...(step.concept?.pairs?.map((pair) => pair.term) ?? []),
      ].filter((term): term is string => Boolean(term))
      const fresh = terms.filter((term) => !seen.has(term))
      for (const term of terms) seen.add(term)
      const review = step.id.includes('review')
      const pairs = step.concept?.pairs?.length ?? 0
      if (!review && (fresh.length > 3 || pairs > 2)) {
        flags.push({ area: module.area, id: step.id, freshTerms: fresh.length, pairs })
      }
    }
  }
  return flags
}

export function consolidationCount(): number {
  return modules.reduce((sum, module) => sum + module.steps.filter((step) => step.id.includes('-u')).length, 0)
}

export function auditSummary(): string[] {
  const lines: string[] = []
  for (const report of positionReports()) {
    const shares = report.shares.map((share) => share.toFixed(1)).join(' / ')
    lines.push(`POSITIONEN ${report.size} ${shares}`)
  }
  lines.push(`KASUS-KONTEXT ${weakCaseContexts().length}`)
  const patterns = repeatedCasePatterns(3)
  for (const pattern of patterns) lines.push(`MUSTER ${pattern.count} ${pattern.pattern}`)
  lines.push(`TUTORIAL-DICHTE ${denseTutorialSteps().length}`)
  lines.push(`KONSOLIDIERUNG ${consolidationCount()}`)
  for (const area of AREA_IDS) {
    const count = modules.find((module) => module.area === area)?.steps.length ?? 0
    lines.push(`SCHRITTE ${area} ${count}`)
  }
  return lines
}
