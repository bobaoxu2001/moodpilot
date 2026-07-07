"use client";

import { useState } from "react";
import { Card, CardEyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MemoryControl } from "@/components/companion/MemoryControl";
import { useHistory, useLearnedPreferences, useMemoryPreference } from "@/lib/useMoodPilot";
import { LEARNED_EXAMPLES, MEMORY_SETTINGS } from "@/lib/productContent";

export default function MemoryPage() {
  const { preference, setPreference, resetPreference } = useMemoryPreference();
  const { reset: resetHistory } = useHistory();
  const { learned, remove, reset: resetLearned } = useLearnedPreferences();
  const [notice, setNotice] = useState<string | null>(null);

  const exportData = () => {
    try {
      const blob = new Blob([JSON.stringify({ preference, learned }, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "moodpilot-data.json";
      anchor.click();
      URL.revokeObjectURL(url);
      setNotice("Your local MoodPilot data was exported.");
    } catch {
      setNotice("Export failed. Please try again.");
    }
  };

  const deleteEverything = () => {
    if (!window.confirm("Delete all MoodPilot history, memory, and preferences from this browser?")) return;
    resetHistory();
    resetLearned();
    resetPreference();
    setNotice("All MoodPilot data was deleted from this browser.");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <section>
        <CardEyebrow>Privacy & personalization</CardEyebrow>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink">
          Memory & consent
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
          MoodPilot&apos;s memory is designed as an explicit product surface, not
          invisible background behavior. The user can choose, inspect, export, or
          erase.
        </p>
      </section>

      <Card>
        <CardEyebrow>Preference mode</CardEyebrow>
        <MemoryControl preference={preference} onChange={setPreference} />
      </Card>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardEyebrow>Your saved preferences</CardEyebrow>
          <span className="text-xs text-ink-faint">{learned.length} preferences</span>
        </div>
        <div className="mt-3 space-y-2">
          {learned.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-3xl bg-lavender-50 px-4 py-3"
            >
              <span className="h-2 w-2 rounded-full bg-lavender-500" />
              <span className="flex-1 text-sm text-ink-soft">{item}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => remove(item)}
              >
                Forget
              </Button>
            </div>
          ))}
          {learned.length === 0 && (
            <p className="rounded-3xl bg-cream-50 p-5 text-center text-sm text-ink-faint">
              Nothing saved yet. Opt in when saving a draft to add a preference here.
            </p>
          )}
        </div>
      </Card>

      <Card>
        <CardEyebrow>Examples — not stored</CardEyebrow>
        <p className="text-sm leading-relaxed text-ink-soft">
          A production personalization system might learn preferences like these after explicit consent:
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {LEARNED_EXAMPLES.map((example) => (
            <li key={example} className="rounded-2xl bg-cream-50 px-3 py-2 text-xs text-ink-soft">
              {example}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardEyebrow>Controls in the MVP spec</CardEyebrow>
        <div className="grid gap-3 sm:grid-cols-2">
          {MEMORY_SETTINGS.map((setting) => (
            <div key={setting.title} className="rounded-3xl bg-cream-50 p-4">
              <p className="text-sm font-semibold text-ink">{setting.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{setting.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={exportData}>
            Export my data
          </Button>
          <Button
            variant="ghost"
            onClick={deleteEverything}
          >
            Delete everything
          </Button>
        </div>
        {notice && (
          <p className="mt-3 text-xs font-medium text-ink-soft" role="status" aria-live="polite">
            {notice}
          </p>
        )}
      </Card>
    </div>
  );
}
