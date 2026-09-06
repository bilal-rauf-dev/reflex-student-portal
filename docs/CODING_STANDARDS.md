# Coding Standards

Four people are working in one repository for one semester. These rules exist so that a file written
by one member reads like a file written by any other, and so that nothing lands on `main` unreviewed.

---

## Language and tooling

| Concern | Choice |
| :--- | :--- |
| Framework | React with function components and hooks. No class components. |
| Language | Modern JavaScript (ES2022). No TypeScript, to keep the whole group productive in one semester. |
| Build | Vite |
| Styling | CSS Modules with design tokens from `src/styles/tokens.css`. No inline style objects for anything reusable. |
| State | React context plus hooks. No external state library unless the group agrees it is needed. |
| Charts | One charting library, chosen once and used everywhere. |
| Formatting | Prettier, 2-space indent, single quotes, 100-column print width |
| Linting | ESLint with `eslint-plugin-jsx-a11y` enabled and treated as errors, not warnings |

Run `npm run lint` before every push. A pull request that fails lint is not reviewed.

---

## Repository layout

```
src/
  components/     Reusable presentational components, one folder per component
  modules/        One folder per module: today, attendance, marks, progress,
                  registration, finance, requests, notifications, settings
  hooks/          Shared hooks (useAttendanceHeadroom, useOfflineData, useLocale)
  lib/            Pure functions: calculations, formatters, validators
  locales/        en.json, ur.json
  styles/         tokens.css, global.css
  data/           Seeded JSON fixtures
docs/             Project documentation
```

**The rule that matters:** every calculation lives in `src/lib/` as a pure function with no React in
it. Attendance headroom, grade projection, CGPA, credits remaining and days-until-due are all pure
functions. They are the part of this product that must be correct, they are the part most likely to be
wrong, and they are the only part that is straightforward to test.

---

## Naming

| Thing | Convention | Example |
| :--- | :--- | :--- |
| Component files | PascalCase | `AttendanceCard.jsx` |
| Hooks | camelCase, `use` prefix | `useAttendanceHeadroom.js` |
| Pure functions | camelCase, verb first | `calculateHeadroom()` |
| CSS Modules | kebab-case file, camelCase class | `attendance-card.module.css`, `.riskLabel` |
| Constants | SCREAMING_SNAKE_CASE | `ATTENDANCE_THRESHOLD` |
| Booleans | `is`, `has`, `can` prefix | `isBelowThreshold` |
| Locale keys | dot path by module | `attendance.headroom.sentence` |

Name things after what the user sees, not after the data shape. `AttendanceHeadroom`, not
`AttendancePercentageWidget`.

---

## Components

- One component, one job. If a component both fetches and renders, split it.
- Props are explicit. No prop spreading except for genuine pass-through wrappers.
- No magic numbers in JSX. The attendance threshold is `ATTENDANCE_THRESHOLD`, not `80`.
- **Every component that can render empty renders a real empty state.** A component that can return
  `null` on missing data is a bug, not a shortcut. This is Design Principle 2 and it is enforced in
  review.
- No hard-coded user-facing strings. Everything goes through the locale files, English and Urdu
  together in the same commit.

---

## Accessibility in code

`eslint-plugin-jsx-a11y` catches the mechanical failures. The rest is on the author:

- Semantic elements first. A `div` with an `onClick` is a bug; use a `button`.
- Every data table has a `caption` and real `th` elements with `scope`.
- Every status indicator has text or an `aria-label`. Colour is never the only signal.
- Focus order follows visual order. Every interactive element has a visible focus ring.
- Test with the keyboard alone before opening a pull request.

Full targets and the per-screen audit are in [ACCESSIBILITY.md](ACCESSIBILITY.md).

---

## Git workflow

### Branches

```
main                    always working, always demonstrable
  └─ feat/<module>-<short-description>
  └─ fix/<short-description>
  └─ docs/<short-description>
  └─ design/<short-description>
```

`main` is protected. Nobody pushes to it directly, including the lead.

### Commits

Conventional Commits, imperative mood, no trailing period:

```
feat(attendance): add headroom calculation for a named course
fix(finance): suppress days-remaining countdown when offline
docs(principles): add the estimate-labelling rule
style(tokens): align risk colours with the palette
refactor(lib): extract cgpa calculation from the progress module
test(lib): cover headroom when no lectures are scheduled
chore(deps): bump vite
```

Scope is the module or folder. Body explains **why**, not what; the diff already shows what.

### Pull requests

- One pull request, one concern. A branch that changes three modules gets split.
- At least **one approving review** from a member other than the author before merge.
- Anything touching `src/lib/` needs **two** approvals, because that is where wrong numbers come from.
- The author does not merge their own pull request.
- Fill in the template. A pull request with an empty description is closed, not reviewed.
- Squash on merge. Keep `main` linear.

---

## Testing

Formal test coverage is not a course requirement, but the calculations are not negotiable.

- Every pure function in `src/lib/` has unit tests covering the normal case, the boundary and the
  degenerate case. For headroom that means: partway through the semester, exactly at the threshold,
  and zero lectures held.
- Interface behaviour is verified by walking the screen with a keyboard and by the accessibility audit
  in `npm run a11y`.
- Before a phase deadline, every screen is checked at 320px, at 768px and at 1920px.

---

## What never goes in the repository

- Real student data of any kind. Every record is seeded and invented. See [DATA_AND_PRIVACY.md](DATA_AND_PRIVACY.md).
- Unredacted screenshots of the live Flex portal.
- Credentials, tokens, API keys, `.env` files.
- Commented-out blocks of dead code. Git remembers it; delete it.
- Binary assets over 2MB without compressing them first.
