"use client";

import {
  ArrowUp,
  Linkedin,
  Github,
  Mail,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/piyush-raval-939594261/", label: "LinkedIn" },
    { icon: <Github size={18} />, href: "https://github.com/PiyushRaval247", label: "GitHub" },
  ];

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
  ];

  const contactInfo = [
    { icon: <Mail size={16} />, text: "piyushraval2474@gmail.com", href: "mailto:piyushraval2474@gmail.com" },
    { icon: <Phone size={16} />, text: "+91 8200638429", href: "tel:+918200638429" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Glass background container */}
        <motion.div 
          className="bg-card/40 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden group"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10 group-hover:bg-primary/10 transition-colors duration-1000"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Branding */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-black text-foreground tracking-tight">PIYUSH</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                Digital designer & developer creating meaningful experiences. Building high-performance software systems.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-background border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(var(--primary),0.2)]"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div variants={itemVariants} className="md:pl-8">
              <h4 className="text-foreground font-bold mb-6 text-sm uppercase tracking-widest">Navigation</h4>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium flex items-center gap-2 group/link"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover/link:bg-primary transition-colors"></span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants}>
              <h4 className="text-foreground font-bold mb-6 text-sm uppercase tracking-widest">Contact</h4>
              <ul className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center space-x-3 text-sm group/contact"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-primary/70 group-hover/contact:text-primary transition-colors">{info.icon}</span>
                    {info.href ? (
                      <a 
                        href={info.href} 
                        className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-muted-foreground font-medium">{info.text}</span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-foreground font-bold text-sm uppercase tracking-widest">Newsletter</h4>
              <p className="text-muted-foreground text-sm font-medium">
                Sign up for the latest insights in software and design.
              </p>
              <form className="relative flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3 text-sm bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 text-foreground transition-colors w-full shadow-inner"
                  required
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-primary/30 w-full hover:scale-[1.02]"
                >
                  Subscribe Now
                </button>
              </form>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div 
            className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <p>© {currentYear} Piyush Raval. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-8">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <motion.a
                href="#hero"
                aria-label="Back to top"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors border border-primary/20 shadow-lg shadow-primary/10"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUp size={16} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};;