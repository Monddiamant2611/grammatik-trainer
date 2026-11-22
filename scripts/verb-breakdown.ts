import { buildVerbTasks } from '../src/engine/generate'
import { verbParadigms, gapSentences, preteriteForms, participlePairs, perfectItems, persons } from '../src/data/verbs'
import { distinct } from '../src/engine/text'

let paradigmTasks = 0
for (const verb of verbParadigms) {
  const distinctForms = distinct(persons.map((p) => verb.forms[p]))
  for (const person of persons) {
    const form = verb.forms[person]
    const owners = persons.filter((p) => verb.forms[p] === form)
    if (owners.length === 1) paradigmTasks += 1
    paradigmTasks += 1 // form task always
  }
}
console.log('paradigm', paradigmTasks, 'gaps', gapSentences.length, 'pret', preteriteForms.length, 'part', participlePairs.length, 'perf', perfectItems.length * 2)
console.log('total', buildVerbTasks().length)