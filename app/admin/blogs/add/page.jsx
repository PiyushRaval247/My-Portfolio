"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import AdminBlogForm from "@/components/AdminBlogForm";
import { motion } from "framer-motion";

export default function AddBlogPage() {
  const router = useRouter();

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
            <Sparkles className="w-3.5 h-3.5" />
            AI Creative Lab
          </div>
          <h1 className="text-4xl font-black tracking-tighter">Draft <span className="text-secondary italic">Manifesto</span></h1>
          <p className="text-muted-foreground font-medium text-sm border-l-2 border-secondary/30 pl-3 opacity-80">Synthesize and deploy your next high-impact intelligence story.</p>
        </div>
      </div>

      {/* Main Workspace */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AdminBlogForm 
          onComplete={() => router.push("/admin/blogs")} 
          onCancel={() => router.push("/admin/blogs")}
        />
      </motion.div>
    </div>
  );
}
