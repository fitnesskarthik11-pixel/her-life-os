
-- ============================================================
-- GS Started: Complete Backend Schema Migration
-- Chatbots, Integrations, Bookings, Groups, Payments, Content
-- ============================================================

-- 1. CHATBOTS
CREATE TABLE public.chatbots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  system_prompt text,
  model text DEFAULT 'google/gemini-2.5-flash',
  is_active boolean DEFAULT true,
  config jsonb DEFAULT '{}'::jsonb,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_chatbots_org ON public.chatbots(organization_id);
ALTER TABLE public.chatbots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view org chatbots" ON public.chatbots FOR SELECT TO authenticated
  USING (organization_id = get_user_org_id(auth.uid()));
CREATE POLICY "Managers insert chatbots" ON public.chatbots FOR INSERT TO authenticated
  WITH CHECK (organization_id = get_user_org_id(auth.uid()) AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager')));
CREATE POLICY "Managers update chatbots" ON public.chatbots FOR UPDATE TO authenticated
  USING (organization_id = get_user_org_id(auth.uid()) AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager')));
CREATE POLICY "Admins delete chatbots" ON public.chatbots FOR DELETE TO authenticated
  USING (organization_id = get_user_org_id(auth.uid()) AND is_admin(auth.uid()));

-- 2. CHAT SESSIONS
CREATE TABLE public.chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chatbot_id uuid REFERENCES public.chatbots(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  title text DEFAULT 'New Chat',
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_chat_sessions_user ON public.chat_sessions(user_id);
CREATE INDEX idx_chat_sessions_bot ON public.chat_sessions(chatbot_id);
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own sessions" ON public.chat_sessions FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY "Users create sessions" ON public.chat_sessions FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users delete own sessions" ON public.chat_sessions FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- 3. CHAT MESSAGES
CREATE TABLE public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES public.chat_sessions(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  tokens_used integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_chat_messages_session ON public.chat_messages(session_id, created_at);
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own messages" ON public.chat_messages FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.chat_sessions cs WHERE cs.id = session_id AND cs.user_id = auth.uid()));
CREATE POLICY "Users insert own messages" ON public.chat_messages FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.chat_sessions cs WHERE cs.id = session_id AND cs.user_id = auth.uid()));

-- 4. INTEGRATIONS (WhatsApp, Telegram, etc.)
CREATE TYPE public.integration_type AS ENUM ('whatsapp', 'telegram', 'slack', 'gmail', 'zapier', 'hubspot', 'custom_webhook');
CREATE TYPE public.integration_status AS ENUM ('active', 'inactive', 'error', 'pending');

CREATE TABLE public.integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  type integration_type NOT NULL,
  name text NOT NULL,
  status integration_status DEFAULT 'pending',
  config jsonb DEFAULT '{}'::jsonb,
  webhook_url text,
  webhook_secret text,
  last_synced_at timestamptz,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_integrations_org ON public.integrations(organization_id);
CREATE INDEX idx_integrations_type ON public.integrations(type);
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view org integrations" ON public.integrations FOR SELECT TO authenticated
  USING (organization_id = get_user_org_id(auth.uid()));
CREATE POLICY "Admins manage integrations" ON public.integrations FOR ALL TO authenticated
  USING (organization_id = get_user_org_id(auth.uid()) AND is_admin(auth.uid()));
CREATE POLICY "Managers insert integrations" ON public.integrations FOR INSERT TO authenticated
  WITH CHECK (organization_id = get_user_org_id(auth.uid()) AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager')));

-- 5. BOOKINGS / APPOINTMENTS
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed', 'no_show');

CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  contact_id uuid REFERENCES public.contacts(id) ON DELETE SET NULL,
  assigned_to uuid,
  title text NOT NULL,
  description text,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status booking_status DEFAULT 'pending',
  location text,
  meeting_url text,
  notes text,
  reminder_sent boolean DEFAULT false,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_bookings_org ON public.bookings(organization_id);
CREATE INDEX idx_bookings_time ON public.bookings(start_time, end_time);
CREATE INDEX idx_bookings_assigned ON public.bookings(assigned_to);
CREATE INDEX idx_bookings_contact ON public.bookings(contact_id);
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view org bookings" ON public.bookings FOR SELECT TO authenticated
  USING (organization_id = get_user_org_id(auth.uid()));
CREATE POLICY "Users create bookings" ON public.bookings FOR INSERT TO authenticated
  WITH CHECK (organization_id = get_user_org_id(auth.uid()));
CREATE POLICY "Users update own bookings" ON public.bookings FOR UPDATE TO authenticated
  USING (organization_id = get_user_org_id(auth.uid()) AND (assigned_to = auth.uid() OR created_by = auth.uid() OR is_admin(auth.uid())));
CREATE POLICY "Admins delete bookings" ON public.bookings FOR DELETE TO authenticated
  USING (organization_id = get_user_org_id(auth.uid()) AND is_admin(auth.uid()));

-- 6. GROUPS / COMMUNITIES
CREATE TABLE public.groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  avatar_url text,
  is_public boolean DEFAULT false,
  max_members integer DEFAULT 100,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_groups_org ON public.groups(organization_id);
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view org groups" ON public.groups FOR SELECT TO authenticated
  USING (organization_id = get_user_org_id(auth.uid()));
CREATE POLICY "Managers create groups" ON public.groups FOR INSERT TO authenticated
  WITH CHECK (organization_id = get_user_org_id(auth.uid()) AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager')));
CREATE POLICY "Admins update groups" ON public.groups FOR UPDATE TO authenticated
  USING (organization_id = get_user_org_id(auth.uid()) AND (is_admin(auth.uid()) OR created_by = auth.uid()));
CREATE POLICY "Admins delete groups" ON public.groups FOR DELETE TO authenticated
  USING (organization_id = get_user_org_id(auth.uid()) AND is_admin(auth.uid()));

CREATE TYPE public.group_member_role AS ENUM ('owner', 'admin', 'moderator', 'member');

CREATE TABLE public.group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES public.groups(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  role group_member_role DEFAULT 'member',
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);
CREATE INDEX idx_group_members_user ON public.group_members(user_id);
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members view group members" ON public.group_members FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.group_members gm WHERE gm.group_id = group_members.group_id AND gm.user_id = auth.uid()));
CREATE POLICY "Users join groups" ON public.group_members FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users leave groups" ON public.group_members FOR DELETE TO authenticated
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.group_members gm WHERE gm.group_id = group_members.group_id AND gm.user_id = auth.uid() AND gm.role IN ('owner', 'admin')));

-- 7. PAYMENTS
CREATE TYPE public.payment_status AS ENUM ('created', 'pending', 'authorized', 'captured', 'failed', 'refunded', 'cancelled');
CREATE TYPE public.payment_provider AS ENUM ('cashfree', 'gpay', 'upi', 'stripe', 'manual');

CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  order_id text UNIQUE NOT NULL,
  provider payment_provider NOT NULL,
  amount numeric(12,2) NOT NULL,
  currency text DEFAULT 'INR',
  status payment_status DEFAULT 'created',
  provider_order_id text,
  provider_payment_id text,
  payment_method text,
  description text,
  metadata jsonb DEFAULT '{}'::jsonb,
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_payments_org ON public.payments(organization_id);
CREATE INDEX idx_payments_user ON public.payments(user_id);
CREATE INDEX idx_payments_order ON public.payments(order_id);
CREATE INDEX idx_payments_status ON public.payments(status);
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own payments" ON public.payments FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR (organization_id = get_user_org_id(auth.uid()) AND is_admin(auth.uid())));
CREATE POLICY "Users create payments" ON public.payments FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "System update payments" ON public.payments FOR UPDATE TO authenticated
  USING (organization_id = get_user_org_id(auth.uid()) AND is_admin(auth.uid()));

-- 8. BLOGS (Content Management)
CREATE TYPE public.content_status AS ENUM ('draft', 'published', 'archived');

CREATE TABLE public.blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  slug text NOT NULL,
  excerpt text,
  content text,
  cover_image_url text,
  author_id uuid NOT NULL,
  status content_status DEFAULT 'draft',
  tags text[] DEFAULT '{}',
  views_count integer DEFAULT 0,
  share_url text,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(organization_id, slug)
);
CREATE INDEX idx_blogs_org ON public.blogs(organization_id);
CREATE INDEX idx_blogs_status ON public.blogs(status);
CREATE INDEX idx_blogs_slug ON public.blogs(slug);
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone view published blogs" ON public.blogs FOR SELECT TO anon, authenticated
  USING (status = 'published');
CREATE POLICY "Authors view own drafts" ON public.blogs FOR SELECT TO authenticated
  USING (author_id = auth.uid());
CREATE POLICY "Authors create blogs" ON public.blogs FOR INSERT TO authenticated
  WITH CHECK (organization_id = get_user_org_id(auth.uid()) AND author_id = auth.uid());
CREATE POLICY "Authors update own blogs" ON public.blogs FOR UPDATE TO authenticated
  USING (author_id = auth.uid() OR (organization_id = get_user_org_id(auth.uid()) AND is_admin(auth.uid())));
CREATE POLICY "Admins delete blogs" ON public.blogs FOR DELETE TO authenticated
  USING (organization_id = get_user_org_id(auth.uid()) AND is_admin(auth.uid()));

-- 9. POSTERS (Shareable visual content)
CREATE TABLE public.posters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  template_data jsonb DEFAULT '{}'::jsonb,
  status content_status DEFAULT 'draft',
  share_url text,
  views_count integer DEFAULT 0,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_posters_org ON public.posters(organization_id);
ALTER TABLE public.posters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone view published posters" ON public.posters FOR SELECT TO anon, authenticated
  USING (status = 'published');
CREATE POLICY "Users view org posters" ON public.posters FOR SELECT TO authenticated
  USING (organization_id = get_user_org_id(auth.uid()));
CREATE POLICY "Users create posters" ON public.posters FOR INSERT TO authenticated
  WITH CHECK (organization_id = get_user_org_id(auth.uid()));
CREATE POLICY "Users update own posters" ON public.posters FOR UPDATE TO authenticated
  USING (created_by = auth.uid() OR (organization_id = get_user_org_id(auth.uid()) AND is_admin(auth.uid())));
CREATE POLICY "Admins delete posters" ON public.posters FOR DELETE TO authenticated
  USING (organization_id = get_user_org_id(auth.uid()) AND is_admin(auth.uid()));

-- 10. SHARE TRACKING
CREATE TABLE public.share_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  platform text NOT NULL,
  shared_by uuid,
  ip_address text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_share_tracking_entity ON public.share_tracking(entity_type, entity_id);
ALTER TABLE public.share_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create share tracking" ON public.share_tracking FOR INSERT TO anon, authenticated
  WITH CHECK (true);
CREATE POLICY "Admins view share tracking" ON public.share_tracking FOR SELECT TO authenticated
  USING (is_admin(auth.uid()));

-- 11. UPDATED_AT TRIGGERS for new tables
CREATE TRIGGER set_updated_at_chatbots BEFORE UPDATE ON public.chatbots FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_chat_sessions BEFORE UPDATE ON public.chat_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_integrations BEFORE UPDATE ON public.integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_bookings BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_groups BEFORE UPDATE ON public.groups FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_payments BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_blogs BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_posters BEFORE UPDATE ON public.posters FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 12. Fix handle_new_user to include organization_id default
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  default_org_id uuid;
BEGIN
  SELECT id INTO default_org_id FROM public.organizations LIMIT 1;
  INSERT INTO public.profiles (id, full_name, email, organization_id)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email, default_org_id);
  INSERT INTO public.user_roles (user_id, role, organization_id)
  VALUES (NEW.id, 'user', COALESCE(default_org_id, gen_random_uuid()));
  RETURN NEW;
END;
$$;
