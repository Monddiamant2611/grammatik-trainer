import type { AreaId } from '../domain/areas'
import { adjectives, adjectiveErrors, comparisonSentences } from '../data/adjectives'
import {
  accusativePrepositions,
  articleParadigms,
  caseLabels,
  caseQuestions,
  caseSentences,
  dativePrepositions,
  hundParadigm,
  prepositionExamples,
  type CaseId,
} from '../data/cases'
import { capitalizationSentences, reasonLabels } from '../data/capitalization'
import {
  articleProbes,
  capitalizationPairs,
  concreteAbstract,
  nounCategories,
  nounSentences,
  pluralProbes,
  properNames,
} from '../data/nouns'
import { commaSentences, confusedWords, sWords, spellingPairs, syllableItems } from '../data/spelling'
import { tenseIds, tenseLabels, tensePools, recognitionSentences, timelineLabels, timelineOrder } from '../data/tenses'
import { gapSentences, participlePairs, perfectItems, persons, preteriteForms, verbParadigms, type Person } from '../data/verbs'
import { voiceErrors, voicePairs, voicePatternSentence, voiceTenseLabels, type VoiceTense } from '../data/voice'
import type { ChoiceOption, Difficulty, Task } from './types'
import { distinct, idsForWords, listWords, renderCommas, renderToggle, requireWord, wordTokens } from './text'

const caseIds: CaseId[] = ['nom', 'gen', 'dat', 'akk']
const voiceTenseIds: VoiceTense[] = ['praesens', 'praeteritum', 'perfekt', 'plusquam', 'futur1', 'futur2']

function options(texts: readonly string[]): ChoiceOption[] {
  return distinct(texts).map((text) => ({ id: text, text }))
}

function task(input: Task): Task {
  if (!input.feedbackCorrect.trim() || !input.feedbackIncorrect.trim()) {
    throw new Error(`Feedback fehlt: ${input.id}`)
  }
  return input
}

function maxDifficulty(base: Difficulty, floor: Difficulty): Difficulty {
  return (Math.max(base, floor) as Difficulty)
}

export function buildNounTasks(): Task[] {
  const tasks: Task[] = []
  for (const item of nounSentences) {
    const tokens = wordTokens(item.sentence)
    const correctIds = idsForWords(tokens, item.nouns, item.id)
    for (const trap of item.traps) requireWord(item.sentence, trap, item.id)
    const trapNote = item.traps.length > 0
      ? ` ${listWords(item.traps)} ${item.traps.length === 1 ? 'ist' : 'sind'} kein Nomen.`
      : ''
    const feedback = `Nomen bezeichnen Personen, Tiere, Dinge, Pflanzen, Orte, Gefühle oder Namen. Hier sind das ${listWords(item.nouns)}.${trapNote}`
    tasks.push(task({
      id: `noun-mark-${item.id}`,
      area: 'nouns',
      type: 'noun-mark',
      typeLabel: 'Nomen markieren',
      difficulty: item.difficulty,
      tags: ['nomen'],
      prompt: 'Markiere alle Nomen.',
      stimulus: item.sentence,
      interaction: { kind: 'mark', tokens, correctIds, mode: 'multi' },
      feedbackCorrect: feedback,
      feedbackIncorrect: feedback,
    }))
    if (item.text) {
      tasks.push(task({
        id: `noun-text-${item.id}`,
        area: 'nouns',
        type: 'noun-text',
        typeLabel: 'Nomen im Text',
        difficulty: maxDifficulty(item.difficulty, 2),
        tags: ['nomen', 'text'],
        prompt: 'Markiere alle Nomen in diesem Text.',
        stimulus: item.sentence,
        interaction: { kind: 'mark', tokens, correctIds, mode: 'multi' },
        feedbackCorrect: feedback,
        feedbackIncorrect: feedback,
      }))
    }
    const judged = distinct([...item.nouns, ...item.traps])
    for (const word of judged) {
      const isNoun = item.nouns.includes(word)
      const because = isNoun
        ? `„${word}“ bezeichnet eine Person, ein Ding, einen Ort, ein Gefühl oder einen Namen. Deshalb ist es ein Nomen.`
        : `„${word}“ steht hier groß, weil es am Satzanfang steht. Großschreibung allein macht es nicht zum Nomen.`
      tasks.push(task({
        id: `noun-kind-${item.id}-${word}`,
        area: 'nouns',
        type: 'noun-kind',
        typeLabel: 'Nomen oder kein Nomen',
        difficulty: item.traps.includes(word) ? 3 : item.difficulty,
        tags: ['nomen', 'abgrenzung'],
        prompt: `Ist „${word}“ in diesem Satz ein Nomen?`,
        stimulus: item.sentence,
        interaction: {
          kind: 'choose',
          layout: 'pair',
          options: options(['Nomen', 'kein Nomen']),
          correctId: isNoun ? 'Nomen' : 'kein Nomen',
        },
        feedbackCorrect: because,
        feedbackIncorrect: because,
      }))
    }
  }

  for (const probe of articleProbes) {
    tasks.push(task({
      id: `noun-article-${probe.word}`,
      area: 'nouns',
      type: 'noun-article',
      typeLabel: 'Artikelprobe',
      difficulty: 1,
      tags: ['nomen', 'artikel'],
      prompt: 'Welche Artikelprobe passt?',
      stimulus: probe.word,
      interaction: { kind: 'choose', layout: 'stack', options: options(probe.options), correctId: probe.correct },
      feedbackCorrect: `Vor „${probe.word}“ passt ${probe.correct}. Vor viele Nomen kann man einen Artikel setzen.`,
      feedbackIncorrect: `Vor „${probe.word}“ passt ${probe.correct}. Vor viele Nomen kann man einen Artikel setzen.`,
    }))
  }

  const plurals = pluralProbes.map((item) => item.plural)
  for (const probe of pluralProbes) {
    tasks.push(task({
      id: `noun-plural-${probe.singular}`,
      area: 'nouns',
      type: 'noun-plural',
      typeLabel: 'Mehrzahlprobe',
      difficulty: 1,
      tags: ['nomen', 'mehrzahl'],
      prompt: `Welche Mehrzahl gehört zu „${probe.singular}“?`,
      interaction: { kind: 'choose', layout: 'stack', options: options(plurals), correctId: probe.plural },
      feedbackCorrect: `Die Mehrzahl von ${probe.singular} heißt ${probe.plural}. Viele Nomen können in Einzahl und Mehrzahl stehen.`,
      feedbackIncorrect: `Die Mehrzahl von ${probe.singular} heißt ${probe.plural}. Viele Nomen können in Einzahl und Mehrzahl stehen.`,
    }))
  }

  for (const item of concreteAbstract) {
    tasks.push(task({
      id: `noun-abstract-${item.word}`,
      area: 'nouns',
      type: 'noun-abstract',
      typeLabel: 'Konkret oder abstrakt',
      difficulty: item.kind === 'abstrakt' ? 2 : 1,
      tags: ['nomen', item.kind],
      prompt: `Ist „${item.word}“ konkret oder abstrakt?`,
      interaction: {
        kind: 'choose',
        layout: 'pair',
        options: options(['konkret', 'abstrakt']),
        correctId: item.kind,
      },
      feedbackCorrect: item.kind === 'konkret'
        ? `„${item.word}“ kann man wahrnehmen. Deshalb ist es ein konkretes Nomen.`
        : `„${item.word}“ kann man nicht anfassen. Deshalb ist es ein abstraktes Nomen.`,
      feedbackIncorrect: item.kind === 'konkret'
        ? `„${item.word}“ kann man wahrnehmen. Deshalb ist es ein konkretes Nomen.`
        : `„${item.word}“ kann man nicht anfassen. Deshalb ist es ein abstraktes Nomen.`,
    }))
  }

  tasks.push(task({
    id: 'noun-abstract-sort',
    area: 'nouns',
    type: 'noun-sort',
    typeLabel: 'Kategorien bilden',
    difficulty: 2,
    tags: ['nomen', 'sortieren'],
    prompt: 'Ordne die Nomen zu: konkret oder abstrakt.',
    interaction: {
      kind: 'classify',
      items: concreteAbstract.map((item) => ({ id: item.word, text: item.word })),
      buckets: [{ id: 'konkret', label: 'konkret' }, { id: 'abstrakt', label: 'abstrakt' }],
      solution: Object.fromEntries(concreteAbstract.map((item) => [item.word, item.kind])),
    },
    feedbackCorrect: 'Tisch und Hund sind konkret. Freude, Mut, Zeit und Liebe sind abstrakt.',
    feedbackIncorrect: 'Tisch und Hund kann man wahrnehmen. Freude, Mut, Zeit und Liebe sind abstrakte Nomen.',
  }))

  tasks.push(task({
    id: 'noun-category-sort',
    area: 'nouns',
    type: 'noun-sort',
    typeLabel: 'Kategorien bilden',
    difficulty: 1,
    tags: ['nomen', 'sortieren'],
    prompt: 'Was bezeichnen diese Nomen?',
    interaction: {
      kind: 'classify',
      items: nounCategories.map((item) => ({ id: item.id, text: item.word })),
      buckets: nounCategories.map((item) => ({ id: item.id, label: item.label })),
      solution: Object.fromEntries(nounCategories.map((item) => [item.id, item.id])),
    },
    feedbackCorrect: 'Lehrer ist eine Person, Hund ein Tier, Buch ein Ding, Rose eine Pflanze, Berlin ein Ort und Freude ein Gefühl.',
    feedbackIncorrect: 'Lehrer ist eine Person, Hund ein Tier, Buch ein Ding, Rose eine Pflanze, Berlin ein Ort und Freude ein Gefühl.',
  }))

  for (const name of properNames) {
    const host = nounSentences.find((item) => item.nouns.includes(name))
    tasks.push(task({
      id: `noun-name-${name}`,
      area: 'nouns',
      type: 'noun-kind',
      typeLabel: 'Nomen oder kein Nomen',
      difficulty: 2,
      tags: ['nomen', 'eigenname'],
      prompt: `Ist „${name}“ ein Nomen?`,
      stimulus: host?.sentence ?? name,
      interaction: { kind: 'choose', layout: 'pair', options: options(['Nomen', 'kein Nomen']), correctId: 'Nomen' },
      feedbackCorrect: `„${name}“ ist ein Eigenname. Auch Eigennamen sind Nomen.`,
      feedbackIncorrect: `„${name}“ ist ein Eigenname. Auch Eigennamen sind Nomen.`,
    }))
  }

  for (const pair of capitalizationPairs) {
    tasks.push(task({
      id: `noun-cap-${pair.error}`,
      area: 'nouns',
      type: 'noun-error',
      typeLabel: 'Fehler finden',
      difficulty: 1,
      tags: ['nomen', 'großschreibung'],
      prompt: 'Welche Schreibung ist richtig?',
      interaction: { kind: 'choose', layout: 'pair', options: options([pair.faulty, pair.correct]), correctId: pair.correct },
      feedbackCorrect: `Nomen schreibt man groß: ${pair.correct}.`,
      feedbackIncorrect: `Nomen schreibt man groß: ${pair.correct}.`,
    }))
    const tokens = wordTokens(pair.faulty)
    const errorIds = idsForWords(tokens, [pair.error], pair.faulty)
    tasks.push(task({
      id: `noun-tap-${pair.error}`,
      area: 'nouns',
      type: 'noun-tap',
      typeLabel: 'Fehlerstelle antippen',
      difficulty: 2,
      tags: ['nomen', 'großschreibung'],
      prompt: 'Tippe das Wort an, das großgeschrieben werden muss.',
      stimulus: pair.faulty,
      interaction: { kind: 'mark', tokens, correctIds: errorIds, mode: 'single' },
      feedbackCorrect: `„${pair.error}“ ist ein Nomen und steht groß: ${pair.correct}.`,
      feedbackIncorrect: `„${pair.error}“ ist ein Nomen und steht groß: ${pair.correct}.`,
    }))
  }

  return tasks
}

