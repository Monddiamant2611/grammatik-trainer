import { capitalizationSentences } from '../src/data/capitalization.ts'
import { renderToggle } from '../src/engine/text.ts'

const problems = []
for (const sentence of capitalizationSentences) {
  if (!sentence.toggle) continue
  const renderedFaulty = renderToggle(sentence.tokens, 'faulty')
  const renderedCorrect = renderToggle(sentence.tokens, 'correct')
  if (renderedFaulty !== sentence.faultySentence) problems.push({ id: sentence.id, kind: 'faulty', got: renderedFaulty, want: sentence.faultySentence })
  if (renderedCorrect !== sentence.correctSentence) problems.push({ id: sentence.id, kind: 'correct', got: renderedCorrect, want: sentence.correctSentence })
}
console.log(JSON.stringify(problems, null, 2))
console.log('count', problems.length)