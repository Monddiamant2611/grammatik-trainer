export type AdjectivePattern = 'regular' | 'umlaut' | 'el-er' | 'esten' | 'irregular'

export interface AdjectiveTriple {
  id: string
  positive: string
  comparative: string
  superlative: string
  pattern: AdjectivePattern
  difficulty: 1 | 2 | 3
}

import { adjectivesExtra, adjectiveErrorsExtra, comparisonSentencesExtra } from './adjectives.extra'

export const adjectives: readonly AdjectiveTriple[] = [
  { id: 'a01', positive: 'schnell', comparative: 'schneller', superlative: 'am schnellsten', pattern: 'regular', difficulty: 1 },
  { id: 'a02', positive: 'schön', comparative: 'schöner', superlative: 'am schönsten', pattern: 'regular', difficulty: 1 },
  { id: 'a03', positive: 'klein', comparative: 'kleiner', superlative: 'am kleinsten', pattern: 'regular', difficulty: 1 },
  { id: 'a04', positive: 'groß', comparative: 'größer', superlative: 'am größten', pattern: 'umlaut', difficulty: 2 },
  { id: 'a05', positive: 'lang', comparative: 'länger', superlative: 'am längsten', pattern: 'umlaut', difficulty: 2 },
  { id: 'a06', positive: 'kalt', comparative: 'kälter', superlative: 'am kältesten', pattern: 'umlaut', difficulty: 2 },
  { id: 'a07', positive: 'warm', comparative: 'wärmer', superlative: 'am wärmsten', pattern: 'umlaut', difficulty: 2 },
  { id: 'a08', positive: 'jung', comparative: 'jünger', superlative: 'am jüngsten', pattern: 'umlaut', difficulty: 2 },
  { id: 'a09', positive: 'alt', comparative: 'älter', superlative: 'am ältesten', pattern: 'umlaut', difficulty: 2 },
  { id: 'a10', positive: 'kurz', comparative: 'kürzer', superlative: 'am kürzesten', pattern: 'umlaut', difficulty: 2 },
  { id: 'a11', positive: 'teuer', comparative: 'teurer', superlative: 'am teuersten', pattern: 'el-er', difficulty: 2 },
  { id: 'a12', positive: 'dunkel', comparative: 'dunkler', superlative: 'am dunkelsten', pattern: 'el-er', difficulty: 2 },
  { id: 'a13', positive: 'bunt', comparative: 'bunter', superlative: 'am buntesten', pattern: 'esten', difficulty: 2 },
  { id: 'a14', positive: 'breit', comparative: 'breiter', superlative: 'am breitesten', pattern: 'esten', difficulty: 2 },
  { id: 'a15', positive: 'laut', comparative: 'lauter', superlative: 'am lautesten', pattern: 'esten', difficulty: 2 },
  { id: 'a16', positive: 'leise', comparative: 'leiser', superlative: 'am leisesten', pattern: 'esten', difficulty: 2 },
  { id: 'a17', positive: 'modern', comparative: 'moderner', superlative: 'am modernsten', pattern: 'regular', difficulty: 1 },
  { id: 'a18', positive: 'wichtig', comparative: 'wichtiger', superlative: 'am wichtigsten', pattern: 'regular', difficulty: 1 },
  { id: 'a19', positive: 'beliebt', comparative: 'beliebter', superlative: 'am beliebtesten', pattern: 'esten', difficulty: 2 },
  { id: 'a20', positive: 'interessant', comparative: 'interessanter', superlative: 'am interessantesten', pattern: 'esten', difficulty: 3 },
  { id: 'a21', positive: 'häufig', comparative: 'häufiger', superlative: 'am häufigsten', pattern: 'regular', difficulty: 1 },
  { id: 'a22', positive: 'dankbar', comparative: 'dankbarer', superlative: 'am dankbarsten', pattern: 'regular', difficulty: 1 },
  { id: 'a23', positive: 'gut', comparative: 'besser', superlative: 'am besten', pattern: 'irregular', difficulty: 3 },
  { id: 'a24', positive: 'viel', comparative: 'mehr', superlative: 'am meisten', pattern: 'irregular', difficulty: 3 },
  { id: 'a25', positive: 'hoch', comparative: 'höher', superlative: 'am höchsten', pattern: 'irregular', difficulty: 3 },
  ...adjectivesExtra,
]

export interface ComparisonSentence {
  id: string
  sentence: string
  connector: 'als' | 'wie'
  difficulty: 1 | 2 | 3
}

export const comparisonSentences: readonly ComparisonSentence[] = [
  { id: 'v01', sentence: 'Der Zug ist schneller als das Auto.', connector: 'als', difficulty: 1 },
  { id: 'v02', sentence: 'Mia ist so groß wie ihre Schwester.', connector: 'wie', difficulty: 1 },
  { id: 'v03', sentence: 'Dieser Weg ist kürzer als der andere.', connector: 'als', difficulty: 1 },
  { id: 'v04', sentence: 'Heute ist es wärmer als gestern.', connector: 'als', difficulty: 2 },
  { id: 'v05', sentence: 'Ben läuft genauso schnell wie Paul.', connector: 'wie', difficulty: 2 },
  { id: 'v06', sentence: 'Der blaue Rucksack ist schwerer als der rote.', connector: 'als', difficulty: 2 },
  { id: 'v07', sentence: 'Dieses Buch ist interessanter als das andere.', connector: 'als', difficulty: 2 },
  { id: 'v08', sentence: 'Lena ist so alt wie Mia.', connector: 'wie', difficulty: 1 },
  { id: 'v09', sentence: 'Der Berg ist höher als der Hügel.', connector: 'als', difficulty: 3 },
  { id: 'v10', sentence: 'Paul ist nicht so groß wie sein Bruder.', connector: 'wie', difficulty: 3 },
  ...comparisonSentencesExtra,
]

export interface SpellingFix {
  id: string
  faulty: string
  correct: string
  error: string
  note: string
}

export const adjectiveErrors: readonly SpellingFix[] = [
  {
    id: 'ae1',
    faulty: 'Er ist schneller wie ich.',
    correct: 'Er ist schneller als ich.',
    error: 'wie',
    note: 'Beim Unterschied steht als: schneller als. Die Form größer wie ist hier nicht richtig.',
  },
  {
    id: 'ae2',
    faulty: 'Das ist der am schnellsten Zug.',
    correct: 'Das ist der schnellste Zug.',
    error: 'am',
    note: 'Vor einem Nomen steht der Superlativ mit Endung: der schnellste Zug. Am schnellsten steht ohne Nomen.',
  },
  {
    id: 'ae3',
    faulty: 'Das Auto ist am teuerste.',
    correct: 'Das Auto ist am teuersten.',
    error: 'teuerste',
    note: 'Nach am folgt die Form auf -en: am teuersten.',
  },
  {
    id: 'ae4',
    faulty: 'Das ist mehr besser.',
    correct: 'Das ist besser.',
    error: 'mehr',
    note: 'Besser ist schon der Komparativ von gut. Mehr besser setzt die Steigerung doppelt.',
  },
  {
    id: 'ae5',
    faulty: 'Er ist groß wie sein Bruder.',
    correct: 'Er ist so groß wie sein Bruder.',
    error: 'groß',
    note: 'Bei einem gleichen Vergleich steht so … wie: so groß wie.',
  },
  ...adjectiveErrorsExtra,
]
