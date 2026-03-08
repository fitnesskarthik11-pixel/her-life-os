import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PermissionGate } from "@/components/PermissionGate";

const mockMembers = [
  { name: "Jane Smith", email: "jane@example.com", role: "super_admin", status: "active" },
  { name: "Alex Johnson", email: "alex@example.com", role: "admin", status: "active" },
  { name: "Priya Patel", email: "priya@example.com", role: "manager", status: "active" },
  { name: "Sam Wilson", email: "sam@example.com", role: "user", status: "active" },
  { name: "Invited User", email: "invited@example.com", role: "user", status: "pending" },
];

const roleColors: Record<string, string> = {
  super_admin: "bg-primary text-primary-foreground",
  admin: "bg-warm-light text-warm",
  manager: "bg-lavender-light text-lavender",
  user: "bg-sage-light text-sage",
  viewer: "bg-muted text-muted-foreground",
};

export default function TeamSettings() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleInvite = () => {
    if (!email) return;
    toast({ title: "Invitation sent", description: `Invited ${email}` });
    setEmail("");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Team Management</h1>
        <p className="text-sm text-muted-foreground">Manage team members and roles</p>
      </div>

      <PermissionGate requiredRole="admin">
        <Card>
          <CardHeader><CardTitle className="text-base">Invite Team Member</CardTitle></CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} className="max-w-sm" />
              <Button onClick={handleInvite}><UserPlus className="h-4 w-4 mr-2" />Invite</Button>
            </div>
          </CardContent>
        </Card>
      </PermissionGate>

      <Card>
        <CardHeader><CardTitle className="text-base">Team Members</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMembers.map(m => (
                <TableRow key={m.email}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{m.name}</div>
                      <div className="text-sm text-muted-foreground">{m.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[m.role] || ""}`}>
                      {m.role.replace("_", " ")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={m.status === "active" ? "default" : "secondary"}>{m.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
