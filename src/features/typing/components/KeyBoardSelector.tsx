import { KeyMaps } from "@/keymaps/KeyMaps";
import { useSettingStore } from "@/store/settingStore";
import { SettingDropdown } from "@/features/typing/components/SettingDropdown";
import { TYPING_TEST_CONTENT } from "@/content/typing-test.content";

export const KeyBoardSelector = () => {
  const { selectedKeyMap, setSelectedKeyMap } = useSettingStore();

  const options = Object.entries(KeyMaps)
    .filter(([key]) => key !== "english")
    .map(([key, value]) => ({ id: key, name: value.name }));

  return (
    <SettingDropdown
      label={TYPING_TEST_CONTENT.keyBoard}
      options={options}
      selectedId={selectedKeyMap}
      onSelect={(keyMap) => setSelectedKeyMap(keyMap as KeyMapNames)}
      width="w-32"
    />
  );
};
