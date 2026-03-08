import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";

const roles = ["Super Admin", "Admin", "Manager", "User", "Viewer"];
const permissions = [
  { name: "View Contacts", roles: [true, true, true, true, true] },
  { name: "Create Contacts", roles: [true, true, true, true, false] },
  { name: "Edit Contacts", roles: [true, true, true, true, false] },
  { name: "Delete Contacts", roles: [true, true, false, false, false] },
  { name: "View Deals", roles: [true, true, true, true, true] },
  { name: "Create Deals", roles: [true, true, true, true, false] },
  { name: "Edit Deals", roles: [true, true, true, false, false] },
  { name: "Delete Deals", roles: [true, true, false, false, false] },
  { name: "View Reports", roles: [true, true, true, true, false] },
  { name: "Export Data", roles: [true, true, true, false, false] },
  { name: "Manage Team", roles: [true, true, false, false, false] },
  { name: "Manage Roles", roles: [true, true, false, false, false] },
  { name: "View Audit Logs", roles: [true, true, false, false, false] },
  { name: "Manage Billing", roles: [true, true, false, false, false] },
  { name: "Manage Integrations", roles: [true, true, true, false, false] },
];

export default function RolesSettings() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Roles & Permissions</h1>
        <p className="text-sm text-muted-foreground">Configure role-based access control</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Permission Matrix</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-48">Permission</TableHead>
                {roles.map(r => <TableHead key={r} className="text-center">{r}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map(p => (
                <TableRow key={p.name}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  {p.roles.map((has, i) => (
                    <TableCell key={i} className="text-center">
                      {has ? <Check className="h-4 w-4 text-sage mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
