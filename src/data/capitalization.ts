import { capitalizationSentencesExtra } from './capitalization.extra'

export interface CapToken {
  faulty: string
  correct: string
  reason?: 'sentence' | 'noun' | 'weekday' | 'month' | 'season' | 'holiday' | 'language' | 'address' | 'name' | 'title'
  note?: string
  before?: string
  after?: string
}

export interface CapSentence {
  id: string
  difficulty: 1 | 2 | 3
  tokens: CapToken[]
  nouns: string[]
  faultySentence: string
  correctSentence: string
  toggle: boolean
}

export const reasonLabels = {
  sentence: 'Satzanfang',
  noun: 'Nomen',
  weekday: 'Wochentag',
  month: 'Monat',
  season: 'Jahreszeit',
  holiday: 'Feiertag',
  language: 'Sprache',
  address: 'Anrede',
  name: 'Eigenname',
  title: 'Werktitel',
} as const

function cap(
  id: string,
  difficulty: 1 | 2 | 3,
  tokens: CapToken[],
  nouns: string[],
  faultySentence: string,
  correctSentence: string,
  toggle = true,
): CapSentence {
  return { id, difficulty, tokens, nouns, faultySentence, correctSentence, toggle }
}

export const capitalizationSentences: readonly CapSentence[] = [
  cap('k01', 1, [
    { faulty: 'der', correct: 'Der', reason: 'sentence' },
    { faulty: 'hund', correct: 'Hund', reason: 'noun' },
    { faulty: 'schläft', correct: 'schläft' },
    { faulty: 'im', correct: 'im' },
    { faulty: 'garten', correct: 'Garten', reason: 'noun', after: '.' },
  ], ['Hund', 'Garten'], 'der hund schläft im garten.', 'Der Hund schläft im Garten.'),
  cap('k02', 2, [
    { faulty: 'heute', correct: 'Heute', reason: 'sentence', note: 'Heute ist kein Nomen. Es steht nur am Satzanfang groß.' },
    { faulty: 'besucht', correct: 'besucht' },
    { faulty: 'lena', correct: 'Lena', reason: 'name' },
    { faulty: 'ihre', correct: 'ihre' },
    { faulty: 'freundin', correct: 'Freundin', reason: 'noun', after: '.' },
  ], ['Lena', 'Freundin'], 'heute besucht lena ihre freundin.', 'Heute besucht Lena ihre Freundin.'),
  cap('k03', 2, [
    { faulty: 'am', correct: 'Am', reason: 'sentence' },
    { faulty: 'montag', correct: 'Montag', reason: 'weekday' },
    { faulty: 'beginnt', correct: 'beginnt' },
    { faulty: 'die', correct: 'die' },
    { faulty: 'schule', correct: 'Schule', reason: 'noun' },
    { faulty: 'wieder', correct: 'wieder', after: '.' },
  ], ['Montag', 'Schule'], 'am montag beginnt die schule wieder.', 'Am Montag beginnt die Schule wieder.'),
  cap('k04', 2, [
    { faulty: 'im', correct: 'Im', reason: 'sentence' },
    { faulty: 'sommer', correct: 'Sommer', reason: 'season' },
    { faulty: 'fahren', correct: 'fahren' },
    { faulty: 'wir', correct: 'wir' },
    { faulty: 'nach', correct: 'nach' },
    { faulty: 'berlin', correct: 'Berlin', reason: 'name', after: '.' },
  ], ['Sommer', 'Berlin'], 'im sommer fahren wir nach berlin.', 'Im Sommer fahren wir nach Berlin.'),
  cap('k05', 2, [
    { faulty: 'mein', correct: 'Mein', reason: 'sentence' },
    { faulty: 'bruder', correct: 'Bruder', reason: 'noun' },
    { faulty: 'lernt', correct: 'lernt' },
    { faulty: 'englisch', correct: 'Englisch', reason: 'language', after: '.' },
  ], ['Bruder', 'Englisch'], 'mein bruder lernt englisch.', 'Mein Bruder lernt Englisch.'),
  cap('k06', 2, [
    { faulty: 'frau', correct: 'Frau', reason: 'address', note: 'Frau steht als Anrede groß.' },
    { faulty: 'kaya', correct: 'Kaya', reason: 'name' },
    { faulty: 'unterrichtet', correct: 'unterrichtet' },
    { faulty: 'deutsch', correct: 'Deutsch', reason: 'language', after: '.' },
  ], ['Frau', 'Kaya', 'Deutsch'], 'frau kaya unterrichtet deutsch.', 'Frau Kaya unterrichtet Deutsch.'),
  cap('k07', 2, [
    { faulty: 'der', correct: 'Der', reason: 'sentence' },
    { faulty: 'rhein', correct: 'Rhein', reason: 'name' },
    { faulty: 'fließt', correct: 'fließt' },
    { faulty: 'durch', correct: 'durch' },
    { faulty: 'deutschland', correct: 'Deutschland', reason: 'name', after: '.' },
  ], ['Rhein', 'Deutschland'], 'der rhein fließt durch deutschland.', 'Der Rhein fließt durch Deutschland.'),
  cap('k08', 3, [
    { faulty: 'mein', correct: 'Mein', reason: 'sentence' },
    { faulty: 'freund', correct: 'Freund', reason: 'noun' },
    { faulty: 'liest', correct: 'liest' },
    { faulty: 'der', correct: 'Der', reason: 'title' },
    { faulty: 'kleine', correct: 'kleine' },
    { faulty: 'prinz', correct: 'Prinz', reason: 'title' },
  ], ['Freund', 'Prinz'], 'mein freund liest der kleine prinz.', 'Mein Freund liest „Der kleine Prinz“.', false),
  cap('k09', 3, [
    { faulty: 'ich', correct: 'Ich', reason: 'sentence' },
    { faulty: 'wünsche', correct: 'wünsche' },
    { faulty: 'ihnen', correct: 'Ihnen', reason: 'address', note: 'Ihnen ist eine höfliche Anrede und wird großgeschrieben. Es ist kein Nomen.' },
    { faulty: 'einen', correct: 'einen' },
    { faulty: 'schönen', correct: 'schönen' },
    { faulty: 'tag', correct: 'Tag', reason: 'noun', after: '.' },
  ], ['Tag'], 'ich wünsche ihnen einen schönen tag.', 'Ich wünsche Ihnen einen schönen Tag.'),
  cap('k10', 1, [
    { faulty: 'der', correct: 'Der', reason: 'sentence' },
    { faulty: 'lehrer', correct: 'Lehrer', reason: 'noun' },
    { faulty: 'erklärt', correct: 'erklärt' },
    { faulty: 'die', correct: 'die' },
    { faulty: 'aufgabe', correct: 'Aufgabe', reason: 'noun', after: '.' },
  ], ['Lehrer', 'Aufgabe'], 'der lehrer erklärt die aufgabe.', 'Der Lehrer erklärt die Aufgabe.'),
  cap('k11', 3, [
    { faulty: 'schnell', correct: 'Schnell', reason: 'sentence', note: 'Schnell ist kein Nomen. Es steht nur am Satzanfang groß.' },
    { faulty: 'läuft', correct: 'läuft' },
    { faulty: 'der', correct: 'der' },
    { faulty: 'hund', correct: 'Hund', reason: 'noun' },
    { faulty: 'nach', correct: 'nach' },
    { faulty: 'hause', correct: 'Hause', reason: 'noun', after: '.' },
  ], ['Hund', 'Hause'], 'schnell läuft der hund nach hause.', 'Schnell läuft der Hund nach Hause.'),
  cap('k12', 2, [
    { faulty: 'die', correct: 'Die', reason: 'sentence' },
    { faulty: 'kinder', correct: 'Kinder', reason: 'noun' },
    { faulty: 'spielen', correct: 'spielen' },
    { faulty: 'am', correct: 'am' },
    { faulty: 'freitag', correct: 'Freitag', reason: 'weekday' },
    { faulty: 'im', correct: 'im' },
    { faulty: 'park', correct: 'Park', reason: 'noun', after: '.' },
  ], ['Kinder', 'Freitag', 'Park'], 'die kinder spielen am freitag im park.', 'Die Kinder spielen am Freitag im Park.'),
  cap('k13', 2, [
    { faulty: 'ostern', correct: 'Ostern', reason: 'holiday', note: 'Feiertage schreibt man groß. Ostern steht hier außerdem am Satzanfang.' },
    { faulty: 'besuchen', correct: 'besuchen' },
    { faulty: 'wir', correct: 'wir' },
    { faulty: 'unsere', correct: 'unsere' },
    { faulty: 'großeltern', correct: 'Großeltern', reason: 'noun', after: '.' },
  ], ['Ostern', 'Großeltern'], 'ostern besuchen wir unsere großeltern.', 'Ostern besuchen wir unsere Großeltern.'),
  cap('k14', 2, [
    { faulty: 'im', correct: 'Im', reason: 'sentence' },
    { faulty: 'mai', correct: 'Mai', reason: 'month' },
    { faulty: 'blühen', correct: 'blühen' },
    { faulty: 'viele', correct: 'viele' },
    { faulty: 'pflanzen', correct: 'Pflanzen', reason: 'noun', after: '.' },
  ], ['Mai', 'Pflanzen'], 'im mai blühen viele pflanzen.', 'Im Mai blühen viele Pflanzen.'),
  cap('k15', 2, [
    { faulty: 'der', correct: 'Der', reason: 'sentence' },
    { faulty: 'winter', correct: 'Winter', reason: 'season' },
    { faulty: 'beginnt', correct: 'beginnt' },
    { faulty: 'im', correct: 'im' },
    { faulty: 'dezember', correct: 'Dezember', reason: 'month', after: '.' },
  ], ['Winter', 'Dezember'], 'der winter beginnt im dezember.', 'Der Winter beginnt im Dezember.'),
  cap('k16', 3, [
    { faulty: 'montags', correct: 'Montags', reason: 'sentence', note: 'Montags wird hier nur wegen des Satzanfangs großgeschrieben. Der Wochentag Montag bleibt davon verschieden.' },
    { faulty: 'fährt', correct: 'fährt' },
    { faulty: 'ben', correct: 'Ben', reason: 'name' },
    { faulty: 'mit', correct: 'mit' },
    { faulty: 'dem', correct: 'dem' },
    { faulty: 'bus', correct: 'Bus', reason: 'noun', after: '.' },
  ], ['Ben', 'Bus'], 'montags fährt ben mit dem bus.', 'Montags fährt Ben mit dem Bus.'),
  cap('k17', 3, [
    { faulty: 'abends', correct: 'Abends', reason: 'sentence', note: 'Abends steht nur am Satzanfang groß. Sonst schreibt man abends klein.' },
    { faulty: 'liest', correct: 'liest' },
    { faulty: 'mia', correct: 'Mia', reason: 'name' },
    { faulty: 'häufig', correct: 'häufig' },
    { faulty: 'ein', correct: 'ein' },
    { faulty: 'buch', correct: 'Buch', reason: 'noun', after: '.' },
  ], ['Mia', 'Buch'], 'abends liest mia häufig ein buch.', 'Abends liest Mia häufig ein Buch.'),
  cap('k18', 3, [
    { faulty: 'das', correct: 'Das', reason: 'sentence' },
    { faulty: 'deutsche', correct: 'deutsche', note: 'Adjektive von Sprachen schreibt man klein: deutsche.' },
    { faulty: 'brot', correct: 'Brot', reason: 'noun' },
    { faulty: 'schmeckt', correct: 'schmeckt' },
    { faulty: 'ihm', correct: 'ihm' },
    { faulty: 'gut', correct: 'gut', after: '.' },
  ], ['Brot'], 'das deutsche brot schmeckt ihm gut.', 'Das deutsche Brot schmeckt ihm gut.'),
  cap('k19', 2, [
    { faulty: 'herr', correct: 'Herr', reason: 'address' },
    { faulty: 'müller', correct: 'Müller', reason: 'name' },
    { faulty: 'fährt', correct: 'fährt' },
    { faulty: 'nach', correct: 'nach' },
    { faulty: 'münchen', correct: 'München', reason: 'name', after: '.' },
  ], ['Herr', 'Müller', 'München'], 'herr müller fährt nach münchen.', 'Herr Müller fährt nach München.'),
  cap('k20', 2, [
    { faulty: 'die', correct: 'Die', reason: 'sentence' },
    { faulty: 'zugspitze', correct: 'Zugspitze', reason: 'name' },
    { faulty: 'liegt', correct: 'liegt' },
    { faulty: 'in', correct: 'in' },
    { faulty: 'den', correct: 'den' },
    { faulty: 'alpen', correct: 'Alpen', reason: 'name', after: '.' },
  ], ['Zugspitze', 'Alpen'], 'die zugspitze liegt in den alpen.', 'Die Zugspitze liegt in den Alpen.'),
  cap('k21', 1, [
    { faulty: 'die', correct: 'Die', reason: 'sentence' },
    { faulty: 'sonne', correct: 'Sonne', reason: 'noun' },
    { faulty: 'scheint', correct: 'scheint' },
    { faulty: 'über', correct: 'über' },
    { faulty: 'dem', correct: 'dem' },
    { faulty: 'meer', correct: 'Meer', reason: 'noun', after: '.' },
  ], ['Sonne', 'Meer'], 'die sonne scheint über dem meer.', 'Die Sonne scheint über dem Meer.'),
  cap('k22', 2, [
    { faulty: 'am', correct: 'Am', reason: 'sentence' },
    { faulty: 'freitag', correct: 'Freitag', reason: 'weekday' },
    { faulty: 'besucht', correct: 'besucht' },
    { faulty: 'oma', correct: 'Oma', reason: 'noun' },
    { faulty: 'die', correct: 'die' },
    { faulty: 'schule', correct: 'Schule', reason: 'noun', after: '.' },
  ], ['Freitag', 'Oma', 'Schule'], 'am freitag besucht oma die schule.', 'Am Freitag besucht Oma die Schule.'),
  cap('k23', 3, [
    { faulty: 'morgens', correct: 'Morgens', reason: 'sentence', note: 'morgens ist adverbial und steht nur am Satzanfang groß.' },
    { faulty: 'trinkt', correct: 'trinkt' },
    { faulty: 'paul', correct: 'Paul', reason: 'name' },
    { faulty: 'tee', correct: 'Tee', reason: 'noun', after: '.' },
  ], ['Paul', 'Tee'], 'morgens trinkt paul tee.', 'Morgens trinkt Paul Tee.'),
  ...capitalizationSentencesExtra,
]
