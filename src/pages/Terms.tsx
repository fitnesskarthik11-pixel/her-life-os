import { useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const Terms = () => {
  useEffect(() => {
    document.title = "Terms of Service — HerSphere 30";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container max-w-3xl prose prose-sm">
          <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: February 14, 2026</p>

          <h2 className="font-display text-xl font-bold mt-8 mb-3">1. Acceptance</h2>
          <p className="text-muted-foreground leading-relaxed">By accessing HerSphere 30, you agree to these terms. The platform provides AI-powered life management tools across 30 modules.</p>

          <h2 className="font-display text-xl font-bold mt-8 mb-3">2. Subscriptions</h2>
          <p className="text-muted-foreground leading-relaxed">Subscriptions are billed monthly or annually in INR. You may upgrade, downgrade, or cancel at any time. Refunds are processed within 7 business days for eligible requests.</p>

          <h2 className="font-display text-xl font-bold mt-8 mb-3">3. User Conduct</h2>
          <p className="text-muted-foreground leading-relaxed">You agree not to misuse the platform, attempt unauthorized access, or violate other users' privacy. Community features require respectful interaction.</p>

          <h2 className="font-display text-xl font-bold mt-8 mb-3">4. Health Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed">HerSphere 30 provides informational health tools, not medical advice. Always consult healthcare professionals for medical decisions.</p>

          <h2 className="font-display text-xl font-bold mt-8 mb-3">5. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">All content, branding, and technology are owned by HerSphere 30. Users retain ownership of their personal data.</p>

          <h2 className="font-display text-xl font-bold mt-8 mb-3">6. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">HerSphere 30 is provided "as is." We are not liable for decisions made based on AI insights or module recommendations.</p>

          <h2 className="font-display text-xl font-bold mt-8 mb-3">7. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">Questions about these terms: legal@hersphere30.com</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
