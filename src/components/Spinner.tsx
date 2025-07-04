import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

interface SpinnerProps {
  size?: number;
  color?: string;
}

export const Spinner = ({ size = 1, color = "yellow" }: SpinnerProps) => {
  return (
    <LoaderCircle
      className={cn("animate-spin", `size-${size}`, `text-${color}`)}
    />
  );
};
