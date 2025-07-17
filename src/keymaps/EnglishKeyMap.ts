// English QWERTY Keymap
type KeyMap = Record<string, string>;

// Row 1 (Numbers and symbols)
const row1: KeyMap = {
  "`": "`",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "0": "0",
  "-": "-",
  "=": "=",
  Back: "Back",
};

const row1Shift: KeyMap = {
  "~": "~",
  "!": "!",
  "@": "@",
  "#": "#",
  $: "$",
  "%": "%",
  "^": "^",
  "&": "&",
  "*": "*",
  "(": "(",
  ")": ")",
  _: "_",
  "+": "+",
  Back: "Back",
};

// Row 2 (QWERTY)
const row2: KeyMap = {
  Tab: "Tab",
  q: "q",
  w: "w",
  e: "e",
  r: "r",
  t: "t",
  y: "y",
  u: "u",
  i: "i",
  o: "o",
  p: "p",
  "[": "[",
  "]": "]",
  "\\": "\\",
};

const row2Shift: KeyMap = {
  Tab: "Tab",
  Q: "Q",
  W: "W",
  E: "E",
  R: "R",
  T: "T",
  Y: "Y",
  U: "U",
  I: "I",
  O: "O",
  P: "P",
  "{": "{",
  "}": "}",
  "|": "|",
};

// Row 3 (ASDF)
const row3: KeyMap = {
  Caps: "Caps",
  a: "a",
  s: "s",
  d: "d",
  f: "f",
  g: "g",
  h: "h",
  j: "j",
  k: "k",
  l: "l",
  ";": ";",
  "'": "'",
  Enter: "Enter",
};

const row3Shift: KeyMap = {
  Caps: "Caps",
  A: "A",
  S: "S",
  D: "D",
  F: "F",
  G: "G",
  H: "H",
  J: "J",
  K: "K",
  L: "L",
  ":": ":",
  '"': '"',
  Enter: "Enter",
};

// Row 4 (ZXCV)
const row4: KeyMap = {
  Shift1: "Shift",
  z: "z",
  x: "x",
  c: "c",
  v: "v",
  b: "b",
  n: "n",
  m: "m",
  ",": ",",
  ".": ".",
  "/": "/",
  Shift2: "Shift",
};

const row4Shift: KeyMap = {
  Shift1: "Shift",
  Z: "Z",
  X: "X",
  C: "C",
  V: "V",
  B: "B",
  N: "N",
  M: "M",
  "<": "<",
  ">": ">",
  "?": "?",
  Shift2: "Shift",
};

// Row 5 (Modifiers)
const row5: KeyMap = {
  Ctrl1: "Ctrl",
  Win1: "Win",
  Alt1: "Alt",
  Space: "Space",
  Alt2: "Alt",
  Win2: "Win",
  Menu: "Menu",
  Ctrl2: "Ctrl",
};

const row5Shift: KeyMap = { ...row5 };

// Exported lists
export const englishRows: KeyMap[] = [
  row1,
  row1Shift,
  row2,
  row2Shift,
  row3,
  row3Shift,
  row4,
  row4Shift,
  row5,
  row5Shift,
];

export const englishMap: KeyMap = Object.assign({}, ...englishRows);
