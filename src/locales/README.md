# locales

`en.json` and `ur.json`. Keys are dot paths by module: `attendance.headroom.sentence`.

## Rules

- **Both files change in the same commit.** A pull request that adds an English string without its
  Urdu counterpart is incomplete, not "to be translated later". Later does not arrive.
- No user-facing string is hard-coded in a component. None.
- Numbers, dates and institutional codes stay in Latin script. `CS3001` is not transliterated.
- Interpolate values, never concatenate sentences. Word order differs between the two languages and a
  concatenated sentence cannot be translated correctly.

```json
{ "attendance.headroom.sentence": "You can miss {count} more classes in {course} before dropping below {threshold}%" }
```

- Layout must survive longer strings. Urdu renderings frequently run longer than the English, so
  nothing that holds text may be fixed-width.
- Right-to-left is handled with logical CSS properties (`margin-inline-start`, never `margin-left`).
