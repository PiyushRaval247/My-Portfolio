"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  Loader2, 
  BookOpen,
  Calendar,
  Tag,
  Edit3,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setBlogs(data);
    setLoading(false);
  };

  const togglePublish = async (id, currentStatus) => {
    const { error } = await supabase
      .from("blogs")
      .update({ is_published: !currentStatus })
      .eq("id", id);

    if (!error) fetchBlogs();
  };

  const deleteBlog = async (id) => {
    if (window.confirm("⚠️ SYSTEM OVERRIDE: Delete this story permanentely?")) {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (!error) fetchBlogs();
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 md:pt-12 space-y-8 max-w-7xl mx-auto">
      {/* Optimized Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div className="flex items-center gap-5">
           <div className="w-14 h-14 bg-secondary/10 rounded-[1.5rem] flex items-center justify-center border border-secondary/20 shadow-2xl shadow-secondary/10">
              <BookOpen className="text-secondary w-7 h-7" />
           </div>
           <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter">Content <span className="text-secondary italic">Studio</span></h1>
              <div className="flex items-center gap-2 mt-1">
                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Intelligence Archive</span>
                 <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                 <span className="text-[10px] font-black text-secondary font-mono">{blogs.length} Active Stories</span>
              </div>
           </div>
        </div>
        
        <Link
          href="/admin/blogs/add"
          className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-xs group w-fit"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Write New Story
        </Link>
      </div>

      {/* List Layout */}
      <div className="space-y-3">
         {/* Desktop Labels */}
         <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
           <div className="col-span-6">Intel Title</div>
           <div className="col-span-2">Classification</div>
           <div className="col-span-4 text-right">Operations</div>
         </div>

        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 p-4 md:p-5 md:px-8 bg-card/30 backdrop-blur-xl border border-white/5 rounded-[2rem] hover:border-secondary/30 transition-all duration-300 group hover:shadow-2xl hover:shadow-secondary/5 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-secondary/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

            {/* Col 1: Details */}
            <div className="col-span-6 flex items-center gap-5 min-w-0">
               <div className="w-20 h-14 md:w-24 md:h-16 rounded-xl overflow-hidden border border-white/5 shrink-0 relative group/pic shadow-xl">
                  <img
                    src={blog.image_url || "/projects/project.png"}
                    className="w-full h-full object-cover grayscale group-hover/pic:grayscale-0 transition-all duration-500 group-hover/pic:scale-110"
                    alt=""
                  />
               </div>
               <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${blog.is_published ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                      {blog.is_published ? "Live" : "Draft"}
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-40">Deployed {new Date(blog.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-base font-black tracking-tight truncate group-hover:text-secondary transition-colors">{blog.title}</h3>
               </div>
            </div>

            {/* Col 2: Category */}
            <div className="col-span-2">
               <span className="px-3 py-1 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-muted-foreground border border-white/5">
                  {blog.category}
               </span>
            </div>

            {/* Col 3: Actions */}
            <div className="col-span-4 flex items-center justify-end gap-3">
               <Link 
                 href={`/admin/blogs/view/${blog.id}`} 
                 className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all group/btn"
               >
                  <Eye className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" /> 
                  <span className="hidden lg:inline">View</span>
               </Link>
               <Link 
                 href={`/admin/blogs/edit/${blog.id}`} 
                 className="flex items-center gap-2 px-4 py-2 bg-secondary/10 hover:bg-secondary text-secondary hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-secondary/20 transition-all group/btn"
               >
                  <Edit3 className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" /> 
                  <span className="hidden lg:inline">Edit</span>
               </Link>
               <button
                  onClick={() => togglePublish(blog.id, blog.is_published)}
                  className={`p-2.5 rounded-xl border border-white/5 transition-all hover:scale-110 ${blog.is_published ? 'text-green-500 bg-green-500/5 hover:bg-green-500/10' : 'text-amber-500 bg-amber-500/5 hover:bg-amber-500/10'}`}
                  title={blog.is_published ? "Unpublish" : "Publish"}
                >
                  {blog.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
               </button>
               <button
                onClick={() => deleteBlog(blog.id)}
                className="p-2.5 bg-destructive/5 hover:bg-destructive text-destructive/60 hover:text-white rounded-xl transition-all border border-destructive/10 group/btn"
                title="Destroy Story"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {blogs.length === 0 && !loading && (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.02]">
            <BookOpen className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-black tracking-tight">Intelligence Archive Empty</h3>
            <p className="text-muted-foreground mt-2 max-w-xs mx-auto font-medium opacity-60 italic text-sm">Deploy your first AI-assisted story to reach the global population.</p>
          </div>
        )}
      </div>
    </div>
  );
}