export function buildCaseTasks(): Task[] {
  const tasks: Task[] = []
  const caseOptions = options(caseIds.map((id) => caseLabels[id]))
  const questionOptions = options(caseIds.map((id) => caseQuestions[id]))

  for (const sentence of caseSentences) {
    for (const [index, target] of sentence.targets.entries()) {
      requireWord(sentence.sentence, target.surface, sentence.id)
      const feedback = `Prüfe die Frage: ${target.probe} Die Antwort lautet „${target.label}“. Deshalb steht die Wortgruppe im ${caseLabels[target.caseId]}.`
      tasks.push(task({
        id: `case-id-${sentence.id}-${index}`,
        area: 'cases',
        type: 'case-identify',
        typeLabel: 'Fall bestimmen',
        difficulty: sentence.difficulty,
        tags: ['fall', target.caseId],
        prompt: `In welchem Fall steht „${target.label}“?`,
        stimulus: sentence.sentence,
        interaction: { kind: 'choose', layout: 'stack', options: caseOptions, correctId: caseLabels[target.caseId] },
        feedbackCorrect: feedback,
        feedbackIncorrect: feedback,
      }))
      tasks.push(task({
        id: `case-question-${sentence.id}-${index}`,
        area: 'cases',
        type: 'case-question',
        typeLabel: 'Passende Frage',
        difficulty: sentence.difficulty,
        tags: ['fall', 'frage'],
        prompt: `Welche Frage passt zu „${target.label}“?`,
        stimulus: sentence.sentence,
        interaction: { kind: 'choose', layout: 'stack', options: questionOptions, correctId: caseQuestions[target.caseId] },
        feedbackCorrect: feedback,
        feedbackIncorrect: feedback,
      }))
    }
  }

  for (const paradigm of articleParadigms) {
    for (const caseId of caseIds) {
      for (const kind of ['def', 'indef'] as const) {
        const correct = paradigm.forms[caseId][kind]
        const forms = caseIds.map((id) => paradigm.forms[id][kind])
        const label = kind === 'def' ? 'bestimmt' : 'unbestimmt'
        tasks.push(task({
          id: `case-article-${paradigm.noun}-${caseId}-${kind}`,
          area: 'cases',
          type: 'case-article',
          typeLabel: 'Artikel einsetzen',
          difficulty: caseId === 'nom' || caseId === 'akk' ? 1 : 2,
          tags: ['artikel', paradigm.gender, caseId],
          prompt: `Welche Form steht im ${caseLabels[caseId]} mit ${label}em Artikel?`,
          stimulus: paradigm.noun,
          interaction: { kind: 'choose', layout: 'stack', options: options(forms), correctId: correct },
          feedbackCorrect: `Im ${caseLabels[caseId]} heißt es ${correct}.`,
          feedbackIncorrect: `Im ${caseLabels[caseId]} heißt es ${correct}.`,
        }))
      }
      if (caseId === 'nom') continue
      const target = paradigm.forms[caseId].def
      const from = paradigm.forms.nom.def
      tasks.push(task({
        id: `case-change-${paradigm.noun}-${caseId}`,
        area: 'cases',
        type: 'case-change',
        typeLabel: 'Artikel verändern',
        difficulty: 2,
        tags: ['artikel', 'wechsel'],
        prompt: `Setze „${from}“ in den ${caseLabels[caseId]}.`,
        interaction: {
          kind: 'choose',
          layout: 'stack',
          options: options(caseIds.map((id) => paradigm.forms[id].def)),
          correctId: target,
        },
        feedbackCorrect: `${from} heißt im ${caseLabels[caseId]} ${target}.`,
        feedbackIncorrect: `${from} heißt im ${caseLabels[caseId]} ${target}.`,
      }))
    }
  }

  for (const caseId of caseIds) {
    if (caseId === 'nom') continue
    tasks.push(task({
      id: `case-hund-${caseId}`,
      area: 'cases',
      type: 'case-change',
      typeLabel: 'Artikel verändern',
      difficulty: 2,
      tags: ['artikel', 'hund'],
      prompt: `Setze „der Hund“ in den ${caseLabels[caseId]}.`,
      interaction: { kind: 'choose', layout: 'stack', options: options(caseIds.map((id) => hundParadigm[id])), correctId: hundParadigm[caseId] },
      feedbackCorrect: `der Hund heißt im ${caseLabels[caseId]} ${hundParadigm[caseId]}.`,
      feedbackIncorrect: `der Hund heißt im ${caseLabels[caseId]} ${hundParadigm[caseId]}.`,
    }))
  }

  for (const paradigm of articleParadigms) {
    for (const caseId of caseIds) {
      const definite = paradigm.forms[caseId].def
      const indefinite = paradigm.forms[caseId].indef
      tasks.push(task({
        id: `case-kind-${paradigm.noun}-${caseId}`,
        area: 'cases',
        type: 'case-kind',
        typeLabel: 'Bestimmt oder unbestimmt',
        difficulty: 1,
        tags: ['artikel', 'art'],
        prompt: 'Welche Wortgruppe hat den unbestimmten Artikel?',
        interaction: { kind: 'choose', layout: 'pair', options: options([definite, indefinite]), correctId: indefinite },
        feedbackCorrect: `${indefinite} hat den unbestimmten Artikel. ${definite} hat den bestimmten Artikel.`,
        feedbackIncorrect: `${indefinite} hat den unbestimmten Artikel. ${definite} hat den bestimmten Artikel.`,
      }))
    }
  }

  for (const preposition of [...dativePrepositions, ...accusativePrepositions]) {
    const caseId: CaseId = dativePrepositions.includes(preposition as (typeof dativePrepositions)[number]) ? 'dat' : 'akk'
    tasks.push(task({
      id: `case-prep-${preposition}`,
      area: 'cases',
      type: 'case-preposition',
      typeLabel: 'Präposition und Fall',
      difficulty: 2,
      tags: ['präposition', caseId],
      prompt: `Welchen Fall verlangt „${preposition}“?`,
      interaction: { kind: 'choose', layout: 'pair', options: options(['Dativ', 'Akkusativ']), correctId: caseLabels[caseId] },
      feedbackCorrect: `Die Präposition „${preposition}“ verlangt den ${caseLabels[caseId]}.`,
      feedbackIncorrect: `Die Präposition „${preposition}“ verlangt den ${caseLabels[caseId]}.`,
    }))
  }

  for (const example of prepositionExamples) {
    requireWord(example.phrase, example.phrase.split(' ').at(-1) ?? example.phrase, example.phrase)
    tasks.push(task({
      id: `case-prep-phrase-${example.phrase}`,
      area: 'cases',
      type: 'case-preposition',
      typeLabel: 'Präposition und Fall',
      difficulty: example.phrase === 'zum Arzt' ? 3 : 2,
      tags: ['präposition', example.caseId],
      prompt: 'In welchem Fall steht diese Wortgruppe?',
      stimulus: example.phrase,
      interaction: { kind: 'choose', layout: 'stack', options: caseOptions, correctId: caseLabels[example.caseId] },
      feedbackCorrect: example.phrase === 'zum Arzt'
        ? 'zum Arzt ist die Kurzform von zu dem Arzt. zu verlangt den Dativ.'
        : `„${example.preposition}“ verlangt den ${caseLabels[example.caseId]}. Deshalb heißt es ${example.phrase}.`,
      feedbackIncorrect: example.phrase === 'zum Arzt'
        ? 'zum Arzt ist die Kurzform von zu dem Arzt. zu verlangt den Dativ.'
        : `„${example.preposition}“ verlangt den ${caseLabels[example.caseId]}. Deshalb heißt es ${example.phrase}.`,
    }))
  }

  tasks.push(task({
    id: 'case-frau-overlap',
    area: 'cases',
    type: 'case-bool',
    typeLabel: 'Richtig oder falsch',
    difficulty: 3,
    tags: ['artikel', 'feminin'],
    prompt: 'Stimmt diese Aussage?',
    stimulus: 'Beim bestimmten Artikel sind Genitiv und Dativ gleich: der Frau.',
    interaction: { kind: 'bool', correct: true },
    feedbackCorrect: 'Im Femininum lauten Genitiv und Dativ beim bestimmten Artikel beide der Frau.',
    feedbackIncorrect: 'Im Femininum lauten Genitiv und Dativ beim bestimmten Artikel beide der Frau.',
  }))

  return tasks
}

