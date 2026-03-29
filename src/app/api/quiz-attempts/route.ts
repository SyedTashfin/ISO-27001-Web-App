import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { Json } from "@/lib/supabase/types";

const payloadSchema = z.object({
  moduleSlug: z.string().min(1),
  score: z.number().int().min(0),
  maxScore: z.number().int().min(1),
  answers: z.record(z.string(), z.string()),
});

export async function POST(request: Request) {
  const payload = payloadSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid quiz payload." }, { status: 400 });
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

  const { error } = await supabase.from("quiz_attempts").insert({
    user_id: user.id,
    module_slug: payload.data.moduleSlug,
    score: payload.data.score,
    max_score: payload.data.maxScore,
    answers: payload.data.answers as Json,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
