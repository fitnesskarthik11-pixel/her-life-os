import { motion } from "framer-motion";
import { modules, type ModuleCategory, categoryLabels } from "@/lib/modules";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories: (ModuleCategory | "all")[] = ["all", "health", "safety", "lifestyle", "finance", "career", "community", "family"];

const colorMap: Record<string, string> = {
  rose: "bg-rose-light text-rose-dark",
  peach: "bg-peach-light text-peach",
  sage: "bg-sage-light text-sage",
  lavender: "bg-lavender-light text-lavender",
  sky: "bg-sky-light text-sky",
  warm: "bg-warm-light text-warm",
  gold: "bg-gold-light text-gold",
};

const ModulesGrid = () => {
  const [filter, setFilter] = useState<ModuleCategory | "all">("all");
  const filtered = filter === "all" ? modules : modules.filter(m => m.category === filter);

  return (
    <section id="modules" className="py-24 bg-gradient-warm">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            30 Modules. <span className="text-gradient-hero">One Ecosystem.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every aspect of your life, thoughtfully designed and AI-powered.
          </p>
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all",
                filter === cat
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-card text-muted-foreground hover:bg-accent shadow-card"
              )}
            >
              {cat === "all" ? "All Modules" : categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="group relative bg-card rounded-xl p-5 shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer border border-border/50 hover:border-primary/20"
              >
                <div className={cn("inline-flex p-2.5 rounded-lg mb-3", colorMap[mod.color] || "bg-accent text-accent-foreground")}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-semibold mb-1.5 group-hover:text-primary transition-colors">
                  {mod.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {mod.description}
                </p>
                <span className={cn(
                  "absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                  mod.tier === "starter" && "bg-sage-light text-sage",
                  mod.tier === "pro" && "bg-gold-light text-gold",
                  mod.tier === "elite" && "bg-lavender-light text-lavender",
                )}>
                  {mod.tier}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModulesGrid;
