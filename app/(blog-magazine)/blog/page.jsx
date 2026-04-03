"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Loader2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  MoveUpRight,
  Target
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// --- SUB-COMPONENTS ---

const FeaturedCarousel = ({ blogs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (blogs.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % blogs.length);
    }, 12000);
    return () => clearInterval(timer);
  }, [blogs.length]);

  if (!blogs.length) return null;

  const currentBlog = blogs[currentIndex];

  const next = () => setCurrentIndex((prev) => (prev + 1) % blogs.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);

  return (
    <div className="relative w-full aspect-[21/10] md:aspect-[25/9] mb-32 group overflow-hidden bg-white border border-black/10 rounded-none shadow-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBlog.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 grid grid-cols-1 md:grid-cols-12"
        >
          {/* TEXT SIDE: SHARP & ARCHITECTURAL */}
          <div className="md:col-span-5 p-12 lg:p-20 flex flex-col justify-center bg-[#fdfdfd] relative z-10 border-r border-black/10 text-black">
             <motion.div 
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="mb-10 flex items-center gap-3"
             >
                <div className="w-10 h-1.5 bg-[#008060] rounded-none"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40 italic leading-none">
                   SERIES {currentIndex + 1}
                </span>
             </motion.div>
             
             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, duration: 1.2 }}
               className="serif-font text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.04em] text-black leading-[1] mb-12 uppercase italic"
             >
               {currentBlog.title}
             </motion.h1>

             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.8 }}
               className="text-xs md:text-sm text-black/50 leading-relaxed italic mb-14 max-w-sm border-l border-black/20 pl-8"
             >
                {currentBlog.sub_title}
             </motion.p>
             
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.9 }}
             >
                <Link 
                  href={`/blog/${currentBlog.id}`}
                  className="inline-flex items-center gap-5 text-[11px] font-black uppercase tracking-[0.4em] text-black hover:text-[#008060] transition-all group italic border-2 border-black/5 px-10 py-5 rounded-none hover:bg-black hover:text-white"
                >
                  ACCESS DISPATCH
                  <MoveUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
             </motion.div>

             {/* Minimalist Progress Meter */}
             <div className="absolute bottom-12 left-12 lg:left-20 flex items-center gap-8">
                <span className="text-[10px] font-black text-black font-mono tracking-tighter">0{currentIndex + 1}</span>
                <div className="h-px w-16 bg-black/5 relative">
                   <motion.div 
                      key={currentIndex}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 12, ease: "linear" }}
                      className="absolute inset-0 bg-[#008060] origin-left"
                   />
                </div>
                <span className="text-[10px] font-black text-black/20 font-mono tracking-tighter">0{blogs.length}</span>
             </div>
          </div>

          {/* IMAGE SIDE: NEXT/IMAGE INTEGRATION */}
          <div className="md:col-span-7 relative h-full overflow-hidden bg-slate-50">
            <Image
              src={currentBlog.image_url || "/projects/project.png"}
              alt={currentBlog.title}
              fill
              priority
              className="object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-black/5 mix-blend-multiply opacity-0 hover:opacity-100 transition-opacity" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Control Cluster (Sharp Edges) */}
      <div className="absolute bottom-0 right-0 flex z-30 opacity-0 group-hover:opacity-100 transition-all duration-700">
         <button onClick={prev} className="w-16 h-16 flex items-center justify-center bg-white border-l border-t border-black/10 hover:bg-black hover:text-white transition-all text-black/30">
            <ChevronLeft className="w-6 h-6" />
         </button>
         <button onClick={next} className="w-16 h-16 flex items-center justify-center bg-white border-l border-t border-black/10 hover:bg-black hover:text-white transition-all text-black/30">
            <ChevronRight className="w-6 h-6" />
         </button>
      </div>
    </div>
  );
};

