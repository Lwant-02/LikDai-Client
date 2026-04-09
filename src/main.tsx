import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { registerSW } from "virtual:pwa-register";

import "./index.css";
import "./lib/i18n.ts";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.ts";
import { AuthProvider } from "./components/layout/AuthProvider.tsx";
import { ThemeProvider } from "./components/layout/ThemeProvider.tsx";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload page to update?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("PWA ready for offline use");
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
