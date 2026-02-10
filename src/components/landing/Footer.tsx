import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="py-16 border-t border-border">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-gradient-hero flex items-center justify-center">
              <Heart className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">HerSphere 30</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The complete women's life operating system. 30 modules. One platform.
          </p>
        </div>
        {[
          { title: "Product", links: ["All Modules", "Pricing", "Roadmap", "Changelog"] },
          { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
          { title: "Legal", links: ["Privacy Policy", "Terms of Service", "GDPR", "Security"] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="font-display font-semibold mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} HerSphere 30. Built with love for women everywhere.
      </div>
    </div>
  </footer>
);

export default Footer;
