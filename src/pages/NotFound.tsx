import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "404 — Page Not Found | HerSphere 30";
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-warm/5 blur-[100px]" />

      <div className="text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="font-display text-[120px] sm:text-[180px] font-bold leading-none text-gradient-hero opacity-20 select-none"
        >
          404
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-3xl sm:text-4xl font-bold -mt-8 mb-3"
        >
          Page not found
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-8 max-w-md mx-auto"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-3"
        >
          <Button variant="outline" onClick={() => window.history.back()} className="rounded-full">
            <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
          </Button>
          <Link to="/">
            <Button className="rounded-full bg-gradient-hero text-primary-foreground shadow-glow hover:opacity-90">
              <Home className="h-4 w-4 mr-2" /> Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
