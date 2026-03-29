import Link from "next/link";
import { siteNavigation } from "@/lib/platform-data";
import { LocalizedInline } from "@/components/app/localized-inline";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-[rgba(248,251,255,0.72)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-2">
            <p className="text-sm font-bold tracking-wide text-slate-900">
              ISO 27001 Lab
            </p>
            <p className="max-w-lg text-sm leading-6 text-slate-500">
              <LocalizedInline
                value={{
                  en: "Built for practical ISO 27001 understanding, risk reasoning, and audit fluency.",
                  fr: "Concu pour une comprehension pratique de l'ISO 27001, du raisonnement risque et de l'aisance en audit.",
                }}
              />
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {siteNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2.5 py-1.5 text-sm text-slate-600 transition hover:bg-white hover:text-slate-900"
              >
                <LocalizedInline value={item.label} />
              </Link>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-200/80 pt-4 text-xs text-slate-400">
          Next.js, TypeScript, Tailwind, shadcn/ui, Supabase.
        </div>
      </div>
    </footer>
  );
}
