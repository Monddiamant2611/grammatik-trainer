import { describe, expect, it } from 'vitest'
import { AREA_IDS } from '../domain/areas'
import { correctAnswer, isCorrect, wrongAnswer } from '../engine/check'
import { practiceLevel } from '../engine/difficulty'
import { allTasks } from '../engine/generate'
import { buildRound } from '../engine/select'
import { mulberry32 } from '../engine/random'

describe('Aufgaben aus den geprüften Pools', () => {
  const tasks = allTasks()

  it('erzeugt für jeden Bereich mehrere Typen und alle Schwierigkeitsstufen', () => {
    expect(new Set(tasks.map((task) => task.id)).size).toBe(tasks.length)
    for (const area of AREA_IDS) {
      const areaTasks = tasks.filter((task) => task.area === area)
      const types = new Set(areaTasks.map((task) => task.type))
      const levels = new Set(areaTasks.map((task) => task.difficulty))
      expect(areaTasks.length, area).toBeGreaterThan(12)
      expect(types.size, area).toBeGreaterThanOrEqual(3)
      expect(levels, area).toEqual(new Set([1, 2, 3]))
    }
  })

  it('akzeptiert die hinterlegte Lösung und weist eine falsche Antwort ab', () => {
    const problems: string[] = []
    for (const task of tasks) {
      if (!isCorrect(task, correctAnswer(task))) problems.push(`${task.id}: Lösung gilt nicht`)
      const wrong = wrongAnswer(task)
      if (!wrong) problems.push(`${task.id}: keine falsche Antwort`)
      else if (isCorrect(task, wrong)) problems.push(`${task.id}: falsche Antwort gilt als richtig`)
      if (task.interaction.kind === 'choose') {
        const ids = task.interaction.options.map((option) => option.id)
        if (new Set(ids).size !== ids.length) problems.push(`${task.id}: doppelte Optionen`)
        if (!ids.includes(task.interaction.correctId)) problems.push(`${task.id}: Lösung nicht wählbar`)
      }
      if (task.interaction.kind === 'mark') {
        const selectable = new Set(task.interaction.tokens.filter((token) => token.selectable).map((token) => token.id))
        if (task.interaction.correctIds.some((id) => !selectable.has(id))) problems.push(`${task.id}: Markierung zeigt auf kein Wort`)
      }
    }
    expect(problems).toEqual([])
  })

  it('lässt den Übungsstand nach drei richtigen Aufgaben niedrig', () => {
    expect(practiceLevel(3, 3)).toBeGreaterThan(0)
    expect(practiceLevel(3, 3)).toBeLessThan(40)
    expect(practiceLevel(0, 0)).toBe(0)
  })

  it('setzt im gemischten Rundgang keine gleichen Aufgabentypen direkt hintereinander', () => {
    for (let seed = 1; seed <= 12; seed += 1) {
      const round = buildRound({
        pool: tasks,
        count: 10,
        recentIds: [],
        preferred: new Set([1, 2, 3]),
        rng: mulberry32(seed),
        varyArea: true,
      })
      expect(round).toHaveLength(10)
      for (let index = 1; index < round.length; index += 1) {
        expect(round[index]?.type).not.toBe(round[index - 1]?.type)
      }
    }
  })
})
