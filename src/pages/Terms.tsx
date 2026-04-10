import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { fadeInUp } from "@/lib/motion";

const sections = [
  { title: "1. Acceptance", body: "By accessing HerSphere 30, you agree to these terms. The platform provides AI-powered life management tools across 30 modules." },
  { title: "2. Subscriptions", body: "Subscriptions are billed monthly or annually in INR. You may upgrade, downgrade, or cancel at any time. Refunds are processed within 7 business days for eligible requests." },
  { title: "3. User Conduct", body: "You agree not to misuse the platform, attempt unauthorized access, or violate other users' privacy. Community features require respectful interaction." },
  { title: "4. Health Disclaimer", body: "HerSphere 30 provides informational health tools, not medical advice. Always consult healthcare professionals for medical decisions." },
  { title: "5. Intellectual Property", body: "All content, branding, and technology are owned by HerSphere 30. Users retain ownership of their personal data." },
  { title: "6. Limitation of Liability", body: "HerSphere 30 is provided \"as is.\" We are not liable for decisions made based on AI insights or module recommendations." },
  { title: "7. Contact", body: "Questions about these terms: legal@hersphere30.com" },
];

const Terms = () => {
  useEffect(() => {
    document.title = "Terms of Service — HerSphere 30";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-2">Terms of Service</h1>
            <p className="text-muted-foreground mb-12">Last updated: February 14, 2026</p>
          </motion.div>

          <div className="space-y-10">
            {sections.map((s, i) => (
              <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={i * 0.5}>
                <h2 className="font-display text-xl font-bold mb-3">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
