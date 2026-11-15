# Working Agreement

The rules all four of us follow for the rest of CS3014. One page, no interpretation needed.

[CONTRIBUTING.md](../CONTRIBUTING.md) has the detail. This is the short version plus the calendar and
the things currently outstanding.

---

## 1. The calendar

Semester runs 17 Aug to 11 Dec 2026. Week 1 started 17 Aug.

| Phase | Weeks | Dates | Deliverable |
| :---: | :---: | :--- | :--- |
| 1 | 2 to 3 | 24 Aug to 6 Sep | Proposal ✅ submitted |
| 2 | 3 to 5 | 31 Aug to 20 Sep | Research findings, personas, IA ✅ submitted |
| **3** | **10 to 13** | **19 Oct to 15 Nov** | **Sketching and lo-fi wireframes, due Sun 15 Nov, 11:55 PM** |
| 4 | to be announced | | High-fidelity prototype |
| 5 | to be announced | | Usability testing, iteration, final report |

The original plan put Phase 3 in weeks 6 to 9. The course brief set it at the end of Week 13, so
Phases 4 and 5 move with it. Fill in their dates when the briefs are released.

---

## 2. What is outstanding right now

These are the open items. Each has one owner. Nobody else needs to chase them.

| # | Item | Owner | By |
| :---: | :--- | :--- | :--- |
| 1 | Crazy 8s: two sheets each (Home, Attendance Detail), freehand in Figma, panels 7 and 8 desktop | All four | 14 Nov |
| 2 | Team vote, then redraw Screens 4 and 6 to follow the winning sketches | Zain | 14 Nov |
| 3 | Peer critique swap with another group, at least six notes each way | Saad | 15 Nov |
| 4 | Quick user check with three students outside the group; record problems and changes | Saad | 15 Nov |
| 5 | Fill the highlighted gaps in the Phase 3 document, export the PDF from Word, zip and upload | Bilal | 15 Nov, 11:55 PM |
| 6 | Change `marks.target.label` to "Target total" in `en.json` and `ur.json` together ([ADR 0004](decisions/0004-target-total-not-letter-grade.md)) | Saad | before the Phase 4 build |
| 7 | Mark A1, A2, A3 in `docs/research/README.md` and correct anything in `PROJECT_CHARTER.md` the research contradicts | Bilal | before the Phase 4 build |
| 8 | Read through `src/locales/ur.json` as a fluent speaker, especially the headroom sentences | Saad | before Phase 5 |
| 9 | Push `feat/prototype-core`, rename `dot-github-RENAME-TO-.github`, put real GitHub handles in CODEOWNERS (if not done yet) | Bilal | this week |

**Items 1 to 5 are the Phase 3 submission.** The vote has to happen before the wireframes are final,
otherwise Section 3 of the document (the sketches) does not connect to Section 4 (the wireframes).

---

## 3. Who owns what

Ownership means you are accountable for that area and are its default reviewer. It does not mean
nobody else may touch it.

| Roll | Member | Owns | Default reviewer for |
| :--- | :--- | :--- | :--- |
| 24F-0508 | Bilal Rauf *(lead)* | Research, heuristic evaluation, design principles | Anything |
| 24F-0736 | M. Hassaan | Requirements, use cases, `src/lib/` | `src/lib/`, `src/hooks/` |
| 24F-0531 | M. Zain Tahir | Information architecture, routing, `src/modules/` | Navigation, screen structure |
| 24F-0740 | M. Saad Ur Rehman | Accessibility, locales, comparative analysis | Anything user-facing or in `locales/` |

**Every member defends the whole document and the whole repo in the viva.** Individual marks can
differ from the group mark. "That was someone else's section" is not an answer.

---

## 4. Git

```
main                        protected. Nobody pushes directly, including the lead.
  └─ feat/<module>-<thing>
  └─ fix/<thing>
  └─ docs/<thing>
  └─ design/<thing>
```

