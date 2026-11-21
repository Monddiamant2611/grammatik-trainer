export type VoiceTense = 'praesens' | 'praeteritum' | 'perfekt' | 'plusquam' | 'futur1' | 'futur2'

export const voiceTenseLabels: Record<VoiceTense, string> = {
  praesens: 'Passiv Präsens',
  praeteritum: 'Passiv Präteritum',
  perfekt: 'Passiv Perfekt',
  plusquam: 'Passiv Plusquamperfekt',
  futur1: 'Passiv Futur I',
  futur2: 'Passiv Futur II',
}

export interface VoicePair {
  id: string
  difficulty: 1 | 2 | 3
  tense: Exclude<VoiceTense, 'futur2'>
  active: string
  passive: string
  agent: string
  patient: string
  activeObject: string
  passiveAgent: string
  parts: string[]
}

export const voicePairs: readonly VoicePair[] = [
  { id: 'v01', difficulty: 1, tense: 'praesens', active: 'Der Junge schießt den Ball.', passive: 'Der Ball wird vom Jungen geschossen.', agent: 'der Junge', patient: 'der Ball', activeObject: 'den Ball', passiveAgent: 'vom Jungen', parts: ['wird', 'geschossen'] },
  { id: 'v02', difficulty: 1, tense: 'praesens', active: 'Die Kinder bauen ein Haus.', passive: 'Ein Haus wird von den Kindern gebaut.', agent: 'die Kinder', patient: 'ein Haus', activeObject: 'ein Haus', passiveAgent: 'von den Kindern', parts: ['wird', 'gebaut'] },
  { id: 'v03', difficulty: 1, tense: 'praesens', active: 'Die Köchin kocht das Essen.', passive: 'Das Essen wird von der Köchin gekocht.', agent: 'die Köchin', patient: 'das Essen', activeObject: 'das Essen', passiveAgent: 'von der Köchin', parts: ['wird', 'gekocht'] },
  { id: 'v04', difficulty: 1, tense: 'praesens', active: 'Der Mann repariert das Auto.', passive: 'Das Auto wird von dem Mann repariert.', agent: 'der Mann', patient: 'das Auto', activeObject: 'das Auto', passiveAgent: 'von dem Mann', parts: ['wird', 'repariert'] },
  { id: 'v05', difficulty: 1, tense: 'praesens', active: 'Die Schülerinnen schreiben einen Brief.', passive: 'Ein Brief wird von den Schülerinnen geschrieben.', agent: 'die Schülerinnen', patient: 'ein Brief', activeObject: 'einen Brief', passiveAgent: 'von den Schülerinnen', parts: ['wird', 'geschrieben'] },
  { id: 'v06', difficulty: 1, tense: 'praesens', active: 'Der Lehrer erklärt die Aufgabe.', passive: 'Die Aufgabe wird vom Lehrer erklärt.', agent: 'der Lehrer', patient: 'die Aufgabe', activeObject: 'die Aufgabe', passiveAgent: 'vom Lehrer', parts: ['wird', 'erklärt'] },
  { id: 'v07', difficulty: 1, tense: 'praesens', active: 'Mia öffnet das Fenster.', passive: 'Das Fenster wird von Mia geöffnet.', agent: 'Mia', patient: 'das Fenster', activeObject: 'das Fenster', passiveAgent: 'von Mia', parts: ['wird', 'geöffnet'] },
  { id: 'v08', difficulty: 1, tense: 'praesens', active: 'Paul trägt die Kiste.', passive: 'Die Kiste wird von Paul getragen.', agent: 'Paul', patient: 'die Kiste', activeObject: 'die Kiste', passiveAgent: 'von Paul', parts: ['wird', 'getragen'] },
  { id: 'v09', difficulty: 1, tense: 'praesens', active: 'Der Hausmeister schließt die Tür.', passive: 'Die Tür wird vom Hausmeister geschlossen.', agent: 'der Hausmeister', patient: 'die Tür', activeObject: 'die Tür', passiveAgent: 'vom Hausmeister', parts: ['wird', 'geschlossen'] },
  { id: 'v10', difficulty: 1, tense: 'praesens', active: 'Die Klasse liest den Text.', passive: 'Der Text wird von der Klasse gelesen.', agent: 'die Klasse', patient: 'der Text', activeObject: 'den Text', passiveAgent: 'von der Klasse', parts: ['wird', 'gelesen'] },
  { id: 'v11', difficulty: 2, tense: 'praeteritum', active: 'Der Mechaniker reparierte das Fahrrad.', passive: 'Das Fahrrad wurde vom Mechaniker repariert.', agent: 'der Mechaniker', patient: 'das Fahrrad', activeObject: 'das Fahrrad', passiveAgent: 'vom Mechaniker', parts: ['wurde', 'repariert'] },
  { id: 'v12', difficulty: 2, tense: 'praeteritum', active: 'Die Feuerwehr löschte das Feuer.', passive: 'Das Feuer wurde von der Feuerwehr gelöscht.', agent: 'die Feuerwehr', patient: 'das Feuer', activeObject: 'das Feuer', passiveAgent: 'von der Feuerwehr', parts: ['wurde', 'gelöscht'] },
  { id: 'v13', difficulty: 3, tense: 'perfekt', active: 'Die Kinder haben das Zimmer aufgeräumt.', passive: 'Das Zimmer ist von den Kindern aufgeräumt worden.', agent: 'die Kinder', patient: 'das Zimmer', activeObject: 'das Zimmer', passiveAgent: 'von den Kindern', parts: ['ist', 'aufgeräumt', 'worden'] },
  { id: 'v14', difficulty: 3, tense: 'perfekt', active: 'Die Lehrerin hat die Aufgaben erklärt.', passive: 'Die Aufgaben sind von der Lehrerin erklärt worden.', agent: 'die Lehrerin', patient: 'die Aufgaben', activeObject: 'die Aufgaben', passiveAgent: 'von der Lehrerin', parts: ['sind', 'erklärt', 'worden'] },
  { id: 'v15', difficulty: 3, tense: 'plusquam', active: 'Der Hausmeister hatte die Tür geschlossen.', passive: 'Die Tür war vom Hausmeister geschlossen worden.', agent: 'der Hausmeister', patient: 'die Tür', activeObject: 'die Tür', passiveAgent: 'vom Hausmeister', parts: ['war', 'geschlossen', 'worden'] },
  { id: 'v16', difficulty: 3, tense: 'futur1', active: 'Die Firma wird das Gebäude renovieren.', passive: 'Das Gebäude wird von der Firma renoviert werden.', agent: 'die Firma', patient: 'das Gebäude', activeObject: 'das Gebäude', passiveAgent: 'von der Firma', parts: ['wird', 'renoviert', 'werden'] },
]

