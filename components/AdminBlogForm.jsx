"use client";

import { useState, useMemo, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import dynamic from "next/dynamic";
import { 
  Sparkles, 
  Loader2, 
  Upload, 
  Plus, 
  CheckCircle,
  AlertCircle,
  Save,
  Image as ImageIcon
} from "lucide-react";
import "react-quill-new/dist/quill.snow.css";

// Dynamic import for Quill
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function AdminBlogForm({ blog, onComplete, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    sub_title: blog?.sub_title || "",
    category: blog?.category || "Technology",
    description: blog?.description || "", 
    image_url: blog?.image_url || "",
    is_featured: blog?.is_featured || false,
  });
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setGenerating(true);
    setError(null);
    
    try {
      const res = await fetch("/api/blogs/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      
      if (data.success) {
        const htmlContent = data.content.replace(/\n/g, '<br />');
        setFormData({ ...formData, description: htmlContent });
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleUpload = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `blog-images/${fileName}`;

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
    setError(null);

    try {
      let finalImageUrl = formData.image_url;

      if (file) {
        finalImageUrl = await handleUpload(file);
      }

      const blogData = {
        ...formData,
        image_url: finalImageUrl,
        is_published: blog ? blog.is_published : true
      };

      if (blog?.id) {
        const { error } = await supabase
          .from("blogs")
          .update(blogData)
          .eq("id", blog.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blogs").insert([{
          ...blogData,
          is_published: true // Default to true for newBlogs
        }]);
        if (error) throw error;
      }

      setSuccess(true);
      setTimeout(() => onComplete(), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "code-block"],
      ["clean"]
    ],
  }), []);

  return (
    <div className="space-y-8">
      {error && (
        <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-2xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 text-green-500 border border-green-500/20 rounded-2xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-bold">{blog ? "Changes synchronized successfully!" : "Successfully published!"}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="p-8 bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-2xl space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 ml-1">Intel Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-background/50 border border-white/5 focus:border-secondary/40 focus:ring-2 focus:ring-secondary/10 outline-none transition-all text-xl font-black"
                  placeholder="The Future of AI..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 ml-1">Subtitle</label>
                  <input
                    type="text"
                    value={formData.sub_title}
                    onChange={(e) => setFormData({ ...formData, sub_title: e.target.value })}
                    className="w-full px-5 py-3 rounded-2xl bg-background/50 border border-white/5 focus:border-secondary/40 outline-none transition-all text-sm font-medium"
                    placeholder="Brief intro..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 ml-1">Classification</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-5 py-3 rounded-2xl bg-background/50 border border-white/5 focus:border-secondary/40 outline-none transition-all text-sm font-bold"
                  >
                    <option>Technology</option>
                    <option>Design</option>
                    <option>Programming</option>
                    <option>Career</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-secondary/5 rounded-2xl border border-secondary/10">
                <div className="flex-1">
                  <h4 className="text-xs font-black uppercase tracking-widest text-secondary italic">Promote to Carousel</h4>
                  <p className="text-[10px] text-muted-foreground font-medium italic">Featured stories are prioritized in the homepage carousel.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, is_featured: !formData.is_featured })}
                  className={`w-12 h-6 rounded-full transition-all relative ${formData.is_featured ? "bg-secondary" : "bg-white/10"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.is_featured ? "left-7" : "left-1"}`} />
                </button>
              </div>

              <div className="admin-quill">
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 ml-1">Intel Core Content</label>
                <div className="bg-background/50 rounded-2xl border border-white/5 overflow-hidden min-h-[400px]">
                  <ReactQuill
                    theme="snow"
                    modules={quillModules}
                    value={formData.description}
                    onChange={(val) => setFormData({ ...formData, description: val })}
                    className="h-[350px]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-secondary text-secondary-foreground py-5 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-secondary/90 transition-all active:scale-95 disabled:opacity-50 text-base shadow-2xl shadow-secondary/20"
            >
              {loading ? <Loader2 className="animate-spin w-6 h-6" /> : (
                <>
                  {blog ? <Save className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  {blog ? "Synchronize Changes" : "Deploy Story"}
                </>
              )}
            </button>
          </div>
        </form>

        <aside className="space-y-6">
          <div className="p-8 bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-2xl space-y-6 group overflow-hidden relative">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-secondary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <div className="flex items-center gap-2 mb-2 relative">
              <Sparkles className="text-secondary w-6 h-6" />
              <h3 className="font-extrabold text-lg tracking-tighter">AI Lab Assistant</h3>
            </div>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest leading-relaxed relative opacity-60">Input prompt for AI content generation.</p>
            
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-background/50 border border-white/5 outline-none focus:border-secondary/40 transition-all text-xs font-medium leading-relaxed relative"
              placeholder="e.g. Write an advanced analysis of AI in 2026..."
              rows="5"
            />
            
            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating || !prompt}
              className="w-full bg-white/5 text-muted-foreground py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-all active:scale-95 disabled:opacity-50 text-[10px] border border-white/5 relative"
            >
              {generating ? <Loader2 className="animate-spin w-4 h-4" /> : "Initiate AI Synthesis"}
            </button>
          </div>

          <div className="p-8 bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-2xl space-y-6">
            <h3 className="font-extrabold text-[10px] uppercase tracking-widest text-muted-foreground opacity-60">Visual Assets</h3>
            <div className="flex flex-col items-center gap-4">
              {(formData.image_url || file) && (
                <div className="w-full h-40 rounded-3xl overflow-hidden border border-white/10 shadow-lg">
                  <img
                    src={file ? URL.createObjectURL(file) : formData.image_url}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              )}
              <label className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/5 rounded-3xl cursor-pointer hover:border-secondary/50 transition-all group bg-background/30">
                <ImageIcon className="w-8 h-8 text-muted-foreground mb-2 group-hover:text-secondary transition-all duration-500" />
                <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest text-center">
                  {file ? file.name : "Select Asset"}
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
        </aside>
      </div>
      <style jsx global>{`
        .admin-quill .ql-editor { font-size: 16px; min-height: 300px; color: #e5e7eb; font-weight: 500; line-height: 1.6; }
        .admin-quill .ql-toolbar { border-radius: 20px 20px 0 0; background: #111827; border-color: #1f2937; padding: 12px; }
        .admin-quill .ql-container { border-radius: 0 0 20px 20px; background: transparent; border-color: #1f2937; }
        .admin-quill .ql-stroke { stroke: #9ca3af !important; }
        .admin-quill .ql-picker { color: #9ca3af !important; }
      `}</style>
    </div>
  );
}
