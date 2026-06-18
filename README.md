# MoodPilot

MoodPilot is a consumer AI communication companion for emotionally loaded messages.
It helps users understand the subtext of a hard message, clarify what they want to
achieve, and draft replies in a tone they choose.

> Positioning: communication support only. MoodPilot is not therapy, not diagnosis,
> not crisis care, and not a mental-health product.

## Problem

Hard messages create a fast emotional spike and a blank cursor: a tense Slack note,
a rejection email, a harsh professor comment, an ambiguous dating message, or an
awkward networking follow-up. People often over-apologize, respond defensively, or
stall for hours.

The product insight: users do not only need better wording. They need a quick read
of what is happening emotionally, a clear goal for the reply, and a safe way to
choose words without losing control of the send.

## Target Users

- Early-career professionals navigating managers, feedback, deadlines, and Slack politics.
- Job seekers and students replying to rejections, recruiters, professors, and networking DMs.
- Anxious texters and daters dealing with ambiguous tone, ghosting, boundaries, or awkward asks.

## Core Loop

1. **Message** — paste or select the text that made the user pause.
2. **Emotional read** — identify likely emotions and signals without treating them as a verdict.
3. **User goal** — clarify what the user probably wants to achieve.
4. **Tone options** — generate warm, direct, professional, and boundary-setting drafts.
5. **Approved action** — copy, save, remind, or follow up only after explicit user approval.
6. **Optional memory** — remember style and boundaries only when the user opts in.

## AI Boundary

The current `/api/analyze` route is a real structured API endpoint, but it uses a
deterministic local analysis engine rather than an external LLM. It returns:

```json
{
  "emotions": [{ "label": "Time pressure", "intensity": 82 }],
  "user_goal": "Take ownership and give a concrete next step.",
  "replies": {
    "warm": "...",
    "direct": "...",
    "professional": "...",
    "boundary": "..."
  },
  "safety_flags": [
    "communication_support_only",
    "not_therapy_or_diagnosis",
    "user_must_review_before_sending"
  ]
}
```

This keeps the product contract, UI states, and safety boundaries testable without
claiming production model quality. A production version would replace the local
engine with a model call, evaluation set, safety classifier, and logging/redaction
policy.

## Demo Steps

1. Open the Overview page and start with **Try the live demo**.
2. Pick one of the realistic scenarios or paste a custom message.
3. Click **Analyze message** to call `/api/analyze`.
4. Review the emotional read, user goal, safety flags, and reply options.
5. Switch tones, copy a draft, save it to local History, or set a simulated reminder.
6. Visit Memory & privacy to inspect the consent model.
7. Read the Case Study and JD Fit pages for the product-management framing.

## What Is Real

- Next.js App Router implementation with route-level pages.
- Real `/api/analyze` POST route returning structured JSON.
- Interactive companion loop with loading state, API response, tone switching,
  copy/save/reminder/follow-up actions, and approval modal.
- Local browser storage for history and memory preference.
- Case study, onboarding, memory, history, and JD-facing portfolio pages.

## What Is Mocked

- The analysis engine is deterministic and local; no external LLM is currently called.
- Reminder and follow-up actions are simulated in UI toast states.
- Memory is local demo state, not a synced account or production personalization store.
- Scenario content is hand-authored to demonstrate the intended AI response shape.
- Portfolio project links for sibling projects are local workspace references, not embedded deployments.

## Routes

- `/` — product overview
- `/onboarding` — first-run product explanation
- `/companion` — interactive analysis and reply demo
- `/history` — local saved drafts
- `/memory` — opt-in memory and data controls
- `/case-study` — PM/product case study
- `/portfolio` — JD-facing Consumer AI Experience portfolio narrative
- `/api/analyze` — structured analysis endpoint

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Validate

```bash
npm run build
```

## Design Source

The product direction is adapted from the Claude Design handoff in:

```text
Slack Companion AI Design/MoodPilot.dc.html
```

The implemented app keeps the same intent: a screen-aware emotional communication
companion with explicit PM notes, memory consent, and a case-study-ready product
story.
