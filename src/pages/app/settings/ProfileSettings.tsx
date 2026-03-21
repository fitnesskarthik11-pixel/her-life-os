import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function ProfileSettings() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [saving, setSaving] = useState(false);
  const [changingPw, setChangingPw] = useState(false);
  const [newPw, setNewPw] = useState("");

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({ full_name: fullName, phone, job_title: jobTitle }).eq("id", user.id);
    setSaving(false);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Profile updated" });
  };

  const handlePasswordChange = async () => {
    if (newPw.length < 8) {
      toast({ title: "Too short", description: "Min 8 characters", variant: "destructive" });
      return;
    }
    setChangingPw(true);
    const { error } = await supabase.auth.updateUser({ password: newPw });
    setChangingPw(false);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Password updated" }); setNewPw(""); }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Profile Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account information</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground text-xl font-bold">
              {fullName?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <div className="font-medium">{fullName || "Your Name"}</div>
              <div className="text-sm text-muted-foreground">{user?.email}</div>
            </div>
          </div>
          <div className="space-y-2"><Label>Full Name</Label><Input value={fullName} onChange={e => setFullName(e.target.value)} /></div>
          <div className="space-y-2"><Label>Email</Label><Input value={user?.email || ""} disabled className="opacity-60" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Phone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} /></div>
            <div className="space-y-2"><Label>Job Title</Label><Input value={jobTitle} onChange={e => setJobTitle(e.target.value)} /></div>
          </div>
          <Button onClick={handleSave} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Change Password</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>New Password</Label><Input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Min. 8 characters" /></div>
          <Button onClick={handlePasswordChange} disabled={changingPw} variant="outline">{changingPw ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update Password"}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
