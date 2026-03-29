import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

const payloadSchema = z.object({
  moduleSlug: z.string().min(1),
  progressPercent: z.number().min(0).max(100),
  completed: z.boolean(),
  source: z.string().min(1),
});

export async function POST(request: Request) {
  const payload = payloadSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid progress payload." }, { status: 400 });
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json({ ok: true, mode: "local-only" });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { error } = await supabase.from("module_progress").upsert(
    {
      user_id: user.id,
      module_slug: payload.data.moduleSlug,
      progress_percent: payload.data.progressPercent,
      completed: payload.data.completed,
      last_activity_at: new Date().toISOString(),
      source: payload.data.source,
    },
    {
      onConflict: "user_id,module_slug",
    },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
