# locales

`en.json` and `ur.json`. Keys are dot paths by module: `attendance.headroom.many`.

## Status

Both files are written and in parity: **168 keys each**, covering navigation, the dashboard,
attendance, marks, progress, registration, fees, requests, notifications, settings, the glossary and
search. `src/lib/i18n.test.js` asserts key parity, placeholder parity and that nothing is empty, so a
string added to one file without the other fails the suite.

`npm run preview` renders the real sentences over the real seeded data in either locale. Use it to
check copy before it is wired into a component.

## Why the copy is written first

The derived sentence *is* the product. "You can miss 3 more classes in CS3001 before dropping below
80%" is the thing Flex fails to say, and Design Principle 1 is only real once that sentence exists as
a string. Writing the copy before the components also forces the empty, error and offline states to
be answered, because every one of them needs words and there is nowhere to hide a blank panel.

Two bugs were caught this way before any component existed: a sync-age label that read
"Synced 1 days ago", and a not-open request state that never said when it opens.

## Rules

- **Both files change in the same commit.** A pull request that adds an English string without its
  Urdu counterpart is incomplete, not "to be translated later". Later does not arrive.
- No user-facing string is hard-coded in a component. None.
- Numbers, dates and institutional codes stay in Latin script. `CS3001` is not transliterated.
- Interpolate values, never concatenate sentences. Word order differs between the two languages and a
  concatenated sentence cannot be translated correctly.

```json
{ "attendance.headroom.many": "You can miss {count} more classes in {course} before dropping below {threshold}%" }
```

`interpolate()` in `src/lib/i18n.js` does the substitution. A missing value leaves the placeholder
visible rather than printing `undefined`, and a missing key renders as the key itself, so a gap shows
up in review instead of as blank space in a demo.

## Plural forms

Counted strings carry `.one`, `.many` and, where the zero case reads differently, `.none`.
`pluralKey(base, count)` picks between them. "Missing one more class takes you below 80%" is not the
same sentence as "you can miss 0 more classes", which is why `.none` exists.

## Urdu review

The Urdu was drafted alongside the English rather than translated afterwards, so word order and
sentence shape are native rather than mapped from the English. **It still needs a read-through by a
fluent speaker in the group before Phase 5 testing.** Check in particular the attendance headroom
sentences, which carry the most consequence, and the glossary entries, which deliberately keep the
English technical terms (MCA, CLO, PLO) because that is what appears on the university's own
documents.

- Layout must survive longer strings. Urdu renderings frequently run longer than the English, so
  nothing that holds text may be fixed-width.
- Right-to-left is handled with logical CSS properties (`margin-inline-start`, never `margin-left`).