export const voicePatternSentence = {
  sentence: 'Der Ball wird geschossen worden sein.',
  tense: 'futur2' as const,
  parts: ['wird', 'geschossen', 'worden', 'sein'],
}

export const voiceErrors = [
  {
    id: 've1',
    faulty: 'Der Ball wird vom Jungen schießen.',
    correct: 'Der Ball wird vom Jungen geschossen.',
    error: 'schießen',
    note: 'Im Passiv Präsens steht wird mit dem Partizip II: geschossen.',
  },
  {
    id: 've2',
    faulty: 'Der Ball ist geschossen geworden.',
    correct: 'Der Ball ist geschossen worden.',
    error: 'geworden',
    note: 'Im Passiv Perfekt steht worden, nicht geworden.',
  },
  {
    id: 've3',
    faulty: 'Die Aufgabe werden erklärt.',
    correct: 'Die Aufgabe wird erklärt.',
    error: 'werden',
    note: 'Die Aufgabe ist Singular. Deshalb steht wird, nicht werden.',
  },
  {
    id: 've4',
    faulty: 'Das Haus wird von den Kindern bauen.',
    correct: 'Das Haus wird von den Kindern gebaut.',
    error: 'bauen',
    note: 'Nach wird steht das Partizip II: gebaut.',
  },
  {
    id: 've5',
    faulty: 'Die Tür wurde geschlossen worden.',
    correct: 'Die Tür ist geschlossen worden.',
    error: 'wurde',
    note: 'Passiv Perfekt bildet man mit ist oder sind, dem Partizip II und worden.',
  },
] as const
