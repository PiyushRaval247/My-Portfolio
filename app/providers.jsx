"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "../components/ui/toaster";
import { LoadingProvider } from "../context/LoadingContext";

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      disableTransitionOnChange
    >
      <LoadingProvider>
        {children}
        <Toaster />
      </LoadingProvider>
    </ThemeProvider>
  );
}
