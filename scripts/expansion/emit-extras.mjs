import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { adjectivesExtra, comparisonSentencesExtra, adjectiveErrorsExtra } from './adjectives-data.mjs'
import { nounsExtra } from './nouns-data.mjs'
import { casesExtra } from './cases-data.mjs'
import { verbsExtra } from './verbs-data.mjs'
import { tensesExtra } from './tenses-data.mjs'
import { voiceExtra } from './voice-data.mjs'
import { capitalizationExtra } from './capitalization-data.mjs'
import { spellingExtra } from './spelling-data.mjs'

const dataDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'src', 'data')

function emit(name, imports, body) {
  writeFileSync(
    join(dataDir, name),
    `${imports}\n\n${body}\n`,
    'utf8',
  )
  console.log('wrote', name)
}

function objToTs(value, indent = 0) {
  const sp = ' '.repeat(indent)
  if (value === null) return 'null'
  if (typeof value === 'string') return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
  if (typeof value === 'undefined') return 'undefined'
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    return `[\n${value.map((v) => `${sp}  ${objToTs(v, indent + 2)},`).join('\n')}\n${sp}]`
  }
  const entries = Object.entries(value).filter(([, v]) => v !== undefined)
  return `{\n${entries.map(([k, v]) => `${sp}  ${/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k) ? k : `'${k}'`}: ${objToTs(v, indent + 2)},`).join('\n')}\n${sp}}`
}

emit(
  'adjectives.extra.ts',
  `import type { AdjectivePattern } from './adjectives'

export const adjectivesExtra = ${objToTs(adjectivesExtra)} as const

export const comparisonSentencesExtra = ${objToTs(comparisonSentencesExtra)} as const

export const adjectiveErrorsExtra = ${objToTs(adjectiveErrorsExtra)} as const`,
  '',
)

emit(
  'nouns.extra.ts',
  "import type { NounSentence } from './nouns'",
  `export const nounSentencesExtra: readonly NounSentence[] = ${objToTs(nounsExtra.sentences)} as const

export const articleProbesExtra = ${objToTs(nounsExtra.articleProbes)} as const

export const pluralProbesExtra = ${objToTs(nounsExtra.pluralProbes)} as const

export const concreteAbstractExtra = ${objToTs(nounsExtra.concreteAbstract)} as const

export const properNamesExtra = ${objToTs(nounsExtra.properNames)} as const

export const capitalizationPairsExtra = ${objToTs(nounsExtra.capitalizationPairs)} as const`,
)

emit(
  'cases.extra.ts',
  "import type { CaseSentence } from './cases'",
  `export const caseSentencesExtra: readonly CaseSentence[] = ${objToTs(casesExtra)} as const`,
)

emit(
  'verbs.extra.ts',
  "import type { VerbParadigm, GapSentence, PerfectItem } from './verbs'",
  `export const verbParadigmsExtra: readonly VerbParadigm[] = ${objToTs(verbsExtra.paradigms)} as const

export const gapSentencesExtra: readonly GapSentence[] = ${objToTs(verbsExtra.gaps)} as const

export const preteriteFormsExtra = ${objToTs(verbsExtra.preterite)} as const

export const participlePairsExtra = ${objToTs(verbsExtra.participles)} as const

export const perfectItemsExtra: readonly PerfectItem[] = ${objToTs(verbsExtra.perfect)} as const`,
)

emit(
  'tenses.extra.ts',
  "import type { TensePool, RecognitionSentence } from './tenses'",
  `export const tensePoolsExtra: readonly TensePool[] = ${objToTs(tensesExtra.pools)} as const

export const recognitionSentencesExtra: readonly RecognitionSentence[] = ${objToTs(tensesExtra.recognition)} as const`,
)

emit(
  'voice.extra.ts',
  "import type { VoicePair } from './voice'",
  `export const voicePairsExtra: readonly VoicePair[] = ${objToTs(voiceExtra.pairs)} as const

export const voiceErrorsExtra = ${objToTs(voiceExtra.errors)} as const`,
)

emit(
  'capitalization.extra.ts',
  "import type { CapSentence } from './capitalization'",
  `export const capitalizationSentencesExtra: readonly CapSentence[] = ${objToTs(capitalizationExtra)} as const`,
)

emit(
  'spelling.extra.ts',
  `import type { SpellingPair, SGroup, ConfusedItem, CommaSentence } from './spelling'`,
  `export const spellingPairsExtra: readonly SpellingPair[] = ${objToTs(spellingExtra.pairs)} as const

export const sWordsExtra: readonly { word: string; group: SGroup; note: string }[] = ${objToTs(spellingExtra.sWords)} as const

export const confusedWordsExtra: readonly ConfusedItem[] = ${objToTs(spellingExtra.confused)} as const

export const commaSentencesExtra: readonly CommaSentence[] = ${objToTs(spellingExtra.comma)} as const

export const syllableItemsExtra = ${objToTs(spellingExtra.syllable)} as const`,
)

console.log('done')