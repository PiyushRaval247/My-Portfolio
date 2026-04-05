"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { 
  ArrowLeft, 
  ArrowRight,
  Calendar, 
  MessageSquare, 
  Share2, 
  User,
  Loader2,
  Clock,
  TrendingUp,
  Link as LinkIcon,
  MoveUpRight,
  Target
} from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
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
      "name": "Daily Blogs",
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
    <div className="pt-28 md:pt-32 pb-32 md:pb-48 px-4 md:px-8 lg:px-12 relative z-10 bg-[#0a0a0a] min-h-screen text-white/90 overflow-hidden md:overflow-visible">
      {/* BlogPosting Schema Embedding */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Progress Bar */}
      <motion.div 
         className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-purple-600 origin-left z-[1000] shadow-[0_0_15px_rgba(var(--primary),0.5)]"
         style={{ scaleX }}
      />
      
      <div className="max-w-[1550px] mx-auto relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <div className="w-full">
             <Link href="/blog" className="inline-flex items-center gap-3 text-sm font-bold text-white/60 hover:text-primary mb-10 md:mb-16 group transition-all">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-500" />
                Back to Articles
             </Link>

             <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-8 md:mb-12 leading-snug tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 break-words w-full">
               {blog.title}
             </h1>
          </div>
          
          {/* Featured Asset */}
          <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-xl overflow-hidden border border-white/10 mb-8 bg-white/5 relative group shadow-2xl shadow-black/50">
            <Image
              src={blog.image_url || "/projects/project.png"}
              alt={blog.title}
              fill
              priority
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
          </div>

          {/* Post Meta & Subtitle underneath Image */}
          <div className="flex flex-col gap-6 md:gap-8 mb-16 md:mb-24">
             {/* Header Metadata */}
             <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <span className="px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                   {blog.category}
                </span>
                <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm font-medium text-white/60">
                   <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      {new Date(blog.created_at).toLocaleDateString()}
                   </div>
                   <div className="flex items-center gap-2 border-l border-white/10 pl-4 md:pl-6">
                      <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      {calculateReadingTime} min read
                   </div>
                </div>
             </div>
             
             {/* Subtitle */}
             <div className="w-full border-l-[3px] border-primary/50 pl-4 md:pl-6 ml-1">
               <p className="text-sm md:text-base lg:text-lg text-white/60 leading-relaxed font-medium break-words w-full">
                 {blog.sub_title}
               </p>
             </div>
          </div>

          {/* Core Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative w-full">
             
             {/* ARTICLE BODY */}
             <div className="lg:col-span-8 w-full max-w-full overflow-hidden shrink-0">
                <article className="prose prose-invert prose-base md:prose-lg lg:prose-xl max-w-none w-full break-words prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl text-white/80 leading-[1.8]">
                   <div 
                     className="magazine-body break-words w-full"
                     style={{ wordBreak: 'break-word', overflowWrap: 'anywhere', whiteSpace: 'pre-wrap' }}
                     dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.description) }}
                   />
                </article>

                {/* Engagement / Sharing */}
                <div className="mt-24 pt-12 border-t border-white/10 flex flex-wrap items-center justify-between gap-8">
                   <div className="flex items-center gap-6">
                      <button 
                         onClick={handleCopyLink}
                         className="flex items-center gap-3 text-sm font-bold text-foreground hover:text-primary transition-colors bg-card/50 border border-white/5 py-3 px-6 rounded-full hover:border-primary/30"
                      >
                         <LinkIcon className="w-4 h-4" />
                         {copied ? "Link Copied!" : "Copy Link"}
                      </button>
                      <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground px-6 py-3 bg-white/5 rounded-full border border-white/5">
                         <MessageSquare className="w-4 h-4 text-primary/70" />
                         {comments.length} Comments
                      </div>
                   </div>
                </div>
             </div>

             {/* SIDEBAR */}
             <aside className="lg:col-span-4 space-y-16 lg:sticky lg:top-32 h-fit">
                
                {/* Trending Content */}
                {popularArticles.length > 0 && (
                   <div className="space-y-8 bg-card/20 p-8 rounded-xl border border-white/5">
                      <h3 className="text-xl font-bold tracking-tight text-foreground border-b border-white/10 pb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Trending Now
                      </h3>
                      <div className="space-y-6 mt-6">
                         {popularArticles.map((item) => (
                            <Link key={item.id} href={`/blog/${item.id}`} className="group flex items-center gap-5 transition-all">
                               <div className="w-20 h-20 shrink-0 rounded-xl border border-white/10 overflow-hidden relative">
                                  <Image 
                                     src={item.image_url} 
                                     alt={item.title}
                                     fill
                                     className="object-cover transition-transform duration-700 group-hover:scale-110" 
                                  />
                               </div>
                               <div className="min-w-0 py-1">
                                  <h4 className="text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2 text-foreground">{item.title}</h4>
                                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-1 group-hover:text-foreground transition-colors">
                                    Read Post <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                  </span>
                               </div>
                            </Link>
                         ))}
                      </div>
                   </div>
                )}

                {/* Newsletter Hub */}
                <div className="bg-card/40 backdrop-blur-xl p-8 rounded-xl border border-white/5 relative overflow-hidden group shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <h4 className="text-xs font-bold uppercase text-primary tracking-widest mb-3">Newsletter</h4>
                    <h3 className="text-xl font-bold text-foreground mb-4">Master the Stack.</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">Stay updated with the latest architecture drops and software techniques.</p>
                    <div className="space-y-3">
                       <input 
                         type="email" 
                         placeholder="Your email address..."
                         className="w-full px-5 py-3.5 bg-background/80 rounded-xl border border-white/10 focus:border-primary/50 outline-none text-sm transition-all shadow-inner"
                       />
                       <button className="w-full bg-gradient-to-r from-primary to-purple-600 text-white hover:opacity-90 py-3.5 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-primary/30">
                          Subscribe
                       </button>
                    </div>
                  </div>
                </div>

             </aside>
          </div>

          {/* Comments Section */}
          <section className="pt-32 mt-32 border-t border-white/10">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
                {/* Form */}
                <div className="space-y-10 bg-card/30 p-8 md:p-12 rounded-xl border border-white/5">
                   <div className="space-y-4">
                      <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                        Join the Discussion
                        <MessageSquare className="w-6 h-6 text-primary" />
                      </h2>
                      <p className="text-sm text-muted-foreground">Share your thoughts or ask a question about this topic.</p>
                   </div>
                   
                   <form onSubmit={handleCommentSubmit} className="space-y-6">
                      <div className="space-y-6">
                         <input
                           type="text"
                           required
                           placeholder="Your Name"
                           value={commentData.name}
                           onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
                           className="w-full px-6 py-4 bg-background/80 rounded-xl border border-white/10 focus:border-primary/50 outline-none transition-all text-sm shadow-inner text-foreground"
                         />
                         <textarea
                           required
                           rows="6"
                           placeholder="Your comment..."
                           value={commentData.content}
                           onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}
                           className="w-full px-6 py-4 bg-background/80 rounded-xl border border-white/10 focus:border-primary/50 outline-none transition-all text-sm leading-relaxed shadow-inner text-foreground resize-none"
                         />
                      </div>
                      <button
                        type="submit"
                        disabled={commentLoading}
                        className="w-full bg-gradient-to-r from-primary to-purple-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:scale-100"
                      >
                        {commentLoading ? <Loader2 className="animate-spin w-6 h-6" /> : (
                          <>
                             Post Comment
                             <MoveUpRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                      {success && (
                        <p className="text-sm font-bold text-emerald-500 text-center mt-4 bg-emerald-500/10 py-3 rounded-lg border border-emerald-500/20">
                           Comment submitted! Pending approval.
                        </p>
                      )}
                   </form>
                </div>

                {/* Comment Feed */}
                <div className="space-y-6">
                   {comments.length === 0 && (
                     <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-card/20 text-muted-foreground">
                        Be the first to share your thoughts!
                     </div>
                   )}
                   {comments.map((comment, idx) => (
                     <div key={comment.id} className="group p-6 bg-card/40 backdrop-blur-sm border border-white/5 rounded-xl relative shadow-lg hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-4 mb-4">
                           <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full border border-primary/20 flex items-center justify-center font-bold text-primary group-hover:scale-110 transition-transform">
                              {(comment?.name?.[0] || 'U').toUpperCase()}
                           </div>
                           <div className="flex flex-col">
                              <h4 className="font-bold text-foreground">{comment.name}</h4>
                              <span className="text-xs font-medium text-muted-foreground">Community Member</span>
                           </div>
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed pl-16">
                           {comment.content}
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
