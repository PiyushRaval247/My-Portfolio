"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  X, 
  Save, 
  Loader2, 
  Quote, 
  Star, 
  Image as ImageIcon,
  User,
  Briefcase,
  AlignLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminTestimonialForm({ testimonial, onClose, onSave }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
    image: ""
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        role: testimonial.role,
        content: testimonial.content,
        rating: testimonial.rating,
        image: testimonial.image
      });
    }
  }, [testimonial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      role: formData.role,
      content: formData.content,
      rating: parseInt(formData.rating),
      image: formData.image,
      updated_at: new Date()
    };

    let error;
    if (testimonial) {
      const { error: err } = await supabase
        .from("testimonials")
        .update(payload)
        .eq("id", testimonial.id);
      error = err;
    } else {
      const { error: err } = await supabase
        .from("testimonials")
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
                <Quote className="text-primary w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tighter uppercase italic">
                  Manage <span className="text-primary">Feedback</span>
                </h2>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Client Experience Hub</p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all active:scale-90">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 ml-4">Full Name</label>
                <div className="relative">
                   <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                   <input
                     type="text"
                     required
                     placeholder="e.g. Alex Johnson"
                     value={formData.name}
                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                     className="w-full pl-14 pr-6 py-4 bg-background/50 rounded-2xl border border-white/5 focus:border-primary/40 outline-none transition-all text-xs font-bold"
                   />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 ml-4">Professional Role</label>
                <div className="relative">
                   <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                   <input
                     type="text"
                     required
                     placeholder="e.g. CTO at TechCorp"
                     value={formData.role}
                     onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                     className="w-full pl-14 pr-6 py-4 bg-background/50 rounded-2xl border border-white/5 focus:border-primary/40 outline-none transition-all text-xs font-bold"
                   />
                </div>
              </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 ml-4">Review Content</label>
                <div className="relative">
                   <AlignLeft className="absolute left-6 top-6 w-4 h-4 text-primary/40" />
                   <textarea
                     required
                     rows="4"
                     placeholder="Detailed feedback from the client..."
                     value={formData.content}
                     onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                     className="w-full pl-14 pr-6 py-6 bg-background/50 rounded-[2rem] border border-white/5 focus:border-primary/40 outline-none transition-all text-xs font-medium leading-relaxed resize-none"
                   />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 ml-4">Legacy Rating Index</label>
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5 w-fit">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: s })}
                        className={`transition-all hover:scale-125 ${formData.rating >= s ? "text-yellow-400" : "text-white/10"}`}
                      >
                        <Star className={`w-5 h-5 ${formData.rating >= s ? "fill-yellow-400" : ""}`} />
                      </button>
                    ))}
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 ml-4">Avatar URL (Optional)</label>
                  <div className="relative">
                     <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                     <input
                       type="text"
                       placeholder="https://..."
                       value={formData.image}
                       onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                       className="w-full pl-14 pr-6 py-4 bg-background/50 rounded-2xl border border-white/5 focus:border-primary/40 outline-none transition-all text-xs font-bold"
                     />
                  </div>
               </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-5 rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 shadow-2xl shadow-primary/20 text-xs mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Publish Feedback
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
