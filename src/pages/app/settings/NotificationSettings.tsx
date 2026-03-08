import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function NotificationSettings() {
  const [prefs, setPrefs] = useState({
    email_deals: true,
    email_contacts: true,
    email_team: false,
    push_deals: true,
    push_mentions: true,
    push_reminders: true,
  });

  const toggle = (key: keyof typeof prefs) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Notification Settings</h1>
        <p className="text-sm text-muted-foreground">Choose what notifications you receive</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Email Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: "email_deals" as const, label: "Deal updates", desc: "When a deal stage changes" },
            { key: "email_contacts" as const, label: "New contacts", desc: "When new contacts are added" },
            { key: "email_team" as const, label: "Team activity", desc: "Team member actions" },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <Label className="font-medium">{item.label}</Label>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch checked={prefs[item.key]} onCheckedChange={() => toggle(item.key)} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Push Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: "push_deals" as const, label: "Deal alerts", desc: "Important deal status changes" },
            { key: "push_mentions" as const, label: "Mentions", desc: "When someone mentions you" },
            { key: "push_reminders" as const, label: "Reminders", desc: "Task and follow-up reminders" },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <Label className="font-medium">{item.label}</Label>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch checked={prefs[item.key]} onCheckedChange={() => toggle(item.key)} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
