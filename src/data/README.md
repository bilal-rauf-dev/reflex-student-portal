# data · Seeded fixtures

Every record here is invented. See [DATA_AND_PRIVACY.md](../../docs/DATA_AND_PRIVACY.md) for the rules
that keep it that way.

## Shapes

Modelled on the records the live portal displays, so the prototype reads as real to a test
participant.

| File | Shape |
| :--- | :--- |
| `student.json` | `rollNumber, name, section, batch, campus, programme, contact` |
| `semesters.json` | `id, label, startDate, endDate, registrationWindow, isCurrent` |
| `courses.json` | `code, title, section, creditHours, type, instructorRole` |
| `enrolments.json` | `studentId, courseId, semesterId, status` |
| `lectures.json` | `courseId, date, durationHours, present` |
| `assessments.json` | `courseId, name, weight, maxScore, obtainedScore, publishedAt` |
| `gradeRecords.json` | `courseId, semesterId, grade, points, statusCode` |
| `challans.json` | `id, semesterId, amount, generatedOn, dueDate, status, paidOn` |
| `requests.json` | `type, courseIds, state, openFrom, openUntil, submittedAt, decidedAt, attachment` |
| `studyPlan.json` | `semesterNumber, courses, prerequisites` |
| `notifications.json` | `category, payload, deliveredAt, readAt` |

## The fixed clock

`meta.json` holds `seededNow` (26 Oct 2026) and `lastSyncedAt`. Pass `seededNow` into every function
that needs a date. Nothing in the product reads the real clock, so the prototype shows the same state
in a demo in week 10 as it does in week 16, and a countdown cannot quietly go negative during a
usability session.

## What the seed currently contains

One student (`00F-0001`), five semesters with Fall 2026 current, six registered courses, 117 lecture
records, 27 assessments, 33 completed course grades, six challans, five requests and four
notifications. The awkward cases are deliberate:

| Case | Where | What it exercises |
| :--- | :--- | :--- |
| Perfect attendance, safe | CS2009 | The ordinary happy path |
| At risk, 2 lectures of headroom | CL3001, CS3014 | The at-risk label and its wording |
| Below threshold, cannot recover | EE3009 | Shortfall state, and the requests route out of it |
| Nothing published at all | MT1004 | The empty state that names who publishes marks |
| Target no longer reachable | EE3009 at 80% | A projection that must refuse to produce a number |
| Incomplete grade `I` | MT1004, Fall 2025 | Excluded from the GPA, not counted as zero |
| Unpaid and overdue challans | `ch-2026F`, `ch-2026F-hostel` | Countdown and overdue states side by side |
| Every request state | `rq-01` to `rq-05` | not-open, open, submitted, under-review, decided |
| First-year with no history | `empty-state-fixtures.json` | Transcript and progress with nothing to show |

`src/lib/seed.test.js` asserts each of these still holds, so a careless edit to a JSON file fails the
suite instead of surfacing in a demo.

## Rules

- **Never seed a derived value.** No `headroom` field, no `requiredScore` field, no `cgpa` field.
  Those are computed by `src/lib/`. Seeding one hides a bug in the function that produces it.
- **Reserved-looking identifiers only.** Roll numbers in the `00X-0000` range, CNIC-shaped strings that
  are structurally valid but not issuable, `@example.com` addresses, invented names belonging to no
  group member or classmate.
- **Seed the awkward cases, not just the happy ones.** The seed set must include: a course with no
  marks published, a course already below the attendance threshold, a paid challan and an overdue one,
  a request in every state, a first-year student with no completed semesters, and a target grade that
  has become unreachable. Those are the states most likely to be broken and least likely to be
  noticed.
- **Dates are ISO `YYYY-MM-DD` in the data.** Display formatting happens in `lib/formatDate`.
