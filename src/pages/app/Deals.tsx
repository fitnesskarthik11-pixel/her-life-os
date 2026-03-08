import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type DealStage = "lead" | "qualified" | "proposal" | "negotiation" | "closed_won" | "closed_lost";

const stages: { key: DealStage; label: string; color: string }[] = [
  { key: "lead", label: "Lead", color: "bg-muted" },
  { key: "qualified", label: "Qualified", color: "bg-gold-light" },
  { key: "proposal", label: "Proposal", color: "bg-lavender-light" },
  { key: "negotiation", label: "Negotiation", color: "bg-warm-light" },
  { key: "closed_won", label: "Won", color: "bg-sage-light" },
  { key: "closed_lost", label: "Lost", color: "bg-rose-light" },
];

export default function Deals() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: "", value: "" });

  const { data: deals, isLoading } = useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      const { data, error } = await supabase.from("deals").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (deal: { title: string; value: string }) => {
      const { error } = await supabase.from("deals").insert({
        title: deal.title,
        value: parseFloat(deal.value) || 0,
        organization_id: profile?.organization_id,
        stage: "lead" as DealStage,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      setDialogOpen(false);
      setForm({ title: "", value: "" });
      toast({ title: "Deal created" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const updateStage = useMutation({
    mutationFn: async ({ id, stage }: { id: string; stage: DealStage }) => {
      const { error } = await supabase.from("deals").update({ stage }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["deals"] }),
  });

  const groupedDeals = stages.map(s => ({
    ...s,
    deals: deals?.filter(d => d.stage === s.key) ?? [],
    total: deals?.filter(d => d.stage === s.key).reduce((sum, d) => sum + Number(d.value || 0), 0) ?? 0,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Deals Pipeline</h1>
          <p className="text-sm text-muted-foreground">{deals?.length || 0} deals</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-gradient-hero text-primary-foreground"><Plus className="h-4 w-4 mr-1" />New Deal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Deal</DialogTitle></DialogHeader>
            <form onSubmit={e => { e.preventDefault(); createMutation.mutate(form); }} className="space-y-4">
              <div className="space-y-2"><Label>Title*</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Value (₹)</Label><Input type="number" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} /></div>
              <Button type="submit" className="w-full" disabled={createMutation.isPending}>{createMutation.isPending ? "Creating..." : "Create Deal"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64" />)}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto">
          {groupedDeals.map(stage => (
            <div key={stage.key} className="min-w-[220px]">
              <div className={`rounded-t-lg px-3 py-2 ${stage.color}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{stage.label}</span>
                  <span className="text-xs text-muted-foreground">{stage.deals.length}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">₹{stage.total.toLocaleString("en-IN")}</div>
              </div>
              <div className="space-y-2 p-2 min-h-[200px] bg-muted/30 rounded-b-lg border border-t-0 border-border/50">
                {stage.deals.map(deal => (
                  <motion.div
                    key={deal.id}
                    layout
                    className="bg-card rounded-lg p-3 shadow-sm border border-border/50 cursor-pointer hover:shadow-card transition-shadow"
                  >
                    <div className="text-sm font-medium mb-1 line-clamp-2">{deal.title}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      ₹{Number(deal.value || 0).toLocaleString("en-IN")}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
