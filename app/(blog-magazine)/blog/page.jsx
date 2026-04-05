"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { 
  Calendar, 
  ArrowRight, 
  Loader2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Target,
  Search
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
    <div className="relative w-full mb-16 md:mb-24 group overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex flex-col md:flex-row md:aspect-[25/9]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBlog.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 hidden md:grid md:grid-cols-12" // Desktop Layout Absolute layer
        >
          {/* DESKTOP TEXT SIDE */}
          <div className="md:col-span-6 p-10 lg:p-16 flex flex-col justify-center relative z-10 w-full h-full">
             <motion.div 
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="mb-6 flex items-center gap-3"
             >
                <div className="w-8 h-1 bg-gradient-to-r from-primary to-purple-600 rounded-full"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                   Featured Post
                </span>
             </motion.div>
             
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, duration: 0.8 }}
               className="text-4xl lg:text-5xl font-black tracking-tight text-white/90 leading-[1.1] mb-6"
             >
               {currentBlog.title}
             </motion.h1>

             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.7 }}
               className="text-white/60 leading-relaxed mb-10 max-w-sm line-clamp-3"
             >
                {currentBlog.sub_title || currentBlog.description.substring(0, 100)}
             </motion.p>
             
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.8 }}
             >
                <Link 
                  href={`/blog/${currentBlog.id}`}
                  className="inline-flex items-center gap-3 text-sm font-bold text-white bg-gradient-to-r from-primary to-purple-600 px-6 py-3 rounded-full hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all hover:scale-105 group"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
             </motion.div>

             {/* Desktop Progress Indicators */}
             <div className="absolute bottom-8 left-10 lg:left-16 flex gap-2">
                {blogs.map((_, idx) => (
                  <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]' : 'w-2 bg-white/20'}`} />
                ))}
             </div>
          </div>

          {/* DESKTOP IMAGE SIDE */}
          <div className="md:col-span-6 relative h-full overflow-hidden right-0 clip-path-slant group-hover:scale-105 transition-transform duration-1000">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 hidden md:block w-48 -left-1" />
            <Image
              src={currentBlog.image_url || "/projects/project.png"}
              alt={currentBlog.title}
              fill
              priority
              className="object-cover opacity-80"
            />
          </div>
        </motion.div>

        {/* MOBILE LAYOUT (Responsive Flex) */}
        <motion.div
          key={`mobile-${currentBlog.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:hidden w-full"
        >
          {/* Mobile Image */}
          <div className="relative w-full h-[250px] overflow-hidden rounded-t-xl">
            <Image
              src={currentBlog.image_url || "/projects/project.png"}
              alt={currentBlog.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
            
            <div className="absolute bottom-4 left-6 z-20 flex items-center gap-2">
              <div className="w-6 h-1 bg-primary rounded-full"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary shadow-black drop-shadow-md">
                Featured
              </span>
            </div>
          </div>
          
          {/* Mobile Text Content */}
          <div className="p-6 md:p-8 flex flex-col items-center text-center relative z-10 w-full h-full pb-12">
             <h1 className="text-3xl font-black tracking-tight text-white/90 leading-[1.15] mb-4">
               {currentBlog.title}
             </h1>

             <p className="text-sm text-white/60 leading-relaxed mb-8 line-clamp-3">
                {currentBlog.sub_title || currentBlog.description.substring(0, 100)}
             </p>
             
             <Link 
               href={`/blog/${currentBlog.id}`}
               className="w-full justify-center inline-flex items-center gap-3 text-sm font-bold text-white bg-gradient-to-r from-primary to-purple-600 px-6 py-4 rounded-full transition-all active:scale-95"
             >
               Read Article
               <ArrowRight className="w-4 h-4" />
             </Link>

             {/* Mobile Progress */}
             <div className="mt-8 flex gap-2 justify-center">
                {blogs.map((_, idx) => (
                  <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]' : 'w-2 bg-white/20'}`} />
                ))}
             </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Control Cluster (Desktop Mode Only) */}
      {blogs.length > 1 && (
        <div className="absolute bottom-8 right-8 hidden md:flex gap-3 z-30">
           <button onClick={prev} className="w-10 h-10 rounded-full flex items-center justify-center bg-[#0a0a0a]/50 backdrop-blur-md border border-white/10 hover:border-primary/50 hover:text-primary transition-all text-white/90">
              <ChevronLeft className="w-5 h-5" />
           </button>
           <button onClick={next} className="w-10 h-10 rounded-full flex items-center justify-center bg-[#0a0a0a]/50 backdrop-blur-md border border-white/10 hover:border-primary/50 hover:text-primary transition-all text-white/90">
              <ChevronRight className="w-5 h-5" />
           </button>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ popular, categories, onCategorySelect, activeCategory }) => {
  return (
    <div className="space-y-12 md:space-y-16 h-fit lg:sticky lg:top-32">
      {/* Newsletter */}
      <div className="bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-xl border border-white/5 relative overflow-hidden group shadow-lg shadow-black/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 text-white/90">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-4 block">Newsletter</span>
          <h3 className="text-2xl font-black mb-3 tracking-tight">Stay updated.</h3>
          <p className="text-sm text-white/60 mb-6 leading-relaxed">Get the latest articles and insights directly in your inbox.</p>
          
          <div className="space-y-4">
             <input 
               type="email" 
               placeholder="Your email address..." 
               className="w-full px-5 py-4 bg-[#0a0a0a]/80 rounded-xl border border-white/10 focus:border-primary/50 outline-none transition-all text-sm shadow-inner text-white/90"
             />
             <button className="w-full bg-gradient-to-r from-primary to-purple-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-primary/30 active:scale-[0.98] lg:hover:scale-[1.02]">
                Subscribe
             </button>
          </div>
        </div>
      </div>

      {/* Trending Intel */}
      <div className="space-y-8 bg-white/5 p-6 md:p-8 rounded-xl border border-white/5">
        <h3 className="font-bold text-lg tracking-tight border-b border-white/10 pb-4 flex items-center gap-2 text-white/90">
          <TrendingUp className="w-5 h-5 text-primary" />
          Trending Posts
        </h3>
        
        <div className="space-y-6 mt-6">
           {popular.map((blog) => (
             <Link 
               key={blog.id} 
               href={`/blog/${blog.id}`}
               className="flex items-center gap-4 group transition-all"
             >
                <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden relative">
                   <Image 
                      src={blog.image_url || "/projects/project.png"} 
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                   />
                </div>
                <div className="min-w-0">
                   <h5 className="text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2 text-white/90">{blog.title}</h5>
                   <div className="flex items-center gap-2 mt-2 text-[11px] text-white/60 font-medium tracking-wide">
                      <Target className="w-3 h-3 text-primary/50" />
                      <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                   </div>
                </div>
             </Link>
           ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-6 md:space-y-8 pl-1">
        <h3 className="font-bold text-lg tracking-tight border-b border-white/10 pb-4 text-white/90">Categories</h3>
        <div className="flex flex-wrap gap-2 md:gap-3">
           {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => onCategorySelect(cat)}
               className={`px-4 py-2 rounded-full text-[11px] md:text-xs font-bold transition-all border ${
                 activeCategory === cat 
                   ? "bg-primary/20 border-primary/50 text-white shadow-[0_0_15px_rgba(var(--primary),0.3)]" 
                   : "bg-white/5 border-white/10 text-white/60 hover:border-primary/30 hover:text-white"
               }`}
             >
                {cat}
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
    className="group flex flex-col h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-primary/10 relative"
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <Image
        src={blog.image_url || "/projects/project.png"}
        alt={blog.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent opacity-80" />
      <div className="absolute top-4 right-4 z-20">
        <span className="px-4 py-1.5 bg-[#0a0a0a]/80 backdrop-blur-md rounded-full text-xs font-bold text-primary border border-white/10 shadow-sm">
           {blog.category}
        </span>
      </div>
    </div>
    
    <div className="p-6 md:p-8 flex flex-col flex-1">
      <h3 className="text-xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors leading-tight line-clamp-2 text-white/90">
        {blog.title}
      </h3>
      
      <p className="text-sm text-white/60 mb-8 leading-relaxed line-clamp-3">
        {blog.sub_title || blog.description.substring(0, 150) + "..."}
      </p>
      
      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-xs font-medium text-white/60">
         <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary/70" />
            {new Date(blog.created_at).toLocaleDateString()}
         </div>
         <div className="group-hover:text-primary transition-colors flex items-center gap-1 font-bold">
            Read More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
      <div className="py-60 flex flex-col items-center justify-center gap-6 bg-[#0a0a0a] min-h-screen">
         <Loader2 className="w-12 h-12 animate-spin text-primary" />
         <p className="text-sm font-medium text-white/60 animate-pulse">Loading Articles...</p>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-32 pb-32 md:pb-48 px-4 md:px-8 lg:px-12 max-w-[1550px] mx-auto relative min-h-screen text-white/90 bg-[#0a0a0a]">
      {/* Search Result Feedback */}
      {q && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12 md:mb-16 flex flex-col gap-2"
        >
           <h2 className="text-3xl md:text-4xl font-black tracking-tight">Search Results for: <span className="text-primary">{q}</span></h2>
           <span className="text-sm font-medium text-white/60">{filteredBlogs.length} articles found</span>
        </motion.div>
      )}

      {/* Featured Section */}
      {!q && selectedCategory === "All" && (
         <FeaturedCarousel blogs={featuredInCarousel} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 relative z-10 mt-12">
        {/* Main Feed */}
        <div className="space-y-12">
           <div className="flex items-center justify-between border-b border-white/10 pb-6">
             <h2 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-3">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                Latest Articles
             </h2>
             <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-white/60">Showing {filteredBlogs.length}</span>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {listBlogs.map((blog, idx) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  >
                    <ArticleCard blog={blog} />
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>

           {filteredBlogs.length === 0 && (
             <div className="text-center py-40 border border-dashed border-white/10 rounded-xl bg-white/5 backdrop-blur-sm">
                <Search className="w-16 h-16 text-white/20 mx-auto mb-6" />
                <h3 className="text-lg font-bold text-white/60">No articles match your criteria</h3>
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
      <div className="py-60 flex flex-col items-center justify-center gap-6 bg-[#0a0a0a] min-h-screen">
         <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    }>
      <BlogSearchContent />
    </Suspense>
  );
}
