import { KEY_SOUND_PACKS } from "@/constant";
import { useSettingStore } from "@/store/settingStore";
import { previewKeySound } from "@/hooks/useKeySound";
import { SettingDropdown } from "@/features/typing/components/SettingDropdown";
import { TYPING_TEST_CONTENT } from "@/content/typing-test.content";

export const KeySoundSelector = () => {
  const { soundEnabled, selectedKeySound, setSelectedKeySound } =
    useSettingStore();

  const options = KEY_SOUND_PACKS.map((pack) => ({
    id: pack.id,
    name: pack.name,
    hint: pack.variant,
    color: pack.color,
  }));

  const handleSelect = (packId: string) => {
    setSelectedKeySound(packId as KeySoundName);
    //Let the user hear the pack right away
    if (soundEnabled) previewKeySound(packId as KeySoundName);
  };

  return (
    <SettingDropdown
      label={TYPING_TEST_CONTENT.keySound}
      options={options}
      selectedId={selectedKeySound}
      onSelect={handleSelect}
      disabled={!soundEnabled}
      width="w-60"
    />
  );
};
