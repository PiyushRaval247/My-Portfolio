"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink,
  Github, 
  Loader2, 
  Briefcase,
  Search,
  LayoutList,
  Eye,
  Rocket
} from "lucide-react";
import Link from "next/link";

export default function ProjectInventoryPage() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error) setProjects(data);
    setLoading(false);
  };

  const handleDelete = async (project) => {
    if (window.confirm(`⚠️ ATTENTION: System will permanently delete "${project.title}". Proceed?`)) {
      if (project.image_url) {
        const fileName = project.image_url.split("/").pop();
        await supabase.storage.from("portfolio").remove([`project-images/${fileName}`]);
      }
      const { error } = await supabase.from("projects").delete().eq("id", project.id);
      if (!error) fetchProjects();
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.tags?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading && projects.length === 0) {
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
           <div className="w-14 h-14 bg-primary/10 rounded-[1.5rem] flex items-center justify-center border border-primary/20 shadow-2xl shadow-primary/10">
              <Rocket className="text-primary w-7 h-7" />
           </div>
           <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter">Project <span className="text-primary italic">Inventory</span></h1>
              <div className="flex items-center gap-2 mt-1">
                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">System Registry</span>
                 <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                 <span className="text-[10px] font-black text-primary font-mono">{projects.length} Total Deployments</span>
              </div>
           </div>
        </div>
        
        <Link
          href="/admin/projects/add"
          className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-xs group w-fit"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Launch Project
        </Link>
      </div>

      {/* Modern Control Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 py-2">
         <div className="relative flex-1 w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
            <input 
               type="text" 
               placeholder="Search by title, stack, or tech..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-14 pr-6 py-4 bg-card/40 backdrop-blur-3xl rounded-[1.5rem] border border-white/5 focus:border-primary/40 outline-none transition-all text-xs font-bold placeholder:opacity-50"
            />
         </div>
      </div>

      {/* Professional List View */}
      <div className="space-y-3">
        {/* Table Header (Desktop Only) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
           <div className="col-span-5">Project Details</div>
           <div className="col-span-3">Stack / Technology</div>
           <div className="col-span-4 text-right">Operations</div>
        </div>

        {filteredProjects.map((project, idx) => (
          <div 
            key={project.id}
            className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 p-4 md:p-5 md:px-8 bg-card/30 backdrop-blur-xl border border-white/5 rounded-[2rem] hover:border-primary/30 transition-all duration-300 group hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

            {/* Col 1: Details */}
            <div className="col-span-5 flex items-center gap-5 min-w-0">
               <div className="w-20 h-14 md:w-24 md:h-16 rounded-xl overflow-hidden border border-white/5 shrink-0 relative group/pic shadow-xl">
                  <img 
                    src={project.image_url} 
                    className="w-full h-full object-cover grayscale group-hover/pic:grayscale-0 transition-all duration-500 group-hover/pic:scale-110" 
                    alt="" 
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover/pic:opacity-100 transition-opacity"></div>
               </div>
               <div className="min-w-0">
                  <h3 className="text-base font-black tracking-tight truncate group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-[10px] text-muted-foreground line-clamp-1 font-medium mt-0.5 opacity-60">Created {new Date(project.created_at).toLocaleDateString()}</p>
               </div>
            </div>

            {/* Col 2: Stack */}
            <div className="col-span-3 flex flex-wrap gap-1.5 overflow-hidden">
               {project.tags?.slice(0, 3).map(tag => (
                 <span key={tag} className="px-2 py-0.5 bg-white/5 rounded-md text-[9px] font-black uppercase tracking-widest text-muted-foreground border border-white/5">
                    {tag}
                 </span>
               ))}
               {project.tags?.length > 3 && (
                 <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-[9px] font-black tracking-widest">
                    +{project.tags.length - 3}
                 </span>
               )}
            </div>

            {/* Col 3: Actions */}
            <div className="col-span-4 flex items-center justify-end gap-3">
               <Link 
                 href={`/admin/projects/view/${project.id}`} 
                 className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all group/btn"
               >
                  <Eye className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" /> 
                  <span className="hidden lg:inline">View</span>
               </Link>
               <Link 
                 href={`/admin/projects/edit/${project.id}`} 
                 className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-primary/20 transition-all group/btn"
               >
                  <Edit3 className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" /> 
                  <span className="hidden lg:inline">Edit</span>
               </Link>
               <button 
                 onClick={() => handleDelete(project)}
                 className="p-2.5 bg-destructive/5 hover:bg-destructive text-destructive/60 hover:text-white rounded-xl transition-all border border-destructive/10 group/btn"
                 title="Destroy Deployment"
               >
                  <Trash2 className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}

        {!loading && filteredProjects.length === 0 && (
          <div className="py-40 text-center border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.02]">
            <LayoutList className="text-muted-foreground/20 w-16 h-16 mx-auto mb-6" />
            <h3 className="text-xl font-black tracking-tight">System Registry Empty</h3>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto font-medium opacity-60 italic text-sm">Refine your search or deploy your first technical project.</p>
          </div>
        )}
      </div>
    </div>
  );
}
