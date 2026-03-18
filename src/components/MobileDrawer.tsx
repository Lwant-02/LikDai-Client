import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Text } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { authStore } from "@/store/authStore";
import { useGetProfile } from "@/hooks/useUser";
import { settingStore } from "@/store/settingStore";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileDrawerProps {
  navLink: { name: string; path: string }[];
}

export function MobileDrawer({ navLink }: MobileDrawerProps) {
  const { pathname } = useLocation();
  const { accessToken } = authStore();
  const { profile } = useGetProfile();
  const { theme, setTheme } = settingStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Text className="size-6 xl:hidden flex cursor-pointer" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] border-l border-primary/10"
      >
        <SheetHeader className="py-6 border-b border-primary/10 text-left">
          <SheetTitle asChild>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 w-fit"
            >
              <img
                src="/icons/favicon.svg"
                alt="Logo"
                className="size-8 object-cover flex"
              />
              <p className="text-xl font-bold text-primary">လိၵ်ႈတႆး</p>
            </Link>
          </SheetTitle>
          <SheetDescription className="sr-only">Mobile drawer</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-5">
          <div className="flex flex-col gap-4">
            {navLink.map((link) => (
              <SheetClose asChild key={link.name}>
                <Link
                  to={link.path}
                  className={cn(
                    "text-lg opacity-60 hover:opacity-100 transition-opacity duration-200",
                    pathname.endsWith(link.path) && "opacity-100 font-bold",
                  )}
                >
                  {link.name}
                </Link>
              </SheetClose>
            ))}
          </div>

          <div className="h-px bg-primary/10 w-full" />

          <div className="flex items-center justify-between">
            <span className="text-lg opacity-60 font-medium">ပိၼ်ႇသီ</span>
            <div
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(
                "cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-200 p-2 rounded-full border border-primary/20",
                theme === "dark" && "scale-100",
              )}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme === "dark" ? "dark" : "light"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? (
                    <Sun className="size-5" />
                  ) : (
                    <Moon className="size-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="h-px bg-primary/10 w-full" />

          {accessToken ? (
            <SheetClose asChild>
              <Link
                to="/account"
                className={cn(
                  "text-lg opacity-60 hover:opacity-100 transition-opacity duration-200 bg-primary/10 py-3 rounded-xl flex justify-center",
                  pathname.endsWith("/account") && "opacity-100 font-bold",
                )}
              >
                {profile?.username}
              </Link>
            </SheetClose>
          ) : (
            <SheetClose asChild>
              <Link to="/login" className="w-full">
                <p className="text-lg text-center font-bold bg-primary text-background py-2 rounded-xl transition-all hover:scale-[1.02]">
                  လွၵ်ႉဢိၼ်ႇ
                </p>
              </Link>
            </SheetClose>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
