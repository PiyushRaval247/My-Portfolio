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
        { name: "Portfolio", href: "/" },
        { name: "Feed", href: "/blog" },
        { name: "Projects", href: "/#projects" },
        { name: "About", href: "/#about" }
      ]
    },
    {
      title: "Categories",
      links: [
        { name: "Development", href: "/blog?category=Development" },
        { name: "Architecture", href: "/blog?category=Architecture" },
        { name: "Productivity", href: "/blog?category=Productivity" }
      ]
    }
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 py-12 px-6 md:px-12 mt-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-[1550px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3 group cursor-pointer w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                <BookOpen className="text-primary w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white/90 group-hover:text-primary transition-colors">
                Daily Blogs
              </span>
            </div>
            
            <p className="text-white/60 text-sm leading-relaxed max-w-sm font-medium">
              Exploring modern software engineering. Sharing insights on web development, architecture, and optimal workflows.
            </p>

            <div className="flex items-center gap-4 pt-2">
              {[ 
                { icon: Github, href: "https://github.com/PiyushRaval247" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/piyush-raval-939594261/" },
                { icon: Mail, href: "mailto:piyushraval2474@gmail.com" }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all duration-300">
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="md:col-span-2 space-y-6">
              <h4 className="text-sm font-bold text-white/90">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-white/60 hover:text-primary text-sm font-medium transition-all flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter CTA */}
          <div className="md:col-span-4 space-y-5 bg-white/5 backdrop-blur-xl p-8 rounded-xl border border-white/5 shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="relative z-10">
               <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Weekly Dispatch</h4>
               <h3 className="text-xl font-bold text-white/90 mb-6">Stay ahead of the curve.</h3>
               
               <form className="relative flex items-center">
                  <input 
                    type="email" 
                    placeholder="Enter your email..." 
                    className="w-full pl-5 pr-14 py-3.5 bg-[#0a0a0a]/80 rounded-xl border border-white/10 focus:border-primary/50 outline-none transition-all text-sm shadow-inner text-white/90"
                  />
                  <button className="absolute right-1.5 p-2.5 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all" title="Subscribe">
                     <ArrowUpRight className="w-4 h-4" />
                  </button>
               </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-xs font-medium text-white/60">
             <span>© {currentYear} Piyush Raval. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium text-white/60">
             <Link href="#" className="hover:text-white/90 transition-colors">Legal</Link>
             <Link href="#" className="hover:text-white/90 transition-colors">Privacy</Link>
             <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-emerald-500 rounded-full border border-green-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]"></div>
                All Systems Nominal
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
