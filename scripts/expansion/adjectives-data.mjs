/** @typedef {'regular' | 'umlaut' | 'el-er' | 'esten' | 'irregular'} AdjectivePattern */

/**
 * @param {string} id
 * @param {string} pos
 * @param {string} comp
 * @param {string} sup
 * @param {AdjectivePattern} pattern
 * @param {1|2|3} difficulty
 */
function adj(id, pos, comp, sup, pattern, difficulty) {
  return { id, positive: pos, comparative: comp, superlative: sup, pattern, difficulty }
}

export const adjectivesExtra = [
  adj('a26', 'hell', 'heller', 'am hellsten', 'regular', 1),
  adj('a27', 'dunkel', 'dunkler', 'am dunkelsten', 'el-er', 2),
  adj('a28', 'stark', 'stärker', 'am stärksten', 'umlaut', 2),
  adj('a29', 'schwach', 'schwächer', 'am schwächsten', 'umlaut', 2),
  adj('a30', 'sauer', 'saurer', 'am sauresten', 'esten', 2),
  adj('a31', 'süß', 'süßer', 'am süßesten', 'esten', 2),
  adj('a32', 'bitter', 'bitterer', 'am bittersten', 'regular', 1),
  adj('a33', 'ruhig', 'ruhiger', 'am ruhigsten', 'regular', 1),
  adj('a34', 'still', 'stiller', 'am stillsten', 'esten', 2),
  adj('a35', 'nah', 'näher', 'am nächsten', 'irregular', 3),
  adj('a36', 'fern', 'ferner', 'am fernsten', 'regular', 2),
  adj('a37', 'frisch', 'frischer', 'am frischesten', 'esten', 2),
  adj('a38', 'klar', 'klarer', 'am klarsten', 'regular', 1),
  adj('a39', 'falsch', 'falscher', 'am falschsten', 'regular', 1),
  adj('a40', 'echt', 'echter', 'am echtsten', 'esten', 2),
  adj('a41', 'weit', 'weiter', 'am weitesten', 'esten', 2),
  adj('a42', 'eng', 'enger', 'am engsten', 'regular', 1),
  adj('a43', 'dick', 'dicker', 'am dicksten', 'regular', 1),
  adj('a44', 'dünn', 'dünner', 'am dünnsten', 'umlaut', 2),
  adj('a45', 'hart', 'härter', 'am härtesten', 'umlaut', 2),
  adj('a46', 'weich', 'weicher', 'am weichsten', 'regular', 1),
  adj('a47', 'trocken', 'trockener', 'am trockensten', 'esten', 2),
  adj('a48', 'nass', 'nasser', 'am nassesten', 'esten', 2),
  adj('a49', 'sauber', 'sauberer', 'am saubersten', 'regular', 1),
  adj('a50', 'schmutzig', 'schmutziger', 'am schmutzigsten', 'regular', 1),
  adj('a51', 'freundlich', 'freundlicher', 'am freundlichsten', 'regular', 1),
  adj('a52', 'böse', 'böser', 'am bösesten', 'esten', 2),
  adj('a53', 'gemütlich', 'gemütlicher', 'am gemütlichsten', 'regular', 1),
  adj('a54', 'neu', 'neuer', 'am neuesten', 'regular', 1),
  adj('a55', 'laut', 'lauter', 'am lautesten', 'esten', 2),
  adj('a56', 'faul', 'fauler', 'am faulsten', 'regular', 1),
  adj('a57', 'fleißig', 'fleißiger', 'am fleißigsten', 'regular', 1),
  adj('a58', 'ernst', 'ernster', 'am ernstesten', 'esten', 2),
  adj('a59', 'leicht', 'leichter', 'am leichtesten', 'esten', 2),
  adj('a60', 'schwer', 'schwerer', 'am schwersten', 'regular', 1),
  adj('a61', 'gerade', 'gerader', 'am geradesten', 'esten', 2),
  adj('a62', 'krumm', 'krummer', 'am krummsten', 'regular', 1),
  adj('a63', 'rund', 'runder', 'am rundesten', 'esten', 2),
  adj('a64', 'spitz', 'spitzer', 'am spitzesten', 'esten', 2),
  adj('a65', 'stolz', 'stolzer', 'am stolzesten', 'esten', 2),
  adj('a66', 'ehrlich', 'ehrlicher', 'am ehrlichsten', 'regular', 1),
  adj('a67', 'furchtbar', 'furchtbarer', 'am furchtbarsten', 'regular', 2),
  adj('a68', 'hübsch', 'hübscher', 'am hübschesten', 'esten', 2),
  adj('a69', 'hässlich', 'hässlicher', 'am hässlichsten', 'regular', 2),
  adj('a70', 'bekannt', 'bekannter', 'am bekanntesten', 'esten', 2),
  adj('a71', 'berühmt', 'berühmter', 'am berühmtesten', 'esten', 2),
  adj('a72', 'arm', 'ärmer', 'am ärmsten', 'umlaut', 2),
  adj('a73', 'reich', 'reicher', 'am reichsten', 'regular', 2),
  adj('a74', 'dumm', 'dümmer', 'am dümmsten', 'umlaut', 2),
  adj('a75', 'klug', 'klüger', 'am klügsten', 'umlaut', 2),
]

