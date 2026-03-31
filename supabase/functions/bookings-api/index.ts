import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claims, error: claimsErr } = await supabase.auth.getClaims(token);
    if (claimsErr || !claims?.claims) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claims.claims.sub as string;
    const url = new URL(req.url);
    const method = req.method;

    // GET /bookings - list bookings
    if (method === "GET") {
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 100);
      const status = url.searchParams.get("status");
      const from = (page - 1) * limit;

      let query = supabase.from("bookings").select("*", { count: "exact" }).range(from, from + limit - 1).order("start_time", { ascending: true });
      if (status) query = query.eq("status", status);

      const { data, error, count } = await query;
      if (error) throw error;

      return new Response(JSON.stringify({ data, total: count, page, limit }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // POST /bookings - create booking
    if (method === "POST") {
      const body = await req.json();
      const { title, start_time, end_time, contact_id, description, location, meeting_url } = body;

      if (!title || !start_time || !end_time) {
        return new Response(JSON.stringify({ error: "title, start_time, end_time are required" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Get user org
      const { data: profile } = await supabase.from("profiles").select("organization_id").eq("id", userId).single();

      const { data, error } = await supabase.from("bookings").insert({
        title, start_time, end_time, contact_id, description, location, meeting_url,
        organization_id: profile?.organization_id,
        created_by: userId,
        assigned_to: userId,
      }).select().single();

      if (error) throw error;

      return new Response(JSON.stringify({ data }), {
        status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Bookings API error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Internal error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
