import { SAFETY_COPY, TRUST_COPY } from "@/lib/constants";
import { cn } from "@/lib/cn";

// Persistent trust + safety strip. Reused across the product so the
// positioning ("communication support, not therapy") is never out of view.
export function SafetyBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-2 rounded-3xl border border-lavender-100 bg-lavender-50/70 px-4 py-3 text-xs text-ink-soft",
        className
      )}
    >
      <span className="inline-flex items-center gap-1.5 font-medium text-lavender-700">
        <ShieldIcon />
        {SAFETY_COPY}
      </span>
      <span className="hidden h-3 w-px bg-lavender-200 sm:block" />
      <span className="inline-flex items-center gap-1.5">
        <LockIcon />
        {TRUST_COPY}
      </span>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
