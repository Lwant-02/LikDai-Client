import React, { useState } from "react";
import { settingStore } from "@/store/settingStore";
import { KeyMaps } from "@/keymaps/KeyMaps";
import { cn } from "@/lib/utils";

interface KeyProps {
  physicalKey: string;
  shanChar: string;
  isSpecial?: boolean;
  width?: "normal" | "wide" | "extra-wide" | "space";
  isCurrent?: boolean;
}

interface KeyboardLayoutProps {
  currentChar?: string;
}

const Key: React.FC<KeyProps> = ({
  physicalKey,
  shanChar,
  isSpecial = false,
  width = "normal",
  isCurrent = false,
}) => {
  const { mode } = settingStore();
  const getKeyWidth = () => {
    switch (width) {
      case "wide":
        return "w-16";
      case "extra-wide":
        return "w-20";
      case "space":
        return "w-64";
      default:
        return "w-12";
    }
  };

  const getKeyContent = () => {
    if (isSpecial) {
      return (
        <span className="text-xs text-gray-600 dark:text-gray-400">
          {physicalKey}
        </span>
      );
    }

    // For English mode, show only the character since physical key = character
    if (mode === "eng") {
      return (
        <span className="text-lg text-gray-800 dark:text-gray-200">
          {shanChar}
        </span>
      );
    }

    // For Shan mode, show both physical key and Shan character
    return (
      <div className="flex flex-col items-center justify-center">
        <span className="text-xs text-gray-500 dark:text-gray-500 leading-none">
          {physicalKey}
        </span>
        <span className="text-lg font-secondary text-gray-800 dark:text-gray-200 leading-none mt-0.5">
          {shanChar}
        </span>
      </div>
    );
  };

  // Get background color based on state
  const getBackgroundColor = () => {
    if (isCurrent) {
      return "bg-yellow text-black border-yellow"; // Current character - yellow like in photo
    }
    return "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"; // Default
  };

  return (
    <div
      className={cn(
        "h-12 rounded-md border flex items-center justify-center cursor-default transition-all duration-200",
        getKeyWidth(),
        getBackgroundColor()
      )}
    >
      {getKeyContent()}
    </div>
  );
};

export const KeyboardLayout = ({ currentChar }: KeyboardLayoutProps) => {
  const { selectedKeyMap, mode } = settingStore();
  const [isShiftPressed] = useState(false); // For now, always show normal keys

  // Use English keyboard when in English mode, otherwise use selected Shan keyboard
  const currentKeyMap = mode === "eng" ? "english" : selectedKeyMap;
  const keyMap = KeyMaps[currentKeyMap];
  const rows = keyMap.rows;

  // Function to find which physical key produces a given character
  const findPhysicalKeyForChar = (char: string): string | null => {
    if (!char) return null;

    // Handle space character for both modes
    if (char === " ") {
      return "space"; // Return "space" to match the Space key
    }

    // For English mode, the character is the key itself
    if (mode === "eng") {
      const result = char.toLowerCase();
      return result;
    }

    // For Shan mode, find the key that maps to this character
    for (const [physicalKey, mappedChar] of Object.entries(keyMap.map)) {
      if (mappedChar === char) {
        return physicalKey.toLowerCase();
      }
    }
    return null;
  };

  const currentPhysicalKey = findPhysicalKeyForChar(currentChar || "");

  // Get the appropriate row based on shift state
  const getRowData = (rowIndex: number) => {
    const baseRowIndex = Math.floor(rowIndex / 2) * 2;
    return isShiftPressed ? rows[baseRowIndex + 1] : rows[baseRowIndex];
  };

  const renderRow1 = () => {
    const row = getRowData(0);
    const keys = [
      "`",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
    ];

    return (
      <div className="flex gap-1 justify-center">
        {keys.map((key) => (
          <Key
            key={key}
            physicalKey={key}
            shanChar={row[key] || key}
            isCurrent={currentPhysicalKey === key.toLowerCase()}
          />
        ))}
        <Key physicalKey="⌫" shanChar="" isSpecial={true} width="wide" />
      </div>
    );
  };

  const renderRow2 = () => {
    const row = getRowData(2);
    const keys = [
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "[",
      "]",
      "\\",
    ];

    return (
      <div className="flex gap-1 justify-center">
        <Key physicalKey="Tab" shanChar="" isSpecial={true} width="wide" />
        {keys.map((key) => (
          <Key
            key={key}
            physicalKey={isShiftPressed ? key.toUpperCase() : key}
            shanChar={row[isShiftPressed ? key.toUpperCase() : key] || key}
            isCurrent={currentPhysicalKey === key.toLowerCase()}
          />
        ))}
      </div>
    );
  };

  const renderRow3 = () => {
    const row = getRowData(4);
    const keys = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"];

    return (
      <div className="flex gap-1 justify-center">
        <Key
          physicalKey="Caps"
          shanChar=""
          isSpecial={true}
          width="extra-wide"
        />
        {keys.map((key) => {
          const isCurrent = currentPhysicalKey === key.toLowerCase();
          return (
            <Key
              key={key}
              physicalKey={isShiftPressed ? key.toUpperCase() : key}
              shanChar={row[isShiftPressed ? key.toUpperCase() : key] || key}
              isCurrent={isCurrent}
            />
          );
        })}
        <Key
          physicalKey="Enter"
          shanChar=""
          isSpecial={true}
          width="extra-wide"
        />
      </div>
    );
  };

  const renderRow4 = () => {
    const row = getRowData(6);
    const keys = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];

    return (
      <div className="flex gap-1 justify-center">
        <Key
          physicalKey="Shift"
          shanChar=""
          isSpecial={true}
          width="extra-wide"
        />
        {keys.map((key) => (
          <Key
            key={key}
            physicalKey={isShiftPressed ? key.toUpperCase() : key}
            shanChar={row[isShiftPressed ? key.toUpperCase() : key] || key}
            isCurrent={currentPhysicalKey === key.toLowerCase()}
          />
        ))}
        <Key
          physicalKey="Shift"
          shanChar=""
          isSpecial={true}
          width="extra-wide"
        />
      </div>
    );
  };

  const renderRow5 = () => {
    return (
      <div className="flex gap-1 justify-center">
        <Key physicalKey="Ctrl" shanChar="" isSpecial={true} width="wide" />
        <Key physicalKey="Win" shanChar="" isSpecial={true} width="wide" />
        <Key physicalKey="Alt" shanChar="" isSpecial={true} width="wide" />
        <Key
          physicalKey={mode === "eng" ? "Space" : "လွၵ်းမိုဝ်းတႆး"}
          shanChar=""
          isSpecial={true}
          width="space"
          isCurrent={currentPhysicalKey === "space"}
        />
        <Key physicalKey="Alt" shanChar="" isSpecial={true} width="wide" />
        <Key physicalKey="Win" shanChar="" isSpecial={true} width="wide" />
        <Key physicalKey="Ctrl" shanChar="" isSpecial={true} width="wide" />
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="space-y-2">
        {renderRow1()}
        {renderRow2()}
        {renderRow3()}
        {renderRow4()}
        {renderRow5()}
      </div>
    </div>
  );
};
