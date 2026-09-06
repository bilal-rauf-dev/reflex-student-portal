# Contributing

This repository belongs to **group Z-BASH** for CS3014 Applied Human Computer Interaction at
FAST-NUCES. It is a course project with four members and a fixed sixteen-week schedule.

Outside contributions are welcome as issues and discussion. Because the deliverable is assessed as our
own work, we cannot merge external pull requests during the semester.

---

## The team

| Roll | Member | Owns | Reviews |
| :--- | :--- | :--- | :--- |
| **24F-0508** | Bilal Rauf *(lead)* | Problem analysis, heuristic evaluation, `docs/DESIGN_PRINCIPLES.md` | Anything |
| **24F-0736** | M. Hassaan | Requirements, use case modelling, `src/lib/` | `src/lib/`, `src/hooks/` |
| **24F-0531** | M. Zain Tahir | Information architecture, screen inventory, routing, `src/modules/` | Navigation, screen structure |
| **24F-0740** | M. Saad Ur Rehman | Comparative analysis, accessibility, `docs/ACCESSIBILITY.md`, locales | Anything touching a11y or `locales/` |

Ownership means you are accountable for that area and are the default reviewer for it. It does not
mean nobody else may touch it.

**Every member must be able to defend the whole repository, not only their own area.** Individual viva
marks may differ from the group mark, and "that was someone else's section" is not an answer.

---

## Workflow

### 1. Pick up an issue

Everything starts as an issue. Labels carry the module (`module:attendance`), the phase
(`phase:4`) and the type (`type:feature`, `type:bug`, `type:docs`, `type:a11y`).
Assign yourself before you start so two people do not build the same screen.

### 2. Branch from `main`

```bash
git checkout main && git pull
git checkout -b feat/attendance-headroom-card
```

Prefixes: `feat/`, `fix/`, `docs/`, `design/`, `chore/`.
`main` is protected. Nobody pushes to it directly, including the lead.

### 3. Commit as you go

Conventional Commits, imperative mood:

```
feat(attendance): add headroom calculation for a named course
fix(finance): suppress days-remaining countdown when offline
docs(a11y): add the greyscale test to the per-screen audit
```

The body explains **why**. The diff already shows what.

### 4. Open a pull request

Fill in the template. A pull request with an empty description is closed, not reviewed.

| Rule | Detail |
| :--- | :--- |
| Reviews needed | **1** approval, from someone other than the author |
| Reviews needed for `src/lib/` | **2** approvals. That is where wrong numbers come from. |
| Reviews needed for anything user-facing | Must include the accessibility owner |
| Merging | The author does not merge their own pull request |
| Strategy | Squash merge. Keep `main` linear. |
| Scope | One pull request, one concern. A branch touching three modules gets split. |

### 5. Review each other properly

A review is not a rubber stamp. Pull the branch, run it, walk the screen with a keyboard, and check it
against the review checklist in [DESIGN_PRINCIPLES.md](docs/DESIGN_PRINCIPLES.md).

Approving something you did not run is how a broken screen reaches a demo.

---

## Definition of done

A change is done when **all** of these are true. Not most.

- [ ] It does what its issue said it would do
- [ ] Lint passes (`npm run lint`)
- [ ] Empty, loading, error and offline states are implemented and each names what is missing
- [ ] No status is conveyed by colour alone
- [ ] Any derived figure is labelled as an estimate and links to the official record
- [ ] Keyboard-only operation works, with a visible focus indicator
- [ ] Contrast passes; the screen is readable in greyscale
- [ ] Works at 320px with no horizontal scrolling
- [ ] English **and** Urdu strings added in the same commit
- [ ] No real personal data and no unredacted screenshot in the diff
- [ ] Pure functions in `src/lib/` have tests for the normal, boundary and degenerate cases
- [ ] Documentation updated if behaviour or a decision changed

---

## Phase discipline

| Phase | Weeks | Focus | Repository activity |
| :---: | :---: | :--- | :--- |
| 1 | 2 to 3 | Proposal and problem definition | Documentation only |
| 2 | 3 to 5 | Research, personas, scenarios | Findings in `docs/`, no interface code |
| 3 | 6 to 9 | Information architecture, wireframes, lo-fi prototype | Figma is the source of truth; routing scaffold lands here |
| 4 | 10 to 12 | High-fidelity prototype | The heavy build. Freeze at the end of Week 12. |
| 5 | 13 to 16 | Usability testing and iteration | Fixes only, driven by test findings |

**Do not build screens during Phase 2.** The assumptions in the charter have to be tested before the
design is committed to. Building early means throwing work away, and it means the research was
decorative.

---

## Decisions

Anything that changes the shape of the product, adding a dependency, changing the module set, changing
a design principle, is decided by the group, not in a pull request comment thread. Open an issue
labelled `type:decision`, let everyone weigh in, and record the outcome in the relevant document.

If you disagree with a decision after it is made, say so before it ships, not during the viva.

---

## Getting help

Stuck for more than an hour on the same problem: say so in the group chat. Nobody gets marks for
struggling quietly, and a sixteen-week schedule has no room for it.
