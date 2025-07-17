// Panglong Keymap
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
  _: "/",
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
  t: "ႄ",
  y: "ပ",
  u: "ၵ",
  i: "င",
  o: "သ",
  p: "ၺ",
  "[": "ႁ",
  "]": '"',
  "\\": "ရ",
};

const row2Shift: KeyMap = {
  Tab: "Tab",
  Q: "ၹ",
  W: "ၻ",
  E: "",
  R: "",
  T: "",
  Y: "ြ",
  U: "",
  I: "",
  O: "ဝ",
  P: "[",
  "{": "]",
  "}": '"',
  "|": "႟",
};

// Row 3
const row3: KeyMap = {
  Caps: "Caps",
  a: "ေ",
  s: "ျ",
  d: "ိ",
  f: "်",
  g: "ႂ",
  h: "ႉ",
  j: "ႈ",
  k: "ု",
  l: "ူ",
  ";": "း",
  "'": "ႊ",
  Enter: "Enter",
};

const row3Shift: KeyMap = {
  Caps: "Caps",
  A: "ဵ",
  S: "",
  D: "ီ",
  F: "ႅ",
  G: "…",
  H: "ံ",
  J: "",
  K: "",
  L: "",
  ":": "",
  '"': "႞",
  Enter: "Enter",
};

// Row 4
const row4: KeyMap = {
  Shift1: "Shift",
  z: "ၽ",
  x: "ထ",
  c: "ၶ",
  v: "လ",
  b: "ႇ",
  n: "ဢ",
  m: "ၢ",
  ",": "ယ",
  ".": "ွ",
  "/": "။",
  Shift2: "Shift",
};

const row4Shift: KeyMap = {
  Shift1: "Shift",
  Z: "ၾ",
  X: "ႀ",
  C: "ၷ",
  V: "ၿ",
  B: "ႆ",
  N: "",
  M: "ႃ",
  "<": "",
  ">": "?",
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

// Full layout
export const panglongRows: KeyMap[] = [
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

export const panglongMap: KeyMap = Object.assign({}, ...panglongRows);
