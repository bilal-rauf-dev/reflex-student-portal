# src

Empty until Phase 4. The folders exist so that the first commit of real code lands in the right place
rather than in whatever shape the first person to open the editor happens to choose.

| Folder | Holds | Owner |
| :--- | :--- | :--- |
| `components/` | Reusable presentational components, one folder each | Zain |
| `modules/` | One folder per module: today, attendance, marks, progress, registration, finance, requests, notifications, settings | Zain |
| `hooks/` | Thin React wrappers over the selectors. No arithmetic. | Hassaan |
| `lib/` | Pure calculations, selectors, formatters, validators. **No React in here.** | Hassaan + Bilal |
| `locales/` | `en.json`, `ur.json` | Saad |
| `styles/` | `tokens.css`, `global.css` | Saad |
| `data/` | Seeded JSON fixtures | Hassaan |

## State of play

| Layer | Status |
| :--- | :--- |
| `lib/` | Written and tested. 103 tests, no dependencies, `npm test` |
| `data/` | Seeded, including every awkward case the screens must handle |
| `locales/` | English and Urdu in parity, 168 keys each |
| `hooks/` | Written. Thin wrappers, no logic of their own |
| `components/`, `modules/`, `styles/` | Phase 4 |

`npm run preview` renders the product in either locale with no interface at all.

## The one rule that matters

Every calculation lives in `lib/` as a pure function. Attendance headroom, required score, CGPA,
credits remaining, days until due. No React, no side effects, no I/O.

They are the part of this product that must be correct, they are the part most likely to be wrong, and
a pure function is the only thing in this repository that is straightforward to test. That is also why
changes to `lib/` need two approving reviews.
