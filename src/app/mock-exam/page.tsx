import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MockExamStudio } from "@/components/app/mock-exam-studio";

const secondaryLinkClass =
  "inline-flex h-10 items-center justify-center rounded-full border border-slate-300 bg-white/70 px-5 text-sm font-medium text-slate-700 transition hover:bg-white";

export default function MockExamPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-8 flex flex-wrap gap-3">
        <Link href="/dashboard" className={secondaryLinkClass}>
          See dashboard impact
          <ArrowRight className="ml-2 size-4" />
        </Link>
        <Link href="/practice" className={secondaryLinkClass}>
          Return to practice
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </section>

      <MockExamStudio />
    </main>
  );
}
