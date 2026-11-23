import { describe, expect, it } from 'vitest'
import { AREA_IDS } from '../domain/areas'
import { buildExam, examPercent, examRating, type ExamLevel } from '../engine/exam'
import { mulberry32 } from '../engine/random'
import { summarizeExam } from '../progress/exams'

const levels: ExamLevel[] = ['leicht', 'mittel', 'schwierig']

describe('Prüfungsauswahl', () => {
  it('zieht feste Prüfungslängen ohne doppelte Aufgaben', () => {
    for (const count of [10, 20, 30]) {
      const round = buildExam({
        areas: [...AREA_IDS],
        level: 'mittel',
        count,
        rng: mulberry32(count),
      })
      expect(round).toHaveLength(count)
      expect(new Set(round.map((task) => task.id)).size).toBe(count)
    }
  })

  it('mischt Aufgabentypen und hält die Schwierigkeitsanteile', () => {
    const expected = {
      leicht: { 1: 14, 2: 6, 3: 0 },
      mittel: { 1: 4, 2: 12, 3: 4 },
      schwierig: { 1: 2, 2: 7, 3: 11 },
    }
    for (const level of levels) {
      const round = buildExam({
        areas: [...AREA_IDS],
        level,
        count: 20,
        rng: mulberry32(11),
      })
      const counts = { 1: 0, 2: 0, 3: 0 }
      let streak = 1
      for (let index = 0; index < round.length; index += 1) {
        const task = round[index]
        if (!task) continue
        counts[task.difficulty] += 1
        if (index > 0 && task.type === round[index - 1]?.type) streak += 1
        else streak = 1
        expect(streak).toBeLessThanOrEqual(2)
      }
      expect(counts).toEqual(expected[level])
    }
  })

  it('rechnet Prozent und eine neutrale Rückmeldung', () => {
    expect(examPercent(16, 20)).toBe(80)
    expect(examRating(100)).toBe('Sehr sicher')
    expect(examRating(90)).toBe('Sehr sicher')
    expect(examRating(89)).toBe('Weitgehend sicher')
    expect(examRating(75)).toBe('Weitgehend sicher')
    expect(examRating(60)).toBe('Teilweise sicher')
    expect(examRating(59)).toBe('Noch Übungsbedarf')
    const summary = summarizeExam({
      level: 'schwierig',
      areas: ['tenses', 'voice'],
      results: [
        { area: 'tenses', correct: true },
        { area: 'tenses', correct: false },
        { area: 'voice', correct: false },
      ],
    })
    expect(summary.correct).toBe(1)
    expect(summary.percent).toBe(33)
    expect(summary.weakAreas).toEqual(['tenses', 'voice'])
    expect(summary.byArea.tenses).toEqual({ total: 2, correct: 1 })
  })
})