function gainsUmlaut(base: string, next: string): boolean {
  return ['ä', 'ö', 'ü'].some((mark) => next.includes(mark) && !base.includes(mark))
}

export function buildAdjectiveTasks(): Task[] {
  const tasks: Task[] = []
  const degrees = [
    { key: 'positive' as const, label: 'Positiv' },
    { key: 'comparative' as const, label: 'Komparativ' },
    { key: 'superlative' as const, label: 'Superlativ' },
  ]
  for (const item of adjectives) {
    const forms = [item.positive, item.comparative, item.superlative]
    if (new Set(forms).size !== 3) throw new Error(`Formen nicht eindeutig: ${item.positive}`)
    for (const degree of degrees) {
      const form = item[degree.key]
      tasks.push(task({
        id: `adj-degree-${item.id}-${degree.key}`,
        area: 'adjectives',
        type: 'adj-degree',
        typeLabel: 'Steigerungsstufe erkennen',
        difficulty: item.difficulty,
        tags: ['adjektiv', item.pattern],
        prompt: 'Welche Steigerungsstufe ist das?',
        stimulus: form,
        interaction: { kind: 'choose', layout: 'stack', options: options(['Positiv', 'Komparativ', 'Superlativ']), correctId: degree.label },
        feedbackCorrect: `${form} ist der ${degree.label} von ${item.positive}. Positiv ist die Grundform, Komparativ der Vergleich, Superlativ die höchste Stufe.`,
        feedbackIncorrect: `${form} ist der ${degree.label} von ${item.positive}. Positiv ist die Grundform, Komparativ der Vergleich, Superlativ die höchste Stufe.`,
      }))
    }
    tasks.push(task({
      id: `adj-comp-${item.id}`,
      area: 'adjectives',
      type: 'adj-comparative',
      typeLabel: 'Komparativ bilden',
      difficulty: item.difficulty,
      tags: ['adjektiv', 'komparativ'],
      prompt: `Welche Form ist der Komparativ von „${item.positive}“?`,
      interaction: { kind: 'choose', layout: 'stack', options: options(forms), correctId: item.comparative },
      feedbackCorrect: `Der Komparativ von ${item.positive} heißt ${item.comparative}.`,
      feedbackIncorrect: `Der Komparativ von ${item.positive} heißt ${item.comparative}.`,
    }))
    tasks.push(task({
      id: `adj-sup-${item.id}`,
      area: 'adjectives',
      type: 'adj-superlative',
      typeLabel: 'Superlativ bilden',
      difficulty: item.difficulty,
      tags: ['adjektiv', 'superlativ'],
      prompt: `Welche Form ist der Superlativ von „${item.positive}“?`,
      interaction: { kind: 'choose', layout: 'stack', options: options(forms), correctId: item.superlative },
      feedbackCorrect: `Der Superlativ von ${item.positive} heißt ${item.superlative}.`,
      feedbackIncorrect: `Der Superlativ von ${item.positive} heißt ${item.superlative}.`,
    }))
    tasks.push(task({
      id: `adj-order-${item.id}`,
      area: 'adjectives',
      type: 'adj-order',
      typeLabel: 'Alle drei Formen',
      difficulty: maxDifficulty(item.difficulty, 2),
      tags: ['adjektiv', 'reihenfolge'],
      prompt: 'Bringe die Formen in diese Reihenfolge: Grundform, Vergleich, höchste Stufe.',
      stimulus: item.positive,
      interaction: {
        kind: 'order',
        items: forms.map((form) => ({ id: form, text: form })),
        correctIds: forms,
      },
      feedbackCorrect: `${item.positive}, ${item.comparative}, ${item.superlative}.`,
      feedbackIncorrect: `Die Reihenfolge ist ${item.positive}, ${item.comparative}, ${item.superlative}.`,
    }))
    const umlaut = gainsUmlaut(item.positive, item.comparative)
    tasks.push(task({
      id: `adj-umlaut-${item.id}`,
      area: 'adjectives',
      type: 'adj-umlaut',
      typeLabel: 'Umlaut erkennen',
      difficulty: item.pattern === 'umlaut' || item.pattern === 'irregular' ? 2 : 1,
      tags: ['adjektiv', 'umlaut'],
      prompt: `Bekommt „${item.positive}“ im Komparativ einen Umlaut?`,
      stimulus: `${item.positive} → ${item.comparative}`,
      interaction: { kind: 'bool', correct: umlaut },
      feedbackCorrect: umlaut
        ? `${item.comparative} hat einen Umlaut, ${item.positive} noch nicht.`
        : `${item.comparative} übernimmt keinen neuen Umlaut.`,
      feedbackIncorrect: umlaut
        ? `${item.comparative} hat einen Umlaut, ${item.positive} noch nicht.`
        : `${item.comparative} übernimmt keinen neuen Umlaut.`,
    }))
    const irregular = item.pattern === 'irregular'
    tasks.push(task({
      id: `adj-regular-${item.id}`,
      area: 'adjectives',
      type: 'adj-regular',
      typeLabel: 'Regelmäßig oder unregelmäßig',
      difficulty: irregular ? 3 : 2,
      tags: ['adjektiv', irregular ? 'unregelmäßig' : 'regelmäßig'],
      prompt: `Ist die Steigerung von „${item.positive}“ unregelmäßig?`,
      stimulus: `${item.positive}, ${item.comparative}, ${item.superlative}`,
      interaction: { kind: 'bool', correct: irregular },
      feedbackCorrect: irregular
        ? `${item.positive}, ${item.comparative}, ${item.superlative} folgt nicht der einfachen Endung. Die Steigerung ist unregelmäßig.`
        : `${item.positive}, ${item.comparative}, ${item.superlative} folgt einer der behandelten Regeln.`,
      feedbackIncorrect: irregular
        ? `${item.positive}, ${item.comparative}, ${item.superlative} folgt nicht der einfachen Endung. Die Steigerung ist unregelmäßig.`
        : `${item.positive}, ${item.comparative}, ${item.superlative} folgt einer der behandelten Regeln.`,
    }))
  }

  for (const item of comparisonSentences) {
    const gapped = item.sentence.replace(new RegExp(`(?<![\\p{L}])${item.connector}(?![\\p{L}])`, 'u'), '___')
    if (!gapped.includes('___')) throw new Error(`Vergleichswort fehlt: ${item.sentence}`)
    const same = item.connector === 'wie'
    tasks.push(task({
      id: `adj-compare-${item.id}`,
      area: 'adjectives',
      type: 'adj-als',
      typeLabel: 'Als oder wie',
      difficulty: item.difficulty,
      tags: ['adjektiv', item.connector],
      prompt: 'als oder wie?',
      stimulus: gapped,
      interaction: { kind: 'choose', layout: 'pair', options: options(['als', 'wie']), correctId: item.connector },
      feedbackCorrect: same
        ? 'Bei einem gleichen Vergleich steht wie: so … wie oder genauso … wie.'
        : 'Bei einem Unterschied steht als. Die Verbindung größer wie ist hier nicht richtig.',
      feedbackIncorrect: same
        ? 'Bei einem gleichen Vergleich steht wie: so … wie oder genauso … wie.'
        : 'Bei einem Unterschied steht als. Die Verbindung größer wie ist hier nicht richtig.',
    }))
  }

  for (const error of adjectiveErrors) {
    const tokens = wordTokens(error.faulty)
    const errorIds = idsForWords(tokens, [error.error], error.id)
    tasks.push(task({
      id: `adj-fix-${error.id}`,
      area: 'adjectives',
      type: 'adj-fix',
      typeLabel: 'Fehler korrigieren',
      difficulty: 3,
      tags: ['adjektiv', 'fehler'],
      prompt: 'Welche Fassung ist richtig?',
      interaction: { kind: 'choose', layout: 'pair', options: options([error.faulty, error.correct]), correctId: error.correct },
      feedbackCorrect: error.note,
      feedbackIncorrect: error.note,
    }))
    tasks.push(task({
      id: `adj-tap-${error.id}`,
      area: 'adjectives',
      type: 'adj-tap',
      typeLabel: 'Fehlerstelle antippen',
      difficulty: 3,
      tags: ['adjektiv', 'fehler'],
      prompt: 'Tippe die fehlerhafte Stelle an.',
      stimulus: error.faulty,
      interaction: { kind: 'mark', tokens, correctIds: errorIds, mode: 'single' },
      feedbackCorrect: `${error.note} Richtig ist: ${error.correct}`,
      feedbackIncorrect: `${error.note} Richtig ist: ${error.correct}`,
    }))
  }

  tasks.push(task({
    id: 'adj-noun-superlative',
    area: 'adjectives',
    type: 'adj-bool',
    typeLabel: 'Richtig oder falsch',
    difficulty: 3,
    tags: ['adjektiv', 'nomen'],
    prompt: 'Stimmt diese Aussage?',
    stimulus: 'Vor einem Nomen heißt es: der schnellste Läufer. Ohne Nomen heißt es: Er läuft am schnellsten.',
    interaction: { kind: 'bool', correct: true },
    feedbackCorrect: 'Ohne Nomen steht am schnellsten. Vor einem Nomen steht die Form mit Endung: der schnellste Läufer.',
    feedbackIncorrect: 'Ohne Nomen steht am schnellsten. Vor einem Nomen steht die Form mit Endung: der schnellste Läufer.',
  }))
  return tasks
}

