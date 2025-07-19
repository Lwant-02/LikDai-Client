import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface TooltipHoverProps {
  children: React.ReactNode;
  tooltipText: string;
  className?: string;
}

export const TooltipHover = ({
  children,
  tooltipText,
  className,
}: TooltipHoverProps) => {
  return (
    <Tooltip>
      <TooltipTrigger className={className}>{children}</TooltipTrigger>
      <TooltipContent className="text-orange bg-primary py-2 font-secondary font-semibold">
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  );
};
