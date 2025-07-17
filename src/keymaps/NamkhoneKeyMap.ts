//Namkhone Keymap
const row1: KeyMap = {
  "`": "?",
  "1": "႑",
  "2": "႒",
  "3": "႓",
  "4": "႔",
  "5": "႕",
  "6": "႖",
  "7": "႗",
  "8": "႘",
  "9": "႙",
  "0": "႐",
  "-": "-",
  "=": "=",
  Back: "Back",
};

const row1Shift: KeyMap = {
  "~": "!",
  "!": "ꧡ",
  "@": "ꧢ",
  "#": "ꩦ",
  $: "ꩧ",
  "%": "ꩨ",
  "^": "ꩩ",
  "&": "ိံ",
  "*": "*",
  "(": "(",
  ")": ")",
  _: "_",
  "+": "+",
  Back: "Back",
};

// Row 2
const row2: KeyMap = {
  Tab: "Tab",
  q: "ၸ",
  w: "တ",
  e: "ၼ",
  r: "မ",
  t: "ဢ",
  y: "ပ",
  u: "ၵ",
  i: "င",
  o: "ဝ",
  p: "ႁ",
  "[": "ႂ်",
  "]": "'",
  "\\": "/",
};

const row2Shift: KeyMap = {
  Tab: "Tab",
  Q: "ꩡ",
  W: "ၻ",
  E: "ꧣ",
  R: "ျွ",
  T: "ြႃ",
  Y: "ၿ",
  U: "ၷ",
  I: "ရ",
  O: "သ",
  P: "ႁႂ်",
  "{": "x",
  "}": '"',
  "|": "%",
};

// Row 3
const row3: KeyMap = {
  Caps: "Caps",
  a: "ေ",
  s: "ႄ",
  d: "ိ",
  f: "်",
  g: "ွ",
  h: "ႆ",
  j: "ႃ",
  k: "ု",
  l: "ူ",
  ";": "ႈ",
  "'": "ၾ",
  Enter: "Enter",
};

const row3Shift: KeyMap = {
  Caps: "Caps",
  A: "ဵ",
  S: "ႅ",
  D: "ီ",
  F: "ြ",
  G: "ႂ",
  H: "ၢႆ",
  J: "ေႃ",
  K: "ို",
  L: "ိူ",
  ":": "း",
  '"': "ꧦ",
  Enter: "Enter",
};

// Row 4
const row4: KeyMap = {
  Shift1: "Shift",
  z: "ၽ",
  x: "ထ",
  c: "ၶ",
  v: "လ",
  b: "ယ",
  n: "ၺ",
  m: "ၢ",
  ",": "ႇ",
  ".": "ႉ",
  "/": "။",
  Shift2: "Shift",
};

const row4Shift: KeyMap = {
  Shift1: "Shift",
  Z: "ꧤ",
  X: "ꩪ",
  C: "ꧠ",
  V: "ꩮ",
  B: "ျ",
  N: "ႁူ",
  M: "ႁွ",
  "<": "ႊ",
  ">": "ံ",
  "?": "၊",
  Shift2: "Shift",
};

// Row 5 (modifiers)
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

export const namkhoneRows: KeyMap[] = [
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

export const namkhoneMap: KeyMap = Object.assign({}, ...namkhoneRows);
