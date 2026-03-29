"use client";

import Link from "next/link";
import { Menu, ShieldCheck } from "lucide-react";
import { siteNavigation } from "@/lib/platform-data";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageToggle } from "@/components/app/language-toggle";
import { AuthPanel } from "@/components/app/auth-panel";
import { LocalizedInline } from "@/components/app/localized-inline";

type SiteHeaderProps = {
  initialEmail?: string | null;
};

export function SiteHeader({ initialEmail }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-[rgba(248,251,255,0.75)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-slate-950 text-white shadow-md">
            <ShieldCheck className="size-4" />
          </div>
          <span className="text-sm font-bold tracking-wide text-slate-900">
            ISO 27001 Lab
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-0.5 xl:flex">
          {siteNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "rounded-full px-3 text-[13px] text-slate-600 hover:bg-white hover:text-slate-950",
              })}
            >
              <LocalizedInline value={item.label} />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <LanguageToggle />
          <AuthPanel initialEmail={initialEmail} />
        </div>

        <div className="ml-auto flex items-center gap-2 xl:hidden">
          <LanguageToggle />
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="icon" className="size-9 rounded-full" />}>
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent className="w-[88vw] max-w-sm border-white/70 bg-white/95">
              <SheetHeader className="space-y-1 pb-1">
                <SheetTitle>ISO 27001 Lab</SheetTitle>
                <SheetDescription>
                  <LocalizedInline
                    value={{
                      en: "Navigate the learning platform.",
                      fr: "Naviguez dans la plateforme d'apprentissage.",
                    }}
                  />
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-3 px-4 pb-6">
                <AuthPanel initialEmail={initialEmail} />
                <div className="space-y-0.5">
                  {siteNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={buttonVariants({
                        variant: "ghost",
                        className:
                          "h-auto w-full justify-start rounded-xl px-3 py-3.5 text-left text-[15px]",
                      })}
                    >
                      <LocalizedInline value={item.label} />
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
