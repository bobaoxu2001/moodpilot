"use client";

import { Card, CardEyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useHistory } from "@/lib/useMoodPilot";

const FALLBACK_HISTORY = [
  {
    id: "demo-manager",
    scenarioTitle: "Manager feedback",
    channel: "Slack",
    tone: "warm",
    replyText:
      "Totally hear you. I understand why this is frustrating, and I do not want to add more uncertainty here.",
    savedAt: new Date().toISOString(),
    remembered: true,
  },
  {
    id: "demo-rejection",
    scenarioTitle: "Job rejection email",
    channel: "Email",
    tone: "professional",
    replyText:
      "Thank you for the update and for the opportunity to interview. I remain genuinely interested in the team's work.",
    savedAt: new Date().toISOString(),
    remembered: false,
  },
];

export default function HistoryPage() {
  const { history, remove, clear, hydrated } = useHistory();
  const entries = history.length > 0 ? history : FALLBACK_HISTORY;

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <CardEyebrow>{history.length ? "Your library" : "Demo library"}</CardEyebrow>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink">
            {history.length ? "Replies you've crafted" : "Example replies"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
            {history.length
              ? "These drafts stay local to this browser."
              : "These clearly labeled examples preview the history experience until you save a draft."}
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={clear} disabled={!history.length}>
          Clear saved
        </Button>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <Card key={entry.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-ink">{entry.scenarioTitle}</span>
                  <span className="rounded-full bg-lavender-50 px-2.5 py-1 text-xs font-medium text-lavender-700">
                    {entry.tone}
                  </span>
                  <span className="text-xs text-ink-faint">{entry.channel}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  “{entry.replyText}”
                </p>
                <p className="mt-3 text-xs text-ink-faint">
                  {entry.remembered ? "Included in opt-in memory" : "Saved without memory"}
                </p>
              </div>
              {history.some((item) => item.id === entry.id) && (
                <Button variant="ghost" size="sm" onClick={() => remove(entry.id)}>
                  Remove
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {hydrated && history.length === 0 && (
        <p className="text-center text-xs text-ink-faint">
          No user-created drafts are stored yet.
        </p>
      )}
    </div>
  );
}
