"use client";

import { useCallback, useMemo, useRef, useSyncExternalStore } from "react";
import { CheckCircle2, Clock3, Gauge } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { storageKeys, subscribeToStorageKey } from "@/lib/storage";

type ModuleProgressRecord = Record<
  string,
  {
    completed?: boolean;
    progressPercent?: number;
  }
>;

const emptyProgress: ModuleProgressRecord = {};

export function ProgressOverview({ totalModules }: { totalModules: number }) {
  const cachedRef = useRef<{ raw: string | null; parsed: ModuleProgressRecord }>({
    raw: null,
    parsed: emptyProgress,
  });

  const getSnapshot = useCallback((): ModuleProgressRecord => {
    const raw =
      typeof window === "undefined"
        ? null
        : window.localStorage.getItem(storageKeys.moduleProgress);
    if (raw === cachedRef.current.raw) return cachedRef.current.parsed;
    const parsed = raw ? (() => { try { return JSON.parse(raw) as ModuleProgressRecord; } catch { return emptyProgress; } })() : emptyProgress;
    cachedRef.current = { raw, parsed };
    return parsed;
  }, []);

  const progress = useSyncExternalStore<ModuleProgressRecord>(
    (callback) => subscribeToStorageKey(storageKeys.moduleProgress, callback),
    getSnapshot,
    () => emptyProgress,
  );

  const stats = useMemo(() => {
    const values = Object.values(progress);
    const completed = values.filter((entry) => entry.completed).length;
    const average =
      values.length > 0
        ? Math.round(
            values.reduce((sum, entry) => sum + (entry.progressPercent ?? 0), 0) / values.length,
          )
        : 0;

    return {
      completed,
      inFlight: values.filter((entry) => !entry.completed && (entry.progressPercent ?? 0) > 0).length,
      overallPercent: totalModules > 0 ? Math.round((completed / totalModules) * 100) : 0,
      average,
    };
  }, [progress, totalModules]);

  return (
    <Card className="border-white/65 bg-white/80 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-sm">
      <CardContent className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Learning Pulse
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-950">
              Progress across the lab
            </h3>
          </div>
          <Gauge className="size-5 text-sky-700" />
        </div>
        <Progress value={stats.overallPercent} className="h-2.5 bg-slate-200" />
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-slate-50/80 p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <CheckCircle2 className="size-3.5 text-emerald-600" />
              Completed
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-950">{stats.completed}</div>
          </div>
          <div className="rounded-2xl border border-border/70 bg-slate-50/80 p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Clock3 className="size-3.5 text-amber-600" />
              In progress
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-950">{stats.inFlight}</div>
          </div>
          <div className="rounded-2xl border border-border/70 bg-slate-50/80 p-3">
            <div className="text-xs font-medium text-muted-foreground">Average module readiness</div>
            <div className="mt-2 text-2xl font-semibold text-slate-950">{stats.average}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
