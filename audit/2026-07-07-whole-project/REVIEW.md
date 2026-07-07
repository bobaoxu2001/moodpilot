# MoodPilot whole-project review

Date: 2026-07-07

## Remediation update

The findings below were addressed in the follow-up hardening pass:

- Upgraded to Next.js 16.2.10 and React 19.2.4; the final audit has no high or critical production dependency advisories. Two moderate PostCSS advisories remain inside the current Next.js dependency tree with no non-breaking upstream resolution.
- Removed hidden scenario context from custom-message requests and added length, content-type, tone, and rate validation.
- Added a dedicated crisis handoff that blocks drafting, actions, saving, and memory.
- Made learned preferences real opt-in local state; clearly separated illustrative examples; made export and complete deletion functional.
- Added dialog focus management, live status announcements, reduced-motion support, message-label association, clipboard failure handling, and simpler mobile portfolio navigation.
- Added 11 regression tests covering structured analysis, crisis phrases, false positives, and API validation.
- Reverified normal analysis, crisis blocking, consented save, History, and learned-memory rendering in the browser. `10-fixed-crisis-handoff.png` captures the corrected safety state.

## Executive verdict

MoodPilot is a strong portfolio MVP with a crisp problem, coherent end-to-end demo, unusually explicit AI boundaries, and a polished visual system. It is credible as a product-thinking artifact today. It is not production-ready: a privacy promise conflicts with the actual API request, the dependency tree contains a critical Next.js advisory, crisis detection does not constrain downstream actions, and the project has no automated tests.

## Scope and user goal

This combined product, UX, accessibility, code, API, security, and portfolio review covered all seven user-facing routes and the structured analysis endpoint. The user goal evaluated was: paste a difficult message, understand the likely emotional context, choose an intentional reply, explicitly approve any action, and control any retained data.

## What is working well

- The product story is immediately legible. The overview explains the problem, value, interaction loop, and safety boundary without pretending an external model is present.
- The core companion page has excellent hierarchy: scenario, source message, analysis, reply choices, actions, and memory preference form one understandable loop.
- The deterministic analysis engine is a sound portfolio choice. It creates a real request/response contract while keeping the README truthful about model quality.
- The UI is visually cohesive across all captured routes. Typography, lavender/peach color, rounded surfaces, spacing, and editorial copy feel intentional rather than template-like.
- Trust patterns are visible: explicit approval, opt-in memory framing, local-only history, non-clinical positioning, and mocked-action disclosures.
- The recruiter-facing case study and JD-fit routes convert implementation details into product judgment rather than merely listing technologies.
- The production build and lint both pass with no errors or warnings.

## Priority findings

### P0 — Upgrade the vulnerable framework dependency before deployment

`next` is pinned to `14.2.5`. The live package audit reports one critical and one moderate vulnerability, with a fix available at `14.2.35`. This is a deployment blocker even though several listed advisories may not be reachable in this particular app.

Recommendation: update the Next.js 14 patch line, refresh the lockfile, then rebuild, lint, audit, and run the complete interaction suite.

### P1 — The privacy copy contradicts the actual request

The companion tells users, “Only the text here is used,” but every analysis request also sends `scenario.context`. If a user replaces the sample with a private custom message, the currently selected sample context still goes to the API.

Recommendation: either send only `messageText`, or expose an editable, clearly labeled context field and change the disclosure to name both fields. Add a request-payload test so the privacy claim cannot regress.

### P1 — Crisis detection does not create a safe interaction state

The engine detects a short list of English crisis phrases and changes the generated text, but the normal reply, save, reminder, follow-up, tone, and memory controls remain available. A safety flag is metadata, not a safety flow. The detector also misses common variants such as hyphenated “self-harm,” indirect language, and non-English text.

Recommendation: when `crisis_language_detected_handoff_to_human_support` is returned, replace the drafting/actions area with a dedicated human-support handoff, disable saving to memory, provide locale-appropriate emergency guidance, and test direct, indirect, obfuscated, and false-positive examples. Keep the claim bounded: this is a phrase gate, not a classifier.

### P1 — “Delete everything” does not delete everything

The control clears history and the component-local illustrative preferences, but it does not reset the persisted memory preference. Reloading also restores the hard-coded “learned” examples because those examples are component state rather than stored memory.

Recommendation: distinguish “example memory” from real saved state in the heading, persist learned items if they are meant to be interactive, and make deletion clear all MoodPilot local-storage keys after a confirmation step. Verify the empty state after reload.

