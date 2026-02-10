import {
  Heart, Activity, Baby, Dumbbell, Brain, Shield, Users, Plane,
  Home, UtensilsCrossed, Sparkles, Shirt, ShoppingBag, Wallet,
  Rocket, GraduationCap, BookOpen, Video, HeartHandshake, Watch,
  MapPin, Laugh, Globe, Film, MessageSquareWarning, Receipt,
  Stethoscope, Car, PersonStanding, CalendarCheck
} from "lucide-react";

export type ModuleCategory = "health" | "safety" | "lifestyle" | "finance" | "career" | "community" | "family";

export interface AppModule {
  id: number;
  name: string;
  description: string;
  icon: any;
  category: ModuleCategory;
  color: string;
  tier: "starter" | "pro" | "elite";
}

export const modules: AppModule[] = [
  { id: 1, name: "Cycle & Hormone Health Hub", description: "Track cycles, symptoms, and hormone patterns with AI insights", icon: Heart, category: "health", color: "rose", tier: "starter" },
  { id: 2, name: "PCOS / Endo Companion", description: "Personalized management for PCOS and endometriosis", icon: Activity, category: "health", color: "rose", tier: "pro" },
  { id: 3, name: "Fertility → Pregnancy → Postpartum", description: "Complete journey from conception to recovery", icon: Baby, category: "health", color: "peach", tier: "pro" },
  { id: 4, name: "Pelvic Floor & Core Coach", description: "Guided exercises and progress tracking", icon: Dumbbell, category: "health", color: "sage", tier: "starter" },
  { id: 5, name: "Mental Fitness Minis", description: "Quick mental health exercises and mood tracking", icon: Brain, category: "health", color: "lavender", tier: "starter" },
  { id: 6, name: "Safer Nights & Travel", description: "Real-time safety check-ins and emergency alerts", icon: Shield, category: "safety", color: "sky", tier: "starter" },
  { id: 7, name: "Dating Safety Co-Pilot", description: "Background checks, live tracking, red-flag alerts", icon: Users, category: "safety", color: "rose", tier: "pro" },
  { id: 8, name: "Solo Female Traveler Planner", description: "Safe routes, community tips, emergency contacts", icon: Plane, category: "safety", color: "sky", tier: "pro" },
  { id: 9, name: "Home & Mental Load Manager", description: "Distribute household tasks fairly and track them", icon: Home, category: "lifestyle", color: "warm", tier: "starter" },
  { id: 10, name: "Meal Plan for Real Life", description: "AI-powered meal planning with dietary needs", icon: UtensilsCrossed, category: "lifestyle", color: "sage", tier: "pro" },
  { id: 11, name: "Skin & Beauty Lab", description: "Skin analysis, routine builder, product tracker", icon: Sparkles, category: "lifestyle", color: "peach", tier: "pro" },
  { id: 12, name: "Wardrobe & Outfit OS", description: "Digital closet with AI outfit suggestions", icon: Shirt, category: "lifestyle", color: "lavender", tier: "pro" },
  { id: 13, name: "Circular Closet Marketplace", description: "Buy, sell, and swap pre-loved fashion", icon: ShoppingBag, category: "lifestyle", color: "sage", tier: "elite" },
  { id: 14, name: "Financial Power Planner", description: "Budgets, investments, and wealth building", icon: Wallet, category: "finance", color: "gold", tier: "starter" },
  { id: 15, name: "Side-Hustle Command Center", description: "Manage your business, orders, and invoices", icon: Rocket, category: "career", color: "warm", tier: "pro" },
  { id: 16, name: "Career Mentor Match", description: "Connect with mentors in your industry", icon: GraduationCap, category: "career", color: "lavender", tier: "elite" },
  { id: 17, name: "Learning Circles", description: "Group learning and skill-sharing communities", icon: BookOpen, category: "community", color: "sky", tier: "pro" },
  { id: 18, name: "Creator Repack Studio", description: "Repurpose content across platforms with AI", icon: Video, category: "career", color: "peach", tier: "elite" },
  { id: 19, name: "Parenting & Caregiving Hub", description: "Schedules, milestones, and care coordination", icon: HeartHandshake, category: "family", color: "warm", tier: "pro" },
  { id: 20, name: "Health Signals (Wearables)", description: "Sync Apple Health & Google Fit data", icon: Watch, category: "health", color: "sage", tier: "elite" },
  { id: 21, name: "Local Trusted Services", description: "Verified local professionals reviewed by women", icon: MapPin, category: "community", color: "sky", tier: "starter" },
  { id: 22, name: "Friend & Hobby Finder", description: "Find like-minded women nearby", icon: Laugh, category: "community", color: "peach", tier: "pro" },
  { id: 23, name: "Women-Only Language Exchange", description: "Practice languages in safe spaces", icon: Globe, category: "community", color: "lavender", tier: "elite" },
  { id: 24, name: "Book/Film Club OS", description: "Organize and discuss with your circles", icon: Film, category: "community", color: "warm", tier: "pro" },
  { id: 25, name: "Anti-Harassment Inbox", description: "Encrypted evidence collection and reporting", icon: MessageSquareWarning, category: "safety", color: "rose", tier: "elite" },
  { id: 26, name: "Subscription & Bill Defender", description: "Track, negotiate, and cancel subscriptions", icon: Receipt, category: "finance", color: "gold", tier: "starter" },
  { id: 27, name: "Breast & Repro Health Reminders", description: "Screening schedules and self-check guides", icon: Stethoscope, category: "health", color: "rose", tier: "pro" },
  { id: 28, name: "Car Care Coach", description: "Maintenance reminders and mechanic finder", icon: Car, category: "lifestyle", color: "sky", tier: "starter" },
  { id: 29, name: "Home Fitness Studio", description: "At-home workouts tailored to your body", icon: PersonStanding, category: "health", color: "sage", tier: "starter" },
  { id: 30, name: "Beauty & Wellness Booking", description: "Book and manage salon and spa appointments", icon: CalendarCheck, category: "lifestyle", color: "peach", tier: "pro" },
];

export const categoryLabels: Record<ModuleCategory, string> = {
  health: "Health & Wellness",
  safety: "Safety & Security",
  lifestyle: "Lifestyle & Beauty",
  finance: "Finance & Money",
  career: "Career & Business",
  community: "Community & Social",
  family: "Family & Caregiving",
};

export const categoryColors: Record<ModuleCategory, string> = {
  health: "rose",
  safety: "sky",
  lifestyle: "peach",
  finance: "gold",
  career: "lavender",
  community: "sage",
  family: "warm",
};
