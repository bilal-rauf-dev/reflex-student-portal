# Screen Specifications

**Phase 3 onward.** One file per screen, 22 in total, named `NN-slug.md` matching the numbers in the
proposal's screen inventory. Those numbers are already used by the requirements traceability matrix,
so they do not get renumbered.

Do not start writing these until Phase 2 findings are in. A screen spec written from an untested
assumption is work that gets thrown away.

## Index

| # | Screen | Module | Spec |
| :---: | :--- | :--- | :---: |
| 1 | Splash / Launch | M1 | ☐ |
| 2 | Onboarding | M1 | ☐ |
| 3 | Login | M1 | ☐ |
| 4 | Today / Dashboard | M1 | ☐ |
| 5 | Attendance List | M2 | ☐ |
| 6 | Attendance Detail | M2 | ☐ |
| 7 | Marks List | M3 | ☐ |
| 8 | Marks Detail and Grade Projection | M3 | ☐ |
| 9 | Transcript | M4 | ☐ |
| 10 | Progress and Degree Audit | M4 | ☐ |
| 11 | Registration Planner | M5 | ☐ |
| 12 | Course Search | M5 | ☐ |
| 13 | Finance Timeline | M6 | ☐ |
| 14 | Payment How-To | M6 | ☐ |
| 15 | Requests Inbox | M7 | ☐ |
| 16 | Request Detail and Submit | M7 | ☐ |
| 17 | Notifications | M8 | ☐ |
| 18 | Notification Settings | M8 | ☐ |
| 19 | Profile and Privacy Controls | M1 | ☐ |
| 20 | Settings | M9 | ☐ |
| 21 | Help and Glossary | M9 | ☐ |
| 22 | Search | M9 | ☐ |

## Build order

Not screen 1 first. Build the spine that proves the product idea, then fill outward.

1. **4, 5, 6** — dashboard and attendance. If the headroom sentence does not land, nothing else matters.
2. **7, 8** — marks and projection. The second derived figure.
3. **13, 14** — finance. Simplest module, fastest win.
4. **9, 10** — transcript and progress. Hardest layout problem, do it while there is still time.
5. **11, 12** — registration planner. Most logic.
6. **15, 16, 17, 18** — requests and notifications.
7. **1, 2, 3, 19, 20, 21, 22** — shell, settings and utilities.

Copy `_TEMPLATE.md` to start a new spec.
