# hooks

Thin React wrappers over the pure selectors in [`src/lib/selectors.js`](../lib/selectors.js).

**A hook never calculates anything.** It reads from context, calls a selector, and memoises the
result. That split is deliberate: the selectors have 103 tests and run without React, so the part
that can be wrong is the part that is tested, and the React layer stays small enough to review by
eye. If you find yourself writing arithmetic in a hook, it belongs in `lib/`.

## What is here

| Hook | Returns |
| :--- | :--- |
| `DataProvider`, `useData`, `useNow` | The seeded records and the fixed clock from `meta.json` |
| `usePreferences` | Locale, theme, text size, attendance threshold, notification settings |
| `useTranslation` | `t(key, values)`, `tm(message)`, `locale`, `dir` |
| `useOnline` | Whether the browser believes it is online |
| `useOfflineData` | Sync label, staleness, and whether to suppress countdowns |
| `useDashboard` | Everything the Today screen shows, empty state included |
| `useAttendanceList`, `useAttendanceHeadroom` | The list, and one course with its headroom sentence |
| `useMarksList`, `useCourseMarks` | Running totals, and one course with an optional projection |
| `useFinance`, `useRequests`, `useProgress` | Timeline, inbox, degree progress |

## Selectors return messages, not strings

A selector returns `{ key, values }`. The component translates it with `tm()`:

```jsx
const course = useAttendanceHeadroom('CS3001');
const { tm } = useTranslation();

<p className="headline">{tm(course.headline)}</p>
{course.nextStep && <p>{tm(course.nextStep)}</p>}
```

This keeps the logic locale-free: changing the wording of the headroom sentence means editing two
JSON files and nothing else, and the selector tests assert that every message a selector emits exists
in `en.json` with all its placeholders supplied.

## Three rules these encode

- **The clock is fixed.** `useNow` reads `meta.seededNow`, never `Date.now()`. A prototype on the real
  clock shows different state in every demo and lets a countdown go negative mid usability session.
- **Storage can throw.** Every `localStorage` read and write in `usePreferences` is wrapped. A private
  window or a browser set to block site data must fall back to defaults, not crash the settings screen.
- **Offline suppresses countdowns.** `useOfflineData.suppressCountdowns` is what stops "due in 4 days"
  being shown from a stale record. The date still shows; the countdown does not.

## Not yet written

`useRegistration` (draft schedule, prerequisites, clashes) and `useNotifications`. The selectors they
need exist; the hooks do not, because nothing renders them yet.

## Testing

These are not unit tested. The logic they expose is tested in `src/lib/selectors.test.js` without
React, and what remains here is `useMemo` and context plumbing. If a hook ever grows logic worth
testing, that is the signal it should have been a selector.
