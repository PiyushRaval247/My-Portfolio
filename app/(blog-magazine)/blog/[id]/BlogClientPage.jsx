"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { 
  ArrowLeft, 
  Calendar, 
  MessageSquare, 
  Share2, 
  User,
  Send,
  Loader2,
  CheckCircle,
  Hash,
  Clock,
  TrendingUp,
  Link as LinkIcon,
  MoveUpRight,
  Target
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import DOMPurify from "dompurify";

export default function BlogClientPage({ blog, initialComments, latestArticles = [], popularArticles = [] }) {
  const [comments, setComments] = useState(initialComments || []);
  const [commentLoading, setCommentLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [commentData, setCommentData] = useState({
    name: "",
    content: ""
  });

  const calculateReadingTime = useMemo(() => {
    const text = blog.description || "";
    const words = text.split(/\s+/).length;
    return Math.ceil(words / 200);
  }, [blog.description]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentLoading(true);

    const { error } = await supabase
      .from("comments")
      .insert([{
        blog_id: blog.id,
        name: commentData.name,
        content: commentData.content,
        is_approved: false
      }]);

    if (!error) {
      setSuccess(true);
      setCommentData({ name: "", content: "" });
      setTimeout(() => setSuccess(false), 5000);
    }
    setCommentLoading(false);
  };

  const sanitizeHtml = (html) => {
    if (typeof window === "undefined") return html;
    return DOMPurify.sanitize(html);
  };

  // Elite SEO Intelligence: BlogPosting Schema
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.sub_title,
    "image": blog.image_url,
    "author": {
      "@type": "Person",
      "name": "Piyush Raval",
      "url": "https://piyushraval.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Piyush Press",
      "logo": {
        "@type": "ImageObject",
        "url": "https://piyushraval.com/icon.png"
      }
    },
    "datePublished": blog.created_at,
    "dateModified": blog.updated_at || blog.created_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://piyushraval.com/blog/${blog.id}`
    }
  };

  return (
    <div className="pt-32 pb-48 px-6 md:px-12 relative z-10 bg-[#fdfdfd] min-h-screen text-black">
      {/* BlogPosting Schema Embedding */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Sharp Progress Bar (Zero Radius) */}
      <motion.div 
         className="fixed top-0 left-0 right-0 h-2 bg-[#008060] origin-left z-[1000]"
         style={{ scaleX }}
      />
      
      {/* Background Grain/Noise Overlay */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] grayscale pointer-events-none z-[-1]" />

      <div className="max-w-[1550px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-4xl">
             <Link href="/blog" className="inline-flex items-center gap-5 text-[11px] font-black italic uppercase tracking-[0.4em] text-black/30 hover:text-[#008060] mb-20 group transition-all">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-3 transition-transform duration-700" />
                Index of Dispatches
             </Link>

             {/* Header Metadata: SHARP & ARCHITECTURAL */}
             <div className="flex items-center gap-10 mb-12">
                <div className="w-12 h-[2px] bg-[#008060]"></div>
                <span className="text-[11px] font-black text-[#008060] uppercase tracking-[0.5em] italic">
                   {blog.category}
                </span>
                <div className="h-px flex-1 bg-black/5" />
                <div className="flex items-center gap-10 text-[10px] text-black/30 font-black uppercase tracking-[0.5em] italic leading-none">
                   <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 opacity-40" />
                      {new Date(blog.created_at).toLocaleDateString()}
                   </div>
                   <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 opacity-40" />
                      {calculateReadingTime} MIN DATA
                   </div>
                </div>
             </div>

             <h1 className="serif-font text-5xl md:text-6xl lg:text-8xl font-black mb-16 leading-[0.95] tracking-[-0.045em] text-black italic uppercase border-b-2 border-black/5 pb-16">
               {blog.title}
             </h1>
          </div>
          
          <div className="max-w-3xl mb-32 border-l border-black/10 pl-12">
            <p className="text-xl md:text-2xl text-black/40 italic leading-relaxed font-medium">
              {blog.sub_title}
            </p>
          </div>

          {/* Featured Asset: ELITE NEXT/IMAGE FRAME */}
          <div className="aspect-[21/9] w-full rounded-none overflow-hidden border border-black/10 mb-32 bg-slate-100 relative group">
            <Image
              src={blog.image_url || "/projects/project.png"}
              alt={blog.title}
              fill
              priority
              className="object-cover transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/5 mix-blend-multiply transition-opacity group-hover:opacity-0" />
          </div>

          {/* Core Layout: 850px Reading Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 relative">
             
             {/* ARTICLE BODY (Architectural Hierarchy) */}
             <div className="lg:col-span-8">
                <article className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:serif-font prose-headings:font-black prose-headings:tracking-tighter prose-headings:italic prose-p:leading-loose prose-p:text-black/70 prose-p:mb-12 text-black/80 font-medium italic">
                   <div 
                     className="whitespace-normal magazine-body"
                     dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.description) }}
                   />
                </article>

                {/* Tactical Engagement: Sharp Sharing */}
                <div className="mt-32 pt-16 border-t-2 border-black flex flex-wrap items-center justify-between gap-12">
                   <div className="flex items-center gap-12">
                      <button 
                         onClick={handleCopyLink}
                         className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.5em] text-black hover:text-[#008060] transition-all italic group underline decoration-black/10 underline-offset-8"
                      >
                         <LinkIcon className="w-4 h-4 group-hover:scale-125 transition-transform" />
                         {copied ? "DATA SYNCED" : "COPY TRANS. URL"}
                      </button>
                      <button className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.5em] text-black/20 hover:text-black transition-all italic group">
                         <MessageSquare className="w-4 h-4 opacity-30" />
                         {comments.length} REGISTERED RESPONSES
                      </button>
                   </div>
                   <Link href="/blog" className="text-[10px] font-black text-black/15 uppercase tracking-[0.8em] italic leading-none hover:text-black transition-colors">
                      END TERMINAL DISPATCH
                   </Link>
                </div>
             </div>

             {/* SIDEBAR: SHARP & MINIMAL */}
             <aside className="lg:col-span-4 space-y-24 lg:sticky lg:top-48 h-fit">
                
                {/* Trending Content: Next/Image optimized */}
                {popularArticles.length > 0 && (
                   <div className="space-y-12">
                      <h3 className="serif-font text-2xl font-black italic tracking-tighter text-black uppercase border-b border-black/10 pb-6">Trending now</h3>
                      <div className="space-y-12 mt-12">
                         {popularArticles.map((item) => (
                            <Link key={item.id} href={`/blog/${item.id}`} className="group flex items-start gap-8 transition-all">
                               <div className="w-24 h-24 shrink-0 rounded-none border border-black/10 overflow-hidden bg-slate-100 relative">
                                  <Image 
                                     src={item.image_url} 
                                     alt={item.title}
                                     fill
                                     className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                                  />
                                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                               </div>
                               <div className="min-w-0 py-1">
                                  <h4 className="text-[13px] font-black leading-tight group-hover:text-[#008060] transition-all line-clamp-2 uppercase italic tracking-tight mb-3 underline decoration-black/5 underline-offset-4">{item.title}</h4>
                                  <span className="text-[9px] font-black uppercase tracking-[0.5em] text-black/15 italic">ACCESS DATA</span>
                               </div>
                            </Link>
                         ))}
                      </div>
                   </div>
                )}

                {/* Newsletter Hub: Sharp-Edged */}
                <div className="bg-[#fdfdfd] p-12 border border-black/10 space-y-8 relative overflow-hidden group">
                  <h4 className="text-[10px] font-black uppercase text-[#008060] tracking-[0.5em] italic">Operational Protocol</h4>
                  <p className="text-[12px] text-black/40 leading-relaxed italic font-medium pr-8">Synchronize with our technical focus. Architectural transmissions sent weekly.</p>
                  <div className="space-y-4 pt-4">
                     <input 
                       type="email" 
                       placeholder="Operational Email..."
                       className="w-full px-8 py-6 bg-transparent rounded-none border border-black/10 focus:border-black outline-none text-[10px] font-black italic tracking-[0.4em] uppercase transition-all"
                     />
                     <button className="w-full bg-black text-white hover:bg-[#008060] py-6 rounded-none text-[11px] font-black uppercase tracking-[0.6em] transition-all shadow-none italic">
                        INITIALIZE ACCESS
                     </button>
                  </div>
                </div>

             </aside>
          </div>

          {/* Intelligence Stream: Zero Radius Comments */}
          <section className="pt-48 border-t-2 border-black">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-start">
                {/* Form: Architectural Layout */}
                <div className="space-y-16">
                   <div className="space-y-6">
                      <h2 className="serif-font text-6xl font-black tracking-[-0.05em] italic uppercase">Intelligence Feed</h2>
                      <div className="h-[2px] w-32 bg-[#008060]"></div>
                      <p className="text-[12px] font-black text-black/20 uppercase tracking-[0.6em] italic">Contribute to the technical investigation log.</p>
                   </div>
                   
                   <form onSubmit={handleCommentSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 gap-8">
                         <input
                           type="text"
                           required
                           placeholder="Operational Name"
                           value={commentData.name}
                           onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
                           className="w-full px-10 py-7 bg-transparent rounded-none border-b border-black/10 focus:border-black outline-none transition-all text-[12px] font-black italic tracking-[0.5em] text-black"
                         />
                         <textarea
                           required
                           rows="8"
                           placeholder="Technical insight/Transmission payload..."
                           value={commentData.content}
                           onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}
                           className="w-full px-10 py-8 bg-transparent rounded-none border-b border-black/10 focus:border-black outline-none transition-all text-base leading-loose font-medium italic text-black"
                         />
                      </div>
                      <button
                        type="submit"
                        disabled={commentLoading}
                        className="w-full bg-black text-white py-8 rounded-none font-black uppercase tracking-[0.6em] flex items-center justify-center gap-6 hover:bg-[#008060] transition-all text-[12px] italic"
                      >
                        {commentLoading ? <Loader2 className="animate-spin w-8 h-8" /> : (
                          <>
                             DEPLOY PAYLOAD
                             <MoveUpRight className="w-6 h-6" />
                          </>
                        )}
                      </button>
                      {success && (
                        <p className="text-[11px] font-black uppercase tracking-[0.6em] text-green-600 text-center italic mt-10">
                           SYNCING TRANSMISSION. ARCHIVE LOG PENDING.
                        </p>
                      )}
                   </form>
                </div>

                {/* Comment Waterfall: Sharp Corners */}
                <div className="space-y-20 pt-10">
                   {comments.map((comment, idx) => (
                     <div key={comment.id} className="group space-y-6 relative border-l-2 border-black/5 pl-12 pb-12">
                        <div className="absolute top-0 -left-[5px] w-[8px] h-[8px] bg-black opacity-10 group-hover:opacity-100 group-hover:bg-[#008060] transition-all"></div>
                        <div className="flex items-center gap-10">
                           <div className="w-16 h-16 bg-black/[0.03] rounded-none border border-black/10 flex items-center justify-center font-black uppercase italic text-black/20 group-hover:bg-black group-hover:text-white transition-all duration-700">
                              {(comment?.name?.[0] || 'U').toUpperCase()}
                           </div>
                           <div className="flex flex-col">
                              <h4 className="font-black text-xl italic uppercase tracking-tighter leading-none mb-2">{comment.name}</h4>
                              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/15 italic">Transmission Received</span>
                           </div>
                        </div>
                        <p className="text-base text-black/40 leading-loose italic max-w-lg group-hover:text-black transition-colors">
                           "{comment.content}"
                        </p>
                     </div>
                   ))}
                </div>
             </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
