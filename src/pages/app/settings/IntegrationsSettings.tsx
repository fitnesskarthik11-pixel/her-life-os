import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, Zap, Globe } from "lucide-react";

const integrations = [
  { name: "Slack", description: "Send notifications and updates to Slack channels", icon: MessageSquare, connected: false, color: "bg-lavender-light text-lavender" },
  { name: "Gmail", description: "Sync emails and track conversations", icon: Mail, connected: false, color: "bg-warm-light text-warm" },
  { name: "Zapier", description: "Connect to 5000+ apps via Zapier", icon: Zap, connected: false, color: "bg-gold-light text-gold" },
  { name: "HubSpot", description: "Bi-directional sync with HubSpot CRM", icon: Globe, connected: false, color: "bg-sage-light text-sage" },
];

export default function IntegrationsSettings() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Integrations</h1>
        <p className="text-sm text-muted-foreground">Connect your favorite tools</p>
      </div>

      <div className="space-y-4">
        {integrations.map(int => (
          <Card key={int.name}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${int.color}`}>
                <int.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="font-medium">{int.name}</div>
                <div className="text-sm text-muted-foreground">{int.description}</div>
              </div>
              <Button variant={int.connected ? "outline" : "default"} size="sm">
                {int.connected ? "Disconnect" : "Connect"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
