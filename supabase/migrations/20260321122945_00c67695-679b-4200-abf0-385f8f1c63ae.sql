CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Helper functions
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin', 'super_admin')) $$;

-- Auto-create profile + role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email) VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS set_updated_at ON public.profiles;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
DROP TRIGGER IF EXISTS set_updated_at ON public.contacts;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.contacts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
DROP TRIGGER IF EXISTS set_updated_at ON public.companies;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
DROP TRIGGER IF EXISTS set_updated_at ON public.deals;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.deals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
DROP TRIGGER IF EXISTS set_updated_at ON public.organizations;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- RLS Policies (drop if exist to avoid conflicts)
DO $$ BEGIN
  -- Profiles
  DROP POLICY IF EXISTS "Users read own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
  CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
  CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());

  -- User roles
  DROP POLICY IF EXISTS "Users read own role" ON public.user_roles;
  DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
  CREATE POLICY "Users read own role" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
  CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

  -- Contacts
  DROP POLICY IF EXISTS "Auth read contacts" ON public.contacts;
  DROP POLICY IF EXISTS "Auth insert contacts" ON public.contacts;
  DROP POLICY IF EXISTS "Auth update contacts" ON public.contacts;
  DROP POLICY IF EXISTS "Auth delete contacts" ON public.contacts;
  CREATE POLICY "Auth read contacts" ON public.contacts FOR SELECT TO authenticated USING (true);
  CREATE POLICY "Auth insert contacts" ON public.contacts FOR INSERT TO authenticated WITH CHECK (true);
  CREATE POLICY "Auth update contacts" ON public.contacts FOR UPDATE TO authenticated USING (true);
  CREATE POLICY "Auth delete contacts" ON public.contacts FOR DELETE TO authenticated USING (true);

  -- Companies
  DROP POLICY IF EXISTS "Auth read companies" ON public.companies;
  DROP POLICY IF EXISTS "Auth insert companies" ON public.companies;
  DROP POLICY IF EXISTS "Auth update companies" ON public.companies;
  DROP POLICY IF EXISTS "Auth delete companies" ON public.companies;
  CREATE POLICY "Auth read companies" ON public.companies FOR SELECT TO authenticated USING (true);
  CREATE POLICY "Auth insert companies" ON public.companies FOR INSERT TO authenticated WITH CHECK (true);
  CREATE POLICY "Auth update companies" ON public.companies FOR UPDATE TO authenticated USING (true);
  CREATE POLICY "Auth delete companies" ON public.companies FOR DELETE TO authenticated USING (true);

  -- Deals
  DROP POLICY IF EXISTS "Auth read deals" ON public.deals;
  DROP POLICY IF EXISTS "Auth insert deals" ON public.deals;
  DROP POLICY IF EXISTS "Auth update deals" ON public.deals;
  DROP POLICY IF EXISTS "Auth delete deals" ON public.deals;
  CREATE POLICY "Auth read deals" ON public.deals FOR SELECT TO authenticated USING (true);
  CREATE POLICY "Auth insert deals" ON public.deals FOR INSERT TO authenticated WITH CHECK (true);
  CREATE POLICY "Auth update deals" ON public.deals FOR UPDATE TO authenticated USING (true);
  CREATE POLICY "Auth delete deals" ON public.deals FOR DELETE TO authenticated USING (true);

  -- Activities
  DROP POLICY IF EXISTS "Auth read activities" ON public.activities;
  DROP POLICY IF EXISTS "Auth insert activities" ON public.activities;
  CREATE POLICY "Auth read activities" ON public.activities FOR SELECT TO authenticated USING (true);
  CREATE POLICY "Auth insert activities" ON public.activities FOR INSERT TO authenticated WITH CHECK (true);

  -- Notifications
  DROP POLICY IF EXISTS "Users read own notifs" ON public.notifications;
  DROP POLICY IF EXISTS "Users update own notifs" ON public.notifications;
  CREATE POLICY "Users read own notifs" ON public.notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
  CREATE POLICY "Users update own notifs" ON public.notifications FOR UPDATE TO authenticated USING (user_id = auth.uid());

  -- Audit logs
  DROP POLICY IF EXISTS "Admins read audit" ON public.audit_logs;
  DROP POLICY IF EXISTS "System insert audit" ON public.audit_logs;
  CREATE POLICY "Admins read audit" ON public.audit_logs FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
  CREATE POLICY "System insert audit" ON public.audit_logs FOR INSERT TO authenticated WITH CHECK (true);

  -- Contact submissions (public)
  DROP POLICY IF EXISTS "Anyone submit contact" ON public.contact_submissions;
  DROP POLICY IF EXISTS "Admins read submissions" ON public.contact_submissions;
  CREATE POLICY "Anyone submit contact" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
  CREATE POLICY "Admins read submissions" ON public.contact_submissions FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));

  -- Newsletter (public)
  DROP POLICY IF EXISTS "Anyone subscribe" ON public.newsletter_subscribers;
  DROP POLICY IF EXISTS "Admins read subs" ON public.newsletter_subscribers;
  CREATE POLICY "Anyone subscribe" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);
  CREATE POLICY "Admins read subs" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
END $$;