export const comparisonSentencesExtra = [
  { id: 'vx01', sentence: 'Das Haus ist größer als das unsere.', connector: 'als', difficulty: 1 },
  { id: 'vx02', sentence: 'Tim ist so schnell wie sein Bruder.', connector: 'wie', difficulty: 1 },
  { id: 'vx03', sentence: 'Der Kuchen schmeckt süßer als erwartet.', connector: 'als', difficulty: 2 },
  { id: 'vx04', sentence: 'Mia ist genauso freundlich wie Eva.', connector: 'wie', difficulty: 1 },
  { id: 'vx05', sentence: 'Dieser Weg ist steiler als jener.', connector: 'als', difficulty: 2 },
  { id: 'vx06', sentence: 'Heute ist es wärmer als gestern.', connector: 'als', difficulty: 2 },
  { id: 'vx07', sentence: 'Das Buch ist interessanter als der Film.', connector: 'als', difficulty: 2 },
  { id: 'vx08', sentence: 'Paul läuft so schnell wie Jonas.', connector: 'wie', difficulty: 1 },
  { id: 'vx09', sentence: 'Der Tisch ist höher als der Stuhl.', connector: 'als', difficulty: 2 },
  { id: 'vx10', sentence: 'Sie ist nicht so klein wie ihre Schwester.', connector: 'wie', difficulty: 3 },
  { id: 'vx11', sentence: 'Das Wasser ist kälter als geplant.', connector: 'als', difficulty: 2 },
  { id: 'vx12', sentence: 'Ben ist ebenso fleißig wie Hannah.', connector: 'wie', difficulty: 2 },
  { id: 'vx13', sentence: 'Der Berg ist steiler als der Hügel.', connector: 'als', difficulty: 2 },
  { id: 'vx14', sentence: 'Lena singt so schön wie Lea.', connector: 'wie', difficulty: 1 },
  { id: 'vx15', sentence: 'Dieser Apfel ist saurer als jener.', connector: 'als', difficulty: 2 },
  { id: 'vx16', sentence: 'Das Gebäude ist älter als die Schule.', connector: 'als', difficulty: 2 },
  { id: 'vx17', sentence: 'Er ist genauso stark wie Felix.', connector: 'wie', difficulty: 1 },
  { id: 'vx18', sentence: 'Der Weg ist länger als gedacht.', connector: 'als', difficulty: 2 },
  { id: 'vx19', sentence: 'Das ist schwerer als es aussieht.', connector: 'als', difficulty: 2 },
  { id: 'vx20', sentence: 'Das Ziel ist ebensoweit wie der Start.', connector: 'wie', difficulty: 3 },
]

export const adjectiveErrorsExtra = [
  {
    id: 'xae1',
    faulty: 'Sie ist stärker wie ich.',
    correct: 'Sie ist stärker als ich.',
    error: 'wie',
    note: 'Beim Unterschied steht als, nicht wie.',
  },
  {
    id: 'xae2',
    faulty: 'Das ist der am größten Baum.',
    correct: 'Das ist der größte Baum.',
    error: 'am',
    note: 'Vor einem Nomen steht der Superlativ mit Endung: der größte Baum.',
  },
  {
    id: 'xae3',
    faulty: 'Er ist am schneller.',
    correct: 'Er ist schneller.',
    error: 'am',
    note: 'Komparativ steht ohne am: schneller.',
  },
  {
    id: 'xae4',
    faulty: 'Das Zimmer ist mehr sauberer.',
    correct: 'Das Zimmer ist sauberer.',
    error: 'mehr',
    note: 'Sauberer ist schon Komparativ. Mehr sauberer ist doppelt.',
  },
  {
    id: 'xae5',
    faulty: 'Er ist alt wie sein Vater.',
    correct: 'Er ist so alt wie sein Vater.',
    error: 'alt',
    note: 'Bei Gleichheit steht so … wie.',
  },
  {
    id: 'xae6',
    faulty: 'Sie ist am höchste.',
    correct: 'Sie ist am höchsten.',
    error: 'höchste',
    note: 'Nach am folgt die Form auf -en: am höchsten.',
  },
  {
    id: 'xae7',
    faulty: 'Das ist der frischste Brot.',
    correct: 'Das ist das frischeste Brot.',
    error: 'frischste',
    note: 'Brot ist Neutrum. Richtig: das frischeste Brot.',
  },
  {
    id: 'xae8',
    faulty: 'Er ist lieber als Kuchen.',
    correct: 'Er isst lieber Kuchen.',
    error: 'lieber',
    note: 'Lieber gehört zu gern. Lieber als ist hier falsch gebaut.',
  },
  {
    id: 'xae9',
    faulty: 'Das Kind ist am kleine.',
    correct: 'Das Kind ist am kleinsten.',
    error: 'kleine',
    note: 'Nach am steht der Superlativ auf -en.',
  },
  {
    id: 'xae10',
    faulty: 'Sie ist schöner wie ich.',
    correct: 'Sie ist schöner als ich.',
    error: 'wie',
    note: 'Beim Vergleich mit Unterschied steht als.',
  },
]