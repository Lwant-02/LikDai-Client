import { RotateCcw, Keyboard, EyeOff } from "lucide-react";
import { TooltipHover } from "./TooltipHover";

interface TypingToggleButtonsProps {
  handleRestartTest: () => void;
  isKeyboardVisible: boolean;
  setIsKeyboardVisible: (visible: boolean) => void;
}

export const TypingToggleButtons = ({
  handleRestartTest,
  isKeyboardVisible,
  setIsKeyboardVisible,
}: TypingToggleButtonsProps) => {
  return (
    <div className="flex gap-3">
      <TooltipHover tooltipText="Restart Test">
        <span
          onClick={handleRestartTest}
          title="Restart Test"
          className=" opacity-70 border border-foreground py-1 px-2 rounded-lg hover:opacity-100 transition-opacity duration-200 cursor-pointer flex gap-2 justify-center items-center"
        >
          <RotateCcw className="size-5 " />
        </span>
      </TooltipHover>

      {/* Keyboard Toggle Button */}
      <TooltipHover
        tooltipText={isKeyboardVisible ? "Hide Keyboard" : "Show Keyboard"}
      >
        <span
          onClick={() => setIsKeyboardVisible(!isKeyboardVisible)}
          className=" opacity-70 border border-foreground py-1 px-2 md:flex hidden rounded-lg hover:opacity-100 transition-opacity duration-200 cursor-pointer gap-2 justify-center items-center"
          title={isKeyboardVisible ? "Hide Keyboard" : "Show Keyboard"}
        >
          {isKeyboardVisible ? (
            <EyeOff className="size-5" />
          ) : (
            <Keyboard className="size-5" />
          )}
        </span>
      </TooltipHover>
    </div>
  );
};