function uniquePersons(forms: Record<Person, string>, form: string): Person[] {
  return persons.filter((person) => forms[person] === form)
}

export function buildVerbTasks(): Task[] {
  const tasks: Task[] = []
  const personOptions = options([...persons])
  for (const verb of verbParadigms) {
    const distinctForms = distinct(persons.map((person) => verb.forms[person]))
    for (const person of persons) {
      const form = verb.forms[person]
      const owners = uniquePersons(verb.forms, form)
      const personNote = [
        person === 'er' ? ' Die Form gilt ebenso für sie und es.' : '',
        person === 'sie' ? ' sie meint hier die Mehrzahl. Die Höflichkeitsform Sie hat dieselbe Form.' : '',
        owners.length > 1 ? ` Dieselbe Form steht auch bei ${owners.filter((item) => item !== person).join(' und ')}.` : '',
      ].join('')
      if (owners.length === 1) tasks.push(task({
        id: `verb-person-${verb.infinitive}-${person}`,
        area: 'verbs',
        type: 'verb-person',
        typeLabel: 'Person erkennen',
        difficulty: verb.difficulty,
        tags: ['verb', verb.pattern],
        prompt: 'Zu welcher Person gehört diese Form?',
        stimulus: `${verb.infinitive}: ${form}`,
        interaction: { kind: 'choose', layout: 'stack', options: personOptions, correctId: person },
        feedbackCorrect: `${form} gehört zu ${person}.${personNote}`,
        feedbackIncorrect: `${form} gehört zu ${person}.${personNote}`,
      }))
      tasks.push(task({
        id: `verb-form-${verb.infinitive}-${person}`,
        area: 'verbs',
        type: 'verb-form',
        typeLabel: 'Verb konjugieren',
        difficulty: verb.difficulty,
        tags: ['verb', 'präsens'],
        prompt: `Welche Präsensform gehört zu „${person}“?`,
        stimulus: verb.infinitive,
        interaction: { kind: 'choose', layout: 'stack', options: options(distinctForms), correctId: form },
        feedbackCorrect: `${person} ${form}. Das ist die Präsensform von ${verb.infinitive}.${personNote}`,
        feedbackIncorrect: `${person} ${form}. Das ist die Präsensform von ${verb.infinitive}.${personNote}`,
      }))
    }
  }

  for (const gap of gapSentences) {
    const verb = verbParadigms.find((item) => item.infinitive === gap.infinitive)
    if (!verb) {
      const bank = distinct(gapSentences.map((item) => item.infinitive))
      const distractors = bank.filter((item) => item !== gap.infinitive).slice(0, 3)
      tasks.push(task({
        id: `verb-lemma-${gap.id}`,
        area: 'verbs',
        type: 'verb-lemma',
        typeLabel: 'Grundform bestimmen',
        difficulty: gap.difficulty,
        tags: ['verb', 'grundform'],
        prompt: 'Welche Grundform steckt in dem Verb?',
        stimulus: `${gap.before} ${gap.solution} ${gap.after}`,
        interaction: { kind: 'choose', layout: 'stack', options: options([gap.infinitive, ...distractors]), correctId: gap.infinitive },
        feedbackCorrect: `${gap.solution} gehört zur Grundform ${gap.infinitive}.`,
        feedbackIncorrect: `${gap.solution} gehört zur Grundform ${gap.infinitive}.`,
      }))
      continue
    }
    tasks.push(task({
      id: `verb-gap-${gap.id}`,
      area: 'verbs',
      type: 'verb-gap',
      typeLabel: 'Verbform einsetzen',
      difficulty: gap.difficulty,
      tags: ['verb', 'lücke'],
      prompt: 'Welche Form passt in die Lücke?',
      stimulus: `${gap.before} ___ ${gap.after} (${gap.infinitive})`,
      interaction: {
        kind: 'choose',
        layout: 'stack',
        options: options(distinct(persons.map((person) => verb.forms[person]))),
        correctId: gap.solution,
      },
      feedbackCorrect: `Richtig ist: ${gap.before} ${gap.solution} ${gap.after}`,
      feedbackIncorrect: `Das Verb ${gap.infinitive} steht hier als ${gap.solution}: ${gap.before} ${gap.solution} ${gap.after}`,
    }))
  }

  const preteriteOptions = options(preteriteForms.map((item) => item.form))
  for (const item of preteriteForms) {
    tasks.push(task({
      id: `verb-past-${item.infinitive}`,
      area: 'verbs',
      type: 'verb-preterite',
      typeLabel: 'Präteritum bilden',
      difficulty: item.infinitive === 'machen' ? 2 : 3,
      tags: ['verb', 'präteritum'],
      prompt: `Welche Form ist das Präteritum von „${item.infinitive}“?`,
      interaction: { kind: 'choose', layout: 'stack', options: preteriteOptions, correctId: item.form },
      feedbackCorrect: `Das Präteritum von ${item.infinitive} heißt ${item.form}.`,
      feedbackIncorrect: `Das Präteritum von ${item.infinitive} heißt ${item.form}.`,
    }))
  }

  for (const item of participlePairs) {
    const bank = participlePairs.map((entry) => entry.participle)
    const start = participlePairs.findIndex((entry) => entry.infinitive === item.infinitive)
    const choices = [0, 1, 2, 3].map((offset) => bank[(start + offset) % bank.length] ?? item.participle)
    tasks.push(task({
      id: `verb-part-${item.infinitive}`,
      area: 'verbs',
      type: 'verb-participle',
      typeLabel: 'Partizip II bilden',
      difficulty: ['gehen', 'nehmen', 'sehen', 'studieren', 'probieren'].includes(item.infinitive) ? 3 : 2,
      tags: ['verb', 'partizip'],
      prompt: `Welches Partizip II gehört zu „${item.infinitive}“?`,
      interaction: { kind: 'choose', layout: 'stack', options: options(choices), correctId: item.participle },
      feedbackCorrect: `${item.infinitive} bildet das Partizip II ${item.participle}.`,
      feedbackIncorrect: `${item.infinitive} bildet das Partizip II ${item.participle}.`,
    }))
  }

  for (const item of perfectItems) {
    const tokens = wordTokens(item.sentence)
    const partIds = idsForWords(tokens, [item.auxiliaryForm, item.participle], item.id)
    tasks.push(task({
      id: `verb-aux-${item.id}`,
      area: 'verbs',
      type: 'verb-auxiliary',
      typeLabel: 'Hilfsverb wählen',
      difficulty: item.difficulty,
      tags: ['verb', 'perfekt', item.auxiliary],
      prompt: 'Mit haben oder mit sein?',
      stimulus: item.sentence,
      interaction: { kind: 'choose', layout: 'pair', options: options(['haben', 'sein']), correctId: item.auxiliary },
      feedbackCorrect: `„${item.auxiliaryForm}“ ist eine Form von ${item.auxiliary}. Zusammen mit dem Partizip II „${item.participle}“ steht der Satz im Perfekt.`,
      feedbackIncorrect: `„${item.auxiliaryForm}“ ist eine Form von ${item.auxiliary}. Zusammen mit dem Partizip II „${item.participle}“ steht der Satz im Perfekt.`,
    }))
    tasks.push(task({
      id: `verb-perfect-${item.id}`,
      area: 'verbs',
      type: 'verb-perfect',
      typeLabel: 'Perfekt bilden',
      difficulty: item.difficulty,
      tags: ['verb', 'perfekt'],
      prompt: 'Markiere Hilfsverb und Partizip II.',
      stimulus: item.sentence,
      interaction: { kind: 'mark', tokens, correctIds: partIds, mode: 'multi' },
      feedbackCorrect: `${item.auxiliaryForm} und ${item.participle} bilden zusammen das Perfekt.`,
      feedbackIncorrect: `Zum Perfekt gehören ${item.auxiliaryForm} und das Partizip II ${item.participle}.`,
    }))
  }
  return tasks
}

