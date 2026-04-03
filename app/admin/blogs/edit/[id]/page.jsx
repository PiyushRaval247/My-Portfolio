"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Edit3, BookOpen } from "lucide-react";
import Link from "next/link";
import AdminBlogForm from "@/components/AdminBlogForm";
import { motion } from "framer-motion";

export default function EditBlogPage({ params }) {
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

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 md:pt-12 space-y-10 max-w-7xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <Link href="/admin/blogs" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-secondary transition-all mb-4 group w-fit">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Story Archive
          </Link>
          <div className="flex items-center gap-2 mb-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest border border-secondary/20 w-fit font-mono">
            <Edit3 className="w-3.5 h-3.5" />
            Intel Reconfiguration
          </div>
          <h1 className="text-4xl font-black tracking-tighter">Edit <span className="text-secondary italic">Story</span></h1>
          <p className="text-muted-foreground font-medium text-sm border-l-2 border-secondary/30 pl-3 opacity-80">Modify and synchronize your existing intelligence deployments.</p>
        </div>
      </div>

      {/* Main Workspace */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AdminBlogForm 
          blog={blog}
          onComplete={() => router.push("/admin/blogs")} 
          onCancel={() => router.push("/admin/blogs")}
        />
      </motion.div>
    </div>
  );
}
