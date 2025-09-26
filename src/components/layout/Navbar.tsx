import { Link, useLocation } from "react-router-dom";
import { Crown, Keyboard, Languages, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  UserIcon,
  HomeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";
import { authStore } from "@/store/authStore";
import { useGetProfile } from "@/hooks/useUser";
import { settingStore } from "@/store/settingStore";
import { TooltipHover } from "../TooltipHover";

export const Navbar = () => {
  const { pathname } = useLocation();
  const { i18n, t } = useTranslation();
  const { accessToken } = authStore();
  const { profile } = useGetProfile();
  const { theme, setTheme } = settingStore();
  const [language, setLanguage] = useState<TranslationMode>(() => {
    const saved = localStorage.getItem("language") as TranslationMode | null;
    return saved ?? "en";
  });
  const isChangePasswordPage = pathname.endsWith("/change-password");
  const isHomePage = pathname.endsWith("/");
  const isNotFoundPage = pathname.endsWith("/404");
  const isCertificatePage = pathname.includes("/certificate");
  const isVerifyOtpPage = pathname.includes("/verify-otp");

  const navLink = [
    {
      name: t("nav_bar.home"),
      path: "/",
      icon: <HomeIcon className="size-5" />,
    },
    {
      name: t("nav_bar.lessons"),
      path: "/lessons",
      icon: <Keyboard className="size-5" />,
    },
    {
      name: t("nav_bar.leaderboards"),
      path: "/leaderboards",
      icon: <Crown className="size-5 " />,
    },
    {
      name: t("nav_bar.about"),
      path: "/about",
      icon: <InformationCircleIcon className="size-5 " />,
    },
  ];

  useEffect(() => {
    if (language) {
      localStorage.setItem("language", language);
    }
  }, [language]);

  if (
    isChangePasswordPage ||
    isHomePage ||
    isNotFoundPage ||
    isCertificatePage ||
    isVerifyOtpPage
  ) {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-auto z-20 flex justify-center items-center py-3"
    >
      <div className="h-12 z-50 mx-auto w-full flex justify-between items-center ">
        <Link to="/" className="flex justify-center items-center gap-2">
          <img
            src="/images/Logo.png"
            alt="Logo"
            className="xl:size-12 size-10 object-cover xl:hidden flex"
          />
          <p className="text-2xl font-bold md:flex hidden">
            {t("home_page.title")}
          </p>
        </Link>
        <div className="flex justify-center items-center gap-5 mr-1">
          {navLink.map((link) => (
            <TooltipHover tooltipText={link.name} key={link.name}>
              <Link
                to={link.path}
                className={cn(
                  "size-5 opacity-50 hover:opacity-100 transition-opacity duration-200",
                  pathname.endsWith(link.path) && "opacity-100"
                )}
              >
                {link.icon}
              </Link>
            </TooltipHover>
          ))}
          <TooltipHover
            tooltipText={t(`nav_bar.language.${language === "en" ? 0 : 1}`)}
            className="flex justify-center"
          >
            <span
              onClick={() => {
                i18n.changeLanguage(language === "en" ? "shn" : "en");
                setLanguage(language === "en" ? "shn" : "en");
              }}
              className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-200"
            >
              <Languages className="size-5 " />
            </span>
          </TooltipHover>
          <TooltipHover
            tooltipText={t(`nav_bar.theme.${theme === "dark" ? 1 : 0}`)}
            className="flex justify-center"
          >
            <span
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
              className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-200"
            >
              {theme === "dark" ? (
                <Moon className="size-5 " />
              ) : (
                <Sun className="size-5 " />
              )}
            </span>
          </TooltipHover>
        </div>
        {accessToken ? (
          <TooltipHover tooltipText={profile?.username || t("nav_bar.account")}>
            <Link
              to="/account"
              className={cn(
                "opacity-50 hover:opacity-100 transition-opacity duration-200 flex justify-center gap-1",
                pathname.endsWith("/account") && "opacity-100"
              )}
            >
              <UserIcon className="size-5" />
              <p className="hidden md:flex text-sm ">{profile?.username}</p>
            </Link>
          </TooltipHover>
        ) : (
          <TooltipHover tooltipText={t("nav_bar.login")}>
            <Link to="/login">
              <UserIcon
                className={cn(
                  "size-5 opacity-50 hover:opacity-100 transition-opacity duration-200",
                  pathname.endsWith("/login") && "opacity-100"
                )}
              />
            </Link>
          </TooltipHover>
        )}
      </div>
    </motion.nav>
  );
};
