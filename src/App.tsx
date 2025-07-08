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
import { Navbar } from "./components/Navbar";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
import { ResultPage } from "./pages/ResultPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Footer } from "./components/Footer";
import { NotFoundPage } from "./pages/NotFoundPage";
import { TestPage } from "./pages/TestPage";
import { authStore } from "./store/authStore";
import { CertificatePage } from "./pages/CertificatePage";

export default function App() {
  const { accessToken } = authStore();

  return (
    <main className="min-h-screen overflow-hidden mx-auto max-w-7xl md:px-0 px-2 relative">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              accessToken ? <Navigate to="/account" replace /> : <LoginPage />
            }
          />
          <Route path="/typing-test" element={<TypingtestPage />} />
          <Route
            path="/account"
            element={
              accessToken ? <AccountPage /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/results" element={<ResultPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/certificate/:username" element={<CertificatePage />} />
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
