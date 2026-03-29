"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogIn, LogOut, Mail, ShieldEllipsis } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/env";

type AuthPanelProps = {
  initialEmail?: string | null;
};

export function AuthPanel({ initialEmail }: AuthPanelProps) {
  const [email, setEmail] = useState(initialEmail ?? "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const summary = useMemo(() => {
    if (!isSupabaseConfigured) {
      return "Guest mode";
    }

    return initialEmail ? initialEmail : "Save progress";
  }, [initialEmail]);

  async function handleSendMagicLink() {
    if (!email) {
      toast.error("Enter an email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(pathname)}`;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (error) {
        throw error;
      }

      toast.success("Magic link sent. Check your inbox.");
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to send the magic link.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSignOut() {
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      toast.success("Signed out.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign out.");
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 bg-white/70 px-3 py-2 text-sm text-slate-600">
        <ShieldEllipsis className="size-4 text-slate-500" />
        {summary}
      </div>
    );
  }

  if (initialEmail) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-white/65 bg-white/80 px-3 py-2 text-sm shadow-sm backdrop-blur-sm">
        <span className="max-w-40 truncate text-slate-700">{summary}</span>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="rounded-full px-2 text-slate-600 hover:bg-slate-100"
          onClick={handleSignOut}
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger render={<Button className="rounded-full" variant="outline" size="sm" />}>
        <LogIn className="size-4" />
        Save progress
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-[2rem] border-white/70 bg-white/95 p-6">
        <DialogHeader>
          <DialogTitle>Sign in with magic link</DialogTitle>
          <DialogDescription>
            Use Supabase authentication to keep quiz results and simulations attached to your account.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700" htmlFor="email">
            Email address
          </label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(event) => setEmail(event.target.value)}
            />
            <Button type="button" disabled={isSubmitting} onClick={handleSendMagicLink}>
              <Mail className="size-4" />
              Send
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            The app still works in guest mode, but Supabase-backed progress will only sync after sign-in.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
