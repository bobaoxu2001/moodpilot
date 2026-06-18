import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Reusable "product decision" callout used throughout the Case Study page.
export function Annotation({
  number,
  title,
  children,
  className,
}: {
  number?: number | string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-3xl border-l-4 border-lavender-300 bg-white/70 p-5 pl-6 shadow-soft",
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        {number !== undefined && (
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lavender-500 text-xs font-semibold text-white">
            {number}
          </span>
        )}
        <h3 className="font-medium text-ink">{title}</h3>
      </div>
      <div className="mt-2 text-sm leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}

export function DecisionPair({
  decision,
  rationale,
}: {
  decision: string;
  rationale: string;
}) {
  return (
    <div className="grid gap-3 rounded-3xl bg-cream-100 p-5 sm:grid-cols-[140px_1fr]">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender-500">
        Decision
      </div>
      <p className="text-sm font-medium text-ink">{decision}</p>
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-peach-500">
        Why
      </div>
      <p className="text-sm leading-relaxed text-ink-soft">{rationale}</p>
    </div>
  );
}
