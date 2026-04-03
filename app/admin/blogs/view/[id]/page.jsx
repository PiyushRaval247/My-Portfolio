"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Loader2, 
  ExternalLink, 
  Calendar, 
  Tag, 
  ShieldCheck,
  BookOpen,
  PieChart,
  Edit3
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";

export default function BlogEditorialReviewPage({ params }) {
  const { id } = use(params);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      router.push("/admin/blogs");
    } else {
      setBlog(data);
    }
    setLoading(false);
  };

  const createMarkup = (html) => {
    return {
      __html: typeof window !== "undefined" ? DOMPurify.sanitize(html) : html,
    };
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-12 space-y-12 max-w-7xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <Link href="/admin/blogs" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-secondary transition-all group w-fit">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Story Archive
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest border border-secondary/20 w-fit font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            Manuscript Review
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">{blog.title}</h1>
          <p className="text-muted-foreground font-medium text-lg opacity-80 max-w-3xl border-l-2 border-secondary/40 pl-6 italic">{blog.sub_title}</p>
        </div>
        
        <div className="flex items-center gap-3">
           <Link 
             href={`/admin/blogs/edit/${blog.id}`} 
             className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all"
           >
              Reconfigure Intel
           </Link>
           <a 
             href={`/blog/${blog.id}`} 
             target="_blank" 
             className="px-8 py-4 bg-secondary text-secondary-foreground rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
           >
              <ExternalLink className="w-3.5 h-3.5" />
              Launch Live
           </a>
        </div>
      </div>

      {/* Main Review Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
           <motion.div 
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             className="relative aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
           >
              <img 
                src={blog.image_url || "/projects/project.png"} 
                className="w-full h-full object-cover" 
                alt="" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute top-8 right-8">
                 <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-2xl backdrop-blur-3xl ${blog.is_published ? 'bg-green-500/10 text-green-500 border-green-500/40' : 'bg-amber-500/10 text-amber-500 border-amber-500/40'}`}>
                    {blog.is_published ? "Intelligence Deployed" : "Synthesis Draft"}
                 </span>
              </div>
           </motion.div>

           <div className="bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/5 rounded-full blur-3xl opacity-40"></div>
              <div className="mb-12 flex items-center gap-3 text-muted-foreground opacity-40 font-black uppercase tracking-[0.3em] text-[10px]">
                 <PieChart className="w-4 h-4" /> Comprehensive Synthesis Review
              </div>
              
              <div 
                className="prose-review text-foreground/90 font-medium leading-[2] tracking-normal text-lg"
                dangerouslySetInnerHTML={createMarkup(blog.description)}
              />
           </div>
        </div>

        {/* Technical Registry */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 shadow-2xl space-y-8 relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-secondary/5 rounded-full blur-[60px] opacity-20"></div>
              
              <div className="space-y-6 relative z-10">
                 <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 mb-6">Status Registry</h4>
                    <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl group transition-all hover:bg-white/10">
                       <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center border border-secondary/20">
                          <Calendar className="w-5 h-5 text-secondary" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Synthesis Time</p>
                          <p className="text-sm font-bold tracking-tight">{new Date(blog.created_at).toLocaleString()}</p>
                       </div>
                    </div>
                 </div>

                 <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 mb-6">Knowledge Taxonomy</h4>
                    <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl group transition-all hover:bg-white/10">
                       <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center border border-secondary/20">
                          <Tag className="w-5 h-5 text-secondary" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Intel Category</p>
                          <p className="text-sm font-bold tracking-tight">{blog.category}</p>
                       </div>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 mb-6">Internal Reviewer Note</h4>
                    <div className="p-6 bg-secondary/[0.03] border border-secondary/10 rounded-3xl italic text-xs leading-relaxed text-muted-foreground font-medium">
                       "Every piece of intelligence must be verified for accuracy and SEO synthesis before final deployment. This environment is designed for precise manuscript review."
                    </div>
                 </div>
              </div>
           </div>
        </aside>
      </div>

      <style jsx global>{`
        .prose-review h1, .prose-review h2, .prose-review h3 { font-family: inherit; font-weight: 900; margin-top: 2.5rem; margin-bottom: 1.5rem; letter-spacing: -0.05em; color: #fff; }
        .prose-review h1 { font-size: 2.5rem; }
        .prose-review h2 { font-size: 2rem; border-l-4 border-secondary/40 pl-6; background: linear-gradient(to right, rgba(147, 51, 234, 0.05), transparent); padding: 1rem 1.5rem; border-radius: 0 1rem 1rem 0; }
        .prose-review h3 { font-size: 1.5rem; }
        .prose-review p { margin-bottom: 2rem; opacity: 0.85; }
        .prose-review ul, .prose-review ol { margin-bottom: 2rem; padding-left: 1.5rem; list-style-type: square; opacity: 0.8; }
        .prose-review li { margin-bottom: 1rem; }
        .prose-review blockquote { border-l-4 border-secondary/60 pl-8 italic my-12 text-xl font-bold bg-white/5 p-8 rounded-r-3xl; }
        .prose-review pre { background: #000; padding: 2rem; border-radius: 1.5rem; font-family: monospace; overflow-x: auto; margin: 3rem 0; border: 1px solid rgba(255,255,255,0.05); }
      `}</style>
    </div>
  );
}
