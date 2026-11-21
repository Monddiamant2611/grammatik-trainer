export interface SpellingPair {
  id: string
  topic: string
  correct: string
  wrong: string
  note: string
  difficulty: 1 | 2 | 3
}

export const spellingPairs: readonly SpellingPair[] = [
  { id: 'ae1', topic: 'ä oder e', correct: 'Hände', wrong: 'Hende', note: 'Von Hand leitet man Hände ab. Deshalb steht ä.', difficulty: 1 },
  { id: 'ae2', topic: 'ä oder e', correct: 'Mädchen', wrong: 'Medchen', note: 'Mädchen schreibt man mit ä.', difficulty: 1 },
  { id: 'ae3', topic: 'ä oder e', correct: 'Bäcker', wrong: 'Becker', note: 'Bäcker gehört zu backen. Deshalb steht ä.', difficulty: 1 },
  { id: 'ae4', topic: 'ä oder e', correct: 'Wälder', wrong: 'Welder', note: 'Von Wald leitet man Wälder ab.', difficulty: 1 },
  { id: 'ae5', topic: 'ä oder e', correct: 'Äpfel', wrong: 'Epfel', note: 'Von Apfel leitet man Äpfel ab.', difficulty: 1 },
  { id: 'dd1', topic: 'doppelter Mitlaut', correct: 'kommen', wrong: 'komen', note: 'Nach dem kurzen Vokal in kommen steht mm.', difficulty: 1 },
  { id: 'dd2', topic: 'doppelter Mitlaut', correct: 'bitter', wrong: 'biter', note: 'In bitter folgt auf den kurzen Vokal tt.', difficulty: 1 },
  { id: 'dd3', topic: 'doppelter Mitlaut', correct: 'Sommer', wrong: 'Somer', note: 'Sommer schreibt man mit mm.', difficulty: 1 },
  { id: 'dd4', topic: 'doppelter Mitlaut', correct: 'rennen', wrong: 'renen', note: 'In rennen steht nach dem kurzen Vokal nn.', difficulty: 1 },
  { id: 'dd5', topic: 'doppelter Mitlaut', correct: 'Halle', wrong: 'Hale', note: 'Halle schreibt man mit ll.', difficulty: 1 },
  { id: 'dd6', topic: 'doppelter Mitlaut', correct: 'Koffer', wrong: 'Kofer', note: 'Koffer schreibt man mit ff.', difficulty: 1 },
  { id: 'vv1', topic: 'doppelter Selbstlaut', correct: 'Boot', wrong: 'Bot', note: 'Boot schreibt man mit oo.', difficulty: 1 },
  { id: 'vv2', topic: 'doppelter Selbstlaut', correct: 'Meer', wrong: 'Mer', note: 'Meer schreibt man mit ee.', difficulty: 1 },
  { id: 'vv3', topic: 'doppelter Selbstlaut', correct: 'Haar', wrong: 'Har', note: 'Haar schreibt man mit aa.', difficulty: 1 },
  { id: 'vv4', topic: 'doppelter Selbstlaut', correct: 'Saal', wrong: 'Sal', note: 'Saal schreibt man mit aa.', difficulty: 1 },
  { id: 'vv5', topic: 'doppelter Selbstlaut', correct: 'Beere', wrong: 'Bere', note: 'Beere schreibt man mit ee.', difficulty: 1 },
  { id: 'vv6', topic: 'doppelter Selbstlaut', correct: 'Paar', wrong: 'Par', note: 'Paar schreibt man mit aa.', difficulty: 1 },
  { id: 'ig1', topic: '-ig oder -lich', correct: 'wichtig', wrong: 'wichtich', note: 'Wichtig endet auf -ig.', difficulty: 2 },
  { id: 'ig2', topic: '-ig oder -lich', correct: 'ehrlich', wrong: 'ehrlig', note: 'Ehrlich endet auf -lich.', difficulty: 2 },
  { id: 'ig3', topic: '-ig oder -lich', correct: 'möglich', wrong: 'möglig', note: 'Möglich endet auf -lich.', difficulty: 2 },
  { id: 'ig4', topic: '-ig oder -lich', correct: 'neugierig', wrong: 'neugierich', note: 'Neugierig endet auf -ig.', difficulty: 2 },
  { id: 'ig5', topic: '-ig oder -lich', correct: 'täglich', wrong: 'täglig', note: 'Täglich endet auf -lich.', difficulty: 2 },
  { id: 'ig6', topic: '-ig oder -lich', correct: 'freundlich', wrong: 'freundlig', note: 'Freundlich endet auf -lich.', difficulty: 2 },
  { id: 'gz1', topic: 'getrennt oder zusammen', correct: 'irgendwann', wrong: 'irgend wann', note: 'Irgendwann schreibt man zusammen.', difficulty: 2 },
  { id: 'gz2', topic: 'getrennt oder zusammen', correct: 'deshalb', wrong: 'des halb', note: 'Deshalb schreibt man zusammen.', difficulty: 2 },
  { id: 'gz3', topic: 'getrennt oder zusammen', correct: 'manchmal', wrong: 'manch mal', note: 'Manchmal schreibt man zusammen.', difficulty: 2 },
  { id: 'gz4', topic: 'getrennt oder zusammen', correct: 'jedenfalls', wrong: 'jeden falls', note: 'Jedenfalls schreibt man zusammen.', difficulty: 2 },
  { id: 'gz5', topic: 'getrennt oder zusammen', correct: 'stattdessen', wrong: 'statt dessen', note: 'Stattdessen schreibt man zusammen.', difficulty: 2 },
  { id: 'gz6', topic: 'getrennt oder zusammen', correct: 'zuerst', wrong: 'zu erst', note: 'Zuerst schreibt man zusammen.', difficulty: 2 },
  { id: 'ie1', topic: 'ie oder i', correct: 'Sieb', wrong: 'Sib', note: 'Sieb schreibt man mit ie.', difficulty: 2 },
  { id: 'ie2', topic: 'ie oder i', correct: 'Liebe', wrong: 'Libe', note: 'Liebe schreibt man mit ie.', difficulty: 2 },
  { id: 'ie3', topic: 'ie oder i', correct: 'spielen', wrong: 'spilen', note: 'Spielen schreibt man mit ie.', difficulty: 2 },
  { id: 'ie4', topic: 'ie oder i', correct: 'bieten', wrong: 'biten', note: 'Bieten schreibt man mit ie.', difficulty: 2 },
  { id: 'ie5', topic: 'ie oder i', correct: 'Fliege', wrong: 'Flige', note: 'Fliege schreibt man mit ie.', difficulty: 2 },
  { id: 'ie6', topic: 'ie oder i', correct: 'Ziel', wrong: 'Zil', note: 'Ziel schreibt man mit ie.', difficulty: 2 },
  { id: 'fw1', topic: 'häufig falsch', correct: 'auf jeden Fall', wrong: 'aufjedenfall', note: 'Auf jeden Fall schreibt man in drei Wörtern.', difficulty: 3 },
  { id: 'fw2', topic: 'häufig falsch', correct: 'im Voraus', wrong: 'im voraus', note: 'In im Voraus schreibt man Voraus groß.', difficulty: 3 },
  { id: 'fw3', topic: 'häufig falsch', correct: 'in Ordnung', wrong: 'in ordnung', note: 'In in Ordnung schreibt man Ordnung groß.', difficulty: 3 },
  { id: 'fw4', topic: 'häufig falsch', correct: 'vielleicht', wrong: 'vieleicht', note: 'Vielleicht schreibt man mit zwei l: vielleicht.', difficulty: 3 },
  { id: 'fw5', topic: 'häufig falsch', correct: 'nämlich', wrong: 'nähmlich', note: 'Nämlich schreibt man mit ä und ohne h: nämlich.', difficulty: 3 },
  { id: 'fw6', topic: 'häufig falsch', correct: 'interessant', wrong: 'interesant', note: 'Interessant schreibt man mit ss: interessant.', difficulty: 3 },
  { id: 'fw7', topic: 'häufig falsch', correct: 'Rhythmus', wrong: 'Rythmus', note: 'Rhythmus beginnt mit Rh. Rythmus ist nicht richtig.', difficulty: 3 },
]

