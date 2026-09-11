# src

Empty until Phase 4. The folders exist so that the first commit of real code lands in the right place
rather than in whatever shape the first person to open the editor happens to choose.

| Folder | Holds | Owner |
| :--- | :--- | :--- |
| `components/` | Reusable presentational components, one folder each | Zain |
| `modules/` | One folder per module: today, attendance, marks, progress, registration, finance, requests, notifications, settings | Zain |
| `hooks/` | Shared hooks: `useAttendanceHeadroom`, `useOfflineData`, `usePreferences`, `useLocale` | Hassaan |
| `lib/` | Pure calculations, formatters, validators. **No React in here.** | Hassaan + Bilal |
| `locales/` | `en.json`, `ur.json` | Saad |
| `styles/` | `tokens.css`, `global.css` | Saad |
| `data/` | Seeded JSON fixtures | Hassaan |

## The one rule that matters

Every calculation lives in `lib/` as a pure function. Attendance headroom, required score, CGPA,
credits remaining, days until due. No React, no side effects, no I/O.

They are the part of this product that must be correct, they are the part most likely to be wrong, and
a pure function is the only thing in this repository that is straightforward to test. That is also why
changes to `lib/` need two approving reviews.
