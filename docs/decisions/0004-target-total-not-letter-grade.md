# 0004 · The marks calculator asks for a target total, not a letter grade

**Status:** Accepted
**Date:** Phase 3, Week 13 (wireframes)
**Decided by:** Whole group

## Context

US-02 says Ayesha wants to "choose a target grade and see the minimum scores required on remaining
assessments". When Screen 8 (Marks Detail and Grade Projection) was wireframed, the question was what
she actually chooses.

Letter-grade boundaries in a relatively graded course depend on the modified class average (MCA).
The average is not known until the course ends, so the mark that earns a B is not known while the
student still has assessments left. A calculator that says "you need 66% in the final for a B" would be
stating a boundary nobody has published yet.

The logic already avoids this. `requiredScore(assessments, targetPercent)` in `src/lib/marks.js` takes
a target **percentage** of the course total, not a letter, and returns a named status instead of a
guessed number.

## Options considered

| Option | For | Against |
| :--- | :--- | :--- |
| Target letter grade, with fixed boundaries | Matches the wording of US-02; students think in letters | The boundaries are invented. A wrong "you need X for a B" is worse than no figure (Design Principle 4) |
| Target letter grade, with last semester's boundaries | Feels realistic | Still a guess, and the anti-persona decision in Phase 2 says projections must be labelled as estimates and must not pose as the official record |
| **Target total out of 100** | True for every course, matches `requiredScore()`, needs no data we do not have | One step removed from how students talk; the screen must say why |

## Decision

Screen 8 asks for a **target total** (quick picks 60, 70, 80, or Other). The result reads "You need 33
of 50 in the Final. That is 66% of the final exam." Under it: "Estimate only. Letter grades use the
class average." A "What is MCA?" link opens Help and Glossary (Screen 21).

## Consequences

- No change to `src/lib/`. `requiredScore()` already does exactly this.
- The label `marks.target.label` reads "Target grade" in `en.json`. It should become "Target total",
  with the Urdu string in `ur.json` changed in the same commit (Working Agreement rule 6). Tracked as
  an outstanding item rather than done here, because the Urdu wording needs a fluent speaker.
- US-02 is still met in substance. If the proposal is revised, its wording should say "target total".
- The annotation on Screen 8 keeps this as an open question, so it can be checked with users in the
  Phase 3 quick user check and in Phase 5.

## Viva answer

Letter-grade boundaries in a relatively graded course depend on the class average, which nobody knows until the course
ends, so any "you need X for a B" would be a made-up number. We ask for a target total instead, which
is always true, and the screen explains why and links to what MCA means.
