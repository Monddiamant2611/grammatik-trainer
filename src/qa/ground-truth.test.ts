import { describe, expect, it } from 'vitest'
import { adjectives } from '../data/adjectives'
import { capitalizationSentences } from '../data/capitalization'
import { syllableItems, spellingPairs } from '../data/spelling'
import { verbParadigms } from '../data/verbs'
import { correctAnswer, isCorrect } from '../engine/check'
import { allTasks } from '../engine/generate'
import { buildRound } from '../engine/select'
import { mulberry32 } from '../engine/random'
import type { Task } from '../engine/types'

function taskById(id: string): Task {
  const task = allTasks().find((item) => item.id === id)
  if (!task) throw new Error(`Aufgabe fehlt: ${id}`)
  return task
}

function chosen(id: string): string {
  const task = taskById(id)
  const answer = correctAnswer(task)
  if (task.interaction.kind !== 'choose' || answer.kind !== 'choice') throw new Error(`${id} ist keine Auswahl`)
  expect(isCorrect(task, answer)).toBe(true)
  return answer.id
}

function marked(id: string): string[] {
  const task = taskById(id)
  if (task.interaction.kind !== 'mark') throw new Error(`${id} ist keine Markierung`)
  return task.interaction.correctIds.map((tokenId) => {
    const token = task.interaction.kind === 'mark' ? task.interaction.tokens.find((item) => item.id === tokenId) : undefined
    if (!token) throw new Error(`${id}: Wort fehlt`)
    return token.text
  })
}

