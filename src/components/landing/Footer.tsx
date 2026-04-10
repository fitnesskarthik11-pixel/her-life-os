import { Heart, Github, Twitter, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "All Modules", href: "/#modules" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Why HerSphere", to: "/marketing-home" },
      { label: "Dashboard", to: "/app" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Press Kit", to: "/press-kit" },
      { label: "Contact", href: "/#contact" },
      { label: "Careers", href: "mailto:careers@hersphere30.com", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Security", href: "mailto:security@hersphere30.com", external: true },
    ],
  },
];

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

const Footer = () => (
  <footer className="relative border-t border-border/50 bg-background">
    {/* Subtle top gradient */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

    <div className="container py-16 lg:py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14"
      >
        {/* Brand column */}
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="h-9 w-9 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
              <Heart className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">HerSphere 30</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
            The complete women's life operating system. 30 AI-powered modules. One beautiful platform.
          </p>
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-muted/50 hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Link columns */}
        {footerSections.map((section) => (
          <motion.div key={section.title} variants={staggerItem}>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-foreground/80">
              {section.title}
            </h4>
            <ul className="space-y-3">
              {section.links.map((link) => {
                const isTo = "to" in link && link.to;
                return (
                  <li key={link.label}>
                    {isTo ? (
                      <Link
                        to={link.to!}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        {"external" in link && <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        {"external" in link && <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} HerSphere 30. Built with love for women everywhere.
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground/60">
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <span>·</span>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <span>·</span>
          <span>Made in India 🇮🇳</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
