import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Workflow, Play, Pause, Zap, Mail, MessageSquare, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const workflows = [
  { id: 1, name: "New Lead Follow-up", trigger: "Contact Created", actions: 3, status: "active", runs: 142 },
  { id: 2, name: "Deal Won Notification", trigger: "Deal Stage Changed", actions: 2, status: "active", runs: 38 },
  { id: 3, name: "Weekly Pipeline Report", trigger: "Scheduled (Weekly)", actions: 1, status: "paused", runs: 12 },
  { id: 4, name: "Welcome Email Sequence", trigger: "Contact Created", actions: 5, status: "active", runs: 567 },
  { id: 5, name: "Stale Deal Alert", trigger: "Scheduled (Daily)", actions: 2, status: "active", runs: 89 },
];

export default function Workflows() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Workflows</h1>
          <p className="text-sm text-muted-foreground">Automate your CRM processes</p>
        </div>
        <Button size="sm" className="bg-gradient-hero text-primary-foreground"><Plus className="h-4 w-4 mr-1" />New Workflow</Button>
      </div>

      <div className="space-y-3">
        {workflows.map(wf => (
          <Card key={wf.id}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="h-10 w-10 rounded-lg bg-lavender-light flex items-center justify-center">
                <Workflow className="h-5 w-5 text-lavender" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium">{wf.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                  <Zap className="h-3 w-3" />{wf.trigger}
                  <span className="text-border">•</span>
                  {wf.actions} actions
                  <span className="text-border">•</span>
                  {wf.runs} runs
                </div>
              </div>
              <Badge variant={wf.status === "active" ? "default" : "secondary"}>
                {wf.status === "active" ? <Play className="h-3 w-3 mr-1" /> : <Pause className="h-3 w-3 mr-1" />}
                {wf.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
