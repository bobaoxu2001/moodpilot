import { LinkButton } from "@/components/ui/Button";
import { Card, CardEyebrow } from "@/components/ui/Card";
import { Badge, ChannelBadge } from "@/components/ui/Badge";
import { SafetyBanner } from "@/components/ui/SafetyBanner";
import { SCENARIOS } from "@/lib/scenarios";
import { PRODUCT_TAGLINE, TRUST_COPY } from "@/lib/constants";

export default function OverviewPage() {
  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-5xl border border-white/70 bg-card-sheen p-8 shadow-soft backdrop-blur-sm sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-peach-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-lavender-200/50 blur-3xl" />
        <div className="relative max-w-2xl">
          <Badge tone="lavender" className="mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-lavender-500" />
            Context-aware emotional AI companion
          </Badge>
          <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-[3.25rem]">
            Know what they{" "}
            <span className="bg-gradient-to-r from-lavender-600 to-peach-500 bg-clip-text text-transparent">
              really
            </span>
            {" "}mean. Reply like your best self.
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-soft">
            {PRODUCT_TAGLINE} MoodPilot reads the emotional subtext of a tricky
            message, clarifies what you actually want, and drafts replies in the
            tone you choose — so you respond from a calmer, clearer place.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <LinkButton href="/companion" size="lg">
              Try the live demo
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </LinkButton>
            <LinkButton href="/onboarding" variant="secondary" size="lg">
              See how it works
            </LinkButton>
            <LinkButton href="/portfolio" variant="soft" size="lg">
              JD fit
            </LinkButton>
          </div>
          <p className="mt-5 text-sm text-ink-faint">{TRUST_COPY}</p>
        </div>
      </section>

      {/* Value props */}
      <section>
        <div className="grid gap-4 md:grid-cols-3">
          {VALUE_PROPS.map((v, i) => (
            <Card key={v.title} interactive className={`reveal reveal-${i + 1}`}>
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-lavender-100 text-lavender-600">
                {v.icon}
              </div>
              <h3 className="font-serif text-lg font-semibold text-ink">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{v.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section>
        <div className="mb-6 text-center">
          <CardEyebrow>The companion loop</CardEyebrow>
          <h2 className="text-balance font-serif text-3xl font-semibold tracking-tight text-ink">
            Four steps, fully in your hands
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Card key={s.title}>
              <span className="font-serif text-2xl font-semibold text-lavender-300">
                0{i + 1}
              </span>
              <h3 className="mt-2 text-[15px] font-semibold text-ink">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Scenario showcase */}
      <section>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <CardEyebrow>Built for real moments</CardEyebrow>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">
              Five scenarios, ready to explore
            </h2>
          </div>
          <LinkButton href="/companion" variant="soft" size="sm">
            Open the companion
          </LinkButton>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SCENARIOS.map((s) => (
            <Card key={s.id} interactive className="flex flex-col gap-3">
              <ChannelBadge channel={s.channel} />
              <h3 className="text-[15px] font-medium leading-snug text-ink">{s.title}</h3>
              <p className="line-clamp-3 text-sm leading-relaxed text-ink-soft">
                “{s.message.slice(0, 120)}…”
              </p>
            </Card>
          ))}
          <Card className="flex flex-col items-start justify-center gap-3 bg-lavender-50/60">
            <h3 className="font-serif text-lg font-semibold text-ink">
              Or paste your own
            </h3>
            <p className="text-sm leading-relaxed text-ink-soft">
              Drop in any awkward text and MoodPilot will work from exactly what you share.
            </p>
            <LinkButton href="/companion" variant="primary" size="sm">
              Start now
            </LinkButton>
          </Card>
        </div>
      </section>

      {/* Trust & safety */}
      <section className="grid gap-5 rounded-5xl border border-white/70 bg-card-sheen p-8 shadow-soft backdrop-blur-sm lg:grid-cols-2">
        <div>
          <CardEyebrow>Trust & safety by design</CardEyebrow>
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
            A companion that knows its lane
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            MoodPilot is communication support — a tool for wording, tone, and clarity.
            It is intentionally not a therapist, not a diagnostic tool, and not a mental
            health product. Every suggestion is yours to edit, approve, or ignore.
          </p>
          <div className="mt-5">
            <SafetyBanner />
          </div>
        </div>
        <div className="grid gap-3">
          {TRUST_POINTS.map((t) => (
            <div key={t.title} className="flex gap-3 rounded-3xl bg-white/70 p-4">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-sage-100 text-sage-700">
                {t.icon}
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{t.title}</p>
                <p className="text-sm leading-relaxed text-ink-soft">{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-5xl bg-gradient-to-br from-lavender-500 to-lavender-600 p-10 text-center shadow-lift">
        <h2 className="text-balance font-serif text-3xl font-semibold text-white">
          Respond from a calmer, clearer place.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-lavender-100">
          Explore the full companion loop — pick a scenario, switch tones, and see the
          memory and privacy controls in action.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <LinkButton href="/companion" variant="secondary" size="lg">
            Try the demo
          </LinkButton>
          <LinkButton href="/case-study" variant="ghost" size="lg" className="text-white hover:bg-white/10">
            Read the case study
          </LinkButton>
          <LinkButton href="/portfolio" variant="ghost" size="lg" className="text-white hover:bg-white/10">
            Consumer AI portfolio
          </LinkButton>
        </div>
      </section>
    </div>
  );
}

const VALUE_PROPS = [
  {
    title: "Understand the subtext",
    body: "See the likely emotions behind a message — frustration, anxiety, a door left open — before you react to the surface.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "Find your words",
    body: "Get reply drafts in four tones — warm, direct, professional, boundary-setting — and shape them to sound like you.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M5 6h14M5 12h14M5 18h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Stay in control",
    body: "Nothing is sent, saved, or remembered without your explicit approval. Your message, your call — always.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l7 3v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const STEPS = [
  { title: "Share the message", body: "Paste any text or pick a sample scenario. Only what you share is used." },
  { title: "See the read", body: "MoodPilot surfaces the emotional context and what you likely want to achieve." },
  { title: "Choose your tone", body: "Compare warm, direct, professional, and boundary-setting drafts side by side." },
  { title: "Approve the action", body: "Reply, save, set a reminder, or draft a follow-up — each one asks you first." },
];

const TRUST_POINTS = [
  {
    title: "Only your shared text",
    body: "No inbox scraping, no background access. MoodPilot reads exactly what you paste.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "Opt-in memory",
    body: "Choose remember, ask each time, or never. Off by default until you decide.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l7 3v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "You send, not the app",
    body: "MoodPilot drafts; you copy and send. It never messages anyone on your behalf.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];
