"use client";

import { Navbar } from "@/components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { Footer } from "@/components/Footer";
import { useLoading } from "@/context/LoadingContext";

export default function PortfolioLayout({ children }) {
  const { isWelcomeComplete } = useLoading();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative">
      <StarBackground />
      {isWelcomeComplete && <Navbar />}
      <main className="relative z-10">
        {children}
      </main>
      {isWelcomeComplete && <Footer />}
    </div>
  );
}
