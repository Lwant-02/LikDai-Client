import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect } from "react";

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
import { useAuthStore } from "./store/authStore";
import { CertificatePage } from "./pages/CertificatePage";
import { LessonsPage } from "./pages/LessonsPage";
import { useSettingStore } from "./store/settingStore";
import { PolicyPage } from "./pages/PolicyPage";
import { FeedbackDialog } from "./components/FeedbackDialog";
import { MusicPlayer } from "./components/MusicPlayer";
import { NormalTypingPage } from "./pages/NormalTypingPage";
import { ShanCharFloat } from "./components/ShanCharFloat";
import { WordFallingPage } from "./pages/WordFallingPage";
import { ShooterPage } from "./pages/ShooterPage";
import { RunningPage } from "./pages/RunningPage";

export default function App() {
  const { accessToken } = useAuthStore();

  //Put this global and store it in settingStore so AboutPage.tsx install button can fire immediately
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      useSettingStore
        .getState()
        .setInstallPromptEvent(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return (
    <main className="min-h-screen relative">
      <ShanCharFloat />
      <div className="z-10">
        <Router>
          <Navbar />
          <MusicPlayer />
          <FeedbackDialog />
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
            <Route path="/normal-typing" element={<NormalTypingPage />} />
            <Route path="/games/word-falling" element={<WordFallingPage />} />
            <Route path="/games/shooter" element={<ShooterPage />} />
            <Route path="/games/running" element={<RunningPage />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/leaderboards" element={<LeaderboardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
            <Route path="/results" element={<ResultPage />} />
            <Route path="/policy" element={<PolicyPage />} />
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
              borderRadius: "10px",
              fontFamily: "'GHKTachileik', sans-serif",
            },
          }}
          position="top-right"
        />
      </div>
    </main>
  );
}
