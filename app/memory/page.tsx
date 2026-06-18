"use client";

import { useState } from "react";
import { Card, CardEyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MemoryControl } from "@/components/companion/MemoryControl";
import { useHistory, useMemoryPreference } from "@/lib/useMoodPilot";
import { LEARNED_EXAMPLES, MEMORY_SETTINGS } from "@/lib/productContent";

export default function MemoryPage() {
  const { preference, setPreference } = useMemoryPreference();
  const { clear } = useHistory();
  const [learned, setLearned] = useState(LEARNED_EXAMPLES);

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
          <CardEyebrow>What MoodPilot has learned</CardEyebrow>
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
                onClick={() => setLearned((prev) => prev.filter((value) => value !== item))}
              >
                Forget
              </Button>
            </div>
          ))}
          {learned.length === 0 && (
            <p className="rounded-3xl bg-cream-50 p-5 text-center text-sm text-ink-faint">
              Nothing stored. MoodPilot starts fresh every time.
            </p>
          )}
        </div>
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
          <Button variant="secondary" onClick={() => navigator.clipboard?.writeText(JSON.stringify({ preference, learned }, null, 2))}>
            Export my data
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setLearned([]);
              clear();
            }}
          >
            Delete everything
          </Button>
        </div>
      </Card>
    </div>
  );
}
