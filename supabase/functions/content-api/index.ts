import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const entityType = url.searchParams.get("type") || "blog"; // blog | poster
    const method = req.method;

    // Public GET for published content (no auth required)
    if (method === "GET" && url.searchParams.get("public") === "true") {
      const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
      const table = entityType === "poster" ? "posters" : "blogs";
      const slug = url.searchParams.get("slug");

      if (slug) {
        const { data, error } = await supabase.from(table).select("*").eq("slug", slug).eq("status", "published").single();
        if (error || !data) {
          return new Response(JSON.stringify({ error: "Not found" }), {
            status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        // Increment views
        await supabase.from(table).update({ views_count: (data.views_count || 0) + 1 }).eq("id", data.id);
        return new Response(JSON.stringify({ data }), {
          status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 50);
      const { data, count } = await supabase.from(table).select("*", { count: "exact" })
        .eq("status", "published").order("created_at", { ascending: false }).range((page - 1) * limit, page * limit - 1);
      return new Response(JSON.stringify({ data, total: count, page, limit }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Authenticated endpoints
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
    const table = entityType === "poster" ? "posters" : "blogs";

    if (method === "GET") {
      const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (method === "POST") {
      const body = await req.json();
      const { data: profile } = await supabase.from("profiles").select("organization_id").eq("id", userId).single();

      const insertData: Record<string, unknown> = {
        ...body,
        organization_id: profile?.organization_id,
        ...(entityType === "blog" ? { author_id: userId } : { created_by: userId }),
      };

      const { data, error } = await supabase.from(table).insert(insertData).select().single();
      if (error) throw error;

      return new Response(JSON.stringify({ data }), {
        status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Content API error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Internal error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
