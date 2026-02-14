import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Brain, Heart, Users, BarChart3, Zap, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

const stats = [
  { value: "10,000+", label: "Active Users" },
  { value: "30", label: "Life Modules" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4.9★", label: "App Rating" },
];

const features = [
  { icon: Heart, title: "Health Intelligence", description: "AI-powered cycle tracking, PCOS management, fertility planning, and hormone analytics — all in one hub.", color: "bg-rose-light text-rose-dark" },
  { icon: Shield, title: "Safety First", description: "Real-time safety check-ins, dating co-pilot, travel planner, and encrypted harassment reporting.", color: "bg-sky-light text-sky" },
  { icon: Brain, title: "AI Copilot", description: "Personal AI assistant across every module — from meal plans to career advice, always learning your preferences.", color: "bg-lavender-light text-lavender" },
  { icon: BarChart3, title: "Financial Power", description: "Budget tracking, investment planning, subscription management, and side-hustle command center.", color: "bg-gold-light text-gold" },
  { icon: Users, title: "Community", description: "Women-only learning circles, language exchange, local services, and mentor matching.", color: "bg-sage-light text-sage" },
  { icon: Zap, title: "Automation", description: "Smart notifications, wearable sync, automated reminders, and cross-module intelligence.", color: "bg-warm-light text-warm" },
];

const trustLogos = ["Forbes Women", "TechCrunch", "YourStory", "SheThePeople", "Inc42"];

const MarketingHome = () => {
  useEffect(() => {
    document.title = "HerSphere 30 — The Complete Women's Life Operating System";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-gradient-warm overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/20 blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gold/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container relative z-10 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
                <Sparkles className="h-4 w-4" />
                Trusted by 10,000+ Women Worldwide
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
            >
              One Platform.{" "}
              <span className="text-gradient-hero">30 Modules.</span>{" "}
              Your Entire Life.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              HerSphere 30 is the AI-powered operating system for modern women — health tracking, safety tools, career growth, financial planning, and community — unified in one beautiful platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/#pricing">
                <Button size="lg" className="bg-gradient-hero text-primary-foreground shadow-glow hover:opacity-90 text-base px-8 h-13 rounded-full">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="text-base px-8 h-13 rounded-full border-2">
                  Explore Dashboard
                </Button>
              </Link>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {stats.map(s => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-3xl font-bold text-foreground">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-b border-border/50">
        <div className="container">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">As Featured In</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {trustLogos.map(logo => (
              <span key={logo} className="text-muted-foreground/50 font-display text-lg font-semibold">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Everything She <span className="text-gradient-hero">Needs</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              From health intelligence to financial power — six pillars that cover every aspect of a woman's life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-glow transition-all group"
              >
                <div className={`inline-flex p-3 rounded-xl mb-4 ${f.color}`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <TestimonialsSection />

      {/* Pricing */}
      <PricingSection />

      {/* CTA */}
      <section className="py-24 bg-gradient-warm">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Ready to Take <span className="text-gradient-hero">Control</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Join thousands of women who've simplified their lives with HerSphere 30.
            </p>
            <Link to="/#pricing">
              <Button size="lg" className="bg-gradient-hero text-primary-foreground shadow-glow hover:opacity-90 text-base px-10 h-14 rounded-full">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact & Newsletter */}
      <ContactSection />

      <Footer />
    </div>
  );
};

export default MarketingHome;
