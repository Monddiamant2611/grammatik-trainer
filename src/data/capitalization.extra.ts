import type { CapSentence } from './capitalization'

export const capitalizationSentencesExtra: readonly CapSentence[] = [
  {
    id: 'xk21',
    difficulty: 1,
    tokens: [
      {
        faulty: 'der',
        correct: 'Der',
        reason: 'sentence',
      },
      {
        faulty: 'hase',
        correct: 'Hase',
        reason: 'noun',
      },
      {
        faulty: 'hüpft',
        correct: 'hüpft',
      },
      {
        faulty: 'über',
        correct: 'über',
      },
      {
        faulty: 'die',
        correct: 'die',
      },
      {
        faulty: 'wiese',
        correct: 'Wiese',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Hase',
      'Wiese',
    ],
    faultySentence: 'der hase hüpft über die wiese.',
    correctSentence: 'Der Hase hüpft über die Wiese.',
    toggle: true,
  },
  {
    id: 'xk22',
    difficulty: 1,
    tokens: [
      {
        faulty: 'die',
        correct: 'Die',
        reason: 'sentence',
      },
      {
        faulty: 'katze',
        correct: 'Katze',
        reason: 'noun',
      },
      {
        faulty: 'jagt',
        correct: 'jagt',
      },
      {
        faulty: 'die',
        correct: 'die',
      },
      {
        faulty: 'maus',
        correct: 'Maus',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Katze',
      'Maus',
    ],
    faultySentence: 'die katze jagt die maus.',
    correctSentence: 'Die Katze jagt die Maus.',
    toggle: true,
  },
  {
    id: 'xk23',
    difficulty: 2,
    tokens: [
      {
        faulty: 'am',
        correct: 'Am',
        reason: 'sentence',
      },
      {
        faulty: 'dienstag',
        correct: 'Dienstag',
        reason: 'noun',
      },
      {
        faulty: 'gibt',
        correct: 'gibt',
      },
      {
        faulty: 'es',
        correct: 'es',
      },
      {
        faulty: 'sport',
        correct: 'Sport',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Dienstag',
      'Sport',
    ],
    faultySentence: 'am dienstag gibt es sport.',
    correctSentence: 'Am Dienstag gibt es Sport.',
    toggle: true,
  },
  {
    id: 'xk24',
    difficulty: 2,
    tokens: [
      {
        faulty: 'im',
        correct: 'Im',
        reason: 'sentence',
      },
      {
        faulty: 'frühling',
        correct: 'Frühling',
        reason: 'noun',
      },
      {
        faulty: 'blühen',
        correct: 'blühen',
      },
      {
        faulty: 'die',
        correct: 'die',
      },
      {
        faulty: 'tulpen',
        correct: 'Tulpen',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Frühling',
      'Tulpen',
    ],
    faultySentence: 'im frühling blühen die tulpen.',
    correctSentence: 'Im Frühling blühen die Tulpen.',
    toggle: true,
  },
  {
    id: 'xk25',
    difficulty: 2,
    tokens: [
      {
        faulty: 'paul',
        correct: 'Paul',
        reason: 'noun',
      },
      {
        faulty: 'lernt',
        correct: 'lernt',
      },
      {
        faulty: 'französisch',
        correct: 'Französisch',
        reason: 'noun',
      },
      {
        faulty: 'in',
        correct: 'in',
      },
      {
        faulty: 'der',
        correct: 'der',
      },
      {
        faulty: 'schule',
        correct: 'Schule',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Paul',
      'Französisch',
      'Schule',
    ],
    faultySentence: 'paul lernt französisch in der schule.',
    correctSentence: 'Paul lernt Französisch in der Schule.',
    toggle: true,
  },
  {
    id: 'xk26',
    difficulty: 2,
    tokens: [
      {
        faulty: 'frau',
        correct: 'Frau',
        reason: 'noun',
      },
      {
        faulty: 'weber',
        correct: 'Weber',
        reason: 'noun',
      },
      {
        faulty: 'erklärt',
        correct: 'erklärt',
      },
      {
        faulty: 'die',
        correct: 'die',
      },
      {
        faulty: 'regel',
        correct: 'Regel',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Frau',
      'Weber',
      'Regel',
    ],
    faultySentence: 'frau weber erklärt die regel.',
    correctSentence: 'Frau Weber erklärt die Regel.',
    toggle: true,
  },
  {
    id: 'xk27',
    difficulty: 2,
    tokens: [
      {
        faulty: 'die',
        correct: 'Die',
        reason: 'sentence',
      },
      {
        faulty: 'donau',
        correct: 'Donau',
        reason: 'noun',
      },
      {
        faulty: 'fließt',
        correct: 'fließt',
      },
      {
        faulty: 'durch',
        correct: 'durch',
      },
      {
        faulty: 'ungarn',
        correct: 'Ungarn',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Donau',
      'Ungarn',
    ],
    faultySentence: 'die donau fließt durch ungarn.',
    correctSentence: 'Die Donau fließt durch Ungarn.',
    toggle: true,
  },
  {
    id: 'xk28',
    difficulty: 1,
    tokens: [
      {
        faulty: 'der',
        correct: 'Der',
        reason: 'sentence',
      },
      {
        faulty: 'bäcker',
        correct: 'Bäcker',
        reason: 'noun',
      },
      {
        faulty: 'verkauft',
        correct: 'verkauft',
      },
      {
        faulty: 'brötchen',
        correct: 'Brötchen',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Bäcker',
      'Brötchen',
    ],
    faultySentence: 'der bäcker verkauft brötchen.',
    correctSentence: 'Der Bäcker verkauft Brötchen.',
    toggle: true,
  },
  {
    id: 'xk29',
    difficulty: 3,
    tokens: [
      {
        faulty: 'leise',
        correct: 'Leise',
        reason: 'sentence',
      },
      {
        faulty: 'schläft',
        correct: 'schläft',
      },
      {
        faulty: 'das',
        correct: 'das',
      },
      {
        faulty: 'baby',
        correct: 'Baby',
        reason: 'noun',
      },
      {
        faulty: 'im',
        correct: 'im',
      },
      {
        faulty: 'bett',
        correct: 'Bett',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Baby',
      'Bett',
    ],
    faultySentence: 'leise schläft das baby im bett.',
    correctSentence: 'Leise schläft das Baby im Bett.',
    toggle: true,
  },
  {
    id: 'xk30',
    difficulty: 2,
    tokens: [
      {
        faulty: 'im',
        correct: 'Im',
        reason: 'sentence',
      },
      {
        faulty: 'januar',
        correct: 'Januar',
        reason: 'noun',
      },
      {
        faulty: 'schneit',
        correct: 'schneit',
      },
      {
        faulty: 'es',
        correct: 'es',
      },
      {
        faulty: 'oft',
        correct: 'oft',
        after: '.',
      },
    ],
    nouns: [
      'Januar',
    ],
    faultySentence: 'im januar schneit es oft.',
    correctSentence: 'Im Januar schneit es oft.',
    toggle: true,
  },
  {
    id: 'xk31',
    difficulty: 2,
    tokens: [
      {
        faulty: 'herr',
        correct: 'Herr',
        reason: 'noun',
      },
      {
        faulty: 'schmidt',
        correct: 'Schmidt',
        reason: 'noun',
      },
      {
        faulty: 'fährt',
        correct: 'fährt',
      },
      {
        faulty: 'nach',
        correct: 'nach',
      },
      {
        faulty: 'hamburg',
        correct: 'Hamburg',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Herr',
      'Schmidt',
      'Hamburg',
    ],
    faultySentence: 'herr schmidt fährt nach hamburg.',
    correctSentence: 'Herr Schmidt fährt nach Hamburg.',
    toggle: true,
  },
  {
    id: 'xk32',
    difficulty: 2,
    tokens: [
      {
        faulty: 'die',
        correct: 'Die',
        reason: 'sentence',
      },
      {
        faulty: 'schüler',
        correct: 'Schüler',
        reason: 'noun',
      },
      {
        faulty: 'lesen',
        correct: 'lesen',
      },
      {
        faulty: 'englisch',
        correct: 'Englisch',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Schüler',
      'Englisch',
    ],
    faultySentence: 'die schüler lesen englisch.',
    correctSentence: 'Die Schüler lesen Englisch.',
    toggle: true,
  },
  {
    id: 'xk33',
    difficulty: 2,
    tokens: [
      {
        faulty: 'ostern',
        correct: 'Ostern',
        reason: 'noun',
      },
      {
        faulty: 'schenken',
        correct: 'schenken',
      },
      {
        faulty: 'wir',
        correct: 'wir',
      },
      {
        faulty: 'ostereier',
        correct: 'Ostereier',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Ostern',
      'Ostereier',
    ],
    faultySentence: 'ostern schenken wir ostereier.',
    correctSentence: 'Ostern schenken wir Ostereier.',
    toggle: true,
  },
  {
    id: 'xk34',
    difficulty: 2,
    tokens: [
      {
        faulty: 'der',
        correct: 'Der',
        reason: 'sentence',
      },
      {
        faulty: 'herbst',
        correct: 'Herbst',
        reason: 'noun',
      },
      {
        faulty: 'bringt',
        correct: 'bringt',
      },
      {
        faulty: 'bunte',
        correct: 'bunte',
      },
      {
        faulty: 'blätter',
        correct: 'Blätter',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Herbst',
      'Blätter',
    ],
    faultySentence: 'der herbst bringt bunte blätter.',
    correctSentence: 'Der Herbst bringt bunte Blätter.',
    toggle: true,
  },
  {
    id: 'xk35',
    difficulty: 2,
    tokens: [
      {
        faulty: 'münchen',
        correct: 'München',
        reason: 'noun',
      },
      {
        faulty: 'ist',
        correct: 'ist',
      },
      {
        faulty: 'eine',
        correct: 'eine',
      },
      {
        faulty: 'landeshauptstadt',
        correct: 'Landeshauptstadt',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'München',
      'Landeshauptstadt',
    ],
    faultySentence: 'münchen ist eine landeshauptstadt.',
    correctSentence: 'München ist eine Landeshauptstadt.',
    toggle: true,
  },
  {
    id: 'xk36',
    difficulty: 3,
    tokens: [
      {
        faulty: 'eilig',
        correct: 'Eilig',
        reason: 'sentence',
      },
      {
        faulty: 'läuft',
        correct: 'läuft',
      },
      {
        faulty: 'jonas',
        correct: 'Jonas',
        reason: 'noun',
      },
      {
        faulty: 'zur',
        correct: 'zur',
      },
      {
        faulty: 'haltestelle',
        correct: 'Haltestelle',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Jonas',
      'Haltestelle',
    ],
    faultySentence: 'eilig läuft jonas zur haltestelle.',
    correctSentence: 'Eilig läuft Jonas zur Haltestelle.',
    toggle: true,
  },
  {
    id: 'xk37',
    difficulty: 2,
    tokens: [
      {
        faulty: 'die',
        correct: 'Die',
        reason: 'sentence',
      },
      {
        faulty: 'isar',
        correct: 'Isar',
        reason: 'noun',
      },
      {
        faulty: 'fließt',
        correct: 'fließt',
      },
      {
        faulty: 'durch',
        correct: 'durch',
      },
      {
        faulty: 'münchen',
        correct: 'München',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Isar',
      'München',
    ],
    faultySentence: 'die isar fließt durch münchen.',
    correctSentence: 'Die Isar fließt durch München.',
    toggle: true,
  },
  {
    id: 'xk38',
    difficulty: 1,
    tokens: [
      {
        faulty: 'das',
        correct: 'Das',
        reason: 'sentence',
      },
      {
        faulty: 'kind',
        correct: 'Kind',
        reason: 'noun',
      },
      {
        faulty: 'malt',
        correct: 'malt',
      },
      {
        faulty: 'einen',
        correct: 'einen',
      },
      {
        faulty: 'stern',
        correct: 'Stern',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Kind',
      'Stern',
    ],
    faultySentence: 'das kind malt einen stern.',
    correctSentence: 'Das Kind malt einen Stern.',
    toggle: true,
  },
  {
    id: 'xk39',
    difficulty: 2,
    tokens: [
      {
        faulty: 'am',
        correct: 'Am',
        reason: 'sentence',
      },
      {
        faulty: 'samstag',
        correct: 'Samstag',
        reason: 'noun',
      },
      {
        faulty: 'spielen',
        correct: 'spielen',
      },
      {
        faulty: 'wir',
        correct: 'wir',
      },
      {
        faulty: 'fußball',
        correct: 'Fußball',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Samstag',
      'Fußball',
    ],
    faultySentence: 'am samstag spielen wir fußball.',
    correctSentence: 'Am Samstag spielen wir Fußball.',
    toggle: true,
  },
  {
    id: 'xk40',
    difficulty: 2,
    tokens: [
      {
        faulty: 'danke',
        correct: 'Danke',
        reason: 'noun',
      },
      {
        faulty: 'ihnen',
        correct: 'Ihnen',
        reason: 'address',
      },
      {
        faulty: 'für',
        correct: 'für',
      },
      {
        faulty: 'die',
        correct: 'die',
      },
      {
        faulty: 'hilfe',
        correct: 'Hilfe',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Hilfe',
    ],
    faultySentence: 'danke ihnen für die hilfe.',
    correctSentence: 'Danke Ihnen für die Hilfe.',
    toggle: true,
  },
  {
    id: 'xk41',
    difficulty: 2,
    tokens: [
      {
        faulty: 'im',
        correct: 'Im',
        reason: 'sentence',
      },
      {
        faulty: 'oktober',
        correct: 'Oktober',
        reason: 'noun',
      },
      {
        faulty: 'fallen',
        correct: 'fallen',
      },
      {
        faulty: 'die',
        correct: 'die',
      },
      {
        faulty: 'blätter',
        correct: 'Blätter',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Oktober',
      'Blätter',
    ],
    faultySentence: 'im oktober fallen die blätter.',
    correctSentence: 'Im Oktober fallen die Blätter.',
    toggle: true,
  },
  {
    id: 'xk42',
    difficulty: 3,
    tokens: [
      {
        faulty: 'gerne',
        correct: 'Gerne',
        reason: 'sentence',
      },
      {
        faulty: 'hilft',
        correct: 'hilft',
      },
      {
        faulty: 'lea',
        correct: 'Lea',
        reason: 'noun',
      },
      {
        faulty: 'der',
        correct: 'der',
      },
      {
        faulty: 'lehrerin',
        correct: 'Lehrerin',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Lea',
      'Lehrerin',
    ],
    faultySentence: 'gerne hilft lea der lehrerin.',
    correctSentence: 'Gerne hilft Lea der Lehrerin.',
    toggle: true,
  },
  {
    id: 'xk43',
    difficulty: 2,
    tokens: [
      {
        faulty: 'der',
        correct: 'Der',
        reason: 'sentence',
      },
      {
        faulty: 'neckar',
        correct: 'Neckar',
        reason: 'noun',
      },
      {
        faulty: 'fließt',
        correct: 'fließt',
      },
      {
        faulty: 'nach',
        correct: 'nach',
      },
      {
        faulty: 'mannheim',
        correct: 'Mannheim',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Neckar',
      'Mannheim',
    ],
    faultySentence: 'der neckar fließt nach mannheim.',
    correctSentence: 'Der Neckar fließt nach Mannheim.',
    toggle: true,
  },
  {
    id: 'xk44',
    difficulty: 2,
    tokens: [
      {
        faulty: 'im',
        correct: 'Im',
        reason: 'sentence',
      },
      {
        faulty: 'winter',
        correct: 'Winter',
        reason: 'noun',
      },
      {
        faulty: 'fahren',
        correct: 'fahren',
      },
      {
        faulty: 'wir',
        correct: 'wir',
      },
      {
        faulty: 'ski',
        correct: 'Ski',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Winter',
      'Ski',
    ],
    faultySentence: 'im winter fahren wir ski.',
    correctSentence: 'Im Winter fahren wir Ski.',
    toggle: true,
  },
  {
    id: 'xk45',
    difficulty: 2,
    tokens: [
      {
        faulty: 'silvester',
        correct: 'Silvester',
        reason: 'noun',
      },
      {
        faulty: 'bleiben',
        correct: 'bleiben',
      },
      {
        faulty: 'wir',
        correct: 'wir',
      },
      {
        faulty: 'zu',
        correct: 'zu',
      },
      {
        faulty: 'hause',
        correct: 'Hause',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Silvester',
    ],
    faultySentence: 'silvester bleiben wir zu hause.',
    correctSentence: 'Silvester bleiben wir zu Hause.',
    toggle: true,
  },
  {
    id: 'xk46',
    difficulty: 3,
    tokens: [
      {
        faulty: 'plötzlich',
        correct: 'Plötzlich',
        reason: 'sentence',
      },
      {
        faulty: 'beginnt',
        correct: 'beginnt',
      },
      {
        faulty: 'der',
        correct: 'der',
      },
      {
        faulty: 'unterricht',
        correct: 'Unterricht',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Unterricht',
    ],
    faultySentence: 'plötzlich beginnt der unterricht.',
    correctSentence: 'Plötzlich beginnt der Unterricht.',
    toggle: true,
  },
  {
    id: 'xk47',
    difficulty: 2,
    tokens: [
      {
        faulty: 'felix',
        correct: 'Felix',
        reason: 'noun',
      },
      {
        faulty: 'liest',
        correct: 'liest',
      },
      {
        faulty: 'die',
        correct: 'die',
      },
      {
        faulty: 'geschichte',
        correct: 'Geschichte',
        reason: 'noun',
      },
      {
        faulty: 'vom',
        correct: 'vom',
      },
      {
        faulty: 'fuchs',
        correct: 'Fuchs',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Felix',
      'Geschichte',
      'Fuchs',
    ],
    faultySentence: 'felix liest die geschichte vom fuchs.',
    correctSentence: 'Felix liest die Geschichte vom Fuchs.',
    toggle: true,
  },
  {
    id: 'xk48',
    difficulty: 1,
    tokens: [
      {
        faulty: 'der',
        correct: 'Der',
        reason: 'sentence',
      },
      {
        faulty: 'mond',
        correct: 'Mond',
        reason: 'noun',
      },
      {
        faulty: 'scheint',
        correct: 'scheint',
      },
      {
        faulty: 'hell',
        correct: 'hell',
        after: '.',
      },
    ],
    nouns: [
      'Mond',
    ],
    faultySentence: 'der mond scheint hell.',
    correctSentence: 'Der Mond scheint hell.',
    toggle: true,
  },
  {
    id: 'xk49',
    difficulty: 2,
    tokens: [
      {
        faulty: 'am',
        correct: 'Am',
        reason: 'sentence',
      },
      {
        faulty: 'mittwoch',
        correct: 'Mittwoch',
        reason: 'noun',
      },
      {
        faulty: 'schreiben',
        correct: 'schreiben',
      },
      {
        faulty: 'wir',
        correct: 'wir',
      },
      {
        faulty: 'einen',
        correct: 'einen',
      },
      {
        faulty: 'test',
        correct: 'Test',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Mittwoch',
      'Test',
    ],
    faultySentence: 'am mittwoch schreiben wir einen test.',
    correctSentence: 'Am Mittwoch schreiben wir einen Test.',
    toggle: true,
  },
  {
    id: 'xk50',
    difficulty: 2,
    tokens: [
      {
        faulty: 'italienisch',
        correct: 'Italienisch',
        reason: 'noun',
      },
      {
        faulty: 'klingt',
        correct: 'klingt',
      },
      {
        faulty: 'melodisch',
        correct: 'melodisch',
        after: '.',
      },
    ],
    nouns: [
      'Italienisch',
    ],
    faultySentence: 'italienisch klingt melodisch.',
    correctSentence: 'Italienisch klingt melodisch.',
    toggle: true,
  },
  {
    id: 'xk51',
    difficulty: 2,
    tokens: [
      {
        faulty: 'die',
        correct: 'Die',
        reason: 'sentence',
      },
      {
        faulty: 'elbe',
        correct: 'Elbe',
        reason: 'noun',
      },
      {
        faulty: 'durchquert',
        correct: 'durchquert',
      },
      {
        faulty: 'dresden',
        correct: 'Dresden',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Elbe',
      'Dresden',
    ],
    faultySentence: 'die elbe durchquert dresden.',
    correctSentence: 'Die Elbe durchquert Dresden.',
    toggle: true,
  },
  {
    id: 'xk52',
    difficulty: 2,
    tokens: [
      {
        faulty: 'pfingsten',
        correct: 'Pfingsten',
        reason: 'noun',
      },
      {
        faulty: 'besuchen',
        correct: 'besuchen',
      },
      {
        faulty: 'wir',
        correct: 'wir',
      },
      {
        faulty: 'oma',
        correct: 'Oma',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Pfingsten',
      'Oma',
    ],
    faultySentence: 'pfingsten besuchen wir oma.',
    correctSentence: 'Pfingsten besuchen wir Oma.',
    toggle: true,
  },
  {
    id: 'xk53',
    difficulty: 3,
    tokens: [
      {
        faulty: 'heute',
        correct: 'Heute',
        reason: 'sentence',
      },
      {
        faulty: 'liest',
        correct: 'liest',
      },
      {
        faulty: 'hannah',
        correct: 'Hannah',
        reason: 'noun',
      },
      {
        faulty: 'ein',
        correct: 'ein',
      },
      {
        faulty: 'buch',
        correct: 'Buch',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Hannah',
      'Buch',
    ],
    faultySentence: 'heute liest hannah ein buch.',
    correctSentence: 'Heute liest Hannah ein Buch.',
    toggle: true,
  },
  {
    id: 'xk54',
    difficulty: 2,
    tokens: [
      {
        faulty: 'köln',
        correct: 'Köln',
        reason: 'noun',
      },
      {
        faulty: 'liegt',
        correct: 'liegt',
      },
      {
        faulty: 'am',
        correct: 'am',
      },
      {
        faulty: 'rhein',
        correct: 'Rhein',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Köln',
      'Rhein',
    ],
    faultySentence: 'köln liegt am rhein.',
    correctSentence: 'Köln liegt am Rhein.',
    toggle: true,
  },
  {
    id: 'xk55',
    difficulty: 2,
    tokens: [
      {
        faulty: 'im',
        correct: 'Im',
        reason: 'sentence',
      },
      {
        faulty: 'sommer',
        correct: 'Sommer',
        reason: 'noun',
      },
      {
        faulty: 'baden',
        correct: 'baden',
      },
      {
        faulty: 'wir',
        correct: 'wir',
      },
      {
        faulty: 'im',
        correct: 'im',
      },
      {
        faulty: 'see',
        correct: 'See',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Sommer',
      'See',
    ],
    faultySentence: 'im sommer baden wir im see.',
    correctSentence: 'Im Sommer baden wir im See.',
    toggle: true,
  },
  {
    id: 'xk56',
    difficulty: 2,
    tokens: [
      {
        faulty: 'herr',
        correct: 'Herr',
        reason: 'noun',
      },
      {
        faulty: 'braun',
        correct: 'Braun',
        reason: 'noun',
      },
      {
        faulty: 'hält',
        correct: 'hält',
      },
      {
        faulty: 'einen',
        correct: 'einen',
      },
      {
        faulty: 'vortrag',
        correct: 'Vortrag',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Herr',
      'Braun',
      'Vortrag',
    ],
    faultySentence: 'herr braun hält einen vortrag.',
    correctSentence: 'Herr Braun hält einen Vortrag.',
    toggle: true,
  },
  {
    id: 'xk57',
    difficulty: 3,
    tokens: [
      {
        faulty: 'langsam',
        correct: 'Langsam',
        reason: 'sentence',
      },
      {
        faulty: 'verdunkelt',
        correct: 'verdunkelt',
      },
      {
        faulty: 'sich',
        correct: 'sich',
      },
      {
        faulty: 'der',
        correct: 'der',
      },
      {
        faulty: 'himmel',
        correct: 'Himmel',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Himmel',
    ],
    faultySentence: 'langsam verdunkelt sich der himmel.',
    correctSentence: 'Langsam verdunkelt sich der Himmel.',
    toggle: true,
  },
  {
    id: 'xk58',
    difficulty: 2,
    tokens: [
      {
        faulty: 'am',
        correct: 'Am',
        reason: 'sentence',
      },
      {
        faulty: 'donnerstag',
        correct: 'Donnerstag',
        reason: 'noun',
      },
      {
        faulty: 'beginnt',
        correct: 'beginnt',
      },
      {
        faulty: 'der',
        correct: 'der',
      },
      {
        faulty: 'kurs',
        correct: 'Kurs',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Donnerstag',
      'Kurs',
    ],
    faultySentence: 'am donnerstag beginnt der kurs.',
    correctSentence: 'Am Donnerstag beginnt der Kurs.',
    toggle: true,
  },
  {
    id: 'xk59',
    difficulty: 2,
    tokens: [
      {
        faulty: 'spanisch',
        correct: 'Spanisch',
        reason: 'noun',
      },
      {
        faulty: 'ist',
        correct: 'ist',
      },
      {
        faulty: 'eine',
        correct: 'eine',
      },
      {
        faulty: 'romanische',
        correct: 'romanische',
      },
      {
        faulty: 'sprache',
        correct: 'Sprache',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Spanisch',
      'Sprache',
    ],
    faultySentence: 'spanisch ist eine romanische sprache.',
    correctSentence: 'Spanisch ist eine romanische Sprache.',
    toggle: true,
  },
  {
    id: 'xk60',
    difficulty: 2,
    tokens: [
      {
        faulty: 'die',
        correct: 'Die',
        reason: 'sentence',
      },
      {
        faulty: 'oder',
        correct: 'Oder',
        reason: 'noun',
      },
      {
        faulty: 'grenzt',
        correct: 'grenzt',
      },
      {
        faulty: 'an',
        correct: 'an',
      },
      {
        faulty: 'polen',
        correct: 'Polen',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Oder',
      'Polen',
    ],
    faultySentence: 'die oder grenzt an polen.',
    correctSentence: 'Die Oder grenzt an Polen.',
    toggle: true,
  },
  {
    id: 'xk61',
    difficulty: 2,
    tokens: [
      {
        faulty: 'der',
        correct: 'Der',
        reason: 'sentence',
      },
      {
        faulty: 'frühling',
        correct: 'Frühling',
        reason: 'noun',
      },
      {
        faulty: 'lockt',
        correct: 'lockt',
      },
      {
        faulty: 'mit',
        correct: 'mit',
      },
      {
        faulty: 'sonne',
        correct: 'Sonne',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Frühling',
      'Sonne',
    ],
    faultySentence: 'der frühling lockt mit sonne.',
    correctSentence: 'Der Frühling lockt mit Sonne.',
    toggle: true,
  },
  {
    id: 'xk62',
    difficulty: 1,
    tokens: [
      {
        faulty: 'die',
        correct: 'Die',
        reason: 'sentence',
      },
      {
        faulty: 'ente',
        correct: 'Ente',
        reason: 'noun',
      },
      {
        faulty: 'schwimmt',
        correct: 'schwimmt',
      },
      {
        faulty: 'im',
        correct: 'im',
      },
      {
        faulty: 'teich',
        correct: 'Teich',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Ente',
      'Teich',
    ],
    faultySentence: 'die ente schwimmt im teich.',
    correctSentence: 'Die Ente schwimmt im Teich.',
    toggle: true,
  },
  {
    id: 'xk63',
    difficulty: 2,
    tokens: [
      {
        faulty: 'nikolaus',
        correct: 'Nikolaus',
        reason: 'noun',
      },
      {
        faulty: 'bringt',
        correct: 'bringt',
      },
      {
        faulty: 'kleine',
        correct: 'kleine',
      },
      {
        faulty: 'geschenke',
        correct: 'Geschenke',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Nikolaus',
      'Geschenke',
    ],
    faultySentence: 'nikolaus bringt kleine geschenke.',
    correctSentence: 'Nikolaus bringt kleine Geschenke.',
    toggle: true,
  },
  {
    id: 'xk64',
    difficulty: 3,
    tokens: [
      {
        faulty: 'schnell',
        correct: 'Schnell',
        reason: 'sentence',
      },
      {
        faulty: 'schließt',
        correct: 'schließt',
      },
      {
        faulty: 'eva',
        correct: 'Eva',
        reason: 'noun',
      },
      {
        faulty: 'die',
        correct: 'die',
      },
      {
        faulty: 'tür',
        correct: 'Tür',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Eva',
      'Tür',
    ],
    faultySentence: 'schnell schließt eva die tür.',
    correctSentence: 'Schnell schließt Eva die Tür.',
    toggle: true,
  },
  {
    id: 'xk65',
    difficulty: 2,
    tokens: [
      {
        faulty: 'bern',
        correct: 'Bern',
        reason: 'noun',
      },
      {
        faulty: 'liegt',
        correct: 'liegt',
      },
      {
        faulty: 'in',
        correct: 'in',
      },
      {
        faulty: 'der',
        correct: 'der',
      },
      {
        faulty: 'schweiz',
        correct: 'Schweiz',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Bern',
      'Schweiz',
    ],
    faultySentence: 'bern liegt in der schweiz.',
    correctSentence: 'Bern liegt in der Schweiz.',
    toggle: true,
  },
  {
    id: 'xk66',
    difficulty: 2,
    tokens: [
      {
        faulty: 'im',
        correct: 'Im',
        reason: 'sentence',
      },
      {
        faulty: 'advent',
        correct: 'Advent',
        reason: 'noun',
      },
      {
        faulty: 'brennt',
        correct: 'brennt',
      },
      {
        faulty: 'der',
        correct: 'der',
      },
      {
        faulty: 'kerzenkranz',
        correct: 'Kerzenkranz',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Advent',
      'Kerzenkranz',
    ],
    faultySentence: 'im advent brennt der kerzenkranz.',
    correctSentence: 'Im Advent brennt der Kerzenkranz.',
    toggle: true,
  },
  {
    id: 'xk67',
    difficulty: 2,
    tokens: [
      {
        faulty: 'danke',
        correct: 'Danke',
        reason: 'noun',
      },
      {
        faulty: 'sie',
        correct: 'Sie',
        reason: 'address',
      },
      {
        faulty: 'für',
        correct: 'für',
      },
      {
        faulty: 'ihre',
        correct: 'Ihre',
        reason: 'noun',
      },
      {
        faulty: 'mühe',
        correct: 'Mühe',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Mühe',
    ],
    faultySentence: 'danke sie für ihre mühe.',
    correctSentence: 'Danke Sie für Ihre Mühe.',
    toggle: true,
  },
  {
    id: 'xk68',
    difficulty: 1,
    tokens: [
      {
        faulty: 'der',
        correct: 'Der',
        reason: 'sentence',
      },
      {
        faulty: 'apfel',
        correct: 'Apfel',
        reason: 'noun',
      },
      {
        faulty: 'fällt',
        correct: 'fällt',
      },
      {
        faulty: 'vom',
        correct: 'vom',
      },
      {
        faulty: 'baum',
        correct: 'Baum',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Apfel',
      'Baum',
    ],
    faultySentence: 'der apfel fällt vom baum.',
    correctSentence: 'Der Apfel fällt vom Baum.',
    toggle: true,
  },
  {
    id: 'xk69',
    difficulty: 2,
    tokens: [
      {
        faulty: 'am',
        correct: 'Am',
        reason: 'sentence',
      },
      {
        faulty: 'sonntag',
        correct: 'Sonntag',
        reason: 'noun',
      },
      {
        faulty: 'ruhen',
        correct: 'ruhen',
      },
      {
        faulty: 'wir',
        correct: 'wir',
      },
      {
        faulty: 'aus',
        correct: 'aus',
        after: '.',
      },
    ],
    nouns: [
      'Sonntag',
    ],
    faultySentence: 'am sonntag ruhen wir aus.',
    correctSentence: 'Am Sonntag ruhen wir aus.',
    toggle: true,
  },
  {
    id: 'xk70',
    difficulty: 2,
    tokens: [
      {
        faulty: 'griechisch',
        correct: 'Griechisch',
        reason: 'noun',
      },
      {
        faulty: 'hat',
        correct: 'hat',
      },
      {
        faulty: 'andere',
        correct: 'andere',
      },
      {
        faulty: 'buchstaben',
        correct: 'Buchstaben',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Griechisch',
      'Buchstaben',
    ],
    faultySentence: 'griechisch hat andere buchstaben.',
    correctSentence: 'Griechisch hat andere Buchstaben.',
    toggle: true,
  },
  {
    id: 'xk71',
    difficulty: 2,
    tokens: [
      {
        faulty: 'mainz',
        correct: 'Mainz',
        reason: 'noun',
      },
      {
        faulty: 'liegt',
        correct: 'liegt',
      },
      {
        faulty: 'am',
        correct: 'am',
      },
      {
        faulty: 'rhein',
        correct: 'Rhein',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Mainz',
      'Rhein',
    ],
    faultySentence: 'mainz liegt am rhein.',
    correctSentence: 'Mainz liegt am Rhein.',
    toggle: true,
  },
  {
    id: 'xk72',
    difficulty: 2,
    tokens: [
      {
        faulty: 'karneval',
        correct: 'Karneval',
        reason: 'noun',
      },
      {
        faulty: 'feiern',
        correct: 'feiern',
      },
      {
        faulty: 'wir',
        correct: 'wir',
      },
      {
        faulty: 'im',
        correct: 'im',
      },
      {
        faulty: 'winter',
        correct: 'Winter',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Karneval',
      'Winter',
    ],
    faultySentence: 'karneval feiern wir im winter.',
    correctSentence: 'Karneval feiern wir im Winter.',
    toggle: true,
  },
  {
    id: 'xk73',
    difficulty: 3,
    tokens: [
      {
        faulty: 'oft',
        correct: 'Oft',
        reason: 'sentence',
      },
      {
        faulty: 'schreibt',
        correct: 'schreibt',
      },
      {
        faulty: 'paul',
        correct: 'Paul',
        reason: 'noun',
      },
      {
        faulty: 'mit',
        correct: 'mit',
      },
      {
        faulty: 'der',
        correct: 'der',
      },
      {
        faulty: 'hand',
        correct: 'Hand',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Paul',
      'Hand',
    ],
    faultySentence: 'oft schreibt paul mit der hand.',
    correctSentence: 'Oft schreibt Paul mit der Hand.',
    toggle: true,
  },
  {
    id: 'xk74',
    difficulty: 2,
    tokens: [
      {
        faulty: 'der',
        correct: 'Der',
        reason: 'sentence',
      },
      {
        faulty: 'inn',
        correct: 'Inn',
        reason: 'noun',
      },
      {
        faulty: 'fließt',
        correct: 'fließt',
      },
      {
        faulty: 'in',
        correct: 'in',
      },
      {
        faulty: 'die',
        correct: 'die',
      },
      {
        faulty: 'donau',
        correct: 'Donau',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Inn',
      'Donau',
    ],
    faultySentence: 'der inn fließt in die donau.',
    correctSentence: 'Der Inn fließt in die Donau.',
    toggle: true,
  },
  {
    id: 'xk75',
    difficulty: 2,
    tokens: [
      {
        faulty: 'im',
        correct: 'Im',
        reason: 'sentence',
      },
      {
        faulty: 'märz',
        correct: 'März',
        reason: 'noun',
      },
      {
        faulty: 'beginnt',
        correct: 'beginnt',
      },
      {
        faulty: 'der',
        correct: 'der',
      },
      {
        faulty: 'frühling',
        correct: 'Frühling',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'März',
      'Frühling',
    ],
    faultySentence: 'im märz beginnt der frühling.',
    correctSentence: 'Im März beginnt der Frühling.',
    toggle: true,
  },
  {
    id: 'xk76',
    difficulty: 1,
    tokens: [
      {
        faulty: 'tim',
        correct: 'Tim',
        reason: 'noun',
      },
      {
        faulty: 'trägt',
        correct: 'trägt',
      },
      {
        faulty: 'einen',
        correct: 'einen',
      },
      {
        faulty: 'rucksack',
        correct: 'Rucksack',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Tim',
      'Rucksack',
    ],
    faultySentence: 'tim trägt einen rucksack.',
    correctSentence: 'Tim trägt einen Rucksack.',
    toggle: true,
  },
  {
    id: 'xk77',
    difficulty: 2,
    tokens: [
      {
        faulty: 'herr',
        correct: 'Herr',
        reason: 'noun',
      },
      {
        faulty: 'wagner',
        correct: 'Wagner',
        reason: 'noun',
      },
      {
        faulty: 'unterrichtet',
        correct: 'unterrichtet',
      },
      {
        faulty: 'klasse',
        correct: 'Klasse',
        reason: 'noun',
      },
      {
        faulty: '5b',
        correct: '5b',
        after: '.',
      },
    ],
    nouns: [
      'Herr',
      'Wagner',
      'Klasse',
    ],
    faultySentence: 'herr wagner unterrichtet klasse 5b.',
    correctSentence: 'Herr Wagner unterrichtet Klasse 5b.',
    toggle: true,
  },
  {
    id: 'xk78',
    difficulty: 3,
    tokens: [
      {
        faulty: 'gestern',
        correct: 'Gestern',
        reason: 'sentence',
      },
      {
        faulty: 'holte',
        correct: 'holte',
      },
      {
        faulty: 'sofia',
        correct: 'Sofia',
        reason: 'noun',
      },
      {
        faulty: 'den',
        correct: 'den',
      },
      {
        faulty: 'postboten',
        correct: 'Postboten',
        reason: 'noun',
      },
      {
        faulty: 'ein',
        correct: 'ein',
        after: '.',
      },
    ],
    nouns: [
      'Sofia',
      'Postboten',
    ],
    faultySentence: 'gestern holte sofia den postboten ein.',
    correctSentence: 'Gestern holte Sofia den Postboten ein.',
    toggle: true,
  },
  {
    id: 'xk79',
    difficulty: 2,
    tokens: [
      {
        faulty: 'norwegisch',
        correct: 'Norwegisch',
        reason: 'noun',
      },
      {
        faulty: 'hat',
        correct: 'hat',
      },
      {
        faulty: 'viele',
        correct: 'viele',
      },
      {
        faulty: 'vokale',
        correct: 'Vokale',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Norwegisch',
      'Vokale',
    ],
    faultySentence: 'norwegisch hat viele vokale.',
    correctSentence: 'Norwegisch hat viele Vokale.',
    toggle: true,
  },
  {
    id: 'xk80',
    difficulty: 2,
    tokens: [
      {
        faulty: 'bonn',
        correct: 'Bonn',
        reason: 'noun',
      },
      {
        faulty: 'ist',
        correct: 'ist',
      },
      {
        faulty: 'eine',
        correct: 'eine',
      },
      {
        faulty: 'bundesstadt',
        correct: 'Bundesstadt',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Bonn',
      'Bundesstadt',
    ],
    faultySentence: 'bonn ist eine bundesstadt.',
    correctSentence: 'Bonn ist eine Bundesstadt.',
    toggle: true,
  },
  {
    id: 'xk81',
    difficulty: 2,
    tokens: [
      {
        faulty: 'weihnachten',
        correct: 'Weihnachten',
        reason: 'noun',
      },
      {
        faulty: 'duftet',
        correct: 'duftet',
      },
      {
        faulty: 'nach',
        correct: 'nach',
      },
      {
        faulty: 'plätzchen',
        correct: 'Plätzchen',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Weihnachten',
      'Plätzchen',
    ],
    faultySentence: 'weihnachten duftet nach plätzchen.',
    correctSentence: 'Weihnachten duftet nach Plätzchen.',
    toggle: true,
  },
  {
    id: 'xk82',
    difficulty: 3,
    tokens: [
      {
        faulty: 'bald',
        correct: 'Bald',
        reason: 'sentence',
      },
      {
        faulty: 'startet',
        correct: 'startet',
      },
      {
        faulty: 'das',
        correct: 'das',
      },
      {
        faulty: 'fußballturnier',
        correct: 'Fußballturnier',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Fußballturnier',
    ],
    faultySentence: 'bald startet das fußballturnier.',
    correctSentence: 'Bald startet das Fußballturnier.',
    toggle: true,
  },
  {
    id: 'xk83',
    difficulty: 1,
    tokens: [
      {
        faulty: 'der',
        correct: 'Der',
        reason: 'sentence',
      },
      {
        faulty: 'frosch',
        correct: 'Frosch',
        reason: 'noun',
      },
      {
        faulty: 'sitzt',
        correct: 'sitzt',
      },
      {
        faulty: 'auf',
        correct: 'auf',
      },
      {
        faulty: 'dem',
        correct: 'dem',
      },
      {
        faulty: 'stein',
        correct: 'Stein',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Frosch',
      'Stein',
    ],
    faultySentence: 'der frosch sitzt auf dem stein.',
    correctSentence: 'Der Frosch sitzt auf dem Stein.',
    toggle: true,
  },
  {
    id: 'xk84',
    difficulty: 2,
    tokens: [
      {
        faulty: 'am',
        correct: 'Am',
        reason: 'sentence',
      },
      {
        faulty: 'freitag',
        correct: 'Freitag',
        reason: 'noun',
      },
      {
        faulty: 'fahren',
        correct: 'fahren',
      },
      {
        faulty: 'wir',
        correct: 'wir',
      },
      {
        faulty: 'in',
        correct: 'in',
      },
      {
        faulty: 'die',
        correct: 'die',
      },
      {
        faulty: 'berge',
        correct: 'Berge',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Freitag',
      'Berge',
    ],
    faultySentence: 'am freitag fahren wir in die berge.',
    correctSentence: 'Am Freitag fahren wir in die Berge.',
    toggle: true,
  },
  {
    id: 'xk85',
    difficulty: 2,
    tokens: [
      {
        faulty: 'türkisch',
        correct: 'Türkisch',
        reason: 'noun',
      },
      {
        faulty: 'hat',
        correct: 'hat',
      },
      {
        faulty: 'einen',
        correct: 'einen',
      },
      {
        faulty: 'besonderen',
        correct: 'besonderen',
      },
      {
        faulty: 'klang',
        correct: 'Klang',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Türkisch',
      'Klang',
    ],
    faultySentence: 'türkisch hat einen besonderen klang.',
    correctSentence: 'Türkisch hat einen besonderen Klang.',
    toggle: true,
  },
  {
    id: 'xk86',
    difficulty: 2,
    tokens: [
      {
        faulty: 'wien',
        correct: 'Wien',
        reason: 'noun',
      },
      {
        faulty: 'liegt',
        correct: 'liegt',
      },
      {
        faulty: 'an',
        correct: 'an',
      },
      {
        faulty: 'der',
        correct: 'der',
      },
      {
        faulty: 'donau',
        correct: 'Donau',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Wien',
      'Donau',
    ],
    faultySentence: 'wien liegt an der donau.',
    correctSentence: 'Wien liegt an der Donau.',
    toggle: true,
  },
  {
    id: 'xk87',
    difficulty: 1,
    tokens: [
      {
        faulty: 'der',
        correct: 'Der',
        reason: 'sentence',
      },
      {
        faulty: 'roboter',
        correct: 'Roboter',
        reason: 'noun',
      },
      {
        faulty: 'baut',
        correct: 'baut',
      },
      {
        faulty: 'ein',
        correct: 'ein',
      },
      {
        faulty: 'modell',
        correct: 'Modell',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Roboter',
      'Modell',
    ],
    faultySentence: 'der roboter baut ein modell.',
    correctSentence: 'Der Roboter baut ein Modell.',
    toggle: true,
  },
  {
    id: 'xk88',
    difficulty: 2,
    tokens: [
      {
        faulty: 'im',
        correct: 'Im',
        reason: 'sentence',
      },
      {
        faulty: 'november',
        correct: 'November',
        reason: 'noun',
      },
      {
        faulty: 'wird',
        correct: 'wird',
      },
      {
        faulty: 'es',
        correct: 'es',
      },
      {
        faulty: 'kalt',
        correct: 'kalt',
        after: '.',
      },
    ],
    nouns: [
      'November',
    ],
    faultySentence: 'im november wird es kalt.',
    correctSentence: 'Im November wird es kalt.',
    toggle: true,
  },
  {
    id: 'xk89',
    difficulty: 2,
    tokens: [
      {
        faulty: 'dänisch',
        correct: 'Dänisch',
        reason: 'noun',
      },
      {
        faulty: 'klingt',
        correct: 'klingt',
      },
      {
        faulty: 'anders',
        correct: 'anders',
        after: '.',
      },
    ],
    nouns: [
      'Dänisch',
    ],
    faultySentence: 'dänisch klingt anders.',
    correctSentence: 'Dänisch klingt anders.',
    toggle: true,
  },
  {
    id: 'xk90',
    difficulty: 2,
    tokens: [
      {
        faulty: 'leipzig',
        correct: 'Leipzig',
        reason: 'noun',
      },
      {
        faulty: 'hat',
        correct: 'hat',
      },
      {
        faulty: 'eine',
        correct: 'eine',
      },
      {
        faulty: 'oper',
        correct: 'Oper',
        reason: 'noun',
        after: '.',
      },
    ],
    nouns: [
      'Leipzig',
      'Oper',
    ],
    faultySentence: 'leipzig hat eine oper.',
    correctSentence: 'Leipzig hat eine Oper.',
    toggle: true,
  },
] as const
