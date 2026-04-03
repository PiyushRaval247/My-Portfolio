"use client";

import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight,
  BookOpen,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export const BlogFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "/" },
        { name: "Archives", href: "/blog" },
        { name: "Projects", href: "/#projects" },
        { name: "About", href: "/#about" }
      ]
    },
    {
      title: "Focus",
      links: [
        { name: "Development", href: "/blog?category=Development" },
        { name: "Architecture", href: "/blog?category=Architecture" },
        { name: "Productivity", href: "/blog?category=Productivity" }
      ]
    }
  ];

  return (
    <footer className="bg-white border-t border-black/5 py-12 px-6 md:px-12 mt-12">
      <div className="max-w-[1550px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Logo & Manifesto */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center transition-transform group-hover:rotate-6">
                <BookOpen className="text-white w-4 h-4" />
              </div>
              <span className="serif-font text-xl font-black uppercase tracking-tighter italic">Piyush Press</span>
            </div>
            
            <p className="text-black/50 text-[11px] leading-relaxed max-w-xs font-medium italic">
              A pragmatic exploration of modern software engineering. Deciphering the complex, one transmission at a time.
            </p>

            <div className="flex items-center gap-4">
              <a href="https://github.com/PiyushRaval247" target="_blank" className="text-black/20 hover:text-black transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/piyush-raval-939594261/" target="_blank" className="text-black/20 hover:text-black transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="mailto:piyushraval2474@gmail.com" className="text-black/20 hover:text-black transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="md:col-span-2 space-y-4">
              <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-black/90 italic border-b border-black/5 pb-2">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-black/40 hover:text-[#008060] text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 group italic"
                    >
                      <ChevronRight className="w-2.5 h-2.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#008060]" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter CTA Content-First */}
          <div className="md:col-span-4 space-y-4 bg-slate-50 p-6 rounded-xl border border-black/5">
            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#008060] italic">Dispatch</h4>
            <h3 className="text-lg font-black italic tracking-tighter uppercase leading-tight">Master the stack.</h3>
            
            <form className="relative group">
               <input 
                 type="email" 
                 placeholder="Terminal email..." 
                 className="w-full px-4 py-3 bg-white rounded-lg border border-black/5 focus:border-[#008060]/40 outline-none transition-all text-[10px] font-bold italic shadow-sm"
               />
               <button className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-[#008060] text-white rounded-md hover:bg-[#006e52] transition-all" title="Subscribe">
                  <ArrowUpRight className="w-3.5 h-3.5" />
               </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-[9px] font-black text-black/20 uppercase tracking-[0.2em] italic">
             <span>© {currentYear} PIYUSH RAVAL</span>
             <span className="w-1 h-1 bg-black/5 rounded-full"></span>
             <span>COLLECTIVE INTELLIGENCE</span>
          </div>

          <div className="flex items-center gap-6 text-[9px] font-black text-black/20 uppercase tracking-[0.15em] italic">
             <Link href="#" className="hover:text-black transition-colors">Legal</Link>
             <Link href="#" className="hover:text-black transition-colors">Privacy</Link>
             <div className="flex items-center gap-2 px-2 py-0.5 bg-green-500/10 text-green-600 rounded-full border border-green-500/10">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                NOMINAL
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
