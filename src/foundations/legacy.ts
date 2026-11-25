import type { AreaId } from '../domain/areas'

/** Stand vor der kleinschrittigen Tutorialfassung. Dient nur der Fortschrittsmigration. */
export const TUTORIAL_REVISION = 1

export const LEGACY_TUTORIAL_IDS: Record<AreaId, readonly string[]> = {
  nouns: ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7'],
  cases: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'],
  adjectives: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10', 'a11'],
  verbs: ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10', 'v11'],
  tenses: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9'],
  voice: ['p1', 'p2', 'p3', 'p3b', 'p4', 'p5', 'p6', 'p6b', 'p7', 'p8', 'p9', 'p10'],
  capitalization: ['g1', 'g2', 'g3', 'g4', 'g4b', 'g4c', 'g5', 'g6', 'g7', 'g8'],
  spelling: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's8b', 's9', 's9b', 's10', 's10b', 's10c', 's11'],
}
