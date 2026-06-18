import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-lavender-500">
            {eyebrow}
          </p>
        )}
        <h1 className="text-balance font-serif text-3xl font-semibold tracking-tight text-ink sm:text-[2.1rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-2.5 text-pretty text-[15px] leading-relaxed text-ink-soft">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
