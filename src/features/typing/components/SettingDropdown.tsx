import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface DropdownOption {
  id: string;
  name: string;
  //Shown after the name in a dimmed tone, e.g the keycap type of a sound pack
  hint?: string;
  //Background class of the leading dot, omitted when the option has no color
  color?: string;
  width?: string;
}

interface SettingDropdownProps {
  label: string;
  options: DropdownOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  disabled?: boolean;
  width?: string;
}

export const SettingDropdown = ({
  label,
  options,
  selectedId,
  onSelect,
  disabled,
  width,
}: SettingDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedOption =
    options.find((option) => option.id === selectedId) ?? options[0];

  //Close the dropdown on an outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (optionId: string) => {
    onSelect(optionId);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative flex items-center">
      <button
        type="button"
        title={label}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between gap-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-md py-1 px-3 cursor-pointer opacity-70 hover:opacity-100 hover:border-yellow transition-all duration-200",
          isOpen && "opacity-100 border-yellow",
          disabled && "opacity-40",
          width,
        )}
      >
        {selectedOption.color && (
          <span
            className={cn(
              "size-2.5 rounded-full shrink-0",
              selectedOption.color,
            )}
          />
        )}
        <span className="text-base whitespace-nowrap">
          {selectedOption.name}
          {selectedOption.hint && (
            <span className="text-primary/50">{` · ${selectedOption.hint}`}</span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180 text-yellow",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-max min-w-full max-h-80 overflow-y-auto flex flex-col gap-1 bg-background/80 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-3xl p-2 z-50"
          >
            <p className="px-3 py-1 text-xs text-primary/50">{label}</p>
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option.id)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-full px-3 py-2 text-sm cursor-pointer hover:bg-foreground/60 transition-colors duration-200",
                  selectedId === option.id && "bg-foreground/60 text-yellow",
                )}
              >
                {option.color && (
                  <span
                    className={cn(
                      "size-2.5 rounded-full shrink-0",
                      option.color,
                    )}
                  />
                )}
                <span className="whitespace-nowrap">
                  {option.name}
                  {option.hint && (
                    <span
                      className={cn(
                        "text-primary/50",
                        selectedId === option.id && "text-yellow/70",
                      )}
                    >{` · ${option.hint}`}</span>
                  )}
                </span>
                {selectedId === option.id && (
                  <Check className="size-4 ml-auto shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
