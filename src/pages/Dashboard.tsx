import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart, Bell, Settings, User, Search, Sparkles, ChevronRight,
  LayoutGrid, BarChart3, MessageCircle, LogOut, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { modules, categoryLabels, type ModuleCategory } from "@/lib/modules";
import { cn } from "@/lib/utils";

const colorMap: Record<string, string> = {
  rose: "bg-rose-light text-rose-dark",
  peach: "bg-peach-light text-peach",
  sage: "bg-sage-light text-sage",
  lavender: "bg-lavender-light text-lavender",
  sky: "bg-sky-light text-sky",
  warm: "bg-warm-light text-warm",
  gold: "bg-gold-light text-gold",
};

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ModuleCategory | "all">("all");

  const filtered = modules.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "all" || m.category === activeCategory;
    return matchSearch && matchCat;
  });

  const categories: (ModuleCategory | "all")[] = ["all", "health", "safety", "lifestyle", "finance", "career", "community", "family"];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-glass border-b border-border/50">
        <div className="flex items-center justify-between px-6 h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-hero flex items-center justify-center">
              <Heart className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold hidden sm:block">HerSphere 30</span>
          </Link>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search modules..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-full bg-muted border-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            </button>
            <button className="p-2 rounded-full hover:bg-muted transition-colors">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </button>
            <div className="h-9 w-9 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground text-sm font-semibold">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-border/50 h-[calc(100vh-4rem)] sticky top-16 p-4">
          <nav className="space-y-1 flex-1">
            <SidebarItem icon={LayoutGrid} label="All Modules" active />
            <SidebarItem icon={BarChart3} label="Analytics" />
            <SidebarItem icon={User} label="Profile" />
            <SidebarItem icon={MessageCircle} label="Community" />
            <SidebarItem icon={Settings} label="Settings" />
          </nav>
          <div className="pt-4 border-t border-border">
            <SidebarItem icon={LogOut} label="Sign Out" />
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-bold mb-2">Welcome back ✨</h1>
            <p className="text-muted-foreground">Here's your personal dashboard. Explore your modules below.</p>
          </motion.div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Active Modules", value: "12", color: "rose" },
              { label: "AI Insights", value: "24", color: "lavender" },
              { label: "Streak", value: "7 days", color: "gold" },
              { label: "Community", value: "3 groups", color: "sage" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="bg-card rounded-xl p-4 shadow-card border border-border/50"
              >
                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                <div className="font-display text-2xl font-bold">{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                )}
              >
                {cat === "all" ? "All" : categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* Module grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.02 * i }}
                  className="group bg-card rounded-xl p-5 shadow-card hover:shadow-glow border border-border/50 hover:border-primary/20 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn("p-2.5 rounded-lg", colorMap[mod.color])}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-display font-semibold mb-1 group-hover:text-primary transition-colors">
                    {mod.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{mod.description}</p>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>

      {/* AI Floating Button */}
      <button
        onClick={() => setAiOpen(!aiOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-hero text-primary-foreground shadow-glow flex items-center justify-center hover:scale-105 transition-transform z-50"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {/* AI Panel */}
      {aiOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-24 right-6 w-80 sm:w-96 bg-card rounded-2xl shadow-glow border border-border/50 z-50 overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-warm">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-display font-semibold">AI Assistant</span>
            </div>
            <button onClick={() => setAiOpen(false)}>
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <div className="p-4 h-64 flex items-center justify-center">
            <p className="text-sm text-muted-foreground text-center">
              Hi! I'm your HerSphere AI assistant. Ask me anything about your health, finances, career, or any module. 💫
            </p>
          </div>
          <div className="p-3 border-t border-border">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="w-full h-10 px-4 rounded-full bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active }: { icon: any; label: string; active?: boolean }) => (
  <button className={cn(
    "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
    active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
  )}>
    <Icon className="h-4 w-4" />
    {label}
  </button>
);

export default Dashboard;
