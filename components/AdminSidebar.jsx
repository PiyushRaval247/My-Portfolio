"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Briefcase, 
  BookOpen, 
  LogOut, 
  PlusCircle,
  PenTool,
  ChevronRight,
  ShieldIcon,
  Menu,
  X,
  PieChart,
  Rocket,
  Zap,
  MessageSquareText as MessageSquareShare
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const navGroups = [
  {
    label: "Overview",
    items: [
      { name: "Executive Hub", href: "/admin", icon: PieChart },
    ]
  },
  {
    label: "Engineering",
    items: [
      { name: "Project Inventory", href: "/admin/projects", icon: Briefcase },
      { name: "Launch Project", href: "/admin/projects/add", icon: Rocket },
      { name: "Skill Vault", href: "/admin/skills", icon: Zap },
    ]
  },
  {
    label: "Content Studio",
    items: [
      { name: "Story Archive", href: "/admin/blogs", icon: BookOpen },
      { name: "Write New Story", href: "/admin/blogs/add", icon: PenTool },
      { name: "Feedback Hub", href: "/admin/testimonials", icon: MessageSquareShare },
    ]
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center gap-3 px-2 mb-12 mt-2">
        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 rotate-3 group-hover:rotate-0 transition-transform">
          <ShieldIcon className="text-primary-foreground w-7 h-7" />
        </div>
        <div>
          <h2 className="font-black text-xl leading-tight tracking-tighter">PR OS</h2>
          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-0.5 opacity-60">Admin v2.0</p>
        </div>
      </div>

      <nav className="flex-1 space-y-8 overflow-y-auto no-scrollbar">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-3">
            <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40">
              {group.label}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition-all group ${
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20 scale-[1.02]" 
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                      <span>{item.name}</span>
                    </div>
                    {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"></div>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="pt-6 mt-6 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-4 rounded-2xl font-black text-xs uppercase tracking-widest text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all group"
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Terminate Session</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-4 bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl md:hidden shadow-2xl"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-card/40 backdrop-blur-3xl border-r border-white/5 hidden md:block z-50">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div 
            className="absolute inset-0 bg-background/90 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setIsOpen(false)} 
          />
          <aside className="absolute left-0 top-0 h-full w-full max-w-xs bg-card border-r border-white/10 shadow-2xl animate-in slide-in-from-left duration-500">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
