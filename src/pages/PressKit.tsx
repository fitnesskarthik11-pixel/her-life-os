import { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Download, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useToast } from "@/hooks/use-toast";

const brandColors = [
  { name: "Rose Primary", hex: "#B83B5E", hsl: "340 65% 47%" },
  { name: "Warm Orange", hex: "#D97B2E", hsl: "25 80% 55%" },
  { name: "Gold", hex: "#D4A017", hsl: "38 85% 55%" },
  { name: "Sage", hex: "#5F9E8F", hsl: "160 25% 50%" },
  { name: "Lavender", hex: "#8B6DB5", hsl: "270 40% 60%" },
  { name: "Sky Blue", hex: "#3B8DBD", hsl: "200 60% 55%" },
];

const companyFacts = [
  { label: "Founded", value: "2024" },
  { label: "Headquarters", value: "Bengaluru, India" },
  { label: "Users", value: "10,000+" },
  { label: "Modules", value: "30" },
  { label: "Category", value: "Women's LifeTech" },
  { label: "Pricing", value: "₹499 – ₹3,999/mo" },
];

const PressKit = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState("");

  useEffect(() => {
    document.title = "Press Kit — HerSphere 30";
  }, []);

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast({ title: "Copied!", description: `${label} copied to clipboard.` });
    setTimeout(() => setCopied(""), 2000);
  };

  const boilerplate = `HerSphere 30 is the world's first modular women's life operating system — a single platform with 30 AI-powered modules covering health, safety, career, finance, family, and community. Designed for women at every life stage, HerSphere 30 replaces dozens of apps with one unified, privacy-first experience. From cycle tracking and fertility planning to career mentorship and financial empowerment, every module is built with women's unique needs in mind.`;

  const shortBio = `HerSphere 30 — 30 AI-powered modules. One platform. Health, safety, career, finance & community for modern women.`;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Press <span className="text-gradient-hero">Kit</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Brand assets, company information, and media resources for press and partners.
            </p>
          </motion.div>

          {/* Logo */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-6">Brand Mark</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-8 border border-border/50 flex flex-col items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-gradient-hero flex items-center justify-center mb-4">
                  <Heart className="h-10 w-10 text-primary-foreground" />
                </div>
                <span className="font-display text-2xl font-bold">HerSphere 30</span>
                <span className="text-sm text-muted-foreground mt-1">Light Background</span>
              </div>
              <div className="bg-foreground rounded-2xl p-8 flex flex-col items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-gradient-hero flex items-center justify-center mb-4">
                  <Heart className="h-10 w-10 text-primary-foreground" />
                </div>
                <span className="font-display text-2xl font-bold text-background">HerSphere 30</span>
                <span className="text-sm text-background/60 mt-1">Dark Background</span>
              </div>
            </div>
          </section>

          {/* Colors */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-6">Brand Colors</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {brandColors.map(c => (
                <button
                  key={c.name}
                  onClick={() => copyText(c.hex, c.name)}
                  className="group rounded-xl overflow-hidden border border-border/50 hover:shadow-glow transition-all"
                >
                  <div className="h-20" style={{ backgroundColor: c.hex }} />
                  <div className="p-3 bg-card">
                    <div className="text-xs font-semibold">{c.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      {c.hex}
                      {copied === c.name ? <CheckCircle className="h-3 w-3 text-sage" /> : <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Typography */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-6">Typography</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <h3 className="font-display text-3xl font-bold mb-2">Playfair Display</h3>
                <p className="text-muted-foreground text-sm">Used for headings, display text, and brand elements. Provides editorial elegance.</p>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <h3 className="font-body text-3xl font-bold mb-2">DM Sans</h3>
                <p className="text-muted-foreground text-sm">Used for body text, UI elements, and navigation. Clean and highly readable.</p>
              </div>
            </div>
          </section>

          {/* Company Facts */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-6">Company Facts</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {companyFacts.map(f => (
                <div key={f.label} className="bg-card rounded-xl p-4 border border-border/50">
                  <div className="text-xs text-muted-foreground mb-1">{f.label}</div>
                  <div className="font-display text-lg font-semibold">{f.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Boilerplate */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-6">About (Boilerplate)</h2>
            <div className="bg-card rounded-2xl p-6 border border-border/50 relative">
              <p className="text-muted-foreground leading-relaxed mb-4">{boilerplate}</p>
              <Button variant="outline" size="sm" className="rounded-full" onClick={() => copyText(boilerplate, "Boilerplate")}>
                <Copy className="h-3 w-3 mr-2" /> Copy Boilerplate
              </Button>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border/50 mt-4 relative">
              <p className="text-muted-foreground leading-relaxed mb-4">{shortBio}</p>
              <Button variant="outline" size="sm" className="rounded-full" onClick={() => copyText(shortBio, "Short Bio")}>
                <Copy className="h-3 w-3 mr-2" /> Copy Short Bio
              </Button>
            </div>
          </section>

          {/* Media Contact */}
          <section>
            <h2 className="font-display text-2xl font-bold mb-6">Media Contact</h2>
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <p className="text-muted-foreground mb-2">For press inquiries, partnerships, and media requests:</p>
              <p className="font-semibold">press@hersphere30.com</p>
              <p className="text-sm text-muted-foreground mt-1">Response time: within 24 hours</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PressKit;
