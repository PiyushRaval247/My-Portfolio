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
    { name: "Feed", href: "/blog" },
    { name: "Technical Dispatches", href: "/blog?series=true" },
    { name: "About the Mission", href: "/#about" },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
      scrolled 
        ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-lg shadow-black/20" 
        : "bg-transparent py-6"
    }`}>
      <div className="max-w-[1550px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LEFT: Masterhead Logo */}
        <Link href="/blog" className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(var(--primary),0.3)]">
            <BookOpen className="text-primary w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white/90 transition-colors group-hover:text-primary">
              Daily Blogs
            </span>
            <span className="text-[10px] font-medium text-white/50 uppercase tracking-widest">
              Digital Insights
            </span>
          </div>
        </Link>
        
        {/* CENTER: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-white/60 hover:text-primary transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* RIGHT: Search & Actions */}
        <div className="flex items-center gap-6">
          {/* Integrated Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex items-center relative group"
          >
            <div className="absolute left-3 w-4 h-4 text-white/40 group-focus-within:text-primary transition-colors flex items-center justify-center pointer-events-none">
              <Search className="w-full h-full" />
            </div>
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/5 focus:border-primary/50 outline-none transition-all text-sm font-medium w-40 lg:w-56 focus:w-48 lg:focus:w-64 focus:bg-white/10 text-white/90 shadow-inner"
            />
          </form>

          <Link 
            href="/" 
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-primary transition-all group border border-white/10 px-4 py-2 rounded-full hover:border-primary/30 hover:bg-primary/5"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Portfolio Main
          </Link>

          {/* MOBILE MENU TRIGGER */}
          <button 
            className="lg:hidden p-2 text-white/60 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="sm:hidden w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-all text-white/60 hover:text-primary">
             <User className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl p-8 flex flex-col justify-between"
          >
            <div>
               <div className="flex justify-between items-center mb-16">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                     <BookOpen className="w-4 h-4 text-primary" />
                   </div>
                   <span className="text-xl font-bold text-white/90">Daily Blogs</span>
                 </div>
                 <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full border border-white/10 hover:border-primary/50 text-white/60 hover:text-primary transition-all hover:bg-primary/10">
                   <X className="w-6 h-6" />
                 </button>
               </div>

               <nav className="flex flex-col gap-6">
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
                       className="text-2xl font-bold text-white/80 hover:text-primary transition-all duration-300 block pb-4 border-b border-white/5"
                     >
                       {link.name}
                     </Link>
                   </motion.div>
                 ))}
                 
                 <form 
                   onSubmit={handleSearch}
                   className="relative mt-8"
                 >
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 flex items-center justify-center pointer-events-none">
                      <Search className="w-5 h-5" />
                    </div>
                    <input 
                      type="text"
                      placeholder="Search articles..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-white/5 text-white/90 rounded-2xl border border-white/10 outline-none text-lg focus:border-primary/50 transition-colors shadow-inner"
                    />
                 </form>
               </nav>
            </div>

            <Link 
              href="/"
              className="text-lg font-bold text-white flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-all shadow-lg shadow-primary/20 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Return to Portfolio
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