### P1 — Automated verification is absent

There is no test script or test suite. The highest-risk logic—profile routing, crisis phrases, API validation, local-storage consent, approval gating, and the history loop—is unprotected.

Recommendation: add unit tests for `analyzeMessage`, route contract tests for valid/invalid/oversized requests, and browser tests for analyze → tone → approve → save → history → delete. These are more valuable here than expanding features.

### P2 — API validation is too permissive for a public endpoint

The route accepts an unbounded string, ignores invalid `preferredTone`, has no content-type enforcement, no rate limit, and no structured schema validation. A large request can consume unnecessary memory and CPU.

Recommendation: define a request schema, cap message/context length, reject invalid tone values and unsupported content types, and add rate limiting at the deployment edge.

### P2 — Demo records visually masquerade as user history and memory

History is titled “Replies you've crafted” while showing fallback records. Memory says “What MoodPilot has learned” while showing hard-coded examples. The small history footer discloses the demo state, but it is weaker than the primary headings.

Recommendation: label these sections “Example history” and “Example learned preferences” until the user creates real data, then switch the headings and records to the real state.

### P2 — Dialog and status accessibility need implementation work

The approval dialog has dialog semantics and Escape support, but it does not move focus into the dialog, trap focus, restore focus, or give the backdrop a semantic control. Toasts lack a live region, so copy/save outcomes may be silent to screen-reader users. Several decorative SVGs are not consistently hidden from assistive technology.

Recommendation: implement focus management and `aria-labelledby`/`aria-describedby`, mark decorative icons `aria-hidden`, and use an appropriate `role="status"` live region. Verify with keyboard-only navigation and a screen reader.

### P2 — Clipboard actions claim success without checking success

Reply copy and data export either ignore rejection or provide no visible outcome. The UI can say “Draft copied” when clipboard access was denied.

Recommendation: await clipboard writes, show distinct success/failure feedback, and offer a selectable text fallback.

### P3 — Mobile navigation is functional but scales poorly

At small widths, all seven destinations become a horizontally scrolling pill row. It is discoverable only by scrolling and makes “JD fit” look like a core product task rather than portfolio metadata.

Recommendation: separate product navigation from recruiter artifacts, and use a compact menu or a smaller primary set on mobile.

## Accessibility evidence limits

The screenshots support visual hierarchy, apparent contrast, spacing, and target-size observations. They cannot establish WCAG compliance, exact contrast ratios, screen-reader output, focus order, keyboard traps, reduced-motion behavior, 200% zoom behavior, or mobile reflow. Those require dedicated runtime testing.

## Captured flow

1. **Overview — healthy.** Strong positioning, clear CTA, visible demo disclosure, and an understandable four-step loop.
2. **Onboarding — healthy.** Concise explanation and a direct path into a real message; currently informational rather than a persisted onboarding flow.
3. **Companion start — healthy with trust risk.** Excellent two-column hierarchy and empty state; privacy wording does not match the payload.
4. **History — needs clarification.** Clean layout, but fallback examples are presented under a user-owned heading.
5. **Memory & consent — needs functional hardening.** Strong conceptual surface; export/delete/learned state are only partially wired.
6. **Case study — healthy.** Strong product reasoning and explicit boundaries; lengthy but appropriate for recruiter review.
7. **JD fit — healthy as portfolio material.** Clear positioning, though it should be separated from the consumer product’s primary navigation.

## Verification record

- `npm run build`: passed; all seven pages prerendered and `/api/analyze` built as a dynamic route.
- `npm run lint`: passed with no warnings or errors.
- `npm audit --registry=https://registry.npmjs.org --omit=dev --audit-level=high`: failed with one critical Next.js vulnerability and one moderate PostCSS vulnerability.
- Fresh full-page screenshots: `01-overview.png` through `07-portfolio.png` in this folder.
- Browser DOM inspection confirmed every route, primary heading, route link, scenario selector, and initial companion action rendered.
- The browser interaction runner timed out during the post-analysis capture, so the complete analyze/crisis/save loop remains a named verification gap in this run.

## Recommended sequence

1. Upgrade Next.js and re-run the security/build checks.
2. Correct the privacy payload/copy mismatch.
3. Implement a real crisis handoff state.
4. Make memory deletion/export and demo labeling truthful end to end.
5. Add focused automated tests for the above behaviors.
6. Finish keyboard, screen-reader, mobile, and contrast verification.
