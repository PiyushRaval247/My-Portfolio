"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  ArrowLeft, 
  BookOpen, 
  Menu, 
  X,
  User,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export const BlogNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/blog?q=${encodeURIComponent(searchValue)}`);
    } else {
      router.push("/blog");
    }
  };

  const navLinks = [
    { name: "Index", href: "/blog" },
    { name: "Technical Dispatches", href: "/blog?series=true" },
    { name: "About the Mission", href: "/#about" },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 ${
      scrolled 
        ? "bg-white/98 backdrop-blur-sm border-b border-black/10 py-3 shadow-none" 
        : "bg-[#fdfdfd] py-6"
    }`}>
      <div className="max-w-[1550px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LEFT: Architectural Nav (Swiss Style) */}
        <div className="flex items-center gap-12">
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 hover:text-black transition-all italic relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#008060] transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* MOBILE MENU TRIGGER */}
          <button 
            className="lg:hidden p-2 text-black hover:text-[#008060] transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* CENTER: Masterhead Logo (Architectural Typography) */}
        <Link href="/blog" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-black rounded-none flex items-center justify-center transition-all duration-500 group-hover:scale-110">
               <BookOpen className="text-white w-5 h-5" />
             </div>
             <span className="serif-font text-2xl md:text-3xl font-black uppercase tracking-[-0.05em] text-black italic group-hover:text-[#008060] transition-colors">PIYUSH PRESS</span>
          </div>
          <div className="h-px w-24 bg-black/5 mt-2 group-hover:w-48 transition-all duration-700"></div>
          <span className="text-[7px] font-black uppercase tracking-[0.6em] text-black/20 mt-1">Operational Intelligence Intelligence Unit</span>
        </Link>

        {/* RIGHT: High-Impact Operations */}
        <div className="flex items-center gap-10">
          {/* Integrated Search Bar (No More Rounding) */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex items-center relative group"
          >
            <Search className="absolute left-0 w-4 h-4 text-black/20 group-focus-within:text-[#008060] transition-colors" />
            <input 
              type="text"
              placeholder="Query Archives..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-8 pr-4 py-2 bg-transparent border-b border-black/10 focus:border-[#008060] outline-none transition-all text-[11px] font-black italic tracking-widest w-40 lg:w-56"
            />
          </form>

          <Link 
            href="/" 
            className="hidden sm:flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-black hover:text-[#008060] transition-all group italic"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-3 transition-transform duration-700" />
            Command Center
          </Link>
          
          <div className="sm:hidden w-10 h-10 border border-black/10 flex items-center justify-center group cursor-pointer hover:bg-black transition-all">
             <User className="w-5 h-5 text-black group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY (Swiss Grid Mobile Menu) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-[#fdfdfd] p-12 flex flex-col justify-between"
          >
            <div>
               <div className="flex justify-between items-center mb-24">
                 <span className="serif-font text-2xl font-black italic uppercase tracking-tighter border-b-4 border-[#008060]">Mission Log</span>
                 <button onClick={() => setMobileMenuOpen(false)} className="w-12 h-12 border border-black/10 flex items-center justify-center hover:rotate-90 transition-transform">
                   <X className="w-6 h-6 text-black" />
                 </button>
               </div>

               <nav className="flex flex-col gap-10">
                 {navLinks.map((link, idx) => (
                   <motion.div
                     key={link.name}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: idx * 0.1 }}
                   >
                     <Link 
                       href={link.href}
                       onClick={() => setMobileMenuOpen(false)}
                       className="text-4xl font-black uppercase tracking-[-0.05em] italic text-black/10 hover:text-[#008060] transition-all duration-500 block hover:translate-x-6 border-b border-black/5 pb-4"
                     >
                       {link.name}
                     </Link>
                   </motion.div>
                 ))}
                 
                 <form 
                   onSubmit={handleSearch}
                   className="relative mt-8"
                 >
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-black/20" />
                    <input 
                      type="text"
                      placeholder="Operational Search..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="w-full pl-10 pr-4 py-8 bg-transparent border-b-2 border-black/10 outline-none text-2xl font-black italic tracking-tighter"
                    />
                 </form>
               </nav>
            </div>

            <Link 
              href="/"
              className="text-2xl font-black uppercase tracking-[-0.05em] italic text-black flex items-center gap-6 p-8 border-2 border-black/10 hover:bg-[#008060] hover:text-white transition-all shadow-none group"
            >
              <ArrowLeft className="w-8 h-8 group-hover:-translate-x-3 transition-transform" />
              Terminal Return
              <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all ml-auto" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
