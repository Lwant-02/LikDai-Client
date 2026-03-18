import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { authStore } from "@/store/authStore";
import { useGetProfile } from "@/hooks/useUser";
import { settingStore } from "@/store/settingStore";
import { MobileDrawer } from "@/components/MobileDrawer";

export const Navbar = () => {
  const { pathname } = useLocation();
  const { accessToken } = authStore();
  const { profile } = useGetProfile();
  const { theme, setTheme } = settingStore();
  const isChangePasswordPage = pathname.endsWith("/change-password");
  const isHomePage = pathname.endsWith("/");
  const isNotFoundPage = pathname.endsWith("/404");
  const isCertificatePage = pathname.includes("/certificate");
  const isVerifyOtpPage = pathname.includes("/verify-otp");
  const isTypingTestOrResultPage =
    pathname.includes("/typing-test") || pathname.includes("/result");

  const navLink = [
    {
      name: "ၼႃႈႁိူၼ်း",
      path: "/",
    },
    {
      name: "ၵၢၼ်ၽိုၵ်း",
      path: "/lessons",
    },
    {
      name: "ၽႅၼ်ႇၽူႈဢွၼ်ႁူဝ်",
      path: "/leaderboards",
    },
    {
      name: "လွင်ႈႁဝ်းၶႃႈ",
      path: "/about",
    },
    {
      name: "လၵ်းၼမ်း",
      path: "/policy",
    },
    {
      name: "ၽဵင်းၵႂၢမ်း",
      path: "/songs",
    },
  ];

  if (
    isChangePasswordPage ||
    isHomePage ||
    isNotFoundPage ||
    isCertificatePage ||
    isVerifyOtpPage ||
    isTypingTestOrResultPage
  ) {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-auto z-20 flex justify-center items-center py-3 sticky top-0 px-3 md:px-4 xl:px-0"
    >
      <div className="h-16 rounded-full px-5! z-50 bg-background border border-primary/20 backdrop-blur-sm shadow-sm layout w-full flex justify-between items-center">
        <Link to="/" className="flex justify-center items-center gap-2">
          <img
            src="/icons/favicon.svg"
            alt="Logo"
            className="size-10 object-cover flex"
          />
          <p className="xl:text-3xl text-2xl text-center font-bold xl:pt-2 pt-1">
            လိၵ်ႈတႆး
          </p>
        </Link>

        <div className="hidden xl:flex justify-center items-center gap-5 ">
          {navLink.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "opacity-50 hover:opacity-100 transition-opacity duration-200",
                pathname.endsWith(link.path) && "opacity-100",
              )}
            >
              {link.name}
            </Link>
          ))}

          <div
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
              "cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-200",
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

          {accessToken ? (
            <Link
              to="/account"
              className={cn(
                "opacity-50 hover:opacity-100 transition-opacity duration-200 flex justify-center",
                pathname.endsWith("/account") && "opacity-100",
              )}
            >
              <p className="hidden md:flex">{profile?.username}</p>
            </Link>
          ) : (
            <Link to="/login">
              <p
                className={cn(
                  "opacity-50 hover:opacity-100 transition-opacity duration-200",
                  pathname.endsWith("/login") && "opacity-100",
                )}
              >
                လွၵ်ႉဢိၼ်ႇ
              </p>
            </Link>
          )}
        </div>

        <MobileDrawer navLink={navLink} />
      </div>
    </motion.nav>
  );
};