const Sidebar = ({ popular, categories, onCategorySelect, activeCategory }) => {
  return (
    <div className="space-y-24 h-fit lg:sticky lg:top-48">
      {/* Editorial Subscription: ZERO RADIUS */}
      <div className="bg-[#fdfdfd] p-12 border border-black/10 relative overflow-hidden group">
        <div className="relative z-10 text-black">
          <span className="text-[9px] font-black text-[#008060] uppercase tracking-[0.6em] mb-6 block italic">PROTOCOL: SYNC</span>
          <h3 className="serif-font text-3xl font-black mb-8 text-black tracking-tighter uppercase italic leading-none border-b-2 border-dashed border-black/5 pb-4">Stay Intel.</h3>
          <p className="text-[11px] text-black/40 font-medium mb-12 leading-relaxed italic pr-8 opacity-90">Operational transmissions sent weekly to the intelligence stream.</p>
          
          <div className="space-y-4">
             <input 
               type="email" 
               placeholder="Operational Address..." 
               className="w-full px-8 py-6 bg-transparent rounded-none border border-black/10 focus:border-black outline-none transition-all text-[10px] font-black italic text-black placeholder:opacity-20 uppercase tracking-[0.4em]"
             />
             <button className="w-full bg-black text-white py-6 rounded-none font-black uppercase tracking-[0.5em] text-[10px] hover:bg-[#008060] transition-all italic">
                INITIALIZE ACCESS
             </button>
          </div>
        </div>
      </div>

      {/* Trending Intel */}
      <div className="space-y-12">
        <h3 className="serif-font font-black text-black text-2xl tracking-tighter italic uppercase border-b border-black/10 pb-6 leading-none">Trending intelligence</h3>
        
        <div className="space-y-12">
           {popular.map((blog) => (
             <Link 
               key={blog.id} 
               href={`/blog/${blog.id}`}
               className="flex items-start gap-8 group transition-all"
             >
                <div className="w-20 h-20 shrink-0 rounded-none border border-black/10 overflow-hidden bg-slate-50 relative">
                   <Image 
                      src={blog.image_url || "/projects/project.png"} 
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                   />
                </div>
                <div className="min-w-0">
                   <h5 className="text-[12px] font-black leading-snug group-hover:text-[#008060] transition-all mb-3 underline decoration-black/5 underline-offset-4 line-clamp-2 italic uppercase tracking-tight text-black">{blog.title}</h5>
                   <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-black/20 italic">
                      <Target className="w-3.5 h-3.5 opacity-30" />
                      <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                   </div>
                </div>
             </Link>
           ))}
        </div>
      </div>

      {/* Operational Index */}
      <div className="space-y-12">
        <h3 className="serif-font font-black text-black text-2xl tracking-tighter italic uppercase border-b border-black/10 pb-6 leading-none">Topic Index</h3>
        <div className="flex flex-col gap-6">
           {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => onCategorySelect(cat)}
               className={`text-left text-[11px] font-black uppercase tracking-[0.5em] transition-all hover:text-[#008060] italic flex items-center justify-between group ${
                 activeCategory === cat ? "text-[#008060]" : "text-black/30"
               }`}
             >
                {cat}
                <div className={`h-[2px] w-8 bg-[#008060] transition-all group-hover:w-20 ${activeCategory === cat ? "opacity-100" : "opacity-0 invisible"}`}></div>
             </button>
           ))}
        </div>
      </div>
    </div>
  );
};

const ArticleCard = ({ blog }) => (
  <Link
    href={`/blog/${blog.id}`}
    className="group flex flex-col h-full bg-white border border-black/10 rounded-none overflow-hidden hover:border-black transition-all duration-700 relative bg-[#fdfdfd]"
  >
    <div className="relative aspect-[16/11] overflow-hidden bg-slate-50">
      <Image
        src={blog.image_url || "/projects/project.png"}
        alt={blog.title}
        fill
        className="object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
      />
      <div className="absolute top-0 right-0 z-20">
        <span className="px-6 py-3 bg-black text-[9px] font-black text-white uppercase tracking-[0.5em] italic">
           {blog.category}
        </span>
      </div>
    </div>
    
    <div className="p-12 flex flex-col flex-1 border-t border-black/10 text-black">
      <h3 className="serif-font text-2xl md:text-3xl font-black tracking-[-0.04em] mb-8 group-hover:text-[#008060] transition-all leading-[1.05] line-clamp-3 text-black italic uppercase">
        {blog.title}
      </h3>
      
      <p className="text-[12px] text-black/40 font-medium mb-16 leading-relaxed line-clamp-4 italic opacity-80 group-hover:text-black/60 transition-colors border-l border-black/10 pl-10">
        {blog.sub_title || blog.description.substring(0, 150) + "..."}
      </p>
      
      <div className="mt-auto pt-10 border-t border-dashed border-black/10 flex items-center justify-between text-black/15 font-black uppercase text-[9px] tracking-[0.5em] italic leading-none">
         <div className="flex items-center gap-4">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(blog.created_at).toLocaleDateString()}
         </div>
         <div className="group-hover:text-black transition-all flex items-center gap-4 leading-none">
            READ DATA
            <MoveUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
         </div>
      </div>
    </div>
  </Link>
);

