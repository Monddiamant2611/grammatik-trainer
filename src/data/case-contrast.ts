import type { CaseSentence } from './cases'

const ARTICLE = /\b(der|die|das|dem|den|des|ein|eine|einem|einen|einer|eines)\b/giu
const PRONOUN = /\b(ich|du|er|sie|es|wir|ihr|mir|dir|ihm|uns|euch|mich|dich|ihnen)\b/giu
const ARTICLE_WORD = /^(der|die|das|dem|den|des|ein|eine|einem|einen|einer|eines)$/i

/** Zählt Kasusträger: Artikelwortgruppen, Pronomen und Eigennamen. */
export function caseGroupCount(sentence: string): number {
  const articles = sentence.match(ARTICLE)?.length ?? 0
  const pronouns = sentence.match(PRONOUN)?.length ?? 0
  const names = [...sentence.matchAll(/\b([A-ZÄÖÜ][a-zäöü]+)\b/g)]
    .map((match) => match[1] ?? '')
    .filter((word) => word.length > 0 && !ARTICLE_WORD.test(word))
    .filter((word) => !new RegExp(`\\b(?:der|die|das|dem|den|des|ein|eine|einem|einen|einer|eines)\\s+${word}\\b`, 'iu').test(sentence))
  return articles + pronouns + names.length
}

const LIGHT = [
  ' neben dem Haus',
  ' bei der Freundin',
  ' mit dem Ball',
  ' vor dem Tor',
  ' hinter der Schule',
  ' unter dem Tisch',
] as const

const RICH = [
  ' neben dem Haus des Nachbarn',
  ' bei der Schwester des Freundes',
  ' mit dem Ball des Bruders',
  ' vor dem Tor der Schule',
] as const

function pick<T>(id: string, items: readonly T[]): T {
  let hash = 0
  for (const char of id) hash = (Math.imul(hash, 33) + char.charCodeAt(0)) >>> 0
  return items[hash % items.length] as T
}

/**
 * Ergänzt zu knappe Sätze um eine weitere Wortgruppe mit anderem Kasus.
 * IDs, Zielphrasen und Kasus bleiben unverändert. Die Frageprobe bleibt gültig,
 * weil das finite Verb und die Zielphrase stehen bleiben.
 */
export function withCaseContrast(sentence: CaseSentence): CaseSentence {
  const needed = sentence.difficulty === 1 ? 2 : 3
  if (caseGroupCount(sentence.sentence) >= needed) return sentence
  const pool = sentence.difficulty === 1 ? LIGHT : RICH
  const tail = [pick(sentence.id, pool), ...pool].find((item) => sentence.targets.every((target) => !item.includes(target.surface)))
  if (!tail) return sentence
  const next = sentence.sentence.replace(/\.$/, `${tail}.`)
  if (!sentence.targets.every((target) => next.includes(target.surface))) return sentence
  if (sentence.targets.some((target) => next.split(target.surface).length > 2)) return sentence
  return { ...sentence, sentence: next }
}
