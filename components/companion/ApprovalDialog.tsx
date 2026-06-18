"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import type { SuggestedAction } from "@/lib/types";

// Every simulated action is gated behind explicit user approval.
// This is a deliberate trust pattern, not just a confirm() — see Case Study.
const previewCopy: Record<SuggestedAction["key"], string> = {
  reply: "Copy the selected draft to your clipboard so you can paste and send it yourself. MoodPilot will not send anything.",
  save: "Save this draft to your private History (stored locally in your browser).",
  remind: "Create a simulated reminder to revisit this message tomorrow at 9:00 AM.",
  "follow-up": "Generate a gentle follow-up draft you can use if there's no reply.",
};

export function ApprovalDialog({
  action,
  onConfirm,
  onCancel,
}: {
  action: SuggestedAction | null;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    if (!action) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [action, onCancel]);

  if (!action) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Approve action: ${action.label}`}
    >
      <div
        className="absolute inset-0 bg-lavender-900/30 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="reveal relative w-full max-w-md rounded-4xl border border-white/70 bg-white p-7 shadow-lift">
        <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-lavender-100 text-lavender-600">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-semibold text-ink">
          Approve: {action.label}?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {previewCopy[action.key]}
        </p>
        <p className="mt-3 rounded-2xl bg-cream-100 px-3.5 py-2.5 text-xs text-ink-soft">
          Nothing happens until you approve. MoodPilot never acts on your behalf
          without this step.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={onConfirm}>
            Approve
          </Button>
        </div>
      </div>
    </div>
  );
}
