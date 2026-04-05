"use client";

import { ArrowRight, ExternalLink, Github, ChevronUp, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section
      id="projects"
      className="py-16 md:py-20 relative bg-gradient-to-b from-background to-muted/20"
    >
      {/* Structured Data for Projects */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": projects.map((p, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": {
                "@type": "SoftwareSourceCode",
                "name": p.title,
                "description": p.description,
                "author": {
                  "@type": "Person",
                  "name": "Piyush Raval"
                },
                "programmingLanguage": p.tags?.join(", "),
                "image": p.image_url,
                "codeRepository": p.github_url
              }
            }))
          })
        }}
      />

      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            Featured <span className="text-primary italic">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium opacity-80 italic">
            A curated inventory of high-impact technical deployments, crafted with precision and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-card/40 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-2xl hover:shadow-primary/5 transition-all duration-500 border border-white/5 hover:border-primary/20"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={project.image_url}
                  alt={`Snapshot of project: ${project.title} - Built by Piyush Raval`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-white text-xs font-medium leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-500 italic opacity-80">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-black tracking-tight mb-4 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/5 text-muted-foreground border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-white/5">
                  <div className="flex space-x-6">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all group/link"
                        aria-label={`Launch ${project.title} live environment`}
                      >
                        <ExternalLink size={14} className="group-hover/link:scale-110 transition-transform" />
                        <span>Launch Live</span>
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all group/link"
                        aria-label={`View the ${project.title} source code on GitHub`}
                      >
                        <Github size={14} className="group-hover/link:scale-110 transition-transform" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length > 0 ? (
          <div className="text-center mt-8 flex flex-col items-center gap-4">
            {projects.length > 3 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-colors shadow-lg hover:-translate-y-1 transform transition-all duration-300 ${
                  showAll
                    ? "bg-muted text-foreground hover:bg-muted/80 border border-muted-foreground/20"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/30"
                }`}
              >
                {showAll ? (
                  <>
                    See Less Projects
                    <ChevronUp size={18} className="ml-2" />
                  </>
                ) : (
                  <>
                    See All Projects
                    <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </button>
            )}
            <a
              href="https://github.com/PiyushRaval247"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-transparent text-foreground font-medium hover:bg-muted transition-colors border border-muted-foreground hover:border-primary hover:text-primary"
            >
              Explore More on GitHub
              <ArrowRight size={18} className="ml-2" />
            </a>
          </div>
        ) : (
          <div className="text-center mt-16 text-muted-foreground">
            No projects added yet. Check back soon!
          </div>
        )}
      </div>
    </section>
  );
};
