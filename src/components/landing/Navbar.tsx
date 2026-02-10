import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-hero flex items-center justify-center">
            <Heart className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">HerSphere 30</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#modules" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Modules</a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <Link to="/dashboard">
            <Button className="rounded-full bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow px-6">
              Dashboard
            </Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-glass border-t border-border/50 p-4 space-y-3">
          <a href="#modules" className="block text-sm font-medium py-2" onClick={() => setOpen(false)}>Modules</a>
          <a href="#pricing" className="block text-sm font-medium py-2" onClick={() => setOpen(false)}>Pricing</a>
          <Link to="/dashboard" onClick={() => setOpen(false)}>
            <Button className="w-full rounded-full bg-gradient-hero text-primary-foreground">Dashboard</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
