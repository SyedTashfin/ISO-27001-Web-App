import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Clock3 } from "lucide-react";
import { getModuleBySlug, learningModules } from "@/lib/platform-data";
import { Badge } from "@/components/ui/badge";
import { BilingualCopy } from "@/components/app/bilingual-copy";
import { ModuleQuiz } from "@/components/app/module-quiz";

type ModulePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return learningModules.map((module) => ({
    slug: module.slug,
  }));
}

export async function generateMetadata({ params }: ModulePageProps): Promise<Metadata> {
  const { slug } = await params;
  const currentModule = getModuleBySlug(slug);

  if (!currentModule) {
    return {
      title: "Module not found | ISO 27001 Lab",
    };
  }

  return {
    title: `${currentModule.title.en} | ISO 27001 Lab`,
    description: currentModule.summary.en,
  };
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { slug } = await params;
  const currentModule = getModuleBySlug(slug);
  const cardLinkClass =
    "flex h-auto w-full items-center justify-between rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white";

  if (!currentModule) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_34px_90px_-56px_rgba(15,23,42,0.42)] backdrop-blur-sm md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="rounded-full bg-slate-950 text-white">{currentModule.eyebrow.en}</Badge>
          <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50">
            {currentModule.level.en}
          </Badge>
          <div className="inline-flex items-center gap-2 text-sm text-slate-500">
            <Clock3 className="size-4" />
            {currentModule.durationMinutes} minutes
          </div>
        </div>
        <div className="mt-6">
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950">
            {currentModule.title.en}
          </h1>
          <p className="mt-3 text-xl text-slate-500">{currentModule.title.fr}</p>
        </div>
        <BilingualCopy value={currentModule.summary} containerClassName="mt-6" />
      </section>

      <section className="mt-10 grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="space-y-5">
          <article className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Lesson overview
            </p>
            <BilingualCopy value={currentModule.simple} containerClassName="mt-4" />
          </article>

          <article className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Professional explanation
            </p>
            <BilingualCopy value={currentModule.professional} containerClassName="mt-4" />
          </article>

          <article className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Practical example
            </p>
            <BilingualCopy value={currentModule.practical} containerClassName="mt-4" />
          </article>

          <article className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Content blocks
            </p>
            <div className="mt-4 space-y-4">
              {currentModule.contentBlocks.map((block) => (
                <div key={block.title.en} className="rounded-[1.5rem] border border-slate-200 bg-slate-50/75 p-4">
                  <div className="font-semibold text-slate-950">{block.title.en}</div>
                  <div className="text-sm text-slate-500">{block.title.fr}</div>
                  <BilingualCopy
                    value={block.body}
                    compact
                    containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none"
                  />
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Examples and callouts
            </p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {currentModule.examples.map((example) => (
                <div key={example.en} className="rounded-[1.5rem] border border-slate-200 bg-slate-50/75 p-4">
                  <BilingualCopy
                    value={example}
                    compact
                    containerClassName="border-0 bg-transparent p-0 shadow-none"
                  />
                </div>
              ))}
              {currentModule.callouts.map((callout) => (
                <div key={callout.title.en} className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                  <div className="text-sm font-semibold text-slate-950">{callout.title.en}</div>
                  <div className="text-sm text-slate-500">{callout.title.fr}</div>
                  <BilingualCopy
                    value={callout.body}
                    compact
                    containerClassName="mt-3 border-0 bg-transparent p-0 shadow-none"
                  />
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Interactive prompt
            </p>
            <BilingualCopy value={currentModule.exercise} containerClassName="mt-4" />
          </article>
        </div>

        <aside className="space-y-5">
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Learning objectives
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {currentModule.learningObjectives.map((objective) => (
                <li key={objective.en}>
                  <span className="font-medium text-slate-950">{objective.en}</span>
                  <span className="text-slate-400"> / {objective.fr}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Learning outcomes
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {currentModule.outcomes.map((outcome) => (
                <li key={outcome.en}>
                  <span className="font-medium text-slate-950">{outcome.en}</span>
                  <span className="text-slate-400"> / {outcome.fr}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Key artifacts
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {currentModule.keyArtifacts.map((artifact) => (
                <li key={artifact.en}>
                  <span className="font-medium text-slate-950">{artifact.en}</span>
                  <span className="text-slate-400"> / {artifact.fr}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Recap summary
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {currentModule.recap.map((item) => (
                <li key={item.en}>
                  <span className="font-medium text-slate-950">{item.en}</span>
                  <span className="text-slate-400"> / {item.fr}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Continue from here
            </p>
            <div className="mt-4 space-y-3">
              {currentModule.relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className={cardLinkClass}>
                  <span>
                    <span className="block font-medium text-slate-950">{link.label.en}</span>
                    <span className="block text-sm text-slate-500">{link.label.fr}</span>
                  </span>
                  <ArrowRight className="size-4 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-10">
        <ModuleQuiz moduleSlug={currentModule.slug} questions={currentModule.quiz} />
      </section>
    </main>
  );
}
