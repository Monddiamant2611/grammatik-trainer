import type { CaseSentence } from './cases'

export const caseSentencesExtra: readonly CaseSentence[] = [
  {
    id: 'c16',
    sentence: 'Der Vogel singt.',
    difficulty: 1,
    targets: [
      {
        surface: 'Der Vogel',
        label: 'der Vogel',
        caseId: 'nom',
        probe: 'Wer oder was singt?',
      },
    ],
  },
  {
    id: 'c17',
    sentence: 'Ich sehe den Vogel.',
    difficulty: 1,
    targets: [
      {
        surface: 'den Vogel',
        label: 'den Vogel',
        caseId: 'akk',
        probe: 'Wen oder was sehe ich?',
      },
    ],
  },
  {
    id: 'c18',
    sentence: 'Wir helfen dem Kind.',
    difficulty: 1,
    targets: [
      {
        surface: 'dem Kind',
        label: 'dem Kind',
        caseId: 'dat',
        probe: 'Wem helfen wir?',
      },
    ],
  },
  {
    id: 'c19',
    sentence: 'Das Fell des Hundes ist weich.',
    difficulty: 2,
    targets: [
      {
        surface: 'des Hundes',
        label: 'des Hundes',
        caseId: 'gen',
        probe: 'Wessen Fell ist weich?',
      },
    ],
  },
  {
    id: 'c20',
    sentence: 'Die Lehrerin gibt dem Schüler ein Buch.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Schüler',
        label: 'dem Schüler',
        caseId: 'dat',
        probe: 'Wem gibt die Lehrerin ein Buch?',
      },
      {
        surface: 'ein Buch',
        label: 'ein Buch',
        caseId: 'akk',
        probe: 'Wen oder was gibt die Lehrerin dem Schüler?',
      },
    ],
  },
  {
    id: 'c21',
    sentence: 'Papa kauft der Mutter Blumen.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Mutter',
        label: 'der Mutter',
        caseId: 'dat',
        probe: 'Wem kauft Papa Blumen?',
      },
      {
        surface: 'Blumen',
        label: 'Blumen',
        caseId: 'akk',
        probe: 'Wen oder was kauft Papa der Mutter?',
      },
    ],
  },
  {
    id: 'c22',
    sentence: 'Der Name des Mädchens steht im Heft.',
    difficulty: 2,
    targets: [
      {
        surface: 'des Mädchens',
        label: 'des Mädchens',
        caseId: 'gen',
        probe: 'Wessen Name steht im Heft?',
      },
    ],
  },
  {
    id: 'c23',
    sentence: 'Tim folgt dem Hund.',
    difficulty: 1,
    targets: [
      {
        surface: 'dem Hund',
        label: 'dem Hund',
        caseId: 'dat',
        probe: 'Wem folgt Tim?',
      },
    ],
  },
  {
    id: 'c24',
    sentence: 'Lena trägt die Tasche.',
    difficulty: 1,
    targets: [
      {
        surface: 'die Tasche',
        label: 'die Tasche',
        caseId: 'akk',
        probe: 'Wen oder was trägt Lena?',
      },
    ],
  },
  {
    id: 'c25',
    sentence: 'Die Sonne scheint.',
    difficulty: 1,
    targets: [
      {
        surface: 'Die Sonne',
        label: 'die Sonne',
        caseId: 'nom',
        probe: 'Wer oder was scheint?',
      },
    ],
  },
  {
    id: 'c26',
    sentence: 'Ben besucht seinen Onkel.',
    difficulty: 2,
    targets: [
      {
        surface: 'seinen Onkel',
        label: 'seinen Onkel',
        caseId: 'akk',
        probe: 'Wen oder was besucht Ben?',
      },
    ],
  },
  {
    id: 'c27',
    sentence: 'Der Schlüssel der Tür fehlt.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Tür',
        label: 'der Tür',
        caseId: 'gen',
        probe: 'Wessen Schlüssel fehlt?',
      },
    ],
  },
  {
    id: 'c28',
    sentence: 'Wir gratulieren der Freundin.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Freundin',
        label: 'der Freundin',
        caseId: 'dat',
        probe: 'Wem gratulieren wir?',
      },
    ],
  },
  {
    id: 'c29',
    sentence: 'Der Arzt hilft dem Patienten.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Patienten',
        label: 'dem Patienten',
        caseId: 'dat',
        probe: 'Wem hilft der Arzt?',
      },
    ],
  },
  {
    id: 'c30',
    sentence: 'Ich lese die Nachricht.',
    difficulty: 1,
    targets: [
      {
        surface: 'die Nachricht',
        label: 'die Nachricht',
        caseId: 'akk',
        probe: 'Wen oder was lese ich?',
      },
    ],
  },
  {
    id: 'c31',
    sentence: 'Das Rad des Fahrrads ist neu.',
    difficulty: 2,
    targets: [
      {
        surface: 'des Fahrrads',
        label: 'des Fahrrads',
        caseId: 'gen',
        probe: 'Wessen Rad ist neu?',
      },
    ],
  },
  {
    id: 'c32',
    sentence: 'Die Katze liegt auf dem Sofa.',
    difficulty: 1,
    targets: [
      {
        surface: 'dem Sofa',
        label: 'dem Sofa',
        caseId: 'dat',
        probe: 'Auf wem oder was liegt die Katze? Wem? Auf dem Sofa – Dativ mit auf.',
      },
    ],
  },
  {
    id: 'c33',
    sentence: 'Er schenkt seiner Schwester Schokolade.',
    difficulty: 2,
    targets: [
      {
        surface: 'seiner Schwester',
        label: 'seiner Schwester',
        caseId: 'dat',
        probe: 'Wem schenkt er Schokolade?',
      },
      {
        surface: 'Schokolade',
        label: 'Schokolade',
        caseId: 'akk',
        probe: 'Wen oder was schenkt er seiner Schwester?',
      },
    ],
  },
  {
    id: 'c34',
    sentence: 'Der Brief des Chefs kommt heute.',
    difficulty: 2,
    targets: [
      {
        surface: 'des Chefs',
        label: 'des Chefs',
        caseId: 'gen',
        probe: 'Wessen Brief kommt heute?',
      },
    ],
  },
  {
    id: 'c35',
    sentence: 'Paul zeigt dem Lehrer das Bild.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Lehrer',
        label: 'dem Lehrer',
        caseId: 'dat',
        probe: 'Wem zeigt Paul das Bild?',
      },
      {
        surface: 'das Bild',
        label: 'das Bild',
        caseId: 'akk',
        probe: 'Wen oder was zeigt Paul dem Lehrer?',
      },
    ],
  },
  {
    id: 'c36',
    sentence: 'Die Schülerin beantwortet die Frage.',
    difficulty: 2,
    targets: [
      {
        surface: 'die Frage',
        label: 'die Frage',
        caseId: 'akk',
        probe: 'Wen oder was beantwortet die Schülerin?',
      },
    ],
  },
  {
    id: 'c37',
    sentence: 'Der Wind weht stark.',
    difficulty: 1,
    targets: [
      {
        surface: 'Der Wind',
        label: 'der Wind',
        caseId: 'nom',
        probe: 'Wer oder was weht stark?',
      },
    ],
  },
  {
    id: 'c38',
    sentence: 'Mama dankt dem Nachbarn.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Nachbarn',
        label: 'dem Nachbarn',
        caseId: 'dat',
        probe: 'Wem dankt Mama?',
      },
    ],
  },
  {
    id: 'c39',
    sentence: 'Ich kaufe einen Apfel.',
    difficulty: 1,
    targets: [
      {
        surface: 'einen Apfel',
        label: 'einen Apfel',
        caseId: 'akk',
        probe: 'Wen oder was kaufe ich?',
      },
    ],
  },
  {
    id: 'c40',
    sentence: 'Das Dach des Hauses ist rot.',
    difficulty: 2,
    targets: [
      {
        surface: 'des Hauses',
        label: 'des Hauses',
        caseId: 'gen',
        probe: 'Wessen Dach ist rot?',
      },
    ],
  },
  {
    id: 'c41',
    sentence: 'Wir geben den Gästen Platz.',
    difficulty: 2,
    targets: [
      {
        surface: 'den Gästen',
        label: 'den Gästen',
        caseId: 'dat',
        probe: 'Wem geben wir Platz?',
      },
      {
        surface: 'Platz',
        label: 'Platz',
        caseId: 'akk',
        probe: 'Wen oder was geben wir den Gästen?',
      },
    ],
  },
  {
    id: 'c42',
    sentence: 'Die Freundin schreibt der Oma.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Oma',
        label: 'der Oma',
        caseId: 'dat',
        probe: 'Wem schreibt die Freundin?',
      },
    ],
  },
  {
    id: 'c43',
    sentence: 'Hannah liest dem Kind vor.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Kind',
        label: 'dem Kind',
        caseId: 'dat',
        probe: 'Wem liest Hannah vor?',
      },
    ],
  },
  {
    id: 'c44',
    sentence: 'Ein Hund bellt laut.',
    difficulty: 1,
    targets: [
      {
        surface: 'Ein Hund',
        label: 'ein Hund',
        caseId: 'nom',
        probe: 'Wer oder was bellt laut?',
      },
    ],
  },
  {
    id: 'c45',
    sentence: 'Sie findet den Weg.',
    difficulty: 1,
    targets: [
      {
        surface: 'den Weg',
        label: 'den Weg',
        caseId: 'akk',
        probe: 'Wen oder was findet sie?',
      },
    ],
  },
  {
    id: 'c46',
    sentence: 'Das Ende des Films überrascht uns.',
    difficulty: 3,
    targets: [
      {
        surface: 'des Films',
        label: 'des Films',
        caseId: 'gen',
        probe: 'Wessen Ende überrascht uns?',
      },
    ],
  },
  {
    id: 'c47',
    sentence: 'Der Trainer erklärt den Sportlern die Regel.',
    difficulty: 3,
    targets: [
      {
        surface: 'Der Trainer',
        label: 'der Trainer',
        caseId: 'nom',
        probe: 'Wer oder was erklärt den Sportlern die Regel?',
      },
      {
        surface: 'den Sportlern',
        label: 'den Sportlern',
        caseId: 'dat',
        probe: 'Wem erklärt der Trainer die Regel?',
      },
      {
        surface: 'die Regel',
        label: 'die Regel',
        caseId: 'akk',
        probe: 'Wen oder was erklärt der Trainer den Sportlern?',
      },
    ],
  },
  {
    id: 'c48',
    sentence: 'Jonas nimmt den Bus.',
    difficulty: 1,
    targets: [
      {
        surface: 'den Bus',
        label: 'den Bus',
        caseId: 'akk',
        probe: 'Wen oder was nimmt Jonas?',
      },
    ],
  },
  {
    id: 'c49',
    sentence: 'Die Decke des Bettes ist warm.',
    difficulty: 2,
    targets: [
      {
        surface: 'des Bettes',
        label: 'des Bettes',
        caseId: 'gen',
        probe: 'Wessen Decke ist warm?',
      },
    ],
  },
  {
    id: 'c50',
    sentence: 'Wir vertrauen der Lehrerin.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Lehrerin',
        label: 'der Lehrerin',
        caseId: 'dat',
        probe: 'Wem vertrauen wir?',
      },
    ],
  },
  {
    id: 'c111',
    sentence: 'Die Nachbarin bringt dem Kind Wasser.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Kind',
        label: 'dem Kind',
        caseId: 'dat',
        probe: 'Wem bringt die Nachbarin Wasser?',
      },
      {
        surface: 'Wasser',
        label: 'Wasser',
        caseId: 'akk',
        probe: 'Wen oder was bringt die Nachbarin dem Kind?',
      },
    ],
  },
  {
    id: 'c112',
    sentence: 'Der Vater kauft der Tochter ein Kleid.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Tochter',
        label: 'der Tochter',
        caseId: 'dat',
        probe: 'Wem kauft der Vater ein Kleid?',
      },
      {
        surface: 'ein Kleid',
        label: 'ein Kleid',
        caseId: 'akk',
        probe: 'Wen oder was kauft der Vater der Tochter?',
      },
    ],
  },
  {
    id: 'c113',
    sentence: 'Sie gibt dem Gast Brot.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Gast',
        label: 'dem Gast',
        caseId: 'dat',
        probe: 'Wem gibt sie Brot?',
      },
      {
        surface: 'Brot',
        label: 'Brot',
        caseId: 'akk',
        probe: 'Wen oder was gibt sie dem Gast?',
      },
    ],
  },
  {
    id: 'c114',
    sentence: 'Ben schenkt seiner Oma Blumen.',
    difficulty: 2,
    targets: [
      {
        surface: 'seiner Oma',
        label: 'seiner Oma',
        caseId: 'dat',
        probe: 'Wem schenkt Ben Blumen?',
      },
      {
        surface: 'Blumen',
        label: 'Blumen',
        caseId: 'akk',
        probe: 'Wen oder was schenkt Ben seiner Oma?',
      },
    ],
  },
  {
    id: 'c115',
    sentence: 'Der Hund bringt dem Herrchen den Stock.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Herrchen',
        label: 'dem Herrchen',
        caseId: 'dat',
        probe: 'Wem bringt der Hund den Stock?',
      },
      {
        surface: 'den Stock',
        label: 'den Stock',
        caseId: 'akk',
        probe: 'Wen oder was bringt der Hund dem Herrchen?',
      },
    ],
  },
  {
    id: 'c116',
    sentence: 'Die Tante zeigt dem Kind die Fotos.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Kind',
        label: 'dem Kind',
        caseId: 'dat',
        probe: 'Wem zeigt die Tante die Fotos?',
      },
      {
        surface: 'die Fotos',
        label: 'die Fotos',
        caseId: 'akk',
        probe: 'Wen oder was zeigt die Tante dem Kind?',
      },
    ],
  },
  {
    id: 'c117',
    sentence: 'Wir senden der Freundin einen Brief.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Freundin',
        label: 'der Freundin',
        caseId: 'dat',
        probe: 'Wem senden wir einen Brief?',
      },
      {
        surface: 'einen Brief',
        label: 'einen Brief',
        caseId: 'akk',
        probe: 'Wen oder was senden wir der Freundin?',
      },
    ],
  },
  {
    id: 'c118',
    sentence: 'Papa repariert mir das Spielzeug.',
    difficulty: 2,
    targets: [
      {
        surface: 'mir',
        label: 'mir',
        caseId: 'dat',
        probe: 'Wem repariert Papa das Spielzeug?',
      },
      {
        surface: 'das Spielzeug',
        label: 'das Spielzeug',
        caseId: 'akk',
        probe: 'Wen oder was repariert Papa mir?',
      },
    ],
  },
  {
    id: 'c119',
    sentence: 'Die Katze bringt der Familie eine Maus.',
    difficulty: 3,
    targets: [
      {
        surface: 'der Familie',
        label: 'der Familie',
        caseId: 'dat',
        probe: 'Wem bringt die Katze eine Maus?',
      },
      {
        surface: 'eine Maus',
        label: 'eine Maus',
        caseId: 'akk',
        probe: 'Wen oder was bringt die Katze der Familie?',
      },
    ],
  },
  {
    id: 'c120',
    sentence: 'Der Kellner serviert den Gästen Suppe.',
    difficulty: 2,
    targets: [
      {
        surface: 'den Gästen',
        label: 'den Gästen',
        caseId: 'dat',
        probe: 'Wem serviert der Kellner Suppe?',
      },
      {
        surface: 'Suppe',
        label: 'Suppe',
        caseId: 'akk',
        probe: 'Wen oder was serviert der Kellner den Gästen?',
      },
    ],
  },
  {
    id: 'c121',
    sentence: 'Tim leiht der Schwester den Roman.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Schwester',
        label: 'der Schwester',
        caseId: 'dat',
        probe: 'Wem leiht Tim den Roman?',
      },
      {
        surface: 'den Roman',
        label: 'den Roman',
        caseId: 'akk',
        probe: 'Wen oder was leiht Tim der Schwester?',
      },
    ],
  },
  {
    id: 'c122',
    sentence: 'Die Oma gibt dem Enkel Kekse.',
    difficulty: 1,
    targets: [
      {
        surface: 'dem Enkel',
        label: 'dem Enkel',
        caseId: 'dat',
        probe: 'Wem gibt die Oma Kekse?',
      },
      {
        surface: 'Kekse',
        label: 'Kekse',
        caseId: 'akk',
        probe: 'Wen oder was gibt die Oma dem Enkel?',
      },
    ],
  },
  {
    id: 'c123',
    sentence: 'Hannah schickt dem Opa eine Mail.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Opa',
        label: 'dem Opa',
        caseId: 'dat',
        probe: 'Wem schickt Hannah eine Mail?',
      },
      {
        surface: 'eine Mail',
        label: 'eine Mail',
        caseId: 'akk',
        probe: 'Wen oder was schickt Hannah dem Opa?',
      },
    ],
  },
  {
    id: 'c124',
    sentence: 'Der Trainer zeigt den Spielern die Übung.',
    difficulty: 2,
    targets: [
      {
        surface: 'den Spielern',
        label: 'den Spielern',
        caseId: 'dat',
        probe: 'Wem zeigt der Trainer die Übung?',
      },
      {
        surface: 'die Übung',
        label: 'die Übung',
        caseId: 'akk',
        probe: 'Wen oder was zeigt der Trainer den Spielern?',
      },
    ],
  },
  {
    id: 'c125',
    sentence: 'Felix zeigt der Lehrerin die Hausaufgabe.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Lehrerin',
        label: 'der Lehrerin',
        caseId: 'dat',
        probe: 'Wem zeigt Felix die Hausaufgabe?',
      },
      {
        surface: 'die Hausaufgabe',
        label: 'die Hausaufgabe',
        caseId: 'akk',
        probe: 'Wen oder was zeigt Felix der Lehrerin?',
      },
    ],
  },
  {
    id: 'c126',
    sentence: 'Mama gibt den Kindern Obst.',
    difficulty: 1,
    targets: [
      {
        surface: 'den Kindern',
        label: 'den Kindern',
        caseId: 'dat',
        probe: 'Wem gibt Mama Obst?',
      },
      {
        surface: 'Obst',
        label: 'Obst',
        caseId: 'akk',
        probe: 'Wen oder was gibt Mama den Kindern?',
      },
    ],
  },
  {
    id: 'c127',
    sentence: 'Der Arzt verschreibt dem Patienten Medizin.',
    difficulty: 3,
    targets: [
      {
        surface: 'dem Patienten',
        label: 'dem Patienten',
        caseId: 'dat',
        probe: 'Wem verschreibt der Arzt Medizin?',
      },
      {
        surface: 'Medizin',
        label: 'Medizin',
        caseId: 'akk',
        probe: 'Wen oder was verschreibt der Arzt dem Patienten?',
      },
    ],
  },
  {
    id: 'c128',
    sentence: 'Jonas erzählt der Klasse einen Witz.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Klasse',
        label: 'der Klasse',
        caseId: 'dat',
        probe: 'Wem erzählt Jonas einen Witz?',
      },
      {
        surface: 'einen Witz',
        label: 'einen Witz',
        caseId: 'akk',
        probe: 'Wen oder was erzählt Jonas der Klasse?',
      },
    ],
  },
  {
    id: 'c129',
    sentence: 'Die Lehrerin stellt den Schülern eine Frage.',
    difficulty: 2,
    targets: [
      {
        surface: 'den Schülern',
        label: 'den Schülern',
        caseId: 'dat',
        probe: 'Wem stellt die Lehrerin eine Frage?',
      },
      {
        surface: 'eine Frage',
        label: 'eine Frage',
        caseId: 'akk',
        probe: 'Wen oder was stellt die Lehrerin den Schülern?',
      },
    ],
  },
  {
    id: 'c130',
    sentence: 'Paul bringt seinem Freund den Ball.',
    difficulty: 1,
    targets: [
      {
        surface: 'seinem Freund',
        label: 'seinem Freund',
        caseId: 'dat',
        probe: 'Wem bringt Paul den Ball?',
      },
      {
        surface: 'den Ball',
        label: 'den Ball',
        caseId: 'akk',
        probe: 'Wen oder was bringt Paul seinem Freund?',
      },
    ],
  },
  {
    id: 'c131',
    sentence: 'Die Polizistin zeigt den Kindern den Zebrastreifen.',
    difficulty: 2,
    targets: [
      {
        surface: 'den Kindern',
        label: 'den Kindern',
        caseId: 'dat',
        probe: 'Wem zeigt die Polizistin den Zebrastreifen?',
      },
      {
        surface: 'den Zebrastreifen',
        label: 'den Zebrastreifen',
        caseId: 'akk',
        probe: 'Wen oder was zeigt die Polizistin den Kindern?',
      },
    ],
  },
  {
    id: 'c132',
    sentence: 'Lena bringt der Freundin Tee.',
    difficulty: 1,
    targets: [
      {
        surface: 'der Freundin',
        label: 'der Freundin',
        caseId: 'dat',
        probe: 'Wem bringt Lena Tee?',
      },
      {
        surface: 'Tee',
        label: 'Tee',
        caseId: 'akk',
        probe: 'Wen oder was bringt Lena der Freundin?',
      },
    ],
  },
  {
    id: 'c133',
    sentence: 'Wir geben dem Team neue Trikots.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Team',
        label: 'dem Team',
        caseId: 'dat',
        probe: 'Wem geben wir neue Trikots?',
      },
      {
        surface: 'neue Trikots',
        label: 'neue Trikots',
        caseId: 'akk',
        probe: 'Wen oder was geben wir dem Team?',
      },
    ],
  },
  {
    id: 'c134',
    sentence: 'Der Bauer füttert den Tieren Heu.',
    difficulty: 2,
    targets: [
      {
        surface: 'den Tieren',
        label: 'den Tieren',
        caseId: 'dat',
        probe: 'Wem füttert der Bauer Heu?',
      },
      {
        surface: 'Heu',
        label: 'Heu',
        caseId: 'akk',
        probe: 'Wen oder was füttert der Bauer den Tieren?',
      },
    ],
  },
  {
    id: 'c135',
    sentence: 'Sie erklärt den Gästen die Regeln.',
    difficulty: 2,
    targets: [
      {
        surface: 'den Gästen',
        label: 'den Gästen',
        caseId: 'dat',
        probe: 'Wem erklärt sie die Regeln?',
      },
      {
        surface: 'die Regeln',
        label: 'die Regeln',
        caseId: 'akk',
        probe: 'Wen oder was erklärt sie den Gästen?',
      },
    ],
  },
  {
    id: 'c136',
    sentence: 'Tom gibt seiner Cousine den Film.',
    difficulty: 2,
    targets: [
      {
        surface: 'seiner Cousine',
        label: 'seiner Cousine',
        caseId: 'dat',
        probe: 'Wem gibt Tom den Film?',
      },
      {
        surface: 'den Film',
        label: 'den Film',
        caseId: 'akk',
        probe: 'Wen oder was gibt Tom seiner Cousine?',
      },
    ],
  },
  {
    id: 'c137',
    sentence: 'Die Oma backt dem Enkel einen Kuchen.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Enkel',
        label: 'dem Enkel',
        caseId: 'dat',
        probe: 'Wem backt die Oma einen Kuchen?',
      },
      {
        surface: 'einen Kuchen',
        label: 'einen Kuchen',
        caseId: 'akk',
        probe: 'Wen oder was backt die Oma dem Enkel?',
      },
    ],
  },
  {
    id: 'c138',
    sentence: 'Der Direktor schenkt der Klasse Papier.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Klasse',
        label: 'der Klasse',
        caseId: 'dat',
        probe: 'Wem schenkt der Direktor Papier?',
      },
      {
        surface: 'Papier',
        label: 'Papier',
        caseId: 'akk',
        probe: 'Wen oder was schenkt der Direktor der Klasse?',
      },
    ],
  },
  {
    id: 'c139',
    sentence: 'Mama schenkt dem Vater Kaffee.',
    difficulty: 1,
    targets: [
      {
        surface: 'dem Vater',
        label: 'dem Vater',
        caseId: 'dat',
        probe: 'Wem schenkt Mama Kaffee?',
      },
      {
        surface: 'Kaffee',
        label: 'Kaffee',
        caseId: 'akk',
        probe: 'Wen oder was schenkt Mama dem Vater?',
      },
    ],
  },
  {
    id: 'c140',
    sentence: 'Lea gibt dem Kunden die Rechnung.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Kunden',
        label: 'dem Kunden',
        caseId: 'dat',
        probe: 'Wem gibt Lea die Rechnung?',
      },
      {
        surface: 'die Rechnung',
        label: 'die Rechnung',
        caseId: 'akk',
        probe: 'Wen oder was gibt Lea dem Kunden?',
      },
    ],
  },
  {
    id: 'c141',
    sentence: 'Der Guide zeigt den Touristen die Karte.',
    difficulty: 2,
    targets: [
      {
        surface: 'den Touristen',
        label: 'den Touristen',
        caseId: 'dat',
        probe: 'Wem zeigt der Guide die Karte?',
      },
      {
        surface: 'die Karte',
        label: 'die Karte',
        caseId: 'akk',
        probe: 'Wen oder was zeigt der Guide den Touristen?',
      },
    ],
  },
  {
    id: 'c142',
    sentence: 'Jonas kauft seinem Bruder Eis.',
    difficulty: 1,
    targets: [
      {
        surface: 'seinem Bruder',
        label: 'seinem Bruder',
        caseId: 'dat',
        probe: 'Wem kauft Jonas Eis?',
      },
      {
        surface: 'Eis',
        label: 'Eis',
        caseId: 'akk',
        probe: 'Wen oder was kauft Jonas seinem Bruder?',
      },
    ],
  },
  {
    id: 'c143',
    sentence: 'Die Schwester bringt der Mutter Tee.',
    difficulty: 1,
    targets: [
      {
        surface: 'der Mutter',
        label: 'der Mutter',
        caseId: 'dat',
        probe: 'Wem bringt die Schwester Tee?',
      },
      {
        surface: 'Tee',
        label: 'Tee',
        caseId: 'akk',
        probe: 'Wen oder was bringt die Schwester der Mutter?',
      },
    ],
  },
  {
    id: 'c144',
    sentence: 'Herr Braun erklärt den Schülern die Formel.',
    difficulty: 3,
    targets: [
      {
        surface: 'den Schülern',
        label: 'den Schülern',
        caseId: 'dat',
        probe: 'Wem erklärt Herr Braun die Formel?',
      },
      {
        surface: 'die Formel',
        label: 'die Formel',
        caseId: 'akk',
        probe: 'Wen oder was erklärt Herr Braun den Schülern?',
      },
    ],
  },
  {
    id: 'c145',
    sentence: 'Sofia schreibt ihrer Freundin einen Text.',
    difficulty: 2,
    targets: [
      {
        surface: 'ihrer Freundin',
        label: 'ihrer Freundin',
        caseId: 'dat',
        probe: 'Wem schreibt Sofia einen Text?',
      },
      {
        surface: 'einen Text',
        label: 'einen Text',
        caseId: 'akk',
        probe: 'Wen oder was schreibt Sofia ihrer Freundin?',
      },
    ],
  },
  {
    id: 'c146',
    sentence: 'Der Postbote bringt uns die Pakete.',
    difficulty: 2,
    targets: [
      {
        surface: 'uns',
        label: 'uns',
        caseId: 'dat',
        probe: 'Wem bringt der Postbote die Pakete?',
      },
      {
        surface: 'die Pakete',
        label: 'die Pakete',
        caseId: 'akk',
        probe: 'Wen oder was bringt der Postbote uns?',
      },
    ],
  },
  {
    id: 'c147',
    sentence: 'Die Künstlerin verkauft dem Mann ein Bild.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Mann',
        label: 'dem Mann',
        caseId: 'dat',
        probe: 'Wem verkauft die Künstlerin ein Bild?',
      },
      {
        surface: 'ein Bild',
        label: 'ein Bild',
        caseId: 'akk',
        probe: 'Wen oder was verkauft die Künstlerin dem Mann?',
      },
    ],
  },
  {
    id: 'c148',
    sentence: 'Paul liest der Gruppe die Lösung vor.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Gruppe',
        label: 'der Gruppe',
        caseId: 'dat',
        probe: 'Wem liest Paul die Lösung vor?',
      },
      {
        surface: 'die Lösung',
        label: 'die Lösung',
        caseId: 'akk',
        probe: 'Wen oder was liest Paul der Gruppe vor?',
      },
    ],
  },
  {
    id: 'c149',
    sentence: 'Die Verkäuferin gibt mir das Wechselgeld.',
    difficulty: 2,
    targets: [
      {
        surface: 'mir',
        label: 'mir',
        caseId: 'dat',
        probe: 'Wem gibt die Verkäuferin das Wechselgeld?',
      },
      {
        surface: 'das Wechselgeld',
        label: 'das Wechselgeld',
        caseId: 'akk',
        probe: 'Wen oder was gibt die Verkäuferin mir?',
      },
    ],
  },
  {
    id: 'c150',
    sentence: 'Tim schenkt seiner Schwester einen Korb.',
    difficulty: 1,
    targets: [
      {
        surface: 'seiner Schwester',
        label: 'seiner Schwester',
        caseId: 'dat',
        probe: 'Wem schenkt Tim einen Korb?',
      },
      {
        surface: 'einen Korb',
        label: 'einen Korb',
        caseId: 'akk',
        probe: 'Wen oder was schenkt Tim seiner Schwester?',
      },
    ],
  },
  {
    id: 'c151',
    sentence: 'Die Ärztin verschreibt dem Jungen Salbe.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Jungen',
        label: 'dem Jungen',
        caseId: 'dat',
        probe: 'Wem verschreibt die Ärztin Salbe?',
      },
      {
        surface: 'Salbe',
        label: 'Salbe',
        caseId: 'akk',
        probe: 'Wen oder was verschreibt die Ärztin dem Jungen?',
      },
    ],
  },
  {
    id: 'c152',
    sentence: 'Wir geben euch den Tipp.',
    difficulty: 2,
    targets: [
      {
        surface: 'euch',
        label: 'euch',
        caseId: 'dat',
        probe: 'Wem geben wir den Tipp?',
      },
      {
        surface: 'den Tipp',
        label: 'den Tipp',
        caseId: 'akk',
        probe: 'Wen oder was geben wir euch?',
      },
    ],
  },
  {
    id: 'c51',
    sentence: 'Er öffnet die Tür.',
    difficulty: 1,
    targets: [
      {
        surface: 'die Tür',
        label: 'die Tür',
        caseId: 'akk',
        probe: 'Wen oder was öffnet er?',
      },
    ],
  },
  {
    id: 'c52',
    sentence: 'Sie sitzt auf dem Stuhl.',
    difficulty: 1,
    targets: [
      {
        surface: 'dem Stuhl',
        label: 'dem Stuhl',
        caseId: 'dat',
        probe: 'Wem oder worauf sitzt sie?',
      },
    ],
  },
  {
    id: 'c53',
    sentence: 'Das Auto der Familie steht draußen.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Familie',
        label: 'der Familie',
        caseId: 'gen',
        probe: 'Wessen Auto steht draußen?',
      },
    ],
  },
  {
    id: 'c54',
    sentence: 'Der Junge wirft den Ball.',
    difficulty: 1,
    targets: [
      {
        surface: 'den Ball',
        label: 'den Ball',
        caseId: 'akk',
        probe: 'Wen oder was wirft der Junge?',
      },
    ],
  },
  {
    id: 'c55',
    sentence: 'Die Biene summt.',
    difficulty: 1,
    targets: [
      {
        surface: 'Die Biene',
        label: 'die Biene',
        caseId: 'nom',
        probe: 'Wer oder was summt?',
      },
    ],
  },
  {
    id: 'c56',
    sentence: 'Ich antworte dem Freund.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Freund',
        label: 'dem Freund',
        caseId: 'dat',
        probe: 'Wem antworte ich?',
      },
    ],
  },
  {
    id: 'c57',
    sentence: 'Wir hören die Musik.',
    difficulty: 1,
    targets: [
      {
        surface: 'die Musik',
        label: 'die Musik',
        caseId: 'akk',
        probe: 'Wen oder was hören wir?',
      },
    ],
  },
  {
    id: 'c58',
    sentence: 'Der Preis des Buches steht hinten.',
    difficulty: 2,
    targets: [
      {
        surface: 'des Buches',
        label: 'des Buches',
        caseId: 'gen',
        probe: 'Wessen Preis steht hinten?',
      },
    ],
  },
  {
    id: 'c59',
    sentence: 'Felix folgt seiner Mutter.',
    difficulty: 2,
    targets: [
      {
        surface: 'seiner Mutter',
        label: 'seiner Mutter',
        caseId: 'dat',
        probe: 'Wem folgt Felix?',
      },
    ],
  },
  {
    id: 'c60',
    sentence: 'Ein Vogel baut ein Nest.',
    difficulty: 2,
    targets: [
      {
        surface: 'ein Nest',
        label: 'ein Nest',
        caseId: 'akk',
        probe: 'Wen oder was baut ein Vogel?',
      },
    ],
  },
  {
    id: 'c61',
    sentence: 'Die Uhr des Turms ist alt.',
    difficulty: 2,
    targets: [
      {
        surface: 'des Turms',
        label: 'des Turms',
        caseId: 'gen',
        probe: 'Wessen Uhr ist alt?',
      },
    ],
  },
  {
    id: 'c62',
    sentence: 'Eva bringt der Klasse Kuchen.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Klasse',
        label: 'der Klasse',
        caseId: 'dat',
        probe: 'Wem bringt Eva Kuchen?',
      },
    ],
  },
  {
    id: 'c63',
    sentence: 'Wir sehen einen Film.',
    difficulty: 1,
    targets: [
      {
        surface: 'einen Film',
        label: 'einen Film',
        caseId: 'akk',
        probe: 'Wen oder was sehen wir?',
      },
    ],
  },
  {
    id: 'c64',
    sentence: 'Der Himmel wird dunkel.',
    difficulty: 1,
    targets: [
      {
        surface: 'Der Himmel',
        label: 'der Himmel',
        caseId: 'nom',
        probe: 'Wer oder was wird dunkel?',
      },
    ],
  },
  {
    id: 'c65',
    sentence: 'Tom dankt dem Helfer.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Helfer',
        label: 'dem Helfer',
        caseId: 'dat',
        probe: 'Wem dankt Tom?',
      },
    ],
  },
  {
    id: 'c66',
    sentence: 'Sie waschen dem Baby die Hände.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Baby',
        label: 'dem Baby',
        caseId: 'dat',
        probe: 'Wem waschen sie die Hände?',
      },
    ],
  },
  {
    id: 'c67',
    sentence: 'Ich trinke die Milch.',
    difficulty: 1,
    targets: [
      {
        surface: 'die Milch',
        label: 'die Milch',
        caseId: 'akk',
        probe: 'Wen oder was trinke ich?',
      },
    ],
  },
  {
    id: 'c68',
    sentence: 'Das Licht der Lampe flackert.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Lampe',
        label: 'der Lampe',
        caseId: 'gen',
        probe: 'Wessen Licht flackert?',
      },
    ],
  },
  {
    id: 'c69',
    sentence: 'Lea schickt der Tante eine Karte.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Tante',
        label: 'der Tante',
        caseId: 'dat',
        probe: 'Wem schickt Lea eine Karte?',
      },
    ],
  },
  {
    id: 'c70',
    sentence: 'Der Koch schmeckt die Suppe.',
    difficulty: 2,
    targets: [
      {
        surface: 'die Suppe',
        label: 'die Suppe',
        caseId: 'akk',
        probe: 'Wen oder was schmeckt der Koch?',
      },
    ],
  },
  {
    id: 'c71',
    sentence: 'Ein Pferd frisst Heu.',
    difficulty: 1,
    targets: [
      {
        surface: 'Ein Pferd',
        label: 'ein Pferd',
        caseId: 'nom',
        probe: 'Wer oder was frisst Heu?',
      },
    ],
  },
  {
    id: 'c72',
    sentence: 'Wir besuchen die Großeltern.',
    difficulty: 1,
    targets: [
      {
        surface: 'die Großeltern',
        label: 'die Großeltern',
        caseId: 'akk',
        probe: 'Wen oder was besuchen wir?',
      },
    ],
  },
  {
    id: 'c73',
    sentence: 'Der Kopf des Löwen ist groß.',
    difficulty: 3,
    targets: [
      {
        surface: 'des Löwen',
        label: 'des Löwen',
        caseId: 'gen',
        probe: 'Wessen Kopf ist groß?',
      },
    ],
  },
  {
    id: 'c74',
    sentence: 'Paul schenkt seinem Freund ein Spiel.',
    difficulty: 2,
    targets: [
      {
        surface: 'seinem Freund',
        label: 'seinem Freund',
        caseId: 'dat',
        probe: 'Wem schenkt Paul ein Spiel?',
      },
    ],
  },
  {
    id: 'c75',
    sentence: 'Sie malt das Bild.',
    difficulty: 1,
    targets: [
      {
        surface: 'das Bild',
        label: 'das Bild',
        caseId: 'akk',
        probe: 'Wen oder was malt sie?',
      },
    ],
  },
  {
    id: 'c76',
    sentence: 'Der Schüler fragt den Lehrer.',
    difficulty: 1,
    targets: [
      {
        surface: 'den Lehrer',
        label: 'den Lehrer',
        caseId: 'akk',
        probe: 'Wen oder was fragt der Schüler?',
      },
    ],
  },
  {
    id: 'c77',
    sentence: 'Die Maus versteckt sich unter dem Bett.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Bett',
        label: 'dem Bett',
        caseId: 'dat',
        probe: 'Unter wem oder was? Unter dem Bett – Dativ.',
      },
    ],
  },
  {
    id: 'c78',
    sentence: 'Hannah erklärt dem Kind die Aufgabe.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Kind',
        label: 'dem Kind',
        caseId: 'dat',
        probe: 'Wem erklärt Hannah die Aufgabe?',
      },
    ],
  },
  {
    id: 'c79',
    sentence: 'Ich bestelle eine Pizza.',
    difficulty: 1,
    targets: [
      {
        surface: 'eine Pizza',
        label: 'eine Pizza',
        caseId: 'akk',
        probe: 'Wen oder was bestelle ich?',
      },
    ],
  },
  {
    id: 'c80',
    sentence: 'Der Arm des Roboters bewegt sich.',
    difficulty: 3,
    targets: [
      {
        surface: 'des Roboters',
        label: 'des Roboters',
        caseId: 'gen',
        probe: 'Wessen Arm bewegt sich?',
      },
    ],
  },
  {
    id: 'c81',
    sentence: 'Wir gratulieren dem Sieger.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Sieger',
        label: 'dem Sieger',
        caseId: 'dat',
        probe: 'Wem gratulieren wir?',
      },
    ],
  },
  {
    id: 'c82',
    sentence: 'Die Flöte klingt schön.',
    difficulty: 1,
    targets: [
      {
        surface: 'Die Flöte',
        label: 'die Flöte',
        caseId: 'nom',
        probe: 'Wer oder was klingt schön?',
      },
    ],
  },
  {
    id: 'c83',
    sentence: 'Ben repariert das Fahrrad.',
    difficulty: 1,
    targets: [
      {
        surface: 'das Fahrrad',
        label: 'das Fahrrad',
        caseId: 'akk',
        probe: 'Wen oder was repariert Ben?',
      },
    ],
  },
  {
    id: 'c84',
    sentence: 'Die Farbe der Wand ist blau.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Wand',
        label: 'der Wand',
        caseId: 'gen',
        probe: 'Wessen Farbe ist blau?',
      },
    ],
  },
  {
    id: 'c85',
    sentence: 'Sie hilft der Nachbarin.',
    difficulty: 1,
    targets: [
      {
        surface: 'der Nachbarin',
        label: 'der Nachbarin',
        caseId: 'dat',
        probe: 'Wem hilft sie?',
      },
    ],
  },
  {
    id: 'c86',
    sentence: 'Ein Fuchs läuft über die Wiese.',
    difficulty: 2,
    targets: [
      {
        surface: 'Ein Fuchs',
        label: 'ein Fuchs',
        caseId: 'nom',
        probe: 'Wer oder was läuft über die Wiese?',
      },
    ],
  },
  {
    id: 'c87',
    sentence: 'Tim sucht seinen Hut.',
    difficulty: 1,
    targets: [
      {
        surface: 'seinen Hut',
        label: 'seinen Hut',
        caseId: 'akk',
        probe: 'Wen oder was sucht Tim?',
      },
    ],
  },
  {
    id: 'c88',
    sentence: 'Das Herz des Kindes schlägt schnell.',
    difficulty: 2,
    targets: [
      {
        surface: 'des Kindes',
        label: 'des Kindes',
        caseId: 'gen',
        probe: 'Wessen Herz schlägt schnell?',
      },
    ],
  },
  {
    id: 'c89',
    sentence: 'Wir leihen der Bibliothek Bücher zurück.',
    difficulty: 3,
    targets: [
      {
        surface: 'der Bibliothek',
        label: 'der Bibliothek',
        caseId: 'dat',
        probe: 'Wem leihen wir Bücher zurück?',
      },
    ],
  },
  {
    id: 'c90',
    sentence: 'Sie pflückt einen Apfel.',
    difficulty: 1,
    targets: [
      {
        surface: 'einen Apfel',
        label: 'einen Apfel',
        caseId: 'akk',
        probe: 'Wen oder was pflückt sie?',
      },
    ],
  },
  {
    id: 'c91',
    sentence: 'Der Sturm tobt.',
    difficulty: 1,
    targets: [
      {
        surface: 'Der Sturm',
        label: 'der Sturm',
        caseId: 'nom',
        probe: 'Wer oder was tobt?',
      },
    ],
  },
  {
    id: 'c92',
    sentence: 'Mia schreibt ihrer Freundin.',
    difficulty: 2,
    targets: [
      {
        surface: 'ihrer Freundin',
        label: 'ihrer Freundin',
        caseId: 'dat',
        probe: 'Wem schreibt Mia?',
      },
    ],
  },
  {
    id: 'c93',
    sentence: 'Ich ziehe den Mantel an.',
    difficulty: 1,
    targets: [
      {
        surface: 'den Mantel',
        label: 'den Mantel',
        caseId: 'akk',
        probe: 'Wen oder was ziehe ich an?',
      },
    ],
  },
  {
    id: 'c94',
    sentence: 'Der Geruch des Brotes ist gut.',
    difficulty: 2,
    targets: [
      {
        surface: 'des Brotes',
        label: 'des Brotes',
        caseId: 'gen',
        probe: 'Wessen Geruch ist gut?',
      },
    ],
  },
  {
    id: 'c95',
    sentence: 'Er zeigt dem Publikum den Trick.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Publikum',
        label: 'dem Publikum',
        caseId: 'dat',
        probe: 'Wem zeigt er den Trick?',
      },
    ],
  },
  {
    id: 'c96',
    sentence: 'Die Rose duftet.',
    difficulty: 1,
    targets: [
      {
        surface: 'Die Rose',
        label: 'die Rose',
        caseId: 'nom',
        probe: 'Wer oder was duftet?',
      },
    ],
  },
  {
    id: 'c97',
    sentence: 'Wir kaufen ein Geschenk.',
    difficulty: 1,
    targets: [
      {
        surface: 'ein Geschenk',
        label: 'ein Geschenk',
        caseId: 'akk',
        probe: 'Wen oder was kaufen wir?',
      },
    ],
  },
  {
    id: 'c98',
    sentence: 'Der Fuß des Tisches wackelt.',
    difficulty: 2,
    targets: [
      {
        surface: 'des Tisches',
        label: 'des Tisches',
        caseId: 'gen',
        probe: 'Wessen Fuß wackelt?',
      },
    ],
  },
  {
    id: 'c99',
    sentence: 'Jonas antwortet der Lehrerin.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Lehrerin',
        label: 'der Lehrerin',
        caseId: 'dat',
        probe: 'Wem antwortet Jonas?',
      },
    ],
  },
  {
    id: 'c100',
    sentence: 'Sie trägt den Rucksack.',
    difficulty: 1,
    targets: [
      {
        surface: 'den Rucksack',
        label: 'den Rucksack',
        caseId: 'akk',
        probe: 'Wen oder was trägt sie?',
      },
    ],
  },
  {
    id: 'c101',
    sentence: 'Ein Schiff fährt auf dem See.',
    difficulty: 1,
    targets: [
      {
        surface: 'Ein Schiff',
        label: 'ein Schiff',
        caseId: 'nom',
        probe: 'Wer oder was fährt auf dem See?',
      },
    ],
  },
  {
    id: 'c102',
    sentence: 'Der Onkel erzählt dem Neffen eine Geschichte.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Neffen',
        label: 'dem Neffen',
        caseId: 'dat',
        probe: 'Wem erzählt der Onkel eine Geschichte?',
      },
    ],
  },
  {
    id: 'c103',
    sentence: 'Ich löse das Rätsel.',
    difficulty: 2,
    targets: [
      {
        surface: 'das Rätsel',
        label: 'das Rätsel',
        caseId: 'akk',
        probe: 'Wen oder was löse ich?',
      },
    ],
  },
  {
    id: 'c104',
    sentence: 'Die Stimme des Sängers ist klar.',
    difficulty: 2,
    targets: [
      {
        surface: 'des Sängers',
        label: 'des Sängers',
        caseId: 'gen',
        probe: 'Wessen Stimme ist klar?',
      },
    ],
  },
  {
    id: 'c105',
    sentence: 'Wir folgen dem Wanderweg.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Wanderweg',
        label: 'dem Wanderweg',
        caseId: 'dat',
        probe: 'Wem folgen wir?',
      },
    ],
  },
  {
    id: 'c106',
    sentence: 'Der Ball rollt.',
    difficulty: 1,
    targets: [
      {
        surface: 'Der Ball',
        label: 'der Ball',
        caseId: 'nom',
        probe: 'Wer oder was rollt?',
      },
    ],
  },
  {
    id: 'c107',
    sentence: 'Lea kauft der Mutter Kaffee.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Mutter',
        label: 'der Mutter',
        caseId: 'dat',
        probe: 'Wem kauft Lea Kaffee?',
      },
    ],
  },
  {
    id: 'c108',
    sentence: 'Er hört das Echo.',
    difficulty: 2,
    targets: [
      {
        surface: 'das Echo',
        label: 'das Echo',
        caseId: 'akk',
        probe: 'Wen oder was hört er?',
      },
    ],
  },
  {
    id: 'c109',
    sentence: 'Das Gewicht der Kiste ist hoch.',
    difficulty: 2,
    targets: [
      {
        surface: 'der Kiste',
        label: 'der Kiste',
        caseId: 'gen',
        probe: 'Wessen Gewicht ist hoch?',
      },
    ],
  },
  {
    id: 'c110',
    sentence: 'Sie schenkt dem Vater eine Krawatte.',
    difficulty: 2,
    targets: [
      {
        surface: 'dem Vater',
        label: 'dem Vater',
        caseId: 'dat',
        probe: 'Wem schenkt sie eine Krawatte?',
      },
    ],
  },
] as const
