import { BlogNavbar } from "@/components/BlogNavbar";
import { BlogFooter } from "@/components/BlogFooter";
import ScrollToTop from "@/components/ScrollToTop";

export default function MagazineLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#008060]/10 font-sans antialiased selection:text-[#008060]">
      {/* Magazine Background: Professional Light Theme */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(0,0,0,0.01),transparent)] pointer-events-none" />
      
      {/* Editorial Design System (Swiss Grid Architecture) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
        .serif-font { font-family: 'Lora', serif; }
        
        /* Modern Architectural Code Styling */
        .prose pre { 
          background: #f8f8f8 !important; 
          border: 1px solid rgba(0,0,0,0.08) !important; 
          border-radius: 0 !important; 
          padding: 2.5rem !important;
          box-shadow: none !important;
        }
        .prose code { 
          color: #008060 !important; 
          background: rgba(0,128,96,0.05) !important; 
          padding: 0.2em 0.5em !important;
          border-radius: 0 !important;
          font-weight: 700 !important;
        }
        .prose pre code {
          background: transparent !important;
          padding: 0 !important;
          color: #222 !important;
          font-weight: 400 !important;
        }
        
        /* High-Density Layout Overrides */
        .magazine-body h2 { margin-top: 4rem !important; margin-bottom: 2rem !important; }
        .magazine-body p { margin-bottom: 2.5rem !important; }
      `}} />

      <BlogNavbar />
      <main className="relative z-10">
        {children}
      </main>
      <ScrollToTop />
      <BlogFooter />
    </div>
  );
}
