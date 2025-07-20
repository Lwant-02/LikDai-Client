import { Link, useLocation } from "react-router-dom";
import { Crown, Keyboard, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

import {
  UserIcon,
  HomeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";
import { authStore } from "@/store/authStore";
import { useGetProfile } from "@/hook/useUser";
import { settingStore } from "@/store/settingStore";
import { TooltipHover } from "./TooltipHover";

const navLink = [
  {
    name: "ၼႃႈႁိူၼ်း",
    path: "/",
    icon: <HomeIcon className="size-5" />,
  },
  {
    name: "တီႈၽိုၵ်းတႅမ်ႈ",
    path: "/typing-test",
    icon: <Keyboard className="size-5" />,
  },
  {
    name: "ၽႅၼ်ႇၽူႈဢွၼ်ႁူဝ်",
    path: "/leaderboards",
    icon: <Crown className="size-5 " />,
  },
  {
    name: "လွင်ႈႁဝ်းၶႃႈ",
    path: "/about",
    icon: <InformationCircleIcon className="size-5 " />,
  },
];

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
            src="/svg/Logo.svg"
            alt="Logo"
            className="size-12 object-cover"
          />
          <p className="text-2xl font-bold md:flex hidden">LikDai - Pro</p>
        </Link>
        <div className="flex justify-center items-center gap-5 md:mr-36 mr-5">
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
            tooltipText={theme === "dark" ? "ၵၢင်ၶမ်ႈ" : "ၵၢင်ဝၼ်း"}
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
          <TooltipHover tooltipText={profile?.username || "ႁဵင်းမၢႆသုၼ်ႇတူဝ်"}>
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
          <TooltipHover tooltipText="ၶဝ်ႈဝႅပ်ႉသၢႆႉ">
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