export type SGroup = 'ss' | 'ß' | 's'

export const sWords: readonly { word: string; group: SGroup; note: string }[] = [
  { word: 'Fluss', group: 'ss', note: 'In Fluss ist der Vokal kurz. Deshalb steht ss.' },
  { word: 'müssen', group: 'ss', note: 'In müssen ist der Vokal kurz. Deshalb steht ss.' },
  { word: 'wissen', group: 'ss', note: 'In wissen ist der Vokal kurz. Deshalb steht ss.' },
  { word: 'Straße', group: 'ß', note: 'In Straße ist der Vokal lang. Deshalb steht ß.' },
  { word: 'heißen', group: 'ß', note: 'Heißen hat den Doppellaut ei. Deshalb steht ß.' },
  { word: 'groß', group: 'ß', note: 'In groß ist der Vokal lang. Deshalb steht ß.' },
  { word: 'Fuß', group: 'ß', note: 'In Fuß ist der Vokal lang. Deshalb steht ß.' },
  { word: 'Haus', group: 's', note: 'Haus prüft man durch Verlängern: Hauses. Dort bleibt ein s.' },
]

export interface ConfusedItem {
  id: string
  topic: string
  prompt: string
  options: [string, string]
  correct: string
  sentence: string
  note: string
}

export const confusedWords: readonly ConfusedItem[] = [
  { id: 'cw1', topic: 'das oder dass', prompt: 'Welches Wort passt an den Anfang?', options: ['Das', 'Dass'], correct: 'Das', sentence: 'Das Buch liegt auf dem Tisch.', note: 'Hier zeigt Das auf das Buch. Es ist kein Bindewort.' },
  { id: 'cw2', topic: 'das oder dass', prompt: 'Welches Wort passt in die Lücke?', options: ['das', 'dass'], correct: 'das', sentence: 'Das Buch, das ich lese, ist spannend.', note: 'Das bezieht sich auf das Buch. Dass würde einen Nebensatz einleiten.' },
  { id: 'cw3', topic: 'das oder dass', prompt: 'Welches Wort passt in die Lücke?', options: ['das', 'dass'], correct: 'dass', sentence: 'Ich weiß, dass du kommst.', note: 'Dass leitet hier den Nebensatz ein.' },
  { id: 'cw4', topic: 'seit oder seid', prompt: 'Welches Wort passt?', options: ['seit', 'seid'], correct: 'seit', sentence: 'Ich bin seit Montag hier.', note: 'Seit gibt hier einen Zeitpunkt an. Seid ist eine Form von sein.' },
  { id: 'cw5', topic: 'seit oder seid', prompt: 'Welches Wort passt?', options: ['seit', 'seid'], correct: 'seid', sentence: 'Ihr seid pünktlich.', note: 'Seid ist hier die Form von sein für ihr.' },
  { id: 'cw6', topic: 'wir oder wird', prompt: 'Welches Wort passt?', options: ['Wir', 'Wird'], correct: 'Wir', sentence: 'Wir gehen nach Hause.', note: 'Wir ist das Pronomen. Wird ist eine Form von werden.' },
  { id: 'cw7', topic: 'wir oder wird', prompt: 'Welches Wort passt?', options: ['wir', 'wird'], correct: 'wird', sentence: 'Es wird bald dunkel.', note: 'Wird ist eine Form von werden.' },
  { id: 'cw8', topic: 'wieder oder wider', prompt: 'Welches Wort passt?', options: ['wieder', 'wider'], correct: 'wieder', sentence: 'Komm bald wieder.', note: 'Wieder bedeutet hier noch einmal oder zurück.' },
  { id: 'cw9', topic: 'wieder oder wider', prompt: 'Welcher Wortstamm steckt in widerspricht?', options: ['wieder', 'wider'], correct: 'wider', sentence: 'Er widerspricht mir.', note: 'In widerspricht steckt wider, nicht wieder.' },
  { id: 'cw10', topic: 'wahr oder war', prompt: 'Welches Wort passt?', options: ['wahr', 'war'], correct: 'wahr', sentence: 'Das ist wahr.', note: 'Wahr bedeutet richtig. War ist eine Form von sein.' },
  { id: 'cw11', topic: 'wahr oder war', prompt: 'Welches Wort passt?', options: ['wahr', 'war'], correct: 'war', sentence: 'Ich war gestern krank.', note: 'War ist das Präteritum von sein.' },
  { id: 'cw12', topic: 'ihm oder im', prompt: 'Welches Wort passt?', options: ['ihm', 'im'], correct: 'ihm', sentence: 'Ich helfe ihm.', note: 'Ihm ist das Pronomen. Im ist die Verbindung aus in dem.' },
  { id: 'cw13', topic: 'ihm oder im', prompt: 'Welches Wort passt?', options: ['ihm', 'im'], correct: 'im', sentence: 'Er spielt im Garten.', note: 'Im steht hier für in dem Garten.' },
]

