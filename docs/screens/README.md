# Screen Specifications

One file per screen, named `NN-slug.md`. Copy `_TEMPLATE.md` to start one.

**Screen numbers are stable identifiers.** They come from the Phase 1 proposal's screen inventory and
are used by the requirements traceability matrix in Table 8 of that document, which is submitted and
marked. A number is never reassigned, and a retired number is never reused. The sections below were
regrouped after Phase 2 research; the numbers did not move. See
[ADR 0003](../decisions/0003-ia-restructure-after-research.md).

---

## Structure

Five sections under one root, from the Activity 4 card sort.

```
Home (root)
├─ My Progress ──────── Attendance · Marks · Transcript & Degree Progress
├─ Registration
├─ Fees ─────────────── Payment Instructions
├─ Requests & Alerts ── Notification Settings
└─ Settings & Help ──── Profile & Privacy · Display & Language · Help & Glossary
```

No menu is longer than five items. The deepest path is three levels, and the third level is only ever
the full raw record, which Design Principle 1 already places behind the derived answer.

---

## Index

| # | Screen | Section | Module | Spec |
| :---: | :--- | :--- | :---: | :---: |
| 1 | Splash / Launch | *(shell)* | M1 | ☐ |
| 2 | Onboarding | *(shell)* | M1 | ☐ |
| 3 | Login | *(shell)* | M1 | ☐ |
| 4 | Today / Dashboard | **Home** | M1 | ☐ |
| 5 | Attendance List | My Progress | M2 | ☐ |
| 6 | Attendance Detail | My Progress | M2 | ☐ |
| 7 | Marks List | My Progress | M3 | ☐ |
| 8 | Marks Detail and Grade Projection | My Progress | M3 | ☐ |
| 9 | Transcript | My Progress | M4 | ☐ |
| 10 | Progress and Degree Audit | My Progress | M4 | ☐ |
| 11 | Registration Planner | Registration | M5 | ☐ |
| 12 | Course Search | Registration | M5 | ☐ |
| 13 | Finance Timeline | Fees | M6 | ☐ |
| 14 | Payment How-To | Fees | M6 | ☐ |
| 15 | Requests Inbox | Requests & Alerts | M7 | ☐ |
| 16 | Request Detail and Submit | Requests & Alerts | M7 | ☐ |
| 17 | Notifications | Requests & Alerts | M8 | ☐ |
| 18 | Notification Settings | Requests & Alerts | M8 | ☐ |
| 19 | Profile and Privacy Controls | Settings & Help | M1 | ☐ |
| 20 | Settings *(Display & Language)* | Settings & Help | M9 | ☐ |
| 21 | Help and Glossary | Settings & Help | M9 | ☐ |
| ~~22~~ | ~~Search~~ | **Retired** | ~~M9~~ | — |

**21 active screens.** Screen 22 (Search) was retired in ADR 0003: it answered no validated need on
its own, and the function is folded into Home and into Help & Glossary. The number is not reused.

**Consequence for the proposal:** FR-38 (text scalable to 200%) is traced to "screens 1 to 22" in
Table 8. It now applies to screens 1 to 21. The requirement itself is unchanged.

**NEW-01** from Activity 3, surfacing short cross-links between related sections, gets no screen of
its own. It is satisfied inside the Registration Planner (11) and the Finance Timeline (13), which is
where Persona 2's decision actually happens. **FR-39 is reserved** for it if the proposal is revised.

---

## Build order

Not screen 1 first. Build the spine that proves the product idea, then fill outward.

| Order | Screens | Why |
| :---: | :--- | :--- |
| 1 | **4, 5, 6** | Dashboard and attendance. If the headroom sentence does not land, nothing else matters. This is Persona 1's whole journey. |
| 2 | **7, 8** | Marks and projection. The second derived figure, and User 2's stated pain point. |
| 3 | **13, 14** | Fees. Simplest module, fastest win, and the one a parent reads. |
| 4 | **9, 10** | Transcript and progress. Hardest layout problem, so do it while there is still time. |
| 5 | **11, 12** | Registration planner. Most logic, and Persona 2's journey. |
| 6 | **15, 16, 17, 18** | Requests and notifications. |
| 7 | **1, 2, 3, 19, 20, 21** | Shell, settings and reference. |

---

## Rules

- Modal dialogs and empty, loading, error, no-connectivity and success states are recorded in the
  **States** section of a screen spec. They are not separate screens and they do not get numbers.
- A spec is not done until every state in its table has real copy written, not a description of copy.
- Every spec names the pure function in `src/lib/` behind each derived value.
