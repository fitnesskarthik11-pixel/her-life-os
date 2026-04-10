import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Entrepreneur & Mom",
    quote: "HerSphere replaced 12 apps for me. My cycle tracker, business tools, and meal planner — all in one place. Absolute game-changer.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    role: "Solo Traveler",
    quote: "The safety modules give me peace of mind when I travel alone. The check-in feature and emergency alerts are brilliant.",
    rating: 5,
  },
  {
    name: "Meera Patel",
    role: "Career Professional",
    quote: "The Career Mentor Match connected me with an amazing mentor. Within 3 months, I landed my dream role.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-warm relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Loved by <span className="text-gradient-hero">Women</span> Everywhere
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Real stories from women who transformed their daily lives with HerSphere 30.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-glow transition-shadow"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed text-sm">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-display font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
