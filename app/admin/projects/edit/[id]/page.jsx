"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Edit3 } from "lucide-react";
import Link from "next/link";
import AdminProjectForm from "@/components/AdminProjectForm";
import { motion } from "framer-motion";

export default function EditProjectPage({ params }) {
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
    <div className="p-4 md:p-12 space-y-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <Link href="/admin/projects" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all mb-4 group w-fit">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Inventory
          </Link>
          <div className="flex items-center gap-2 mb-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20 w-fit">
            <Edit3 className="w-3.5 h-3.5" />
            System Reconfiguration
          </div>
          <h1 className="text-4xl font-black tracking-tighter">Edit <span className="text-primary italic">Project</span></h1>
          <p className="text-muted-foreground font-medium text-sm border-l-2 border-primary/30 pl-3 opacity-80">Modify and synchronize your existing deployment parameters.</p>
        </div>
      </div>

      {/* Main Form Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AdminProjectForm 
          project={project}
          onComplete={() => router.push("/admin/projects")} 
          onCancel={() => router.push("/admin/projects")}
        />
      </motion.div>
    </div>
  );
}
