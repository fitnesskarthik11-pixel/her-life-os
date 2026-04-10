import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ModulesGrid from "@/components/landing/ModulesGrid";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "HerSphere 30 — Your Life, Beautifully Organized";
    // Set meta description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "HerSphere 30 is the AI-powered women's life operating system with 30 modules for health, safety, career, finance, family & community.");
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ModulesGrid />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
