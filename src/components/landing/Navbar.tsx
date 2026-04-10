import { Heart, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Modules", href: "/#modules" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Why HerSphere", to: "/marketing-home" },
  { label: "Press", to: "/press-kit" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-soft"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="h-9 w-9 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow"
          >
            <Heart className="h-4.5 w-4.5 text-primary-foreground" />
          </motion.div>
          <span className="font-display text-xl font-bold tracking-tight">HerSphere 30</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const El = link.to ? Link : "a";
            const props = link.to ? { to: link.to } : { href: link.href };
            return (
              <El
                key={link.label}
                {...(props as any)}
                className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-primary rounded-full group-hover:w-4/5 transition-all duration-300" />
              </El>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {mounted && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: 180 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-sm">Sign In</Button>
          </Link>
          <Link to="/signup">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button className="rounded-full bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow px-6 text-sm">
                Get Started
              </Button>
            </motion.div>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="p-1.5">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 overflow-hidden"
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link, i) => {
                const El = link.to ? Link : "a";
                const props = link.to ? { to: link.to } : { href: link.href };
                return (
                  <motion.div key={link.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <El
                      {...(props as any)}
                      className="block text-sm font-medium py-3 px-3 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </El>
                  </motion.div>
                );
              })}
              <div className="pt-3 space-y-2">
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  <Button className="w-full rounded-full bg-gradient-hero text-primary-foreground">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
