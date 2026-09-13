# lib · Pure calculations

No React. No side effects. No I/O. Given the same input, the same output, every time.

Every number the user sees is produced here.

## Planned functions

| Function | Returns | Notes |
| :--- | :--- | :--- |
| `calculateHeadroom(lectures, totalScheduled, threshold)` | Lectures the student may still miss | The product's headline number |
| `projectEndOfSemester(lectures, totalScheduled)` | Projected final attendance percentage | |
| `classifyRisk(percentage, headroom, threshold)` | `'safe' \| 'at-risk' \| 'below'` | Returns a **named state**, never a colour |
| `weightedTotal(assessments)` | Running total of published marks | Ignores unpublished, never treats missing as zero |
| `requiredScore(assessments, targetPercent)` | `{ status, requiredPercent }` | Status is `ok`, `nothing-remaining`, `unreachable` or `insufficient-data`, so the UI explains rather than guesses |
| `calculateCGPA(gradeRecords)` | CGPA across completed semesters | |
| `creditsRemaining(studyPlan, completed)` | Credits earned against required | |
| `daysUntil(dueDate, now)` | Whole days remaining | `now` is a parameter, never `Date.now()` inside |
| `checkPrerequisites(course, completed, studyPlan)` | Unmet prerequisites | |
| `detectClashes(draftSchedule)` | Clashing course pairs | |
| `formatDate(date)` | `DD MMM YYYY` | One format across the whole product |

## Rules

- **Never read the clock inside a function.** Pass `now` in. A function that calls `Date.now()` cannot
  be tested and will fail at a semester boundary.
- **Return `null` for "cannot compute", never a fallback number.** The UI is required to explain why
  it cannot project. Returning `0` or a guess makes that impossible and produces a confidently wrong
  answer, which is worse than no answer. Where there is more than one reason a figure is unavailable,
  return a named status alongside the value rather than overloading `null`, as `requiredScore` does.
- **No thresholds inline.** `ATTENDANCE_THRESHOLD` is a named constant.
- **Never return a colour or a CSS class.** Return a named state and let the component decide how to
  present it. This is what keeps Design Principle 3 enforceable.
- **Missing is not zero.** An unpublished assessment is not a score of zero. Conflating them is the
  single most likely bug in this codebase.

## Status

Implemented and tested: `constants.js`, `attendance.js`, `marks.js`, `progress.js`, `dates.js`,
`registration.js`. 69 tests, no dependencies, run with `npm test`.

`seed.test.js` runs the calculations over the real fixtures in `src/data/`, so editing a JSON file in
a way that breaks the awkward case a screen depends on fails the suite rather than surfacing in a demo.

## Tests

Each function covers three cases at minimum:

1. **Normal** — partway through the semester, ordinary values
2. **Boundary** — exactly at the threshold, exactly on the due date, exactly reachable target
3. **Degenerate** — zero lectures held, nothing published yet, empty schedule, target already impossible
