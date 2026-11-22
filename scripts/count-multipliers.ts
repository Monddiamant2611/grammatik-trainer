import {
  buildAdjectiveTasks,
  buildCapitalizationTasks,
  buildCaseTasks,
  buildNounTasks,
  buildSpellingTasks,
  buildTenseTasks,
  buildVerbTasks,
  buildVoiceTasks,
} from '../src/engine/generate'
import { adjectives } from '../src/data/adjectives'
import { capitalizationSentences } from '../src/data/capitalization'
import { caseSentences } from '../src/data/cases'
import { nounSentences } from '../src/data/nouns'
import { spellingPairs } from '../src/data/spelling'
import { tensePools, recognitionSentences } from '../src/data/tenses'
import { verbParadigms, gapSentences, perfectItems } from '../src/data/verbs'
import { voicePairs } from '../src/data/voice'

const areas = [
  ['nouns', buildNounTasks, nounSentences.length, 'nounSentences'],
  ['cases', buildCaseTasks, caseSentences.length, 'caseSentences'],
  ['adjectives', buildAdjectiveTasks, adjectives.length, 'adjectives'],
  ['verbs', buildVerbTasks, verbParadigms.length, 'verbParadigms'],
  ['tenses', buildTenseTasks, tensePools.length, 'tensePools'],
  ['voice', buildVoiceTasks, voicePairs.length, 'voicePairs'],
  ['capitalization', buildCapitalizationTasks, capitalizationSentences.length, 'capSentences'],
  ['spelling', buildSpellingTasks, spellingPairs.length, 'spellingPairs'],
] as const

for (const [name, builder, seeds, label] of areas) {
  const total = builder().length
  console.log(`${name}: ${total} tasks, ${seeds} ${label}, ~${(total / seeds).toFixed(1)} per seed`)
}
console.log('gaps', gapSentences.length, 'perfect', perfectItems.length, 'recognition', recognitionSentences.length)