import {
  articleProbesExtra,
  capitalizationPairsExtra,
  concreteAbstractExtra,
  nounSentencesExtra,
  pluralProbesExtra,
  properNamesExtra,
} from './nouns.extra'

export interface NounSentence {
  id: string
  sentence: string
  nouns: string[]
  traps: string[]
  difficulty: 1 | 2 | 3
  text: boolean
}

const nounSentencesBase: readonly NounSentence[] = [
  { id: 'n01', sentence: 'Am Sonntag besucht Lena ihren Bruder im Park.', nouns: ['Sonntag', 'Lena', 'Bruder', 'Park'], traps: [], difficulty: 2, text: true },
  { id: 'n02', sentence: 'Der Hund trägt einen Ball durch den Garten.', nouns: ['Hund', 'Ball', 'Garten'], traps: [], difficulty: 1, text: true },
  { id: 'n03', sentence: 'Eine Blume wächst neben dem Fenster.', nouns: ['Blume', 'Fenster'], traps: [], difficulty: 1, text: false },
  { id: 'n04', sentence: 'Anna liest ein spannendes Buch.', nouns: ['Anna', 'Buch'], traps: [], difficulty: 1, text: false },
  { id: 'n05', sentence: 'Berlin ist eine große Stadt.', nouns: ['Berlin', 'Stadt'], traps: [], difficulty: 2, text: false },
  { id: 'n06', sentence: 'Glück ist für viele Menschen wichtig.', nouns: ['Glück', 'Menschen'], traps: [], difficulty: 2, text: false },
  { id: 'n07', sentence: 'Der Lehrer schreibt die Aufgabe an die Tafel.', nouns: ['Lehrer', 'Aufgabe', 'Tafel'], traps: [], difficulty: 2, text: true },
  { id: 'n08', sentence: 'Mut hilft dem Jungen in dieser Situation.', nouns: ['Mut', 'Jungen', 'Situation'], traps: [], difficulty: 3, text: true },
  { id: 'n09', sentence: 'Die Kinder spielen Fußball auf dem Schulhof.', nouns: ['Kinder', 'Fußball', 'Schulhof'], traps: [], difficulty: 2, text: true },
  { id: 'n10', sentence: 'Meine Schwester liebt Musik.', nouns: ['Schwester', 'Musik'], traps: [], difficulty: 1, text: false },
  { id: 'n11', sentence: 'Die Katze schläft auf dem Sofa.', nouns: ['Katze', 'Sofa'], traps: [], difficulty: 1, text: false },
  { id: 'n12', sentence: 'Freundschaft braucht Vertrauen.', nouns: ['Freundschaft', 'Vertrauen'], traps: [], difficulty: 3, text: false },
  { id: 'n13', sentence: 'Im Sommer besuchen wir München.', nouns: ['Sommer', 'München'], traps: [], difficulty: 2, text: false },
  { id: 'n14', sentence: 'Das Leben steckt voller Überraschungen.', nouns: ['Leben', 'Überraschungen'], traps: [], difficulty: 3, text: false },
  { id: 'n15', sentence: 'Heute beginnt der Unterricht später.', nouns: ['Unterricht'], traps: ['Heute'], difficulty: 3, text: false },
  { id: 'n16', sentence: 'Schnell läuft der Junge zur Schule.', nouns: ['Junge', 'Schule'], traps: ['Schnell'], difficulty: 3, text: false },
  { id: 'n17', sentence: 'Der alte Mann liest die Zeitung.', nouns: ['Mann', 'Zeitung'], traps: [], difficulty: 1, text: false },
  { id: 'n18', sentence: 'Die Kinder freuen sich über das schöne Wetter.', nouns: ['Kinder', 'Wetter'], traps: [], difficulty: 2, text: false },
  { id: 'n19', sentence: 'Liebe und Hoffnung geben Menschen Kraft.', nouns: ['Liebe', 'Hoffnung', 'Menschen', 'Kraft'], traps: [], difficulty: 3, text: true },
  { id: 'n20', sentence: 'Der Rhein fließt durch mehrere Länder.', nouns: ['Rhein', 'Länder'], traps: [], difficulty: 2, text: false },
]

export const nounSentences: readonly NounSentence[] = [...nounSentencesBase, ...nounSentencesExtra]

export const nounCategories = [
  { id: 'person', word: 'Lehrer', label: 'Person' },
  { id: 'animal', word: 'Hund', label: 'Tier' },
  { id: 'thing', word: 'Buch', label: 'Ding' },
  { id: 'plant', word: 'Rose', label: 'Pflanze' },
  { id: 'place', word: 'Berlin', label: 'Ort' },
  { id: 'feeling', word: 'Freude', label: 'Gefühl' },
] as const

export const articleProbes = [
  { word: 'Hund', correct: 'der Hund', options: ['der Hund', 'die Hund', 'das Hund'] },
  { word: 'Blume', correct: 'die Blume', options: ['der Blume', 'die Blume', 'das Blume'] },
  { word: 'Haus', correct: 'das Haus', options: ['der Haus', 'die Haus', 'das Haus'] },
  { word: 'Mut', correct: 'der Mut', options: ['der Mut', 'die Mut', 'das Mut'] },
  ...articleProbesExtra,
] as const

export const pluralProbes = [
  { singular: 'Hund', plural: 'Hunde' },
  { singular: 'Blume', plural: 'Blumen' },
  { singular: 'Buch', plural: 'Bücher' },
  { singular: 'Kind', plural: 'Kinder' },
  ...pluralProbesExtra,
] as const

export const concreteAbstract = [
  { word: 'Tisch', kind: 'konkret' },
  { word: 'Hund', kind: 'konkret' },
  { word: 'Freude', kind: 'abstrakt' },
  { word: 'Mut', kind: 'abstrakt' },
  { word: 'Zeit', kind: 'abstrakt' },
  { word: 'Liebe', kind: 'abstrakt' },
  ...concreteAbstractExtra,
] as const

export const properNames = ['Anna', 'Berlin', 'Rhein', 'München', ...properNamesExtra] as const

export const capitalizationPairs = [
  { faulty: 'der hund', correct: 'der Hund', error: 'hund' },
  { faulty: 'die schule', correct: 'die Schule', error: 'schule' },
  { faulty: 'das leben', correct: 'das Leben', error: 'leben' },
  ...capitalizationPairsExtra,
] as const
