"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { Quote, Star, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
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
      <div className="py-24 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary opacity-50" />
      </div>
    );
  }

  return (
    <section
      id="testimonials"
      className="py-16 md:py-20 relative bg-gradient-to-b from-muted/20 to-background"
      ref={ref}
    >
      <div className="container mx-auto max-w-6xl relative z-10 px-4 md:px-0">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tighter mb-4"
          >
            Client <span className="text-primary italic">Feedback</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium opacity-80 italic"
          >
            A look at professional collaborations and thoughts from industry leaders.
          </motion.p>
        </div>

        {/* Testimonial Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {testimonials.length > 0 ? (
              testimonials.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage).map((testimonial, idx) => (
                <motion.div
                  key={`${testimonial.id}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-card/40 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-white/5 hover:border-primary/20 hover:shadow-primary/5 transition-all duration-500 flex flex-col min-h-[360px]"
                >
                  <Quote className="h-8 w-8 text-primary/30 mb-8 group-hover:text-primary transition-colors duration-500" />

                  <p className="text-base text-foreground/80 mb-8 flex-1 font-medium leading-relaxed italic border-l-2 border-primary/20 pl-6 group-hover:border-primary/50 transition-colors">
                    "{testimonial.content}"
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-primary fill-primary' : 'text-muted-foreground/30'}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all relative">
                        {testimonial.image ? (
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-black uppercase text-xl">
                            {testimonial.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-base tracking-tight text-foreground truncate">{testimonial.name}</p>
                        <p className="text-xs font-medium text-muted-foreground truncate">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              /* PROFESSIONAL PLACEHOLDER */
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-card/20 rounded-[2rem] p-8 border border-white/5 opacity-50 flex flex-col min-h-[360px] animate-pulse">
                   <div className="w-8 h-8 rounded-full bg-muted mb-8"></div>
                   <div className="space-y-4 mb-auto">
                      <div className="h-2 w-full bg-muted rounded"></div>
                      <div className="h-2 w-5/6 bg-muted rounded"></div>
                      <div className="h-2 w-4/5 bg-muted rounded"></div>
                   </div>
                   <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-3 w-24 bg-muted rounded"></div>
                        <div className="h-2 w-16 bg-muted rounded"></div>
                      </div>
                   </div>
                </div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-card shadow-md border border-white/10 hover:border-primary/50 text-foreground hover:text-primary transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2 mx-4">
              {[...Array(totalPages)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-primary/20'}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-card shadow-md border border-white/10 hover:border-primary/50 text-foreground hover:text-primary transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};