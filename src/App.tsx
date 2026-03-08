import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import MarketingHome from "./pages/MarketingHome";
import PressKit from "./pages/PressKit";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AppLayout from "./layouts/AppLayout";
import DashboardHome from "./pages/app/DashboardHome";
import Contacts from "./pages/app/Contacts";
import Companies from "./pages/app/Companies";
import Deals from "./pages/app/Deals";
import Reports from "./pages/app/Reports";
import Workflows from "./pages/app/Workflows";
import ProfileSettings from "./pages/app/settings/ProfileSettings";
import TeamSettings from "./pages/app/settings/TeamSettings";
import RolesSettings from "./pages/app/settings/RolesSettings";
import BillingSettings from "./pages/app/settings/BillingSettings";
import IntegrationsSettings from "./pages/app/settings/IntegrationsSettings";
import NotificationSettings from "./pages/app/settings/NotificationSettings";
import AuditLogs from "./pages/app/settings/AuditLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Index />} />
              <Route path="/marketing-home" element={<MarketingHome />} />
              <Route path="/press-kit" element={<PressKit />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* App (auth required) */}
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="companies" element={<Companies />} />
                <Route path="deals" element={<Deals />} />
                <Route path="reports" element={<Reports />} />
                <Route path="workflows" element={<Workflows />} />
                <Route path="settings/profile" element={<ProfileSettings />} />
                <Route path="settings/team" element={<TeamSettings />} />
                <Route path="settings/roles" element={<RolesSettings />} />
                <Route path="settings/billing" element={<BillingSettings />} />
                <Route path="settings/integrations" element={<IntegrationsSettings />} />
                <Route path="settings/notifications" element={<NotificationSettings />} />
                <Route path="settings/audit" element={<AuditLogs />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
