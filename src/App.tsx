import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";

import { AboutPage } from "@/pages/AboutPage";
import { HomePage } from "@/pages/HomePage";
import { LeaderboardPage } from "@/pages/LeaderboardPage";
import { LoginPage } from "@/pages/LoginPage";
import { AccountPage } from "@/pages/AccountPage";
import { TypingtestPage } from "@/pages/TypingtestPage";
import { Navbar } from "./components/layout/Navbar";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
import { VerifyOtpPage } from "./pages/VerifyOtpPage";
import { ResultPage } from "./pages/ResultPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Footer } from "./components/layout/Footer";
import { NotFoundPage } from "./pages/NotFoundPage";
import { authStore } from "./store/authStore";
import { CertificatePage } from "./pages/CertificatePage";
import { LessonsPage } from "./pages/LessonsPage";
import { useEffect } from "react";
import { settingStore } from "./store/settingStore";

export default function App() {
  const { accessToken } = authStore();

  //Put this global and store it in settingStore so AboutPage.tsx install button can fire immediately
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      settingStore
        .getState()
        .setInstallPromptEvent(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden mx-auto max-w-7xl xl:px-0 px-2 relative">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              !accessToken ? (
                <LoginPage />
              ) : (
                <Navigate to="/account" replace={true} />
              )
            }
          />
          <Route
            path="/account"
            element={
              accessToken ? (
                <AccountPage />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route path="/typing-test" element={<TypingtestPage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/results" element={<ResultPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <Footer />
      <Toaster
        toastOptions={{
          duration: 5000,
          style: {
            fontSize: "14px",
            backgroundColor: "#3674b5 ",
            border: "none",
            color: "#F5F5F5",
            borderRadius: "8px",
          },
        }}
        position="top-right"
      />
    </main>
  );
}
