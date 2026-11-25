import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MarkedStimulus } from '../components/MarkedStimulus'
import { allTasks } from '../engine/generate'
import { contentFlags, flagCounts } from './content-flags'

const tasks = allTasks()
const byId = (id: string) => {
  const task = tasks.find((item) => item.id === id)
  if (!task) throw new Error(id)
  return task
}

describe('fachlicher Audit', () => {
  it('markiert die Zielwortgruppe im Kasussatz', () => {
    const task = byId('case-question-c41-0')
    expect(task.stimulus).toContain('Wir geben den Gästen Platz')
    expect(task.target?.surface).toBe('den Gästen')
    expect(task?.prompt).toMatch(/markierten Wortgruppe/)
    expect(task?.prompt).not.toMatch(/diesem Kasus/)
    render(<MarkedStimulus text={task?.stimulus ?? ''} target={task?.target?.surface} />)
    expect(screen.getByText('den Gästen').tagName).toBe('MARK')
  })

  it('zeigt die Umlautlösung nicht schon im Stimulus', () => {
    const task = byId('adj-umlaut-a61')
    expect(task.prompt).toMatch(/Komparativform/)
    expect(task.stimulus ?? '').not.toContain('gerader')
    expect(task.stimulus ?? '').not.toContain('→')
    expect(task.interaction).toMatchObject({ kind: 'choose', correctId: 'gerader' })
  })

  it('verwendet ab der mittleren Stufe die Fachbezeichnung der Person', () => {
    const medium = byId('verb-form-reparieren-du')
    expect(medium.difficulty).toBeGreaterThanOrEqual(2)
    expect(medium.prompt).toContain('2. Person Singular')
    expect(medium.prompt).not.toMatch(/für „du“/)
    const hard = byId('verb-form-sein-du')
    expect(hard.prompt).toContain('2. Person Singular')
    expect(hard.prompt).toMatch(/Präsens/)
  })

  it('fragt Person und Numerus mit Fachbezeichnungen und Kontext', () => {
    const task = byId('verb-person-lesen-ich')
    expect(task.interaction).toMatchObject({ kind: 'choose', correctId: '1. Person Singular' })
    if (task.interaction.kind === 'choose') {
      expect(task.interaction.options.map((option) => option.text)).toEqual([
        '1. Person Singular',
        '2. Person Singular',
        '3. Person Singular',
        '1. Person Plural',
        '2. Person Plural',
        '3. Person Plural',
      ])
    }
    expect(task.target?.surface).toBe('lese')
    const shared = byId('verb-person-machen-ihr')
    expect(shared.target?.surface).toBe('macht')
    expect(shared.stimulus).toMatch(/Ihr macht/)
    expect(shared.interaction).toMatchObject({ correctId: '2. Person Plural' })
  })

  it('lässt Prüfungsmarkierung zu und meldet keine offenen Kernflags', () => {
    const guests = byId('case-question-c41-0')
    expect(guests.target?.surface).toBe('den Gästen')
    expect(flagCounts(contentFlags(tasks))).toEqual({
      AMBIGUOUS_TARGET: 0,
      ANSWER_REVEALED: 0,
      QUESTION_ANSWER_MISMATCH: 0,
      AMBIGUOUS_PERSON_NUMBER: 0,
      WEAK_DISTRACTORS: 0,
      TOO_EASY_FOR_DIFFICULTY: 0,
      BOOLEAN_LOW_VALUE: 0,
      MISSING_CONTEXT: 0,
      MISSING_TARGET_MARK: 0,
    })
  })
})
