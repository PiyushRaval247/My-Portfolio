"use client";

import { useState, useEffect } from "react";
import { MoveUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-black text-white hover:bg-[#008060] transition-all flex items-center justify-center rounded-none shadow-none border border-white/10 group"
          aria-label="Return to Zenith"
        >
          <MoveUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-500" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
