import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const blobX = useTransform(springX, [0, 1], [-20, 20]);
  const blobY = useTransform(springY, [0, 1], [-20, 20]);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const words = ["Beautifully"];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-light via-background to-warm-light dark:from-background dark:via-background dark:to-background" />

      {/* Mouse-reactive blobs */}
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px] pointer-events-none"
      />
      <motion.div
        style={{ x: useTransform(blobX, v => -v), y: useTransform(blobY, v => -v) }}
        className="absolute bottom-20 left-20 w-[400px] h-[400px] rounded-full bg-warm/8 blur-[100px] pointer-events-none"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      {/* Subtle grain texture */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      <div className="container relative z-10 py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.span
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-2 rounded-full bg-accent/80 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-accent-foreground border border-border/30"
            >
              <Sparkles className="h-3.5 w-3.5" />
              30 Powerful Modules — One Platform
            </motion.span>
          </motion.div>

          {/* Headline with stagger */}
          <div className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6">
            <motion.span
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-block"
            >
              Your Life,{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="inline-block text-gradient-hero"
            >
              Beautifully
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="inline-block"
            >
              Organized
            </motion.span>
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
          >
            HerSphere 30 is the complete women's life operating system — health, safety, career, finance, family, and community — all powered by AI, all in one place.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/signup">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" className="bg-gradient-hero text-primary-foreground shadow-glow hover:opacity-90 text-base px-8 h-13 rounded-full group">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            <a href="/#modules">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" variant="outline" className="text-base px-8 h-13 rounded-full border-2 backdrop-blur-sm">
                  Explore All 30 Modules
                </Button>
              </motion.div>
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-14 flex items-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex -space-x-2.5">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.08 }}
                  className="h-9 w-9 rounded-full bg-gradient-hero border-2 border-background shadow-sm"
                />
              ))}
            </div>
            <span>Trusted by <strong className="text-foreground">10,000+</strong> women worldwide</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground/60 tracking-wider uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
