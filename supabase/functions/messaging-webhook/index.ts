import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  // GET for webhook verification (Telegram/WhatsApp)
  if (req.method === "GET") {
    const url = new URL(req.url);
    const challenge = url.searchParams.get("hub.challenge");
    if (challenge) return new Response(challenge, { status: 200 });
    return new Response("OK", { status: 200 });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const url = new URL(req.url);
    const platform = url.searchParams.get("platform") || "unknown";
    const body = await req.json();

    console.log(`[${platform}] Incoming webhook:`, JSON.stringify(body).slice(0, 500));

    // Log the incoming webhook
    await supabase.from("audit_logs").insert({
      action: `${platform}_webhook_received`,
      entity_type: "integration",
      new_data: { platform, payload_preview: JSON.stringify(body).slice(0, 1000) },
    });

    // Platform-specific handling
    if (platform === "telegram" && body.message) {
      const chatId = body.message.chat.id;
      const text = body.message.text || "";
      const from = body.message.from;

      console.log(`[Telegram] Message from ${from?.username || from?.id}: ${text}`);

      // Store in activities for CRM tracking
      await supabase.from("activities").insert({
        type: "telegram_message",
        title: `Telegram: ${text.slice(0, 100)}`,
        description: text,
        metadata: { chat_id: chatId, from, platform: "telegram" },
        organization_id: (await getDefaultOrgId(supabase)),
      });
    }

    if (platform === "whatsapp" && body.entry) {
      for (const entry of body.entry) {
        for (const change of entry.changes || []) {
          if (change.value?.messages) {
            for (const msg of change.value.messages) {
              console.log(`[WhatsApp] Message from ${msg.from}: ${msg.text?.body || "[media]"}`);

              await supabase.from("activities").insert({
                type: "whatsapp_message",
                title: `WhatsApp: ${(msg.text?.body || "[media]").slice(0, 100)}`,
                description: msg.text?.body || JSON.stringify(msg),
                metadata: { from: msg.from, wa_id: msg.id, platform: "whatsapp" },
                organization_id: (await getDefaultOrgId(supabase)),
              });
            }
          }
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Messaging webhook error:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function getDefaultOrgId(supabase: ReturnType<typeof createClient>): Promise<string> {
  const { data } = await supabase.from("organizations").select("id").limit(1).single();
  return data?.id || "00000000-0000-0000-0000-000000000000";
}
