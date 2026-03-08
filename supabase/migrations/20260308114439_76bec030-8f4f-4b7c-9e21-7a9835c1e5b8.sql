
-- Roles enum
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'manager', 'user', 'viewer');

-- Organizations
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id),
  full_name TEXT,
  avatar_url TEXT,
  email TEXT,
  phone TEXT,
  job_title TEXT,
  notification_preferences JSONB DEFAULT '{"email": true, "push": true, "sms": false}'::jsonb,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES public.organizations(id) NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE(user_id, organization_id)
);

-- Contacts (CRM)
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  company_id UUID,
  status TEXT DEFAULT 'active',
  source TEXT,
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  custom_fields JSONB DEFAULT '{}'::jsonb,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Companies (CRM)
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) NOT NULL,
  name TEXT NOT NULL,
  domain TEXT,
  industry TEXT,
  size TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  logo_url TEXT,
  annual_revenue NUMERIC,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add FK from contacts to companies
ALTER TABLE public.contacts ADD CONSTRAINT contacts_company_fk FOREIGN KEY (company_id) REFERENCES public.companies(id);

-- Deal stages
CREATE TYPE public.deal_stage AS ENUM ('lead', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost');

-- Deals (CRM)
CREATE TABLE public.deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) NOT NULL,
  title TEXT NOT NULL,
  value NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'INR',
  stage deal_stage DEFAULT 'lead',
  probability INTEGER DEFAULT 0,
  contact_id UUID REFERENCES public.contacts(id),
  company_id UUID REFERENCES public.companies(id),
  expected_close_date DATE,
  notes TEXT,
  assigned_to UUID REFERENCES auth.users(id),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Activities
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  contact_id UUID REFERENCES public.contacts(id),
  deal_id UUID REFERENCES public.deals(id),
  company_id UUID REFERENCES public.companies(id),
  performed_by UUID REFERENCES auth.users(id),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT DEFAULT 'info',
  read BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Audit logs
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_contacts_org ON public.contacts(organization_id);
CREATE INDEX idx_contacts_company ON public.contacts(company_id);
CREATE INDEX idx_companies_org ON public.companies(organization_id);
CREATE INDEX idx_deals_org ON public.deals(organization_id);
CREATE INDEX idx_deals_stage ON public.deals(stage);
CREATE INDEX idx_deals_contact ON public.deals(contact_id);
CREATE INDEX idx_activities_org ON public.activities(organization_id);
CREATE INDEX idx_activities_contact ON public.activities(contact_id);
CREATE INDEX idx_activities_deal ON public.activities(deal_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_audit_logs_org ON public.audit_logs(organization_id);
CREATE INDEX idx_user_roles_user ON public.user_roles(user_id);

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.get_user_org_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id FROM public.profiles WHERE id = _user_id LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('super_admin', 'admin')
  )
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.contacts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.deals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles RLS
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.is_admin(auth.uid()));

-- User roles RLS
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.is_admin(auth.uid()));

-- Organizations RLS
CREATE POLICY "Members can view own org" ON public.organizations FOR SELECT USING (id = public.get_user_org_id(auth.uid()));
CREATE POLICY "Admins can update org" ON public.organizations FOR UPDATE USING (id = public.get_user_org_id(auth.uid()) AND public.is_admin(auth.uid()));

-- Contacts RLS
CREATE POLICY "Users can view org contacts" ON public.contacts FOR SELECT USING (organization_id = public.get_user_org_id(auth.uid()));
CREATE POLICY "Users can insert org contacts" ON public.contacts FOR INSERT WITH CHECK (organization_id = public.get_user_org_id(auth.uid()));
CREATE POLICY "Users can update org contacts" ON public.contacts FOR UPDATE USING (organization_id = public.get_user_org_id(auth.uid()));
CREATE POLICY "Admins can delete contacts" ON public.contacts FOR DELETE USING (organization_id = public.get_user_org_id(auth.uid()) AND public.is_admin(auth.uid()));

-- Companies RLS
CREATE POLICY "Users can view org companies" ON public.companies FOR SELECT USING (organization_id = public.get_user_org_id(auth.uid()));
CREATE POLICY "Users can insert org companies" ON public.companies FOR INSERT WITH CHECK (organization_id = public.get_user_org_id(auth.uid()));
CREATE POLICY "Users can update org companies" ON public.companies FOR UPDATE USING (organization_id = public.get_user_org_id(auth.uid()));
CREATE POLICY "Admins can delete companies" ON public.companies FOR DELETE USING (organization_id = public.get_user_org_id(auth.uid()) AND public.is_admin(auth.uid()));

-- Deals RLS
CREATE POLICY "Users can view org deals" ON public.deals FOR SELECT USING (organization_id = public.get_user_org_id(auth.uid()));
CREATE POLICY "Users can insert org deals" ON public.deals FOR INSERT WITH CHECK (organization_id = public.get_user_org_id(auth.uid()));
CREATE POLICY "Users can update org deals" ON public.deals FOR UPDATE USING (organization_id = public.get_user_org_id(auth.uid()));
CREATE POLICY "Admins can delete deals" ON public.deals FOR DELETE USING (organization_id = public.get_user_org_id(auth.uid()) AND public.is_admin(auth.uid()));

-- Activities RLS
CREATE POLICY "Users can view org activities" ON public.activities FOR SELECT USING (organization_id = public.get_user_org_id(auth.uid()));
CREATE POLICY "Users can insert org activities" ON public.activities FOR INSERT WITH CHECK (organization_id = public.get_user_org_id(auth.uid()));

-- Notifications RLS
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Audit logs RLS
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "System can insert audit logs" ON public.audit_logs FOR INSERT WITH CHECK (true);
