import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        Not found
      </p>
      <h1 className="mt-4 text-5xl font-semibold text-slate-950">
        The module or page you requested does not exist.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-slate-600">
        Return to the learning workspace and continue from the guided path.
      </p>
      <Link
        href="/learn"
        className="mt-8 inline-flex h-10 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Back to learning path
      </Link>
    </main>
  );
}
