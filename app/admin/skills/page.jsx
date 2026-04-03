"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Trash2, 
  Loader2, 
  Zap,
  Edit2,
  Layers,
  ChevronRight,
  Search
} from "lucide-react";
import Link from "next/link";
import AdminSkillForm from "@/components/AdminSkillForm";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("category", { ascending: true })
      .order("level", { ascending: false });

    if (!error) setSkills(data);
    setLoading(false);
  };

  const deleteSkill = async (id) => {
    if (window.confirm("⚠️ SYSTEM OVERRIDE: Delete this technical proficiency?")) {
      const { error } = await supabase.from("skills").delete().eq("id", id);
      if (!error) fetchSkills();
    }
  };

  const filteredSkills = skills.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 md:pt-12 space-y-8 max-w-7xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div className="flex items-center gap-5">
           <div className="w-14 h-14 bg-primary/10 rounded-[1.5rem] flex items-center justify-center border border-primary/20 shadow-2xl shadow-primary/10">
              <Zap className="text-primary w-7 h-7" />
           </div>
           <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter italic uppercase">Skill <span className="text-primary">Vault</span></h1>
              <div className="flex items-center gap-2 mt-1 font-mono">
                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Level Index</span>
                 <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                 <span className="text-[10px] font-black text-primary">{skills.length} Technical Proficiencies</span>
              </div>
           </div>
        </div>
        
        <button
          onClick={() => { setEditingSkill(null); setIsFormOpen(true); }}
          className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-xs group w-fit"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Add To Vault
        </button>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4">
         <div className="relative flex-1 w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
            <input 
               type="text" 
               placeholder="Search technical index..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-14 pr-6 py-4 bg-card/40 backdrop-blur-3xl rounded-[1.5rem] border border-white/5 focus:border-primary/40 outline-none transition-all text-xs font-bold placeholder:opacity-50"
            />
         </div>
      </div>

      {/* High-Density List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="p-6 bg-card/30 backdrop-blur-xl border border-white/5 rounded-[2rem] hover:border-primary/30 transition-all duration-300 group hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden"
          >
             <div className="absolute -right-12 -top-12 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
             
             <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-primary/20 transition-all">
                      <img src={`/assets/icons/${skill.icon}.png`} className="w-5 h-5 object-contain opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
                   </div>
                   <div>
                      <h3 className="font-black tracking-tight text-base">{skill.name}</h3>
                      <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground opacity-60">{skill.category}</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <button onClick={() => { setEditingSkill(skill); setIsFormOpen(true); }} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-all hover:scale-110">
                      <Edit2 className="w-3.5 h-3.5 opacity-60" />
                   </button>
                   <button onClick={() => deleteSkill(skill.id)} className="p-2 bg-destructive/5 hover:bg-destructive text-destructive/60 hover:text-white rounded-lg border border-white/5 transition-all hover:scale-110">
                      <Trash2 className="w-3.5 h-3.5" />
                   </button>
                </div>
             </div>

             <div className="space-y-2 relative z-10">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                   <span className="text-muted-foreground">Proficiency Level</span>
                   <span className="text-primary">{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${skill.level}%` }}
                     transition={{ duration: 1, ease: "easeOut" }}
                     className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]" 
                   />
                </div>
             </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <AdminSkillForm 
            skill={editingSkill} 
            onClose={() => setIsFormOpen(false)} 
            onSave={() => { setIsFormOpen(false); fetchSkills(); }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
