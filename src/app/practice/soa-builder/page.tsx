import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { SoaBuilderStudio } from "@/components/app/soa-builder-studio";

type SoaBuilderPageProps = {
  searchParams: Promise<{
    scenario?: string;
  }>;
};

export default async function SoaBuilderPage({ searchParams }: SoaBuilderPageProps) {
  const { scenario } = await searchParams;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/82 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <Badge className="rounded-full bg-slate-950 text-white">Statement of Applicability</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950">
          Build a realistic SoA with traceable applicability, implementation rationale, and evidence expectations
        </h1>
        <BilingualCopy
          value={{
            en: "This builder now teaches what the SoA is, why auditors care, how applicability links to treatment decisions, what weak rationale looks like, and what evidence a stronger SoA position should point to.",
            fr: "Ce générateur enseigne désormais ce qu'est la SoA, pourquoi les auditeurs y tiennent, comment l'applicabilité se relie aux décisions de traitement, à quoi ressemble une justification faible et vers quelle preuve une position SoA plus solide devrait pointer.",
          }}
          containerClassName="mt-6"
        />
      </section>

      <section className="mt-10">
        <SoaBuilderStudio initialScenarioId={scenario} />
      </section>
    </main>
  );
}
