import { Keyboard, EyeOff } from "lucide-react";
import { TooltipHover } from "@/components/TooltipHover";
import { TYPING_TEST_CONTENT } from "@/content/typing-test.content";

interface TypingToggleButtonsProps {
  isKeyboardVisible: boolean;
  setIsKeyboardVisible: (visible: boolean) => void;
}

export const TypingToggleButtons = ({
  isKeyboardVisible,
  setIsKeyboardVisible,
}: TypingToggleButtonsProps) => {
  return (
    <div className="flex gap-3">
      {/* Keyboard Toggle Button */}
      <TooltipHover
        tooltipText={
          isKeyboardVisible
            ? TYPING_TEST_CONTENT.hideKeyboard
            : TYPING_TEST_CONTENT.showKeyboard
        }
      >
        <span
          onClick={() => setIsKeyboardVisible(!isKeyboardVisible)}
          className=" opacity-70 border border-foreground py-1 px-2 md:flex hidden rounded-lg hover:opacity-100 transition-opacity duration-200 cursor-pointer gap-2 justify-center items-center"
          title={
            isKeyboardVisible
              ? TYPING_TEST_CONTENT.hideKeyboard
              : TYPING_TEST_CONTENT.showKeyboard
          }
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
