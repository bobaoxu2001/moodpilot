import { Card, CardEyebrow } from "@/components/ui/Card";
import type { SuggestedAction } from "@/lib/types";
import type { ReactElement } from "react";

const icons: Record<SuggestedAction["key"], ReactElement> = {
  reply: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 17l-5-5 5-5M4 12h11a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  save: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M6 4h9l3 3v13H6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 4v4h5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  remind: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 10v3l2 2M9 3l-3 2M15 3l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  "follow-up": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 12h12M12 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export function NextActions({
  actions,
  onAction,
}: {
  actions: SuggestedAction[];
  onAction: (action: SuggestedAction) => void;
}) {
  return (
    <Card className="reveal reveal-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CardEyebrow>Suggested next actions</CardEyebrow>
        <span className="text-xs text-ink-faint">Each one asks for your approval first</span>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {actions.map((a) => (
          <button
            key={a.key}
            onClick={() => onAction(a)}
            className="group flex items-start gap-3 rounded-3xl border border-white/70 bg-white/60 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-lavender-200 hover:shadow-soft"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-lavender-100 text-lavender-600 transition-colors group-hover:bg-lavender-200">
              {icons[a.key]}
            </span>
            <span>
              <span className="block text-sm font-medium text-ink">{a.label}</span>
              <span className="block text-xs leading-relaxed text-ink-soft">
                {a.description}
              </span>
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}
