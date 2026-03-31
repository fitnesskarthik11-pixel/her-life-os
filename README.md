# GS Started — All-in-One Business Platform

> Chatbot • Social Integrations • Booking • Groups • WhatsApp & Telegram • Payments • Content & Sharing

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Lovable Cloud (Supabase) — PostgreSQL, Auth, Edge Functions, RLS
- **AI**: Lovable AI Gateway (Gemini, GPT)
- **Payments**: Cashfree + GPay UPI (INR)

## Features

- 🔐 Full authentication (email/password, Google OAuth, password reset)
- 👥 RBAC with 5 roles (super_admin, admin, manager, user, viewer)
- 💬 AI Chatbot with configurable system prompts
- 📱 WhatsApp & Telegram webhook integrations
- 📅 Booking / appointment management
- 👥 Groups & communities
- 💳 Payment processing (Cashfree, GPay UPI)
- 📝 Blog & poster content management with public sharing
- 📊 CRM: Contacts, Companies, Deals pipeline, Reports
- 🔍 Audit logging & activity tracking

## Database Tables

| Table | Purpose |
|-------|---------|
| profiles | User profiles linked to auth |
| user_roles | RBAC role assignments |
| organizations | Multi-tenant orgs |
| contacts | CRM contacts |
| companies | CRM companies |
| deals | Sales pipeline |
| activities | Activity feed |
| audit_logs | Security audit trail |
| notifications | User notifications |
| chatbots | Chatbot configurations |
| chat_sessions | Chat conversation sessions |
| chat_messages | Individual chat messages |
| integrations | WhatsApp/Telegram/Slack configs |
| bookings | Appointments & scheduling |
| groups | Community groups |
| group_members | Group membership |
| payments | Payment orders & status |
| blogs | Blog content management |
| posters | Visual content management |
| share_tracking | Social share analytics |
| contact_submissions | Public contact form |
| newsletter_subscribers | Newsletter signups |

## Edge Functions

| Function | Purpose |
|----------|---------|
| `health-check` | Service health & version |
| `chat` | AI chatbot with streaming |
| `payment-webhook` | Cashfree/GPay payment callbacks |
| `messaging-webhook` | WhatsApp & Telegram incoming |
| `bookings-api` | CRUD for appointments |
| `content-api` | Blog & poster management |

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Edge functions deploy automatically via Lovable Cloud

## Environment Variables

Managed automatically by Lovable Cloud:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

## License

Proprietary — GS Started © 2026
