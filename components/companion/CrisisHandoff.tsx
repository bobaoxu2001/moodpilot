import { Card, CardEyebrow } from "@/components/ui/Card";

export function CrisisHandoff() {
  return (
    <div role="alert">
      <Card className="border-peach-200 bg-peach-50">
        <CardEyebrow>Pause the drafting flow</CardEyebrow>
        <h2 className="font-serif text-2xl font-semibold text-ink">
          Please reach a real person now
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          This message may involve immediate safety or self-harm. MoodPilot will not
          generate, save, remember, or schedule replies for it.
        </p>
        <div className="mt-4 rounded-3xl bg-white/80 p-4 text-sm leading-relaxed text-ink-soft">
          If anyone may be in immediate danger, contact local emergency services now.
          Otherwise, reach out to a trusted person or a licensed local crisis service and
          stay with another person while you get support.
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          This is a conservative phrase-based safety handoff, not a diagnosis or crisis classifier.
        </p>
      </Card>
    </div>
  );
}
