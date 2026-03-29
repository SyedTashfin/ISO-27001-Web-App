"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { riskLabScenarios } from "@/lib/platform-data";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { useLanguageMode } from "@/components/app/language-provider";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export function ScenarioLab() {
  const { mode } = useLanguageMode();
  const lang = mode === "fr" ? "fr" : "en";
  const [activeScenarioId, setActiveScenarioId] = useState(riskLabScenarios[0]?.id);

  const activeScenario =
    riskLabScenarios.find((scenario) => scenario.id === activeScenarioId) ?? riskLabScenarios[0];

  if (!activeScenario) {
    return null;
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-3">
        {riskLabScenarios.map((scenario) => {
          const isActive = scenario.id === activeScenario.id;

          return (
            <button
              key={scenario.id}
              type="button"
              className={`w-full rounded-2xl border p-4 text-left transition ${
                isActive
                  ? "border-slate-950 bg-slate-950 text-white shadow-lg"
                  : "border-slate-200/80 bg-white/80 text-slate-900 hover:border-slate-300 hover:bg-white"
              }`}
              onClick={() => setActiveScenarioId(scenario.id)}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`rounded-xl p-2.5 ${isActive ? "bg-white/10" : "bg-slate-100"}`}>
                    <Building2 className="size-4" />
                  </div>
                  <div>
                    <div className="font-semibold">{scenario.company}</div>
                    <div className={`text-sm ${isActive ? "text-white/70" : "text-slate-500"}`}>
                      {scenario.sector[lang]}
                    </div>
                  </div>
                </div>
                <ArrowRight className={`size-4 transition ${isActive ? "translate-x-1" : ""}`} />
              </div>
              <div className={`mt-3 text-sm leading-6 ${isActive ? "text-white/85" : "text-slate-600"}`}>
                {scenario.title[lang]}
              </div>
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeScenario.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-slate-200/80 bg-white/80 p-6"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="rounded-full bg-slate-950 text-white">{activeScenario.company}</Badge>
          <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
            {activeScenario.sector[lang]}
          </Badge>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
            <MapPin className="size-3" />
            {activeScenario.location[lang]}
          </div>
        </div>

        <h3 className="mt-4 text-2xl font-bold text-slate-950">{activeScenario.title[lang]}</h3>

        <div className="mt-4">
          <BilingualCopy value={activeScenario.context} />
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
              {lang === "fr" ? "Axes pedagogiques" : "Teaching focus"}
            </div>
            <ul className="mt-3 space-y-2 text-sm text-emerald-950">
              {activeScenario.teachingFocus.map((focus) => (
                <li key={focus.en}>{focus[lang]}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50/80 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-800">
              {lang === "fr" ? "Exemples d'actifs" : "Example assets"}
            </div>
            <ul className="mt-3 space-y-2 text-sm text-sky-950">
              {activeScenario.assets.slice(0, 3).map((asset) => (
                <li key={asset.en}>{asset[lang]}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5">
          <Link href="/risk-lab#soa-workbench" className={buttonVariants({ className: "rounded-full" })}>
            {lang === "fr" ? "Travailler ce scenario dans le lab SoA" : "Work this scenario in the SoA lab"}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
