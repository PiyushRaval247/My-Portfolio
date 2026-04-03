"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Briefcase, 
  BookOpen, 
  PlusCircle, 
  PenTool, 
  Sparkles, 
  TrendingUp, 
  Loader2,
  Clock,
  ArrowRight,
  LayoutDashboard
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminOverviewHub() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    drafts: 0,
  });
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    const [pCount, bCount, bRecent] = await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("blogs").select("*", { count: "exact", head: true }),
      supabase.from("blogs").select("id, title, created_at, category").order("created_at", { ascending: false }).limit(3)
    ]);

    setStats({
      projects: pCount.count || 0,
      blogs: bCount.count || 0,
      drafts: 0, // Placeholder
    });
    setRecentBlogs(bRecent.data || []);
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
    <div className="p-4 md:p-12 space-y-12 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 mb-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20 w-fit">
            <LayoutDashboard className="w-3 h-3" />
            Executive Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">System <span className="text-primary italic">Manifest</span></h1>
          <p className="text-muted-foreground font-medium text-lg opacity-80">Welcome back, Architect. Everything is under control.</p>
        </div>
        
        <div className="flex items-center gap-2 px-6 py-4 bg-card/40 backdrop-blur-xl border border-white/5 rounded-[2rem] shadow-2xl">
           <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full relative"></div>
           </div>
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">Database Status</p>
              <h4 className="text-xs font-bold text-green-500 uppercase tracking-tighter">Operational</h4>
           </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { label: "Active Deployments", val: stats.projects, icon: Briefcase, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
          { label: "Published Intelligence", val: stats.blogs, icon: BookOpen, color: "text-secondary", bg: "bg-secondary/10", border: "border-secondary/20" },
          { label: "Digital Growth", val: "+15%", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-card/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all hover:-translate-y-1"
          >
             <div className={`absolute -right-8 -top-8 w-32 h-32 ${stat.bg} rounded-full blur-[60px] group-hover:scale-125 transition-transform`}></div>
             <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-6 opacity-60">{stat.label}</p>
             <div className="flex items-center justify-between">
                <h3 className="text-5xl font-black tracking-tighter">{stat.val}</h3>
                <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center border ${stat.border} shadow-2xl shadow-black/50 rotate-6 group-hover:rotate-0 transition-transform`}>
                   <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Launch & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Quick Actions */}
         <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6 ml-1">Critical Actions</h3>
            
            <Link href="/admin/projects/add" className="flex items-center gap-4 p-5 bg-primary text-primary-foreground rounded-3xl group shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all w-full">
               <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <PlusCircle className="w-6 h-6" />
               </div>
               <div className="text-left flex-1">
                  <h4 className="font-black tracking-tight text-lg leading-tight uppercase italic">Launch Project</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mt-1">Initiate New Deployment</p>
               </div>
               <ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link href="/admin/blogs/add" className="flex items-center gap-4 p-5 bg-card border border-white/10 rounded-3xl group hover:border-secondary transition-all w-full hover:-translate-y-1">
               <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center border border-secondary/20">
                  <PenTool className="w-6 h-6 text-secondary" />
               </div>
               <div className="text-left flex-1">
                  <h4 className="font-black tracking-tight text-lg leading-tight">Write Intelligence</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">AI-Assisted Writing</p>
               </div>
               <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary" />
            </Link>
         </div>

         {/* Activity Log */}
         <div className="lg:col-span-8 bg-card/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-xl font-black tracking-tighter">Story Evolution</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1 opacity-60">Recent Content Deployments</p>
               </div>
               <Link href="/admin/blogs" className="text-xs font-bold text-primary hover:underline flex items-center gap-2">
                  View Full Archive <ArrowRight className="w-3.5 h-3.5" />
               </Link>
            </div>

            <div className="space-y-4 relative z-10">
               {recentBlogs.map((blog) => (
                  <div key={blog.id} className="flex items-center gap-4 p-4 rounded-[1.5rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                     <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center font-bold text-xs shrink-0 border border-white/5 group-hover:border-primary/30 transition-colors">
                        <BookOpen className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{blog.title}</h4>
                        <div className="flex items-center gap-3 mt-1.5">
                           <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-primary/10 text-primary rounded-md">{blog.category}</span>
                           <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
                              <Clock className="w-3 h-3" />
                              {new Date(blog.created_at).toLocaleDateString()}
                           </span>
                        </div>
                     </div>
                     <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </div>
               ))}

               {recentBlogs.length === 0 && (
                  <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                     <Sparkles className="w-10 h-10 text-muted-foreground/20 mx-auto mb-4" />
                     <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">No recent story data detected.</p>
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
