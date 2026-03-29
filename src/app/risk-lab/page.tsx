import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { RiskTreatmentStudio } from "@/components/app/risk-treatment-studio";

const secondaryLinkClass =
  "inline-flex h-10 items-center justify-center rounded-full border border-slate-300 bg-white/70 px-5 text-sm font-medium text-slate-700 transition hover:bg-white";

type RiskLabPageProps = {
  searchParams: Promise<{
    scenario?: string;
  }>;
};

export default async function RiskLabPage({ searchParams }: RiskLabPageProps) {
  const { scenario } = await searchParams;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/82 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <Badge className="rounded-full bg-slate-950 text-white">Risk lab</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950">
          Build a risk register from assets, threats, vulnerabilities, scoring, treatment, and control mapping
        </h1>
        <BilingualCopy
          value={{
            en: "The Risk Lab is intentionally educational rather than bureaucratic. Choose a company scenario, build risk statements, score likelihood and impact, pick the treatment path, and connect the result to Annex A controls.",
            fr: "Le Risk Lab est volontairement pédagogique plutôt que bureaucratique. Choisissez un scénario d'entreprise, construisez des énoncés de risque, notez vraisemblance et impact, choisissez le traitement puis reliez le résultat aux mesures de l'Annexe A.",
          }}
          containerClassName="mt-6"
        />
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "Risk analysis",
            text: "Identify assets, threats, and vulnerabilities, then score likelihood and impact to see why the risk matters.",
          },
          {
            title: "Risk treatment",
            text: "Choose between mitigate, avoid, transfer, and accept with a business rationale instead of a compliance reflex.",
          },
          {
            title: "Control linkage",
            text: "Map treated risks to Annex A controls, then continue into the SoA builder to mark applicability and implementation status.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-[1.75rem] border border-white/70 bg-white/82 p-5 shadow-[0_28px_72px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {item.title}
            </div>
            <div className="mt-3 text-base leading-7 text-slate-700">{item.text}</div>
          </article>
        ))}
      </section>

      <section className="mt-8 flex flex-wrap gap-3">
        <Link href="/practice/soa-builder" className={secondaryLinkClass}>
          Continue to SoA builder
          <ArrowRight className="ml-2 size-4" />
        </Link>
        <Link href="/implementation-journey" className={secondaryLinkClass}>
          View the full implementation journey
          <ArrowRight className="ml-2 size-4" />
        </Link>
        <Link href="/control-library" className={secondaryLinkClass}>
          Open the control library
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </section>

      <section className="mt-10">
        <RiskTreatmentStudio initialScenarioId={scenario} />
      </section>
    </main>
  );
}
