# styles

`tokens.css` holds the design tokens. `global.css` holds the reset and base type. Everything else is a
CSS Module beside its component.

Colour values and their contrast ratios are documented in
[ACCESSIBILITY.md](../../docs/ACCESSIBILITY.md).

## The trap

The two brand accents, `--cyan-500` and `--teal-500`, are the prettiest colours in the palette and
**neither is legible as text on white**. Cyan is 2.9:1 and teal is 2.3:1, against a 4.5:1 requirement.

Use them for decoration: fills, borders, illustration, tints behind a chip. The moment a colour
carries meaning as text or as an icon, switch to the darker paired token (`--teal-700`, `--amber-700`,
`--red-700`).

This is the mistake most likely to reach a demo, because it looks fine to anyone with normal colour
vision on a good screen in a dark room. It does not survive an audit, and it does not survive a
corridor in bright sunlight, which is where our users actually are.
