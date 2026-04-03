"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { Quote, Star, ChevronLeft, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setTestimonials(data);
    setLoading(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center bg-black/5">
        <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
      </div>
    );
  }

  return (
    <section
      id="testimonials"
      className="relative py-24 sm:py-32 px-6 md:px-12 overflow-hidden border-t border-white/5 bg-[#030014]"
      ref={ref}
    >
      <div className="max-w-[1550px] mx-auto relative z-10">
        
        {/* Header: Sharp Editorial Style */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-24 border-b border-white/10 pb-16">
          <div className="max-w-2xl">
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={isInView ? { opacity: 1, x: 0 } : {}}
               className="flex items-center gap-4 mb-8"
             >
                <div className="w-12 h-1 bg-primary"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">Operational Reputation</span>
             </motion.div>
             
             <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.05em] text-white italic uppercase leading-[0.95]">
                Public <span className="text-primary italic">Endorsements</span>
             </h2>
          </div>

          <p className="text-base sm:text-lg text-white/40 font-medium max-w-sm italic text-right leading-relaxed">
             A surgical look at professional collaborations and architectural validation from industry leaders.
          </p>
        </div>

        {/* Testimonial Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10">
          <AnimatePresence mode="wait">
            {testimonials.length > 0 ? (
              testimonials.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage).map((testimonial, idx) => (
                <motion.div
                  key={`${testimonial.id}-${idx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-10 sm:p-12 border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex flex-col group min-h-[400px]"
                >
                  <Quote className="h-10 w-10 text-primary/10 mb-10 group-hover:text-primary/40 transition-colors" />

                  <p className="text-lg text-white/70 mb-12 flex-1 font-medium leading-relaxed italic border-l-2 border-white/5 pl-8 group-hover:border-primary/30 transition-colors">
                    "{testimonial.content}"
                  </p>

                  <div className="mt-auto pt-10 border-t border-white/5">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < testimonial.rating ? 'text-primary fill-primary' : 'text-white/5'}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="h-16 w-16 rounded-none border border-white/10 overflow-hidden shrink-0 group-hover:border-primary/50 transition-all relative">
                        {testimonial.image ? (
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-white/5 flex items-center justify-center text-primary/40 font-black uppercase italic text-2xl">
                            {testimonial.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-lg tracking-[-0.02em] text-white italic truncate uppercase leading-none mb-1">{testimonial.name}</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 truncate italic leading-none">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              /* PROFESSIONAL PLACEHOLDER (Ensures Section Visibility) */
              [...Array(3)].map((_, i) => (
                <div key={i} className="p-12 border-r border-white/10 bg-white/[0.01] opacity-20 flex flex-col gap-10">
                   <Quote className="w-10 h-10 opacity-10" />
                   <div className="space-y-4">
                      <div className="h-2 w-full bg-white/10 text-white"></div>
                      <div className="h-2 w-4/5 bg-white/10 text-white"></div>
                      <div className="h-2 w-3/4 bg-white/10 text-white"></div>
                   </div>
                   <div className="mt-auto flex items-center gap-6">
                      <div className="w-14 h-14 bg-white/10 text-white"></div>
                      <div className="space-y-2">
                        <div className="h-3 w-24 bg-white/10 text-white"></div>
                        <div className="h-2 w-16 bg-white/10 text-white"></div>
                      </div>
                   </div>
                </div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Operational Controls: Sharp Style */}
        <div className="flex items-center justify-between mt-16 px-4">
          {totalPages > 1 ? (
             <>
                <div className="flex items-center gap-8 text-[11px] font-black italic uppercase tracking-[0.4em] text-white/20">
                  <span className="text-white">0{currentIndex + 1}</span>
                  <div className="h-px w-20 bg-white/10 text-white"></div>
                  <span>0{totalPages}</span>
                </div>
                
                <div className="flex gap-0">
                  <button
                    onClick={prevTestimonial}
                    className="w-16 h-16 flex items-center justify-center border border-white/10 hover:bg-white/5 text-white/20 hover:text-white transition-all text-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-16 h-16 flex items-center justify-center border border-white/10 border-l-0 hover:bg-white/5 text-white/20 hover:text-white transition-all text-white"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
             </>
          ) : (
             <div className="flex items-center gap-4 py-8">
                <Sparkles className="w-5 h-5 text-primary opacity-30 animate-pulse" />
                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em] italic">Intelligence Log: Syncing Professional Endorsements</span>
             </div>
          )}
        </div>
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[-1]" 
        style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '100px 100px' }}
      ></div>
    </section>
  );
};