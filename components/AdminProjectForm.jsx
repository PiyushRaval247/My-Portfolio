"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Upload, Plus, Trash2, X, Globe, Github as GhIcon, Hash, Image as ImageIcon, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProjectForm({ project, onComplete, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image_url: project?.image_url || "",
    demo_url: project?.demo_url || "",
    github_url: project?.github_url || "",
    tags: project?.tags || [],
  });
  const [tagInput, setTagInput] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `project-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("portfolio").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.image_url;

      if (file) {
        finalImageUrl = await handleUpload(file);
      }

      const projectData = {
        ...formData,
        image_url: finalImageUrl,
      };

      if (project?.id) {
        if (file && project.image_url) {
          const oldPath = project.image_url.split("/").pop();
          await supabase.storage.from("portfolio").remove([`project-images/${oldPath}`]);
        }

        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", project.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert([projectData]);
        if (error) throw error;
      }

      setSuccess(true);
      setTimeout(() => onComplete(), 1500);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    const cleanTag = tagInput.trim();
    if (cleanTag && !formData.tags.includes(cleanTag)) {
      setFormData({ ...formData, tags: [...formData.tags, cleanTag] });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tagToRemove),
    });
  };

  return (
    <div className="bg-card/40 backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black tracking-tighter">
            {project ? "Project <span className='text-primary italic'>Architect</span>" : "Launch <span className='text-primary italic'>Deployment</span>"}
          </h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1 opacity-60">System Configuration Phase</p>
        </div>
        {onCancel && (
          <button onClick={onCancel} className="p-3 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/10 group/close">
            <X className="w-5 h-5 text-muted-foreground group-hover/close:rotate-90 transition-transform" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Basic Info */}
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 ml-1">Title</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-background/50 border border-white/5 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm font-bold"
                  placeholder="e.g. Neural Nexus Dashboard"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 ml-1">Executive Summary</label>
              <textarea
                required
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl bg-background/50 border border-white/5 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm font-medium leading-relaxed"
                placeholder="Brief technical overview..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 ml-1 flex items-center gap-1.5">
                  <Globe className="w-3 h-3" /> Live Demo
                </label>
                <input
                  type="url"
                  value={formData.demo_url}
                  onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                  className="w-full px-5 py-3 rounded-2xl bg-background/50 border border-white/5 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 outline-none transition-all text-xs font-bold"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 ml-1 flex items-center gap-1.5">
                  <GhIcon className="w-3 h-3" /> Repository
                </label>
                <input
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  className="w-full px-5 py-3 rounded-2xl bg-background/50 border border-white/5 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 outline-none transition-all text-xs font-bold"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
          </div>

          {/* Right Column: Tags & Image */}
          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 ml-1 flex items-center gap-1.5">
                  <Hash className="w-3 h-3" /> Tech Stack Tags
                </label>
                <div className="p-4 rounded-2xl bg-background/50 border border-white/5 space-y-4">
                   <div className="flex flex-wrap gap-2">
                      <AnimatePresence>
                        {formData.tags.map((tag) => (
                          <motion.span
                            key={tag}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 group/tag"
                          >
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} className="hover:text-white transition-colors">
                              <X className="w-3 h-3" />
                            </button>
                          </motion.span>
                        ))}
                      </AnimatePresence>
                      {formData.tags.length === 0 && <span className="text-[10px] text-muted-foreground opacity-40 font-bold uppercase tracking-widest italic py-1.5">No tags specified</span>}
                   </div>
                   <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-primary/40 transition-all"
                        placeholder="Add tag..."
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-white/10 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white/20 transition-all active:scale-95"
                      >
                        Add
                      </button>
                   </div>
                </div>
             </div>

             <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 ml-1 flex items-center gap-1.5">
                  <ImageIcon className="w-3 h-3" /> Visual Asset
                </label>
                <div className="flex flex-col gap-4">
                  {(formData.image_url || file) && (
                    <div className="w-full h-32 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group/img">
                      <img
                        src={file ? URL.createObjectURL(file) : formData.image_url}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                         <p className="text-[10px] font-black uppercase tracking-widest text-white">Current Preview</p>
                      </div>
                    </div>
                  )}
                  <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-primary/50 transition-all group bg-white/[0.02] hover:bg-primary/[0.02]">
                    <Upload className="w-8 h-8 text-muted-foreground mb-2 group-hover:text-primary transition-all duration-500 group-hover:-translate-y-1" />
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest text-center">
                      {file ? file.name : "Select Deployment Image"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </div>
             </div>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading || success}
            className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 text-sm shadow-2xl ${
               success ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90'
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : success ? (
               <><CheckCircle className="w-6 h-6" /> System Updated</>
            ) : (
              <>
                <Plus className="w-6 h-6" />
                {project ? "Synchronize Updates" : "Commit Deployment"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