export function buildTenseTasks(): Task[] {
  const tasks: Task[] = []
  const labels = tenseIds.map((id) => tenseLabels[id])
  for (const pool of tensePools) {
    for (const tense of tenseIds) {
      const form = pool.forms[tense]
      const tokens = wordTokens(form.sentence)
      const partIds = idsForWords(tokens, form.parts, `${pool.id}-${tense}`)
      const hard = tense === 'plusquam' || tense === 'futur2'
      tasks.push(task({
        id: `tense-id-${pool.id}-${tense}`,
        area: 'tenses',
        type: 'tense-identify',
        typeLabel: 'Zeitform erkennen',
        difficulty: hard ? 3 : maxDifficulty(pool.difficulty, tense === 'praesens' || tense === 'praeteritum' ? 1 : 2),
        tags: ['zeit', tense],
        prompt: 'Welche Zeitform ist das?',
        stimulus: form.sentence,
        interaction: { kind: 'choose', layout: 'stack', options: options(labels), correctId: tenseLabels[tense] },
        feedbackCorrect: tenseFeedback(tense, form.parts),
        feedbackIncorrect: tenseFeedback(tense, form.parts),
      }))
      tasks.push(task({
        id: `tense-parts-${pool.id}-${tense}`,
        area: 'tenses',
        type: 'tense-parts',
        typeLabel: 'Verbteile markieren',
        difficulty: hard ? 3 : 2,
        tags: ['zeit', 'verbteile'],
        prompt: 'Markiere die Wörter, die zur Verbform gehören.',
        stimulus: form.sentence,
        interaction: { kind: 'mark', tokens, correctIds: partIds, mode: 'multi' },
        feedbackCorrect: tenseFeedback(tense, form.parts),
        feedbackIncorrect: tenseFeedback(tense, form.parts),
      }))
      const optionTenses = [tense, ...tenseIds.filter((item) => item !== tense)].slice(0, 4)
      tasks.push(task({
        id: `tense-transform-${pool.id}-${tense}`,
        area: 'tenses',
        type: 'tense-transform',
        typeLabel: 'Satz umformen',
        difficulty: hard ? 3 : 2,
        tags: ['zeit', 'umformen'],
        prompt: `Welche Fassung von „${pool.verb}“ steht im ${tenseLabels[tense]}?`,
        interaction: {
          kind: 'choose',
          layout: 'stack',
          options: optionTenses.map((item) => ({ id: pool.forms[item].sentence, text: pool.forms[item].sentence })),
          correctId: form.sentence,
        },
        feedbackCorrect: tenseFeedback(tense, form.parts),
        feedbackIncorrect: tenseFeedback(tense, form.parts),
      }))
    }
    const timelineItems = timelineOrder.map((tense) => ({ id: pool.forms[tense].sentence, text: pool.forms[tense].sentence }))
    tasks.push(task({
      id: `tense-line-${pool.id}`,
      area: 'tenses',
      type: 'tense-line',
      typeLabel: 'Zeitstrahl',
      difficulty: 3,
      tags: ['zeit', 'zeitstrahl'],
      prompt: 'Ordne vom Früheren zum Späteren: Vorvergangenheit, Vergangenheit, Gegenwart, Zukunft.',
      stimulus: pool.verb,
      interaction: { kind: 'order', items: timelineItems, correctIds: timelineItems.map((item) => item.id) },
      feedbackCorrect: timelineOrder.map((tense) => `${timelineLabels[tense]}: ${pool.forms[tense].sentence}`).join(' '),
      feedbackIncorrect: `Zuerst ${pool.forms.plusquam.sentence} Dann ${pool.forms.praeteritum.sentence} Danach ${pool.forms.praesens.sentence} Zuletzt ${pool.forms.futur1.sentence}`,
    }))
  }

  for (const item of recognitionSentences) {
    tasks.push(task({
      id: `tense-read-${item.id}`,
      area: 'tenses',
      type: 'tense-identify',
      typeLabel: 'Zeitform erkennen',
      difficulty: item.difficulty,
      tags: ['zeit', item.tense],
      prompt: 'Welche Zeitform ist das?',
      stimulus: item.sentence,
      interaction: { kind: 'choose', layout: 'stack', options: options(labels), correctId: tenseLabels[item.tense] },
      feedbackCorrect: `Der Satz steht im ${tenseLabels[item.tense]}.`,
      feedbackIncorrect: `Der Satz steht im ${tenseLabels[item.tense]}.`,
    }))
  }
  return tasks
}

