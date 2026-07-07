import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";
import { Card, CardEyebrow } from "@/components/ui/Card";
import { PORTFOLIO_PROJECTS } from "@/lib/productContent";

export const metadata: Metadata = {
  title: "Consumer AI Experience Portfolio — MoodPilot",
  description:
    "A JD-facing portfolio narrative connecting MoodPilot, Fuck Your Unhappy, and CraveMap for Consumer AI Experience roles.",
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-5xl border border-white/70 bg-card-sheen p-8 shadow-soft sm:p-10">
        <CardEyebrow>JD fit · Product Manager, Consumer AI Experience</CardEyebrow>
        <h1 className="max-w-3xl font-serif text-5xl font-semibold tracking-tight text-ink">
          Consumer AI products for emotional, personal, and taste-driven moments.
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">
          This portfolio is framed for a consumer emotional-AI role: products
          that translate fuzzy human states into useful AI experiences, with
          explicit trust, safety, and user-control decisions.
        </p>
      </section>

      <section className="grid gap-4">
        {PORTFOLIO_PROJECTS.map((project, index) => (
          <Card key={project.name} className="p-6">
            <div className="grid gap-5 lg:grid-cols-[180px_1fr]">
              <div>
                <span className="font-serif text-3xl font-semibold text-lavender-300">
                  0{index + 1}
                </span>
                <h2 className="mt-2 text-xl font-semibold text-ink">{project.name}</h2>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-lavender-700">{project.role}</p>
                <p className="text-sm leading-relaxed text-ink-soft">{project.fit}</p>
                <p className="rounded-3xl bg-cream-50 p-4 text-sm leading-relaxed text-ink-soft">
                  <span className="font-semibold text-ink">Why it matters: </span>
                  {project.proof}
                </p>
                <LinkButton href={project.href} external variant="soft" size="sm">
                  View project source ↗
                </LinkButton>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Consumer product taste",
            body:
              "Mobile-first loops, emotionally specific copy, and first-screen proof moments instead of generic dashboards.",
          },
          {
            title: "AI/HCI judgment",
            body:
              "Structured model contracts, safety flags, explicit user approval, memory controls, and graceful fallback states.",
          },
          {
            title: "Design to engineering bridge",
            body:
              "Claude Design references translated into Next.js routes, reusable components, API schema, README, and case-study artifacts.",
          },
        ].map((item) => (
          <Card key={item.title}>
            <h2 className="text-base font-semibold text-ink">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
          </Card>
        ))}
      </section>

      <Card>
        <CardEyebrow>Interview positioning</CardEyebrow>
        <p className="text-lg leading-relaxed text-ink-soft">
          “My strongest fit is translating emotional ambiguity into safe,
          useful consumer AI flows. MoodPilot shows the core emotional-AI loop;
          Fuck Your Unhappy shows playful emotional release; CraveMap shows
          consumer personalization and marketplace thinking.”
        </p>
      </Card>

      <div className="flex justify-end gap-3">
        <LinkButton href="/case-study" variant="secondary">
          Read MoodPilot case study
        </LinkButton>
        <LinkButton href="/companion">
          Try live demo
        </LinkButton>
      </div>
    </div>
  );
}
