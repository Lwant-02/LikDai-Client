import { useCallback, useEffect } from "react";

import { useSettingStore } from "@/store/settingStore";
import { getKeySoundCode } from "@/util/keySoundCode";

// "single" packs ship one sprite that every key is sliced out of, "multi" packs
// ship one file per key and name them inside their own config.
const SPRITE_FILE = "sound.ogg";
const KEY_SOUND_VOLUME = 0.4;

interface LoadedPack {
  config: KeySoundConfig;
  buffers: Map<string, AudioBuffer>;
}

let audioContext: AudioContext | null = null;
const packCache = new Map<KeySoundName, Promise<LoadedPack | null>>();

const getAudioContext = (): AudioContext | null => {
  if (audioContext) return audioContext;
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextClass) return null;
  audioContext = new AudioContextClass();
  return audioContext;
};

const fetchPack = async (packId: KeySoundName): Promise<LoadedPack | null> => {
  const context = getAudioContext();
  if (!context) return null;

  const response = await fetch(`/sounds/${packId}/config.json`);
  const config: KeySoundConfig = await response.json();

  const files =
    config.key_define_type === "multi"
      ? [
          ...new Set(
            Object.values(config.defines).filter(
              (define): define is string => typeof define === "string",
            ),
          ),
        ]
      : [SPRITE_FILE];

  const buffers = new Map<string, AudioBuffer>();
  await Promise.all(
    files.map(async (file) => {
      const audio = await fetch(`/sounds/${packId}/${file}`);
      buffers.set(
        file,
        await context.decodeAudioData(await audio.arrayBuffer()),
      );
    }),
  );

  return { config, buffers };
};

const loadPack = (packId: KeySoundName): Promise<LoadedPack | null> => {
  const cached = packCache.get(packId);
  if (cached) return cached;

  const pending = fetchPack(packId).catch((error) => {
    // Let the next keystroke retry instead of staying silent forever.
    packCache.delete(packId);
    console.log("Key sound pack failed to load:", error);
    return null;
  });
  packCache.set(packId, pending);
  return pending;
};

const playFromPack = (pack: LoadedPack, code?: string) => {
  const context = getAudioContext();
  if (!context) return;

  const defines = pack.config.defines;
  const define = defines[getKeySoundCode(code)] ?? Object.values(defines)[0];
  if (!define) return;

  const isSprite = typeof define !== "string";
  const buffer = pack.buffers.get(isSprite ? SPRITE_FILE : define);
  if (!buffer) return;

  const gain = context.createGain();
  gain.gain.value = KEY_SOUND_VOLUME;
  gain.connect(context.destination);

  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(gain);

  if (isSprite) {
    const [offset, duration] = define;
    source.start(0, offset / 1000, duration / 1000);
  } else {
    source.start(0);
  }
};

// Plays a sample of any pack, so the selector can preview a pack that is not
// the selected one yet.
export const previewKeySound = (packId: KeySoundName) => {
  const context = getAudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume();

  loadPack(packId).then((pack) => {
    if (!pack) return;
    playFromPack(pack, "KeyF");
  });
};

export const useKeySound = () => {
  const { soundEnabled, selectedKeySound } = useSettingStore();

  // Decode the selected pack ahead of the first keystroke so it does not lag.
  useEffect(() => {
    if (!soundEnabled) return;
    loadPack(selectedKeySound);
  }, [soundEnabled, selectedKeySound]);

  const playKeySound = useCallback(
    (code?: string) => {
      if (!soundEnabled) return;

      const context = getAudioContext();
      if (!context) return;
      // Browsers start the context suspended until a user gesture.
      if (context.state === "suspended") context.resume();

      loadPack(selectedKeySound).then((pack) => {
        if (!pack) return;
        playFromPack(pack, code);
      });
    },
    [soundEnabled, selectedKeySound],
  );

  return { playKeySound };
};