function tenseFeedback(tense: (typeof tenseIds)[number], parts: readonly string[]): string {
  const marked = listWords(parts)
  if (tense === 'praesens') return `„${marked}“ zeigt das Präsens, also die Gegenwart. Mit einer Zeitangabe kann das Präsens auch Zukünftiges nennen.`
  if (tense === 'praeteritum') return `„${marked}“ ist eine Präteritumform. Diese Zeitform ist typisch für Geschichten, Erzählungen und Berichte.`
  if (tense === 'perfekt') return `„${marked}“ besteht aus einer Form von haben oder sein und dem Partizip II. Der Satz steht deshalb im Perfekt.`
  if (tense === 'plusquam') return `„${marked}“ besteht aus hatte oder war und dem Partizip II. Das ist das Plusquamperfekt, die Vorvergangenheit.`
  if (tense === 'futur1') return `„${marked}“ besteht aus werden und dem Infinitiv. Der Satz steht im Futur I.`
  return `„${marked}“ besteht aus werden, dem Partizip II und haben oder sein. Das ist das Futur II, die vollendete Zukunft.`
}

export function buildVoiceTasks(): Task[] {
  const tasks: Task[] = []
  const tenseOptions = options(voiceTenseIds.map((id) => voiceTenseLabels[id]))
  for (const pair of voicePairs) {
    for (const part of pair.parts) requireWord(pair.passive, part, pair.id)
    requireWord(pair.passive, pair.passiveAgent, pair.id)
    requireWord(pair.active, pair.activeObject, pair.id)
    const pairOptions = options([pair.active, pair.passive])
    tasks.push(task({
      id: `voice-active-${pair.id}`,
      area: 'voice',
      type: 'voice-kind',
      typeLabel: 'Aktiv oder Passiv',
      difficulty: pair.difficulty,
      tags: ['genus', 'aktiv'],
      prompt: 'Aktiv oder Passiv?',
      stimulus: pair.active,
      interaction: { kind: 'choose', layout: 'pair', options: options(['Aktiv', 'Passiv']), correctId: 'Aktiv' },
      feedbackCorrect: 'Das Subjekt handelt selbst. Der Satz steht im Aktiv.',
      feedbackIncorrect: 'Das Subjekt handelt selbst. Der Satz steht im Aktiv.',
    }))
    tasks.push(task({
      id: `voice-passive-${pair.id}`,
      area: 'voice',
      type: 'voice-kind',
      typeLabel: 'Aktiv oder Passiv',
      difficulty: pair.difficulty,
      tags: ['genus', 'passiv'],
      prompt: 'Aktiv oder Passiv?',
      stimulus: pair.passive,
      interaction: { kind: 'choose', layout: 'pair', options: options(['Aktiv', 'Passiv']), correctId: 'Passiv' },
      feedbackCorrect: 'Die Handlung steht im Mittelpunkt. Der Satz steht im Passiv.',
      feedbackIncorrect: 'Die Handlung steht im Mittelpunkt. Der Satz steht im Passiv.',
    }))
    tasks.push(task({
      id: `voice-agent-${pair.id}`,
      area: 'voice',
      type: 'voice-agent',
      typeLabel: 'Handelnden bestimmen',
      difficulty: pair.difficulty,
      tags: ['genus', 'täter'],
      prompt: 'Wer führt die Handlung aus?',
      stimulus: pair.passive,
      interaction: { kind: 'choose', layout: 'pair', options: options([pair.agent, pair.patient]), correctId: pair.agent },
      feedbackCorrect: `Ausgeführt wird die Handlung von ${pair.agent}. Im Satz steht dafür „${pair.passiveAgent}“. ${pair.patient} ist das, worum es in der Handlung geht.`,
      feedbackIncorrect: `Ausgeführt wird die Handlung von ${pair.agent}. Im Satz steht dafür „${pair.passiveAgent}“. ${pair.patient} ist das, worum es in der Handlung geht.`,
    }))
    tasks.push(task({
      id: `voice-object-${pair.id}`,
      area: 'voice',
      type: 'voice-object',
      typeLabel: 'Objekt erkennen',
      difficulty: pair.difficulty,
      tags: ['genus', 'objekt'],
      prompt: 'Welches Objekt steht im Aktivsatz?',
      stimulus: pair.active,
      interaction: { kind: 'choose', layout: 'pair', options: options([pair.activeObject, pair.agent]), correctId: pair.activeObject },
      feedbackCorrect: `„${pair.activeObject}“ ist das Objekt. Im Passiv wird daraus das Subjekt: ${pair.passive}`,
      feedbackIncorrect: `„${pair.activeObject}“ ist das Objekt. Im Passiv wird daraus das Subjekt: ${pair.passive}`,
    }))
    tasks.push(task({
      id: `voice-to-passive-${pair.id}`,
      area: 'voice',
      type: 'voice-to-passive',
      typeLabel: 'Aktiv in Passiv',
      difficulty: pair.difficulty,
      tags: ['genus', 'umformen'],
      prompt: 'Welche Fassung ist das Passiv?',
      stimulus: pair.active,
      interaction: { kind: 'choose', layout: 'stack', options: pairOptions, correctId: pair.passive },
      feedbackCorrect: `Das Objekt „${pair.activeObject}“ wird zum Subjekt. ${pair.passive}`,
      feedbackIncorrect: `Das Objekt „${pair.activeObject}“ wird zum Subjekt. ${pair.passive}`,
    }))
    tasks.push(task({
      id: `voice-to-active-${pair.id}`,
      area: 'voice',
      type: 'voice-to-active',
      typeLabel: 'Passiv in Aktiv',
      difficulty: pair.difficulty,
      tags: ['genus', 'umformen'],
      prompt: 'Welche Fassung ist das Aktiv?',
      stimulus: pair.passive,
      interaction: { kind: 'choose', layout: 'stack', options: pairOptions, correctId: pair.active },
      feedbackCorrect: `Im Aktiv handelt ${pair.agent} selbst: ${pair.active}`,
      feedbackIncorrect: `Im Aktiv handelt ${pair.agent} selbst: ${pair.active}`,
    }))
    tasks.push(task({
      id: `voice-build-${pair.id}`,
      area: 'voice',
      type: 'voice-build',
      typeLabel: 'Passivform zusammensetzen',
      difficulty: pair.parts.length > 2 ? 3 : pair.difficulty,
      tags: ['genus', 'formen'],
      prompt: 'Bringe die Teile der Passivform in die richtige Reihenfolge.',
      stimulus: pair.passive,
      interaction: {
        kind: 'order',
        items: pair.parts.map((part) => ({ id: part, text: part })),
        correctIds: [...pair.parts],
      },
      feedbackCorrect: `${pair.parts.join(' ')} ergibt die Passivform in: ${pair.passive}`,
      feedbackIncorrect: `Die Reihenfolge ist ${pair.parts.join(' – ')}.`,
    }))
    tasks.push(task({
      id: `voice-tense-${pair.id}`,
      area: 'voice',
      type: 'voice-tense',
      typeLabel: 'Zeitform im Passiv',
      difficulty: pair.difficulty,
      tags: ['genus', pair.tense],
      prompt: 'Welche Passivzeit ist das?',
      stimulus: pair.passive,
      interaction: { kind: 'choose', layout: 'stack', options: tenseOptions, correctId: voiceTenseLabels[pair.tense] },
      feedbackCorrect: `Die Form ${pair.parts.join(' ')} ist ${voiceTenseLabels[pair.tense]}.`,
      feedbackIncorrect: `Die Form ${pair.parts.join(' ')} ist ${voiceTenseLabels[pair.tense]}.`,
    }))
  }

  for (const part of voicePatternSentence.parts) requireWord(voicePatternSentence.sentence, part, 'futur2')
  tasks.push(task({
    id: 'voice-futur2',
    area: 'voice',
    type: 'voice-tense',
    typeLabel: 'Zeitform im Passiv',
    difficulty: 3,
    tags: ['genus', 'futur2'],
    prompt: 'Welche Passivzeit ist das?',
    stimulus: voicePatternSentence.sentence,
    interaction: { kind: 'choose', layout: 'stack', options: tenseOptions, correctId: voiceTenseLabels.futur2 },
    feedbackCorrect: 'werden + Partizip II + worden sein bildet das Passiv Futur II.',
    feedbackIncorrect: 'werden + Partizip II + worden sein bildet das Passiv Futur II.',
  }))

  tasks.push(task({
    id: 'voice-agent-optional',
    area: 'voice',
    type: 'voice-bool',
    typeLabel: 'Richtig oder falsch',
    difficulty: 2,
    tags: ['genus', 'täter'],
    prompt: 'Stimmt diese Aussage?',
    stimulus: 'Der Täter kann im Passiv wegbleiben: Der Ball wird geschossen.',
    interaction: { kind: 'bool', correct: true },
    feedbackCorrect: 'Der Ball wird vom Jungen geschossen nennt den Täter. Der Ball wird geschossen lässt ihn weg.',
    feedbackIncorrect: 'Der Ball wird vom Jungen geschossen nennt den Täter. Der Ball wird geschossen lässt ihn weg.',
  }))

  for (const error of voiceErrors) {
    const tokens = wordTokens(error.faulty)
    tasks.push(task({
      id: `voice-fix-${error.id}`,
      area: 'voice',
      type: 'voice-fix',
      typeLabel: 'Fehler korrigieren',
      difficulty: 3,
      tags: ['genus', 'fehler'],
      prompt: 'Welche Fassung ist richtig?',
      interaction: { kind: 'choose', layout: 'pair', options: options([error.faulty, error.correct]), correctId: error.correct },
      feedbackCorrect: error.note,
      feedbackIncorrect: error.note,
    }))
    tasks.push(task({
      id: `voice-tap-${error.id}`,
      area: 'voice',
      type: 'voice-tap',
      typeLabel: 'Fehlerstelle antippen',
      difficulty: 3,
      tags: ['genus', 'worden'],
      prompt: 'Tippe die fehlerhafte Stelle an.',
      stimulus: error.faulty,
      interaction: { kind: 'mark', tokens, correctIds: idsForWords(tokens, [error.error], error.id), mode: 'single' },
      feedbackCorrect: `${error.note} Richtig ist: ${error.correct}`,
      feedbackIncorrect: `${error.note} Richtig ist: ${error.correct}`,
    }))
  }
  return tasks
}

