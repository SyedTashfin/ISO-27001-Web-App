import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { Json } from "@/lib/supabase/types";

const payloadSchema = z.object({
  simulationType: z.string().min(1),
  simulationKey: z.string().min(1),
  payload: z.record(z.string(), z.unknown()),
});

export async function POST(request: Request) {
  const payload = payloadSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid simulation payload." }, { status: 400 });
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

  const { error } = await supabase.from("simulation_states").upsert(
    {
      user_id: user.id,
      simulation_type: payload.data.simulationType,
      simulation_key: payload.data.simulationKey,
      payload: payload.data.payload as Json,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id,simulation_type,simulation_key",
    },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
