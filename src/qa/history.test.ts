import { describe, expect, it } from 'vitest'
import { AREA_IDS } from '../domain/areas'
import { allTasks, tasksFor } from '../engine/generate'
import { mulberry32 } from '../engine/random'
import { buildRound } from '../engine/select'
import { emptyHistory, withHistory } from '../progress/model'

describe('History und Rundengenerierung', () => {
  it('erlaubt denselben Typ höchstens zweimal hintereinander', () => {
    const tasks = allTasks()
    for (let seed = 1; seed <= 20; seed += 1) {
      const round = buildRound({
        pool: tasks,
        count: 20,
        recentIds: [],
        preferred: new Set([1, 2, 3]),
        rng: mulberry32(seed),
        varyArea: true,
      })
      expect(round.length).toBeGreaterThan(0)
      let streak = 1
      for (let index = 1; index < round.length; index += 1) {
        if (round[index]?.type === round[index - 1]?.type) streak += 1
        else streak = 1
        expect(streak).toBeLessThanOrEqual(2)
      }
    }
  })

  it('vermeidet ID-Wiederholung über 20 Runden à 20 Aufgaben bis zur Erschöpfung', () => {
    for (const area of AREA_IDS) {
      const pool = tasksFor(area)
      expect(pool.length, area).toBeGreaterThanOrEqual(500)
      let history = emptyHistory()
      const seen = new Set<string>()
      for (let round = 0; round < 20; round += 1) {
        const recent = history.byArea[area] ?? []
        const tasks = buildRound({
          pool,
          count: 20,
          recentIds: recent,
          preferred: new Set([1, 2, 3]),
          rng: mulberry32(1000 + round * 17 + area.length),
        })
        expect(tasks.length, `${area} Runde ${round + 1}`).toBe(20)
        const ids = tasks.map((task) => task.id)
        if (pool.length >= 400) {
          for (const id of ids) {
            expect(seen.has(id), `${area} Wiederholung ${id} in Runde ${round + 1}`).toBe(false)
            seen.add(id)
          }
        }
        history = withHistory(history, area, ids)
      }
      expect(seen.size, area).toBe(400)
    }
  })

  it('mischt Schwierigkeiten ungefähr 30/45/25', () => {
    const pool = tasksFor('nouns')
    const round = buildRound({
      pool,
      count: 20,
      recentIds: [],
      preferred: new Set([1, 2, 3]),
      rng: mulberry32(42),
    })
    const counts = { 1: 0, 2: 0, 3: 0 }
    for (const task of round) counts[task.difficulty] += 1
    expect(counts[1]).toBeGreaterThanOrEqual(4)
    expect(counts[2]).toBeGreaterThanOrEqual(6)
    expect(counts[3]).toBeGreaterThanOrEqual(3)
  })
})
