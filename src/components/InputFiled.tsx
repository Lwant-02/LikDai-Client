import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputFiledProps {
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  helperText: string;
  disabled?: boolean;
  containerWidth?: string;
}

export const InputFiled = ({
  type,
  id,
  value,
  onChange,
  placeholder,
  label,
  helperText,
  disabled,
  containerWidth,
}: InputFiledProps) => {
  return (
    <div
      className={cn(
        "grid w-full items-center gap-2",
        containerWidth ? containerWidth : "max-w-sm",
      )}
    >
      <Label htmlFor={id}>{label}</Label>
      <Input
        type={type}
        id={id}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-foreground border-none focus:ring-1! ring-primary/30 h-10 rounded-full px-5"
      />
      <p className="text-xs opacity-70">{helperText}</p>
    </div>
  );
};
