import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { ControlExplorer } from "@/components/app/control-explorer";
import { controlCategoryOverview } from "@/lib/platform-data";
import { annexAPracticalCards } from "@/lib/practical-learning-data";

type ControlLibraryPageProps = {
  searchParams: Promise<{
    control?: string;
  }>;
};

export default async function ControlLibraryPage({ searchParams }: ControlLibraryPageProps) {
  const { control } = await searchParams;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/82 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <Badge className="rounded-full bg-slate-950 text-white">Control library</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950">
          Explore all 93 Annex A controls with business meaning and audit relevance
        </h1>
        <BilingualCopy
          value={{
            en: "The control library is designed for risk-based learning. Filter by category, business theme, control type, or keyword, then review how each control connects to risks, evidence, and SoA logic.",
            fr: "La bibliothèque des mesures est conçue pour un apprentissage fondé sur le risque. Filtrez par catégorie, thème métier, type de mesure ou mot-clé, puis voyez comment chaque mesure se relie aux risques, à la preuve et à la logique de SoA.",
          }}
          containerClassName="mt-6"
        />
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {annexAPracticalCards.map((card) => (
          <article
            key={card.title.en}
            className="rounded-[1.75rem] border border-white/70 bg-white/82 p-5 shadow-[0_28px_72px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm"
          >
            <div className="text-sm font-semibold text-slate-950">{card.title.en}</div>
            <div className="text-sm text-slate-500">{card.title.fr}</div>
            <BilingualCopy
              value={card.body}
              compact
              containerClassName="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
            />
          </article>
        ))}
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {controlCategoryOverview.map((summary) => (
          <article
            key={summary.category}
            className="rounded-[1.75rem] border border-white/70 bg-white/82 p-5 shadow-[0_28px_72px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {summary.category}
            </div>
            <div className="mt-2 text-4xl font-semibold text-slate-950">{summary.count}</div>
            <BilingualCopy
              value={summary.businessLens}
              compact
              containerClassName="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
            />
          </article>
        ))}
      </section>

      <section className="mt-10">
        <ControlExplorer initialControlCode={control} />
      </section>
    </main>
  );
}
