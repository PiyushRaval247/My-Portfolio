import { BlogNavbar } from "@/components/BlogNavbar";
import { BlogFooter } from "@/components/BlogFooter";
import ScrollToTop from "@/components/ScrollToTop";
import { Suspense } from "react";

export default function MagazineLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans antialiased selection:text-primary-foreground">
      {/* Magazine Background: Ambient Dark Theme */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(139,92,246,0.05),transparent)] pointer-events-none" />
      
      {/* Dynamic Design System Overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* High-Density Layout Overrides for Prose */
        .magazine-body h2 { margin-top: 4rem !important; margin-bottom: 2rem !important; color: hsl(var(--foreground)) !important; }
        .magazine-body h3 { margin-top: 3rem !important; margin-bottom: 1.5rem !important; color: hsl(var(--foreground)) !important; }
        .magazine-body p { margin-bottom: 2.5rem !important; color: hsl(var(--muted-foreground)) !important; }
        .magazine-body a { color: hsl(var(--primary)) !important; text-decoration: none !important; }
        .magazine-body a:hover { text-decoration: underline !important; }
        
        .prose pre { 
          background: hsl(var(--card)) !important; 
          border: 1px solid rgba(255,255,255,0.05) !important; 
          border-radius: 1rem !important; 
          padding: 2rem !important;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5) !important;
        }
        .prose code { 
          color: hsl(var(--primary)) !important; 
          background: rgba(139,92,246,0.1) !important; 
          padding: 0.2em 0.5em !important;
          border-radius: 0.5rem !important;
          font-weight: 700 !important;
        }
        .prose pre code {
          background: transparent !important;
          padding: 0 !important;
          color: hsl(var(--foreground)) !important;
          font-weight: 400 !important;
        }
      `}} />

      {/* Suspense is required for BlogNavbar as it uses useSearchParams() */}
      <Suspense fallback={<div className="h-20 bg-background/80 border-b border-white/5" />}>
        <BlogNavbar />
      </Suspense>
      
      <main className="relative z-10">
        {children}
      </main>
      <ScrollToTop />
      <BlogFooter />
    </div>
  );
}
