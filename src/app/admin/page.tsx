import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { ContentStudio } from "@/components/app/content-studio";

export default function AdminPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/82 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <Badge className="rounded-full bg-slate-950 text-white">Admin / Content Studio</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950">
          Edit bilingual lessons, glossary terms, practice prompts, scenarios, and finding cases
        </h1>
        <BilingualCopy
          value={{
            en: "This is a basic internal content surface for future scaling. It is intentionally lightweight, but already structured around bilingual field editing and draft persistence.",
            fr: "Il s'agit d'une surface interne de contenu basique pour une montée en échelle future. Elle est volontairement légère, mais déjà structurée autour de l'édition bilingue et de la persistance de brouillons.",
          }}
          containerClassName="mt-6"
        />
      </section>

      <section className="mt-10">
        <ContentStudio />
      </section>
    </main>
  );
}