describe('Geprüfte Kerninhalte', () => {
  it('erkennt Nomen vollständig und behandelt Satzanfänge nicht als Nomen', () => {
    expect(marked('noun-mark-n15')).toEqual(['Unterricht'])
    expect(chosen('noun-kind-n15-Heute')).toBe('kein Nomen')
    expect(taskById('noun-kind-n15-Heute').feedbackCorrect).toMatch(/Satzanfang/)
    expect(chosen('noun-kind-n16-Schnell')).toBe('kein Nomen')
    for (const name of ['Anna', 'Berlin', 'Rhein', 'München']) expect(chosen(`noun-name-${name}`)).toBe('Nomen')
    expect(chosen('noun-abstract-Freude')).toBe('abstrakt')
    expect(chosen('noun-abstract-Mut')).toBe('abstrakt')
    expect(marked('noun-mark-n12')).toEqual(['Freundschaft', 'Vertrauen'])
  })

  it('bestimmt Fälle über die Frage und nicht über die Oberflächenform', () => {
    expect(chosen('case-question-c01-0')).toBe('Wer oder was?')
    expect(chosen('case-question-c02-0')).toBe('Wessen?')
    expect(chosen('case-question-c03-0')).toBe('Wem?')
    expect(chosen('case-question-c03-1')).toBe('Wen oder was?')
    expect(chosen('case-hund-dat')).toBe('dem Hund')
    expect(chosen('case-hund-akk')).toBe('den Hund')
    expect(chosen('case-article-Mann-dat-indef')).toBe('einem Mann')
    expect(chosen('case-article-Mann-akk-indef')).toBe('einen Mann')
    expect(chosen('case-article-Mann-nom-def')).toBe('der Mann')
    expect(chosen('case-article-Frau-nom-def')).toBe('die Frau')
    expect(chosen('case-article-Frau-gen-def')).toBe('der Frau')
    expect(chosen('case-article-Frau-dat-def')).toBe('der Frau')
    expect(chosen('case-id-c04-0')).toBe('Akkusativ')
    expect(chosen('case-id-c07-1')).toBe('Dativ')
    expect(taskById('case-id-c07-1').feedbackCorrect).toMatch(/Wem/)
    expect(chosen('case-prep-mit')).toBe('Dativ')
    expect(chosen('case-prep-durch')).toBe('Akkusativ')
    expect(taskById('case-frau-overlap').interaction).toMatchObject({ kind: 'bool', correct: true })
  })

  it('steigert regelmäßig, mit Umlaut und in den besonderen Formen', () => {
    const byPositive = Object.fromEntries(adjectives.map((item) => [item.positive, item]))
    expect(byPositive.schnell).toMatchObject({ comparative: 'schneller', superlative: 'am schnellsten' })
    expect(byPositive.groß).toMatchObject({ comparative: 'größer', superlative: 'am größten' })
    expect(byPositive.lang).toMatchObject({ comparative: 'länger', superlative: 'am längsten' })
    expect(byPositive.gut).toMatchObject({ comparative: 'besser', superlative: 'am besten' })
    expect(byPositive.viel).toMatchObject({ comparative: 'mehr', superlative: 'am meisten' })
    expect(byPositive.hoch).toMatchObject({ comparative: 'höher', superlative: 'am höchsten' })
    expect(chosen('adj-comp-a04')).toBe('größer')
    expect(chosen('adj-sup-a05')).toBe('am längsten')
    expect(chosen('adj-compare-v01')).toBe('als')
    expect(chosen('adj-compare-v02')).toBe('wie')
    expect(chosen('adj-fix-ae1')).toBe('Er ist schneller als ich.')
    expect(taskById('adj-compare-v01').feedbackCorrect).toMatch(/größer wie/)
    expect(taskById('adj-umlaut-a04').interaction).toMatchObject({ kind: 'bool', correct: true })
    expect(taskById('adj-regular-a23').interaction).toMatchObject({ kind: 'bool', correct: true })
  })

  it('konjugiert Personen, Vokalwechsel und die Perfektformen', () => {
    const nehmen = verbParadigms.find((item) => item.infinitive === 'nehmen')
    const lesen = verbParadigms.find((item) => item.infinitive === 'lesen')
    const helfen = verbParadigms.find((item) => item.infinitive === 'helfen')
    const sein = verbParadigms.find((item) => item.infinitive === 'sein')
    const haben = verbParadigms.find((item) => item.infinitive === 'haben')
    expect(nehmen?.forms.du).toBe('nimmst')
    expect(lesen?.forms.du).toBe('liest')
    expect(helfen?.forms.du).toBe('hilfst')
    expect(sein?.forms).toMatchObject({ ich: 'bin', du: 'bist', er: 'ist', wir: 'sind', ihr: 'seid', sie: 'sind' })
    expect(haben?.forms).toMatchObject({ ich: 'habe', du: 'hast', er: 'hat', wir: 'haben', ihr: 'habt', sie: 'haben' })
    expect(chosen('verb-form-nehmen-du')).toBe('nimmst')
    expect(chosen('verb-form-lesen-du')).toBe('liest')
    expect(chosen('verb-form-helfen-du')).toBe('hilfst')
    expect(taskById('verb-form-sein-sie').feedbackCorrect).toMatch(/Höflichkeitsform Sie/)
    expect(chosen('verb-past-sein')).toBe('war')
    expect(chosen('verb-past-haben')).toBe('hatte')
    expect(chosen('verb-part-gehen')).toBe('gegangen')
    expect(chosen('verb-aux-p05')).toBe('sein')
    expect(marked('verb-perfect-p01')).toEqual(['habe', 'gelernt'])
  })

  it('unterscheidet alle sechs Zeitformen, auch bei Bewegungsverben', () => {
    expect(chosen('tense-id-lernen-praesens')).toBe('Präsens')
    expect(chosen('tense-id-lernen-praeteritum')).toBe('Präteritum')
    expect(chosen('tense-id-lernen-perfekt')).toBe('Perfekt')
    expect(chosen('tense-id-lernen-plusquam')).toBe('Plusquamperfekt')
    expect(chosen('tense-id-lernen-futur1')).toBe('Futur I')
    expect(chosen('tense-id-lernen-futur2')).toBe('Futur II')
    expect(chosen('tense-transform-lernen-futur2')).toBe('Ich werde für die Klassenarbeit gelernt haben.')
    expect(chosen('tense-id-gehen-perfekt')).toBe('Perfekt')
    expect(chosen('tense-id-gehen-plusquam')).toBe('Plusquamperfekt')
    expect(chosen('tense-id-gehen-futur2')).toBe('Futur II')
    expect(taskById('tense-id-gehen-perfekt').stimulus).toBe('Mia ist zur Schule gegangen.')
    expect(taskById('tense-id-gehen-plusquam').stimulus).toBe('Mia war zur Schule gegangen.')
    expect(taskById('tense-id-gehen-futur2').stimulus).toBe('Mia wird zur Schule gegangen sein.')
    expect(marked('tense-parts-gehen-perfekt')).toEqual(['ist', 'gegangen'])
    expect(taskById('tense-line-gehen').interaction.kind).toBe('order')
  })

  it('bildet das Passiv mit worden und macht das Objekt zum Subjekt', () => {
    expect(chosen('voice-to-passive-v07')).toBe('Das Fenster wird von Mia geöffnet.')
    expect(taskById('voice-to-passive-v07').feedbackCorrect).toMatch(/wird zum Subjekt/)
    expect(chosen('voice-tense-v01')).toBe('Passiv Präsens')
    expect(chosen('voice-tense-v11')).toBe('Passiv Präteritum')
    expect(chosen('voice-tense-v13')).toBe('Passiv Perfekt')
    expect(chosen('voice-tense-v15')).toBe('Passiv Plusquamperfekt')
    expect(chosen('voice-tense-v16')).toBe('Passiv Futur I')
    expect(chosen('voice-futur2')).toBe('Passiv Futur II')
    expect(chosen('voice-fix-ve2')).toBe('Der Ball ist geschossen worden.')
    expect(taskById('voice-fix-ve2').feedbackCorrect).toMatch(/nicht geworden/)
    expect(taskById('voice-build-v13').interaction).toMatchObject({ correctIds: ['ist', 'aufgeräumt', 'worden'] })
    expect(marked('voice-tap-ve2')).toEqual(['geworden'])
  })

  it('trennt Nomen, Namen, Satzanfänge und die kritischen Kontraste', () => {
    const montags = capitalizationSentences.find((item) => item.id === 'k16')
    const deutsch = capitalizationSentences.find((item) => item.id === 'k18')
    const heute = capitalizationSentences.find((item) => item.id === 'k02')
    expect(montags?.nouns).not.toContain('Montags')
    expect(chosen('cap-reason-k16-0')).toBe('Satzanfang')
    expect(taskById('cap-reason-k16-0').feedbackCorrect).toMatch(/Montag/)
    expect(deutsch?.tokens.find((token) => token.faulty === 'deutsche')?.correct).toBe('deutsche')
    expect(chosen('cap-reason-k06-3')).toBe('Sprache')
    expect(heute?.tokens[0]).toMatchObject({ correct: 'Heute', reason: 'sentence' })
    expect(marked('cap-nouns-k02')).toEqual(['Lena', 'Freundin'])
    expect(marked('cap-nouns-k16')).not.toContain('Montags')
    expect(chosen('cap-compare-k13')).toMatch(/^Ostern/)
    expect(chosen('cap-reason-k14-1')).toBe('Monat')
    expect(chosen('cap-reason-k15-1')).toBe('Jahreszeit')
    expect(chosen('cap-reason-k09-2')).toBe('Anrede')
    expect(chosen('cap-reason-k07-1')).toBe('Eigenname')
  })

  it('prüft nur die vorhandenen Rechtschreibbereiche und trennt Fenster als Fen-ster', () => {
    const topics = new Set(spellingPairs.map((item) => item.topic))
    for (const topic of ['ä oder e', 'doppelter Mitlaut', 'doppelter Selbstlaut', '-ig oder -lich', 'getrennt oder zusammen', 'ie oder i', 'häufig falsch']) {
      expect(topics.has(topic), topic).toBe(true)
    }
    expect(chosen('spell-ae1')).toBe('Hände')
    expect(chosen('spell-s-Fluss')).toMatch(/^ss/)
    expect(chosen('spell-s-Straße')).toMatch(/^ß/)
    expect(chosen('spell-s-Haus')).toMatch(/^s,/)
    expect(chosen('spell-confuse-cw3')).toBe('dass')
    expect(chosen('spell-confuse-cw5')).toBe('seid')
    expect(chosen('spell-confuse-cw7')).toBe('wird')
    expect(chosen('spell-confuse-cw9')).toBe('wider')
    expect(chosen('spell-confuse-cw11')).toBe('war')
    expect(chosen('spell-confuse-cw13')).toBe('im')
    expect(syllableItems.find((item) => item.word === 'Fenster')?.parts).toEqual(['Fen', 'ster'])
    expect(taskById('spell-syllable-Fenster').interaction).toMatchObject({ correctIds: ['Fen', 'ster'] })
    expect(taskById('spell-comma-kom1').interaction).toMatchObject({ kind: 'commas', correctSlots: [2] })
    expect(taskById('spell-comma-und').interaction).toMatchObject({ kind: 'bool', correct: false })
  })

  it('mischt Bereiche und Aufgabentypen ohne direkte Wiederholung', () => {
    const pool = allTasks()
    for (let seed = 1; seed <= 8; seed += 1) {
      const round = buildRound({
        pool,
        count: 8,
        recentIds: ['noun-mark-n15', 'tense-id-lernen-praesens'],
        preferred: new Set([1, 2, 3]),
        rng: mulberry32(seed),
        varyArea: true,
      })
      expect(new Set(round.map((task) => task.area)).size).toBeGreaterThan(1)
      expect(round.map((task) => task.id)).not.toContain('noun-mark-n15')
      expect(round.map((task) => task.id)).not.toContain('tense-id-lernen-praesens')
      for (let index = 1; index < round.length; index += 1) {
        expect(round[index]?.type).not.toBe(round[index - 1]?.type)
        expect(round[index]?.area).not.toBe(round[index - 1]?.area)
        expect(round[index]?.id).not.toBe(round[index - 1]?.id)
      }
    }
  })
})
