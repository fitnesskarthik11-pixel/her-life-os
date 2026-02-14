import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const newsletterSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [newsletter, setNewsletter] = useState("");
  const [contactSent, setContactSent] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(contactForm);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setContactSent(true);
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    const result = newsletterSchema.safeParse({ email: newsletter });
    if (!result.success) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setNewsletterSent(true);
    toast({ title: "Subscribed!", description: "Welcome to the HerSphere community." });
  };

  return (
    <section id="contact" className="py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              Get in <span className="text-gradient-hero">Touch</span>
            </h2>
            <p className="text-muted-foreground mb-8">Questions, partnerships, or just saying hello — we'd love to hear from you.</p>

            {contactSent ? (
              <div className="flex flex-col items-center justify-center py-12 bg-card rounded-2xl border border-border/50">
                <CheckCircle className="h-12 w-12 text-sage mb-4" />
                <p className="font-display text-xl font-semibold">Message Sent!</p>
                <p className="text-muted-foreground text-sm mt-1">We'll respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContact} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={e => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl bg-card border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={e => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl bg-card border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    value={contactForm.message}
                    onChange={e => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </div>
                <Button type="submit" className="w-full rounded-full h-12 bg-gradient-hero text-primary-foreground shadow-glow hover:opacity-90">
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </Button>
              </form>
            )}
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              Stay <span className="text-gradient-hero">Updated</span>
            </h2>
            <p className="text-muted-foreground mb-8">Join 10,000+ women getting weekly insights on health, career, and personal growth.</p>

            {newsletterSent ? (
              <div className="flex flex-col items-center justify-center py-12 bg-card rounded-2xl border border-border/50">
                <Mail className="h-12 w-12 text-primary mb-4" />
                <p className="font-display text-xl font-semibold">You're In!</p>
                <p className="text-muted-foreground text-sm mt-1">Check your inbox for a welcome email.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletter}
                  onChange={e => setNewsletter(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-card border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <Button type="submit" className="w-full rounded-full h-12 bg-gradient-hero text-primary-foreground shadow-glow hover:opacity-90">
                  <Mail className="h-4 w-4 mr-2" /> Subscribe to Newsletter
                </Button>
              </form>
            )}

            <div className="mt-12 bg-card rounded-2xl p-6 border border-border/50">
              <h3 className="font-display font-semibold mb-3">What you'll get:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Weekly health & wellness tips", "Career growth strategies", "Exclusive module previews", "Community spotlights", "AI-powered life hacks"].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-sage shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
