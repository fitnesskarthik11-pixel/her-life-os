import { useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy — HerSphere 30";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container max-w-3xl prose prose-sm">
          <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: February 14, 2026</p>

          <h2 className="font-display text-xl font-bold mt-8 mb-3">1. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed">We collect information you provide directly: name, email, health data (cycle tracking, symptoms), financial preferences, and usage patterns. We do not sell your data to third parties.</p>

          <h2 className="font-display text-xl font-bold mt-8 mb-3">2. How We Use Your Data</h2>
          <p className="text-muted-foreground leading-relaxed">Your data powers personalized AI insights, module recommendations, and health analytics. All health data is encrypted at rest and in transit using AES-256 encryption.</p>

          <h2 className="font-display text-xl font-bold mt-8 mb-3">3. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">We implement industry-standard security measures including TLS 1.3, encrypted databases, role-based access controls, and regular security audits. Payment data is processed by certified payment providers — we never store card details.</p>

          <h2 className="font-display text-xl font-bold mt-8 mb-3">4. Your Rights (GDPR & Indian DPDP)</h2>
          <p className="text-muted-foreground leading-relaxed">You can request data export, deletion, or correction at any time. Contact privacy@hersphere30.com for data requests. We comply with GDPR and India's Digital Personal Data Protection Act.</p>

          <h2 className="font-display text-xl font-bold mt-8 mb-3">5. Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">We use essential cookies for authentication and preferences. Analytics cookies are optional and require your consent.</p>

          <h2 className="font-display text-xl font-bold mt-8 mb-3">6. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">For privacy concerns: privacy@hersphere30.com</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
