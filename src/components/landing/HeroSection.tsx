import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient background instead of missing image */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-light via-background to-warm-light" />
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-warm/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="container relative z-10 py-24 lg:py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
              <Sparkles className="h-4 w-4" />
              30 Powerful Modules — One Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
          >
            Your Life,{" "}
            <span className="text-gradient-hero">Beautifully</span>{" "}
            Organized
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
          >
            HerSphere 30 is the complete women's life operating system — health, safety, career, finance, family, and community — all powered by AI, all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-hero text-primary-foreground shadow-glow hover:opacity-90 text-base px-8 h-13 rounded-full">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="/#modules">
              <Button size="lg" variant="outline" className="text-base px-8 h-13 rounded-full border-2">
                Explore All 30 Modules
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 flex items-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-8 w-8 rounded-full bg-gradient-hero border-2 border-background" />
              ))}
            </div>
            <span>Trusted by <strong className="text-foreground">10,000+</strong> women worldwide</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