// --- MAIN PAGE WRAPPER ---

function BlogSearchContent() {
  const [blogs, setBlogs] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (!error) {
      setBlogs(data);
      setFeatured(data.filter(b => b.is_featured));
    }
    setLoading(false);
  };

  const categories = ["All", ...new Set(blogs.map((b) => b.category))];
  
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(q.toLowerCase()) || 
                          blog.sub_title?.toLowerCase().includes(q.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredInCarousel = featured.length > 0 ? featured : (blogs.slice(0, 1) || []);
  const carouselIds = featuredInCarousel.map(b => b.id);
  const listBlogs = filteredBlogs.filter(b => !carouselIds.includes(b.id));
  const popularBlogs = blogs.slice(0, 5);

  if (loading) {
    return (
      <div className="py-60 flex flex-col items-center justify-center gap-8 bg-[#fdfdfd] min-h-screen text-black">
         <Loader2 className="w-16 h-16 animate-spin text-[#008060] opacity-40" />
         <p className="text-[12px] font-black uppercase tracking-[0.5em] text-black/20 animate-pulse italic leading-none">DECRYPTING ARCHIVES...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 lg:pt-48 pb-48 px-6 md:px-12 max-w-[1550px] mx-auto overflow-hidden bg-[#fdfdfd] relative min-h-screen text-black">
      {/* Minimal Background Noise */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.012] grayscale pointer-events-none z-[0]" />
      
      {/* Search HUD Feedback: SHARP */}
      {q && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-20 flex items-center gap-12 group text-black"
        >
           <h2 className="serif-font text-5xl md:text-8xl font-black italic uppercase tracking-[-0.06em]">Index: <span className="text-[#008060] underline decoration-black/5 underline-offset-[20px]">{q}</span></h2>
           <div className="h-[2px] flex-1 bg-black/5" />
           <span className="text-[12px] font-black uppercase tracking-[0.6em] text-black/10 italic leading-none">{filteredBlogs.length} Results Found</span>
        </motion.div>
      )}

      {/* Featured Section (Carousel) - Sharp Editorial Redesign */}
      {!q && selectedCategory === "All" && (
         <FeaturedCarousel blogs={featuredInCarousel} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-32 relative z-10 mt-12 text-black">
        {/* Main Feed */}
        <div className="space-y-32">
           <div className="flex items-center justify-between border-b-2 border-black pb-12 mb-24">
             <h2 className="serif-font text-4xl md:text-5xl font-black tracking-[-0.05em] text-black italic uppercase underline decoration-black/5 underline-offset-[16px] leading-none">Intelligence Stream</h2>
             <div className="flex items-center gap-12">
                <span className="text-[12px] font-black uppercase tracking-[0.8em] text-black/10 italic leading-none">STATUS: STABLE</span>
                <div className="w-3 h-3 bg-[#008060] rounded-none"></div>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <AnimatePresence mode="popLayout">
                {listBlogs.map((blog, idx) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 1, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ArticleCard blog={blog} />
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>

           {filteredBlogs.length === 0 && (
             <div className="text-center py-64 border-2 border-dashed border-black/10 rounded-none bg-[#fdfdfd] text-black">
                <Sparkles className="w-32 h-32 text-black/5 mx-auto mb-12" />
                <h3 className="text-sm font-black uppercase tracking-[0.8em] italic text-black/10 leading-none">Archive Data Not Found</h3>
             </div>
           )}
        </div>

        {/* Sidebar */}
        <Sidebar 
          popular={popularBlogs} 
          categories={categories} 
          onCategorySelect={setSelectedCategory} 
          activeCategory={selectedCategory} 
        />
      </div>
    </div>
  );
}

export default function BlogListingPage() {
  return (
    <Suspense fallback={
      <div className="py-60 flex flex-col items-center justify-center gap-8 bg-[#fdfdfd] min-h-screen text-black">
         <Loader2 className="w-16 h-16 animate-spin text-[#008060] opacity-40" />
      </div>
    }>
      <BlogSearchContent />
    </Suspense>
  );
}