export interface CommaSentence {
  id: string
  words: string[]
  slots: number[]
  solution: string
  note: string
  difficulty: 1 | 2 | 3
}

export const commaSentences: readonly CommaSentence[] = [
  { id: 'kom1', words: ['Ich', 'kaufe', 'Äpfel', 'Birnen', 'und', 'Bananen'], slots: [2], solution: 'Ich kaufe Äpfel, Birnen und Bananen.', note: 'In dieser Aufzählung steht das Komma nach Äpfel. Vor und steht hier kein Komma.', difficulty: 1 },
  { id: 'kom2', words: ['Mia', 'liest', 'weil', 'sie', 'morgen', 'einen', 'Test', 'schreibt'], slots: [1], solution: 'Mia liest, weil sie morgen einen Test schreibt.', note: 'Vor weil beginnt ein Nebensatz. Davor steht ein Komma.', difficulty: 2 },
  { id: 'kom3', words: ['Ben', 'bleibt', 'zu', 'Hause', 'weil', 'er', 'krank', 'ist'], slots: [3], solution: 'Ben bleibt zu Hause, weil er krank ist.', note: 'Vor weil steht das Komma.', difficulty: 2 },
  { id: 'kom4', words: ['Meine', 'Schwester', 'die', 'in', 'Berlin', 'wohnt', 'kommt', 'morgen'], slots: [1, 5], solution: 'Meine Schwester, die in Berlin wohnt, kommt morgen.', note: 'Der Einschub die in Berlin wohnt steht zwischen zwei Kommas.', difficulty: 3 },
  { id: 'kom5', words: ['Paul', 'kauft', 'Brot', 'Käse', 'Milch', 'und', 'Äpfel'], slots: [2, 3], solution: 'Paul kauft Brot, Käse, Milch und Äpfel.', note: 'Die Aufzählung trennt man mit Kommas. Vor und steht hier kein Komma.', difficulty: 2 },
  { id: 'kom6', words: ['Der', 'Hund', 'der', 'unter', 'dem', 'Tisch', 'schläft', 'gehört', 'Lena'], slots: [1, 6], solution: 'Der Hund, der unter dem Tisch schläft, gehört Lena.', note: 'Der Einschub der unter dem Tisch schläft steht zwischen zwei Kommas.', difficulty: 3 },
]

export const syllableItems = [
  { word: 'Kindergarten', parts: ['Kin', 'der', 'gar', 'ten'] },
  { word: 'Fenster', parts: ['Fen', 'ster'] },
  { word: 'Kasten', parts: ['Kas', 'ten'] },
  { word: 'Zucker', parts: ['Zu', 'cker'] },
  { word: 'Tasche', parts: ['Ta', 'sche'] },
] as const
