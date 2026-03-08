import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Rocket } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹999",
    period: "/mo",
    icon: Zap,
    features: ["5 users", "1,000 contacts", "Basic CRM", "Email support", "5 GB storage"],
    current: false,
  },
  {
    name: "Pro",
    price: "₹2,499",
    period: "/mo",
    icon: Crown,
    features: ["25 users", "25,000 contacts", "Full CRM + Pipeline", "Priority support", "50 GB storage", "Workflows", "Reports"],
    current: true,
  },
  {
    name: "Elite",
    price: "₹7,999",
    period: "/mo",
    icon: Rocket,
    features: ["Unlimited users", "Unlimited contacts", "AI Copilot", "24/7 support", "500 GB storage", "Custom integrations", "Audit logs", "SSO"],
    current: false,
  },
];

export default function BillingSettings() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Billing</h1>
        <p className="text-sm text-muted-foreground">Manage your subscription and billing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(plan => (
          <Card key={plan.name} className={plan.current ? "border-primary ring-2 ring-primary/20" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <plan.icon className="h-6 w-6 text-primary" />
                {plan.current && <Badge>Current</Badge>}
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-sage" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.current ? "outline" : "default"} className="w-full" disabled={plan.current}>
                {plan.current ? "Current Plan" : "Upgrade"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
