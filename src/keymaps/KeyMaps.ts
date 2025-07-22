import { namkhoneMap, namkhoneRows } from "./NamkhoneKeyMap";
import { panglongMap, panglongRows } from "./PangLongKeyMap";
import { silMap, silRows } from "./SILKeyMap";
import { yunghkioMap, yunghkioRows } from "./YunghkioKeyMap";
import { englishMap, englishRows } from "./EnglishKeyMap";

export const KeyMaps = {
  english: {
    name: "English Keyboard",
    map: englishMap,
    rows: englishRows,
  },
  namkhone: {
    name: "ၼမ်ႉၶူင်း",
    map: namkhoneMap,
    rows: namkhoneRows,
  },
  panglong: {
    name: "ပၢင်လူင်",
    map: panglongMap,
    rows: panglongRows,
  },
  yunghkio: {
    name: "ယုင်းၶဵဝ်",
    map: yunghkioMap,
    rows: yunghkioRows,
  },
  sil: {
    name: "လၵ်းၸဵင်",
    map: silMap,
    rows: silRows,
  },
};

export type KeyMapName = keyof typeof KeyMaps;
