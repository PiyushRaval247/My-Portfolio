"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Loader2, Zap } from "lucide-react";

const categories = [
  { id: "all", label: "All Skills", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { id: "frontend", label: "Frontend", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { id: "backend", label: "Backend", color: "bg-gradient-to-r from-green-500 to-emerald-500" },
  { id: "tools", label: "Tools", color: "bg-gradient-to-r from-orange-500 to-yellow-500" },
];

const iconImages = {
  html: "/assets/icons/html.png",
  css: "/assets/icons/css.png",
  tailwind: "/assets/icons/tailwind.png",
  javascript: "/assets/icons/javascript.png",
  react: "/assets/icons/react.png",
  nextjs: "/assets/icons/nextjs.png",
  nodejs: "/assets/icons/nodejs.png",
  express: "/assets/icons/express.png",
  mongodb: "/assets/icons/mongodb.png",
  java: "/assets/icons/java.png",
  git: "/assets/icons/git.png",
  github: "/assets/icons/github.png",
  vscode: "/assets/icons/vscode.png",
  cleark: "/assets/icons/cleark.png",
  sql: "/assets/icons/sql.png",
  mysql: "/assets/icons/mysql.png",
};

const SkillBar = ({ level }) => {
  const variants = {
    initial: { width: 0 },
    animate: { 
      width: `${level}%`,
      transition: { 
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2
      }
    }
  };

  return (
    <div className="w-full h-3 bg-secondary/20 rounded-full overflow-hidden">
      <motion.div
        initial="initial"
        animate="animate"
        variants={variants}
        className={`h-full rounded-full ${level > 75 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 
                     level > 50 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : 
                     'bg-gradient-to-r from-red-400 to-pink-500'}`}
      />
    </div>
  );
};

const InfiniteScrollSkills = ({ skills }) => {
  // Duplicate skills for seamless looping
  const duplicatedSkills = [...skills, ...skills, ...skills];
  
  return (
    <div className="overflow-hidden py-8">
      {/* First row */}
      <motion.div
        className="flex gap-8 mb-8"
        animate={{ 
          x: ["0%", "-100%"],
          transition: { 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          } 
        }}
      >
        {duplicatedSkills.map((skill, index) => {
          const iconSrc = iconImages[skill.icon] || "/assets/icons/react.png";
          return (
            <div 
              key={`${skill.id}-${index}`} 
              className="flex-shrink-0 flex flex-col items-center gap-2"
            >
              <div className="w-16 h-16 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <img 
                  src={iconSrc} 
                  alt={skill.name} 
                  className="w-8 h-8 object-contain" 
                  onError={(e) => e.target.src = "/assets/icons/react.png"}
                />
              </div>
              <span className="text-sm font-medium text-center">{skill.name}</span>
            </div>
          );
        })}
      </motion.div>
      
      {/* Second row (reverse direction) */}
      <motion.div
        className="flex gap-8"
        animate={{ 
          x: ["-100%", "0%"],
          transition: { 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          } 
        }}
      >
        {[...duplicatedSkills].reverse().map((skill, index) => {
          const iconSrc = iconImages[skill.icon] || "/assets/icons/react.png";
          return (
            <div 
              key={`${skill.id}-reverse-${index}`} 
              className="flex-shrink-0 flex flex-col items-center gap-2"
            >
              <div className="w-16 h-16 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <img 
                  src={iconSrc} 
                  alt={skill.name} 
                  className="w-8 h-8 object-contain" 
                  onError={(e) => e.target.src = "/assets/icons/react.png"}
                />
              </div>
              <span className="text-sm font-medium text-center">{skill.name}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("level", { ascending: false });

    if (!error) setSkills(data);
    setLoading(false);
  };

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  if (loading) {
    return (
      <div className="py-28 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section id="skills" className="py-16 md:py-20 relative bg-gradient-to-br from-background via-secondary/5 to-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 italic uppercase">
            Technical <span className="text-primary">Inventory</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-medium opacity-80 italic">
            A comprehensive index of my technical proficiencies and implementation levels.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={[
                "px-8 py-3 rounded-2xl transition-all duration-300 font-black uppercase tracking-widest text-[10px] sm:text-xs",
                "border border-white/5 hover:border-primary/20",
                "flex items-center gap-2",
                activeCategory === category.id
                  ? `${category.color} text-white shadow-xl shadow-primary/10`
                  : "bg-card/40 backdrop-blur-xl text-muted-foreground hover:bg-card/60"
              ].join(" ")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {activeCategory === "all" ? (
          <InfiniteScrollSkills skills={skills} />
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => {
                const iconSrc = iconImages[skill.icon] || "/assets/icons/react.png";
                return (
                  <motion.div
                    key={skill.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card/30 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/5 hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/5 group"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-card border-2 border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <img 
                          src={iconSrc} 
                          alt={skill.name} 
                          className="w-6 h-6 object-contain" 
                          onError={(e) => e.target.src = "/assets/icons/react.png"}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-black tracking-tight text-lg group-hover:text-primary transition-colors italic">
                            {skill.name}
                          </h3>
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full 
                            ${skill.level > 75 ? 'bg-emerald-500/10 text-emerald-500' : 
                              skill.level > 50 ? 'bg-amber-500/10 text-amber-500' : 
                              'bg-pink-500/10 text-pink-500'}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <SkillBar level={skill.level} />
                        <div className="mt-3 flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
                          <span>Basic</span>
                          <span>Expert</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {filteredSkills.length === 0 && (
          <motion.div 
            className="text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground font-black uppercase tracking-widest italic opacity-40">Section Under Maintenance</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};