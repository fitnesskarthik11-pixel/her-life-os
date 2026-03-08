import { Bell, Search, Moon, Sun, LogOut, User, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(s => !s);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || "U";

  return (
    <header className="h-14 border-b border-border flex items-center px-4 gap-3 bg-background sticky top-0 z-40">
      <SidebarTrigger className="mr-1" />

      <Link to="/app" className="flex items-center gap-2 mr-4">
        <div className="h-7 w-7 rounded-full bg-gradient-hero flex items-center justify-center">
          <Heart className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <span className="font-display text-sm font-bold hidden sm:block">HerSphere</span>
      </Link>

      {/* Search */}
      <button
        onClick={() => setSearchOpen(true)}
        className="flex items-center gap-2 h-9 px-3 rounded-lg bg-muted text-muted-foreground text-sm flex-1 max-w-sm hover:bg-accent transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex ml-auto text-xs bg-background px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
      </button>

      <div className="flex items-center gap-1 ml-auto">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 w-8 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground text-xs font-semibold ml-1">
              {initials}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => navigate("/app/settings/profile")}>
              <User className="h-4 w-4 mr-2" />Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/app/settings/profile")}>
              <Settings className="h-4 w-4 mr-2" />Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
              <LogOut className="h-4 w-4 mr-2" />Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
