# MoodPilot behavioral evaluation

This evaluation set makes the deterministic AI boundary inspectable. It is not a claim of model intelligence or clinical safety.

The suite checks:

- five message profiles route to the intended emotional pattern;
- five direct crisis-language variants trigger the human-support handoff;
- four difficult but non-crisis phrases avoid false-positive handoffs;
- every normal profile returns four complete and meaningfully distinct tone drafts.

Run it with:

```bash
npm run test:eval
```

These cases are deliberately small and hand-authored. A production model would require a larger, independently reviewed multilingual dataset, labeled edge cases, quality rubrics, red-team coverage, and ongoing monitoring.
