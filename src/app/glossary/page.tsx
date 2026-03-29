import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { GlossaryExplorer } from "@/components/app/glossary-explorer";
import { WorkplacePhrasingPanel } from "@/components/app/workplace-phrasing-panel";

export default function GlossaryPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <Badge className="rounded-full bg-slate-950 text-white">Bilingual glossary</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950">
          Learn the vocabulary and phrasing people actually use in work
        </h1>
        <BilingualCopy
          value={{
            en: "This glossary is designed for practical use in France. It does not stop at literal translation. It shows how ISO 27001 concepts are explained naturally in English and French during projects, audits, and meetings.",
            fr: "Ce glossaire est conçu pour un usage pratique en France. Il ne s'arrête pas à la traduction littérale. Il montre comment les concepts ISO 27001 s'expliquent naturellement en anglais et en français pendant les projets, les audits et les réunions.",
          }}
          containerClassName="mt-6"
        />
      </section>

      <section className="mt-10">
        <WorkplacePhrasingPanel
          title="Workplace phrasing library"
          description="Phrasing that learners in France can reuse in audits, project meetings, close-out discussions, and certification-readiness workshops."
        />
      </section>

      <section className="mt-10">
        <GlossaryExplorer />
      </section>
    </main>
  );
}
