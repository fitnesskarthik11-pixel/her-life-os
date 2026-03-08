import { motion } from "framer-motion";
import { TrendingUp, Users, Building2, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, LabelList } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

const revenueData = [
  { month: "Jan", revenue: 45000 }, { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 61000 }, { month: "Apr", revenue: 58000 },
  { month: "May", revenue: 72000 }, { month: "Jun", revenue: 85000 },
];

const funnelData = [
  { name: "Leads", value: 120, fill: "hsl(var(--primary))" },
  { name: "Qualified", value: 80, fill: "hsl(var(--warm))" },
  { name: "Proposal", value: 45, fill: "hsl(var(--gold))" },
  { name: "Negotiation", value: 28, fill: "hsl(var(--sage))" },
  { name: "Won", value: 18, fill: "hsl(var(--sky))" },
];

export default function DashboardHome() {
  const { profile } = useAuth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const kpis = [
    { label: "Total Revenue", value: "₹8,50,000", change: "+12.5%", up: true, icon: DollarSign, color: "text-primary" },
    { label: "Contacts", value: "1,284", change: "+8.2%", up: true, icon: Users, color: "text-sage" },
    { label: "Companies", value: "156", change: "+3.1%", up: true, icon: Building2, color: "text-lavender" },
    { label: "Open Deals", value: "42", change: "-2.4%", up: false, icon: TrendingUp, color: "text-warm" },
  ];

  const recentDeals = [
    { title: "Enterprise Plan — Acme Corp", value: "₹2,40,000", stage: "Proposal", date: "Today" },
    { title: "Pro Upgrade — TechFlow", value: "₹85,000", stage: "Negotiation", date: "Yesterday" },
    { title: "Starter Pack — Nova Labs", value: "₹35,000", stage: "Qualified", date: "2 days ago" },
    { title: "Custom Deal — Bright Inc", value: "₹1,50,000", stage: "Won", date: "3 days ago" },
    { title: "Annual — CloudBase", value: "₹4,20,000", stage: "Lead", date: "This week" },
  ];

  const stageColor: Record<string, string> = {
    Lead: "bg-muted text-muted-foreground",
    Qualified: "bg-gold-light text-gold",
    Proposal: "bg-lavender-light text-lavender",
    Negotiation: "bg-warm-light text-warm",
    Won: "bg-sage-light text-sage",
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold">Welcome back{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""} ✨</h1>
        <p className="text-muted-foreground text-sm mt-1">Here's what's happening with your CRM today.</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{kpi.label}</span>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                <div className="text-2xl font-bold font-display">{kpi.value}</div>
                <div className={`flex items-center gap-1 text-xs mt-1 ${kpi.up ? "text-sage" : "text-destructive"}`}>
                  {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {kpi.change} from last month
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Revenue Trend</CardTitle></CardHeader>
          <CardContent>
            {mounted && (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Pipeline Funnel</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {funnelData.map((stage, i) => (
                <div key={stage.name} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-24">{stage.name}</span>
                  <div className="flex-1 h-8 rounded-lg bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(stage.value / funnelData[0].value) * 100}%` }}
                      transition={{ delay: i * 0.15, duration: 0.6 }}
                      className="h-full rounded-lg"
                      style={{ background: stage.fill }}
                    />
                  </div>
                  <span className="text-sm font-semibold w-8 text-right">{stage.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Deals */}
      <Card>
        <CardHeader><CardTitle className="text-base">Recent Deals</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDeals.map(deal => (
                <TableRow key={deal.title}>
                  <TableCell className="font-medium">{deal.title}</TableCell>
                  <TableCell>{deal.value}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${stageColor[deal.stage] || ""}`}>{deal.stage}</span>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">{deal.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