- Branch from `main`, one branch per concern. A branch touching three modules gets split.
- Conventional Commits, imperative, scope is the module: `feat(attendance): add headroom card`.
  The body says **why**. The diff already says what.
- **1 approval** to merge. **2 for anything in `src/lib/`**, because that is where wrong numbers come
  from. Anything user-facing needs Saad's approval.
- The author does not merge their own PR.
- Squash on merge. Keep `main` linear.
- A PR with an empty description is closed, not reviewed.

**Reviewing means pulling the branch and running it.** Approving something you did not run is how a
broken screen reaches a demo.

---

## 5. Six code rules that are not negotiable

These are already enforced by tests. Breaking one fails `npm test`, which is the point.

1. **Every calculation lives in `src/lib/` as a pure function.** No React, no side effects, no I/O.
   If you are writing arithmetic in a hook or a component, it belongs in `lib/`.
2. **Missing is not zero.** An unpublished mark is excluded from a total, never scored 0. This is the
   single most likely bug in the codebase.
3. **Never return a colour from logic.** Return a named state (`'at-risk'`) and let the component
   decide. This is what makes "never colour alone" enforceable instead of aspirational.
4. **No fallback numbers.** If a figure cannot be computed, return a named status so the interface can
   explain. A confidently wrong number is worse than no number.
5. **Never read the clock inside a function.** Pass `now` in. It comes from `meta.json`.
6. **Both locales in the same commit.** An English string without its Urdu counterpart is incomplete,
   not "to be translated later". Later does not arrive.

---

## 6. Definition of done

A change is done when **all** of these are true. Not most. This is the PR checklist.

- [ ] Does what its issue said it would do
- [ ] `npm test` passes
- [ ] Empty, loading, error and offline states implemented, each naming what is missing and who supplies it
- [ ] No status conveyed by colour alone
- [ ] Derived figures labelled as estimates, official record one tap away
- [ ] Keyboard-only operation works, focus visible and in a sensible order
- [ ] Contrast passes; the screen is readable in greyscale
- [ ] Works at 320px with no horizontal scrolling
- [ ] English and Urdu strings both added
- [ ] No real personal data, no unredacted portal screenshot in the diff
- [ ] `src/lib/` changes have tests for the normal, boundary and degenerate cases
- [ ] Documentation updated if behaviour or a decision changed

---

## 7. Decisions

Anything that changes the shape of the product, adding a dependency, dropping a screen, changing a
design principle, is decided by the group, not in a PR comment.

1. Open an issue labelled `type:decision`.
2. Everyone weighs in.
3. Record the outcome as an ADR in `docs/decisions/`, ending with a two-sentence viva answer.

We have five decisions covering responsive web, seeded data, the five-section IA with frozen screen
numbers, a target total in the marks calculator, and
[Launchpad Home with a four-item bottom bar](decisions/0005-launchpad-home-and-four-item-bar.md).
If you are asked in the viva why any of those, the answer is in the file.

Disagree before it ships, not during the viva.

---

## 8. Phase discipline

| Phase | What belongs in the repo | What does not |
| :---: | :--- | :--- |
| 2 | Findings, personas | Any interface code |
| 3 | IA, routing scaffold, wireframes (Figma is the source of truth) | Hi-fi styling |
| 4 | The build | New requirements |
| 5 | Fixes driven by test findings | New screens |

**Do not build screens during Phase 2.** The assumptions have to be tested before the design is
committed to. Building early means throwing work away, and it means the research was decorative.

---

## 9. Working rules

- Stuck for more than an hour on the same thing: say so in the group chat. A sixteen-week schedule
  has no room for struggling quietly.
- Say early when you cannot do something you committed to. Late is recoverable, silent is not.
- Raw research data never enters the repository. Only aggregated, anonymised findings.
- Never commit a real roll number, CNIC, phone number or address, including your own.
- Any screenshot of the live portal is redacted before it is committed. Every field, every time.

---

## 10. The one-line version

Research before design, calculations before screens, both languages together, and nothing merges
without someone else having actually run it.
