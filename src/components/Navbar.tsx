import { Link, useLocation } from "react-router-dom";
import { Crown, Keyboard } from "lucide-react";
import { motion } from "framer-motion";

import {
  UserIcon,
  HomeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";
import { authStore } from "@/store/authStore";

const navLink = [
  {
    path: "/",
    icon: <HomeIcon />,
  },
  {
    path: "/typing-test",
    icon: <Keyboard className="size-5" />,
  },
  {
    path: "/leaderboards",
    icon: <Crown className="size-5 " />,
  },
  {
    path: "/about",
    icon: <InformationCircleIcon />,
  },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const { accessToken } = authStore();
  const isChangePasswordPage = pathname.endsWith("/change-password");
  const isHomePage = pathname.endsWith("/");
  const isNotFoundPage = pathname.endsWith("/404");

  if (isChangePasswordPage || isHomePage || isNotFoundPage) {
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
        <Link to="/" className="flex justify-center items-center ">
          <img
            src="/images/Logo.png"
            alt="Logo"
            className="size-16 object-cover"
          />
          <p className="text-2xl font-bold md:flex hidden">LikDai - Pro</p>
        </Link>
        <div className="flex justify-center items-center gap-5 md:mr-36 mr-5">
          {navLink.map((link) => (
            <Link
              to={link.path}
              key={link.path}
              className={cn(
                "size-5 opacity-50 hover:opacity-100 transition-opacity duration-200",
                pathname.endsWith(link.path) && "opacity-100"
              )}
            >
              {link.icon}
            </Link>
          ))}
        </div>
        {accessToken ? (
          <div className="flex justify-center items-center">
            <Link to="/account">
              <UserIcon
                className={cn(
                  "size-5 opacity-50 hover:opacity-100 transition-opacity duration-200",
                  pathname.endsWith("/account") && "opacity-100"
                )}
              />
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Link to="/login">
              <UserIcon
                className={cn(
                  "size-5 opacity-50 hover:opacity-100 transition-opacity duration-200",
                  pathname.endsWith("/login") && "opacity-100"
                )}
              />
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
};
