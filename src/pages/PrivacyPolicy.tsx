import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { fadeInUp } from "@/lib/motion";

const sections = [
  { title: "1. Information We Collect", body: "We collect information you provide directly: name, email, health data (cycle tracking, symptoms), financial preferences, and usage patterns. We do not sell your data to third parties." },
  { title: "2. How We Use Your Data", body: "Your data powers personalized AI insights, module recommendations, and health analytics. All health data is encrypted at rest and in transit using AES-256 encryption." },
  { title: "3. Data Security", body: "We implement industry-standard security measures including TLS 1.3, encrypted databases, role-based access controls, and regular security audits. Payment data is processed by certified payment providers — we never store card details." },
  { title: "4. Your Rights (GDPR & Indian DPDP)", body: "You can request data export, deletion, or correction at any time. Contact privacy@hersphere30.com for data requests. We comply with GDPR and India's Digital Personal Data Protection Act." },
  { title: "5. Cookies", body: "We use essential cookies for authentication and preferences. Analytics cookies are optional and require your consent." },
  { title: "6. Contact", body: "For privacy concerns: privacy@hersphere30.com" },
];

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy — HerSphere 30";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-2">Privacy Policy</h1>
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

export default PrivacyPolicy;
