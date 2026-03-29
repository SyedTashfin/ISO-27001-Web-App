import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { LanguageProvider } from "@/components/app/language-provider";
import { SiteHeader } from "@/components/app/site-header";
import { SiteFooter } from "@/components/app/site-footer";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "ISO 27001 Lab",
    template: "%s | ISO 27001 Lab",
  },
  description:
    "A bilingual interactive learning platform for practical ISO/IEC 27001 understanding in English and French.",
};

async function getInitialEmail() {
  if (!isSupabaseConfigured) {
    return null;
  }

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user?.email ?? null;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialEmail = await getInitialEmail();

  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
            <SiteHeader initialEmail={initialEmail} />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
          <Toaster richColors position="top-right" />
        </LanguageProvider>
      </body>
    </html>
  );
}
