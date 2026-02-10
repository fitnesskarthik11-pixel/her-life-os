import { motion } from "framer-motion";
import { Star } from "lucide-react";

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
    <section className="py-24 bg-gradient-warm">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Loved by <span className="text-gradient-hero">Women</span> Everywhere
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-card border border-border/50"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground mb-4 leading-relaxed italic">"{t.quote}"</p>
              <div>
                <div className="font-display font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
