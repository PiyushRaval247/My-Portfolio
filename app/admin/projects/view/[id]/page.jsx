"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Loader2, 
  ExternalLink, 
  Github, 
  Calendar, 
  Hash, 
  Layout, 
  ShieldCheck,
  Rocket
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectDossierPage({ params }) {
  const { id } = use(params);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      router.push("/admin/projects");
    } else {
      setProject(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-12 space-y-12 max-w-6xl mx-auto">
      {/* Header & Back Action */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <Link href="/admin/projects" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all group w-fit">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Project Inventory
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20 w-fit">
            <ShieldCheck className="w-3.5 h-3.5" />
            Intelligence Dossier
          </div>
          <h1 className="text-5xl font-black tracking-tighter">{project.title}</h1>
        </div>
        
        <div className="flex items-center gap-3">
           <Link 
             href={`/admin/projects/edit/${project.id}`} 
             className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all"
           >
              Reconfigure System
           </Link>
           {project.demo_url && (
              <a 
                href={project.demo_url} 
                target="_blank" 
                className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                 <Rocket className="w-3.5 h-3.5" />
                 Launch Live
              </a>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Poster & Stats */}
        <div className="lg:col-span-8 space-y-8">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group"
           >
              <img 
                src={project.image_url} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" 
                alt="" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white opacity-60 mb-2">Primary Asset</p>
                 <h2 className="text-2xl font-black text-white">{project.title}</h2>
              </div>
           </motion.div>

           <div className="bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-10 shadow-2xl space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60 flex items-center gap-2">
                 <Layout className="w-4 h-4" /> System Executive Summary
              </h3>
              <p className="text-lg font-medium text-foreground/90 leading-relaxed italic border-l-4 border-primary/40 pl-6">
                {project.description}
              </p>
           </div>
        </div>

        {/* Right: Technical Specs */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 shadow-2xl space-y-8">
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Deployment Registry</h4>
                 <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                       <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Initial Commit</p>
                       <p className="font-bold text-sm tracking-tighter">{new Date(project.created_at).toLocaleDateString()}</p>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Technology Stack</h4>
                 <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag) => (
                       <span key={tag} className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          <Hash className="w-3 h-3 opacity-60" /> {tag}
                       </span>
                    ))}
                 </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">External Endpoints</h4>
                 <div className="grid grid-cols-1 gap-3">
                    {project.demo_url && (
                       <a href={project.demo_url} target="_blank" className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
                          <span className="text-[10px] font-black tracking-tighter uppercase">Live Environment</span>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                       </a>
                    )}
                    {project.github_url && (
                       <a href={project.github_url} target="_blank" className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
                          <span className="text-[10px] font-black tracking-tighter uppercase">Source Registry</span>
                          <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                       </a>
                    )}
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
