"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  LogOut, 
  Edit2, 
  Trash2, 
  Link as LinkIcon, 
  Github, 
  Loader2, 
  LayoutGrid,
  Menu,
  ShieldIcon
} from "lucide-react";
import AdminProjectForm from "@/components/AdminProjectForm";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        fetchProjects();
      }
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error(error);
    } else {
      setProjects(data);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) {
        alert(error.message);
      } else {
        fetchProjects();
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar / Header */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ShieldIcon className="text-primary-foreground w-5 h-5" />
            </div>
            <h1 className="font-bold text-xl hidden md:block">Portfolio Admin</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg flex items-center gap-2 transition-all"
              title="Log Out"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:block">Log Out</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <p className="text-muted-foreground mt-1">Manage the projects displayed on your homepage.</p>
          </div>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all w-fit"
          >
            <Plus className="w-5 h-5" />
            Add New Project
          </button>
        </div>

        {/* Form Modal / Section */}
        {(showAddForm || editingProject) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <AdminProjectForm 
                project={editingProject} 
                onComplete={() => {
                  setEditingProject(null);
                  setShowAddForm(false);
                  fetchProjects();
                }} 
                onCancel={() => {
                  setEditingProject(null);
                  setShowAddForm(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-card border border-border rounded-2xl overflow-hidden group hover:border-primary/50 transition-all flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button 
                    onClick={() => setEditingProject(project)}
                    className="p-2 bg-background/80 backdrop-blur-md rounded-lg hover:bg-primary hover:text-white transition-all shadow-md"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="p-2 bg-background/80 backdrop-blur-md rounded-lg hover:bg-destructive hover:text-white transition-all shadow-md"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags?.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-[10px] font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 pt-4 border-t border-border mt-auto">
                  {project.demo_url && (
                    <a href={project.demo_url} target="_blank" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                      <LinkIcon className="w-3 h-3" /> Demo
                    </a>
                  )}
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                      <Github className="w-3 h-3" /> Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-3xl">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutGrid className="text-muted-foreground w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">No Projects Found</h3>
              <p className="text-muted-foreground mt-2">Start adding projects to showcase your best work.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
