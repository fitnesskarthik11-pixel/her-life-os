import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="py-16 border-t border-border">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-gradient-hero flex items-center justify-center">
              <Heart className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">HerSphere 30</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The complete women's life operating system. 30 modules. One platform.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Product</h4>
          <ul className="space-y-2">
            <li><a href="/#modules" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Modules</a></li>
            <li><a href="/#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
            <li><Link to="/marketing-home" className="text-sm text-muted-foreground hover:text-primary transition-colors">Why HerSphere</Link></li>
            <li><Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li><Link to="/press-kit" className="text-sm text-muted-foreground hover:text-primary transition-colors">Press Kit</Link></li>
            <li><a href="/#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            <li><a href="mailto:careers@hersphere30.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><a href="mailto:security@hersphere30.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">Security</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} HerSphere 30. Built with love for women everywhere.
      </div>
    </div>
  </footer>
);

export default Footer;
