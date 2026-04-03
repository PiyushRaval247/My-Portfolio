"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Trash2, 
  Loader2, 
  MessageSquareQuote as MessageSquareShare,
  Edit2,
  Star,
  Quote,
  Search,
  User,
  Calendar
} from "lucide-react";
import AdminTestimonialForm from "@/components/AdminTestimonialForm";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setTestimonials(data);
    setLoading(false);
  };

  const deleteTestimonial = async (id) => {
    if (window.confirm("⚠️ SYSTEM OVERRIDE: Delete this client testimonial permanently?")) {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (!error) fetchTestimonials();
    }
  };

  const filteredTestimonials = testimonials.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.content.toLowerCase().includes(searchTerm.toLowerCase())
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
              <MessageSquareShare className="text-primary w-7 h-7" />
           </div>
           <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter italic uppercase">Feedback <span className="text-primary">Hub</span></h1>
              <div className="flex items-center gap-2 mt-1 font-mono">
                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Reputation Index</span>
                 <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                 <span className="text-[10px] font-black text-primary">{testimonials.length} Client Testimonials</span>
              </div>
           </div>
        </div>
        
        <button
          onClick={() => { setEditingTestimonial(null); setIsFormOpen(true); }}
          className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-xs group w-fit"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Add New Feedback
        </button>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4">
         <div className="relative flex-1 w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
            <input 
               type="text" 
               placeholder="Search client index or keywords..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-14 pr-6 py-4 bg-card/40 backdrop-blur-3xl rounded-[1.5rem] border border-white/5 focus:border-primary/40 outline-none transition-all text-xs font-bold placeholder:opacity-50"
            />
         </div>
      </div>

      {/* High-Density List */}
      <div className="space-y-4">
        {filteredTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="p-6 bg-card/30 backdrop-blur-xl border border-white/5 rounded-[2rem] hover:border-primary/30 transition-all duration-300 group hover:shadow-2xl hover:shadow-primary/5 flex flex-col md:flex-row items-start md:items-center gap-6 relative overflow-hidden"
          >
             <div className="flex items-center gap-5 flex-1 min-w-0">
                <div className="h-14 w-14 rounded-2xl border-2 border-white/5 group-hover:border-primary/30 overflow-hidden shrink-0 transition-all shadow-xl">
                   {testimonial.image ? (
                     <img src={testimonial.image} className="w-full h-full object-cover" alt="" />
                   ) : (
                     <div className="w-full h-full bg-white/5 flex items-center justify-center font-black text-primary/40 italic uppercase text-lg">
                       {testimonial.name[0]}
                     </div>
                   )}
                </div>
                <div className="min-w-0">
                   <div className="flex items-center gap-3">
                      <h3 className="font-black tracking-tight text-base truncate">{testimonial.name}</h3>
                      <div className="flex items-center gap-0.5">
                         {[...Array(5)].map((_, i) => (
                           <Star key={i} className={`w-3 h-3 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-white/5"}`} />
                         ))}
                      </div>
                   </div>
                   <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground opacity-60 flex items-center gap-2">
                     {testimonial.role}
                     <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                     <Calendar className="w-2.5 h-2.5" />
                     {new Date(testimonial.created_at).toLocaleDateString()}
                   </p>
                </div>
             </div>

             <div className="flex-1 min-w-0 px-2 md:px-6">
                <p className="text-xs text-muted-foreground font-medium leading-relaxed italic line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                   "{testimonial.content}"
                </p>
             </div>

             <div className="flex items-center gap-3 shrink-0 ml-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/5 w-full md:w-auto">
                <button 
                  onClick={() => { setEditingTestimonial(testimonial); setIsFormOpen(true); }}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary active:scale-95"
                >
                   <Edit2 className="w-3.5 h-3.5" />
                   Edit
                </button>
                <button 
                  onClick={() => deleteTestimonial(testimonial.id)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-destructive/5 hover:bg-destructive text-destructive/60 hover:text-white rounded-xl border border-white/5 transition-all text-[10px] font-black uppercase tracking-widest active:scale-95"
                >
                   <Trash2 className="w-3.5 h-3.5" />
                   Delete
                </button>
             </div>
          </div>
        ))}

        {filteredTestimonials.length === 0 && (
          <div className="text-center py-24 bg-card/20 rounded-[3rem] border border-dashed border-white/5">
             <Quote className="w-12 h-12 text-muted-foreground/10 mx-auto mb-4 opacity-20" />
             <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-40 italic">Global Reputation Index Is Empty</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <AdminTestimonialForm 
            testimonial={editingTestimonial} 
            onClose={() => setIsFormOpen(false)} 
            onSave={() => { setIsFormOpen(false); fetchTestimonials(); }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
