import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LeaderboardPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export const LeaderboardPagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: LeaderboardPaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 mt-6">
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={cn(
          "p-1 sm:p-2 rounded-md cursor-pointer",
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-foreground/10"
        )}
      >
        <ChevronLeft className="size-4 sm:size-5" />
      </button>

      <div className="flex items-center gap-1 sm:gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          // On mobile, show limited page numbers
          if (window.innerWidth < 640) {
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "size-7 sm:size-8 rounded-md flex items-center justify-center text-xs sm:text-sm",
                    currentPage === page
                      ? "bg-blue/50 text-primary"
                      : "hover:bg-foreground/10"
                  )}
                >
                  {page}
                </button>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <span key={page} className="text-xs sm:text-sm opacity-50 px-1">
                  ...
                </span>
              );
            }
            return null;
          }

          // On desktop, show all page numbers
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={cn(
                "size-7 sm:size-8 rounded-md flex items-center justify-center text-xs sm:text-sm",
                currentPage === page
                  ? "bg-blue/50 text-primary"
                  : "hover:bg-foreground/10"
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={cn(
          "p-1 sm:p-2 rounded-md cursor-pointer",
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-foreground/10"
        )}
      >
        <ChevronRight className="size-4 sm:size-5 " />
      </button>
    </div>
  );
};
