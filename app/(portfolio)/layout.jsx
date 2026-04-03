import { Navbar } from "@/components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { Footer } from "@/components/Footer";

export default function PortfolioLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative">
      <StarBackground />
      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