export function buildCapitalizationTasks(): Task[] {
  const tasks: Task[] = []
  for (const sentence of capitalizationSentences) {
    const tokens = sentence.tokens.map((token, index) => ({ ...token, id: `${sentence.id}-${index}` }))
    if (sentence.toggle) {
      const renderedFaulty = renderToggle(sentence.tokens, 'faulty')
      const renderedCorrect = renderToggle(sentence.tokens, 'correct')
      if (renderedFaulty !== sentence.faultySentence) {
        throw new Error(`${sentence.id} fehlerhaft abweichend: ${renderedFaulty}`)
      }
      if (renderedCorrect !== sentence.correctSentence) {
        throw new Error(`${sentence.id} Lösung abweichend: ${renderedCorrect}`)
      }
      tasks.push(task({
        id: `cap-toggle-${sentence.id}`,
        area: 'capitalization',
        type: 'cap-toggle',
        typeLabel: 'Groß oder klein',
        difficulty: sentence.difficulty,
        tags: ['großschreibung'],
        prompt: 'Tippe die Wörter an, die du großschreiben willst. Der Satz startet in der fehlerhaften Schreibung.',
        interaction: { kind: 'toggle', tokens },
        feedbackCorrect: `So ist der Satz richtig: ${sentence.correctSentence}`,
        feedbackIncorrect: `So ist der Satz richtig: ${sentence.correctSentence}`,
      }))
    }
    tasks.push(task({
      id: `cap-compare-${sentence.id}`,
      area: 'capitalization',
      type: 'cap-compare',
      typeLabel: 'Satz korrigieren',
      difficulty: sentence.difficulty,
      tags: ['großschreibung'],
      prompt: 'Welche Fassung ist richtig geschrieben?',
      interaction: {
        kind: 'choose',
        layout: 'pair',
        options: options([sentence.faultySentence, sentence.correctSentence]),
        correctId: sentence.correctSentence,
      },
      feedbackCorrect: `Richtig ist: ${sentence.correctSentence}`,
      feedbackIncorrect: `Richtig ist: ${sentence.correctSentence}`,
    }))
    const correctTokens = wordTokens(sentence.correctSentence)
    tasks.push(task({
      id: `cap-nouns-${sentence.id}`,
      area: 'capitalization',
      type: 'cap-nouns',
      typeLabel: 'Nomen markieren',
      difficulty: maxDifficulty(sentence.difficulty, 2),
      tags: ['großschreibung', 'nomen'],
      prompt: 'Markiere die Nomen. Nicht jedes großgeschriebene Wort ist ein Nomen.',
      stimulus: sentence.correctSentence,
      interaction: { kind: 'mark', tokens: correctTokens, correctIds: idsForWords(correctTokens, sentence.nouns, sentence.id), mode: 'multi' },
      feedbackCorrect: `Nomen in diesem Satz: ${listWords(sentence.nouns)}.`,
      feedbackIncorrect: `Nomen in diesem Satz: ${listWords(sentence.nouns)}. Wörter am Satzanfang können auch ohne Nomen großstehen.`,
    }))
    for (const [index, token] of tokens.entries()) {
      if (!token.reason || token.faulty === token.correct) continue
      const label = reasonLabels[token.reason]
      const extras = token.reason === 'sentence'
        ? [reasonLabels.noun, reasonLabels.weekday]
        : token.reason === 'weekday'
          ? [reasonLabels.sentence, reasonLabels.noun]
          : [reasonLabels.sentence, reasonLabels.noun, reasonLabels.name]
      tasks.push(task({
        id: `cap-reason-${sentence.id}-${index}`,
        area: 'capitalization',
        type: 'cap-reason',
        typeLabel: 'Grund der Großschreibung',
        difficulty: token.note ? 3 : sentence.difficulty,
        tags: ['großschreibung', token.reason],
        prompt: `Warum steht „${token.correct}“ groß?`,
        stimulus: sentence.correctSentence,
        interaction: { kind: 'choose', layout: 'stack', options: options([label, ...extras]), correctId: label },
        feedbackCorrect: token.note ?? `„${token.correct}“ steht groß, weil es als ${label} gilt.`,
        feedbackIncorrect: token.note ?? `„${token.correct}“ steht groß, weil es als ${label} gilt.`,
      }))
    }
  }
  return tasks
}

