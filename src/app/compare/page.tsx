import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { compareFrameworks } from "@/lib/platform-data";

export default function ComparePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/82 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <Badge className="rounded-full bg-slate-950 text-white">Compare</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950">
          Compare ISO 27001 with ISO 27002, ISO 19011, SOC 2, GDPR, and HIPAA
        </h1>
        <BilingualCopy
          value={{
            en: "This compare section is designed to reduce common confusion. It separates laws from standards, certification from attestation, and implementation guidance from audit guidance.",
            fr: "Cette section comparatif est conçue pour réduire les confusions fréquentes. Elle sépare les lois des normes, la certification de l'attestation et le guide de mise en oeuvre du guide d'audit.",
          }}
          containerClassName="mt-6"
        />
      </section>

      <section className="mt-10 space-y-4">
        {compareFrameworks.map((framework) => (
          <article
            key={framework.id}
            className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm"
          >
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="rounded-full bg-slate-950 text-white">{framework.name}</Badge>
              <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
                {framework.title.en}
              </Badge>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
              <CompareCell title="Type" value={framework.type} />
              <CompareCell title="Purpose" value={framework.purpose} />
              <CompareCell title="Who uses it" value={framework.whoUsesIt} />
              <CompareCell title="Law / standard / attestation" value={framework.legalStatus} />
            </div>
            <div className="mt-4 rounded-[1.5rem] border border-slate-200/80 bg-slate-50/75 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Relevance to businesses
              </div>
              <BilingualCopy
                value={framework.businessRelevance}
                compact
                containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none"
              />
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function CompareCell({
  title,
  value,
}: {
  title: string;
  value: {
    en: string;
    fr: string;
  };
}) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/75 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</div>
      <div className="mt-3 font-medium text-slate-950">{value.en}</div>
      <div className="text-sm text-slate-500">{value.fr}</div>
    </div>
  );
}
