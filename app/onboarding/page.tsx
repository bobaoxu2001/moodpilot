import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";
import { Card, CardEyebrow } from "@/components/ui/Card";
import { CORE_LOOP, MEMORY_SETTINGS } from "@/lib/productContent";

export const metadata: Metadata = {
  title: "Onboarding — MoodPilot",
  description:
    "A concise product onboarding flow for MoodPilot's communication companion loop.",
};

export default function OnboardingPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="rounded-5xl border border-white/70 bg-card-sheen p-8 shadow-soft sm:p-10">
        <CardEyebrow>Step 1 of 3 · Welcome</CardEyebrow>
        <h1 className="max-w-2xl text-balance font-serif text-4xl font-semibold tracking-tight text-ink">
          Hi, I&apos;m MoodPilot.
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
          When a message makes you pause — a tense Slack note, a rejection email,
          an awkward DM — MoodPilot helps you understand what is really going on
          and reply like your calmest, sharpest self.
        </p>
        <div className="mt-6 rounded-4xl border border-peach-100 bg-peach-50 p-5 font-serif text-lg italic leading-relaxed text-ink-soft">
          “Not a therapist. Not a diagnosis engine. Think of it as a sharp, kind
          friend who is unusually good with words.”
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Read the room",
            body:
              "Name the emotional context first so the user does not react only to the surface tone.",
          },
          {
            title: "Draft a few ways",
            body:
              "Offer warm, direct, professional, and boundary-setting replies with the same intent.",
          },
          {
            title: "Remember with consent",
            body:
              "Let users opt into style memory, history, and boundaries. Nothing is hidden.",
          },
        ].map((item, index) => (
          <Card key={item.title}>
            <span className="font-serif text-2xl font-semibold text-lavender-300">
              0{index + 1}
            </span>
            <h2 className="mt-3 text-base font-semibold text-ink">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
          </Card>
        ))}
      </section>

      <Card>
        <CardEyebrow>Core loop</CardEyebrow>
        <div className="flex flex-wrap items-center gap-2">
          {CORE_LOOP.map((step, index) => (
            <span key={step} className="inline-flex items-center gap-2">
              {index > 0 && <span className="text-lavender-200">/</span>}
              <span className="rounded-full bg-lavender-50 px-3 py-1.5 text-sm font-medium text-lavender-700">
                {index + 1}. {step}
              </span>
            </span>
          ))}
        </div>
      </Card>

      <Card>
        <CardEyebrow>Step 3 of 3 · Privacy</CardEyebrow>
        <div className="grid gap-3 sm:grid-cols-2">
          {MEMORY_SETTINGS.map((setting) => (
            <div key={setting.title} className="rounded-3xl bg-cream-50 p-4">
              <p className="text-sm font-semibold text-ink">{setting.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{setting.body}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end">
        <LinkButton href="/companion" size="lg">
          Try a real message
        </LinkButton>
      </div>
    </div>
  );
}
