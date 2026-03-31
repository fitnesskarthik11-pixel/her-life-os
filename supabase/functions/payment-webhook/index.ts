import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cashfree-signature, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();
    const { order_id, provider, status, provider_order_id, provider_payment_id, payment_method } = body;

    if (!order_id || !provider || !status) {
      return new Response(JSON.stringify({ error: "Missing required fields: order_id, provider, status" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const validStatuses = ["pending", "authorized", "captured", "failed", "refunded", "cancelled"];
    if (!validStatuses.includes(status)) {
      return new Response(JSON.stringify({ error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const updateData: Record<string, unknown> = { status, updated_at: new Date().toISOString() };
    if (provider_order_id) updateData.provider_order_id = provider_order_id;
    if (provider_payment_id) updateData.provider_payment_id = provider_payment_id;
    if (payment_method) updateData.payment_method = payment_method;
    if (status === "captured") updateData.paid_at = new Date().toISOString();

    const { error } = await supabase
      .from("payments")
      .update(updateData)
      .eq("order_id", order_id);

    if (error) {
      console.error("Payment webhook DB error:", error);
      return new Response(JSON.stringify({ error: "Failed to update payment" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Log to audit
    await supabase.from("audit_logs").insert({
      action: "payment_webhook",
      entity_type: "payment",
      entity_id: null,
      new_data: body,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Payment webhook error:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
