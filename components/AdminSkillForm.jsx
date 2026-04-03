"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  X, 
  Save, 
  Loader2, 
  Terminal, 
  BarChart, 
  Cpu,
  Monitor,
  Database,
  Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const icons = [
  "html", "css", "tailwind", "javascript", "react", "nextjs", 
  "nodejs", "express", "mongodb", "git", "github", "vscode", 
  "cleark", "sql", "mysql", "java"
];

const categories = [
  { id: "frontend", label: "Frontend Architecture", icon: Monitor },
  { id: "backend", label: "Backend Infrastructure", icon: Database },
  { id: "tools", label: "Professional Tools", icon: Briefcase }
];

export default function AdminSkillForm({ skill, onClose, onSave }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    level: 80,
    category: "frontend",
    icon: "react"
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name,
        level: skill.level,
        category: skill.category,
        icon: skill.icon
      });
    }
  }, [skill]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      level: parseInt(formData.level),
      category: formData.category,
      icon: formData.icon,
      updated_at: new Date()
    };

    let error;
    if (skill) {
      const { error: err } = await supabase
        .from("skills")
        .update(payload)
        .eq("id", skill.id);
      error = err;
    } else {
      const { error: err } = await supabase
        .from("skills")
        .insert([payload]);
      error = err;
    }

    if (!error) onSave();
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-card/40 backdrop-blur-3xl border border-white/5 w-full max-w-2xl rounded-[3rem] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30"></div>
        
        <div className="p-8 md:p-12">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                <Terminal className="text-primary w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tighter uppercase italic">
                  Manage <span className="text-primary">Proficiency</span>
                </h2>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Technical Index Configuration</p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all active:scale-90">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 ml-4">Skill Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 bg-background/50 rounded-2xl border border-white/5 focus:border-primary/40 outline-none transition-all text-xs font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 ml-4">Architecture Layer</label>
                <div className="grid grid-cols-3 gap-2">
                   {categories.map((cat) => (
                     <button
                       key={cat.id}
                       type="button"
                       onClick={() => setFormData({ ...formData, category: cat.id })}
                       className={`flex items-center justify-center p-3 rounded-xl border transition-all ${
                         formData.category === cat.id 
                           ? "bg-primary/10 border-primary/40 text-primary shadow-lg shadow-primary/5" 
                           : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10"
                       }`}
                       title={cat.label}
                     >
                       <cat.icon className="w-4 h-4" />
                     </button>
                   ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between items-center px-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Proficiency Percentage</label>
                  <span className="text-sm font-black text-primary font-mono">{formData.level}%</span>
               </div>
               <div className="px-4">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all"
                  />
               </div>
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 ml-4">Icon Identity</label>
               <div className="flex flex-wrap gap-3 p-4 bg-white/5 rounded-[2rem] border border-white/5">
                  {icons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon })}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all group ${
                        formData.icon === icon 
                          ? "bg-primary/20 border-primary/50 ring-2 ring-primary/20" 
                          : "bg-background/40 border-white/5 hover:border-white/20"
                      }`}
                    >
                      <img 
                        src={`/assets/icons/${icon}.png`} 
                        className={`w-6 h-6 object-contain transition-all ${
                          formData.icon === icon ? "opacity-100 scale-110" : "opacity-40 grayscale group-hover:opacity-80 group-hover:grayscale-0"
                        }`} 
                        alt={icon} 
                      />
                    </button>
                  ))}
               </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-5 rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 shadow-2xl shadow-primary/20 text-xs"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Commit Changes
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
