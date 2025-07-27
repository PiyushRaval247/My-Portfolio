import { ArrowRight, ExternalLink, Github, ChevronUp } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "E-commerce Cloth Store",
    description:
      "Cloth Store. is fully functionality, user authentication, and payment processing web application.",
    image: "/projects/project1.png",
    tags: [
      "React",
      "TailwindCSS",
      "MongoDB",
      "Express",
      "Node",
      "Paypal",
      "Cloudinary",
    ],
    demoUrl: "https://clothonstore.netlify.app",
    githubUrl: "https://github.com/PiyushRaval247/Cloth_Backend",
  },
  {
    id: 2,
    title: "Online Course Web App",
    description: `Online Course Web App built with React, Tailwind CSS, and DaisyUI, offering a fully responsive and modern learning interface.`,
    image: "/projects/project2.png",
    tags: [
      "React",
      "TailwindCSS",
      "daisyUi",
      "Responsive",
    ],
    demoUrl: "https://online-course-ebon.vercel.app",
    githubUrl: "https://github.com/PiyushRaval247/Online_Course",
  },
  {
    id: 3,
    title: "AI Powered MyBlog Web",
    description: `AI-powered blog website using MERN stack with Gemini integration. Admin panel allows automatic blog generation and editing using 
                  Google Gemini for smart, SEO-friendly content creation.`,
    image: "/projects/project3.png",
    tags: ["React", "Node.js", "Express", "Redux", "MongoDB"],
    demoUrl: "https://my-blog-piyush.vercel.app",
    githubUrl: "https://github.com/PiyushRaval247/MyBlog",
  },
  {
    id: 4,
    title: "DemoCloud Web App",
    description:"DemoCloud Web App is a responsive React-based application featuring a sleek Tailwind CSS design and an interactive mega menu for enhanced navigation. Built for modern UI experiences, it adapts seamlessly across all devices",
    image: "/projects/project4.png",
    tags: ["React", "TailwindCss","Redux", "MegaMenu", "Responsive"],
    demoUrl: "https://democlouds.netlify.app",
    githubUrl: "https://github.com/PiyushRaval247/Team_Cloud",
  },
  {
    id: 5,
    title: "Employee Management",
    description:
      "Employee Management is full stack MERN WebApp With Create ,Update ,Read ,Delete Begainer Friendly",
    image: "/projects/project5.png",
    tags: ["NextJs", "Node.js", "Mongodb", "Redux"],
    demoUrl: "https://employe-management-tau.vercel.app/",
    githubUrl: "https://github.com/PiyushRaval247/Employe_Management",
  },
  {
    id: 6,
    title: "Zapchat WebApp",
    description:
      "Full-featured online chat Webapp platform with user authentication, user can transfer image pdf.",
    image: "/projects/project6.png",
    tags: ["React", "Node.js", "Socket.io", "MUi", "Mongodb"],
    demoUrl: "https://thriving-donut-093477.netlify.app/",
    githubUrl: "https://github.com/PiyushRaval247",
  },
];

export const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="py-24 px-4 relative bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects, each carefully crafted with
            attention to detail, performance, and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-muted hover:border-primary/20"
            >
              <div className="h-52 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-foreground border border-muted-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-4">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                      aria-label={`View ${project.title} demo`}
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                      aria-label={`View ${project.title} source code`}
                    >
                      <Github size={16} />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 flex flex-col items-center gap-4">
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
      </div>
    </section>
  );
};
