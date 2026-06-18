import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";
import { Card, CardEyebrow } from "@/components/ui/Card";
import {
  CASE_STUDY_METRICS,
  COMPETITIVE_NOTES,
  CORE_LOOP,
  PRODUCT_PILLARS,
} from "@/lib/productContent";

export const metadata: Metadata = {
  title: "Case Study — MoodPilot",
  description:
    "A JD-facing product case study for MoodPilot, a consumer AI communication companion.",
};

export default function CaseStudyPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <section className="rounded-5xl bg-gradient-to-br from-lavender-500 to-lavender-700 p-8 text-white shadow-lift sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lavender-100">
          0 to 1 Product Case Study
        </p>
        <h1 className="mt-4 font-serif text-5xl font-semibold tracking-tight">
          MoodPilot
        </h1>
        <p className="mt-4 max-w-3xl font-serif text-2xl italic leading-snug text-lavender-50">
          Reply to anything like the calmest, sharpest version of yourself.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Consumer AI", "Human-AI interaction", "PM taste", "Design to engineering"].map(
            (tag) => (
              <span key={tag} className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                {tag}
              </span>
            )
          )}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Role", "Product strategy, UX, AI spec"],
          ["Scope", "0 to 1 clickable MVP"],
          ["Stack", "Next.js, Tailwind, structured API"],
          ["Platform", "Browser companion, mobile-ready"],
        ].map(([label, value]) => (
          <Card key={label} className="p-5">
            <CardEyebrow>{label}</CardEyebrow>
            <p className="text-sm font-semibold leading-relaxed text-ink">{value}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardEyebrow>Problem</CardEyebrow>
          <p className="text-lg leading-relaxed text-ink-soft">
            Hard messages create a spike of anxiety and a blank cursor. People
            fire off something they regret, over-apologize, or stall for hours.
            They do not lack words; they lack a clear read of the situation.
          </p>
        </Card>
        <Card>
          <CardEyebrow>Target users</CardEyebrow>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Early-career professionals", "Managers, feedback, launch pressure, Slack politics."],
              ["Job seekers & students", "Rejection emails, recruiter notes, professor feedback."],
              ["Anxious texters & daters", "Ambiguous tone, ghosting, boundaries, awkward asks."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-3xl bg-cream-50 p-4">
                <p className="text-sm font-semibold text-ink">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">{body}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Card>
        <CardEyebrow>Main user journey</CardEyebrow>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CORE_LOOP.map((step, index) => (
            <div key={step} className="rounded-3xl bg-lavender-50 p-4 text-center">
              <div className="mx-auto grid h-9 w-9 place-items-center rounded-2xl bg-white text-sm font-semibold text-lavender-700">
                {index + 1}
              </div>
              <p className="mt-3 text-sm font-semibold text-ink">{step}</p>
            </div>
          ))}
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardEyebrow>Competitive read</CardEyebrow>
          <div className="space-y-3">
            {COMPETITIVE_NOTES.map((note) => (
              <div key={note.product} className="rounded-3xl bg-cream-50 p-4">
                <p className="text-sm font-semibold text-ink">{note.product}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{note.gap}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardEyebrow>Product principles</CardEyebrow>
          <div className="space-y-3">
            {PRODUCT_PILLARS.map((pillar) => (
              <div key={pillar.title} className="rounded-3xl bg-lavender-50 p-4">
                <p className="text-sm font-semibold text-ink">{pillar.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{pillar.body}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardEyebrow>AI output framework</CardEyebrow>
          <div className="space-y-2 text-sm leading-relaxed text-ink-soft">
            <p><strong className="text-peach-600">1. What&apos;s happening</strong> — emotion + intensity.</p>
            <p><strong className="text-peach-600">2. Not-about-you check</strong> — separate their stress from your fault.</p>
            <p><strong className="text-peach-600">3. What you want</strong> — likely goals for the reply.</p>
            <p><strong className="text-peach-600">4. Options</strong> — tone-based send-ready drafts.</p>
            <p><strong className="text-peach-600">5. Safety flags</strong> — explicit boundaries in the API response.</p>
          </div>
        </Card>
        <Card>
          <CardEyebrow>Privacy & safety UX</CardEyebrow>
          <div className="space-y-2 text-sm leading-relaxed text-ink-soft">
            <p>Granular opt-in memory, visible in the product surface.</p>
            <p>One-tap forget for learned preferences.</p>
            <p>Never auto-sends; the user always taps to use a draft.</p>
            <p>Not therapy, counseling, diagnosis, or crisis care.</p>
            <p>Crisis-language flag routes away from drafting.</p>
          </div>
        </Card>
      </section>

      <Card className="bg-lavender-900 text-white">
        <CardEyebrow>Future metrics</CardEyebrow>
        <div className="grid gap-4 sm:grid-cols-5">
          {CASE_STUDY_METRICS.map((metric) => (
            <div key={metric.label}>
              <p className="font-serif text-3xl text-peach-200">{metric.value}</p>
              <p className="mt-1 text-xs leading-relaxed text-lavender-100">{metric.label}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <LinkButton href="/companion" variant="secondary">
          Try the demo
        </LinkButton>
        <LinkButton href="/portfolio">
          See JD fit
        </LinkButton>
      </div>
    </div>
  );
}