export function buildSpellingTasks(): Task[] {
  const tasks: Task[] = []
  for (const pair of spellingPairs) {
    tasks.push(task({
      id: `spell-${pair.id}`,
      area: 'spelling',
      type: 'spell-choice',
      typeLabel: 'Schreibung wählen',
      difficulty: pair.difficulty,
      tags: ['rechtschreibung', pair.topic],
      prompt: 'Welche Schreibung ist richtig?',
      interaction: { kind: 'choose', layout: 'pair', options: options([pair.wrong, pair.correct]), correctId: pair.correct },
      feedbackCorrect: pair.note,
      feedbackIncorrect: `„${pair.wrong}“ ist nicht korrekt. ${pair.note}`,
    }))
  }
  const groupLabels: Record<(typeof sWords)[number]['group'], string> = {
    ss: 'ss nach kurzem Vokal',
    'ß': 'ß nach langem Vokal oder Doppellaut',
    s: 's, durch Ableiten geprüft',
  }
  for (const item of sWords) {
    tasks.push(task({
      id: `spell-s-${item.word}`,
      area: 'spelling',
      type: 'spell-s',
      typeLabel: 's, ss oder ß',
      difficulty: item.group === 's' ? 3 : 2,
      tags: ['rechtschreibung', 's-ss-ß'],
      prompt: 'Welche Schreibung passt zu der Regel?',
      stimulus: item.word,
      interaction: { kind: 'choose', layout: 'stack', options: options(Object.values(groupLabels)), correctId: groupLabels[item.group] },
      feedbackCorrect: item.note,
      feedbackIncorrect: item.note,
    }))
  }
  for (const item of confusedWords) {
    const stimulus = item.correct === 'wider'
      ? item.sentence
      : item.sentence.replace(new RegExp(`(?<![\\p{L}])${item.correct}(?![\\p{L}])`, 'u'), '___')
    if (!stimulus.includes('___') && item.correct !== 'wider') {
      throw new Error(`Lücke fehlt: ${item.sentence}`)
    }
    tasks.push(task({
      id: `spell-confuse-${item.id}`,
      area: 'spelling',
      type: 'spell-confuse',
      typeLabel: 'Wörter unterscheiden',
      difficulty: 3,
      tags: ['rechtschreibung', item.topic],
      prompt: item.prompt,
      stimulus,
      interaction: { kind: 'choose', layout: 'pair', options: options(item.options), correctId: item.correct },
      feedbackCorrect: item.note,
      feedbackIncorrect: `${item.note} Richtig ist: ${item.sentence}`,
    }))
  }
  for (const item of commaSentences) {
    if (renderCommas(item.words, item.slots) !== item.solution) {
      throw new Error(`Komma abweichend: ${item.id} → ${renderCommas(item.words, item.slots)}`)
    }
    tasks.push(task({
      id: `spell-comma-${item.id}`,
      area: 'spelling',
      type: 'spell-comma',
      typeLabel: 'Kommas setzen',
      difficulty: item.difficulty,
      tags: ['rechtschreibung', 'komma'],
      prompt: 'Tippe hinter das Wort, nach dem ein Komma steht.',
      interaction: { kind: 'commas', words: item.words, correctSlots: item.slots },
      feedbackCorrect: `${item.note} ${item.solution}`,
      feedbackIncorrect: `${item.note} ${item.solution}`,
    }))
  }
  for (const item of syllableItems) {
    tasks.push(task({
      id: `spell-syllable-${item.word}`,
      area: 'spelling',
      type: 'spell-syllable',
      typeLabel: 'Silben ordnen',
      difficulty: item.parts.length > 2 ? 2 : 1,
      tags: ['rechtschreibung', 'silben'],
      prompt: 'Bringe die Silben in die richtige Reihenfolge.',
      stimulus: item.word,
      interaction: {
        kind: 'order',
        items: item.parts.map((part) => ({ id: part, text: part })),
        correctIds: [...item.parts],
      },
      feedbackCorrect: `${item.word} trennt man ${item.parts.join('-')}. Getrennt wird nach Sprechsilben. ch, ck und sch bleiben zusammen.`,
      feedbackIncorrect: `${item.word} trennt man ${item.parts.join('-')}. Bei mehreren Mitlauten wandert der letzte Mitlaut zur nächsten Silbe. ch, ck und sch werden nicht getrennt.`,
    }))
  }
  tasks.push(task({
    id: 'spell-ie-exception',
    area: 'spelling',
    type: 'spell-bool',
    typeLabel: 'Richtig oder falsch',
    difficulty: 2,
    tags: ['rechtschreibung', 'ie oder i'],
    prompt: 'Stimmt diese Aussage?',
    stimulus: 'Die Merkwörter mir, dir und Kino schreibt man ohne ie.',
    interaction: { kind: 'bool', correct: true },
    feedbackCorrect: 'mir, dir und Kino sind die genannten Ausnahmen ohne ie.',
    feedbackIncorrect: 'mir, dir und Kino sind die genannten Ausnahmen ohne ie.',
  }))
  tasks.push(task({
    id: 'spell-syllable-rule',
    area: 'spelling',
    type: 'spell-bool',
    typeLabel: 'Richtig oder falsch',
    difficulty: 2,
    tags: ['rechtschreibung', 'silben'],
    prompt: 'Stimmt diese Aussage?',
    stimulus: 'ch, ck und sch werden bei der Silbentrennung nicht auseinandergerissen.',
    interaction: { kind: 'bool', correct: true },
    feedbackCorrect: 'ch, ck und sch bleiben zusammen. Deshalb heißt es Ta-sche und Zu-cker.',
    feedbackIncorrect: 'ch, ck und sch bleiben zusammen. Deshalb heißt es Ta-sche und Zu-cker.',
  }))
  tasks.push(task({
    id: 'spell-comma-und',
    area: 'spelling',
    type: 'spell-bool',
    typeLabel: 'Richtig oder falsch',
    difficulty: 2,
    tags: ['rechtschreibung', 'komma'],
    prompt: 'Stimmt diese Aussage?',
    stimulus: 'In der Aufzählung „Äpfel, Birnen und Bananen“ steht vor und ein Komma.',
    interaction: { kind: 'bool', correct: false },
    feedbackCorrect: 'In dieser einfachen Aufzählung steht kein Komma vor und.',
    feedbackIncorrect: 'In dieser einfachen Aufzählung steht kein Komma vor und.',
  }))
  return tasks
}

const builders: Record<AreaId, () => Task[]> = {
  nouns: buildNounTasks,
  cases: buildCaseTasks,
  adjectives: buildAdjectiveTasks,
  verbs: buildVerbTasks,
  tenses: buildTenseTasks,
  voice: buildVoiceTasks,
  capitalization: buildCapitalizationTasks,
  spelling: buildSpellingTasks,
}

let cache: Task[] | null = null

export function allTasks(): Task[] {
  if (!cache) cache = (Object.keys(builders) as AreaId[]).flatMap((area) => builders[area]())
  return cache
}

export function tasksFor(area: AreaId): Task[] {
  return allTasks().filter((item) => item.area === area)
}
